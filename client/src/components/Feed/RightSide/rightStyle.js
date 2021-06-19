import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) => ({


    createPost:{
        padding: theme.spacing(1,1),
        margin:theme.spacing(5,5)
    },
    plus:{
        padding: theme.spacing(0,2),
    },
    typo:{
        color:'gray',
       padding: theme.spacing(0,2) 
    } 

}))

export default useStyles