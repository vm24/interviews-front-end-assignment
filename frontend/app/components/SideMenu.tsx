"use client"
import React, { useState } from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { BiWorld } from "react-icons/bi";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaStar } from 'react-icons/fa';


const SideMenu = ({ open, toggleMenu, setSearchTerm, setSelectedCuisine, setSelectedDiet, setSelectedDifficulties, setSelectedRatingsState }: any) => {
    const [localSearchTerm, setLocalSearchTerm] = useState('');
    const [localCuisine, setLocalCuisine] = useState('');
    const [localDiet, setLocalDiet] = useState('');
    const [localDifficulties, setLocalDifficulties] = useState(new Set());
    const [selectedRatings, setSelectedRatings] = useState(new Set());

    const cuisines = [
        { id: "1", name: "Italian" },
        { id: "2", name: "American" },
        { id: "3", name: "Mexican" },
        { id: "4", name: "Indian" },
        { id: "5", name: "Japanese" },
        { id: "6", name: "Spanish" },
        { id: "7", name: "French" },
        { id: "8", name: "Greek" },
        { id: "9", name: "Thai" },
        { id: "10", name: "British" },
        { id: "11", name: "Russian" },
        { id: "12", name: "Middle Eastern" },
        { id: "13", name: "North African" },
        { id: "14", name: "Korean" }
    ];
    const diets = [
        { id: "1", name: "Vegetarian" },
        { id: "2", name: "Mediterranean" },
        { id: "3", name: "Non-Vegetarian" },
        { id: "4", name: "Pescatarian" },
    ];
    const difficulties = [
        { id: "1", name: "Easy" },
        { id: "2", name: "Medium" },
        { id: "3", name: "Hard" },
    ]

    const handleSearch = () => {
        setSearchTerm(localSearchTerm);
        setSelectedCuisine(localCuisine);
        setSelectedDiet(localDiet);
    };

    const handleDifficultyChange = (difficultyId: any) => {
        setLocalDifficulties(prev => {
            const newDifficulties = new Set(prev);
            if (newDifficulties.has(difficultyId)) {
                newDifficulties.delete(difficultyId);
            } else {
                newDifficulties.add(difficultyId);
            }
            setSelectedDifficulties(newDifficulties); // This should trigger an update in RecipesPage
            return newDifficulties;
        });
    };

    const handleRatingChange = (rating: any) => {
        setSelectedRatings(prev => {
            const newRatings = new Set(prev);
            if (newRatings.has(rating.toString())) {
                newRatings.delete(rating.toString());
            } else {
                newRatings.add(rating.toString());
            }
            setSelectedRatingsState(newRatings);
            return newRatings;
        });
    };

    const resetFilters = () => {
        setLocalSearchTerm('');
        setLocalCuisine('');
        setLocalDiet('');
        setLocalDifficulties(new Set());
        setSelectedRatings(new Set());
        setSearchTerm('');
        setSelectedCuisine('');
        setSelectedDiet('');
        setSelectedDifficulties(new Set());
        setSelectedRatingsState(new Set());
    };
    return (
        <div className={`fixed inset-y-0 left-0 z-40 ${open ? "translate-x-0" : "-translate-x-full"} bg-white w-80 rounded-r-lg shadow-md p-4 transition-transform duration-300 ease-in-out md:relative`} style={{ scrollBehavior: 'smooth' }}>
            <div className="flex items-center gap-3">
                <button aria-label="exit-side" onClick={toggleMenu} >
                    <FaArrowCircleLeft className="cursor-pointer item hover:-translate-x-1 duration-200" size={20} />
                </button>
                <span className='font-semibold'>Discover Recipes</span>
                <button
  aria-label="reset"
  className="px-1 w-fit py-2 whitespacing-nowrap rounded-md border border-neutral-300 bg-gray-200 hover:bg-gray-300 hover:translate-y-1 duration-200 text-gray-700 font-semibold text-md hover:shadow-md"
  onClick={resetFilters}
>
  Reset Filters
</button>
            </div>
            <div className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-xl">

                <label htmlFor="name" className="block mb-2 mt-5 text-sm font-medium text-gray-900">Search by name</label>
                <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md ">
                        <CiSearch />
                    </span>
                    <input type="text" id="name" value={localSearchTerm} onChange={(e) => setLocalSearchTerm(e.target.value)} className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5" placeholder="Enter recipe name" />
                </div>

                <label htmlFor="cuisine" className="block mb-2 mt-3 text-sm font-medium text-gray-900">Select cuisine</label>
                <div className="flex">
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100">
                        <BiWorld />
                    </span>
                    <select id="cuisine" value={localCuisine} onChange={(e) => setLocalCuisine(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100 border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Choose cuisine</option>
                        {cuisines.map((cuisine) => (
                            <option key={cuisine.id} value={cuisine.id}>{cuisine.name}</option>
                        ))}
                    </select>
                </div>

                <label htmlFor="diet" className="block mb-2 mt-3 text-sm font-medium text-gray-900">Select dietary preference</label>
                <div className="flex">
                    <span className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-500 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 " >
                        <IoFastFoodOutline />
                    </span>
                    <label htmlFor="diet" className="sr-only">Select dietary preference</label>
                    <select id="diet" value={localDiet} onChange={(e) => setLocalDiet(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-e-lg border-s-gray-100  border-s-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                        <option value="">Choose a preference</option>
                        {diets.map(diet => (
                            <option key={diet.id} value={diet.id}>{diet.name}</option>
                        ))}
                    </select>
                </div>

                <button
                    aria-label="search"
                    className="px-4 w-full py-2 mt-4 mb-4 rounded-md border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-1 duration-200 text-gray-700 font-semibold text-md  hover:shadow-md"
                    onClick={handleSearch}
                >
                    Search
                </button>
               
                <hr className='shadow-xl' />
                {/* filters */}

                <h1 className="mx-auto text-center font-bold mt-3">User Reviews</h1>

                <div className="flex items-center ">
                    <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="5-stars">
                        <input type="checkbox"
                            className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            checked={selectedRatings.has('5.0')}
                            onChange={() => handleRatingChange('5.0')}
                            id="5-stars" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label htmlFor="5-stars" className="cursor-pointer flex"><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></label>
                </div>

                <div className="flex items-center ">
                    <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="4-stars">
                        <input type="checkbox"
                            className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            checked={selectedRatings.has('4.0')}
                            onChange={() => handleRatingChange('4.0')}
                            id="4-stars" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label htmlFor="4-stars" className="cursor-pointer flex"><FaStar /><FaStar /><FaStar /><FaStar /></label>
                </div>

                <div className="flex items-center ">
                    <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="3-stars">
                        <input type="checkbox"
                            className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            checked={selectedRatings.has('3.0')}
                            onChange={() => handleRatingChange('3.0')}
                            id="4-stars" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label htmlFor="3-stars" className="cursor-pointer flex"><FaStar /><FaStar /><FaStar /></label>
                </div>
                <div className="flex items-center ">
                    <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="2-stars">
                        <input type="checkbox"
                            className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            checked={selectedRatings.has('2.0')}
                            onChange={() => handleRatingChange('2.0')}
                            id="4-stars" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label htmlFor="2-stars" className="cursor-pointer flex"><FaStar /><FaStar /></label>
                </div>
                <div className="flex items-center ">
                    <label className="relative flex items-center p-2 rounded-full cursor-pointer" htmlFor="1-stars">
                        <input type="checkbox"
                            className="before:content[''] peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                            checked={selectedRatings.has('1.0')}
                            onChange={() => handleRatingChange('1.0')}
                            id="1-stars" />
                        <span
                            className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                stroke="currentColor" strokeWidth="1">
                                <path fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                    </label>
                    <label htmlFor="4-stars" className="cursor-pointer flex"><FaStar /></label>
                </div>

                <h1 className="mx-auto text-center font-bold mt-3 mb-3">Recipe Difficulty</h1>

                {difficulties.map((difficulty) => (
                    <div className="inline-flex items-center mx-0.5" key={difficulty.id}>
                        <label className="relative flex items-center justify-center w-20 h-10 p-2 rounded-full cursor-pointer border border-gray-900/20 transition-all hover:scale-105 peer">
                            <input type="checkbox"
                                className="peer absolute w-full h-full opacity-0 cursor-pointer"
                                id={difficulty.id}
                                onChange={() => handleDifficultyChange(difficulty.id)}
                                checked={localDifficulties.has(difficulty.id)}
                            />
                            <span className="absolute w-full h-full rounded-full bg-gray-900/10 peer-checked:bg-violet-500 transition-all"></span>
                            <span className="relative text-gray-900 transition-opacity pointer-events-none peer-checked:text-white">
                                {difficulty.name}
                            </span>
                        </label>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default SideMenu