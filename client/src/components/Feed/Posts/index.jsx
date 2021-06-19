import React, { useState,useEffect } from 'react'
// import { getPost } from '../../store/actions/getPostAction'
// import {useDispatch,useSelector} from 'react-redux'
import { Button,Paper,Grid,IconButton, Card, CardActionArea, CardContent, CardMedia, Typography,MenuItem,Menu, CardActions } from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import PostHeader from './PostHeader'




const Posts = ({post}) => {
    
  console.log(post)
    // const dispatch = useDispatch()
  let id = post.author
  console.log(id)

    const [user,setUser] =  useState('') 

    useEffect(()=>{
      axios.get(`http://localhost:8080/post/user/${id}`)
      .then(res => {
        let user = res.data.user
        setUser(user)
        console.log(user)
      })
        .catch(e => {
        console.log(e)
      })
    },[id])
    

    // const user = useSelector((state)=> state.getPostReducer.user)
 
  
    

  return (
   
    
    <Paper>
     
      < PostHeader user={user} post={post}/>
   
          {post.thumbnail &&  <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={`uploads/${post.thumbnail}`}
          title="Contemplative Reptile"
        />}
      
        
            
            
            
        
          
          
            
       
          <Typography variant="body1" color="textSecondary" component="p">
          {post.body}
          </Typography>
          <Typography variant="body2" className={''} color="textPrimary" component="p" >
          {/* {post.tags?.map(tag => {
            return (
               `#${tag}`

             )  
           })
          } */}
          </Typography>
      
    
        <Button size="small" color="primary">
          Like
        </Button>
        <Button size="small" color="primary">
          Comment
        </Button>
        <Button size="small" color="primary">
          Share
        </Button> 
     </Paper>
 
  )


}


export default Posts
