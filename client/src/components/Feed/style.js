import {makeStyles} from '@material-ui/core/styles'


const useStyles =  makeStyles((theme) => ({

    leftSide:{
        height: '100vh',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
          },
        
    },
    rightSide:{
        height: '100vh',
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
          },
    }

}))    



export default useStyles