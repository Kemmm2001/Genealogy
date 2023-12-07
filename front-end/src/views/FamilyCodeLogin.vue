<!-- phùng việt khôi -->
<template>
  <div class="w-100 h-100 position-relative familycode-background" style="min-height: inherit;">
    <div class="position-absolute login-form-container" style="opacity: 93%;">
      <div class="d-flex flex-row w-100 h-100 position-relative">
        <div :class="{ rightPos: right, leftPos: !right, enlarged: enlarge }" class="h-100 position-absolute codelogin-background" style="z-index: 1;">
          <div v-if="loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Đăng kí gia phả mới</div>
            <button @click="moveToRight(); enlargeBackground()" class="btn my-3 change-form-button" :class="{ changeToLoginBtn: loggingin }">Đăng kí</button>
          </div>
          <div v-if="!loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Nhập mã để vào gia phả đã đăng kí</div>
            <button @click="moveToLeft(); enlargeBackground()" class="btn my-3 change-form-button" :class="{ changeToRegisterBtn: !loggingin }">Đăng nhập</button>
          </div>
        </div>

        <div v-if="!right" class="login-form h-100 d-flex flex-column align-items-center justify-content-center">
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex justify-content-center mt-3 mb-2" style="font-size: 36px; font-weight: bold; color: #fea94e;">Mã gia phả</div>
            <div class="d-flex flex-column" style="width: 420px;">
              <div class="d-flex flex-row mb-3">
                <div class="w-100 h-100 d-flex flex-row">
                  <input v-model="codeIdLogin" type="text" class="form-control" />
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center mb-3" style="height: auto; width: auto;">
                <button @click="loginWithCode()" class="btn login-button" style="margin-right: 36px;">Đăng nhập gia phả</button>
                <router-link to="/login">
                  <button @click="LogoutAccount()" class="btn bg-danger text-white">Đăng xuất tài khoản</button>
                </router-link>
              </div>
              <div class="d-flex justify-content-center">
                <button @click="showLoginHistoryModal()" class="btn login-button">Lịch sử đăng nhập</button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center justify-content-center" style="left: 0;">
          <div class="d-flex flex-column align-items-center">
            <div class="d-flex justify-content-center mt-3 mb-2" style="font-size: 36px; font-weight: bold; color: #84e9c0;">Đăng kí gia phả</div>
            <div class="d-flex flex-column" style="width: 420px;">
              <div class="d-flex flex-row mb-2">
                <div class="d-flex align-items-center" style="padding-right: 30.79px;">Gia phả họ</div>
                <div class="h-100" style="flex-grow: 1;">
                  <input v-model="familyTree.treeName" type="text" class="form-control" placeholder="VD: Nguyễn" />
                </div>
              </div>
              <div class="d-flex flex-row mb-2">
                <div class="d-flex align-items-center" style="padding-right: 48.15px;">Dân tộc</div>
                <div class="h-100" style="flex-grow: 1;">
                  <input v-model="familyTree.ethnicity" type="text" class="form-control" placeholder="VD: Kinh" />
                </div>
              </div>
              <div class="d-flex flex-row mb-3">
                <div class="d-flex align-items-center" style="padding-right: 16px;">Ngày giỗ họ</div>
                <div class="h-100" style="flex-grow: 1;">
                  <input v-model="familyTree.deathAnniersary" type="date" class="form-control" />
                </div>
              </div>
              <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
                <button @click="registerFamilyTree()" class="btn register-button" style="margin-right: 36px;">Đăng kí</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="position-absolute familycode-noti" :class="{ appear: showCode }">
      <div class="w-100 h-100 position-relative">
        <div class="position-absolute familycode-noti-timer" :class="{ timerStart: showCode }"></div>
        <div v-if="showCode" class="w-100 h-100 d-flex align-items-center justify-content-content px-3" style="font-size: 20px;">Đăng kí thành công! Mã gia phả của bạn là {{ this.familycode }}</div>
      </div>
    </div>
    <div class="loginhistory-container">
      <modal name="loginhistory-modal">
        <div class="w-100 h-100 add-album-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Lịch sử đăng nhập code gia phả</div>
            <div class="close-add-form" @click="closeLoginHistoryModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>

          <div style="height: 252px; overflow-y: auto;">
            <table class="w-100">
              <thead style="position: sticky; top: 0;">
                <tr>
                  <th>Thời gian đăng nhập</th>
                  <th>Mã gia phả</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="h in HistoryCode" :key="h.id">
                  <td>{{ h.AccessTime }}</td>
                  <td @click="LoginFastCodeID(h.CodeID)" style="cursor: pointer">{{ h.CodeID }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer w-100 position-absolute" style="bottom: 0;">
            <div class="d-flex h-100 align-items-center justify-content-end" style="padding-right: 12px;">
              <button style="margin-left:10px" type="button" class="btn btn-secondary" @click="closeLoginHistoryModal()">Cancel</button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import Snackbar from "awesome-snackbar";

export default {
  data() {
    return {
      right: false,
      enlarge: false,
      loggingin: true,
      showCode: false,
      familycode: null,

      familyTree: {
        treeName: "",
        ethnicity: "",
        deathAnniersary: "",
      },
      codeIdLogin: "",
      accountID: null,
      HistoryCode: null,
    };
  },
  methods: {
    takeAccountId() {
      if (localStorage.getItem("accountID") != null) {
        this.accountID = localStorage.getItem("accountID");
        this.getHistoryCodeID();
      } else {
        HTTP.get("protected-route", {
          headers: {
            Authorization: "Bearer " + VueCookies.get("accessToken"),
          },
        })
          .then((response) => {
            this.accountID = response.data.accountID;
            localStorage.setItem("accountID", this.accountID);
            this.getHistoryCodeID();
          })
          .catch((e) => {
            console.log(e);
          });
        console.log(this.accountID);
      }
    },
    NotificationsDelete(messagee) {
      new Snackbar(messagee, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#ff4d4d"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
    },
    LogoutAccount() {
      localStorage.removeItem("accountID");
      this.$router.push("/login");
    },
    NotificationsScuccess(messagee) {
      new Snackbar(messagee, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#1abc9c"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
    },
    registerFamilyTree() {
      console.log(this.familyTree.treeName);
      console.log(this.familyTree.ethnicity);
      if (this.familyTree.treeName != "" && this.familyTree.ethnicity != "") {
        HTTP.post("register-genealogy", {
          headers: {
            Authorization: "Bearer " + VueCookies.get("accessToken"),
          },
          accountID: this.accountID,
          treeName: this.familyTree.treeName,
          ethnicity: this.familyTree.ethnicity,
          deathAnniversary: this.familyTree.deathAnniersary,
        })
          .then((response) => {
            console.log(response.data);
            if (response.data.success == true) {
              // this.NotificationsScuccess(response.data.message);
              this.familycode = response.data.data;
              this.showFamilyCode();
            } else {
              this.NotificationsDelete("Lỗi hệ thống");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("Bạn chưa điền đủ thông tin");
      }
    },
    LoginFastCodeID(CodeID) {
      this.codeIdLogin = CodeID;
      this.loginWithCode();
    },
    loginWithCode() {
      console.log(this.codeIdLogin);
      if (this.codeIdLogin != "" && this.codeIdLogin != null) {
        HTTP.post("check-codeId", {
          headers: {
            Authorization: "Bearer " + VueCookies.get("accessToken"),
          },
          codeID: this.codeIdLogin,
          accountID: this.accountID,
        })
          .then((response) => {
            if (response.data.success == true) {
              console.log(response.data);
              localStorage.setItem("CodeID", this.codeIdLogin);
              this.$router.push("/");
              this.NotificationsScuccess("Đăng nhập thành công");
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        console.log("vào đây")
        this.NotificationsDelete("Bạn chưa điền code gia phả");
      }
    },
    enlargeBackground() {
      this.enlarge = true;
      setTimeout(() => {
        this.enlarge = false;
      }, 300);
    },

    moveToRight() {
      this.codeIdLogin = null;
      this.loggingin = false;
      setTimeout(() => {
        this.right = true;
      }, 300);
    },

    moveToLeft() {
      this.familyTree.treeName = null;
      this.familyTree.ethnicity = null;
      this.familyTree.deathAnniersary = null;
      this.loggingin = true;
      setTimeout(() => {
        this.right = false;
      }, 300);
    },
    showLoginHistoryModal() {
      this.$modal.show("loginhistory-modal");
    },
    closeLoginHistoryModal() {
      this.$modal.hide("loginhistory-modal");
    },
    showFamilyCode() {
      this.showCode = true;
      setTimeout(() => {
        this.showCode = false;
      }, 15000);
    },
    getHistoryCodeID() {
      HTTP.get("historyCodeID", {
        headers: {
            Authorization: "Bearer " + VueCookies.get("accessToken"),
          },
        params: {
          accountID: this.accountID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.HistoryCode = response.data.data;
          } else {
            this.NotificationsDelete("Không lấy được lịch sử code");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.takeAccountId();
    if (localStorage.getItem("CodeID") != null) {
      this.$router.push("/");
    }   
  },
};
</script>