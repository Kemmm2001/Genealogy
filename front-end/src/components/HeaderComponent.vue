<template>
  <div class="d-flex flex-row w-100 navbar p-0">
    <!-- <img src="../assets/header.jpg" class="w-100"> -->
    <div class="d-flex align-items-center w-100 h-100">
      <div class="d-flex col-3" style="height: 64px; justify-content: left;">
        <router-link to="/" class="w-100">
          <div class="d-flex align-items-center w-100 h-100" style="justify-content: left; ">
            <img class="px-4" src="../assets/logo.svg" />
          </div>
        </router-link>
      </div>
      <div class="d-flex col-7" style="padding-left: 50px; justify-content: left;">
        <router-link to="/">
          <div :class="{ 'header-selected': currentPath === '/' }" @click="setSelectedHead('/')"
            class="navbar-item d-flex py-2">
            <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512">
              <path
                d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-8v40H464c30.9 0 56 25.1 56 56v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H464c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-4.4-3.6-8-8-8H312v40h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V280H112c-4.4 0-8 3.6-8 8v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-30.9 25.1-56 56-56H264V192h-8c-26.5 0-48-21.5-48-48V80z" />
            </svg>
            <div class="d-flex align-items-center mx-2" style="color: #35495e;">Phả đồ</div>
          </div>
        </router-link>
        <div @mouseenter="expandFamilyInfo = true" @mouseleave="expandFamilyInfo = false"
          class="navbar-item d-flex py-2 position-relative" style="margin-left: 8px"
          @click="setSelectedHead('/information/headlist')"
          :class="{ 'header-selected': currentPath === '/information/headlist' }">
          <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path
              d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
          </svg>
          <div class="navbar-item-content d-flex align-items-center">
            <router-link to="/information/headlist">
              <div class="mx-2" style="color: #35495e;">Thông tin dòng họ</div>
            </router-link>
            <div class="navbar-extended d-flex flex-column w-100" :class="{ expandContent: expandFamilyInfo }">
              <router-link to="/information/headlist">
                <div @click="setSelectedHead('/information/headlist')"
                  :class="{ 'header-selected': currentPath === '/information/headlist' }" v-show="expandFamilyInfo"
                  class="navbar-extended-content p-2 m-1 ">Danh sách tộc trưởng</div>
              </router-link>
              <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Lịch sử dòng họ</div>
              <router-link to="/information/albumlist">
                <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Album dòng họ</div>
              </router-link>
              <router-link to="/information/articlelist">
                <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Tư liệu dòng họ</div>
              </router-link>
            </div>
          </div>
          <!-- <div class="navbar-item-content d-flex align-items-center position-absolute p-2">Thông tin dòng họ</div> -->
        </div>
        <div @mouseenter="expandMemberList = true" @mouseleave="expandMemberList = false" class="navbar-item d-flex py-2"
          style="margin-left: 8px">
          <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
          </svg>
          <div class="navbar-item-content d-flex align-items-center">
            <div class="mx-2" style="color: #35495e;">Danh sách thành viên</div>
          </div>
        </div>
        <div @mouseenter="expandEventList = true" @mouseleave="expandEventList = false" class="navbar-item d-flex py-2"
          style="margin-left: 8px">
          <svg class="navbar-icon-sm" style="margin-left: 8px;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
              d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
          </svg>
          <div class="navbar-item-content d-flex align-items-center">
            <div class="mx-2" style="color: #35495e;">Sự kiện dòng họ</div>
          </div>
        </div>
      </div>
      <div class="col-2 d-flex align-items-center" style="justify-content: right; padding-right: 1.5rem;">
        <div class="d-flex" style="justify-content: center;">
          <button class="btn p-0">
            <svg class="day-night-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path
                d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0c-.1 0-.2 0-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z" />
            </svg>
          </button>
        </div>
        <div class="navbar-item-content d-flex flex-row justify-content-center">
          <div @mouseenter="expandAccountManage = true" @mouseleave="expandAccountManage = false"
            class="navbar-item d-flex flex-row p-2 mx-2 position-relative align-items-center" style="margin-left: 8px">
            <svg class="user-icon p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
            </svg>
            <div class="navbar-item-content d-flex align-items-center">
              <div class="d-flex align-items-center p-2" style="color: #35495e; justify-content: right;">Người</div>
              <div class="user-extended d-flex flex-column position-absolute w-100"
                :class="{ expandContent: expandAccountManage }">
                <router-link to="/profile">
                  <div v-show="expandAccountManage" class="navbar-extended-content p-2 m-1">Tài khoản</div>
                </router-link>
                <router-link to="/login">
                  <div v-show="expandAccountManage" class="navbar-extended-content p-2 m-1">Đăng xuất</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { EventBus } from "../assets/js/MyEventBus.js";
export default {
  data() {
    return {
      currentPath: window.location.pathname,
      expandContent: false,
      expandFamilyInfo: false,
      expandMemberList: false,
      expandEventList: false,
      expandAccountManage: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.currentPath = window.location.pathname;
      console.log(this.currentPath); // Hiển thị đường dẫn sau tên miền từ URL hiện tại
    });
  },
  watch: {
    // headlistvalue: {
    //   articlelistvalue: {
    //   }
    // }
  },
  created() {
    // EventBus.$on("HeadList", (value) => {
    //   this.headlistvalue = value;
    // });
    // EventBus.$on("AlbumList", (value) => {
    //   this.albumlistvalue = value;
    // });
    // EventBus.$on("ArticleList", (value) => {
    //   this.articlelistvalue = value;
    // });
    // if((this.headlistvalue) || (this.articlelistvalue)){
    //   this.infovalue = true;
    // }
    // window.addEventListener('popstate', () => {
    //   console.log(window.location.href);
    // });
  },
  methods: {
    setSelectedHead(url) {
      console.log(url)
      this.currentPath = url;
    },
  },
};
</script>

<style>
router-link-exact-active {
  background-color: #007bff;
  color: #fff;
}
</style>