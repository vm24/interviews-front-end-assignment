"use client"
import Image from 'next/image'
import React from 'react'
import { GiTomato, GiCarrot, GiChickenOven } from "react-icons/gi";
import HeroPhoto from './HeroPhoto';
import { motion } from "framer-motion"
import Link from 'next/link';

const Hero = () => {

    //framer motion animation h1
    const textAnimation = {
        hidden: { x: -100, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };
    //framer motion animation ul
    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Delays each child's animation by 0.1 seconds
            }
        }
    };
    //framer motion animation li
    const itemVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.5 }
        }
    };
    return (
        <div className="container mx-auto h-full mt-10">
            <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-6">
                {/* text */}
                <div className="text-center xl:text-left order-2 xl:order-none">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        variants={textAnimation}
                        className='text-3xl lg:text-8xl mb-8 font-bold cursor-pointer'
                    >
                        <span className='text-transparent mx-2 bg-clip-text bg-gradient-to-br from-violet-400 to-violet-600 inline-block hover:-translate-y-1 duration-200'>
                            Welcome to
                        </span>
                        <span className='text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-300 inline-block hover:-translate-y-1 duration-200'>
                            Recipe Book
                        </span>
                    </motion.h1>
                    <motion.ul className='text-white space-y-2 text-center md:text-left'
                        initial="hidden"
                        animate="visible"
                        variants={listVariants}
                    >
                        <motion.li variants={itemVariants} className='flex gap-3 items-center justify-start md:justify-start cursor-pointer'>
                            <GiTomato className='text-4xl hover:-translate-y-1 duration-200' color='red' />
                            <span className='text-xl font-semibold tracking-wide text-left hover:-translate-y-1 duration-200'>Global recipes and culinary secrets.</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className='flex gap-3 items-center justify-start md:justify-start cursor-pointer'>
                            <GiCarrot className='text-4xl hover:-translate-y-1 duration-200' color="#fd6603" />
                            <span className='text-xl font-semibold tracking-wide text-left hover:-translate-y-1 duration-200'>Healthy, sustainable eating made easy.</span>
                        </motion.li>
                        <motion.li variants={itemVariants} className='flex gap-3 items-center justify-start md:justify-start cursor-pointer'>
                            <GiChickenOven className='text-4xl hover:-translate-y-1 duration-200' color='orange' />
                            <span className='text-xl font-semibold tracking-wide text-left hover:-translate-y-1 duration-200'>Expert cooking tips and video guides.</span>
                        </motion.li>
                    </motion.ul>

                    <motion.div
                        className='mt-10 mb-10 flex flex-col items-center sm:flex-row gap-3'
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        <Link href={'/recipes'}>
                            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-2xl font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300  hover:translate-y-1 duration-200">
                                <span className="relative px-20 py-4 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    Explore
                                </span>
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* pic */}
                <div className="order-1 xl:order-none mb-8 xl:mb-0">
                    <HeroPhoto />
                </div>
            </div>
        </div>
    )
}

export default Hero