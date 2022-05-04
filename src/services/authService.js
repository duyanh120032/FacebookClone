import store from "../store";
import { useStore } from "vuex";
import { axiosClient, axiosClientAuth } from "./Api";
import { uploadImage } from "./uploadImage";

export const login = async ({ email, password }, router) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClient.post("api/auth/login", {
      email,
      password,
    });
    if (response.data.ok) {
      const { accessToken, user } = response.data;
      localStorage.setItem("token", user.refreshToken);
      store.dispatch("login", { user, token: accessToken });
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: "Login Successfully",
        type: "success",
      });
    
      router.push("/");
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.msg,
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
export const register = async (user, router) => {
  store.dispatch("setLoading", true);
  const res = await axiosClient.post("/api/auth/register", user);
  if (res.data.ok === true) {
    store.dispatch("setLoading", false);
    store.dispatch("setNotify", {
      msg: "Register Successfully",
      type: "success",
    });
    router.push("/login");
  } else {
    store.dispatch("setLoading", false);
    store.dispatch("setNotify", {
      msg: res.data.msg,
      type: "error",
    });
  }

  setTimeout(() => {
    store.dispatch("setLoading", false);
  }, 500);
};
export const generateToken = async (refreshToken, router) => {
  store.dispatch("setLoading", true);
  try {
    const response = await axiosClient.post("/api/auth/refreshtoken", {
      refreshToken,
    });
    if (response.data.ok) {
      const { accessToken, user } = response.data;
      localStorage.setItem("token", user.refreshToken);
      store.dispatch("login", { user, token: accessToken });
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: "Login Successfully",
        type: "success",
      });
    } else {
      store.dispatch("setLoading", false);
      store.dispatch("setNotify", {
        msg: response.msg,
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

export const logout = (router) => {
  store.dispatch("logout");
  localStorage.removeItem("token");
  router.reload();
  // router.push("/login");
};
export const changeCoverAvatar = async (file, token) => {
  // validate file
  store.dispatch("setLoading", true);
  try {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const url = await uploadImage([file]);
      console.log(url);
      const res = await axiosClientAuth(token).patch("/api/user/changeCoverAvatar", {
        coverAvatar: url[0],
      });
      if (res.data.ok) {
        store.dispatch("setLoading", false);
        store.dispatch("changCoverAvatar", url[0]);
        store.dispatch("setNotify", {
          msg: "Change Cover Successfully",
          type: "success",
        });
      } else {
        store.dispatch("setLoading", false);
        store.dispatch("setNotify", {
          msg: res.msg,
          type: "error",
        });
      }
    } else {
      store.dispatch("setNotify", {
        msg: "File is not image",
        type: "error",
      });
    }
  } catch (error) {
    console.log(error);
    store.dispatch("setNotify", {
      msg: error.response.data.msg,
      type: "error",
    });
  }
};
