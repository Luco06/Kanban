'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import Task from "./components/Task";
import { tasks } from "./mocks/Tasks";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
    < >
      <Task/>
    </>
  </ThemeProvider>
  )
}

