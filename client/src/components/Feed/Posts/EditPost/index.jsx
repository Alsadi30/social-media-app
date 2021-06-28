import React, {  useState,useRef,useEffect} from 'react';
import {  Editor } from '@tinymce/tinymce-react';
import {
  useDispatch,useSelector
} from 'react-redux'
import { addThumbnail ,editPost } from '../../../../store/actions/postAction'
import ChipInput from 'material-ui-chip-input'
import useStyles from './style'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  DialogActions,
  Button,
  FormControl,
  Input,
  TextField
} from '@material-ui/core';




const initialState = {thumbnail:'',body:'',tags:[]}

export default function EditPost({post}) {
  const classes = useStyles()
  const dispatch = useDispatch()


 
  
  const handleAddChip = (tag) => {
    setForm({ ...formdata, tags: [...formdata.tags, tag] });
  };

  const handleDeleteChip = (chipToDelete) => {
    setForm({ ...formdata, tags: formdata.tags.filter((tag) => tag !== chipToDelete) });
  };
 


// modal controlling  

  // const editorRef = useRef()
  
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }




// thumbnail adding

  
const [image,setImage] = useState({})
const handleImage = (event)=>{
  setImage(event.target.files[0])
}
  
const sendImage = (event) => {
  event.preventDefault()

  let formData = new FormData()

  formData.append('thumbnail', image)
  console.log(formData)
   dispatch(addThumbnail(formData))
}  

  
  // post submit

  const [formdata, setForm] = useState(initialState)

  const thumbnail = useSelector((state)=>state.postReducer.thumbnail)

    useEffect(() => {
    setForm({...formdata,thumbnail})
  },[thumbnail,dispatch])
  

    

  const postSubmit = (e) => {
    e.preventDefault()
    dispatch(editPost(post._id, formdata))
    setForm(initialState)
  
    handleClose()
  }
  
  const handleChange = (event) => {
    setForm({...formdata,[event.target.name]:event.target.value})
  }
  



  return (

      <>
     <MenuItem onClick={handleOpen}>Edit Post </MenuItem>
    

      <Dialog open = {
        open
      }
      onClose = {
        handleClose
      }
      aria-labelledby = "draggable-dialog-title" >
      <DialogTitle style = {
        {
          cursor: 'move'
        }
      }
      id = "draggable-dialog-title" >
          Edit A Post </DialogTitle>

        
          <form onSubmit={postSubmit}>
        <DialogContent>

      <FormControl fullWidth >
            <label htmlFor="thumbnail" > Add Thumbnail </label>
            <Input  name = 'thumbnail' onChange={handleImage}  id = "thumbnail"
      type = {
        'file'
      }
    
    
      aria-describedby = "thumbnail-aria"/>
          </FormControl>
          
          <Button color={image ? 'secondary':''} className={classes.button} variant="contained" onClick={sendImage}>Upload</Button>


     {/* Because of a bug i have to down the reach keyboard .I will add it after fixing the bug */}
          

      {/* <FormControl >

      <Editor


      apiKey = "can26fy98t835op4rihmrhwil1kvxkq8a3g3v3x1yi6btl2u"
      outputFormat = 'text'
      
      onInit = {
        (evt, editor) => editorRef.current = editor
      }
              initialValue="<p>This is the initial content of the editor.</p>"
              onEditorChange={(newValue, editor) => setForm({...forme,body: newValue })}
      init = {
        {
          height: 200,
          menubar: false,
         
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount'
          ],
          toolbar: 'undo redo | formatselect | ' +
            'bold italic backcolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }
       
      }
      />               

    </FormControl> */}

         <TextField
          id="standard-full-width"
          label="Post Body"
          style={{ margin: 8 }}
          placeholder="Write Your Post"
            fullWidth
            multiline
            margin="normal"
            name='body'
          InputLabelProps={{
            shrink: true,
            }}
            value={formdata.body}
            onChange = {
              (event=>handleChange(event))
            }
            
        /> 





        <div style={{ padding: '10px 0', width: '100%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={formdata.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          />
        </div>







        </DialogContent>
        <DialogActions >
          <Button  variant='contained' onClick={
    handleClose
  }
  color = "secondary" >
    Cancel </Button>

    <Button variant='contained' type='submit'
  color = "primary" >
    Submit </Button>  
    </DialogActions >
    </form>
    </Dialog>
    
    </>



)
}