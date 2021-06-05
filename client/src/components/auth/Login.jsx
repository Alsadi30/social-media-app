import React,{useState} from 'react'
import {Container,Grid,InputAdornment,FormControl,InputLabel,Input,FormHelperText,Paper,Avatar,Typography,IconButton , Button} from '@material-ui/core'

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {login} from '../../store/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'



const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:''
}


const Login =()=>{
  
    const [forme,setForm] = useState(initialState)
    const [showPassword,setShowIcon] = useState(false)
    const error = useSelector((state)=>state.authReducer.error)
   
    const dispatch = useDispatch()
    const history = useHistory()

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(login(forme,history))
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
     
   <Container fixed component="main" maxWidth="xs">
    
<Paper elevation={6}>

<Grid container spacing={1}  direction="row"
  justify="center"
  alignItems="center" >
     <Avatar className={''}>
          <LockOutlinedIcon />
     </Avatar>
     <Typography component="h1" variant="h5">
        Login
     </Typography>  
     </Grid>
    <form  className={''} onSubmit = {handleSubmit}>
     <Grid container  spacing={2}  direction="column"
  justify="center"
  alignItems="center" >
   
     
     
       <Grid item xs={10}>
       <FormControl error={error?.error?.email?true:false} >
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
           {error?<FormHelperText error id="name-aria">{error.error?.email}</FormHelperText>:''}
       </FormControl>  
       </Grid> 

       <Grid item xs={8}>
       <FormControl error={error.error?.password?true:false}>
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
           {error?<FormHelperText error id="name-aria">{error.error?.password}</FormHelperText>:''}
           {error? (error?.error?.email||error?.error?.password)?'':<FormHelperText error id="name-aria">{error?.error?.toString()}</FormHelperText>:''}
            
           {/* {(error?.name || error?.password)?'':<FormHelperText error id="name-aria">{error?error:''}</FormHelperText>} */}
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


export default Login;
