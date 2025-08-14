import { Box, Container, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useCart } from "../contex/cart/cartContext";
import { useRef, useState } from "react";
import { BASE_URL } from "../components/constans/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contex/Auth/AuthContext";

const CheckOutPage = () =>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [error , setError] = useState('');
    
    const {cartItems , totalAmount} = useCart();
    const {token} = useAuth();
    const addressRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const handleConfirmOrder = async () =>{

        const address = addressRef.current?.value;
        if(!address) return;

         const Response = await fetch(`${BASE_URL}/cart/checkout` , {
                    method : 'POST',
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization" : `Bearer ${token}`
                    },
                    body : JSON.stringify({
                        address
                    })
                })
        
                if(!Response.ok){
                    setError("خطأ ما حدث");
                    return;
                }

                navigate('/order-success');
    }


     const renderCartItems = () =>(
        <Box sx={{
                  border : 6 , 
                   borderColor : '#f0ececff',
                   borderRadius : 5,
                   boxSizing :'border-box',
                    padding : 3,
                     alignItems : 'center',
        }}>
            {cartItems.map((item) =>(

                <Box sx={{ 
                display : 'flex' ,
                 flexDirection : 'row' ,
                  justifyContent : 'space-between' ,
                   marginBottom: 3,
                   width : "100%"
                   }}>

                    <Box display="flex" flexDirection="row" alignItems="center" gap={5} width='100%'>
                                <img src={item.Image} width={100}/>

                                <Box display="flex" flexDirection="row" alignItems="center" justifyContent="space-between" width='100%'>
                                    <Typography variant="h5">{item.title}</Typography>
                                    <Typography>{item.quantity} X {item.unitPrice} LYD</Typography>
                                </Box>
                      </Box>
                </Box>
            ))}
            

            <Box>
                <Typography variant="body1" sx={{textAlign: "right" , fontWeight : "bold"}}> Total Amount  : {totalAmount} LYD </Typography>
            </Box>

            </Box>
     )

    return(

        <Container fixed sx={{
         mt : '5' ,
         display : " flex" ,
          flexDirection : "column",
          gap : 2
          }}>
                            <Box display="flex" flexDirection="row" justifyContent="space-between" margin={3}>
                            <Typography variant="h3">إتمام الشراء</Typography>
                            </Box>
      <TextField inputRef={addressRef} label = "عنوان التوصيل"  name="address" fullWidth/>
      {renderCartItems()}
      <Button  variant="contained" color="success"  fullWidth onClick={handleConfirmOrder}>إدفع الآن</Button>
        </Container>
    )
}


export default CheckOutPage;