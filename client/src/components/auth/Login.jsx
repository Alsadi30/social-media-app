import React,{useState} from 'react'
import {Container,Grid,InputAdornment,FormControl,InputLabel,Input,FormHelperText,Paper,Avatar,Typography,IconButton , Button} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';




const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUp =()=>{
  
    const [forme,setForm] = useState(initialState)
    const [showPassword,setShowIcon] = useState('false')
     
   

    const handleSubmit = (event) =>{
        event.preventDefault()
       setForm(initialState)
    }

    const handleChange = (e) =>{
        console.log('I an called')
        setForm({ ...forme, [e.target.name]: e.target.value })
    }

    const showIcon = () =>{
        setShowIcon(!showPassword)
    }

 return(
     
   <Container component="main" maxWidth="xs">
    
<Paper elevation={6}>

<Grid container spacing={1}  direction="row"
  justify="center"
  alignItems="center" >
     <Avatar className={''}>
          <LockOutlinedIcon />
     </Avatar>
     <Typography component="h1" variant="h5">
        SignUp
     </Typography>  
     </Grid>
    <form  className={''} onSubmit = {handleSubmit}>
     <Grid container  spacing={2}  direction="column"
  justify="center"
  alignItems="center" >
     

       <Grid item xs={10}>
     <FormControl>
       <InputLabel htmlFor="email">Email</InputLabel>
          <Input
             fullWidth 
            name='email'
            id="email"
            type={'email'}
            value={forme.email}
            onChange={handleChange}
            aria-describedby="email-aria"
             />
            <FormHelperText id="email-aria">Weight</FormHelperText>
       </FormControl>  
       </Grid> 

       <Grid item xs={8}>
       <FormControl>
       <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
             fullWidth 
             name='password'
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={forme.password}
            onChange={handleChange}
            aria-describedby="outlined-weight-helper-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={showIcon}
                
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            />
            <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
       </FormControl>
       </Grid>

       <Grid item>
       <Button onClick={handleSubmit} variant="contained" color="primary" size="small">Submit</Button>
       </Grid>
     </Grid>
     </form>
     </Paper>
 
   </Container>
 )

}


export default SignUp;
