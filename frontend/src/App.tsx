
import { ThemeProvider } from '@mui/material/styles'; 
import CssBaseline from '@mui/material/CssBaseline'; 

import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/Homepage"
import RegisterPage from './pages/registerPage.tsx';
import Navbar from "./components/Navbar"
import theme from './theme.ts'

import '@fontsource/cairo/300.css';  // Light
import '@fontsource/cairo/400.css';  // Regular
import '@fontsource/cairo/500.css';  // Medium
import '@fontsource/cairo/700.css';
import AuthProvider from './contex/Auth/AuthProvider.tsx';
import LoginPage from './pages/loginPage.tsx';
import CartPage from './pages/cartPage.tsx';
import ProtectedPage from './components/protectedPage.tsx';
import CartProvider from './contex/cart/cartProvider.tsx';
import CheckOutPage from './pages/CheckOutPage.tsx';
import OrderSuccess from './pages/orderSuccess.tsx';


function App() {

  return (
    <AuthProvider>
    <CartProvider>

              <BrowserRouter>

                    <ThemeProvider theme={theme}>
                      <CssBaseline/>
                      
                                  <Navbar/>

                                  <Routes>
                                          <Route  path="/" element ={<HomePage/>}/>
                                          <Route  path="/register" element ={<RegisterPage/>}/>
                                          <Route  path="/login" element ={<LoginPage/>}/>

                                          <Route element = {<ProtectedPage/>}>
                                          <Route path="/cart" element ={<CartPage/>}/> 
                                          <Route path="/checkout" element ={<CheckOutPage/>}/>
                                          <Route path="/order-success" element ={<OrderSuccess/>}/>  
                                          </Route>   
                                    
                                  </Routes>

                    </ThemeProvider>
              
              </BrowserRouter>
    </CartProvider>
    </AuthProvider>
  )
}

export default App
