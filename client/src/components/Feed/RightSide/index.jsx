import React,{useEffect} from 'react'
import {Grid,Button, Typography} from '@material-ui/core'
import useStyles from './rightStyle'
import CreatePost from '../../CreatePost'
import {useDispatch,useSelector} from 'react-redux'
import {getUsers} from '../../../store/actions/profileAction'
import Users from './Users'

function RightSide() {
    const dispatch = useDispatch()
    const classes = useStyles()

    const users = useSelector(state => state.profileReducer.users)


    useEffect(() => {
      dispatch(getUsers())
  },[dispatch])





    return (
        <>
        <Button variant="outlined" color="primary" className={classes.createPost} >
              
                <CreatePost />
        
        </Button>   

        <Grid>
            <Typography className={classes.typo} variant="h6" color="initial">People You May Know </Typography>
            </Grid>
            <Grid container>
            {users.map(user => 
                <Grid item>
                   
                    <Users user={user} />
                </Grid>   
                    )}
               
            </Grid>

        </>
    )
}

export default RightSide
