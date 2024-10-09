<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <button
          type="button"
          v-on:click.prevent="Google_LogIn"
          class="btn btn-white border-secondary"
        >
          &nbsp;<img
            src="/images/google logo.png"
            alt=""
            width="30px"
            height="30px"
          />
          &nbsp;&nbsp;使用 Google 帳號登入
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "G_LogIn",
  data() {
    return {
      googleClientId: "",
      redirectUri: "http://localhost:5173/callback",
      googleOAuthUrl: "",
    };
  },
  computed: {
    // ...mapState(["WhereToGo"]),
  },
  methods: {
    Google_LogIn() {
      window.location.href = this.googleOAuthUrl; // 轉址到 Google OAuth 2.0 登入頁面
    },
  },
  mounted() {
    this.googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // 從環境變數中取得 client id
    // Google OAuth 2.0 URL，scope 可以根據需要調整
    this.googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.googleClientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=openid%20email%20profile`;
  },
};
</script>
<style scoped>
div{
  text-align: center;
}
button{
  margin-top: 250px;
  margin-bottom: 250px;
  width:300px;
  height:50px;
}
</style>
