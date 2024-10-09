import { createStore } from "vuex";

sessionStorage.setItem("WhereToGo", "/"); // 將預設路徑存到 sessionStorage

// 解析 JWT 的工具函數，用於提取 token 中的過期時間（exp）
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1]; // JWT 中的 payload 部分
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload); // 返回解析后的 JSON 数据
  } catch (e) {
    return null; // 如果解析失败，则返回 null
  }
}

// 用於檢查 JWT 是否過期
function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (payload && payload.exp) {
    const currentTime = Math.floor(Date.now() / 1000); // 以秒为单位获取当前时间
    return payload.exp < currentTime; // 如果当前时间大于 token 过期时间，返回 true
  }
  return true; // 如果没有有效的过期时间，认为 token 已过期
}

const module_LogInInfo = {
  namespaced: true,
  state: () => ({
    accessToken: null, // 存储 access token
    userID: "", // 存储用户ID
    userFirstName: "", // 存储用户名
    userLastName: "", // 存储用户姓
    userEmail: "", // 存储用户邮箱
    userEmailVerified: "", // 存储邮箱验证状态
  }),
  mutations: {
    setAccessToken(state, token) {
      state.accessToken = token;
    },
    setUserInfo(state, { id, firstName, lastName, email, emailVerified }) {
      state.userID = id;
      state.userFirstName = firstName;
      state.userLastName = lastName;
      state.userEmail = email;
      state.userEmailVerified = emailVerified;
    },
  },
  actions: {
    saveAccessToken({ commit }, token) {
      commit("setAccessToken", token);
    },
    saveUserInfo({ commit }, userInfo) {
      commit("setUserInfo", userInfo);
    },
    saveJwtToken({ commit }, token) {
      if (!isTokenExpired(token)) { 
        commit("setJwtToken", token, { root: true }); // 告訴 Vuex 調用的是全局 mutation
      } else {
        commit("removeJwtToken", null, { root: true }); // 全局調用 removeJwtToken
        alert("JWT 已过期，请重新登录");
      }
    },
    logout({ commit }) {
      commit("removeJwtToken");
    },
  },
};

export default createStore({
  state: {
    IsLogIn: false, // 用户登录状态
    // WhereToGo: sessionStorage.getItem("WhereToGo") || "/", // 紀錄用戶被要求登入前所點選的連結
    jwtToken: (() => {
      const token = sessionStorage.getItem("jwtToken");
      if (token && !isTokenExpired(token)) { // **初始化时也检查 token 是否过期**
        return token;
      } else {
        sessionStorage.removeItem("jwtToken");
        return null;
      }
    })(), // 从 sessionStorage 中读取 JWT，并检查是否过期
  },
  mutations: {
    UpdateLogInStatus(state, payload) {
      state.IsLogIn = payload;
    },
    // UpdateWhereToGo(state, path) {
    //   state.WhereToGo = path;
    //   sessionStorage.setItem("WhereToGo", path); // 将路径存储到 sessionStorage
    // },
    setJwtToken(state, token) {
      state.jwtToken = token;
      sessionStorage.setItem("jwtToken", token); // 将 JWT 存储到 sessionStorage
    },
    removeJwtToken(state) {
      state.jwtToken = null;
      sessionStorage.removeItem("jwtToken"); // 删除 sessionStorage 中的 JWT
    },
  },
  modules: {
    LogInInfo: module_LogInInfo,
  },
});
