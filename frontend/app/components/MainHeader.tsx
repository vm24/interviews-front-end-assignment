"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const MainHeader = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const menuhandler = () => {
        setOpenMenu(!openMenu);
    }

    return (
        <nav className='bg-white flex justify-between items-center text-xl mb-4 shadow-md px-6 h-20'>
            <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-extrabold -me-2 hover:-translate-y-1 duration-200 text-gray-800 cursor-pointer">Recipe</h1>
                <Image src={'/assets/logo.png'} height={60} width={60} alt='logo' />
                <h1 className="text-3xl font-extrabold -ms-2 hover:-translate-y-1 duration-200 text-gray-800 cursor-pointer">Book</h1>
            </div>

            <div className='relative md:hidden'>
                <button onClick={menuhandler}>
                    {openMenu ?
                        <Image src={'/assets/bars-close.png'} width={70} height={70} quality={100} alt='bars-open' className="hover:translate-y-0.5 duration-500 transform rotate-180" />
                        :
                        <Image src={'/assets/bars-open.png'} width={70} height={70} quality={100} alt='bars-open' className="hover:translate-y-0.5 duration-500" />
                    }
                </button>
                {/* Dropdown Menu */}
                <ul className={`absolute z-40 right-0 mt-1 bg-white shadow-md rounded-lg overflow-hidden ${openMenu ? "scale-y-100" : "scale-y-0"} origin-top transform transition-transform duration-300 ease-in-out flex flex-col items-center`}>
                    <Link href={'/'}>
                        <li className='hover:text-violet-500 px-5 py-3 w-full text-center'>Main</li>
                    </Link>
                    <Link href={'/'}>
                        <li className='hover:text-violet-500 px-5 py-3 w-full text-center'>Cuisines</li>
                    </Link>
                    <Link href={'/'}>
                        <li className='hover:text-violet-500 px-5 py-3 w-full text-center'>Dietary</li>
                    </Link>
                    <Link href={'/add-recipe'}>
                        <button className="relative mb-2  flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 hover:translate-y-0.5 duration-100 w-full">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-50 bg-white rounded-md group-hover:bg-opacity-0">
                                Add
                            </span>
                        </button>
                    </Link>
                    <Link href={'/recipes'}>
                        <button className="relative mb-2 flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 hover:translate-y-0.5 duration-100 w-full">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-50 bg-white rounded-md group-hover:bg-opacity-0">
                                Filter
                            </span>
                        </button>
                    </Link>
                </ul>

            </div>
            {/* Static Menu for larger screens */}
            <ul className="hidden md:flex gap-12 [&>li]:cursor-pointer text-3xl items-center font-extrabold text-center tracking-wide">

                <li className='hover:text-violet-500 '><Link href={'/'}>Main</Link></li>

                <li className='hover:text-violet-500'><Link href={'/'}>Cuisines</Link></li>

                <li className='hover:text-violet-500'><Link href={'/'}>Dietary</Link></li>

                <li className='hover:text-violet-500 flex '>
                    <div>
                        <Link href={'/add-recipe'}>
                            <button className="relative flex items-center justify-center p-0.5  me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 hover:translate-y-0.5 duration-100">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-50 bg-white rounded-md group-hover:bg-opacity-0">
                                    Add
                                </span>
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link href={'/recipes'}>
                            <button className="relative flex items-center justify-center p-0.5 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-purple-200 hover:translate-y-0.5 duration-100">
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-50 bg-white  rounded-md group-hover:bg-opacity-0">
                                    Filter
                                </span>
                            </button>
                        </Link>
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default MainHeader;
