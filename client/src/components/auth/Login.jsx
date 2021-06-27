import React,{useState} from 'react'
import {Container,Grid,InputAdornment,FormControl,InputLabel,Input,FormHelperText,Paper,Avatar,Typography,IconButton , Button} from '@material-ui/core'
import {Link as link} from 'react-router-dom'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {login} from '../../store/actions/authAction'
import {useDispatch,useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import useStyles from './authStyle'


const initialState = {
    name:'',
    email:'',
    password:'',
    confirmPassword:''
}


const Login =()=>{
  
    const classes = useStyles()
    const [forme,setForm] = useState(initialState)
    const [showPassword,setShowIcon] = useState(false)
    const error = useSelector((state)=>state.authReducer.error.error)
   
    const dispatch = useDispatch()
  const history = useHistory()
  


  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       handleSubmit(event)
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, []);

    const handleSubmit = (event) =>{
        event.preventDefault()
        dispatch(login(forme,history))
      console.log(forme)
        //  setForm(initialState)
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
           LogIn
         </Typography>
         </Grid>
   </Grid>
  <form  className={''} onSubmit = {handleSubmit}>
  
   
  
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
   
      <Grid container item>     
     
     <Button className={classes.button} type='submit' variant="contained" color="primary" size="small">Submit</Button>
     
             <Typography className={classes.link} component={link} to='/signup'>
               Create A Account! SignUp
             </Typography>
     </Grid>
   </form>
   </Grid>
   </Paper>

 </Container>
 )

}


export default Login;
