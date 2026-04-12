'use client'
import { ThemeProvider } from 'next-themes'

const ThemeProviderClient = ({ children }) => {
    return (
        <ThemeProvider defaultTheme='system' attribute="class" enableSystem>
            {children}
        </ThemeProvider>
    )
}

export default ThemeProviderClient
