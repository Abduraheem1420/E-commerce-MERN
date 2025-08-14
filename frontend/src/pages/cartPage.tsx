import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../contex/cart/cartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () =>{
    
    const {cartItems , totalAmount , updateItemInCart , deleteItemInCart , clearCart} = useCart();

    const Navigate = useNavigate()

    const handleQuantity = (productId : string , quantity : number) =>{
        if(quantity <= 0) return;
        updateItemInCart( productId , quantity)
    }

    const handleRemoveItem = ( productId : string ) =>{
        deleteItemInCart(productId)
    }


    const handleNavigateCheckOut = () =>{
        Navigate('/checkout');
    }



     const renderCartItems = () =>(
        <Box>
            {cartItems.map((item) =>(

                <Box sx={{ 
                display : 'flex' ,
                 flexDirection : 'row' ,
                  justifyContent : 'space-between' ,
                   marginBottom: 3,
                   alignItems : 'center',
                   border : 6 , 
                   borderColor : '#f0ececff',
                   borderRadius : 5,
                   boxSizing :'border-box',
                   padding : 3,
                   }}>

                    <Box display="flex" flexDirection="row" alignItems="center" gap={3}>
                                <img src={item.Image} width={100}/>

                                <Box>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} X {item.unitPrice} LYD</Typography>
                                    <Button variant="contained" onClick={() => handleRemoveItem(item.productId)}>حذف</Button>
                                </Box>
                      </Box>
                                <ButtonGroup variant="contained" aria-label="Basic button group" sx={{height: '40px' , width:'70px'}}>
                                        <Button onClick={() => handleQuantity(item.productId , item.quantity - 1)}>-</Button>
                                        <Button onClick={() => handleQuantity(item.productId , item.quantity + 1)}>+</Button>
                                </ButtonGroup>
                    
                    
                </Box>
            ))}
            

            <Box display="flex" flexDirection="row" justifyContent="space-between">
                <Typography variant="h4" sx={{fontWeight : "bold"}}> Total Amount  : {totalAmount} LYD </Typography>
                <Button  variant="contained" color="success" onClick={() => handleNavigateCheckOut()}>الدّفع</Button>
            </Box>

            </Box>
     )

     




    return(

        <Container fixed sx={{mt : '5'}}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between" margin={3}>

                            <Typography variant="h3">السلة</Typography>
                            <Button variant="contained" onClick={() => clearCart()}>فرّغ السلة</Button>
                            
                            </Box>

      { cartItems.length ? (renderCartItems()) : (<Typography variant="h4"> السلة فارغة جاهزة لتسوقك</Typography>)}
        </Container>
    )
}


export default CartPage;