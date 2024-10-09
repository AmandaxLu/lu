<template>
  <div class="container">
    <form id="frm_main" name="frm_cstmData">
      <div class="row">
        <h1 id="h1-title">會員資料</h1>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-6 form-floating">
          <input
            id="cstmNum"
            class="form-control"
            type="text"
            placeholder=""
            v-model="selectedItem.cstmNum"
          />
          <label for="cstmNum" class="form-label">會員編號 : </label>
        </div>
        <div class="col-md-6 form-floating">
          <input
            id="cstmJoinDate"
            type="date"
            class="form-control"
            placeholder=""
            required
            v-model="cstmJoinDate_Formated"
          />
          <label for="cstmJoinDate" class="form-label"
            >加入日期 : YYYY/MM/DD
          </label>
        </div>
      </div>
      <br />
      <div class="row">
        <div class="col-md-6 form-floating">
          <input
            id="cstmUserName"
            type="text"
            class="form-control"
            required
            placeholder=""
            v-model="selectedItem.cstmUserName"
          />
          <label for="cstmUserName" class="form-label">* 帳號 : </label>
        </div>
        <div class="col-md-6 form-floating">
          <input
            id="cstmPWD"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-model="selectedItem.cstmPWD"
          />
          <label for="cstmPWD" class="form-label">* 密碼 : </label>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-md-4 form-floating">
          <input
            id="cstmLastName"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-model="selectedItem.cstmLastName"
          />
          <label for="cstmLastName" class="form-label">* 姓氏 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmFirstName"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-model="selectedItem.cstmFirstName"
          />
          <label for="cstmFirstName" class="form-label">* 名字 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmLine"
            type="text"
            class="form-control"
            placeholder=""
            required
            v-model="selectedItem.cstmLine"
          />
          <label for="cstmLine" class="form-label">Line 帳號 : </label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4 form-floating">
          <input
            id="cstmID"
            type="text"
            class="form-control"
            placeholder=""
            v-model="selectedItem.cstmID"
          />
          <label for="cstmID" class="form-label">身分證號 : </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmBirth"
            type="date"
            class="form-control"
            placeholder=""
            required
            v-model="cstmBirth_Formated"
          />
          <label for="cstmBirth" class="form-label">生日 : YYYY/MM/DD </label>
        </div>
        <div class="col-md-4 form-floating">
          <input
            id="cstmTEL"
            type="text"
            class="form-control"
            placeholder=""
            v-model="selectedItem.cstmTEL"
          />
          <label for="cstmTEL" class="form-label">* 手機 : 09##-######</label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-floating">
          <input
            id="cstmEmail"
            type="text"
            class="form-control"
            placeholder=""
            v-model="selectedItem.cstmEmail"
          />
          <label for="cstmEmail" class="form-label"
            >電子郵件 : * @ * . *
          </label>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 form-floating">
          <input
            id="cstmAddress"
            type="text"
            class="form-control"
            placeholder=""
            v-model="selectedItem.cstmAddress"
          />
          <label for="cstmAddress" class="form-label">地址 : </label>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <label for="cstmGender" class="form-label">* 性別 : </label>
          <select
            id="cstmGender"
            class="form-select"
            required
            v-model="selectedItem.cstmGender"
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
            v-model="selectedItem.cstmHowToKnowUs"
            class="form-select"
            required
          >
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
        <div class="col-md-6">
          <label for="cstmReservation" class="form-label"
            >* 可否線上預約 :
          </label>
          <select
            id="cstmReservation"
            class="form-select"
            required
            v-model="selectedItem.cstmReservation"
          >
            <option value="false" selected>否</option>
            <option value="true">可</option>
          </select>
        </div>
        <div class="col-md-6">
          <label for="cstmStatus" class="form-label">* 帳號狀態 : </label>
          <select
            id="cstmStatus"
            class="form-select"
            required
            v-model="selectedItem.cstmStatus"
          >
            <option value="true" selected>啟用中</option>
            <option value="false">停用中</option>
          </select>
        </div>
      </div>
    </form>
    <div class="row" style="text-align: center">
      <!-- search button -->
      <div class="col-md-3">
        <button
          id="btn_search"
          class="btn btn-primary"
          v-bind:disabled="btn_search_disabled"
          v-on:click="click_search"
        >
          搜索
        </button>
      </div>

      <!-- reset button -->
      <div class="col-md-3">
        <button
          id="btn_reset"
          class="btn btn-primary"
          v-bind:disabled="btn_reset_disabled"
          v-on:click="click_reset"
        >
          清空
        </button>

        <!-- update button -->
      </div>
      <div class="col-md-3">
        <button
          id="btn_update"
          class="btn btn-primary"
          v-bind:disabled="btn_update_disabled"
          v-on:click="click_update"
        >
          更新
        </button>
      </div>

      <!-- delete button -->
      <div class="col-md-3">
        <button
          id="btn_delete"
          class="btn btn-danger"
          v-bind:disabled="btn_delete_disabled"
          v-on:click="click_delete"
        >
          刪除
        </button>
      </div>
    </div>

    <hr />
    <div id="div_tbl" class="row">
      <div id="div_table" class="col-md-12">
        <h3>姓氏 : {{ userLastName }}</h3>
        <h3>名字 : {{ userFirstName }}</h3>
        <h3>電子郵件 : {{ userEmail }}</h3>
        <h3>郵件驗證結果 : {{ userEmailVerified }}</h3>
        <h3>登入狀態 : {{ IsLogIn }}</h3>
        <br />
        <span>總共 {{ recordNum }} 筆資料</span>
        <table style="table-layout: auto">
          <thead>
            <tr>
              <th
                v-for="(colName, index) in colNames"
                :key="index"
                @click="sortTable(index)"
              >
                {{ colName }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in cstmData"
              :key="item.cstmNum"
              @click="selectItem(item)"
            >
              <td>{{ item.cstmNum }}</td>
              <td>{{ item.cstmUserName }}</td>
              <td>{{ item.cstmFirstName }}</td>
              <td>{{ item.cstmID }}</td>
              <td>{{ item.cstmBirth.substr(0, 10) }}</td>
              <td>{{ item.cstmTEL }}</td>
              <td>{{ item.cstmEmail }}</td>
              <td>{{ item.cstmStatus }}</td>
              <td>{{ item.cstmReservation }}</td>
              <td>{{ item.cstmLine }}</td>
              <td>{{ item.cstmLastName }}</td>
              <td>{{ item.cstmPWD }}</td>
              <td>{{ item.cstmGender }}</td>
              <td>{{ item.cstmAddress }}</td>
              <td>{{ item.cstmJoinDate.substr(0, 10) }}</td>
              <td>{{ item.cstmHowToKnowUs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
// import { getElement } from "element-plus/es/utils/index.mjs";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";
import store from "../stores/store.js";
import { mapState } from "vuex";

export default {
  data: () => ({
    AllHowToKnowUs: [],
    cstmData: [],
    selectedItem: {
      cstmNum: "",
      cstmUserName: "",
      cstmFirstName: "",
      cstmID: "",
      cstmBirth: "",
      cstmTEL: "",
      cstmEmail: "",
      cstmStatus: "",
      cstmReservation: "",
      cstmLine: "",
      cstmLastName: "",
      cstmPWD: "",
      cstmGender: "",
      cstmAddress: "",
      cstmJoinDate: "",
      cstmHowToKnowUs: "",
    },
    cstmBirth_Formated: "",
    cstmJoinDate_Formated: "",
    cstmNum: "",
    cstmUserName: "",
    cstmPWD: "",
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
    cstmStatus: "",
    cstmReservation: "",
    cstmJoinDate: "",

    recordNum: 0,
    colNames: [
      "會員編號",
      "會員帳號",
      "名字",
      "身分證",
      "會員生日",
      "會員電話",
      "電子信箱",
      "帳號狀態",
      "線上預約",
      "Line",
      "姓氏",
      "密碼",
      "性別",
      "地址",
      "註冊日期",
      "如何得知我們",
    ],
    btn_search_disabled: false,
    btn_reset_disabled: true,
    btn_update_disabled: true,
    btn_delete_disabled: true,
  }),
  methods: {
    click_search() {},
    click_reset() {
      (this.selectedItem = {}),
        (this.cstmBirth_Formated = ""),
        (this.cstmJoinDate_Formated = ""),
        (this.btn_search_disabled = false),
        (this.btn_reset_disabled = true),
        (this.btn_update_disabled = true),
        (this.btn_delete_disabled = true);
    },
    click_update() {
      this.click_reset();
    },
    click_delete() {
      this.click_reset();
    },
    GetAllHowToKnowUs() {
      fetch("http://127.0.0.1:5000/api/CstmData/GetAllHowToKnowUs")
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
    selectItem(item) {
      this.selectedItem = { ...item }; // 将选中的行数据复制到 selectedItem 中
      this.cstmBirth_Formated = this.selectedItem.cstmBirth.substr(0, 10);
      this.cstmJoinDate_Formated = this.selectedItem.cstmJoinDate.substr(0, 10);
      this.btn_search_disabled = true;
      this.btn_reset_disabled = false;
      this.btn_update_disabled = false;
      this.btn_delete_disabled = false;
    },
    GetAllcstmData() {
      fetch("http://127.0.0.1:5000/api/CstmData/GetAllcstmData")
        .then((response) => response.json()) // 解析回應的 JSON 數據
        .then((result) => {
          this.cstmData = result;
          this.recordNum = this.cstmData.length;
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
  },
  computed: {
    ...mapState("LogInInfo", [
      "accessToken",
      "userID",
      "userFirstName",
      "userLastName",
      "userEmail",
      "userEmailVerified",
    ]),
    ...mapState(["IsLogIn"]),
  },
  created() {
    this.GetAllcstmData();
    this.GetAllHowToKnowUs();
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
  padding-bottom: 0px;
  /* background: rgb(224, 255, 203);
  background: linear-gradient(
    43deg,
    rgba(224, 255, 203, 1) 0%,
    rgba(255, 216, 188, 1) 100%
  ); */
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
  margin: 5px;
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
table,
td,
th {
  text-align: center;
  border: 2px solid rgb(182, 182, 182);
  border-collapse: collapse;
}

#div_table {
  overflow: auto;
}

th {
  background-color: rgb(230, 230, 230);
}

tbody {
  background-color: rgb(255, 241, 254);
}

/* table,thead,th  {
  table-layout: auto;
} */
tr:hover {
  background-color: rgb(185, 255, 255);
}
td:hover {
  background-color: rgb(255, 255, 199);
  text-shadow: 1px 1px 3px rgb(175, 175, 175);
}
</style>
