import { CheckCircleOutline } from "@mui/icons-material";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";


const OrderSuccess = () =>{
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    }
    return(
         <Container fixed sx={{
         mt : '10' ,
         display : " flex" ,
        flexDirection : "column",
          gap : 2,
          alignItems : 'center',
          justifyContent : 'center',
          }}>

            <CheckCircleOutline  sx={{ color : 'green' , fontSize : '100px'}}/>
            <Typography variant="h3">شكرا لتسوّقك منا</Typography>
            <Typography> تم قبولك طلبيتك وتتم معالجتها الآن</Typography>

            <Button onClick={handleGoHome} variant="contained" color="success">عد للرئيسية</Button>

        </Container>
    )
}

export default OrderSuccess;