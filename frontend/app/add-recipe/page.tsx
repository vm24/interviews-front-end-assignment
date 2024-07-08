"use client"
import React, { useEffect, useState } from 'react'
import styles from './addrecipe.module.css'
import MainHeader from '../components/MainHeader'
import Footer from '../components/Footer';
import PanelSideMenu from '../components/panel/Side';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

import { FaEye } from "react-icons/fa";
import { BiRename } from "react-icons/bi";
import { PiCookingPotLight } from "react-icons/pi";
import { GoCodescanCheckmark } from "react-icons/go";
import { FaEuroSign } from "react-icons/fa";
import { IoMdCloseCircle, IoMdRemoveCircleOutline } from "react-icons/io";
import { MdAddBox } from "react-icons/md";


const AddRecipePage = () => {
    const router = useRouter();
    const [recipeName, setRecipeName] = useState('');
    const [recipeInstructions, setRecipeInstructions] = useState('');
    const [recipePrice, setRecipePrice] = useState('');
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedImage , setSelectedImage]:any = useState('');

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

    const [ingredients, setIngredients]: any = useState([]);
    const [currentIngredient, setCurrentIngredient]: any = useState("");
    const addIngredient = () => {
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient("");
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addIngredient();
        }
    };
    const handleIngredientsChange = (event: any) => { setCurrentIngredient(event.target.value);};
    const handleClear = () => {setCurrentIngredient(""); };
    const removeIngredient = (index: any) => {setIngredients(ingredients.filter((_: any, i: any) => i !== index)); };

    const [image, setImage] = useState('/assets/no-image.jpg');
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];
        const reader: any = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
            setSelectedImage(file);
        };
        reader.readAsDataURL(file);
    };
    const handleNameChange = (e:any) => setRecipeName(e.target.value);
    const handleInstructionsChange = (e:any) => setRecipeInstructions(e.target.value);
    const handlePriceChange = (e:any) => setRecipePrice(e.target.value);
    const handleDietChange = (e:any) => { setSelectedDiet(e.target.value);};

    const handleSubmit = async () => {
        if (!recipeName || !selectedCuisine || !selectedDiet || !selectedDifficulty || !ingredients || !image) {
            toast.error('Please fill in all required fields.');
            return;
        }
        const formData = new FormData();
        formData.append('name', recipeName);
        formData.append('ingredients', ingredients); 
        formData.append('instructions', recipeInstructions);
        formData.append('cuisineId', selectedCuisine);
        formData.append('dietId', selectedDiet);
        formData.append('difficultyId', selectedDifficulty);
        formData.append('image', selectedImage);

        try {
            const response = await fetch('http://192.168.1.53:8080/recipes', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                toast.success('Recipe added successfully.', { duration: 3000 });
                router.push(`/recipes`);
            } else {
                throw new Error(result.message);
            }
        } catch (error:any) {
            console.error('Failed to submit recipe:', error.message);
            toast.error('Failed to add recipe.', { duration: 3000 });
        }
    };

    //side menu ( mobile / larger screens)
    const [openPanelSideMenu, setOpenPanelSideMenu] = useState(false);
    useEffect(() => {
        const updateVisibility = () => setOpenPanelSideMenu(window.innerWidth >= 768);
        updateVisibility();
        window.addEventListener('resize', updateVisibility);
        return () => window.removeEventListener('resize', updateVisibility);
    }, []);
    const togglePanelSideMenu = () => setOpenPanelSideMenu(!openPanelSideMenu);

    return (
        <main className={styles.addRecipesPage} >
            <div className='bg-gray-100 w-full min-h-screen'>
                <MainHeader />
                <div className='flex justify-start items-start'>
                    <PanelSideMenu open={openPanelSideMenu} toggleMenu={togglePanelSideMenu} image={image} />
                    <main className='flex-1 mx-4 rounded-lg p-4 bg-slate-50'>
                        <button onClick={() => router.back()} className="px-4 w-fit py-2 mt-4 mb-2 rounded-xl border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-0.5 duration-200 text-white font-semibold text-md  hover:shadow-md">
                            Back
                        </button>
                        <button onClick={handleSubmit} className="px-4 w-72 mx-5 py-2 mt-4 mb-2 rounded-xl border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-1 duration-200 text-white font-semibold text-md  hover:shadow-md">
                            Submit Recipe
                        </button>
                        <div className="flex flex-col bg-slate-50 p-4 rounded-2xl overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                            <h1 className='items-start sm:text-2xl text-xl font-semibold'>Recipe Details</h1>

                            <label htmlFor="item-name" className="block mb-1 mt-5 text-md font-semibold text-gray-900 ">Recipe Name</label>
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <BiRename />
                                </div>
                                <input type="text" value={recipeName} onChange={handleNameChange} id="item-name" className="bg-gray-50 border border-violet-300 text-gray-900 text-md rounded-xl focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-3.5 " placeholder="Enter recipe name (e.g. Pasta Carbonara)" />
                            </div>

                            <label htmlFor="item-instructions" className="block mb-1 mt-3 text-md font-semibold text-gray-900 ">Recipe Instructions</label>
                            <div className="relative mb-3">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <GoCodescanCheckmark />
                                </div>
                                <input type="text" value={recipeInstructions} onChange={handleInstructionsChange} id="item-instructions" className="bg-gray-50 border border-violet-300 text-gray-900 text-md rounded-xl focus:ring-violet-500 focus:border-violet-500 block w-full ps-10 p-3.5 " placeholder="Add a brief description" />
                            </div>

                            <div>
                                <label htmlFor="item-ingredients" className="block mb-1 mt-3 text-md font-semibold text-gray-900 ">Ingredients</label>
                                <div className="relative mb-3">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                                        <PiCookingPotLight />
                                    </div>
                                    <input
                                        type="text"
                                        id="item-ingredients"
                                        className="bg-gray-50 border border-violet-300 text-gray-900 text-md rounded-xl focus:ring-violet-500 focus:border-violet-500 block w-full pl-10 pr-16 p-3.5"
                                        placeholder="Add ingredients"
                                        value={currentIngredient}
                                        onChange={handleIngredientsChange}
                                        onKeyDown={handleKeyDown}
                                    />
                                    <button
                                        onClick={addIngredient}
                                        className="absolute inset-y-0 right-0 mr-10 flex items-center pr-2"
                                    >
                                        <MdAddBox className="text-green-500 text-lg cursor-pointer" />
                                    </button>
                                    {currentIngredient && (
                                        <button
                                            onClick={handleClear}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        >
                                            <IoMdCloseCircle className="text-violet-500 text-lg cursor-pointer" />
                                        </button>
                                    )}
                                </div>
                                <ul className="list-disc pl-10">
                                    {ingredients.map((ingredient: any, index: any) => (
                                        <li key={index} className="relative pl-6 flex  items-center">
                                            {ingredient}
                                            <button onClick={() => removeIngredient(index)} className="absolute left-0  text-red-500 hover:text-red-700">
                                                <IoMdRemoveCircleOutline className="text-lg cursor-pointer " />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col bg-slate-50 p-4 rounded-2xl overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                            <h1 className='items-start sm:text-2xl text-xl font-semibold'>Image</h1>

                            <div className="flex items-center justify-center w-full">
                                <div className="mr-4">
                                    <Image
                                        src={image}
                                        alt="Preview"
                                        width={100}
                                        height={100}
                                        className="rounded-lg"
                                    />
                                </div>
                                <label htmlFor="dropzone-file" className="flex flex-col mt-3 items-center justify-center w-full h-40 border-2 border-violet-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5 a4 4 0 0 0 0 8 h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" onChange={handleImageChange} />
                                </label>
                            </div>

                        </div>

                        <div className="flex flex-col bg-slate-50 p-4 rounded-2xl overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                            <h1 className='items-start sm:text-2xl text-xl font-semibold'>Price Details</h1>

                            <label htmlFor="price" className="block mb-1 mt-3 text-md font-semibold text-gray-900 ">Price</label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-violet-300 border-e-0 rounded-s-md ">
                                    <FaEuroSign />
                                </span>
                                <input type="text" id="price" value={recipePrice} onChange={handlePriceChange} className="rounded-none rounded-e-lg bg-gray-50 border border-violet-300 text-gray-900 focus:ring-violet-500 focus:border-violet-500 block flex-1 min-w-0 w-full text-md p-3.5 " placeholder="Amount" />
                            </div>
                        </div>

                        <div className="flex flex-col bg-slate-50 p-4 rounded-2xl overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                            <h1 className='items-start sm:text-2xl text-xl font-semibold'>Diet & Attributes</h1>

                            <label htmlFor="recipe-category" className="block mb-1 mt-3 text-md font-semibold text-gray-900 ">Select diet type</label>
                            <select id="diet" value={selectedDiet} onChange={handleDietChange} className="bg-gray-50 border border-violet-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3.5 ">
                                <option value="">Select diet type</option>
                                {diets.map(diet => (
                                    <option key={diet.id} value={diet.id}>{diet.name}</option>
                                ))}
                            </select>

                            <label htmlFor="cuisine" className="block mb-1 mt-5 text-md font-semibold text-gray-900 ">Cuisine Type</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 ">
                                {cuisines.map(cuisine => (
                                    <div key={cuisine.id} className="inline-flex items-center mb-2">
                                        <label className="relative flex items-center p-2 rounded-full cursor-pointer">
                                            <input type="radio"
                                                name="cuisine"
                                                id={cuisine.name}
                                                value={cuisine.id}
                                                checked={selectedCuisine === cuisine.id}
                                                onChange={(e) => setSelectedCuisine(e.target.value)}
                                                className="peer relative h-7 w-7 cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-violet-500 checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                                            />
                                            <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"
                                                    stroke="currentColor" strokeWidth="1">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                            </span>
                                        </label>
                                        <label htmlFor={cuisine.name} className="cursor-pointer ml-2">{cuisine.name}</label>
                                    </div>
                                ))}
                            </div>

                            <label htmlFor="difficulty" className="block mb-1 mt-5 text-md font-semibold text-gray-900 ">Difficulties</label>
                            <div className="inline-flex items-center gap-3">
                                {difficulties.map(difficulty => (
                                    <label key={difficulty.id} className="relative flex items-center justify-center w-20 h-10 p-2 rounded-full cursor-pointer border border-gray-900/20 transition-all hover:scale-105 peer">
                                        <input type="radio"
                                            className="peer absolute w-full h-full opacity-0 cursor-pointer"
                                            name="difficulty"
                                            id={difficulty.name}
                                            value={difficulty.id}
                                            checked={selectedDifficulty === difficulty.id}
                                            onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        />
                                        <span className="absolute w-full h-full rounded-full bg-gray-900/10 peer-checked:bg-violet-500 transition-all"></span>
                                        <span className="relative text-gray-900 transition-opacity pointer-events-none peer-checked:text-white">
                                            {difficulty.name}
                                        </span>
                                    </label>
                                ))}

                            </div>
                            <button onClick={handleSubmit} className="px-4 w-full py-2 mt-4 mb-2 rounded-xl border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-1 duration-200 text-white font-semibold text-md  hover:shadow-md">
                                Submit Recipe
                            </button>
                        </div>
                    </main>
                </div>

                {/* preview bottom button */}
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 1000
                }}>
                    <button onClick={togglePanelSideMenu} style={{
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
                    ><FaEye />
                    </button>
                </div>

            </div>
            <Footer />
        </main>
    )
}

export default AddRecipePage