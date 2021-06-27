import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme)=>({
    root: {
      borderRadius: 5,
      border: 0,
      width:35,
      height: 35,
      padding: 0,
      margin: '10px 10px 0px 15px' ,
     
      //   maxWidth: 345,
    },
    image: {
      borderRadius: 50,
      padding:0,
    },
    name: {
      padding: theme.spacing(.4, 0, 0.8, 0),
      margin:theme.spacing(1, 0, 0.8, 0),
   },
   card: {
    padding: '30px',
    margin:'0px 20px 10px 20px'
   },
   thumbnail: {
    margin:'20px'
  },
  body:{
   padding:'5px 10px 5px 20px'
  },
  buttons: {
     backgroundColor: '#eceff1',
     margin: '10px',
     display: 'flex',
     justifyContent: 'space-between',
     borderTop: '1px',
     borderBottom:'1px'
  },
  button: {
    border: 'none',
    color: 'black',
    padding:' 10px 10px 0px 10px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline',
    fontSize: '14px',
    '&:hover': {
      background: "#cfd8dc",
   },
  
  },
  buttonText:{
    display: 'inline',
    margin: '0 5px 5px 5px',
    
  },
  commentInput: {
    backgroundColor:'#fafafa',
    margin:'10px',
    padding: '5px'
  },
  comment: {
    backgroundColor: '#e0e0e0',
    padding: '0px 5px 5px 10px',
    margin:'0px 10px 5px 0px'
  },
  commentName: {
    padding:'10px 0px 0px 15px'
  },
   like: {
     color:'black' 
  },
  liked: {
     color:'blue',
   }

}));

export default useStyles  