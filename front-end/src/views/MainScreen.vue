<template>
  <div class="d-flex align-items-center w-100">
    <div v-if="!displayList" class="list d-flex flex-column align-items-center">
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
    <div class="d-flex main-screen align-items-center w-100">
      <button type="button" class="btn p-0 btn-modal" @click="openChildrenModal">Modal add con</button>

      <button type="button" class="btn p-0 btn-modal" @click="openMemberModal">Modal add member</button>
      <modal name="member-modal">
        <div class="card">
          <div class="card-header text-center" style="background-color:#E8C77B">
            <h5>Header</h5>
            <div class="close-add-form" @click="closeMemberModal" style="top: 8px;right:5px">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="card-body" style="padding: 0; height: 630px">
            <div class="row" style="padding: 0;height: 100%;">
              <div class="col-3 select-menu">
                <div class="custom-info" :class="{ selected: extendedInfo }" @click="selectedInfor()">
                  <h5>Thông tin</h5>
                </div>
                <div class="custom-info" :class="{ selected: extendedContact }" @click="selectedContact()">
                  <h5>Liên Hệ</h5>
                </div>
                <div class="custom-info" :class="{ selected: extendedJob }" @click="selectedJob()">
                  <h5>Nghề nghiệp</h5>
                </div>
                <div class="custom-info" :class="{ selected: extendedEdu }" @click="selectedEdu()">
                  <h5>Giáo dục</h5>
                </div>
                <div class="custom-info" :class="{ selected: extendedNote }" @click="selectedNote()">
                  <h5>Giáo dục</h5>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-if="extendedInfo">
                <div class="row">
                  <div class="col-4">
                    <svg fill="#000000" height="300px" width="300px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                      <g>
                        <g>
                          <circle cx="256" cy="114.526" r="114.526" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421
			c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" />
                        </g>
                      </g>
                    </svg>
                    <div class="form-group">
                      <label for="imageUpload">Tải ảnh lên</label>
                      <input type="file" class="form-control input-file" id="imageUpload" accept="image/*" />
                    </div>
                  </div>
                  <div class="col-8">
                    <div style="position: relative; margin-right:10px">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Tên thành viên đầy đủ</label>
                    </div>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Tên thường gọi</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input type="number" class="form-control modal-item" placeholder />
                        <label class="form-label-number" min="0" for="input">Con Thứ</label>
                      </div>
                    </div>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <select class="form-select modal-item">
                          <option value="1">Nam</option>
                          <option value="0">Nữ</option>
                        </select>
                        <label class="form-label" for="select">Giới Tính</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <select id="bloodtype" class="form-select modal-item">
                          <option value="1">A</option>
                          <option value="2">B</option>
                          <option value="3">AB</option>
                          <option value="4">O</option>
                        </select>
                        <label class="form-label-number" for="select">Nhóm Máu</label>
                      </div>
                    </div>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <select class="form-select modal-item">
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">{{nation.NationalityName}}</option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <select id="bloodtype" class="form-select modal-item">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">{{religion.ReligionName}}</option>
                        </select>
                        <label class="form-label-number" for="select">Tôn Giáo</label>
                      </div>
                    </div>
                    <div class="form-group">
                      <h6 style="margin-bottom:20px">Ngày Sinh (*)</h6>
                      <div style="display:flex">
                        <div style="position: relative; width: 50%;margin-right: 10px;">
                          <input type="date" class="form-control modal-item" placeholder />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div style="position: relative;width: 50%; margin-right: 10px;">
                          <input type="date" class="form-control modal-item" placeholder />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                    </div>
                    <div style="position: relative; margin-right:10px">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Nơi sinh</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input v-model="isDead" type="checkbox" class="form-check-input" id="lostCheckbox" />
                      <label style="font-size: 14px; margin-top: 7px;" class="form-check-label" for="lostCheckbox">Đã mất</label>
                    </div>
                    <div class="form-group" v-if="isDead">
                      <h6 style="margin-bottom:20px">Ngày Mất (*)</h6>
                      <div style="display:flex">
                        <div style="position: relative; width: 50%;margin-right: 10px;">
                          <input type="date" class="form-control modal-item" placeholder />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div style="position: relative;width: 50%; margin-right: 10px;">
                          <input type="date" class="form-control modal-item" placeholder />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                      <div style="position: relative; margin-right:10px">
                        <input type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Nơi Mất</label>
                      </div>
                      <div style="position: relative; margin-right:10px">
                        <input type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Mộ Phần</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-else-if="extendedContact">
                <div class="row">
                  <div style="position: relative;padding-right: 23px;">
                    <input type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input">Địa chỉ</label>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Điện Thoại 1</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" min="0" for="input">Điện Thoại 2</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input type="email" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Email 1</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input type="email" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input">Email 2</label>
                    </div>
                  </div>
                  <div style="position: relative; padding-right: 23px;">
                    <input type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input">Facebook</label>
                  </div>
                  <div style="position: relative; padding-right: 23px;">
                    <input type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input">Zalo</label>
                  </div>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-else-if="extendedJob">
                <div class="row">
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Tên Cơ Quan</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" min="0" for="input">Địa Chỉ</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Vị trí công tác</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input type="text" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input">nghề nghiệp</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <h6 style="margin-bottom:20px">Thời gian công tác</h6>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input type="date" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Từ ngày</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input type="date" class="form-control modal-item" placeholder />
                        <label class="form-label-number" min="0" for="input">Đến ngày</label>
                      </div>
                    </div>
                  </div>
                  <div class="btn-group" role="group">
                    <button type="button" class="btn btn-primary">Add</button>
                  </div>
                  <div class="form-group" style="margin-top:13px;padding-right:22px">
                    <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder="Nhập lịch sử công tác"></textarea>
                  </div>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-else-if="extendedEdu">
                <div class="row">
                  <div style="position: relative;padding-right: 20px;">
                    <input type="text" class="form-control modal-item" placeholder />
                    <label style="left: 20px;" class="form-label" for="input">Tên thành viên đầy đủ</label>
                  </div>
                  <div style="position: relative;padding-right: 20px;">
                    <input type="text" class="form-control modal-item" placeholder />
                    <label style="left: 20px;" class="form-label" for="input">Mô tả</label>
                  </div>
                  <div class="form-group">
                    <h6 style="margin-bottom:20px">Thời gian học tập</h6>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input type="date" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Từ ngày</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input type="date" class="form-control modal-item" placeholder />
                        <label class="form-label-number" min="0" for="input">Đến ngày</label>
                      </div>
                    </div>
                  </div>
                  <div class="form-group" style="margin-top:13px;padding-right:22px">
                    <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder></textarea>
                  </div>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-else>
                <div class="form-group" style="margin-top:13px;padding-right:22px">
                  <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder="Ghi Chú"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer" style="background-color:#E8C77B">
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary mr-2">Add</button>
              <button style="margin-left:10px" type="button" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </modal>

      <button type="button" class="btn p-0 btn-modal" @click="openUpdateMemberModal">Modal update member</button>

      <div id="tree" ref="tree"></div>
    </div>

    <div v-if="!configSidebarHover" class="collapsed-config-sidebar d-flex align-items-center justify-content-center">
      <svg @mouseenter="expandConfigSidebar()" class="config-sidebar-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"
        />
      </svg>
    </div>
    <div @mouseleave="collapseConfigSidebar()" class="config-sidebar h-100" :style="{ width: configSidebarWidth + '%' }">
      <!--Chọn chủ đề-->
      <div v-if="configSidebarExpansion" class="topic">
        <select class="form-select py-1">
          <option selected value="1">Chủ đề 1</option>
          <option value="2">Chủ đề 2</option>
          <option value="3">Chủ đề 3</option>
        </select>
      </div>
      <!--Config menu-->
      <div v-if="configSidebarExpansion" class="d-flex flex-column config-menu">
        <div class="d-flex flex-row align-items-center justify-content-center">
          <div @click="configTree = true; configPrinting = false;" class="config-topic text-center col-md-6 px-1 py-1" :class="{ notchosenconfigmenu: configPrinting }">
            <a>Phả đồ</a>
          </div>
          <div @click="configTree = false; configPrinting = true" class="config-topic text-center col-md-6 px-1 py-1" :class="{ notchosenconfigmenu: configTree }">
            <a>Hỗ trợ in ấn</a>
          </div>
        </div>
        <div v-if="configTree" class="config-menu-board d-flex flex-column">
          <div @click="expandthanhvien = !expandthanhvien" class="config-menu-item">
            <button type="button" class="btn p-0" :class="{ rotated1: expandthanhvien }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Thành viên</a>
          </div>
          <div v-show="expandthanhvien" class="config-menu-item-expanded">
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
          <div @click="expandbangve = !expandbangve" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated2: expandbangve }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Bảng vẽ</a>
          </div>
          <div v-show="expandbangve" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <a>Màu nền bảng vẽ</a>
              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" />
            </div>
            <div class="config-menu-item-content">
              <a>Khoảng cách 2 thẻ</a>
            </div>
            <div class="d-flex flex-column align-items-center">
              <div class="d-flex flex-row">
                <div class="col-md-6 config-menu-item-content">Ngang</div>
                <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
              </div>
              <div class="d-flex flex-row">
                <div class="col-md-6 config-menu-item-content">Dọc</div>
                <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
              </div>
            </div>
          </div>
          <div @click="expandkhungthe = !expandkhungthe" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated3: expandkhungthe }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Khung thẻ</a>
          </div>
          <div v-show="expandkhungthe" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
              <a>Khung viền</a>
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <a>Màu viền</a>
              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" />
            </div>
            <div class="d-flex flex-row">
              <div class="col-md-6 config-menu-item-content">Độ đậm</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
              <a>Khung ảnh</a>
            </div>
            <div class="d-flex flex-row">
              <div class="col-md-6 config-menu-item-content">Khung thẻ</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
          </div>
          <div @click="expandthongtinthe = !expandthongtinthe" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated4: expandthongtinthe }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Thông tin thẻ</a>
          </div>
          <div v-show="expandthongtinthe" class="config-menu-item-expanded">
            <div class="d-flex flex-row align-items-center">
              <div class="col-md-6 config-menu-item-content">Tỉ lệ cơ bản (%)</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
            <div class="d-flex flex-row">
              <div class="col-md-6 config-menu-item-content align-items-center">Tỉ lệ tổ phụ so với cơ bản (%)</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
            <div class="d-flex flex-row">
              <div class="col-md-6 config-menu-item-content align-items-center">Độ đậm đường kẻ</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <a>Màu chữ</a>
              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" />
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <a>Màu nền</a>
              <div class="d-flex position-relative">
                <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" id="color-for-male" />
                <label class="label-color-input" for="color-for-male">Nam</label>
              </div>
              <div class="d-flex position-relative">
                <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" id="color-for-male" />
                <label class="label-color-input" for="color-for-male">Nữ</label>
              </div>
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <div class="d-flex position-relative">
                <input class="form-control-color config-menu-color-genderunknown-input p-0" type="color" value="#FFFFFF" id="color-for-male" />
                <label class="label-color-input" for="color-for-male">Không rõ GT</label>
              </div>
            </div>
          </div>
        </div>
        <div v-if="configPrinting" class="config-menu-board d-flex flex-column">
          <div @click="expandkhungvien = !expandkhungvien" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated5: expandkhungvien }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Khung viền</a>
          </div>
          <div v-show="expandkhungvien" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
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
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
          </div>
          <div @click="expandtieude = !expandtieude" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated6: expandtieude }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Tiêu đề</a>
          </div>
          <div v-show="expandtieude" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
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
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
            </div>
          </div>
          <div @click="expandnen = !expandnen" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated7: expandnen }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Nền</a>
          </div>
          <div v-show="expandnen" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
              <a>Vẽ màu nền</a>
              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" />
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
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
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
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
          <div @click="expandthongtinngaytao = !expandthongtinngaytao" class="d-flex config-menu-item align-items-center">
            <button type="button" class="btn p-0" :class="{ rotated8: expandthongtinngaytao }">
              <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
              </svg>
            </button>
            <a>Thông tin ngày tạo</a>
          </div>
          <div v-show="expandthongtinngaytao" class="config-menu-item-expanded">
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
              <a>Hiện ngày tạo</a>
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <input class="form-check-input config-menu-checkbox-input" type="checkbox" />
              <a>Hiện người tạo</a>
            </div>
            <div class="d-flex align-items-center config-menu-item-content">
              <a>Màu chữ</a>
              <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF" />
            </div>
            <div class="d-flex flex-row align-items-center">
              <div class="col-md-6 config-menu-item-content">Cỡ chữ</div>
              <input class="col-md-6 form-control config-menu-number-input config-menu-item-content" type="number" value="0" min="0" />
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
              <input class="form-control config-menu-item-content" type="text" readonly />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FamilyTree from "@balkangraph/familytree.js";
import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      objAddMember: {},
      ListNationality: null,
      ListReligion: null,
      nodes: [],
      isDead: false,

      expandthanhvien: false,
      rotated1: false,
      expandbangve: false,
      rotated2: false,
      expandkhungthe: false,
      rotated3: false,
      expandthongtinthe: false,
      rotated4: false,
      expandkhungvien: false,
      rotated5: false,
      expandtieude: false,
      rotated6: false,
      expandnen: false,
      rotated7: false,
      expandthongtinngaytao: false,
      rotated8: false,

      configTree: true,
      configPrinting: false,

      extendedInfo: true,
      extendedContact: false,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,

      configSidebarHover: false,
      configSidebarExpansion: false,

      configSidebarWidth: 0,

      displayList: false,
    };
  },
  methods: {
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
        // this.takeInfor(arg.node.id);
        // this.openMemberModalUpdate();
        console.log(arg.node.id);
      });
    },
    selectedInfor() {
      this.extendedInfo = true;
      this.extendedContact = false;
      this.extendedEdu = false;
      this.extendedJob = false;
      this.extendedNote = false;
    },
    selectedContact() {     
      this.extendedInfo = false;
      this.extendedContact = true;
      this.extendedEdu = false;
      this.extendedJob = false;
      this.extendedNote = false;
    },
    selectedEdu() {
      this.extendedInfo = false;
      this.extendedContact = false;
      this.extendedEdu = true;
      this.extendedJob = false;
      this.extendedNote = false;
    },
    selectedJob() {
      this.extendedInfo = false;
      this.extendedContact = false;
      this.extendedEdu = false;
      this.extendedJob = true;
      this.extendedNote = false;
    },
    selectedNote() {
      this.extendedInfo = false;
      this.extendedContact = false;
      this.extendedEdu = false;
      this.extendedJob = false;
      this.extendedNote = true;
    },
    openChildrenModal() {
      this.$modal.show("children-modal");
    },
    addNewMember() {},
    closeChildrenModal() {
      this.$modal.hide("children-modal");
    },
    openMemberModal() {
      this.$modal.show("member-modal");
    },
    closeMemberModal() {
      this.$modal.hide("member-modal");
    },
    openUpdateMemberModal() {
      this.$modal.show("update-member-modal");
    },
    closeUpdateMemberModal() {
      this.$modal.hide("update-member-modal");
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
    getListMember() {
      HTTP.get("viewTree", {
        params: {
          memberID: 6,
        },
      })
        .then((response) => {
          this.nodes = response.data;
          this.mytree(this.$refs.tree, this.nodes);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListNationality() {
      HTTP.get("nationality")
        .then((response) => {
          this.ListNationality = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListReligion() {
      HTTP.get("religion")
        .then((response) => {
          this.ListReligion = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  created() {
    EventBus.$on("displayList", (value) => {
      this.displayList = value;
    });
  },

  watch: {
    displayList: {
      handler: function () {
        console.log(this.displayList);
      },
    },
  },

  mounted() {
    this.getListMember();
    this.getListNationality();
    this.getListReligion();
  },
};
</script>
 
<style>
#tree {
  width: 100%;
  height: 100%;
}

svg.tommy .node.died.male rect {
  fill: gray;
}

svg.tommy .node.died.female rect {
  fill: gray;
}

svg.tommy .node.choose.male rect {
  fill: #edf048;
}

svg.tommy .node.choose.female rect {
  fill: #edf048;
}

svg.tommy .node.male > rect {
  fill: #c69934;
}

svg.tommy .node.female > rect {
  fill: pink;
}
</style>