<template>
  <div class="navbar-grid-container w-100">
    <div class="navbar-item-logo">
      <router-link to="/" class="h-100 w-100">
        <div class="logo-bg h-100"></div>
      </router-link>
    </div>
    <div class="navbar-item-select">
      <div class="d-flex align-items-center justify-content-center" style="padding-right: 10px;">
        <router-link to="/">
          <div :class="{ 'header-selected': currentPath === '/' }" @click="setSelectedHead('/')" class="navbar-item d-flex">
            <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-8v40H464c30.9 0 56 25.1 56 56v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H464c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-4.4-3.6-8-8-8H312v40h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V280H112c-4.4 0-8 3.6-8 8v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-30.9 25.1-56 56-56H264V192h-8c-26.5 0-48-21.5-48-48V80z" />
            </svg>
            <div class="d-flex align-items-center mx-2 navbar-text">Phả đồ</div>
          </div>
        </router-link>
      </div>
      <div @mouseenter="expandFamilyInfo = true;" @mouseleave="expandFamilyInfo = false;" class="d-flex align-items-center justify-content-center" style="padding-right: 10px;">
        <router-link to="/information/history" class="h-100 d-flex flex-row justify-content-center">
          <div class="h-100 d-flex align-items-center position-relative">
            <div :class="{ 'header-selected': currentPath === '/information/history' || currentPath === '/information/albumlist' || currentPath === '/information/history' || currentPath === '/information/statistics' }" @click="setSelectedHead('/information/history')" class="d-flex flex-row align-items-center navbar-item">
              <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
              </svg>
              <div :class="{ 'header-selected': currentPath === '/information/history' }" class="mx-2 navbar-text">Thông tin dòng họ</div>
              <div class="navbar-extended d-flex flex-column w-100" :class="{ expandContent: expandFamilyInfo }">
                <router-link to="/information/history">
                  <div @click="setSelectedHead('/information/history')" :class="{ 'header-selected': currentPath === '/information/history' }" v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Lịch sử dòng họ</div>
                </router-link>
                <router-link to="/information/albumlist">
                  <div @click="setSelectedHead('/information/albumlist')" :class="{ 'header-selected': currentPath === '/information/albumlist' }" v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Album dòng họ</div>
                </router-link>
                <router-link to="/information/statistics">
                  <div @click="setSelectedHead('/information/statistics')" :class="{ 'header-selected': currentPath === '/information/statistics' }" v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Thống kê dòng họ</div>
                </router-link>
              </div>
          </div>
      </div>
      <div class="d-flex align-items-center" style="padding-right: 10px;">
        <router-link to="/memberList" class="h-100 w-100 d-flex flex-row align-items-center justify-content-center">
          <div class="d-flex align-items-center navbar-item">
            <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
            </svg>
            <div class="navbar-item-content d-flex align-items-center">
              <div class="mx-2 navbar-text">Danh sách thành viên</div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="d-flex align-items-center" style="padding-right: 10px;">
        <router-link to="/event" class="h-100 w-100 d-flex flex-row align-items-center justify-content-center">
          <div class="d-flex align-items-center navbar-item">
            <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
            </svg>
            <div class="navbar-item-content d-flex align-items-center">
              <div class="mx-2 navbar-text">Sự kiện dòng họ</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
    <div class="navbar-item-theme-user">
      <div @click="darkMode = !darkMode" class="d-flex" style="justify-content: end;">
        <button class="btn p-0" style="border: none; outline: none;">
          <svg v-if="!darkMode" class="night-icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="36px" viewBox="0 0 24 24" width="36px" fill="#000000">
            <g>
              <rect fill="none" height="24" width="24" />
            </g>
            <g>
              <g>
                <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z" />
              </g>
            </g>
          </svg>
          <svg v-if="darkMode" class="day-icon" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="36px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF">
            <rect fill="none" height="24" width="24" />
            <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
          </svg>
        </button>
      </div>
      <div class="navbar-item-content d-flex flex-row justify-content-center">
        <div :class="{ 'header-selected': currentPath === '/profile' }" @mouseenter="expandAccountManage = true; show()" @mouseleave="expandAccountManage = false; show();" style="overflow-x: clip; padding-right: 20px;" class="position-relative align-items-center d-flex">
          <div class="navbar-item d-flex flex-row w-100 p-1" style="overflow: hidden;">
            <div>
              <svg class="user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
              </svg>
            </div>
            <div :class="{ 'header-selected': currentPath === '/profile' }" class="navbar-item-content d-flex align-items-center w-100" style="overflow: hidden;">
              <div v-if="AccountInfor" class="d-flex align-items-center navbar-text ellipsis-text w-100" style="padding-left: 4px;">{{ AccountInfor.Username }}</div>
            </div>
          </div>
          <div class="user-extended d-flex flex-column position-absolute" :class="{ expandContent: expandAccountManage }">
            <router-link to="/profile">
              <div :class="{ 'header-selected': currentPath === '/profile' }" @click="setSelectedHead('/profile')" v-show="expandAccountManage" class="navbar-extended-content p-2 m-1">Tài khoản</div>
            </router-link>
            <div @click="LogoutGenelogy()">
              <div v-show="expandAccountManage" class="navbar-extended-content p-2 m-1">
                Đăng xuất gia
                phả
              </div>
            </div>
            <div @click="LogoutAccount()">
              <div v-show="expandAccountManage" class="navbar-extended-content p-2 m-1">
                Đăng xuất tài
                khoản
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
      return {
          currentPath: window.location.pathname,
          expandContent: false,
          expandFamilyInfo: false,
          expandMemberList: false,
          expandEventList: false,
          expandAccountManage: false,
          darkMode: false,
          AccountInfor: null,
      };
  },
  mounted() {
      this.getAccountInfor();
      this.$nextTick(() => {
          this.currentPath = window.location.pathname;
          console.log(this.currentPath); // Hiển thị đường dẫn sau tên miền từ URL hiện tại
      });
      EventBus.$emit("darkMode", this.darkMode);
  },
  methods: {
      getAccountInfor() {
          if (localStorage.getItem("accountID") != null) {
              HTTP.post("get-user", {
                  accountID: localStorage.getItem("accountID"),
              }).then((response) => {
                  if (response.data.success == true) {
                      this.AccountInfor = response.data.data;
                      console.log(this.AccountInfor)
                  }
              });
          }
      },
      LogoutGenelogy() {
          localStorage.removeItem("CodeID");
          this.$router.push("/familycode");
      },
      LogoutAccount() {
          localStorage.removeItem("CodeID");
          localStorage.removeItem("accountID");
          this.$router.push("/login");
      },
      setSelectedHead(url) {
          this.currentPath = url;
      },
      show() {
          console.log(this.expandAccountManage)
      },
  },
  watch: {
      darkMode: {
          handler: function () {
              EventBus.$emit("darkMode", this.darkMode);
          },
      },
  },
};
</script>