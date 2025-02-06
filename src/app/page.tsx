'use client'
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/styles/GlobalStyles";
import theme from "@/styles/theme";
import Task from "./components/Task";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
        <GlobalStyles/>
    < >
      <Task title={"Hello"} taskResume={" Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laborum, commodi."}/>
    </>
  </ThemeProvider>
  )
}

