
import { ThemeProvider } from '@mui/material/styles'; 
import CssBaseline from '@mui/material/CssBaseline'; 

import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage"
import Navbar from "./components/Navbar"
import theme from './theme.ts'

import '@fontsource/cairo/300.css';  // Light
import '@fontsource/cairo/400.css';  // Regular
import '@fontsource/cairo/500.css';  // Medium
import '@fontsource/cairo/700.css';

function App() {

  return (
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <Navbar/>
    <Routes>
      <Route  path="/" element ={<HomePage/>}/>
    </Routes>
    </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
