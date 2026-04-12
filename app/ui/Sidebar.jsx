"use client";

import React, { useEffect, useState } from 'react'
import ThemeButton from '../Components/ThemeButton'
import { Menu, Close } from '../Helpers/icons'
import Image from 'next/image';
import SidebarSkeleton from '../Skeletons/SidebarSkeleton';

const Sidebar = ({ state, func }) => {
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        const fetchProjects = async () => {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const data = [
                {
                    id: 1,
                    name: "Project Alpha",
                    chats: [
                        { id: 101, title: "Initial Setup" },
                        { id: 102, title: "Bug Fixing" }
                    ]
                },
                {
                    id: 2,
                    name: "Project Beta",
                    chats: [
                        { id: 201, title: "Design Feedback" }
                    ]
                }
            ];
            setProjects(data);
        }
        fetchProjects();
    }, []);

    return (
        <div className='h-full border-r border-gray-300 dark:border-gray-700 bg-(--color-secondary) flex flex-col'>
            {/* Header / Actions */}
            <div className='flex justify-between items-center p-4 shrink-0'>
                <ThemeButton />
                <button
                    onClick={func}
                    className='p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition cursor-pointer text-2xl text-(--text-normal)'
                >
                    {state ? <Close /> : <Menu />}
                </button>
            </div>

            {/* New Project Button */}
            <div className='px-4 pb-4 shrink-0'>
                <button className='w-full py-2 px-4 rounded-md border border-gray-500 dark:border-gray-500 hover:bg-black/5 dark:hover:bg-white/5 transition flex justify-between items-center text-(--text-normal) font-medium cursor-pointer'>
                    <span>New Project</span>
                    <span className='text-xl'>+</span>
                </button>
            </div>

            {/* Project List */}
            <div className='grow overflow-y-auto px-4'>
                {projects.length === 0 ? (
                    <SidebarSkeleton />
                ) : (
                    <ul className='flex flex-col gap-6'>
                        {projects.map((project) => (
                            <li key={project.id} className='flex flex-col gap-2'>
                                <div className='font-bold text-(--text-normal) flex items-center justify-between'>
                                    <span>{project.name}</span>
                                </div>
                                <ul className='flex flex-col gap-1 pl-4 ml-1 border-l-2 border-gray-400 dark:border-gray-600'>
                                    {project.chats.map((chat) => (
                                        <li
                                            key={chat.id}
                                            className='text-sm text-(--text-normal)/80 hover:text-(--text-normal) hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition truncate py-1.5 px-2 rounded-r-md'
                                        >
                                            {chat.title}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* User Profile Container - Sticky Bottom */}
            <div className='p-4 border-t border-gray-300 dark:border-gray-700 shrink-0 flex items-center gap-3 bg-black/5 dark:bg-white/5'>
                <div className='w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 shrink-0 overflow-hidden flex items-center justify-center p-1'>
                    <Image
                        src="/vercel.svg"
                        alt="Profile"
                        className="w-full h-full object-contain"
                        width={40}
                        height={40}
                    />
                </div>
                <div className='flex flex-col overflow-hidden'>
                    <span className='font-bold text-(--text-normal) truncate'>Jane Doe</span>
                    <span className='text-xs text-(--text-normal)/70 truncate'>jane.doe@example.com</span>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
