import axios from "axios";
import router from "./router";
const request = axios.create({
  //可以透過這裡找尋api位置
  baseURL: `${import.meta.env.VITE_APP_API_URL}/api`,
});

request.interceptors.request.use(
  (config) => {
    // 在發送請求之前做些什麼
    return config;
  },
  (error) => {
    console.error("請求錯誤：", error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    console.log("Axios 響應：" + response);
    return response.data;
  },
  (error) => {
    console.error("Axios 響應：" + error);
    if (error.response) {
      const statusCode = error.response.status;
      if (statusCode === 401) {
        console.error("未經授權，請重新登入");
        router.push("/Login");
      } else if (statusCode === 404) {
        console.error("404未找到請求的資源。", error.response.data);
      } else if (statusCode === 500) {
        console.error("系統錯誤", error.response.data);
      } else {
        console.error("其他錯誤:", error.response.data);
      }
    }else{
        console.error("請求錯誤:", error.message);
    }
    return Promise.reject(error);
  }
);
export default request;
