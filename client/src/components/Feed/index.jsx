import React,{useState, useEffect} from 'react'
import NavBar from '../NavBar'
import RightSide from './RightSide'
import {Grid,Paper} from '@material-ui/core'
import LeftSide from './LeftSide'
import useStyles from './style'
import { useDispatch, useSelector } from 'react-redux'
import Posts from './Posts'
import { getPosts } from '../../store/actions/postAction'
import Types from '../../store/actions/type'

function Feed() {
  
  const dispatch = useDispatch()

  const classes = useStyles()

  const postss = useSelector(state => state.postReducer.posts)
  const [posts,setPost] = useState([])
  
  console.log(postss)
  
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
               return(<Posts post={post}/>)
            }) 
}
                </Paper>  
                </Grid>
              
            
                <Grid item xs={0} md={3}>
                <Paper className={classes.rightSide} elevation={6} >
                  <RightSide/>
                  </Paper>  
                </Grid>
             
           </Grid>
           

        </div>


  )
}

export default Feed

