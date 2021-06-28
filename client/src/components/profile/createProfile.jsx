import React,{useState} from 'react'
import {Container,AppBar, Grid,FormControl,InputLabel,Input,FormHelperText,Paper,Typography, Button,TextField, Toolbar} from '@material-ui/core'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {createProfile,updateProfile} from '../../store/actions/profileAction'
import axios from 'axios'
import Types from '../../store/actions/type'
import setAuthToken from '../../utils/setAuthToken'
import jwtDecode from 'jwt-decode'
import useStyles from './createStyle' 

let initialState ={
    name:'',
    bio:'',
    link:'',
    institute:'',
    birthDate:'',
    gender:'',
    language:''
}

const Profile = () => {
  const classes = useStyles()
  const profile = useSelector(state => state.profileReducer.profile)
  const token = localStorage.getItem('auth_token')
  const decoded = jwtDecode(token)
  if (decoded.profile) {
    initialState = {
      name: profile.name,
      bio:profile.bio,
      link:profile.link||'',
      institute:profile.institute||'',
      birthDate:profile.birthDate,
      gender:profile.gender,
      language:profile.language||''
    }
   }
  
const [forme,setForm] = useState(initialState)
const history = useHistory()
const dispatch = useDispatch()
const error = useSelector((state)=>state.authReducer.error)


const handleChange = (event) =>{
        console.log()
        setForm({...forme,[event.target.name]:event.target.value})
}
console.log(profile._id)
const handleSubmit = (event) =>{
     event.preventDefault()
  if (!decoded.profile) {
    dispatch(createProfile(forme,history))
  } else {
    dispatch(updateProfile(profile._id,forme,history))
  }
  setForm(initialState)
    
  }
  

  const [image, setImage] = useState({})
  
const handleImage = (event)=>{
  setImage(event.target.files[0])
}
const sendImage=(event)=>{
  event.preventDefault()
  let formData = new FormData()

  formData.append('profilePics',image)
  

  axios.post('/auth/profilePics',formData)
   .then(res=>{
    let token = res.data.token
   localStorage.setItem('auth_token',token)
   setAuthToken(token)
    const decode = jwtDecode(token)
   dispatch({ 
       type:Types.SET_USER,
       payload:{
           user:decode
       }
   })
   })
   .catch(e=>console.log(e))
  
  
  }




    return (
        <Container component='main'  maxWidth="sm">
        <Paper elevation={6} className={classes.paper} >
        <Grid container xs={12}  spacing={2}  direction="column"
               justify="center"
               alignItems="center" >
              <Grid item  spacing={2} xs={10}  direction="column"   justify="center"
  alignItems="center">
                <AppBar position="relative" color='transparent'>
                    <Toolbar className={classes.toolbar} component='div' variant='regular'> 
                    <Typography variant="h4"  color='Primary' component='h2'>
                    {decoded.profile?'Update Your Profile':'Create Your Profile'}   
                       </Typography>   
                    </Toolbar>
                </AppBar>	
    
                  <form  className={classes.form} onSubmit = {handleSubmit} >

                  
                      <FormControl fullWidth={true} error={error?.error?.name?true:false} >
                       <InputLabel htmlFor="name">Name</InputLabel>
                      <Input
                       fullWidth 
                      name='name'
                      id="name"
                       type={'text'}
                       value={forme.name}
                       onChange={handleChange}
                      aria-describedby="name-aria"
                        />
                      {error?<FormHelperText error id="name-aria">{error.error?.name}</FormHelperText>:''}
                     </FormControl>

         

                      <FormControl fullWidth={true} error={error?.error?.bio?true:false} >
                       <InputLabel htmlFor="bio">Bio</InputLabel>
                      <Input
                       fullWidth 
                      name='bio'
                      id="bio"
                       type={'text'}
                       value={forme.bio}
                       onChange={handleChange}
                      aria-describedby="bio-aria"
                        />
                      {error?<FormHelperText error id="bio-aria">{error.error?.bio}</FormHelperText>:''}
                     </FormControl>




                      <FormControl fullWidth={true} error={error?.error?.institute?true:false} >
                       <InputLabel htmlFor="institute">Institute</InputLabel>
                      <Input
                       fullWidth 
                      name='institute'
                      id="institute"
                       type={'text'}
                       value={forme.institute}
                       onChange={handleChange}
                      aria-describedby="institute-aria"
                        />
                      {error?<FormHelperText error id="institute-aria">{error.error?.institute}</FormHelperText>:''}
                     </FormControl>

                 
                    <FormControl fullWidth={true} error={error?.error?.gender?true:false} >
                       <InputLabel htmlFor="gender">Gender</InputLabel>
                      <Input
                       fullWidth 
                      name='gender'
                      id="gender"
                       type={'text'}
                       value={forme.gender}
                       onChange={handleChange}
                      aria-describedby="gender-aria"
                        />
                      {error?<FormHelperText error id="gender-aria">{error.error?.gender}</FormHelperText>:''}
                     </FormControl>


                      <FormControl fullWidth={true} error={error?.language?true:false} >
                       <InputLabel htmlFor="language">Language</InputLabel>
                      <Input
                       fullWidth 
                      name='language'
                      id="language"
                       type={'text'}
                       value={forme.language}
                       onChange={handleChange}
                      aria-describedby="language-aria"
                        />
                      {error?<FormHelperText error id="language-aria">{error.error?.language}</FormHelperText>:''}
                     </FormControl>
                       
      
                        
                      <FormControl fullWidth={true} error={error?.error?.link?true:false} >
                       <InputLabel htmlFor="link">Link</InputLabel>
                      <Input
                       fullWidth 
                      name='link'
                      id="link"
                       type={'url'}
                       value={forme.link}
                       onChange={handleChange}
                      aria-describedby="link-aria"
                        />
                      {error?<FormHelperText error id="link-aria">{error.error?.link}</FormHelperText>:''}
                     </FormControl>

               

                   <div className={classes.upload}>     
                      <FormControl fullWidth={true} error={error?.error?.profilePics?true:false} >
                       <InputLabel htmlFor="profilePics">Upload Profile Pic</InputLabel>
        
                       <Input name='profilePics' type='file' id='profilePics'  onChange={handleImage} /> 
                    <Button variant='contained' color={image ? 'secondary':''}  className={classes.button} onClick={sendImage}>Upload</Button>

                      {error?<FormHelperText error id="profilePics-aria">{error.error?.profilePics}</FormHelperText>:''}
                     </FormControl>
                     </div>


                      <FormControl variant={'outlined'} fullWidth={true} error={error?.error?.birthDate?true:false} >
                      
                       <TextField
                            id="outlined-number"
                            label="Date Of Birth"
                            onChange={handleChange}
                            name='birthDate'
                            type="Date"
                            defaultValue={forme.birthDate}
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="outlined"
                                  />
                      {error?<FormHelperText error id="birthDate-aria">{error.error?.birthDate}</FormHelperText>:''}
                     </FormControl>

                           <Button type='submit' className={classes.button} variant="contained"   color="primary" size="small">Submit</Button> 
                   

              </form>
               </Grid>
                    </Grid>
                
         </Paper>
          </Container>
    )
}

export default Profile



