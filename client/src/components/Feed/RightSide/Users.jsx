import {Button, Grid, Typography } from '@material-ui/core'
import React from 'react'
import {makeStyles} from '@material-ui/core/styles'


const useStyles =  makeStyles((theme) => ({

    userName:{
        padding: theme.spacing(0,0,0,1.5)
    },
    root: {
       
        borderRadius: 3,
        border: 0,
        width:10,
        height: 40,
        padding: '0',
       
    },
    image: {
        borderRadius:50,
        padding:0,
      },

       
}))


export default function Users({ user }) {
    const classes = useStyles()
    return (
        <Grid container direction='column'>
           
            <Grid item >
            <Button className={classes.root}>
               <img className={classes.image} src={`uploads/${user.profilePics}`} alt='ProfilePic' width='25' height='25' />   
            </Button>
            </Grid>
            <Grid item>
                <Typography className={classes.userName}>
                    {user.name}
                </Typography>
            </Grid>
           
        </Grid>
    )
}
