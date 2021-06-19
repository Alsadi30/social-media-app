import React from 'react'
import {Grid,Button,Typography} from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PollRoundedIcon from '@material-ui/icons/PollRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import jwtDecode from 'jwt-decode'
import useStyles from './leftStyle'
import {useSelector} from 'react-redux'



const token = localStorage.getItem('auth_token')







function LeftSide() {
    const user = useSelector((state)=>state.authReducer.user)

    const classes = useStyles()

    return (
        <Grid container item >
            <Grid container item direction='row'>
                <Button className={classes.root}>{(user.profilePics && <img src={`uploads/${user.profilePics}`} alt='ProfilePic' width='20' height='20'/>) || <AccountCircleRoundedIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>{user.name}</Typography> 
            </Grid>
            <Grid container item direction='row'>
                <Button className={classes.root}>{ <SupervisedUserCircleRoundedIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>Subscriber</Typography> 
            </Grid>

            <Grid container item direction='row'>
                <Button className={classes.root}>{ <PersonAddRoundedIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>Subscription Request</Typography> 
            </Grid>

            <Grid container item direction='row'>
                <Button className={classes.root}>{ <PollRoundedIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>Create A Poll</Typography> 
            </Grid>

            <Grid container item direction='row'>
                <Button className={classes.root}>{ <GroupAddRoundedIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>Create A Group</Typography> 
            </Grid>

            <Grid container item direction='row'>
                <Button className={classes.root}>{ <HowToRegIcon/> }</Button>
                <Typography className={classes.userName} variant='h6' color='initial'>Subscribed</Typography> 
            </Grid>
        </Grid>
    )
}

export default LeftSide
