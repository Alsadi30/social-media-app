import React,{useState} from 'react'
import { Grid, IconButton, Menu, MenuItem } from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch,useSelector} from 'react-redux'
import {deletePost} from '../../../../store/actions/postAction'
import EditPost from '../EditPost';




const useStyles = makeStyles((theme)=>({
    root: {
      borderRadius: 5,
      border: 0,
      width:25,
      height: 25,
      padding: 0,
      marginRight: 10,
      marginTop:10,
      //   maxWidth: 345,
    },
    image: {
      borderRadius:50,
      padding:0,
    },
    name: {
      padding: theme.spacing(1, 0, 0.8, 0),
      margin:theme.spacing(.4, 0, 0.8, 0),
    },
   
    
    
    }));




export default function PostHeader({ user,post }) {
    
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
        <Grid item>
        <button className={classes.root}>{(user.profilePics && <img className={classes.image} src={`http://localhost:8080/uploads/${user.profilePics}`} alt='ProfilePic' width='25' height='25' />) || <AccountCircleRoundedIcon />}</button>          
        </Grid>
        <Grid item className={classes.name}>
        {user.name}
        </Grid>

        <Grid item >

        
          
          <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
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
            <div onClick={handleClose}><EditPost post={post}/></div>
        <MenuItem onClick={handleDelete}>Delete Post</MenuItem>
      </Menu>
        </Grid>

      </Grid>
       
    )
}
