'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import Board from "./components/Bord";
import Column from "./components/Column";


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
    < >
      <Board />
    </>
  </ThemeProvider>
  )
}

