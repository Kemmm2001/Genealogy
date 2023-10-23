<template>
  <div class="d-flex flex-row w-100 navbar p-0">
    <!-- <img src="../assets/header.jpg" class="w-100"> -->
    <div class="d-flex align-items-center w-100 h-100" style="justify-content: left;">
      <router-link to="/">
        <div class="navbar-item d-flex p-2 mx-2">
          <svg class="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path
              d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-8v40H464c30.9 0 56 25.1 56 56v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H464c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-4.4-3.6-8-8-8H312v40h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V280H112c-4.4 0-8 3.6-8 8v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-30.9 25.1-56 56-56H264V192h-8c-26.5 0-48-21.5-48-48V80z" />
          </svg>
          <div class="d-flex align-items-center mx-4" style="color: #FFFFFF;">Phả đồ</div>
        </div>
      </router-link>
      <div @mouseenter="expandFamilyInfo = true" @mouseleave="expandFamilyInfo = false"
        class="navbar-item d-flex p-2 mx-2 position-relative">
        <svg class="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path
            d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
        </svg>
        <div class="navbar-item-content d-flex align-items-center" :class="{ expandContent: expandFamilyInfo }">
          <div v-show="expandFamilyInfo">Thông tin dòng họ</div>
          <div class="navbar-extended d-flex flex-column w-100" :class="{ expandContent: expandFamilyInfo }">
            <router-link to="/information/headlist">
            <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Danh sách tộc trưởng</div>
            </router-link>
            <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Lịch sử dòng họ</div>
            <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Album dòng họ</div>
            <router-link to="/information/articlelist">
            <div v-show="expandFamilyInfo" class="navbar-extended-content p-2 m-1">Tư liệu dòng họ</div>
            </router-link>
          </div>
        </div>
        <!-- <div class="navbar-item-content d-flex align-items-center position-absolute p-2">Thông tin dòng họ</div> -->
      </div>
      <div @mouseenter="expandMemberList = true" @mouseleave="expandMemberList = false"
        class="navbar-item d-flex p-2 mx-2">
        <svg class="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
        </svg>
        <div class="navbar-item-content d-flex align-items-center" :class="{ expandContent: expandMemberList }">
          <div v-show="expandMemberList">Danh sách thành viên</div>
        </div>
      </div>
      <div @mouseenter="expandEventList = true" @mouseleave="expandEventList = false" class="navbar-item d-flex p-2 mx-2">
        <svg class="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
          <path
            d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
        </svg>
        <div class="navbar-item-content d-flex align-items-center" :class="{ expandContent: expandEventList }">
          <div v-show="expandEventList">Sự kiện dòng họ</div>
        </div>
      </div>
      <div @mouseenter="expandAccountManage = true" @mouseleave="expandAccountManage = false"
        class="navbar-item d-flex p-2 mx-2">
        <svg class="navbar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
          <path
            d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
        </svg>
        <div class="navbar-item-content d-flex align-items-center" :class="{ expandContent: expandAccountManage }">
          <div v-show="expandAccountManage">Quản lý tài khoản</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandContent: false,

      expandFamilyInfo: false,
      expandMemberList: false,
      expandEventList: false,
      expandAccountManage: false
    }
  },
  watch: {
    expandFamilyInfo: {
      handler: function () {
        console.log(this.expandFamilyInfo);
      }
    }
  }
}
</script>