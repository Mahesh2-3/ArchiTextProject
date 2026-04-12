import React from 'react';

const SidebarSkeleton = () => {
    return (
        <div className='animate-pulse flex flex-col gap-6 w-full'>
            {/* Skeleton Project 1 */}
            <div className='flex flex-col gap-3'>
                <div className='h-5 bg-gray-400/50 rounded-md w-1/2'></div>
                <div className='flex flex-col gap-2 pl-4 border-l-2 border-gray-400/30 ml-1'>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[80%] mt-1'></div>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[60%]'></div>
                </div>
            </div>

            {/* Skeleton Project 2 */}
            <div className='flex flex-col gap-3'>
                <div className='h-5 bg-gray-400/50 rounded-md w-2/3'></div>
                <div className='flex flex-col gap-2 pl-4 border-l-2 border-gray-400/30 ml-1'>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[70%] mt-1'></div>
                </div>
            </div>
            
            {/* Skeleton Project 3 */}
             <div className='flex flex-col gap-3'>
                <div className='h-5 bg-gray-400/50 rounded-md w-1/3'></div>
                <div className='flex flex-col gap-2 pl-4 border-l-2 border-gray-400/30 ml-1'>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[90%] mt-1'></div>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[50%]'></div>
                    <div className='h-4 bg-gray-300/50 rounded-md w-[75%]'></div>
                </div>
            </div>
        </div>
    )
}

export default SidebarSkeleton;
