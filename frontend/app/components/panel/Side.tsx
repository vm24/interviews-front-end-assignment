"use client"
import React from 'react'
import { FaArrowCircleLeft } from "react-icons/fa";
import Image from 'next/image';
import Calendar from 'react-calendar'

const PanelSideMenu = ({ open, toggleMenu,image  }: any) => {
    return (
        <div className={`fixed inset-y-0 left-0 z-40 ${open ? "translate-x-0" : "-translate-x-full"} bg-white w-80 rounded-r-lg shadow-md p-4 transition-transform duration-300 ease-in-out md:relative`} style={{ scrollBehavior: 'smooth' }}>
            <div className="flex items-center gap-3">
                <button onClick={toggleMenu} >
                    <FaArrowCircleLeft className="cursor-pointer item hover:-translate-x-1 duration-200" size={20} />
                </button>
                <span className='font-semibold'>Preview</span>

            </div>
            <div className="p-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-gray-100 scrollbar-thumb-rounded-full scrollbar-track-rounded-full rounded-xl">

            <div className="flex flex-col items-center justify-center bg-slate-50 p-2 rounded-md overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                <h1 className="flex items-center justify-center text-center font-semibold">Recipe Preview</h1>
                <Image src={image} alt="item-image" width={200} height={200} quality={100} className="rounded-lg shadow-sm border border-gray-300 m-2" />
            </div>
            <div className="flex flex-col items-center justify-center bg-slate-50 p-3 rounded-md overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                <button className="px-4 w-full py-2 mt-4 mb-2 rounded-xl border border-neutral-300 bg-[#FDA403] hover:bg-orange-400 hover:translate-y-1 duration-200 text-white font-semibold text-md  hover:shadow-md">
                    Submit Recipe
                </button>
                <button className="px-4 w-full py-2 mt-2 mb-2 rounded-xl border border-neutral-300 bg-gray-300 hover:bg-gray-400 hover:translate-y-1 duration-200 text-gray-600 font-semibold text-md  hover:shadow-md">
                    Schedule Recipe
                </button>
                <button className="px-2 w-fit py-2 mt-2 mb-2 rounded-xl border border-neutral-300 bg-gray-100 hover:bg-gray-200 hover:translate-y-1 duration-200 text-gray-600 font-semibold text-md  hover:shadow-md">
                    Save draft
                </button>
            </div>

            <div className="flex flex-col justify-center bg-slate-50 p-3 rounded-md overflow-hidden shadow-lg relative border border-gray-200 mt-3 hover:translate-y-0.5 duration-500">
                <div className="flex justify-between">
                    <h1 className="flex items-start font-semibold">Schedule</h1>
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                </div>
                <div className="flex justify-center items-center">
                    <Calendar className="p-2 text-center items-center" />
                </div>
                <button className="px-4 w-full py-2 mt-2 mb-2 rounded-xl border border-neutral-300 bg-gray-300 hover:bg-gray-400 hover:translate-y-1 duration-200 text-gray-600 font-semibold text-md  hover:shadow-md">
                    Set time
                </button>
            </div>

</div>
        </div>
    )
}

export default PanelSideMenu