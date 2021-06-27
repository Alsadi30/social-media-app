import React,{useState} from 'react'
import {Container,Grid,InputAdornment,FormControl,InputLabel,Input,FormHelperText,Paper,Avatar,Typography,IconButton , Button} from '@material-ui/core'
import {Link as link} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {signUp} from '../../store/actions/authAction' 
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import useStyles from './authStyle'




const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:''
}


const SignUp =()=>{
    const classes = useStyles()
    const [forme,setForm] = useState(initialState)
    const [showPassword,setShowIcon] = useState(false)
     

    const error = useSelector((state)=>state.authReducer.error.error)


  
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(signUp(forme,history))
      //  setForm(initialState)
    }

    const handleChange = (e) =>{
        console.log('I an called')
        setForm({ ...forme, [e.target.name]: e.target.value })
    }

    const showIcon = () =>{
        setShowIcon(!showPassword)
    }

  return (
   
 
     
   <Container component="main" maxWidth="xs">
    
    <Paper elevation={12} className={classes.Grid}>

   <Grid container direction="column"
       justify="center"
         alignItems="center"  >
         <Grid container item spacing={1} justify="center"
         alignItems="center">
           <Grid item >
           <Avatar >
              <LockOutlinedIcon />
             </Avatar>
           </Grid>
           <Grid item >
          <Typography component="h1" variant="h5">
             SignUp
           </Typography>
           </Grid>
     </Grid>
    <form  className={''} onSubmit = {handleSubmit}>
    
     <FormControl className={classes.button} fullWidth  error={error?error.name?true:false:false} >
       <InputLabel htmlFor="name">Name</InputLabel>
          <Input
             name='name'
             fullWidth
            id="name"
            type='text'
            value={forme.name}
            onChange={handleChange}
            aria-describedby="name-aria"
          
            required
            />
          {error?<FormHelperText error id="name-aria">{error.name}</FormHelperText>:''}
       </FormControl> 
    
     <FormControl className={classes.button} fullWidth error={error?error.email?true:false:false} >
       <InputLabel htmlFor="email" >Email</InputLabel>
          <Input
             required
             fullWidth 
            name='email'
            id="email"
            type={'email'}
            value={forme.email}
            onChange={handleChange}
            aria-describedby="email-aria"
             />
          {error?<FormHelperText error id="name-aria">{error.email}</FormHelperText>:''}
       </FormControl>  

       <FormControl className={classes.button} fullWidth error={error?error.password?true:false:false}>
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
            {error?<FormHelperText error id="name-aria">{error.password}</FormHelperText>:''}
       </FormControl>
     
       <FormControl className={classes.button} fullWidth  error={error?error.confirmPassword?true:false:false}>
       <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
          <Input
            fullWidth 
            name='confirmPassword'
            id="confirmPassword"
            type={'password'}
            value={forme.confirmPassword}
            onChange={handleChange}
            aria-describedby="confirmPassword-aria"
             />
            {error?<FormHelperText error id="name-aria">{error.confirmPassword}</FormHelperText>:''}
       </FormControl> 
      <Grid container item>
       <Button className={classes.button} type='submit' variant="contained" color="primary" size="small">Submit</Button>
       <Typography className={classes.link} component={link} to='/login'>
               Already Have An Account? Login
             </Typography>
             </Grid> 
     </form>
     </Grid>
     </Paper>
 
   </Container>
 )

}


export default SignUp;


// codesignal
//hackerrank
//letcode


