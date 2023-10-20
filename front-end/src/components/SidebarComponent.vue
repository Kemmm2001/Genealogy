<template>
  <div class="d-flex flex-row sidebar-list p-0">
    <!-- Collapsed sidebar (medium 1-->
    <div @mouseenter="expandSidebar()" @mouseleave="collapseSidebar()" class="sidebar">
      <!-- Sidebar content-->
      <div class="d-flex flex-column">
        <div class="d-flex sidebar-item align-items-center justify-content-center">
          <svg class="fa fa-fw sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-8v40H464c30.9 0 56 25.1 56 56v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H464c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-4.4-3.6-8-8-8H312v40h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H256c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V280H112c-4.4 0-8 3.6-8 8v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V368c0-26.5 21.5-48 48-48h8V288c0-30.9 25.1-56 56-56H264V192h-8c-26.5 0-48-21.5-48-48V80z" />
          </svg>
          <div v-if="sidebarexpansion" class="col sidebar-item-content">Phả đồ</div>
        </div>
        <div class="w-100" style="height: 1px !important; background-color: #FFFFFF;"></div>
        <div @mouseenter="expandSidebarItem1()" @mouseleave="collapseSidebarItem1()" class="sidebar-item-1">
          <div class="d-flex sidebar-item align-items-center justify-content-center">
            <div class="d-flex align-items-center justify-content-center">
              <svg class="fa fa-fw sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3V245.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5V416c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V389.2C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112h32c24 0 46.2 7.5 64.4 20.3zM448 416V394.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176h32c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2V416c0 17.7-14.3 32-32 32H480c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3V261.7c-10 11.3-16 26.1-16 42.3zm144-42.3v84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2V448c0 17.7-14.3 32-32 32H288c-17.7 0-32-14.3-32-32V405.2c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112h32c61.9 0 112 50.1 112 112z" />
              </svg>
            </div>
            <div v-if="sidebarexpansion" class="col sidebar-item-content">Thông tin dòng họ</div>
          </div>
          <div v-if="sidebaritem1expansion" class="d-flex sidebar-item-1-expand align-items-center">
            Danh sách tộc
            trưởng
          </div>
          <div v-if="sidebaritem1expansion" class="d-flex sidebar-item-1-expand align-items-center">
            Lịch sử dòng
            họ
          </div>
          <div v-if="sidebaritem1expansion" class="d-flex sidebar-item-1-expand align-items-center">Album dòng họ</div>
          <div v-if="sidebaritem1expansion" class="d-flex sidebar-item-1-expand align-items-center">
            Tư liệu dòng
            họ
          </div>
        </div>
        <div class="d-flex sidebar-item align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center">
            <svg class="fa fa-fw sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M192 0c-41.8 0-77.4 26.7-90.5 64H64C28.7 64 0 92.7 0 128V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H282.5C269.4 26.7 233.8 0 192 0zm0 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM72 272a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm104-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16zM72 368a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm88 0c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16z" />
            </svg>
          </div>
          <div v-if="sidebarexpansion" class="col sidebar-item-content">Danh sách thành viên</div>
        </div>

        <div class="d-flex sidebar-item align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center">
            <svg class="fa fa-fw sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
            </svg>
          </div>
          <div v-if="sidebarexpansion" class="col sidebar-item-content">Sự kiện dòng họ</div>
        </div>
        <div class="d-flex sidebar-item align-items-center justify-content-center">
          <div class="d-flex align-items-center justify-content-center">
            <svg class="fa fa-fw sidebar-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM80 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16s7.2-16 16-16zm16 96H288c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm0 32v64H288V256H96zM240 416h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H240c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
            </svg>
          </div>
          <div v-if="sidebarexpansion" class="col sidebar-item-content">Quản lý tài khoản</div>
        </div>
      </div>
    </div>
    <div v-if="!sidebarhover" class="list d-flex flex-column align-items-center">
      <div class="w-100">
        <select class="d-flex text-center form-select dropdown p-0">
          <option selected>Tỉnh/Thành phố</option>
          <option class="dropdown-item" value>Hà Nội</option>
          <option class="dropdown-item" value>Điện Biên</option>
          <option class="dropdown-item" value>Lào Cai</option>
          <option class="dropdown-item" value>Lai Châu</option>
          <option class="dropdown-item" value>Sơn La</option>
          <option class="dropdown-item" value>Yên Bái</option>
          <option class="dropdown-item" value>Hòa Bình</option>
          <option class="dropdown-item" value>Thái Nguyên</option>
          <option class="dropdown-item" value>Quảng Ninh</option>
          <option class="dropdown-item" value>Bắc Giang</option>
        </select>
      </div>
      <div class="list-item d-flex flex-row">
        <div class="col-md-6" style="padding-right: 2px;">
          <select class="d-flex text-center form-select dropdown p-0">
            <option selected>Nhóm máu</option>
            <option class="dropdown-item" value>A</option>
            <option class="dropdown-item" value>B</option>
            <option class="dropdown-item" value>AB</option>
            <option class="dropdown-item" value>O</option>
          </select>
        </div>
        <div class="col-md-6">
          <select class="d-flex text-center form-select dropdown p-0">
            <option selected>Nhóm tuổi</option>
            <option class="dropdown-item" value>0-5</option>
            <option class="dropdown-item" value>6-17</option>
            <option class="dropdown-item" value>18-40</option>
            <option class="dropdown-item" value>41-60</option>
            <option class="dropdown-item" value>Trên 60</option>
            <option class="dropdown-item" value>Không rõ</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarexpansion: false,
      sidebarhover: false,

      sidebaritem1expansion: false,
      sidebaritem1hover: false,

      expandconfigitem1: false,
      rotated1: false,
      expandconfigitem2: false,
      rotated2: false,
      expandconfigitem3: false,
      rotated3: false,
      expandconfigitem4: false,
      rotated4: false,
    };
  },
  methods: {
    expandSidebar() {
      this.sidebarhover = true;
      setTimeout(() => {
        this.sidebarexpansion = true;
      }, 300);
    },
    collapseSidebar() {
      this.sidebarhover = false;
      this.sidebarexpansion = false;
    },
    expandSidebarItem1() {
      this.sidebaritem1hover = true;
      setTimeout(() => {
        this.sidebaritem1expansion = true;
      }, 300);
    },
    collapseSidebarItem1() {
      this.sidebaritem1hover = false;
      this.sidebaritem1expansion = false;
    },
  },
  watch: {
    sidebarexpansion: {
      handler: function () {
        if (!this.sidebarhover && this.sidebarexpansion) {
          this.sidebarexpansion = false;
        }
      },
    },
    sidebaritem1expansion: {
      handler: function () {
        if (!this.sidebaritem1hover && this.sidebaritem1expansion) {
          this.sidebaritem1expansion = false;
        }
      },
    },
  },
};
</script>

<style>
@import "../assets/css/sidebar.css";
@import "../assets/css/icon.css";
@import "../assets/css/list.css";
</style>