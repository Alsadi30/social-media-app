import React,{useState} from 'react'
import {Container,AppBar, Grid,InputAdornment,FormControl,InputLabel,Input,FormHelperText,Paper,Avatar,Typography,IconButton , Button,TextField, Toolbar} from '@material-ui/core'
import FileBase from 'react-file-base64'
import {useHistory} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {createProfile} from '../../store/actions/profileAction'
import axios from 'axios'
import Types from '../../store/actions/type'
 

const initialState ={
    name:'',
    bio:'',
    link:'',
    institute:'',
    birthDate:'',
    gender:'',
    language:''
}

const Profile =() =>{

const [forme,setForm] = useState(initialState)
const history = useHistory()
const dispatch = useDispatch()
const error = useSelector((state)=>state.authReducer.error)


const handleChange = (event) =>{
        console.log()
        setForm({...forme,[event.target.name]:event.target.value})
}

const handleSubmit = (event) =>{
     event.preventDefault()
     console.log(forme)
  dispatch(createProfile(forme,history))
  setForm(initialState)
    
}

const [image,setImage] = useState({})
const handleImage = (event)=>{
  setImage(event.target.files[0])
}
const sendImage=(event)=>{
  event.preventDefault()
  let formData = new FormData()

  formData.append('profilePics',image)
  

  axios.post('http://localhost:8080/auth/profilePics',formData)
   .then(res=>{
    dispatch({ 
      type:Types.SET_USER,
      payload:{
         user:res.data.user
      }
  })
   })
   .catch(e=>console.log(e))
   
  
  }




    return (
        // <Container component='main'  maxWidth="xs">
        <Paper elevation={6} >
        <Grid container xs={12} sm={10} md={6}  spacing={2}  direction="column"
        justify="center"
        alignItems="center" >
              <Grid item  spacing={2}  direction="column"   justify="center"
  alignItems="center">
                <AppBar position="relative" color='transparent'>
                    <Toolbar component='div' variant='regular'> 
                    <Typography variant="h4" align ='center' color='Primary' component='h2'>
                       Create Your Profile
                       </Typography>   
                    </Toolbar>
                </AppBar>	
                </Grid>
                  <form  action='post' className={''} onSubmit = {handleSubmit} encType="multipart/form-data" >

                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">
                  
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

                    </Grid>


                     
                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

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

                    </Grid>


                     
                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

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

                    </Grid>


                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

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

                    </Grid>

                     
                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

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
                       
                     </Grid>
                      
                     
                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">
                        
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

                    </Grid>


                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

                  <div>     
                      <FormControl fullWidth={true} error={error?.error?.profilePics?true:false} >
                       <InputLabel htmlFor="profilePics">Upload Profile Pic</InputLabel>
                      
                       {/* <Input type='file'  accept="image/png, image/jpeg , image/jpg"  multiple={false} onChange={handleChange} name='profilePics' value={forme.profilePics} /> */}
                     
                       {/* <FileBase type='file' multiple={false} onDone={({ base64 }) => setForm({ ...forme, profilePics: base64 })}/> */}
                       <input name='profilePics' type='file'  onChange={handleImage} /> 
                     <button onClick={sendImage}>Upload</button>

                      {error?<FormHelperText error id="profilePics-aria">{error.error?.profilePics}</FormHelperText>:''}
                     </FormControl>
                     </div>

                    </Grid>

                    <Grid item spacing={2} xs={12} sm={10}  direction="column"
                      justify="center"
                       alignItems="center">

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

                    </Grid>

                    <Grid item>
                           <Button onClick={handleSubmit} variant="contained"   color="primary" size="small">Submit</Button> 
                    </Grid>

                    </form>  
                    </Grid>
                
         </Paper>
        //  {/* </Container> */}
    )
}

export default Profile



