'use client'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const ThemeProviderClient = ({ children }: Props) => {
    return (
        <ThemeProvider defaultTheme='system' attribute="class" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderClient