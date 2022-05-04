import store from "../store";
import { axiosClient, axiosClientAuth } from "./Api";
import axios from "axios";
import { uploadImage } from "../services/uploadImage";
export const searchUsers = async (search, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).get(`/api/user/search?username=${search}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      return response.data.users;
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
export const getUser = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).get(`/api/user/getuser/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      return response.data.user;
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
export const addFriend = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token.value).post(`/api/user/addfriend/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("addFriend", { user: response.data.user });
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
export const removeFriend = async (id, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token.value).post(`/api/user/removefriend/${id}`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("removeFriend", { user: response.data.user });
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
export const changeProfilPicture = async (img, token) => {
  // let urls = [];
  // uploadImage([img]).then(async (response) => {
  //   urls = response;
  // });
  store.dispatch("setLoading", true);
  try {
    const urls = await uploadImage([img]);
    console.log(urls);
    const response = await axiosClient.patch(
      `/api/user/changeprofilepicture`,
      { profilePicture: urls[0] },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("setUser", { user: response.data.user });
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

export const updateProfile = async (profile, token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).patch(`/api/user/updateprofile`, profile);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("setUser", { user: response.data.user });
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

// export const likePost = async (id, token) => {
//   store.dispatch("setLoading", true);
//   try {
//     const response = await axiosClientAuth(token).patch(`/api/post/likepost/${id}`);
//     if (response.data.ok) {
//       store.dispatch("setLoading", false);
//       store.dispatch("likePost", { post: response.data.post });
//       return;
//     } else {
//       store.dispatch("setLoading", false);
//       store.dispatch("setNotify", {
//         msg: response.data.msg,
//         type: "error",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     store.dispatch("setNotify", {
//       msg: error.response.data.msg,
//       type: "error",
//     });
//     store.dispatch("setLoading", false);
//   }
// };

// export const unlikePost = async (id, token) => {
//   store.dispatch("setLoading", true);
//   try {
//     const response = await axiosClientAuth(token).patch(`/api/post/unlikepost/${id}`);
//     if (response.data.ok) {
//       store.dispatch("setLoading", false);
//       store.dispatch("likePost", { post: response.data.post });
//       return;
//     } else {
//       store.dispatch("setLoading", false);
//       store.dispatch("setNotify", {
//         msg: response.data.msg,
//         type: "error",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     store.dispatch("setNotify", {
//       msg: error.response.data.msg,
//       type: "error",
//     });
//     store.dispatch("setLoading", false);
//   }
// };

// export const deletePost = async (id, token) => {
//   store.dispatch("setLoading", true);
//   try {
//     const response = await axiosClientAuth(token).delete(`/api/post/deletepost/${id}`);
//     if (response.data.ok) {
//       store.dispatch("setLoading", false);
//       store.dispatch("removePost", { post: response.data.post });
//       return;
//     } else {
//       store.dispatch("setLoading", false);
//       store.dispatch("setNotify", {
//         msg: response.data.msg,
//         type: "error",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     store.dispatch("setNotify", {
//       msg: error.response.data.msg,
//       type: "error",
//     });
//     store.dispatch("setLoading", false);
//   }
// }

export const suggestionsUser = async (token) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClientAuth(token).get(`/api/user/suggestionsUser`);
    if (response.data.ok) {
      store.dispatch("setLoading", false);
      store.dispatch("setSuggestions", { suggestions: response.data.users });
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

}