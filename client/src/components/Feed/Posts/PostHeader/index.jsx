import React from 'react'
import { Grid,Typography, IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import useStyles from '../postStyle'
import {useDispatch,useSelector} from 'react-redux'
import {deletePost} from '../../../../store/actions/postAction'
import EditPost from '../EditPost';
import moment from 'moment'







export default function PostHeader({ post }) {
    
 
   const {profilePics,name,_id} = useSelector(state => state.authReducer.user)
    const dispatch = useDispatch()
   
    const handleDelete = () => {
        dispatch(deletePost(post._id))
        handleClose()
  }
  



    const classes = useStyles();


    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };


    return (
       
        <Grid container>
        <Grid container item xs={4}  direction='row'>
          <Grid item>
            {post?.author?.profilePics ? <button className={classes.root}><img className={classes.image} src={`/uploads/${ post.author.profilePics }`} alt='ProfilePic' width='35' height='35' /> </button>:<button className={classes.root}><img className={classes.image} src={`/uploads/${profilePics}`} alt='ProfilePic' width='35' height='35' /> </button> }
            </Grid>    
              <Grid item className={classes.name}>
            { post?.author?.name ? post.author.name:name}
            
            <Typography color="textSecondary"  variant="body2">{moment(post.createdAt).fromNow()}</Typography>
        </Grid>
          </Grid>
         <Grid item xs={7}></Grid>
        <Grid item xs={1} >

        
          
          <IconButton className={classes.EditButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MoreVertIcon onClick={handleClick} />
          </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
            <MenuItem onClick={handleClose}>Bookmark</MenuItem>
            {post?.author?._id === _id &&
            <>
            <div onClick={handleClose}><EditPost post={post}/></div>
            <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
              </>
            }
           
      </Menu>
        </Grid>

      </Grid>
       
    )
}
