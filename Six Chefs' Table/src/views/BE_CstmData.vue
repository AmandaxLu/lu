<template>
    <div id="app" class="container">
      <div class="row">
        <div class="col-sm-4">
          <button
            class="btn btn-primary"
            onclick="document.getElementById('frm_cstmData').reset()"
          >
            搜索客戶資料
          </button>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-primary">更新客戶資料</button>
        </div>
        <div class="col-sm-4">
          <button class="btn btn-primary">新增客戶資料</button>
        </div>
      </div>
      <div>
        <form id="frm_cstmData" action="">
          <div class="row">
            <div class="col-sm-3"></div>
            <div class="col-sm-6 form-floating">
              <input
                id="cstm_Num"
                type="text"
                class="input-s form-control"
                value="000000001"
                readonly
                disabled
              />
              <label for="cstm_Num" class="form-label">會員編號 : </label>
            </div>
            <div class="col-sm-3"></div>
          </div>
          <div class="div_center">
            <label for="">帳號 : </label>
            <input
              id="username"
              type="text"
              class="input-s"
              required
              disabled
            />
          </div>
          <div class="div_center">
            <label for="">密碼 * : </label>
            <input id="pwd" type="text" class="input-s" required />
          </div>
          <div class="div_center">
            <label for="">帳號狀態 * : </label>
            <input id="pwd" type="text" class="input-s" required />
          </div>
          <div>
            <div class="div_center">
              <label>姓氏 * : </label>
              <input id="2ndName" type="text" class="input-s" required />
            </div>
            <div class="div_center">
              <label for="">名字 * : </label>
              <input id="1stName" type="text" class="input-s" required />
            </div>
          </div>
          <div class="div_center">
            <label for="">身分證號 : </label>
            <input id="pID" type="text" class="input-s" />
          </div>
          <div class="div_center">
            <label for="">生日 * : </label>
            <input id="birth" type="text" class="input-s" required />
          </div>
          <div class="div_center">
            <label for="">手機 * : </label>
            <input id="cellphone" type="text" class="input-s" required />
          </div>

          <div class="div_center">
            <label for="">Line 帳號 : </label>
            <input id="line" type="text" class="input-s" />
          </div>
          <div class="div_center">
            <label for="">如何得知我們 : </label>
            <select
              id="slct_howtoknowus"
              v-model="selected"
              class="input-s"
              required
            ></select>
          </div>
          <div class="div_center">
            <label class="lbl_mail_address" for="">電子郵件 * : </label>
          </div>
          <div class="div_center">
            <input id="eMail" type="text" class="input-l" required />
          </div>
          <div class="div_center">
            <label class="lbl_mail_address" for="">地址 : </label>
          </div>
          <div class="div_center">
            <input id="address" type="text" class="input-l" value="" />
          </div>
          <div>
            <button>搜索</button>
            <button>更新</button>
            <button id="btn_reset" type="reset">重置</button>
          </div>
        </form>
      </div>
      <div>
        <h3>總共 {{recordNum}} 筆資料</h3>
      </div>
      <!-- <div id="div_tbl">
        <table>
          <thead>
            <tr>
              <th
                v-for="(colName, index) in colNames"
                :key="index"
                @click="sortTable(index)"
              >
                {{colName}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cstmData" :key="item.cstmNum">
              <td>{{ item.cstmNum }}</td>
              <td>{{ item.cstm1stName }}</td>
              <td>{{ item.cstmBirth }}</td>
              <td>{{ item.cstmTEL }}</td>
              <td>{{ item.cstmEmail }}</td>
              <td>{{ item.cstmStatus }}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
      <br />
    </div>
</template>
<script>
// const vm = Vue.createApp({
//         data() {
//           return {
//             recordNum: 0,
//             cstmData: [],
//             colNames: [
//               "會員編號",
//               "會員名字",
//               "會員生日",
//               "會員電話",
//               "會員電子郵箱",
//               "帳號狀態",
//             ],
//             sortOrder: "asc", // 初始化排序為升序
//             sortColumn: null, // 追蹤排序的欄位
//             tabSelected: "",
//           };
//         },
//         created() {
//           // 在 Vue 實例創建時發送 GET 請求
//           fetch("http://127.0.0.1:8888/GetAllcstmData")
//             .then((response) => response.json()) // 解析回應的 JSON 數據
//             .then((result) => {
//               this.cstmData = result.result; // 將獲取的數據賦值給 AAA
//               this.recordNum = result.result.length;
//             })
//             .catch((error) => {
//               console.error("Error:", error);
//             });
//         },
//         methods: {
//           // 排序表格的邏輯
//           sortTable(index) {
//             const key = [
//               "cstmNum",
//               "cstm1stName",
//               "cstmBirth",
//               "cstmTEL",
//               "cstmEmail",
//               "cstmStatus",
//             ][index];
//             if (this.sortColumn === key) {
//               // 如果再次點擊同一個欄位，切換排序順序
//               this.sortOrder = this.sortOrder === "asc" ? "desc" : "asc";
//             } else {
//               this.sortOrder = "asc"; // 初始點擊為升序
//             }
//             this.sortColumn = key;
//             // 用比較函數根據排序欄位和順序進行排序
//             this.cstmData.sort((a, b) => {
//               if (a[key] < b[key]) return this.sortOrder === "asc" ? -1 : 1;
//               if (a[key] > b[key]) return this.sortOrder === "asc" ? 1 : -1;
//               return 0;
//             });
//           },
//         },
//       });
//       vm.mount("#app");
//       // do what click-reset-button do
//       function resetForm() {
//         document.getElementById("btn_reest").click();
//       }
</script>
<style scoped>

</style>