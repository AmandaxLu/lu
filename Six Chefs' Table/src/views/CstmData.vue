<template>
    
    <div class="container">
      <form id="frm_main" name="frm_cstmData">
        <div class="row">
          <h1 id="h1-title">註冊會員</h1>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-2"></div>
          <div class="col-md-8 form-floating">
            <input
              id="cstm_Num"
              class="form-control"
              type="text"
              value="connection issue found"
              readonly
            />
            <label for="cstm_Num" class="form-label">會員編號 : </label>
          </div>
          <div class="col-md-2"></div>
        </div>
        <br />
        <div>
          <h3 id="h3-title">--- 請先設定帳號密碼 ---</h3>
        </div>
        <div class="row">
          <div class="col-md-12 form-floating">
            <input
              id="username"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="username" class="form-label">* 帳號 : </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p id="Username_result">帳號驗證 :</p>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 form-floating">
            <input
              id="1st_PWD"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="1st_PWD" class="form-label">* 輸入密碼 : </label>
          </div>
          <div class="col-md-6 form-floating">
            <input
              id="2nd_PWD"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="2nd_PWD" class="form-label">* 確認密碼 : </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12">
            <p id="PWD_result">密碼驗證 :</p>
          </div>
        </div>
        <hr />
        <div class="row">
          <div class="col-md-4 form-floating">
            <input
              id="2ndName"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="2ndName" class="form-label">* 姓氏 : </label>
          </div>
          <div class="col-md-4 form-floating">
            <input
              id="1stName"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="1stName" class="form-label">* 名字 : </label>
          </div>
          <div class="col-md-4 form-floating">
            <input
              id="line"
              type="text"
              class="form-control"
              placeholder=""
              required
            />
            <label for="line" class="form-label">Line 帳號 : </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4 form-floating">
            <input id="pID" type="text" class="form-control" placeholder="" />
            <label for="pID" class="form-label">身分證號 : </label>
          </div>
          <div class="col-md-4 form-floating">
            <input
              id="birth"
              type="date"
              class="form-control"
              placeholder=""
              required
            />
            <label for="birth" class="form-label">生日 : YYYY/MM/DD </label>
          </div>
          <div class="col-md-4 form-floating">
            <input
              id="cellphone"
              type="text"
              class="form-control"
              placeholder=""
            />
            <label for="cellphone" class="form-label"
              >* 手機 : 09##-######</label
            >
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 form-floating">
            <input id="eMail" type="text" class="form-control" placeholder="" />
            <label for="eMail" class="form-label">電子郵件 : * @ * . * </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-12 form-floating">
            <input
              id="address"
              type="text"
              class="form-control"
              placeholder=""
            />
            <label for="address" class="form-label">地址 : </label>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <label for="gender" class="form-label">* 性別 : </label>
            <select id="gender" class="form-select" required>
              <option disabled value="" selected>必填，請選擇 ! ! !</option>
              <option value="1">男</option>
              <option value="0">女</option>
            </select>
          </div>
          <div class="col-md-6">
            <label for="slct_howtoknowus" id="lbl_long" class="form-label"
              >* 如何得知我們 :
            </label>
            <select
              id="slct_howtoknowus"
              v-model="selected"
              class="form-select"
              required
            ></select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <input id="input_checkbox" type="checkbox" required />
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
                      >
                      </button>
                    </div>
                    </div>
                  </div>
                  <div class="modal-body">
                    <h5>
                      1. 我們收集的信息 我們可能會收集以下類型的個人信息：
                    </h5>
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
                      得到您的明確同意。
                      為提供您所要求的服務必須與合作夥伴分享。
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
          <div class="col-sm-6 btn_div">
            <button id="btn_submit" class="btn btn-primary" type="submit">
              送出
            </button>
          </div>
          <div class="col-sm-6 btn_div">
            <button class="btn btn-primary" type="reset" for="frm_main">
              重置
            </button>
          </div>
        </div>
      </form>
    </div>

</template>
<script>
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
export default {
  name: 'CstmData',
  data(){
    return{

    }
  }
}
// C# backend

// ------ Create cstmNum automatically and load data in HowToKnowUs select ------
document.addEventListener("DOMContentLoaded", function () {
        // 發送請求到伺服器以獲取數據
        fetch("http://127.0.0.1:5000/cstmNumCreation")
          .then((response) => response.json()) // 解析回應的 JSON 數據
          .then((result) => {
            // console.log("Full result: ", result);
            // 回來的資料是 result 的物件，裡面有一個 cstmQTY 的陣列
            if (result && result.count_cstmNum !== undefined) {
              // // 自動產生客戶編號
              let tempString = (result.count_cstmNum + 1).toString();
              let strCstmNum = tempString;
              for (i = 0; i < 8 - tempString.length; i++) {
                strCstmNum = "0" + strCstmNum;
              }
              document.getElementById("cstm_Num").value = strCstmNum;
            } else {
              console.error(
                "count_cstmNum is undefined or result is not in expected format"
              );
            }
            // 處理 HowToKnowUs 陣列
            if (result.HowToKnowUs && Array.isArray(result.HowToKnowUs)) {
              let str_slct = "";
              for (i = 0; i < result.HowToKnowUs.length; i++) {
                // console.log(result.HowToKnowUs[i]);
                str_slct += `<option value=${result.HowToKnowUs[i].howNum}>${result.HowToKnowUs[i].howWays}</option>`;
                // console.log(str_slct);
                // <option value="Keelong">Keelong</option>
              }
              str_slct =
                '<option disabled value="" selected>必填，請選擇 ! ! !</option>' +
                str_slct;
              document.getElementById("slct_howtoknowus").innerHTML = str_slct;
            } else {
              console.error("HowToKnowUs is not in expected format");
            }
          })
          .catch((error) => {
            // 處理錯誤情況
            console.error("Error:", error);
          });
      });

// ------ Check if the username input is unique ------

// ------ Check the email input matches the foramat ------

// ------ Check if the password input twice are the same ------

// ------ Summit the customer data to server ------

// ------ gmail validation ? ------

// ------ heck the data type of the input element value without input ------

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
  background: rgb(224, 255, 203);
  background: linear-gradient(
    43deg,
    rgba(224, 255, 203, 1) 0%,
    rgba(255, 216, 188, 1) 100%
  );
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
