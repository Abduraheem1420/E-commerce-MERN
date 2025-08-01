import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../components/constans/baseUrl";
import { useAuth } from "../contex/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


const LoginPage =  () =>{
    const [error , setError] = useState("");
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    const {login} = useAuth();

    const onSubmit = async() =>{
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if(!email || !password) return;

        // make call to api to create the user
        const Response = await fetch(`${BASE_URL}/user/login` , {
            method : 'POST',
            headers:{"Content-Type": "application/json"},
            body : JSON.stringify({
                email,
                password,
            })
        })

        if(!Response.ok){
            setError("خطأ ما حدث");
            return;
        }
        const token = await Response.json();
        if(!token) return;
        login(email , token)

        navigate("/");
      
    }
    return(
       <Container>
        <Box sx={{
            display : 'flex',
            flexDirection : 'column',
            justifyContent : 'center',
            alignItems : 'center',
            mt : 5,
        }}>
            <Typography variant="h2" fontWeight={700}>تسجيل الدخول </Typography>

            <Box sx ={{
                 width :'400px',
                display : 'flex' ,
                 flexDirection : 'column' , 
                gap : 3 , mt : 5 ,
                padding: 7 , 
                borderRadius : 5 ,
                border : 3 ,
                 borderColor : '#f5f5f5'}}>
                <TextField inputRef={emailRef} label = 'البريد الإلكتروني' name="email"/>
                <TextField inputRef={passwordRef} type="password" label = 'كلمة السر' name="password"/>
                <Button onClick={onSubmit} variant="contained">تسجيل</Button>
                {error && <Typography sx={{color : 'red' , fontWeight : '700'}}>{error}</Typography>}
            </Box>
        </Box>
       </Container>
    )
}

export default LoginPage;