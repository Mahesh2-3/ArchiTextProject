import React from 'react'

const ConversationSkeleton = () => {
    return (
        <div className='animate-pulse flex flex-col w-full '>
            {/* Assistant Message Skeleton */}
            <div className='w-full flex justify-start my-3'>
                <div className='bg-gray-300/50 border border-gray-300 dark:border-gray-600 rounded-lg h-12 w-[70%]'></div>
            </div>

            {/* User Message Skeleton */}
            <div className='w-full flex justify-end my-3'>
                <div className='bg-gray-400/50 border border-gray-300 dark:border-gray-500 rounded-lg h-10 w-[40%]'></div>
            </div>

            {/* Assistant Message Skeleton */}
            <div className='w-full flex justify-start my-3'>
                <div className='bg-gray-300/50 border border-gray-300 dark:border-gray-600 rounded-lg h-16 w-[60%]'></div>
            </div>
            {/* User Message Skeleton */}
            <div className='w-full flex justify-end my-3'>
                <div className='bg-gray-400/50 border border-gray-300 dark:border-gray-500 rounded-lg h-10 w-[40%]'></div>
            </div>

            {/* Assistant Message Skeleton */}
            <div className='w-full flex justify-start my-3'>
                <div className='bg-gray-300/50 border border-gray-300 dark:border-gray-600 rounded-lg h-16 w-[60%]'></div>
            </div>
        </div>
    )
}

export default ConversationSkeleton
