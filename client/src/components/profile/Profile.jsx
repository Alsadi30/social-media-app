import React, { useEffect } from 'react'
import { Grid, Paper, Button } from '@material-ui/core'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { getProfile } from '../../store/actions/profileAction'
import Posts from '../Feed/Posts'
import NavBar from '../NavBar'
import useStyles from './profileStyle'
import { deleteProfile } from '../../store/actions/profileAction'

export default function Profile() {
    const classes = useStyles()
    const dispatch = useDispatch()

  const { _id, profilePics } = useSelector(state => state.authReducer.user)
  const id = useSelector(state => state.profileReducer.profile._id)
  
    const profile = useSelector(state => state.profileReducer.profile)
 
  

    useEffect(() => {
     dispatch(getProfile(_id))
    },[dispatch])
   

    return (
        <>
            <Grid container direction='column' >
                <Grid item>
                  <NavBar />
                </Grid>
            <Grid
                  item
                  spacing={3}
                  container
                   direction="column"
                   justify="flex-end"
                  alignItems="center"
                  className={classes.profileHead}>
                  <Grid item >
                    {profilePics && <img className={classes.profilePic} src={`/uploads/${profilePics}`} alt='ProfilePic' width='150px' height='150px' />}
                  </Grid>
                 <Grid item className={classes.profileName}>
                    {profile?.name}
                 </Grid>
            <Grid className={classes.button} container alignItems='end' justify='flex-end'>
               <Button component={Link} to='/create-profile'  variant="contained">Edit Profile</Button>
              <Button  className={classes.btn} variant="contained" color='secondary' onClick={()=>dispatch(deleteProfile(id))}>Delete Account </Button>
            </Grid>
              
              </Grid>
          
                <Grid container item className={classes.about} direction='column' spacing={2} alignItems='center'>
                    
                <Grid item className={classes.topo}>
                   Bio : {profile?.bio}
                </Grid>
                <Grid item  className={classes.topo}>
                   Language:  {profile?.language}
                </Grid>
                <Grid item className={classes.topo}>
                    Institute : {profile?.institute}
                </Grid>
            </Grid>
                <Grid
                    item
                 container
                 direction="column"
                 justify="center"
                 alignItems="center">
                    <Grid item spacing={2} xs={12} md={8} lg={6}>
                    {!profile.post ? <Paper >Create Post or Subscribe other user to see posts</Paper> : profile?.post.map(posts => {
               return(<Posts post={posts}/>)
            }) 
}
                  </Grid>
                </Grid>
                
               
                </Grid>
        </>
    )
}
