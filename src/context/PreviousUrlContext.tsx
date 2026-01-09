/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react"
import { useLocation } from "react-router";

type PreviousUrlContextType = {
    previousUrl: string,
    setPreviousUrl: React.Dispatch<React.SetStateAction<string>>
}

export const PreviousUrlContext = createContext<PreviousUrlContextType | undefined>(undefined);

export const usePreviousUrlContext = () => {
    const context = useContext(PreviousUrlContext);
    if (!context) {
        throw new Error('We have an error with PreviousUrlcontext')
    }
    return context
}

export function PreviousUrlProvider({ children }: {children: React.ReactNode}) {
    const location = useLocation();
    const [ previousUrl, setPreviousUrl ] = useState("");

    useEffect(() => {
        return () => {
            setPreviousUrl(location.pathname);
        }
    }, [location])
  return (
    <PreviousUrlContext.Provider value={{ previousUrl, setPreviousUrl }}>
        {children}
    </PreviousUrlContext.Provider>
  )
}
