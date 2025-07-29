import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../components/constans/baseUrl";


const RegisterPage =  () =>{
    const [error , setError] = useState("");
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const onSubmit = async() =>{
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        // make call to api to create the user
        const Response = await fetch(`${BASE_URL}/user/register` , {
            method : 'POST',
            headers:{"Content-Type": "application/json"},
            body : JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            })
        })

        if(!Response.ok){
            setError("خطأ ما حدث");
            return;
        }
        const data = await Response.json();
        console.log(data);
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
            <Typography variant="h2" fontWeight={700}>إنشاء حساب</Typography>

            <Box sx ={{
                 width :'400px',
                display : 'flex' ,
                 flexDirection : 'column' , 
                gap : 3 , mt : 5 ,
                padding: 7 , 
                borderRadius : 5 ,
                border : 3 ,
                 borderColor : '#f5f5f5'}}>
                <TextField inputRef={firstNameRef} label = ' الإسم ' name="firstName"/>
                <TextField inputRef={lastNameRef} label = 'النسبة' name="lastName"/>
                <TextField inputRef={emailRef} label = 'البريد الإلكتروني' name="email"/>
                <TextField inputRef={passwordRef} type="password" label = 'كلمة السر' name="password"/>
                <Button onClick={onSubmit} variant="contained">إنشاء حساب</Button>
                {error && <Typography sx={{color : 'red' , fontWeight : '700'}}>{error}</Typography>}
            </Box>
        </Box>
       </Container>
    )
}

export default RegisterPage;