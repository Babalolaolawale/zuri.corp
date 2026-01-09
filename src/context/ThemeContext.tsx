/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react"

type ThemeContextType = {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error("useThemeContext must be used within ThemeProvider")
    }
    return context
}

export function ThemeProvider({children}: { children: React.ReactNode}) {
    const [ isDarkMode, setIsDarkMode ] = useState<boolean>(true);
  return (
    <ThemeContext.Provider value={{ isDarkMode, setIsDarkMode }}>
        {children}
    </ThemeContext.Provider>
  )
}