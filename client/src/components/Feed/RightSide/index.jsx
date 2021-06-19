import React,{useState} from 'react'
import {Grid,Button, Typography} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import useStyles from './rightStyle'
import CreatePost from '../../CreatePost'

function RightSide() {

    const classes = useStyles()







    return (
        <div>
        <Button variant="outlined" color="primary" className={classes.createPost} >
                <AddIcon className={classes.plus} />
                <CreatePost />
        
        </Button>   

        <Grid>
            <Typography className={classes.typo} variant="h6" color="initial">People You May Know </Typography>
        </Grid>   

        </div>
    )
}

export default RightSide
