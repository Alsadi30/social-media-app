import {makeStyles} from '@material-ui/core/styles'



const useStyles = makeStyles((theme) => ({
 
    profileHead: {
        margin:'1px',
        width: '100%',
        height: '500px',
        backgroundColor:'#546e7a'
    },
    profilePic: {
        borderRadius:100
    },
    profileName: {
        fontSize:'35px',
    },
    about: {
        backgroundColor: '#efebe9',
        margin:'1px',
        width: '192vh',
        fontSize: '22px'
    },
    topo: {
        display: 'block'
    },
    button: {
        padding:'0px 10px 10px 0px'
    },
    btn: {
        margin:'0px 0px 0px 10px'
    }



}))


export default useStyles