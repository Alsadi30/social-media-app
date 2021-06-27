import Types from './type';
import axios from 'axios';

export const addThumbnail = (formData) => (dispatch) => {
  console.log('am hitting');
  axios
    .post('http://localhost:8080/post/thumbnail', formData)
    .then((res) => {
      console.log(res.data.thumbnail);
      dispatch({
        type: Types.SET_THUMBNAIL,
        payload: res.data.thumbnail,
      });
    })
    .catch((e) => console.log(e.message));
};

export const createPost = (post) => (dispatch) => {
  axios
    .post('http://localhost:8080/post', post)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.SET_POST,
        payload: res.data.createdPost
        ,
      });
    })
    .catch((error) => {
      console.log(Types.POST_ERROR);
      dispatch({
        type: Types.POST_ERROR,
        payload: {
          error: error,
        },
      });
    });
};

export const getPosts = () => (dispatch) => {
  axios.get('http://localhost:8080/post').then((res) => {
    dispatch({
      type: Types.GET_POSTS,
      payload: {
        post: res.data.posts,
      },
    });
  });
};

export const getSinglePost = (id) => (dispatch) => {
  axios.get(`http://localhost:8080/post/${id}`)
    .then(res => {
      dispatch({
        type: Types.GET_POST,
        payload:res.data
      })
    })
    .catch(e => {
    console.log(e)
  })
}

export const editPost = (id,data) => (dispatch) => {
  axios.post(`http://localhost:8080/post/${id}`, data)
    .then(res => {
       console.log(res.data)
       dispatch({
         type:Types.EDIT_POST,
         payload:res.data.newPost
       })
     })
    .catch(e => {
      console.log(e)
    })
  
}
  

export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`http://localhost:8080/post/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: Types.DELETE_POST,
        payload:res.data.id
      })
    })
    .catch((e) => {
      console.log(e);
    });
};

export const addLike = (id) => (dispatch) => {
  axios.post(`http://localhost:8080/post/like/${id}`)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: Types.EDIT_POST,
        payload:res.data.updatedPost
       })
    })
    .catch(e => {
      console.log(e)  
    })
}

export const addComment = (id, body) => (dispatch) => {
  axios.post(`http://localhost:8080/post/comment/${id}`, body)
    .then(res => {
      console.log(res.data)
      dispatch({
        type: Types.EDIT_POST,
        payload:res.data
      })
    })
    .catch(e => {
      console.log(e)
    })
}