<template>
  <div class="w-100 h-100 position-relative starry-background" style="min-height: inherit;">
    <div class="position-absolute login-form-container" style="opacity: 93%;">
      <div class="d-flex flex-row w-100 h-100 position-relative">
        <div :class="{ rightPos: right, leftPos: !right, enlarged: enlarge }" class="h-100 position-absolute login-background" style="z-index: 1;">
          <div v-if="loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Bạn đã sử dụng Gia phả người Việt rồi?</div>
            <button @click="moveToRight(); enlargeBackground()" class="btn my-3 change-form-button" :class="{ changeToLoginBtn: loggingin }">Đăng nhập</button>
          </div>
          <div v-if="!loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Bạn là người dùng mới?</div>
            <button @click="moveToLeft(); enlargeBackground()" class="btn my-3 change-form-button" :class="{ changeToRegisterBtn: !loggingin }">Đăng kí</button>
          </div>
        </div>

        <div v-if="!right" class="login-form h-100 d-flex flex-column align-items-center" style="margin-top: 35px;">
          <div class="d-flex justify-content-center mt-3 mb-2" style="font-size: 36px; font-weight: bold; color: #84e9c0;">Đăng kí tài khoản</div>
          <div class="d-flex flex-column" style="width: 420px;">
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.username" id="username" type="text" class="form-control py-2 px-5 position-relative" placeholder="Tên tài khoản" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;" d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.password" id="password" type="password" class="form-control py-2 px-5 position-relative" placeholder="Mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.rePassword" id="password2" type="password" class="form-control py-2 px-5 position-relative" placeholder="Nhập lại mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.email" id="email" type="text" class="form-control py-2 px-5 position-relative" placeholder="Email" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path style="fill: gray;" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
              <button @click="register()" class="btn register-button">Đăng kí</button>
            </div>
          </div>
        </div>

        <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center" style="left: 0; margin-top: 35px;">
          <div class="d-flex justify-content-center mt-3 mb-2" style="font-size: 36px; font-weight: bold; color: #fea94e;">Đăng nhập</div>
          <div class="d-flex flex-column" style="width: 420px;">
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountLogin.email" id="username" type="text" class="form-control py-2 px-5 position-relative" placeholder="Tên tài khoản" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;" d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountLogin.password" id="password" type="password" class="form-control py-2 px-5 position-relative" placeholder="Mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100" style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;" d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
            </div>
            <!-- <router-link to="/familycode"> -->
            <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
              <button @click="login()" class="btn login-button">Đăng nhập</button>
            </div>
            <!-- </router-link> -->
          </div>
        </div>
      </div>
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

      accountLogin: {
        email: null,
        password: null,
        codeId: null,
      },
      accountRegister: {
        username: null,
        password: null,
        rePassword: null,
        email: null,
      },
      accountIdToken: null,
    };
  },
  methods: {
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
    register() {
      console.log(this.accountRegister.email != null);
      if (
        this.accountRegister.email != null &&
        this.accountRegister.username != null &&
        this.accountRegister.password != null &&
        this.accountRegister.rePassword != null
      ) {
        if (this.accountRegister.rePassword == this.accountRegister.password) {
          console.log("vào đây");
          HTTP.post("register", {
            email: this.accountRegister.email,
            username: this.accountRegister.username,
            password: this.accountRegister.password,
            repassword: this.accountRegister.rePassword,
          })
            .then((response) => {
              console.log(response.data);
              if (response.data.success == true) {
                this.moveToRight();
                this.enlargeBackground();
                this.accountRegister = [];
                this.NotificationsScuccess(response.data.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.NotificationsDelete("Nhập lại mật khẩu không chính xác");
        }
      } else {
        this.NotificationsDelete(
          "Bạn nhập thiếu các thông tin không thể đăng ký"
        );
      }
    },
    saveInfoSession() {
      localStorage.setItem("CodeID", this.accountLogin.codeId);
    },
    login() {
      console.log(HTTP);
      if (
        this.accountLogin.email != null &&
        this.accountLogin.password != null
      ) {
        HTTP.post("login", {
          email: this.accountLogin.email,
          password: this.accountLogin.password,
        })
          .then((response) => {
            if (response.data.success == false) {
              this.NotificationsDelete(response.data.message);
            } else {
              VueCookies.remove("accessToken");
              localStorage.removeItem("CodeID");
              this.accountIdToken = response.data.accessToken;
              VueCookies.set("accessToken", this.accountIdToken, 3600);
              this.accountLogin = [];
              this.$router.push("/familycode");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("Tài khoản và mật khẩu không được để trống");
      }
    },

    enlargeBackground() {
      this.enlarge = true;
      setTimeout(() => {
        this.enlarge = false;
      }, 300);
    },

    moveToRight() {
      this.loggingin = false;
      setTimeout(() => {
        this.right = true;
      }, 300);
    },

    moveToLeft() {
      this.loggingin = true;
      setTimeout(() => {
        this.right = false;
      }, 300);
    },

    showLoginOptions() {
      this.$modal.show("login-options");
    },
    showRegisterOptions() {
      this.$modal.show("register-options");
    },
  },
};
</script>