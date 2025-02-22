'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import Display from "./components/Display";




export default function Home() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
    < >
      <Display/>
    </>
  </ThemeProvider>
  )
}

