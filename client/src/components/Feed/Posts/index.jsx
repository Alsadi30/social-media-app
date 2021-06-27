import React, { useState} from 'react'
// import { getPost } from '../../store/actions/getPostAction'
// import {useDispatch,useSelector} from 'react-redux'
import {  Paper, Grid, InputAdornment, IconButton, CardMedia, Typography,  InputBase } from '@material-ui/core'
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import PostHeader from './PostHeader'
import { useDispatch,useSelector } from 'react-redux'
import moment from 'moment'
import {addLike,addComment} from '../../../store/actions/postAction'
import useStyles from './postStyle'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';
import ShareIcon from '@material-ui/icons/Share';

const Posts = ({post}) => {
     
  const classes = useStyles()

  let userId = useSelector(state=> state.authReducer.user._id) 
  
    const dispatch = useDispatch()
  let id = post._id
  
  const [commentValue, setCommentValue] = useState({'body':''})
  const [isCommentVisible, setCommentVisible] = useState(false)
  
  const handleClick = () => {

    let id = post._id
    dispatch(addLike(id))
  }  

  const sendComment = () => {
    dispatch(addComment(id, commentValue))
    setCommentValue({'body':''})
  }


 
  console.log('before comming to post header'+post)
    

  return (
   
    
    <Paper elevation={12} className={classes.card}>
     
      < PostHeader post={post}/>
      {post.thumbnail && <div className={classes.thumbnail}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="300"
          image={`uploads/${post.thumbnail}`}
          title="Contemplative Reptile"
        />
      </div>}
        
            
            
            
        
          
          
            
       
      <Typography className={classes.body} variant="body1" color="inherit" component="p">
        {console.log(post.body)}
          {post.body}
          </Typography>
          <Typography className={classes.body} variant="body2"color="textPrimary" component="p" >
          {post?.tags&&post?.tags?.map(tag => {
            return (
              `#${tag}  `

             )  
           })
          }
          </Typography>
      
      <div className={classes.buttons}>
        
        <button className={classes.button}  value={post._id} onClick={((event) => handleClick(event))}>
        <Grid container>
            <Grid item className={classes.buttonText}>  <ThumbUpIcon color={post.like?.includes(userId) ? 'primary' : ''} fontSize="small" /> </Grid>
            <Grid item >
              <Typography  className={post.like.includes(userId)?classes.liked:classes.like}>{post.like.includes(userId) ? 'Liked' : 'Like'}    {post.like.length} </Typography></Grid>
            </Grid>
        </button>

        <button className={classes.button} onClick={() => setCommentVisible(!isCommentVisible)}>
          <Grid container>
          <Grid item  className={classes.buttonText} >  <CommentIcon  fontSize="small" /></Grid>
            <Grid item >  Comment  </Grid>
            </Grid>
        </button>
        <button className={classes.button}>
        <Grid container>
          <Grid item className={classes.buttonText}>   <ShareIcon  fontSize="small" /></Grid>
            <Grid item >    Share  </Grid>
            </Grid>
          
        </button>
        </div>
       {
        isCommentVisible &&
        <>
          <Paper   className={classes.commentInput}>
            <InputBase
            fullWidth
            id="outlined-textarea"
            name='body'
            value={commentValue.body}
            onChange={(e)=>setCommentValue({[e.target.name]:e.target.value})}
            inputProps={{ 'aria-label': 'Add A Comment To This Post' }}
            placeholder="Add A Comment To This Post"
          
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="Add A Comment To This Post"  >
                <SendOutlinedIcon onClick={sendComment}/>
              </IconButton>
            </InputAdornment>
          }
          />
          </Paper>
         
          {post.comment.length > 0 && <Paper className={classes.commentInput}>
          
            { post.comment.map(commen => {
                return (
                
                  <Grid container className={classes.comment} item xs={12} direction='column'>
                    <Grid container item>
                      <Grid item xs={1}>
                        <button className={classes.root}>{(commen?.user?.profilePics && <img className={classes.image} src={`http://localhost:8080/uploads/${commen.user.profilePics}`} alt='ProfilePic' width='20' height='20' />) || <AccountCircleRoundedIcon />}</button>
                      </Grid>
                      <Grid xs={10} container item direction='column' className={classes.commentName} >
                        <Grid item >
                      <Typography color='primary' variant="body2" >
                          {commen?.user?.name && commen.user.name}
                          </Typography >
                        </Grid>
                        <Grid>
                        <Typography >
                          {commen.body}
                          </Typography >
                          </Grid>
                        </Grid>

                      </Grid>
                      
                            <Grid container item className={classes.commentBody}>
                      
                             <Typography color="textSecondary"  variant="body2">{moment (commen.createdAt).fromNow()}</Typography> 
                   
                      
                      </Grid>
                     
                  </Grid>
               
                )

            
              })
           
            }  </Paper>}
             
         
         </>
       }

     </Paper>
 
  )


}


export default Posts
