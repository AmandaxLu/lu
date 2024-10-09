<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div></div>
        <br>
        <h2>&nbsp;&nbsp;&nbsp;&nbsp;正在處理 Google 登入...</h2>
        <br>
        <img src="/images/Loading.gif">
        <br>
        <br>
        <div>
          <h3>Google access token : </h3>
          <h5>{{ GoogleAccessToken }}</h5>
          <h3>JWT : </h3>
          <h5>{{ JWT }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Callback",
  data() {
    return {
      GoogleMail: "",
      GoogleAccessToken: "",
      JWT: "",
    };
  },
  computed: {
  },
  mounted() {
    // 从 URL 中解析 access_token
    const hashParams = new URLSearchParams(window.location.hash.substr(1));
    const accessToken = hashParams.get("access_token");
    if (accessToken) {
      this.GoogleAccessToken = accessToken;
      this.$store.dispatch("LogInInfo/saveAccessToken", accessToken); // 将 access_token 保存到 Vuex
      fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
        // 向 Google 的 userinfo 端点发起请求，获取用户资料
        headers: {
          Authorization: `Bearer ${accessToken}`, // 使用 Bearer Token 进行授权
        },
      })
        .then((response) => response.json())
        .then((userData) => {
          this.GoogleMail = userData.email;
          this.$store.dispatch("LogInInfo/saveUserInfo", {
            // 将用户资料保存到 Vuex
            id: userData.sub, // Google 用户ID
            firstName: userData.given_name, // 名字
            lastName: userData.family_name, // 姓氏
            email: userData.email, // 邮箱
            emailVerified: userData.email_verified, // 邮箱是否验证
          });
          if (this.GoogleMail != "") {
            // 準備藉由確認電子信箱是否已存在於資料庫來判斷是否為會員
            const data = {
              // 構建 POST 請求的數據體，json 格式。
              User_mail: this.GoogleMail,
            };
            fetch("http://127.0.0.1:5000/api/CstmData/LogInProcess", {
              // 使用 fetch API 發送 POST 請求
              method: "POST",
              headers: {
                "Content-Type": "application/json", // 指定發送的數據為 JSON 格式
              },
              body: JSON.stringify(data), // 將 JavaScript 對象轉換為 JSON 字符串
            })
              .then((response) => response.json()) // 解析回應的 JSON 數據
              .then((result) => {
                // console.log("result = ", result);
                this.JWT = result.jwt;
                const jwtToken = result.jwt;
                setTimeout(() => {
                  if (jwtToken) {
                    // 5. 将 JWT 保存到 sessionStorage 和 Vuex
                    localStorage.setItem("jwtToken", jwtToken);
                    this.$store.dispatch("LogInInfo/saveJwtToken", jwtToken); // 将 JWT 保存到 Vuex
                    this.$store.commit("UpdateLogInStatus", result.isMember); // 在 Vuex 裡更新是否為會員
                    if (result.isMember == true) {
                      alert("登入成功！歡迎回來。");
                      this.$router.push(localStorage.getItem("WhereToGo")); // 如果是會員，哪裡來，哪裡去。
                    } else {
                      alert(
                        "Googleg 授權已成功。因為你還未註冊會員，請補全會員資料來完成會員註冊和登入，謝謝。"
                      );
                      this.$router.push("/CstmData"); // 非會員登录成功后，回到會員資料頁面補全資料
                    }
                  } else {
                    console.error("未获取到 JWT");
                  }
                }, 500);
              })
              .catch((error) => {
                // 處理錯誤情況
                console.log(error.queryStatus);
              });
          }
        })
        .catch((err) => {
          console.error("获取用户信息失败", err);
        });
    } else {
      console.error("未找到 access_token");
    }
  },
};
</script>
<style scoped>
div {
  text-align: center;
}
h1 {
  margin-top: 50px;
  margin-bottom: 50px;
}
h3, h5 {
  text-align: left;
  word-wrap: break-word;
}
h5{
  margin-bottom: 50px;
  word-wrap: break-word;
}
span{
  margin-top:50px;
  margin-bottom: 30px;
  display:inline-block;
  font-size: 30px;
}
img{
  width: 40px;
  height:40px;
}
.container{
  padding-top: 50px;
  padding-bottom: 50px;
}
</style>
