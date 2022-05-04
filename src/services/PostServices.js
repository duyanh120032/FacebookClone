import store from "../store";
import { axiosClient, axiosClientAuth } from "./Api";
import axios from "axios";
import { uploadImage } from "./uploadImage";

export const getPosts = async (token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).get("/api/post");
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("setPosts", response.data.posts);
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const createPost = async (token, post) => {
  store.dispatch("setLoading", true);
  try {
    const { images } = post;
    if (images) {
      const urls = await uploadImage(images);
      console.log("images uploaded", urls);
      post.images = urls;
    }
    const response = await axiosClientAuth(token).post("/api/post/createpost", post);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "success",
      });
      store.dispatch("addPost", response.data.post);
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};

export const likePost = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).patch(`/api/post/likepost/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("likePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};

export const unlikePost = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).patch(`/api/post/unlikepost/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("likePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};

export const deletePost = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).delete(`/api/post/deletepost/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("removePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const commentPost = async (id, token, comment) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).post(`/api/comment/createcomment`, {
      postId: id,
      content: comment,
    });
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("commentPost", { comment: response.data.comment });
      return;
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const updatePost = async (id, token, post) => {
  store.dispatch("setLoading", true);
  try {
    // const { images } = post;
    // if (images) {
    //   const urls = await uploadImage(images);
    //   console.log("images uploaded", urls);
    //   post.images = urls;
    // }
    const response = await axiosClientAuth(token).patch(`/api/post/updatepost/${id}`, post);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("updatePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const savePost = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).patch(`/api/post/savepost/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("savePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const unsavePost = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).patch(`/api/post/unsavepost/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("unsavePost", { post: response.data.post });
      return;
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.data.msg,
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
    store.dispatch("setLoading", false);
  }
};
export const getSavedPosts = async (token) => {
  try {
    const response = await axiosClientAuth(token).get("/api/post/savedposts");
    if(response.data.ok){
      
     return response.data.savedPosts;
    }
  } catch (error) {
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
  }
};
