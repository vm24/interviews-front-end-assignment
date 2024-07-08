"use client"
import { useState, useEffect } from 'react';
import MainHeader from '../components/MainHeader';
import styles from './recipes.module.css';
import SideMenu from '../components/SideMenu';
import Footer from '../components/Footer';
import Image from 'next/image';
import Link from 'next/link';

import { FaFilter } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';

const RecipesPage = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedDifficulties, setSelectedDifficulties] = useState(new Set());
    const [selectedRatings, setSelectedRatings] = useState(new Set());

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [paginatedRecipes, setPaginatedRecipes] = useState([]);
    const [recipes, setRecipes]: any = useState([]);
    const [diets, setDiets]: any = useState({});
    const [cuisines, setCuisines]: any = useState([]);
    const [pageCount, setPageCount]: any = useState(0);


    //side menu ( mobile / larger screens)
    const [openSideMenu, setOpenSideMenu] = useState(false);
    useEffect(() => {
        const updateVisibility = () => setOpenSideMenu(window.innerWidth >= 768);
        updateVisibility();
        window.addEventListener('resize', updateVisibility);
        return () => window.removeEventListener('resize', updateVisibility);
    }, []);
    const toggleSideMenu = () => setOpenSideMenu(!openSideMenu);

    //fetch recipes and calculate rating
    useEffect(() => {
        const fetchResources = async () => {
            try {
                const [recipesRes, cuisinesRes, dietsRes, commentsRes] = await Promise.all([
                    fetch('http://192.168.1.53:8080/recipes'),
                    fetch('http://192.168.1.53:8080/cuisines'),
                    fetch('http://192.168.1.53:8080/diets'),
                    fetch('http://192.168.1.53:8080/comments')
                ]);

                const [recipesData, cuisinesData, dietsData, commentsData] = await Promise.all([
                    recipesRes.json(),
                    cuisinesRes.json(),
                    dietsRes.json(),
                    commentsRes.json()
                ]);

                const cuisinesMap = cuisinesData.reduce((acc: any, cuisine: any) => ({ ...acc, [cuisine.id]: cuisine.name }), {});
                const dietsMap = dietsData.reduce((acc: any, diet: any) => ({ ...acc, [diet.id]: diet.name }), {});

                const ratedRecipes = recipesData.map((recipe: any) => {
                    const recipeComments = commentsData.filter((comment: any) => comment.recipeId === recipe.id);
                    const totalRating = recipeComments.reduce((acc: any, comment: any) => acc + comment.rating, 0);
                    const averageRating = recipeComments.length ? (totalRating / recipeComments.length).toFixed(1) : "No ratings";
                    return { ...recipe, rating: averageRating };
                });
                console.log(ratedRecipes);  // Check what the ratings look like

                setCuisines(cuisinesMap);
                setDiets(dietsMap);
                setRecipes(ratedRecipes); // Make sure you use ratedRecipes here
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchResources();
    }, []);

    //filtering
    useEffect(() => {
        let filteredRecipes = recipes.filter((recipe: any) => {
            const matchesDifficulty = !selectedDifficulties.size || selectedDifficulties.has(String(recipe.difficultyId));
            const matchesSearchTerm = !searchTerm || recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCuisine = !selectedCuisine || recipe.cuisineId === selectedCuisine;
            const matchesDiet = !selectedDiet || recipe.dietId === selectedDiet;
            const matchesRatings = !selectedRatings.size || Array.from(selectedRatings).some((selectedRating: any) =>
                Math.floor(parseFloat(recipe.rating)) === Math.floor(parseFloat(selectedRating))
            );

            return matchesDifficulty && matchesSearchTerm && matchesCuisine && matchesDiet && matchesRatings;
        });

        const startIndex = (currentPage - 1) * itemsPerPage;
        setPaginatedRecipes(filteredRecipes.slice(startIndex, startIndex + itemsPerPage));
        setPageCount(Math.ceil(filteredRecipes.length / itemsPerPage));
    }, [searchTerm, selectedCuisine, selectedDiet, selectedDifficulties, selectedRatings, recipes, currentPage]);

    const handlePageChange = (pageNumber: any) => {
        setCurrentPage(pageNumber);
    };

    //summary of the filters applied
    const searchSummary = () => {
        const filters = [];
        if (searchTerm) filters.push(`Name: "${searchTerm}"`);
        if (selectedCuisine) filters.push(`Cuisine: "${cuisines[selectedCuisine]}"`);
        if (selectedDiet) filters.push(`Diet: "${diets[selectedDiet]}"`);
        return filters.join(", ");
    };

    return (

        <main className={styles.recipesPage} >
            <div className='bg-gray-100 w-full min-h-screen'>
                <MainHeader />
                <div className='flex justify-start items-start'>
                    <SideMenu
                        open={openSideMenu}
                        toggleMenu={toggleSideMenu}
                        setSearchTerm={setSearchTerm}
                        setSelectedCuisine={setSelectedCuisine}
                        setSelectedDiet={setSelectedDiet}
                        setSelectedDifficulties={setSelectedDifficulties}
                        setSelectedRatingsState={setSelectedRatings}

                    />
                    <main className='flex-1 mx-4 rounded-lg p-4 bg-slate-50'>
                        <div className="px-4 py-5 sm:p-6">
                            <div className="flex justify-between">
                                <h1 className="text-lg leading-6 font-medium text-gray-900">Results for {searchSummary()}</h1>
                                <select disabled aria-label="sort-by" id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:shadow-xl block w-24 p-1 ">
                                    <option >Sort By</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                </select>
                            </div>
                            <h2 className='font-bold sm:text-2xl text-xl mb-2'>Recipes found for your search criteria</h2>
                            <div className="space-y-4">
                                {paginatedRecipes.map((recipe: any) => (
                                    <div key={recipe.id} className="flex flex-col md:flex-row items-start bg-white rounded-xl overflow-hidden shadow-lg relative  hover:translate-y-0.5 duration-500">
                                        <Image className="w-32 h-32 flex-shrink-0 object-cover rounded-lg m-2" src={`http://192.168.1.53:8080${recipe.image}`} alt={recipe.name} quality={100} width={1000} height={1000} />
                                        <div className="flex-grow space-y-2 p-2">
                                            <div className="font-bold text-md sm:text-xl mb-1">{recipe.name}</div>
                                            <div className="flex items-center text-sm">
                                                <span className="bg-orange-500 text-gray-700 text-xs font-semibold rounded-full px-2 py-0.5 mr-2  shadow-md">How</span>
                                                <p className="text-gray-500 truncate" style={{ maxWidth: '250px' }}>
                                                    {recipe.instructions.length > 50 ? `${recipe.instructions.substring(0, 50)}...` : recipe.instructions}
                                                </p>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <span className="bg-[#95CD41] text-gray-700 text-xs font-semibold rounded-full px-2 py-0.5 mr-2  shadow-md">Ingredients</span>
                                                <p className="text-gray-500">
                                                    {recipe.ingredients.slice(0, 3).join(', ')}...
                                                </p>
                                            </div>
                                            <div className="flex items-center text-sm">
                                                <span className="bg-[#e9b000] text-gray-700 text-xs font-semibold rounded-full px-2 py-0.5 mr-2  shadow-md">Cuisine</span>
                                                <div className="text-gray-700">{cuisines[recipe.cuisineId]}</div>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 right-2 flex flex-col items-center">
                                            <div className="bg-[#F9CF00] text-yellow-800 text-xs font-bold py-1 px-3 rounded-full flex items-center">
                                                <FaStar className="mr-1" /> {/* Star icon */}
                                                {recipe.rating}/5 Stars
                                            </div>
                                            <div className="bg-orange-500 text-gray-700 text-xs font-semibold rounded-xl px-3 py-1.5 mt-5 shadow-md">
                                                Price: <span className="text-xl">$20</span>
                                            </div>
                                        </div>


                                        <div className="mt-8">
                                            <Link href={`/recipes/${recipe.id}`}>
                                                <button className="absolute bottom-0 left-0 w-full bg-violet-500 hover:bg-violet-700 shadow-sm text-white font-bold py-1 px-2 sm:rounded-lg mt-2 md:absolute  md:bottom-2 md:right-2 md:left-auto md:w-auto overflow-hidden hover:translate-y-0.5 duration-200">
                                                    More Details
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-2 mt-4">
                                {Array.from({ length: pageCount }, (_, i) => (
                                    <button key={i + 1} onClick={() => handlePageChange(i + 1)}
                                        className={`px-4 py-2 rounded hover:translate-y-0.5 duration-200 ${i + 1 === currentPage ? 'bg-violet-500 text-white' : 'bg-gray-200'}`}>
                                        {i + 1}
                                    </button>
                                ))}
                            </div>
                        </div>


                    </main>
                </div>

                {/* filter bottom button */}
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 1000
                }}>
                    <button aria-label="filter" onClick={toggleSideMenu} style={{
                        backgroundColor: '#fff', // Circular background
                        border: '2px solid #ccc', // Optional: border for the circle
                        borderRadius: '50%', // Makes the button circular
                        cursor: 'pointer',
                        outline: 'none',
                        width: '45px',
                        height: '45px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background-color 0.3s, transform 0.3s', // Smooth transition for background color and transform
                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)' // Optional: adding some shadow for better aesthetics
                    }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} // Slightly enlarges the button on hover
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} // Reverts the scale on mouse leave
                    ><FaFilter />
                    </button>
                </div>


            </div>
            <Footer />
        </main>
    )
}

export default RecipesPage