import React, {  useState,useRef,useEffect} from 'react';
import {  Editor } from '@tinymce/tinymce-react';
import {
  useDispatch,useSelector
} from 'react-redux'
import { addThumbnail,createPost } from '../../store/actions/postAction'


import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  FormControl,
  Input,
  InputLabel
} from '@material-ui/core';




const initialState = {thumbnail:'',body:'',tags:''}

export default function CreatePost() {

  const dispatch = useDispatch()


 
  

 


// modal controlling  

  const editorRef = useRef()
  
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

  const [forme, setForm] = useState(initialState)

  const thumbnail = useSelector((state)=>state.postReducer.thumbnail)

  useEffect(() => {
    setForm({...forme,thumbnail})
  },[thumbnail])
  


  const postSubmit = (e) => {
    e.preventDefault()
    dispatch(createPost(forme))
    setForm(initialState)
    handleClose()
  }

  



  return (

      <>
     <Button onClick={handleOpen}>Create A Post</Button>

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
          Create A Post </DialogTitle>
        <DialogContent>

      <FormControl fullWidth >
            <label htmlFor="thumbnail" > Add Thumbnail </label>
            <Input  name = 'thumbnail' onChange={handleImage}  id = "thumbnail"
      type = {
        'file'
      }
    
    
      aria-describedby = "thumbnail-aria"/>
          </FormControl>
          
          <Button onClick={sendImage}>Upload</Button>



      <FormControl >

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

    </FormControl>



    <FormControl fullWidth>
            <InputLabel htmlFor="tag" > Add Tags </InputLabel>
            <Input    name = 'tags' id = "tag" type = {'text' }
  value = {
    forme.tags
  }
  onChange = {
    ((event)=>{setForm({...forme,[event.target.name]:event.target.value})})
  }
  aria-describedby = "thumbnail-aria" />
    </FormControl>







        </DialogContent>
        <DialogActions >
          <Button autoFocus onClick={
    handleClose
  }
  color = "primary" >
    Cancel </Button>

    <Button onClick = {
      postSubmit
    }
  color = "primary" >
    Submit </Button>  
    </DialogActions >

    </Dialog>

    </>



)
}