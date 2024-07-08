import React from 'react'

const Footer = () => {
    return (

        <footer className="bottom-0 left-0 z-20 w-full p-4 justify-center text-center bg-white border-t border-gray-200 shadow md:flex md:items-center  md:p-6 ">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">RecipeBook™</a>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap justify-center items-center mx-3 mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                </li>
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                </li>
                <li>
                    <a href="#" className="hover:underline">Contact</a>
                </li>
            </ul>
        </footer>

    )
}

export default Footer