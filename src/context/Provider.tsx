import { PreviousUrlProvider } from "./PreviousUrlContext";
import { ThemeProvider } from "./ThemeContext";

export default function Provider({children}: { children: React.ReactNode}) {
  return (
    <ThemeProvider>
      <PreviousUrlProvider>
        {children}
      </PreviousUrlProvider>
    </ThemeProvider>
  )
}
