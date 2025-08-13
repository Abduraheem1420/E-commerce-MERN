import { Box, Container, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useCart } from "../contex/cart/cartContext";

const CartPage = () =>{
    
    const {cartItems , totalAmount} = useCart();

    
    return(

        <Container fixed sx={{mt : '5'}}>
            <Typography variant="h3">السلة</Typography>
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

                    <Box display="flex" flexDirection="row" alignItems="center" gap={5}>
                                <img src={item.Image} width={100}/>

                                <Box>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} X {item.unitPrice} LYD</Typography>
                                    <Button variant="contained">حذف</Button>
                                </Box>
                      </Box>
                                <ButtonGroup variant="contained" aria-label="Basic button group" sx={{height: '40px' , width:'70px'}}>
                                        <Button>-</Button>
                                        <Button>+</Button>
                                </ButtonGroup>
                    
                    
                </Box>
            ))}
            <Box>
                <Typography variant="h4"> Total Amount  : {totalAmount} LYD </Typography>
            </Box>
        </Container>
    )
}


export default CartPage;