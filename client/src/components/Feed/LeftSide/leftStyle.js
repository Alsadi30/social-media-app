import {makeStyles} from '@material-ui/core/styles'

const useStyles =  makeStyles((theme) => ({

    userName:{
        padding: theme.spacing(.7,0,0,0)
    },
    root: {
       
        borderRadius: 3,
        border: 0,
        width:10,
        height: 40,
        padding: '0',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      }

       
}))

export default useStyles