import React,{useState, useEffect} from 'react'
import NavBar from '../NavBar'
import RightSide from './RightSide'
import {Grid,Paper,CircularProgress} from '@material-ui/core'
import LeftSide from './LeftSide'
import useStyles from './style'
import { useLocation,useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Posts from './Posts'
import { getPosts } from '../../store/actions/postAction'
import {logout} from '../../store/actions/authAction'
import jwtDecode from 'jwt-decode'
// import ClipLoader from "react-spinners/ClipLoader";


function Feed() {


  const history = useHistory()
  const location = useLocation()
   
  const dispatch = useDispatch()
  

  useEffect(() => {
   
    const token = localStorage.getItem('auth_token')
    
    if (token) {
      const decodedToken = jwtDecode(token);   
      if (decodedToken.exp * 1000 < new Date().getTime()) {
          dispatch(logout(history))
      }
    }
  
  },[location] );





 

  const classes = useStyles()
  const {isLoading} = useSelector(state => state.postReducer)
  const postss = useSelector(state => state.postReducer.posts)
  const [posts,setPost] = useState([])
  
  
  useEffect(() => {
     setPost(postss)
  },[postss])
  
  
  
  
  useEffect(() => {
    setPost(postss)
    dispatch(getPosts())
  },[dispatch])

 
 


 
  return (
        <div>
            <NavBar/>
           <Grid container  spacing={0}>
              
                <Grid item xs={0} md={3}>
                <Paper className={classes.leftSide} elevation={6}>
                 <LeftSide/>
                  </Paper>  
                </Grid>
               
               
                <Grid item xs={12} md={6}>
                <Paper>
            {!posts ? <Paper >Create Post or Subscribe other user to see posts</Paper> : posts.map(post => {
              console.log('at feed before pushing'+post)
               return(<Posts post={post}/>)
            }) 
}
                </Paper>  
                </Grid>
              
            
                <Grid item xs={0} md={3}>
          <Paper className={classes.rightSide} elevation={6} >
             
                           {isLoading ? <CircularProgress color="secondary" />:
                            <RightSide/>}
                  </Paper>  
                </Grid>
             
           </Grid>
           

        </div>


  )
}

export default Feed

