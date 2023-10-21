<template>
  <div class="d-flex align-items-center w-100">
      <div class="d-flex main-screen align-items-center w-100">
          
        <div id="tree" ref="tree"></div>

      </div>

      <div v-if="!configSidebarHover" @mouseenter="expandConfigSidebar()" class="collapsed-config-sidebar">
          <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512">
              <path
                  d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
          </svg>
      </div>
      <div @mouseleave="collapseConfigSidebar()" class="config-sidebar" :style="{width : configSidebarWidth + '%'}">
          <!--Chọn chủ đề-->
          <div v-if="configSidebarExpansion" class="topic config-item">
              <select class="form-select">
                  <option selected value="1">Chủ đề 1</option>
                  <option value="2">Chủ đề 2</option>
                  <option value="3">Chủ đề 3</option>
              </select>
          </div>
          <!--Config menu-->
          <div v-if="configSidebarExpansion" class="d-flex flex-column config-menu">
              <div class="d-flex flex-row align-items-center justify-content-center">
                  <div @click="configTree = true; configPrinting = false;"
                      class="config-menu-item config-topic text-center col-md-6"
                      :class="{ notchosenconfigmenu: configPrinting }">
                      <a>Phả đồ</a>
                  </div>
                  <div @click="configTree = false; configPrinting = true"
                      class="config-menu-item config-topic text-center col-md-6"
                      :class="{ notchosenconfigmenu: configTree }">
                      <a>Hỗ trợ in ấn</a>
                  </div>
              </div>
              <div v-if="configTree" class="config-menu-board d-flex flex-column">
                  <div @click="expandconfigitem1 = !expandconfigitem1" class="config-menu-item">
                      <button type="button" class="btn p-0"
                          :class="{ rotated1: expandconfigitem1 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Thành viên</a>
                  </div>
                  <div v-show="expandconfigitem1" class="config-menu-item-expanded">
                      <a>Thành viên hiển thị</a>
                      <select class="form-select">
                          <option selected>Tất cả</option>
                      </select>
                      <a>Số đời hiển thị</a>
                      <select class="form-select">
                          <option selected>Tất cả</option>
                          <option>20</option>
                      </select>
                  </div>
                  <div @click="expandconfigitem2 = !expandconfigitem2" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated2: expandconfigitem2 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Bảng vẽ</a>
                  </div>
                  <div v-show="expandconfigitem2" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Màu nền bảng vẽ</a>
                          <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                      </div>
                      <div class="config-menu-item-content">
                          <a>Khoảng cách 2 thẻ</a>
                      </div>
                      <div class="d-flex flex-column align-items-center">
                          <div class="d-flex flex-row">
                              <div class="col-md-6 config-menu-item-content">Ngang</div>
                              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                  type="number" value="0" min="0">
                          </div>
                          <div class="d-flex flex-row">
                              <div class="col-md-6 config-menu-item-content">Dọc</div>
                              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                  type="number" value="0" min="0">
                          </div>
                      </div>
                  </div>
                  <div @click="expandconfigitem3 = !expandconfigitem3" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated3: expandconfigitem3 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Khung thẻ</a>
                  </div>
                  <div v-show="expandconfigitem3" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Khung viền</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Màu viền</a>
                          <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                      </div>
                      <div class="d-flex flex-row">
                          <div class="col-md-6 config-menu-item-content">Độ đậm</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Khung ảnh</a>
                      </div>
                      <div class="d-flex flex-row">
                          <div class="col-md-6 config-menu-item-content">Khung thẻ</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                  </div>
                  <div @click="expandconfigitem4 = !expandconfigitem4" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated4: expandconfigitem4 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Thông tin thẻ</a>
                  </div>
                  <div v-show="expandconfigitem4" class="config-menu-item-expanded">
                      <div class="d-flex flex-row align-items-center">
                          <div class="col-md-6 config-menu-item-content">Tỉ lệ cơ bản (%)</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                      <div class="d-flex flex-row">
                          <div class="col-md-6 config-menu-item-content align-items-center">Tỉ lệ tổ phụ so với cơ bản (%)
                          </div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                      <div class="d-flex flex-row">
                          <div class="col-md-6 config-menu-item-content align-items-center">Độ đậm đường kẻ</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Màu chữ</a>
                          <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Màu nền</a>
                          <div class="d-flex position-relative">
                              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF"
                                  id="color-for-male">
                              <label class="label-color-input" for="color-for-male">Nam</label>
                          </div>
                          <div class="d-flex position-relative">
                              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF"
                                  id="color-for-male">
                              <label class="label-color-input" for="color-for-male">Nữ</label>
                          </div>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <div class="d-flex position-relative">
                              <input class="form-control-color config-menu-color-genderunknown-input p-0" type="color"
                                  value="#FFFFFF" id="color-for-male">
                              <label class="label-color-input" for="color-for-male">Không rõ GT</label>
                          </div>
                      </div>
                  </div>
              </div>
              <div v-if="configPrinting" class="config-menu-board d-flex flex-column">
                  <div @click="expandconfigitem5 = !expandconfigitem5" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated5: expandconfigitem5 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Khung viền</a>
                  </div>
                  <div v-show="expandconfigitem5" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Vẽ khung</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Đường viền</a>
                          <select class="form-select">
                              <option selected value="1">Mặc định 1</option>
                              <option value="2">Mặc định 2</option>
                              <option value="3">Mặc định 3</option>
                          </select>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <div class="col-md-6 config-menu-item-content">Tỉ lệ khung ảnh (%)</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                  </div>
                  <div @click="expandconfigitem6 = !expandconfigitem6" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated6: expandconfigitem6 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Tiêu đề</a>
                  </div>
                  <div v-show="expandconfigitem6" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Vẽ ảnh tiêu đề</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <select class="form-select">
                              <option selected value="1">Hoàng phi 1</option>
                              <option value="2">Hoàng phi 2</option>
                              <option value="3">Hoàng phi 3</option>
                          </select>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <button type="button" class="btn btn-light m-6">Thêm</button>
                          <button type="button" class="btn btn-light m-6">Sửa</button>
                          <button type="button" class="btn btn-light m-6">Xóa</button>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <div class="col-md-6 config-menu-item-content">Tỉ lệ ảnh tiêu đề</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                  </div>
                  <div @click="expandconfigitem7 = !expandconfigitem7" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated7: expandconfigitem7 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Nền</a>
                  </div>
                  <div v-show="expandconfigitem7" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Vẽ màu nền</a>
                          <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Vẽ ảnh nền</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <select class="form-select">
                              <option selected value="1">Nền cam</option>
                              <option value="2">Nền đỏ</option>
                              <option value="3">Nền vàng</option>
                          </select>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <button type="button" class="btn btn-light">Chọn ảnh</button>
                          <button type="button" class="btn btn-light">Xóa ảnh</button>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <select class="form-select">
                              <option selected value="1">Giãn ảnh</option>
                              <option value="2">Lặp lại</option>
                          </select>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Vẽ họa tiết</a>
                          <button type="button" class="btn btn-light"></button>
                          <button type="button" class="btn btn-light"></button>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <select class="form-select">
                              <option selected value="1">Song đồng</option>
                              <option value="2">Trống đồng</option>
                          </select>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <select class="form-select">
                              <option selected value="1">Tự động</option>
                              <option value="2">Giãn ảnh</option>
                              <option value="3">Lặp lại</option>
                          </select>
                      </div>
                  </div>
                  <div @click="expandconfigitem8 = !expandconfigitem8" class="d-flex config-menu-item align-items-center">
                      <button type="button" class="btn p-0"
                          :class="{ rotated8: expandconfigitem8 }">
                          <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 320 512">
                              <path
                                  d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                          </svg>
                      </button>
                      <a>Thông tin ngày tạo</a>
                  </div>
                  <div v-show="expandconfigitem8" class="config-menu-item-expanded">
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Hiện ngày tạo</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                          <a>Hiện người tạo</a>
                      </div>
                      <div class="d-flex align-items-center config-menu-item-content">
                          <a>Màu chữ</a>
                          <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <div class="col-md-6 config-menu-item-content">Cỡ chữ</div>
                          <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                              type="number" value="0" min="0">
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <a>Vị trí người tạo</a>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <select class="form-select">
                              <option selected>Trên - Trái</option>
                              <option>Trên - Phải</option>
                              <option>Dưới - Trái</option>
                              <option>Dưới - Phải</option>
                          </select>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <a>Tên người tạo</a>
                      </div>
                      <div class="d-flex flex-row align-items-center">
                          <input class="form-control config-menu-item-content" type="text" readonly>
                      </div>
                  </div>
              </div>
          </div>
          <button type="button" class="btn p-0 btn-modal" @click="openChildrenModal">Modal add con</button>
          <!-- <modal name="children-modal">
              <div class="d-flex flex-row w-100 align-items-center position-relative">
                  <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm con
                  </div>
                  <div class="close-add-form" @click="closeChildrenModal">
                      <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                          <path
                              d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                  </div>
              </div>
              <div class="d-flex flex-row">
                  <div class="col-md-6 d-flex flex-row">
                      <div class="col-md-4 d-flex flex-column mt-1" style="padding-left: 4px;">
                          <div class="profile-pic"></div>
                          <button class="btn p-0 colored mt-1 modal-item">Xoá ảnh</button>                
                          <button class="btn p-0 colored mt-1 modal-item" style="margin-top: 120px !important;"
                              @click="dead = !dead" :class="{ alivebuttoncolor: dead }">
                              <a v-show="!dead">Còn sống</a>
                              <a v-show="dead">Đã mất</a>
                          </button>
                      </div>
                      <div class="d-flex flex-column col-md-8 align-items-center px-1">
                          <div class="d-flex flex-row align-items-center w-100">
                              <div class="col-md-12 mt-1">
                                  <input type="text" class="form-control modal-item" placeholder="Tên thành viên đầy đủ">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center w-100">
                              <div class="col-md-12 mt-1">
                                  <input type="text" class="form-control modal-item" placeholder="Tên thường gọi">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center w-100">
                              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                                  <select class="form-select modal-item">
                                      <option selected value="1">Con ruột</option>
                                      <option value="2">Con riêng</option>
                                      <option value="3">Con nuôi</option>
                                  </select>
                              </div>
                              <div class="col-md-6 mt-1 position-relative">
                                  <label for="birthorder" class="add-form-birthorder-label position-absolute">Con
                                      thứ</label>
                                  <input id="birthorder" type="number"
                                      class="form-control flex-grow add-form-birthorder-input modal-item pl-5" value="1"
                                      min="1">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center justify-content-around w-100">
                              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                                  <select class="form-select modal-item">
                                      <option selected value="1">Giới tính</option>
                                      <option value="2">Nam</option>
                                      <option value="3">Nữ</option>
                                  </select>
                              </div>
                              <div class="col-md-6 mt-1 d-flex flex-row">
                                  <div class="col-md-8 add-form-bloodtype-label modal-item">Nhóm máu</div>
                                  <div class="col-md-4">
                                      <select id="bloodtype"
                                          class=" add-form-bloodtype-select form-select modal-item p-0">
                                          <option selected value="1">A</option>
                                          <option value="2">B</option>
                                          <option value="3">AB</option>
                                          <option value="4">O</option>
                                      </select>
                                  </div>
                              </div>

                          </div>
                          <div class="d-flex flex-row align-items-center justify-content-center w-100">
                              <div class="col-md-12">
                                  <input type="text" class="form-control modal-item mt-1" placeholder="Nguyên quán">
                              </div>
                          </div>
                          <div class="d-flex flex-row w-100">
                              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                                  <input type="text" class="form-control modal-item" placeholder="Quốc tịch">
                              </div>
                              <div class="col-md-6 mt-1">
                                  <input type="text" class="form-control modal-item" placeholder="Tôn giáo">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center justify-content-center w-100">
                              <div class="col-md-6 d-flex flex-wrap">
                                  <div class="add-form-date-label modal-item">Ngày sinh dương lịch</div>
                              </div>
                              <div class="col-md-6 mt-1">
                                  <input type="date" class="form-control modal-item">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center justify-content-center w-100">
                              <div class="col-md-6 d-flex flex-wrap">
                                  <div class="add-form-date-label modal-item">Ngày sinh âm lịch</div>
                              </div>
                              <div class="col-md-6 mt-1">
                                  <input type="date" class="form-control modal-item">
                              </div>
                          </div>
                          <div class="d-flex flex-row w-100">
                              <div class="col-md-12 mt-1">
                                  <input type="text" class="form-control modal-item" placeholder="Nơi sinh">
                              </div>
                          </div>
                          <div class="d-flex flex-row align-items-center justify-content-center w-100">
                              <div class="col-md-6 d-flex flex-wrap">
                                  <div class="add-form-date-label modal-item">Ngày mất</div>
                              </div>
                              <div class="col-md-6 mt-1">
                                  <input type="date" class="form-control modal-item" v-bind:disabled=!dead>
                              </div>
                          </div>
                          <div class="d-flex flex-row w-100">
                              <div class="col-md-12 mt-1">
                                  <input type="text" class="form-control modal-item" placeholder="Nơi mất"
                                      v-bind:disabled=!dead>
                              </div>
                          </div>
                          <div class="d-flex flex-row w-100">
                              <div class="col-md-12 mt-1 mb-1">
                                  <input type="text" class="form-control modal-item" placeholder="Mộ phần"
                                      v-bind:disabled=!dead>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-6 mt-1" style="padding-right: 4px">
                      <div class="d-flex flex-row modal-item align-items-center justify-content-around">
                          <div class="w-100">
                              <button
                                  @click="extendedContact = true; extendedJob = false; extendedEdu = false; extendedNote = false"
                                  class="btn px-2 pt-1 pb-2 extended-info-tab w-100"
                                  :class="{ colored: extendedContact }">Liên
                                  hệ</button>
                          </div>
                          <div class="w-100">
                              <button
                                  @click="extendedContact = false; extendedJob = true; extendedEdu = false; extendedNote = false"
                                  class="btn px-2 pt-1 pb-2 extended-info-tab w-100"
                                  :class="{ colored: extendedJob }">Nghề
                                  nghiệp</button>
                          </div>
                          <div class="w-100">
                              <button
                                  @click="extendedContact = false; extendedJob = false; extendedEdu = true; extendedNote = false"
                                  class="btn px-2 pt-1 pb-2 extended-info-tab w-100"
                                  :class="{ colored: extendedEdu }">Giáo
                                  dục</button>
                          </div>
                          <div class="w-100">
                              <button
                                  @click="extendedContact = false; extendedJob = false; extendedEdu = false; extendedNote = true"
                                  class="btn px-2 pt-1 pb-2 extended-info-tab w-100"
                                  :class="{ colored: extendedNote }">Ghi
                                  chú</button>
                          </div>
                      </div>
                      <div v-if="extendedContact"
                          class="d-flex flex-column extended-info-container extended-contact-container w-100">
                          <div class="col-md-12 px-1 mt-1">
                              <input type="text" class="form-control modal-item" placeholder="Địa chỉ">
                          </div>
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6" style="padding-right: 2px;">
                                  <input type="text" class="form-control modal-item" placeholder="Điện thoại 1">
                              </div>
                              <div class="col-md-6" style="padding-left: 2px">
                                  <input type="text" class="form-control modal-item" placeholder="Điện thoại 2">
                              </div>
                          </div>
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6" style="padding-right: 2px;">
                                  <input type="text" class="form-control modal-item" placeholder="Email 1">
                              </div>
                              <div class="col-md-6" style="padding-left: 2px">
                                  <input type="text" class="form-control modal-item" placeholder="Email 2">
                              </div>
                          </div>
                          <div class="col-md-12 px-1 mt-1">
                              <input type="text" class="form-control modal-item" placeholder="Facebook">
                          </div>
                          <div class="col-md-12 px-1 mt-1 mb-1">
                              <input type="text" class="form-control modal-item" placeholder="Zalo">
                          </div>
                      </div>

                      <div v-if="extendedJob"
                          class="d-flex flex-column extended-info-container extended-job-container w-100 pb-1">
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6" style="padding-right: 2px;">
                                  <input type="text" class="form-control modal-item" placeholder="Tên cơ quan">
                              </div>
                              <div class="col-md-6" style="padding-left: 2px">
                                  <input type="text" class="form-control modal-item" placeholder="Địa chỉ">
                              </div>
                          </div>
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6" style="padding-right: 2px;">
                                  <input type="text" class="form-control modal-item" placeholder="Vị trí công tác">
                              </div>
                              <div class="col-md-6" style="padding-left: 2px">
                                  <input type="text" class="form-control modal-item" placeholder="Nghề nghiệp">
                              </div>
                          </div>
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                                  <div class="col-md-3">
                                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                                          <a>Từ</a>
                                      </div>
                                  </div>
                                  <div class="col-md-9">
                                      <input type="date" class="form-control modal-item">
                                  </div>
                              </div>
                              <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                                  <div class="col-md-3">
                                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                                          <a>Đến</a>
                                      </div>
                                  </div>
                                  <div class="col-md-9">
                                      <input type="date" class="form-control modal-item">
                                  </div>
                              </div>
                          </div>
                          <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                              <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                          </div>
                          <div class="extended-job-data-container mx-1 mt-2">
                          </div>
                      </div>

                      <div v-if="extendedEdu"
                          class="d-flex flex-column extended-info-container extended-edu-container w-100 pb-1">
                          <div class="ol-md-12 px-1 mt-1">
                              <input type="text" class="form-control modal-item" placeholder="Tên trường">
                          </div>
                          <div class="col-md-12 px-1 mt-1">
                              <input type="text" class="form-control modal-item" placeholder="Mô tả">
                          </div>
                          <div class="d-flex flex-row col-md-12 px-1 mt-1">
                              <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                                  <div class="col-md-3">
                                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                                          <a>Từ</a>
                                      </div>
                                  </div>
                                  <div class="col-md-9">
                                      <input type="date" class="form-control modal-item">
                                  </div>
                              </div>
                              <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                                  <div class="col-md-3">
                                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                                          <a>Đến</a>
                                      </div>
                                  </div>
                                  <div class="col-md-9">
                                      <input type="date" class="form-control modal-item">
                                  </div>
                              </div>
                          </div>
                          <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                              <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                              <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                          </div>
                          <div class="extended-edu-data-container mx-1 mt-2"></div>
                      </div>

                      <div v-if="extendedNote"
                          class="d-flex flex-column extended-info-container extended-note-container px-1 py-1">
                          <textarea class="h-100" placeholder="Viết điều gì đó..."></textarea>
                      </div>
                  </div>
              </div>
          </modal> -->

          <button type="button" class="btn p-0 btn-modal" @click="openMemberModalAdd()">Modal add member</button>
          
          <modal name="member-modal-add">
            <form @submit.prevent="addMember()">
              <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm thành viên
            </div>
            <div class="close-add-form" @click="closeMemberModalAdd">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-row">
            <div class="col-md-6 d-flex flex-row">
              <div class="col-md-4 d-flex flex-column mt-1" style="padding-left: 4px;">
                <div class="profile-pic"></div>
                <button class="btn p-0 colored mt-1 modal-item">Xoá ảnh</button>
                <!-- <div class="d-flex align-items-center justify-content-center">                   -->
                <button type="button" class="btn p-0 colored mt-1 modal-item" style="margin-top: 120px !important;"
                  @click="dead = !dead" :class="{ alivebuttoncolor: dead }">
                  <a v-show="!dead">Còn sống</a>
                  <a v-show="dead">Đã mất</a>
                </button>
                <button type="submit">Gui</button>
                <!-- </div>  -->
              </div>
              <div class="d-flex flex-column col-md-8 align-items-center px-1">
                <div class="d-flex flex-row align-items-center w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.memberName" type="text" class="form-control modal-item"
                      placeholder="Tên thành viên đầy đủ" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <input v-model="memberForm.member.nickName" type="text" class="form-control modal-item"
                      placeholder="Tên thường gọi" />
                  </div>
                  <div class="col-md-6 mt-1 position-relative">
                    <label for="birthorder" class="add-form-birthorder-label position-absolute">
                      Con
                      thứ
                    </label>
                    <input v-model="memberForm.member.birthOrder" id="birthorder" type="number"
                      class="form-control flex-grow add-form-birthorder-input modal-item pl-5" value="1" min="1" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-around w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <select v-model="memberForm.member.male" class="form-select modal-item">
                      <option selected value="">Giới tính</option>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                    </select>
                  </div>
                  <div class="col-md-6 mt-1 d-flex flex-row">
                    <div class="col-md-8 add-form-bloodtype-label modal-item">Nhóm máu</div>
                    <div class="col-md-4">
                      <select v-model="memberForm.member.bloodType" id="bloodtype" class="add-form-bloodtype-select form-select modal-item p-0">
                        <option selected value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-12">
                    <input v-model="memberForm.member.origin" type="text" class="form-control modal-item mt-1"
                      placeholder="Nguyên quán" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <input v-model="memberForm.member.nationalityId" type="text" class="form-control modal-item"
                      placeholder="Quốc tịch" />
                  </div>
                  <div class="col-md-6 mt-1">
                    <input type="text" class="form-control modal-item" placeholder="Tôn giáo" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày sinh dương lịch</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.dob" type="date" class="form-control modal-item" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày sinh âm lịch</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.lunarDob" type="date" class="form-control modal-item" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.birthPlace" type="text" class="form-control modal-item"
                      placeholder="Nơi sinh" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày mất</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.dod" type="date" class="form-control modal-item" v-bind:disabled="!dead" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.placeOfDeath" type="text" class="form-control modal-item"
                      placeholder="Nơi mất" v-bind:disabled="!dead" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1 mb-1">
                    <input v-model="memberForm.member.graveSite" type="text" class="form-control modal-item"
                      placeholder="Mộ phần" v-bind:disabled="!dead" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-1" style="padding-right: 4px">
              <div class="d-flex flex-row modal-item align-items-center justify-content-around">
                <div class="w-100">
                  <button type="button" @click="extendedContact = true; extendedJob = false; extendedEdu = false; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedContact }">
                    Liên
                    hệ
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = true; extendedEdu = false; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedJob }">
                    Nghề
                    nghiệp
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = false; extendedEdu = true; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedEdu }">
                    Giáo
                    dục
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = false; extendedEdu = false; extendedNote = true"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedNote }">
                    Ghi
                    chú
                  </button>
                </div>
              </div>
              <div v-if="extendedContact"
                class="d-flex flex-column extended-info-container extended-contact-container w-100">
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="memberForm.contact.address" type="text" class="form-control modal-item" placeholder="Địa chỉ" />
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.contact.phone1" type="text" class="form-control modal-item"
                      placeholder="Điện thoại 1" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.contact.phone2" type="text" class="form-control modal-item"
                      placeholder="Điện thoại 2" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.contact.email1" type="text" class="form-control modal-item"
                      placeholder="Email 1" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.contact.email2" type="text" class="form-control modal-item"
                      placeholder="Email 2" />
                  </div>
                </div>
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="memberForm.contact.facebookUrl" type="text" class="form-control modal-item"
                    placeholder="Facebook" />
                </div>
                <div class="col-md-12 px-1 mt-1 mb-1">
                  <input v-model="memberForm.contact.zalo" type="text" class="form-control modal-item" placeholder="Zalo" />
                </div>
              </div>


              <div v-if="extendedJob"
                class="d-flex flex-column extended-info-container extended-job-container w-100 pb-1">
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.job.organization" type="text" class="form-control modal-item"
                      placeholder="Tên cơ quan" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.job.organizationAddress" type="text" class="form-control modal-item"
                      placeholder="Địa chỉ" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.job.role" type="text" class="form-control modal-item"
                      placeholder="Vị trí công tác" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.job.jobName" type="text" class="form-control modal-item"
                      placeholder="Nghề nghiệp" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Từ</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="memberForm.job.startDateJob" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                  <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Đến</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="memberForm.job.endDateJob" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                </div>
                <div class="extended-job-data-container mx-1 mt-2">
                  <table>
                    <thead>
                      <tr>
                        <th>Organization</th>
                        <th>OrganizationAddress</th>
                        <th>Role</th>
                        <th>JobName</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.job" :key="item.JobID">
                        <td>{{ item.Organization }}</td>
                        <td>{{ item.OrganizationAddress }}</td>
                        <td>{{ item.Role }}</td>
                        <td>{{ item.JobName }}</td>
                        <td>{{ item.StartDate }}</td>
                        <td>{{ item.EndDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div v-if="extendedEdu"
                class="d-flex flex-column extended-info-container extended-edu-container w-100 pb-1">
                <div class="ol-md-12 px-1 mt-1">
                  <input v-model="this.memberForm.education.school" type="text" class="form-control modal-item"
                    placeholder="Tên trường" />
                </div>
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="this.memberForm.education.description" type="text" class="form-control modal-item"
                    placeholder="Mô tả" />
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Từ</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="this.memberForm.education.startDateEdu" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                  <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Đến</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="this.memberForm.education.endDateEdu" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                </div>
                <div class="extended-edu-data-container mx-1 mt-2">
                  <table>
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Description</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.edu" :key="item.EducationID">
                        <td>{{ item.School }}</td>
                        <td>{{ item.Description }}</td>
                        <td>{{ item.StartDate }}</td>
                        <td>{{ item.EndDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div v-if="extendedNote"
                class="d-flex flex-column extended-info-container extended-note-container px-1 py-1">
                <!-- <div class="extended-note-data-container h-100"> -->
                <textarea class="h-100" placeholder="Viết điều gì đó..."></textarea>
                <!-- </div> -->
              </div>
            </div>
          </div>
          </form>
          
          </modal>
          <modal name="member-modal-update">
            <form @submit.prevent="updateMember()">
              <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm thành viên
            </div>
            <div class="close-add-form" @click="closeMemberModalUpdate">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-row">
            <div class="col-md-6 d-flex flex-row">
              <div class="col-md-4 d-flex flex-column mt-1" style="padding-left: 4px;">
                <div class="profile-pic"></div>
                <button class="btn p-0 colored mt-1 modal-item">Xoá ảnh</button>
                <!-- <div class="d-flex align-items-center justify-content-center">                   -->
                <button type="button" class="btn p-0 colored mt-1 modal-item" style="margin-top: 120px !important;"
                  @click="dead = !dead" :class="{ alivebuttoncolor: dead }">
                  <a v-show="!dead">Còn sống</a>
                  <a v-show="dead">Đã mất</a>
                </button>
                <button type="submit">Gui</button>
                <!-- </div>  -->
              </div>
              <div class="d-flex flex-column col-md-8 align-items-center px-1">
                <div class="d-flex flex-row align-items-center w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.memberName" type="text" class="form-control modal-item"
                      placeholder="Tên thành viên đầy đủ" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <input v-model="memberForm.member.nickName" type="text" class="form-control modal-item"
                      placeholder="Tên thường gọi" />
                  </div>
                  <div class="col-md-6 mt-1 position-relative">
                    <label for="birthorder" class="add-form-birthorder-label position-absolute">
                      Con
                      thứ
                    </label>
                    <input v-model="memberForm.member.birthOrder" id="birthorder" type="number"
                      class="form-control flex-grow add-form-birthorder-input modal-item pl-5" value="1" min="1" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-around w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <select v-model="memberForm.member.male" class="form-select modal-item">
                      <option selected value="">Giới tính</option>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                    </select>
                  </div>
                  <div class="col-md-6 mt-1 d-flex flex-row">
                    <div class="col-md-8 add-form-bloodtype-label modal-item">Nhóm máu</div>
                    <div class="col-md-4">
                      <select v-model="memberForm.member.bloodType" id="bloodtype" class="add-form-bloodtype-select form-select modal-item p-0">
                        <option selected value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-12">
                    <input v-model="memberForm.member.origin" type="text" class="form-control modal-item mt-1"
                      placeholder="Nguyên quán" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-6 mt-1" style="padding-right: 4px;">
                    <input v-model="memberForm.member.nationalityId" type="text" class="form-control modal-item"
                      placeholder="Quốc tịch" />
                  </div>
                  <div class="col-md-6 mt-1">
                    <input type="text" class="form-control modal-item" placeholder="Tôn giáo" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày sinh dương lịch</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.dob" type="date" class="form-control modal-item" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày sinh âm lịch</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.lunarDob" type="date" class="form-control modal-item" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.birthPlace" type="text" class="form-control modal-item"
                      placeholder="Nơi sinh" />
                  </div>
                </div>
                <div class="d-flex flex-row align-items-center justify-content-center w-100">
                  <div class="col-md-6 d-flex flex-wrap">
                    <div class="add-form-date-label modal-item">Ngày mất</div>
                  </div>
                  <div class="col-md-6 mt-1">
                    <input v-model="memberForm.member.dod" type="date" class="form-control modal-item" v-bind:disabled="!dead" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1">
                    <input v-model="memberForm.member.placeOfDeath" type="text" class="form-control modal-item"
                      placeholder="Nơi mất" v-bind:disabled="!dead" />
                  </div>
                </div>
                <div class="d-flex flex-row w-100">
                  <div class="col-md-12 mt-1 mb-1">
                    <input v-model="memberForm.member.graveSite" type="text" class="form-control modal-item"
                      placeholder="Mộ phần" v-bind:disabled="!dead" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 mt-1" style="padding-right: 4px">
              <div class="d-flex flex-row modal-item align-items-center justify-content-around">
                <div class="w-100">
                  <button type="button" @click="extendedContact = true; extendedJob = false; extendedEdu = false; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedContact }">
                    Liên
                    hệ
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = true; extendedEdu = false; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedJob }">
                    Nghề
                    nghiệp
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = false; extendedEdu = true; extendedNote = false"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedEdu }">
                    Giáo
                    dục
                  </button>
                </div>
                <div class="w-100">
                  <button type="button"  @click="extendedContact = false; extendedJob = false; extendedEdu = false; extendedNote = true"
                    class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedNote }">
                    Ghi
                    chú
                  </button>
                </div>
              </div>
              <div v-if="extendedContact"
                class="d-flex flex-column extended-info-container extended-contact-container w-100">
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="memberForm.contact.address" type="text" class="form-control modal-item" placeholder="Địa chỉ" />
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.contact.phone1" type="text" class="form-control modal-item"
                      placeholder="Điện thoại 1" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.contact.phone2" type="text" class="form-control modal-item"
                      placeholder="Điện thoại 2" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.contact.email1" type="text" class="form-control modal-item"
                      placeholder="Email 1" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.contact.email2" type="text" class="form-control modal-item"
                      placeholder="Email 2" />
                  </div>
                </div>
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="memberForm.contact.facebookUrl" type="text" class="form-control modal-item"
                    placeholder="Facebook" />
                </div>
                <div class="col-md-12 px-1 mt-1 mb-1">
                  <input v-model="memberForm.contact.zalo" type="text" class="form-control modal-item" placeholder="Zalo" />
                </div>
              </div>


              <div v-if="extendedJob"
                class="d-flex flex-column extended-info-container extended-job-container w-100 pb-1">
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.job.organization" type="text" class="form-control modal-item"
                      placeholder="Tên cơ quan" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.job.organizationAddress" type="text" class="form-control modal-item"
                      placeholder="Địa chỉ" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6" style="padding-right: 2px;">
                    <input v-model="memberForm.job.role" type="text" class="form-control modal-item"
                      placeholder="Vị trí công tác" />
                  </div>
                  <div class="col-md-6" style="padding-left: 2px">
                    <input v-model="memberForm.job.jobName" type="text" class="form-control modal-item"
                      placeholder="Nghề nghiệp" />
                  </div>
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Từ</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="memberForm.job.startDateJob" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                  <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Đến</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="memberForm.job.endDateJob" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                </div>
                <div class="extended-job-data-container mx-1 mt-2">
                  <table>
                    <thead>
                      <tr>
                        <th>Organization</th>
                        <th>OrganizationAddress</th>
                        <th>Role</th>
                        <th>JobName</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.job" :key="item.JobID">
                        <td>{{ item.Organization }}</td>
                        <td>{{ item.OrganizationAddress }}</td>
                        <td>{{ item.Role }}</td>
                        <td>{{ item.JobName }}</td>
                        <td>{{ item.StartDate }}</td>
                        <td>{{ item.EndDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div v-if="extendedEdu"
                class="d-flex flex-column extended-info-container extended-edu-container w-100 pb-1">
                <div class="ol-md-12 px-1 mt-1">
                  <input v-model="this.memberForm.education.school" type="text" class="form-control modal-item"
                    placeholder="Tên trường" />
                </div>
                <div class="col-md-12 px-1 mt-1">
                  <input v-model="this.memberForm.education.description" type="text" class="form-control modal-item"
                    placeholder="Mô tả" />
                </div>
                <div class="d-flex flex-row col-md-12 px-1 mt-1">
                  <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Từ</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="this.memberForm.education.startDateEdu" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                  <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                    <div class="col-md-3">
                      <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                        <a>Đến</a>
                      </div>
                    </div>
                    <div class="col-md-9">
                      <input v-model="this.memberForm.education.endDateEdu" type="date" class="form-control modal-item" />
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
                  <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
                </div>
                <div class="extended-edu-data-container mx-1 mt-2">
                  <table>
                    <thead>
                      <tr>
                        <th>School</th>
                        <th>Description</th>
                        <th>StartDate</th>
                        <th>EndDate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="item in this.edu" :key="item.EducationID">
                        <td>{{ item.School }}</td>
                        <td>{{ item.Description }}</td>
                        <td>{{ item.StartDate }}</td>
                        <td>{{ item.EndDate }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <div v-if="extendedNote"
                class="d-flex flex-column extended-info-container extended-note-container px-1 py-1">
                <!-- <div class="extended-note-data-container h-100"> -->
                <textarea class="h-100" placeholder="Viết điều gì đó..."></textarea>
                <!-- </div> -->
              </div>
            </div>
          </div>
          </form>
          
          </modal>
      </div>
  </div>
</template>


<script>
import FamilyTree from "@balkangraph/familytree.js";
import { HTTP } from "../assets/js/baseAPI.js";
import Snackbar from "awesome-snackbar";
export default {
  data() {
    return {
      codeId: 123,
      memberId: 0,
      contactId: 0,
      JobId: 0,
      EducationId : 0,

      job:[],
      edu:[],

      expandconfigitem1: false,
      rotated1: false,
      expandconfigitem2: false,
      rotated2: false,
      expandconfigitem3: false,
      rotated3: false,
      expandconfigitem4: false,
      rotated4: false,
      expandconfigitem5: false,
      rotated5: false,
      expandconfigitem6: false,
      rotated6: false,
      expandconfigitem7: false,
      rotated7: false,
      expandconfigitem8: false,
      rotated8: false,


      configTree: true,
      configPrinting: false,
      dead: false,


      extendedContact: true,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,


      configSidebarHover: false,
      configSidebarExpansion: false,


      configSidebarWidth: 0,


      memberForm: {
        member:{
          parentId : null,
          marriageId: null,
          memberName: null,
          nickName: null,
          hasNickName: Boolean,
          birthOrder: Number,
          origin: null,
          nationalityId: Number,
          religionId: Number,
          dob: Date,
          lunarDob: Date,
          birthPlace: null,
          isAlive: Boolean,
          dod: Date,
          placeOfDeath:null,
          graveSite: null,
          male: Boolean,
          note: null,
          bloodType: null,
          generation: 0,
          codeId: this.codeId,
        },
        contact:
          {
            address: null,
            phone1: null,
            phone2: null,
            email1: null,
            email2: null,
            facebookUrl: null,
            zalo: null,
          },
        education:{
            school: null,
            description: null,
            startDateEdu: Date,
            endDateEdu: Date,
         },
        job:{
          organization: null,
            organizationAddress: null,
            role: null,
            jobName: null,
            startDateJob: Date,
            endDateJob: Date,
        },
      },
      nodes: [],
    };
  },
  methods: {
    takeInfor(id){
      HTTP.get("InforMember", {
          params: {
            memberId: id,
          },
        }).then((response) => {
          console.log(id)
          let infor = response.data.infor[0];
          console.log(infor.MemberName)
          this.memberId = infor.MemberID;
          this.memberForm.member.memberName = infor.MemberName;
          this.memberForm.member.nickName = infor.NickName;
          this.memberForm.member.hasNickName = infor.HasNickName;
          this.memberForm.member.birthOrder = infor.BirthOrder;
          this.memberForm.member.origin = infor.Origin;
          this.memberForm.member.nationalityId = infor.NationalityID;
          this.memberForm.member.religionId = infor.ReligionID;
          this.memberForm.member.dob = infor.Dob;
          this.memberForm.member.lunarDob = infor.LunarDob;
          this.memberForm.member.birthPlace = infor.BirthPlace;
          this.memberForm.member.isAlive = infor.IsAlive;
          this.memberForm.member.dob = infor.Dob;
          this.memberForm.member.placeOfDeath = infor.PlaceOfDeadth;
          this.memberForm.member.graveSite = infor.GraveSite;
          this.memberForm.member.note = infor.Note;
          this.memberForm.member.generation = infor.Generation,
          this.memberForm.member.codeId = infor.CodeID;
          this.memberForm.member.bloodType = infor.BloodType;
          this.memberForm.member.male = infor.Male;
          console.log(infor)
          let contact = response.data.contact[0];
          if(contact != null){
            this.contactId = contact.ContactID;
            this.memberForm.contact.address = contact.Address;
            this.memberForm.contact.phone1 = contact.Phone1;
            this.memberForm.contact.phone2 = contact.Phone2;
            this.memberForm.contact.email1 = contact.Email1;
            this.memberForm.contact.email2 = contact.Email2;
            this.memberForm.contact.facebookUrl = contact.FacebookUrl;
            this.memberForm.contact.zalo = contact.Zalo;
          }else{
            this.memberForm.contact = {};
          }
          this.job = response.data.job; 
          this.edu = response.data.education;
        });
        console.log(this.memberForm);
    },
    addMember() {
      if (this.memberForm.member.nickName != null) {
        this.memberForm.member.hasNickName = true;
      } else {
        this.memberForm.member.hasNickName = false;
      }
      this.memberForm.member.religionId = this.memberForm.member.nationalityId,
        this.memberForm.member.isAlive = this.dead;
      HTTP.post(`member`, {
        parentID: null,
        marriageID: null,
        memberName: this.memberForm.member.memberName,
        nickName: this.memberForm.member.nickName,
        hasNickName: this.memberForm.member.hasNickName,
        birthOrder: this.memberForm.member.birthOrder,
        origin: this.memberForm.member.origin,
        nationalityId: this.memberForm.member.nationalityId,
        religionId: this.memberForm.member.religionId,
        dob: this.memberForm.member.dob,
        lunarDob: this.memberForm.member.lunarDob,
        birthPlace: this.memberForm.member.birthPlace,
        isAlive: this.memberForm.member.isAlive,
        dod: this.memberForm.member.dob,
        placeOfDeath: this.memberForm.member.placeOfDeath,
        graveSite: this.memberForm.member.graveSite,
        note: this.memberForm.member.note,
        generation: 0,
        codeId: this.codeId,
        bloodType: this.memberForm.member.bloodType,
        male: this.memberForm.member.male,
      }).then((response) => {
        this.memberId = response.data.data.memberId;
          console.log(this.memberId);
        this.memberForm.member = {};
        new Snackbar(`Add successfully`, {
            position: "bottom-right",
            theme: "light",
            style: {
              container: [
                ["background-color", "green"],
                ["border-radius", "5px"],
              ],
              message: [["color", "#fff"]],
            },
          });
      }).catch((error) => {
        console.log("Login error:", error);
      })

      HTTP.post(`addJob`, {
        memberId: this.memberId,
        Organization: this.memberForm.job.organization,
        OrganizationAddress: this.memberForm.job.organizationAddress,
        Role: this.memberForm.job.role,
        JobName: this.memberForm.job.jobName,
        StartDate: this.memberForm.job.startDateJob,
        EndDate: this.memberForm.job.endDateEdu,
      }).then(() => {
        this.memberForm.job = {};
        console.log(this.memberId);
      }).catch((error) => {
        console.log("Login error:", error);
      })
      HTTP.post(`addContact`, {
        memberId: this.memberId,
        Address: this.memberForm.contact.address,
        Phone1: this.memberForm.contact.phone1,
        Phone2: this.memberForm.contact.phone2,
        Email1: this.memberForm.contact.email1,
        Email2: this.memberForm.contact.email2,
        FacebookUrl: this.memberForm.contact.facebookUrl,
        Zalo: this.memberForm.contact.zalo,
      }).then(() => {
        this.memberForm.contact = {};
        console.log(this.memberId);
      }).catch((error) => {
        console.log("Login error:", error);
      })

      HTTP.post(`addEducation`, {
        MemberID: this.memberId,
        School: this.memberForm.education.school,
        Description: this.memberForm.education.description,
        StartDate: this.memberForm.education.startDateEdu,
        EndDate: this.memberForm.education.endDateEdu,
      }).then(() => {
        this.memberForm.education = {};
        console.log(this.memberId);
      }).catch((error) => {
        console.log("Login error:", error);
      })
    },

    updateMember(){
      HTTP.put(`member`, {
        memberID: this.memberId,
        memberName: this.memberForm.member.memberName,
        nickName: this.memberForm.member.nickName,
        parentID: this.memberForm.member.parentId,
        marriageID: this.memberForm.member.marriageId,
        hasNickName: this.memberForm.member.hasNickName,
        birthOrder: this.memberForm.member.birthOrder,
        origin: this.memberForm.member.origin,
        nationalityId: this.memberForm.member.nationalityId,
        religionId: this.memberForm.member.religionId,
        dob: this.memberForm.member.dob,
        lunarDob: this.memberForm.member.lunarDob,
        birthPlace: this.memberForm.member.birthPlace,
        isAlive: this.memberForm.member.isAlive,
        dod: this.memberForm.member.dob,
        placeOfDeath: this.memberForm.member.placeOfDeath,
        graveSite: this.memberForm.member.graveSite,
        note: this.memberForm.member.note,
        generation: this.memberForm.member.generation,
        bloodType: this.memberForm.member.bloodType,
        male: this.memberForm.member.male,
        codeId : this.memberForm.member.codeId,
      }).then(() => {
      }).catch((error) => {
        console.log("Login error:", error);
      })

      // HTTP.post(`updateJob`, {
      //   memberId: this.memberId,
      //   Organization: this.memberForm.job.organization,
      //   OrganizationAddress: this.memberForm.job.organizationAddress,
      //   Role: this.memberForm.job.role,
      //   JobName: this.memberForm.job.jobName,
      //   StartDate: this.memberForm.job.startDateJob,
      //   EndDate: this.memberForm.job.endDateEdu,
      // }).then(() => {
      //   this.memberForm.job = {};
      //   console.log(this.memberId);
      // }).catch((error) => {
      //   console.log("Login error:", error);
      // })
      HTTP.put(`updateContact`, {
        contactID: this.contactId,
        Address: this.memberForm.contact.address,
        Phone1: this.memberForm.contact.phone1,
        Phone2: this.memberForm.contact.phone2,
        Email1: this.memberForm.contact.email1,
        Email2: this.memberForm.contact.email2,
        FacebookUrl: this.memberForm.contact.facebookUrl,
        Zalo: this.memberForm.contact.zalo,
      }).then(() => {
      }).catch((error) => {
        console.log("Login error:", error);
      })

      // HTTP.post(`addEducation`, {
      //   MemberID: this.memberId,
      //   School: this.memberForm.education.school,
      //   Description: this.memberForm.education.description,
      //   StartDate: this.memberForm.education.startDateEdu,
      //   EndDate: this.memberForm.education.endDateEdu,
      // }).then(() => {
      //   this.memberForm.education = {};
      //   console.log(this.memberId);
      // }).catch((error) => {
      //   console.log("Login error:", error);
      // })
    },

    deleteMember(){
      HTTP.delete(`member`, {
          memberID: 37
      }).then(() => {
      }).catch((error) => {
        console.log("Login error:", error);
      })
    },
    
    mytree: function (domEl, x) {
      FamilyTree.templates.tommy_male.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_4 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_4 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
      this.family = new FamilyTree(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: "gender",
          field_2: "dob",
          field_3: "dod",
          field_4: "codeId",
        },
        nodeMouseClick: FamilyTree.action.none,
      });

      this.family.onNodeClick((arg) => {
        this.takeInfor(arg.node.id);
        this.openMemberModalUpdate();
      });
    },
    openChildrenModal() {
      this.$modal.show("children-modal");
    },
    closeChildrenModal() {
      this.$modal.hide("children-modal");
    },
    openMemberModalAdd() {
      this.memberForm.member = {};
      this.memberForm.contact = {};
      this.memberForm.job = {};
      this.memberForm.education = {};
      this.job = {};
      this.edu = {};
      this.$modal.show("member-modal-add");
    },
    openMemberModalUpdate() {
      if(this.memberForm != null){
        this.$modal.show("member-modal-update");
      }
      
    },
    closeMemberModalAdd() {
      this.$modal.hide("member-modal-add");
    },
    closeMemberModalUpdate() {
      this.$modal.hide("member-modal-update");
    },
    expandConfigSidebar() {
      this.configSidebarHover = true;
      this.configSidebarWidth = 25;
      setTimeout(() => {
        this.configSidebarExpansion = true;
      }, 300);
    },
    collapseConfigSidebar() {
      this.configSidebarHover = false;
      this.configSidebarWidth = 0;
      this.configSidebarExpansion = false;
    },
  },
  mounted() {
    HTTP.get("viewTree", {
      params: {
        memberID: 1,
      },
    })
      .then((response) => {
        this.nodes = response.data;
        for (let i = 0; i < this.nodes.length; i++) {
          const node = this.nodes[i];
          node.tags = [];

        }
        // Draw the FamilyTree with the data from the API
        this.mytree(this.$refs.tree, this.nodes);
      })
      .catch((e) => {
        console.log(e);
      });
  },
};
</script>
 
<style>@import '../assets/css/familytree.css';</style>






