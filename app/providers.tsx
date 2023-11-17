'use client'

import { ThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

export default function Providers({ children }: PropsWithChildren){
  /* Mapping our preferred Daisyui themes to the light and dark values will not only allow us to use next-themes detection of vendor settings,
  it will also allow us to change those themes only in this component, and keep the 'light' and 'dark' keywords everywhere in the application */
  return <ThemeProvider value={{ light: 'fantasy', dark: 'night' }}>{children}</ThemeProvider>
}