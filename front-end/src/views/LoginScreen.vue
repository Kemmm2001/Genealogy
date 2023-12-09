<!-- phùng việt khôi -->
<template>
  <div class="w-100 h-100 position-relative starry-background" style="min-height: inherit;">
    <div class="position-absolute login-form-container" style="opacity: 93%;">
      <div class="d-flex flex-row w-100 h-100 position-relative">
        <div :class="{ rightPos: right, leftPos: !right, enlarged: enlarge }"
          class="h-100 position-absolute login-background" style="z-index: 1;">
          <div v-if="loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">
              Bạn là người dùng mới?</div>
            <button @click="moveToRight(); enlargeBackground()" class="btn my-3 change-form-button"
              :class="{ changeToLoginBtn: loggingin }">Đăng kí</button>
          </div>
          <div v-if="!loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
            <div class="my-3" style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">
              Bạn đã sử dụng Gia phả người Việt rồi?</div>
            <button @click="moveToLeft(); enlargeBackground()" class="btn my-3 change-form-button"
              :class="{ changeToRegisterBtn: !loggingin }">Đăng nhập</button>
          </div>
        </div>

        <div v-if="!right" class="login-form h-100 d-flex flex-column align-items-center justify-content-center">
          <div class="d-flex justify-content-center mt-3 mb-2"
            style="font-size: 36px; font-weight: bold; color: #fea94e;">Đăng nhập</div>
          <div class="d-flex flex-column" style="width: 420px;">
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountLogin.email" id="username" type="text"
                class="form-control py-2 px-5 position-relative" placeholder="Nhập email" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path style="fill: gray;"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountLogin.password" id="password" v-bind:type="loginPwdVisibilityType"
                class="form-control py-2 px-5 position-relative" placeholder="Mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;"
                    d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <div class="d-flex flex-row position-relative">
                <div @click="toggleLoginPwdVisibility()"
                  class="position-absolute visibility-icon d-flex align-items-center">
                  <svg v-if="!loginPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                    <path
                      d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                  </svg>
                  <svg v-if="loginPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path
                      d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                  </svg>
                </div>
              </div>
            </div>
            <!-- <router-link to="/familycode"> -->
            <div class="d-flex align-items-center" style="justify-content: space-around;">
              <button @click="login()" class="btn login-button">Đăng nhập</button>
              <router-link to="/forgotpwd">
                <button class="btn login-button">Quên mật khẩu?</button>
              </router-link>
            </div>
            <!-- </router-link> -->
          </div>
        </div>

        <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center justify-content-center"
          style="left: 0;">
          <div class="d-flex justify-content-center mt-3 mb-2"
            style="font-size: 36px; font-weight: bold; color: #84e9c0;">Đăng kí tài khoản</div>
          <div class="d-flex flex-column" style="width: 420px;">
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.username" id="username" type="text"
                class="form-control py-2 px-5 position-relative" placeholder="Tên tài khoản" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;"
                    d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.email" id="email" type="text"
                class="form-control py-2 px-5 position-relative" placeholder="Email" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path style="fill: gray;"
                    d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.password" id="password" v-bind:type="regPwdVisibilityType"
                class="form-control py-2 px-5 position-relative" placeholder="Mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;"
                    d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <div @click="toggleRegPwdVisibility()" class="position-absolute visibility-icon d-flex align-items-center">
                <svg v-if="!regPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
                <svg v-if="regPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
            <div class="d-flex mb-2" style="position: relative;">
              <input v-model="accountRegister.rePassword" id="password2" v-bind:type="reg2PwdVisibilityType"
                class="form-control py-2 px-5 position-relative" placeholder="Nhập lại mật khẩu" />
              <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                style="left: 0; width: 3rem;">
                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path style="fill: gray;"
                    d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <div @click="toggleReg2PwdVisibility()" class="position-absolute visibility-icon d-flex align-items-center">
                <svg v-if="!reg2PwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path
                    d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
                <svg v-if="reg2PwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path
                    d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
            <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
              <button @click="register()" class="btn register-button">Đăng kí</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
import CryptoJS from 'crypto-js';
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
        email: "",
        password: "",
      },
      accountRegister: {
        username: "",
        password: "",
        rePassword: "",
        email: "",
      },
      accountIdToken: null,
      loginPwdVisibility: null,
      loginPwdVisibilityType: 'password',
      regPwdVisibility: null,
      regPwdVisibilityType: 'password',
      reg2PwdVisibility: null,
      reg2PwdVisibilityType: 'password',
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
    encrypt(message) {
      const encrypted = CryptoJS.AES.encrypt(message, process.env.VUE_APP_KEY_SECRET, { 
        iv: process.env.VUE_APP_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7  
      }).toString();

      console.log('Encrypted:', encrypted);

      return encrypted;
    },

    decrypt(encrypted) {
      const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.VUE_APP_KEY_SECRET, {
        iv: process.env.VUE_APP_IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7  
      }).toString(CryptoJS.enc.Utf8);

      console.log('Decrypted:', decrypted);

      return decrypted;
    },
    register() {
      // var secureKey = process.env.VUE_APP_KEY_SECRET
      // Mã hóa dữ liệu với khóa
      var encryptedPassword = this.encrypt(this.accountRegister.password)
      // Mã hóa dữ liệu với khóa
      var encryptedRepassword = this.encrypt(this.accountRegister.rePassword)

      var decryptPassword = this.decrypt(encryptedPassword)
      // Mã hóa dữ liệu với khóa
      var decryptRepassword = this.decrypt(encryptedRepassword)
      console.log(decryptPassword)
      console.log(decryptRepassword)
      if (
        this.accountRegister.email != "" &&
        this.accountRegister.username != "" &&
        this.accountRegister.password != "" &&
        this.accountRegister.rePassword != ""
      ) {
        if (this.accountRegister.rePassword == this.accountRegister.password) {
          this.accountRegister.email = this.accountRegister.email.replace(
            /\s+/g,
            ""
          );
          HTTP.post("register", {
            email: this.accountRegister.email,
            username: this.accountRegister.username,
            password:encryptedPassword,
            repassword: encryptedRepassword,
          })
            .then((response) => {
              console.log(response.data);
              console.log(this.accountRegister.email)
              if (response.data.success == true) {
                this.moveToLeft();
                console.log(this.accountRegister.email)
                this.enlargeBackground();
                this.verifyAccount();
                this.NotificationsScuccess(response.data.message);
              } else {
                this.NotificationsDelete(response.data.message);
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
    verifyAccount() {
      HTTP.post("verify-account", {
        email: this.accountRegister.email,
      })
        .then((response) => {
          console.log(this.accountRegister.email)
          localStorage.setItem("emailRegister", this.accountRegister.email)
          this.accountRegister = []
          if (response.data.success == false) {
            this.NotificationsDelete(response.data.message);
          } else {
            this.$router.push("/verify");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    login() {
      console.log(111)
      // Dữ liệu cần mã hóa
      var dataToEncrypt = this.accountLogin.password;
      var secureKey = process.env.VUE_APP_KEY_SECRET
      // Mã hóa dữ liệu với khóa
      var encryptedData = CryptoJS.AES.encrypt(dataToEncrypt, secureKey, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
      if (this.accountLogin.email != "" && this.accountLogin.password != "") {
        HTTP.post("login", {
          email: this.accountLogin.email.replace(/\s+/g, ""),
          password: encryptedData.toString(),
          //password: this.accountLogin.password,
        })
          .then((response) => {
            if (response.data.success == false) {
              this.NotificationsDelete(response.data.message);
            } else {
              VueCookies.remove("accessToken");
              localStorage.removeItem("CodeID");
              this.accountIdToken = response.data.data;
              console.log(response.data);
              console.log(this.accountIdToken);
              VueCookies.set("accessToken", this.accountIdToken, 3600);
              console.log(response.data.data);
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
      (this.accountLogin.email = null),
        (this.accountLogin.password = null),
        (this.loggingin = false);
      setTimeout(() => {
        this.right = true;
      }, 300);
    },

    moveToLeft() {
      // this.accountRegister.username = null;
      // (this.accountRegister.password = null),
      //   (this.accountRegister.rePassword = null),
      //   (this.accountRegister.email = null),
      (this.loggingin = true);
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

    toggleLoginPwdVisibility() {
      this.loginPwdVisibility = !this.loginPwdVisibility;
      this.loginPwdVisibilityType =
        this.loginPwdVisibilityType === "text" ? "password" : "text";
    },

    toggleRegPwdVisibility() {
      this.regPwdVisibility = !this.regPwdVisibility;
      this.regPwdVisibilityType =
        this.regPwdVisibilityType === "text" ? "password" : "text";
    },

    toggleReg2PwdVisibility() {
      this.reg2PwdVisibility = !this.reg2PwdVisibility;
      this.reg2PwdVisibilityType =
        this.reg2PwdVisibilityType === "text" ? "password" : "text";
    },
  },
  mounted() {
    if (
      localStorage.getItem("accountID") != null &&
      localStorage.getItem("CodeID") != null
    ) {
      this.$router.push("/");
    } else {
      if (localStorage.getItem("accountID") != null) {
        this.$router.push("/familycode");
      }
    }
  },
};
</script>