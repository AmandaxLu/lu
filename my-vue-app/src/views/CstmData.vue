<template>
  <div class="container">
    <div class="row">
      <h1 id="h1-title">會員資料</h1>
    </div>
    <hr />
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 form-floating">
        <input
          id="cstmNum"
          class="form-control"
          type="text"
          v-model="cstmNum"
          readonly
          tabindex="-1"
          onfocus="this.blur();"
        />
        <label for="cstmNum" class="form-label">會員編號 : </label>
      </div>
      <div class="col-md-2"></div>
    </div>
    <form id="frm_main" name="frm_cstmData">
      <br />
      <div>
        <h3 id="h3-title">--- 請先設定帳號 ---</h3>
      </div>
      <div class="row">
        <div class="col-md-12 form-floating">
          <input
            id="cstmUserName"
            type="text"
            class="form-control"
            required
            v-model="cstmUserName"
            v-on:change="CheckUserNameUnique"
          />
          <label for="cstmUserName" class="form-label"
            >* 帳號 : ( 英文小寫，數字，"_" 和 "." )</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p
            id="Username_result"
            v-bind:style="{ color: Username_result_color }"
          >
            帳號驗證 : {{ Username_result }}
          </p>
        </div>
      </div>
      <!-- <div class="row">
        <div class="col-md-6 form-floating">
          <input
            id="first_PWD"
            v-model="first_PWD"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-on:change="PWDMatchConfirm"
          />
          <label for="first_PWD" class="form-label"
            >* 輸入密碼 : ( 英文小寫，數字，"_" 和 "." )</label
          >
        </div>
        <div class="col-md-6 form-floating">
          <input
            id="cstmPWD"
            v-model="cstmPWD"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-on:change="PWDMatchConfirm"
          />
          <label for="cstmPWD" class="form-label"
            >* 確認密碼 : ( 英文小寫，數字，"_" 和 "." )</label
          >
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <p id="PWD_result" v-bind:style="{ color: PWDConfirm_result_color }">
            密碼驗證 : {{ PWDConfirm_result }}
          </p>
        </div>
      </div> -->
      <hr />
      <div class="row">
        <div class="col-md-4 form-floating">
          <input
            id="cstmLastName"
            v-model="cstmLastName"
            type="text"
            class="form-control"
            placeholder=""
            readonly
            tabindex="-1"
            onfocus="this.blur();"
          />
          <label for="cstmLastName" class="form-label">* 姓氏 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmFirstName"
            v-model="cstmFirstName"
            type="text"
            class="form-control"
            placeholder=""
            readonly
            tabindex="-1"
            onfocus="this.blur();"
          />
          <label for="cstmFirstName" class="form-label">* 名字 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmLine"
            v-model="cstmLine"
            type="text"
            class="form-control"
            placeholder=""
          />
          <label for="cstmLine" class="form-label">Line 帳號 : </label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 form-floating">
          <input
            id="cstmID"
            v-model="cstmID"
            type="text"
            class="form-control"
            placeholder=""
          />
          <label for="cstmID" class="form-label">身分證號 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmBirth"
            v-model="cstmBirth"
            type="date"
            class="form-control"
            placeholder=""
            required
          />
          <label for="cstmBirth" class="form-label">* 生日 : YYYY/MM/DD </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmTEL"
            v-model="cstmTEL"
            type="text"
            class="form-control"
            placeholder=""
            required
          />
          <label for="cstmTEL" class="form-label">* 手機 : 09##-######</label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-floating">
          <input
            id="cstmEmail"
            v-model="cstmEmail"
            type="text"
            class="form-control"
            placeholder=""
            readonly
            tabindex="-1"
            onfocus="this.blur();"
          />
          <label for="cstmEmail" class="form-label">電子郵件 : </label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-floating">
          <input
            id="cstmAddress"
            v-model="cstmAddress"
            type="text"
            class="form-control"
            placeholder=""
          />
          <label for="cstmAddress" class="form-label">地址 : </label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label for="cstmGender" class="form-label">* 性別 : </label>
          <select
            id="cstmGender"
            v-model="cstmGender"
            class="form-select"
            required
          >
            <option disabled value="" selected>必填，請選擇 ! ! !</option>
            <option value="1">男</option>
            <option value="0">女</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="cstmHowToKnowUs" id="lbl_long" class="form-label"
            >* 如何得知我們 :
          </label>
          <select
            id="cstmHowToKnowUs"
            v-model="cstmHowToKnowUs"
            selected
            class="form-select"
            required
          >
            <option disabled value="" selected>必填，請選擇 ! ! !</option>
            <option
              v-for="item in AllHowToKnowUs"
              :key="item.howNum"
              :value="item.howNum"
            >
              {{ item.howWays }}
            </option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <input
            id="input_checkbox"
            type="checkbox"
            v-model="PrivacyIsChecked"
            @change="(event) => (PrivacyIsChecked = event.target.checked)"
            required
          />
          <label for="input_checkbox" class="form-label"
            >我已同意<a
              href="/garage/PrivacyPolicy.html"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#modal_PrivacyPolicy"
              >隱私權政策</a
            ></label
          >
          <div class="modal fade" id="modal_PrivacyPolicy">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <div class="row">
                    <div class="col-sm-9">
                      <h3>隱私權政策</h3>
                    </div>
                    <div class="col-sm-3">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                      ></button>
                    </div>
                  </div>
                </div>
                <div class="modal-body">
                  <h5>1. 我們收集的信息 我們可能會收集以下類型的個人信息：</h5>
                  <p>聯繫資料：如姓名、電子郵件地址、電話號碼等。</p>
                  <p>帳戶資料：如帳戶名稱、密碼、帳戶活動等。</p>
                  <p>使用者活動：如網站瀏覽記錄、點擊行為、IP 地址等。</p>
                  <h5>2. 信息的使用方式</h5>
                  <p>
                    我們會將您的個人信息用於以下目的： 提供和維護我們的服務。
                    提高我們的網站功能和使用體驗。
                    發送與您感興趣的產品或服務相關的推廣內容。
                    依照法律規定的要求，或在法律允許的範圍內進行數據處理。
                  </p>
                  <h5>3. 數據的共享和披露</h5>
                  <p>
                    除非符合以下情況，否則我們不會向第三方披露您的個人信息：
                    得到您的明確同意。 為提供您所要求的服務必須與合作夥伴分享。
                    為遵守法律規定，或應法律機構要求。
                  </p>
                  <h5>4. 數據的保存期限</h5>
                  <p>
                    我們會在達到收集目的所需的時間內，或根據適用法律的要求保存您的個人信息。
                  </p>
                  <h5>5. 使用者的權利 根據適用的隱私法，您有權：</h5>
                  <p>
                    查閱我們持有的有關您的個人信息。
                    請求更正或刪除不准確的數據。
                    拒絕或限制我們對您個人數據的處理。
                  </p>
                  <h5>6. Cookie 和追蹤技術</h5>
                  <p>
                    我們的網站可能使用 Cookie
                    和其他技術來增強您的使用體驗，並收集使用者數據以分析網站流量和性能。
                  </p>
                  <h5>7. 安全措施</h5>
                  <p>
                    我們採取了技術和組織措施來保護您的個人數據免受未經授權的訪問、使用或洩露。
                  </p>
                </div>
                <div class="modal-footer">
                  <h4>聯繫我們</h4>
                  <p>如果您對我們的隱私政策有任何問題或疑慮，請聯繫：</p>
                  <p>Eden Peng, 0800-092-000, 0800092000@gmail.com</p>
                  <!-- <div id="div_modal_btn">
                      <button
                        id="btn_modal"
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                      >
                        關閉
                      </button>
                    </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <p id="p_mustHave">* 必填欄位</p>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12 btn_div">
          <button
            id="btn_submit"
            class="btn btn-primary"
            v-on:click="SubmitNewUserData"
          >
            送出
          </button>
        </div>
        <!-- <div class="col-sm-6 btn_div">
          <button class="btn btn-primary" type="reset" for="frm_main">
            重置
          </button>
        </div> -->
      </div>
    </form>
  </div>
</template>
<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { mapState } from "vuex";

export default {
  name: "CstmData",
  data() {
    return {
      cstmNum: "",
      cstmUserName: "",
      // first_PWD: "",
      // cstmPWD: "",
      cstmLastName: "",
      cstmFirstName: "",
      cstmLine: "",
      cstmID: "",
      cstmBirth: "",
      cstmTEL: "",
      cstmEmail: "",
      cstmAddress: "",
      cstmGender: "",
      cstmHowToKnowUs: "",
      cstmStatus: "1",
      cstmReservation: "1",
      cstmJoinDate: this.GetJoinDate,
      AllHowToKnowUs: [],
      Username_result: "",
      Username_result_color: "black",
      // PWDConfirm_result: "",
      // PWDConfirm_result_color: "black",
      // PWDConfirmed: false,
      PrivacyIsChecked: false,
      Mode: "",
    };
  },
  computed: {
    ...mapState(["IsLogIn"]),
    ...mapState("LogInInfo", ["userFirstName", "userLastName", "userEmail"]),
  },
  methods: {
    LogIn_ed() {
      this.$store.commit("UpdateLogInStatus", true);
    },
    GetJoinDate() {
      const today = new Date(); // 取得今天的日期
      const year = today.getFullYear(); // 取得年份
      const month = String(today.getMonth() + 1).padStart(2, "0"); // 取得月份（注意月份是從 0 開始，所以要 +1）
      const day = String(today.getDate()).padStart(2, "0"); // 取得日期
      const formattedDate = `${year}/${month}/${day}`; // 格式化為 YYYY/MM/DD
      return formattedDate;
    },
    GetNewcstmNum() {
      fetch("http://127.0.0.1:5000/api/CstmData/GetNewcstmNum",{
        method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          },
      })
        .then((response) => response.json()) // 解析回應的 JSON 數據
        .then((result) => {
          if (result && result.count_cstmNum !== undefined) {
            // 自動產生客戶編號
            let tempString = (result.count_cstmNum + 1).toString();
            let strCstmNum = tempString;
            for (let i = 0; i < 8 - tempString.length; i++) {
              strCstmNum = "0" + strCstmNum;
            }
            this.cstmNum = strCstmNum;
          } else {
            console.error(
              "count_cstmNum is undefined or result is not in expected format"
            );
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    GetAllHowToKnowUs() {
      fetch("http://127.0.0.1:5000/api/CstmData/GetAllHowToKnowUs",{
        method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          },
      }) // 在 Vue 實例創建時發送 GET 請求
        .then((response) => response.json()) // 解析回應的 JSON 數據
        .then((result) => {
          if (result.howToKnowUsList && Array.isArray(result.howToKnowUsList)) {
            this.AllHowToKnowUs = result.howToKnowUsList;
          } else {
            console.log("HowToKnowUs is not in expected format");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    CheckUserNameUnique(event) {
      event.preventDefault();
      if (this.cstmUserName != "") {
        const data = {
          // 構建 POST 請求的數據體，json 格式。
          user_name: this.cstmUserName,
        };
        fetch("http://127.0.0.1:5000/api/CstmData/CheckUserNameUnique", {
          // 使用 fetch API 發送 POST 請求
          method: "POST",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json", // 指定發送的數據為 JSON 格式
          },
          body: JSON.stringify(data), // 將 JavaScript 對象轉換為 JSON 字符串
        })
          .then((response) => response.json()) // 解析回應的 JSON 數據
          .then((result) => {
            this.Username_result = result.message; // 將伺服器回應的結果顯示在頁面上
            if (result.isUnique === true) {
              this.Username_result_color = "green";
            } else {
              this.Username_result_color = "red";
            }
          })
          .catch((error) => {
            // 處理錯誤情況
            this.Username_result = "Error: " + error.message;
          });
      } else {
        this.Username_result = "";
        this.Username_result_color = "black";
      }
    },
    // PWDMatchConfirm() {
    //   if (this.first_PWD !== "" && this.cstmPWD !== "") {
    //     if (this.first_PWD === this.cstmPWD) {
    //       this.PWDConfirm_result = "兩次輸入的密碼是相同的。";
    //       this.PWDConfirmed = true;
    //       this.PWDConfirm_result_color = "green";
    //     } else {
    //       this.PWDConfirm_result = "兩次輸入的密碼是不同的，請重新輸入";
    //       this.PWDConfirmed = false;
    //       this.PWDConfirm_result_color = "red";
    //     }
    //   } else {
    //     this.PWDConfirm_result = "";
    //     this.PWDConfirmed = false;
    //     this.PWDConfirm_result_color = "black";
    //   }
    // },
    SubmitNewUserData(event) {
      event.preventDefault();
      if (this.PrivacyIsChecked) {
        const userData = {
          cstmNum: this.cstmNum,
          cstmUserName: this.cstmUserName,
          cstmLastName: this.cstmLastName,
          cstmFirstName: this.cstmFirstName,
          cstmLine: this.cstmLine,
          cstmID: this.cstmID,
          cstmBirth: this.cstmBirth,
          cstmTEL: this.cstmTEL,
          cstmEmail: this.cstmEmail,
          cstmAddress: this.cstmAddress,
          cstmGender: this.cstmGender,
          cstmHowToKnowUs: this.cstmHowToKnowUs,
          cstmStatus: this.cstmStatus === "1" ? true : false, // 將狀態轉為布林值
          cstmReservation: this.cstmReservation === "1" ? true : false, // 將預約轉為布林值
          cstmJoinDate: this.cstmJoinDate, // 如果沒有設置，則設置為當前時間
          // UserNameLength: 0,
        };
        if (this.Mode == "NewAdd mode") {   // NewAdd mode 的送出動作
          fetch("http://127.0.0.1:5000/api/CstmData/AddNewUserData", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json", // 內容類型為 JSON
            },
            body: JSON.stringify(userData), // 將 userData 轉換為 JSON 字符串
          })
            .then((response) => {
              return response.json(); // 解析 JSON 回應
            })
            .then((result) => {
              if (result.success) {
                localStorage.setItem("WhereToGo", "/"); // 将預設路径存储到 localStorage
                alert(result.message);
                this.LogIn_ed();
                this.$router.push("/");
              } else if (result.IsUnique === false) {
                alert(result.message); // 顯示使用者名稱已被占用的訊息
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        } else if (this.Mode == "Update mode"){   // Update mode 的送出動作
          fetch("http://127.0.0.1:5000/api/CstmData/UpdateUserData", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
              "Content-Type": "application/json", // 內容類型為 JSON
            },
            body: JSON.stringify(userData), // 將 userData 轉換為 JSON 字符串
          })
            .then((response) => {
              return response.json(); // 解析 JSON 回應
            })
            .then((result) => {
              if (result.success) {
                localStorage.setItem("WhereToGo", "/"); // 将預設路径存储到 localStorage
                alert(result.message);
                // this.LogIn_ed();
                this.$router.push("/");
              } else if (result.IsUnique === false) {
                alert(result.message); // 顯示使用者名稱已被占用的訊息
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        }
      } else {
        alert("請勾選同意我們的隱私權政策。");
      }
    },
    LoadUserData() {
      const data = {
        // 構建 POST 請求的數據體，json 格式。
        User_mail: this.userEmail,
      };
      fetch("http://127.0.0.1:5000/api/CstmData/LoadUserData", {
        // 使用 fetch API 發送 POST 請求
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json", // 指定發送的數據為 JSON 格式
        },
        body: JSON.stringify(data), // 將 JavaScript 對象轉換為 JSON 字符串
      })
        .then((response) => response.json()) // 解析回應的 JSON 數據
        .then((result) => {
          this.cstmNum = result.user.cstmNum;
          this.cstmUserName = result.user.cstmUserName;
          this.cstmLastName = result.user.cstmLastName;
          this.cstmFirstName = result.user.cstmFirstName;
          this.cstmLine = result.user.cstmLine;
          this.cstmID = result.user.cstmID;
          this.cstmBirth = result.user.cstmBirth.substr(0, 10);
          this.cstmTEL = result.user.cstmTEL;
          this.cstmEmail = result.user.cstmEmail;
          this.cstmAddress = result.user.cstmAddress;
          this.cstmGender = result.user.cstmGender;
          this.cstmHowToKnowUs = result.user.cstmHowToKnowUs;
        })
        .catch((error) => {
          // 處理錯誤情況
          this.Username_result = "Error: " + error.message;
        });
    },
  },
  created() {
    this.GetAllHowToKnowUs();
    if (!this.IsLogIn) {
      // 非會員；進入建立會員資料模式
      this.Mode = "NewAdd mode";
      // alert(this.Mode);
      this.cstmFirstName = this.userFirstName;
      this.cstmLastName = this.userLastName;
      this.cstmEmail = this.userEmail;
      this.GetNewcstmNum();
    } else {
      // 會員；載入會員資料，進入編輯模式。
      this.Mode = "Update mode";
      // alert(this.Mode);
      this.cstmFirstName = this.userFirstName;
      this.cstmLastName = this.userLastName;
      this.cstmEmail = this.userEmail;
      this.LoadUserData();
    }
  },
};
</script>
<style scoped>
#cstm_Num {
  text-align: center;
  font-size: 35px;
  font-weight: bold;
  color: rgb(188, 188, 188);
}

#h1-title {
  text-align: center;
}

#h3-title {
  text-align: center;
}

.container {
  padding-top: 30px;
  padding-bottom: 30px;
  /* background: rgb(224, 255, 203);
  background: linear-gradient(43deg,
      rgba(224, 255, 203, 1) 0%,
      rgba(255, 216, 188, 1) 100%); */
  border-radius: 15px;
}

label {
  margin-left: 10px;
}

#p_mustHave {
  text-align: right;
}

div {
  margin-top: 2px;
  margin-bottom: 3px;
}

button {
  width: 90%;
}

.btn_div {
  text-align: center;
}

#div_modal_btn {
  text-align: center;
}

.modal-footer {
  justify-content: center;
}

#Username_result,
#PWD_result {
  margin-left: 10px;
}
</style>
