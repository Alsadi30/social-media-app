import React from 'react'
import { Link as link } from 'react-router-dom'
import {Grid,Button,Typography} from '@material-ui/core'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import SupervisedUserCircleRoundedIcon from '@material-ui/icons/SupervisedUserCircleRounded';
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import PollRoundedIcon from '@material-ui/icons/PollRounded';
import GroupAddRoundedIcon from '@material-ui/icons/GroupAddRounded';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import useStyles from './leftStyle'
import { useSelector } from 'react-redux'
import Link from '@material-ui/core/Link'




function LeftSide() {
    const user = useSelector((state)=>state.authReducer.user)

    const classes = useStyles()

    return (
        <Grid container item >
            <Grid container item direction='row'>
                <Button component={Link} to="/profile" className={classes.root}>{(user.profilePics && <img className={classes.image}src={`uploads/${user.profilePics}`} alt='ProfilePic' width='20' height='20'/>) || <AccountCircleRoundedIcon/> }</Button>
                <Link underline='none' to='/profile'  component={link} className={classes.userName} variant='h6' color='inherit'>{user.name}</Link> 
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
