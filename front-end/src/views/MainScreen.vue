<template>
  <div class="d-flex h-100 w-100">
    <div class="list d-flex flex-column align-items-center">
      <div class="w-100">
        <select v-model="selectAdress" class="d-flex text-center form-select dropdown p-0">
          <option :value="null" selected>Tỉnh/Thành phố</option>
          <option class="dropdown-item" value="Hà Nội">Hà Nội</option>
          <option class="dropdown-item" value="Điện Biên">Điện Biên</option>
          <option class="dropdown-item" value="Lào Cai">Lào Cai</option>
          <option class="dropdown-item" value="Lai Châu">Lai Châu</option>
          <option class="dropdown-item" value="Sơn La">Sơn La</option>
          <option class="dropdown-item" value="Yên Bái">Yên Bái</option>
          <option class="dropdown-item" value="Hòa Bình">Hòa Bình</option>
          <option class="dropdown-item" value="Thái Nguyên">Thái Nguyên</option>
          <option class="dropdown-item" value="Quảng Ninh">Quảng Ninh</option>
          <option class="dropdown-item" value="Bắc Giang">Bắc Giang</option>
        </select>
      </div>
      <div class="d-flex flex-row w-100" style="height: 32px; margin-bottom: 8px;">
        <div class="col-md-6 pt-1" style="padding-right: 4px;">
          <select v-model="selectBloodType" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option v-for="blood in ListBloodTypeGroup" :key="blood.id" class="dropdown-item" :value="blood.id">{{blood.BloodType}}</option>
          </select>
        </div>
        <div class="col-md-6 pt-1">
          <select class="d-flex text-center form-select dropdown p-0" v-model="selectAge" @change="GetListFilterMember()">
            <option class="dropdown-item" :value="null">Nhóm Tuổi</option>
            <option v-for="age in ListAgeGroup" :key="age.id" class="dropdown-item" :value="age.id">{{age.From}} - {{age.End}} Tuổi</option>
          </select>
        </div>
      </div>
      <div class="w-100" style="margin-bottom: 4px">
        <button @click="openNotiModal()" style="width:100%" type="button" class="btn btn-secondary">Tạo thông báo</button>
      </div>
      <div class="h-100 w-100 d-flex flex-column">
        <div class="existing-members d-flex flex-column w-100">
          <div class="list-item" style="background-color: #AED6F1; text-align: center;">Đã có trên phả đồ</div>
          <div class="d-flex flex-column w-100" style="overflow-y: auto;">
            <div v-for="(n,index) in nodes" :key="n.id">
              <div v-if="index == 0" class="list-item ancestor-member">Thành Viên {{n.name}}</div>
              <div v-else class="list-item">Thành Viên {{n.name}}</div>
            </div>
          </div>
        </div>
        <div class="nonexisting-members d-flex flex-column w-100">
          <div class="list-item" style="background-color: #AED6F1; text-align: center;">Chưa có trên phả đồ</div>
          <div v-if="ListUnspecifiedMembers" class="d-flex flex-column w-100" style="overflow-y: auto;">
            <div v-for="list in ListUnspecifiedMembers" :key="list.id" class="list-item">Thành Viên {{list.MemberName}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex main-screen align-items-center w-100">
      <div id="tree" ref="tree"></div>
    </div>

    <div class="Container-select-modal">
      <modal name="Select-option-Modal">
        <div class="card" style="width: 400px;left:45%">
          <div class="card-header text-center" style="background-color:#E8C77B">
            <h5>Thành Viên {{ objMemberInfor.MemberName }}</h5>
            <div class="close-add-form" @click="closeSelectModal" style="top: 8px;right:5px">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="card-body" style="padding: 0,height:auto">
            <div class="list-group">
              <div class="list-group-item">Xem mối quan hệ hiện tại</div>
              <div @click="expandAddRelaionship = !expandAddRelaionship" class="list-group-item">Thêm quan hệ</div>
              <div class="collapsedAddRelationship" :class="{ expandedAddRelationship: expandAddRelaionship }">
                <div v-show="expandAddRelaionship" class="list-group-item" @click="openMemberModal('parent')">Thêm Cha</div>
                <div v-show="expandAddRelaionship" class="list-group-item">Thêm Mẹ</div>
                <div v-show="expandAddRelaionship" class="list-group-item" @click="openMemberModal('married')">Thêm Vợ</div>
                <div v-show="expandAddRelaionship" class="list-group-item" @click="openMemberModal('children')">Thêm Con</div>
              </div>
              <div class="list-group-item">Set làm tộc trưởng</div>
              <div class="list-group-item" @click="setPaternalAncestor()">Set làm tổ cụ</div>
              <div class="list-group-item" @click="removeMember()">Xóa thành viên</div>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <!-- Đât là modal thông báo -->
    <modal name="noti-modal">
      <div class="h-100 d-flex flex-column" style="background-color: white;">
        <div class="modal-title d-flex flex-row align-items-center justify-content-center" style="height: 60px;border-radius:0px">
          <div class="col-3 d-flex flex-row align-items-center h-100 p-3" style="background-color: rgb(235, 235, 235);">
            <div>
              <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
              </svg>
            </div>
            <div class="d-flex justify-content-center" style="flex-grow: 1;">User</div>
          </div>
          <div class="col-9 d-flex align-items-center justify-content-center">Thông báo tới thành viên</div>
        </div>
        <div class="d-flex flex-row" style="height: calc(100% - 60px)">
          <div class="col-3 h-100 d-flex flex-column" style="overflow-y: auto;background-color: rgb(235, 235, 235);">
            <div class="position-relative d-flex" style="height: 48px;">
              <label for="text-search" style="position: absolute; inset: 12px;">
                <svg class="text-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>
              <div class="w-100" style="height: 48px; padding: 8px;">
                <input class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" />
              </div>
            </div>
            <div class="position-relative d-flex" style="height: 48px;">
              <div class="d-flex flex-row align-items-center p-2">
                <input v-model="checkAll" type="checkbox" class="form-check-input" />
                <div style="padding-left: 8px">Chọn tất cả mọi người</div>
              </div>
            </div>
            <div>
              <div tabindex="1" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{ chosen: checkAll }">
                <div>
                  <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                  </svg>
                </div>
                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
              </div>
              <div tabindex="2" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{ chosen: checkAll }">
                <div>
                  <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                  </svg>
                </div>
                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
              </div>
              <div tabindex="3" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{ chosen: checkAll }">
                <div>
                  <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                  </svg>
                </div>
                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
              </div>
              <div tabindex="4" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{ chosen: checkAll }">
                <div>
                  <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                  </svg>
                </div>
                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
              </div>
            </div>
          </div>
          <div class="col-9 h-100 position-relative">
            <div class="position-absolute w-100 px-2 d-flex flex-row" style="bottom: 8px">
              <input type="text" class="form-control" placeholder="..." />
              <div class="d-flex align-items-center" style="padding-left: 8px; cursor: pointer;">
                <svg class="noti-send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <!-- Đây là modal member-->
    <modal name="member-modal">
      <div class="card" v-if="objMemberInfor">
        <div class="card-header text-center" style="background-color:#E8C77B">
          <h5>{{TitleModal}}</h5>
          <div class="close-add-form" @click="closeMemberModal" style="top: 8px;right:5px">
            <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        </div>
        <div class="card-body" style="padding: 0; height: 675px">
          <div class="row" style="padding: 0;height: 100%;">
            <div class="col-3 select-menu">
              <div class="custom-info" :class="{ selected: extendedInfo }" @click="selectedInfor()">
                <h5>Thông tin</h5>
              </div>
              <div class="custom-info" :class="{ selected: extendedContact }" @click="selectedContact()">
                <h5>Liên Hệ</h5>
              </div>
              <div v-if="isEdit" class="custom-info" :class="{ selected: extendedJob }" @click="selectedJob()">
                <h5>Nghề nghiệp</h5>
              </div>
              <div v-if="isEdit" class="custom-info" :class="{ selected: extendedEdu }" @click="selectedEdu()">
                <h5>Giáo dục</h5>
              </div>
              <div class="custom-info" :class="{ selected: extendedNote }" @click="selectedNote()">
                <h5>Ghi chú</h5>
              </div>
            </div>
            <div class="col-9" style="padding-top: 15px" v-if="extendedInfo">
              <div class="row">
                <div class="col-4">
                  <img style="height:316px;width:360px;margin-bottom:30px" v-if="avatarSrc" :src="avatarSrc" alt="Avatar" />
                  <svg v-else style="margin-bottom:46px" fill="#000000" height="300px" width="300px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
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
                    <input type="file" class="form-control input-file" id="imageUpload" accept="image/*" @change="updateAvatar($event)" />
                  </div>
                </div>
                <div class="col-8">
                  <div style="position: relative; margin-right:10px">
                    <input v-model="objMemberInfor.MemberName" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberInfor.MemberName }">Tên thành viên đầy đủ</label>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input v-model="objMemberInfor.NickName" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.NickName }">Tên thường gọi</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control modal-item" placeholder />
                      <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con Thứ</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <select v-model="objMemberInfor.Male" class="form-select modal-item">
                        <option value="1">Nam</option>
                        <option value="0">Nữ</option>
                      </select>
                      <label class="form-label" for="select">Giới Tính</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <select v-model="objMemberInfor.BloodType" id="bloodtype" class="form-select modal-item">
                        <option :value="null">Chọn Nhóm Máu</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                      </select>
                      <label class="form-label-number" for="select">Nhóm Máu</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <select v-model="objMemberInfor.NationalityID" class="form-select modal-item">
                        <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">{{nation.NationalityName}}</option>
                      </select>
                      <label class="form-label" for="select">Quốc Tịch</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <select v-model="objMemberInfor.ReligionID" class="form-select modal-item">
                        <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">{{religion.ReligionName}}</option>
                      </select>
                      <label class="form-label-number" for="select">Tôn Giáo</label>
                    </div>
                  </div>
                  <div style="position: relative; margin-right:10px">
                    <input v-model="objMemberInfor.Origin" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberInfor.Origin }">Nguyên Quán</label>
                  </div>
                  <div class="form-group">
                    <h6 style="margin-bottom:20px">Ngày Sinh (Hệ thống sẽ tự đổi từ ngày dương lịch sang âm lịch và ngược lại)</h6>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input v-model="objMemberInfor.Dob" type="date" class="form-control modal-item" placeholder @change="convertSolarToLunar()" />
                        <label class="form-label" for="input">Dương Lịch</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input v-model="objMemberInfor.LunarDob" type="date" class="form-control modal-item" placeholder @change="convertLunarToSolar()" />
                        <label class="form-label-number" min="0" for="input">Âm lịch</label>
                      </div>
                    </div>
                  </div>
                  <div style="position: relative; margin-right:10px">
                    <input v-model="objMemberInfor.BirthPlace" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberInfor.BirthPlace }">Nơi sinh</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input v-model="IsDead" type="checkbox" class="form-check-input" id="lostCheckbox" />
                    <label style="font-size: 14px; margin-top: 7px;" class="form-check-label" for="lostCheckbox">Đã mất</label>
                  </div>
                  <div class="form-group" v-if="IsDead == 1">
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
            <div class="col-9" style="padding-top: 15px" v-else-if="extendedContact ">
              <div class="row">
                <div style="position: relative;padding-right: 23px;">
                  <input v-model="objMemberContact.Address" type="text" class="form-control modal-item" placeholder />
                  <label style="left: 25px;" class="form-label" for="input" :class="{ 'active': objMemberContact.Address }">Địa chỉ</label>
                </div>
                <div style="display:flex">
                  <div style="position: relative; width: 50%;margin-right: 10px;">
                    <input v-model="objMemberContact.Phone1" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberContact.Phone1 }">Điện Thoại 1</label>
                  </div>
                  <div style="position: relative;width: 50%; margin-right: 10px;">
                    <input v-model="objMemberContact.Phone2" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" min="0" for="input" :class="{ 'active': objMemberContact.Phone2 }">Điện Thoại 2</label>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="position: relative; width: 50%;margin-right: 10px;">
                    <input v-model="objMemberContact.Email1" type="email" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberContact.Email1 }">Email 1</label>
                  </div>
                  <div style="position: relative;width: 50%; margin-right: 10px;">
                    <input v-model="objMemberContact.Email2" type="email" class="form-control modal-item" placeholder />
                    <label class="form-label-number" min="0" for="input" :class="{ 'active': objMemberContact.Email2 }">Email 2</label>
                  </div>
                </div>
                <div style="position: relative; padding-right: 23px;">
                  <input v-model="objMemberContact.FacebookUrl" type="text" class="form-control modal-item" placeholder />
                  <label style="left: 25px;" class="form-label" for="input" :class="{ 'active': objMemberContact.FacebookUrl }">Facebook</label>
                </div>
                <div style="position: relative; padding-right: 23px;">
                  <input v-model="objMemberContact.Zalo" type="text" class="form-control modal-item" placeholder />
                  <label style="left: 25px;" class="form-label" for="input" :class="{ 'active': objMemberContact.Zalo }">Zalo</label>
                </div>
              </div>
            </div>
            <div class="col-9" style="padding-top: 15px" v-else-if="extendedJob">
              <div class="row">
                <div style="display:flex">
                  <div style="position: relative; width: 50%; margin-right: 10px;">
                    <input v-model="objMemberJob.Organization" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberJob.Organization }">Tên Cơ Quan</label>
                  </div>
                  <div style="position: relative;width: 50%; margin-right: 10px;">
                    <input v-model="objMemberJob.OrganizationAddress" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" min="0" for="input" :class="{ 'active': objMemberJob.OrganizationAddress }">Địa Chỉ</label>
                  </div>
                </div>
                <div style="display:flex">
                  <div style="position: relative; width: 50%;margin-right: 10px;">
                    <input v-model="objMemberJob.Role" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label" for="input" :class="{ 'active': objMemberJob.Role }">Vị trí công tác</label>
                  </div>
                  <div style="position: relative;width: 50%; margin-right: 10px;">
                    <input v-model="objMemberJob.JobName" type="text" class="form-control modal-item" placeholder />
                    <label class="form-label-number" min="0" for="input" :class="{ 'active': objMemberJob.JobName }">nghề nghiệp</label>
                  </div>
                </div>
                <div class="form-group">
                  <h6 style="margin-bottom:20px">Thời gian công tác</h6>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input v-model="objMemberJob.StartDate" type="date" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Từ ngày</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberJob.EndDate" type="date" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input">Đến ngày</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <div class="form-group" role="group">
                    <button type="button" class="btn btn-primary" @click="addNewJobMember()" style="margin-right:10px">Thêm</button>
                    <button type="button" class="btn btn-info mr-1" @click="updateJobMember()" style="margin-right:10px">Sửa</button>
                    <button type="button" class="btn btn-danger mr-1" @click="removeJobMember()" style="margin-right:10px">Xóa</button>
                  </div>
                </div>
                <div class="form-group" style="margin-top:13px;padding-right:22px">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Tên cơ quan</th>
                        <th scope="col">Vị trí</th>
                        <th scope="col">Từ ngày</th>
                        <th scope="col">Đến ngày</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="job in ListMemberJob" :key="job.id" @click="selectRowJob(job)" :class="{ 'row-selected': job === objMemberJob }">
                        <td>{{job.Organization}}</td>
                        <td>{{job.Role}}</td>
                        <td>{{formatDate(job.StartDate)}}</td>
                        <td>{{formatDate(job.EndDate)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-9" style="padding-top: 15px" v-else-if="extendedEdu">
              <div class="row">
                <div style="position: relative;padding-right: 20px;">
                  <input v-model="objMemberEducation.School" type="text" class="form-control modal-item" placeholder />
                  <label style="left: 20px;" class="form-label" for="input" :class="{ 'active': objMemberEducation.School }">Tên trường</label>
                </div>
                <div style="position: relative;padding-right: 20px;">
                  <input v-model="objMemberEducation.Description" type="text" class="form-control modal-item" placeholder />
                  <label style="left: 20px;" class="form-label" for="input" :class="{ 'active': objMemberEducation.Description }">Mô tả</label>
                </div>
                <div class="form-group">
                  <h6 style="margin-bottom:20px">Thời gian học tập</h6>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input v-model="objMemberEducation.StartDate" type="date" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input">Từ ngày</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberEducation.EndDate" type="date" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input">Đến ngày</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-end">
                  <div class="form-group" role="group">
                    <button type="button" class="btn btn-primary" @click="addNewEducationMember()" style="margin-right:10px">Thêm</button>
                    <button type="button" class="btn btn-info mr-1" @click="updateEducationMember()" style="margin-right:10px">Sửa</button>
                    <button type="button" class="btn btn-danger mr-1" @click="deleteJobMember()" style="margin-right:10px">Xóa</button>
                  </div>
                </div>
                <div class="form-group" style="margin-top:13px;padding-right:22px">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Tên trường</th>
                        <th scope="col">Từ ngày</th>
                        <th scope="col">Đến ngày</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="edu in ListMemberEducation" :key="edu.id" @click="selectRowEducation(edu)" :class="{ 'row-selected': edu === objMemberEducation }">
                        <td>{{edu.School}}</td>
                        <td>{{formatDate(edu.StartDate)}}</td>
                        <td>{{formatDate(edu.EndDate)}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-9" style="padding-top: 15px" v-else>
              <div class="form-group" style="margin-top:13px;padding-right:22px">
                <textarea v-model="objMemberInfor.Note" style="height:300px" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder="Ghi Chú"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer" style="background-color:#E8C77B">
          <div class="d-flex justify-content-end">
            <button v-if="isAddChildren" type="button" class="btn btn-primary mr-2" @click="addNewChildrenMember()">Thêm</button>
            <button v-else-if="isAddMarried" type="button" class="btn btn-primary mr-2" @click="addNewMarriedMember()">Thêm</button>
            <button v-else-if="isAddParent" type="button" class="btn btn-primary mr-2" @click="getCurrentParentMember()">Thêm</button>
            <button v-if="isEdit" type="button" class="btn btn-primary mr-2" @click="updateInformation()">Sửa</button>
            <button style="margin-left:10px" type="button" class="btn btn-secondary" @click="closeSelectModal()">Cancel</button>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import Snackbar from "awesome-snackbar";
import FamilyTree from "@balkangraph/familytree.js";
import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
import { LunarDate, SolarDate } from "vietnamese-lunar-calendar";
export default {
  data() {
    return {
      avatarSrc: null,
      JobIDToUpdate: null,
      EducationIdToUpdate: null,
      ListAgeGroup: null,
      ListBloodTypeGroup: null,
      ListUnspecifiedMembers: null,

      selectAge: null,
      selectBloodType: null,
      selectAdress: null,

      listFilterMember: null,

      isAddChildren: false,
      isAddMarried: false,
      isAddParent: false,
      checkAll: false,

      newIdMember: null,
      CurrentIdMember: null,
      generationMember: null,
      CodeID: 123456,
      idPaternalAncestor: null,
      IsDead: 0,

      ListMemberJob: null,
      ListMemberEducation: null,

      objMemberInfor: {
        MemberID: 0,
        ParentID: null,
        MarriageID: null,
        MemberName: null,
        NickName: null,
        HasNickName: null,
        BirthOrder: 0,
        Origin: null,
        NationalityID: 1,
        ReligionID: 1,
        Dob: null,
        LunarDob: null,
        BirthPlace: null,
        IsDead: 0,
        Dod: null,
        PlaceOfDeadth: null,
        GraveSite: null,
        Note: null,
        Generation: 0,
        BloodType: null,
        CodeID: null,
        Male: 1,
      },
      objMemberContact: {
        ContactID: 0,
        MemberID: 0,
        Address: null,
        Phone1: null,
        Phone2: null,
        Email1: null,
        Email2: null,
        FacebookUrl: null,
        Zalo: null,
      },
      objMemberJob: {
        JobID: 0,
        MemberID: 0,
        Organization: null,
        OrganizationAddress: null,
        Role: null,
        JobName: null,
        StartDate: null,
        EndDate: null,
      },
      objMemberEducation: {
        EducationID: 0,
        MemberID: 0,
        School: null,
        Description: null,
        StartDate: null,
        EndDate: null,
      },
      objMember: {},
      TitleModal: null,
      isEdit: false,
      ListNationality: null,
      ListReligion: null,
      nodes: [],

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

      expandAddRelaionship: false,
    };
  },
  methods: {
    mytree: function (domEl, x) {
      FamilyTree.templates.tommy_male.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">Giới Tính: Nam</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_male.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">Ngày Mất: {val}</text>';
      FamilyTree.templates.tommy_male.field_4 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">Đời: {val}</text>';
      FamilyTree.templates.tommy_female.field_0 =
        '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_female.field_1 =
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">Giới Tính: Nữ</text>';
      FamilyTree.templates.tommy_female.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_female.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">Ngày Mất: {val}</text>';
      FamilyTree.templates.tommy_female.field_4 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">Đời: {val}</text>';
      this.family = new FamilyTree(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: "gender",
          field_2: "dob",
          field_3: "dod",
          field_4: "generation",
        },

        lazyLoading: false,
        nodeMouseClick: FamilyTree.action.none,
        enableSearch: false,
      });
      this.family.onInit(() => {
        this.family.setViewBox("-30,-30,1939,1638");
      });

      //Get tọa độ ban đầu
      let CoordinatesNode = this.getViewBox();
      this.family.onRedraw(() => {
        if (CoordinatesNode != null) {
          this.family.setViewBox(CoordinatesNode);
        }
      });
      // right click
      const self = this;
      this.family.onInit(function () {
        this.element.addEventListener(
          "contextmenu",
          function (ev) {
            let nodeElement = ev.target;
            if (nodeElement.hasAttribute("data-n-id") == false) {
              nodeElement = nodeElement.parentNode;
            }
            if (nodeElement && nodeElement.hasAttribute("data-n-id")) {
              let id = nodeElement.getAttribute("data-n-id");
              self.OnpenModal_SelectOption(id);
            }
          },
          false
        );
      });
      this.family.onNodeClick((arg) => {
        this.getInforMember(arg.node.id);
      });
    },
    getViewBox() {
      return this.family.getViewBox();
    },
    setPaternalAncestor() {
      HTTP.post("setRole", {
        memberId: this.CurrentIdMember,
        roleId: 1,
        CodeId: this.CodeID,
      }).then(() => {
        this.getListAfterSetPaternalAncestor(this.CurrentIdMember);
        this.getListUnspecifiedMembers();
        this.NotificationsScuccess("Set tổ phụ thành công");
      });
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    takeDataMember() {
      this.CurrentIdMember = this.objMemberInfor.MemberID;
      this.generationMember = this.objMemberInfor.Generation;
      this.IsDead = this.objMemberInfor.IsDead;
    },
    updateAvatar(event) {
      const file = event.target.files[0];

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarSrc = e.target.result; // Cập nhật ảnh avatar bằng ảnh tải lên
        };
        reader.readAsDataURL(file);
      } else {
        // Xử lý khi không có tệp tải lên
        this.avatarSrc = null; // Có thể thay thế b
      }
    },
    convertLunarToSolar() {
      let LunarDob = new Date(this.objMemberInfor.LunarDob);
      this.objMemberInfor.Dob = new SolarDate(LunarDob).toString();
      console.log(this.objMemberInfor.LunarDob);
      console.log(this.objMemberInfor.Dob);
    },
    convertSolarToLunar() {
      let Dob = new Date(this.objMemberInfor.Dob);
      this.objMemberInfor.LunarDob = new LunarDate(Dob).toString();
      console.log(this.objMemberInfor.LunarDob);
      console.log(this.objMemberInfor.Dob);
    },
    getInforMember(id) {
      HTTP.get("InforMember", {
        params: {
          memberId: id,
        },
      })
        .then((response) => {
          this.objMember = response.data;

          if (this.objMember.infor.length > 0) {
            this.objMemberInfor = this.objMember.infor[0];
            this.takeDataMember(this.CurrentIdMember);
            this.objMemberInfor.Dob = this.formatDate(this.objMemberInfor.Dob);
            this.objMemberInfor.LunarDob = this.formatDate(
              this.objMemberInfor.LunarDob
            );
            this.objMemberInfor.Dod = this.formatDate(this.objMemberInfor.Dod);
          }
          if (this.objMember.contact.length > 0) {
            this.objMemberContact = this.objMember.contact[0];
          }
          this.ListMemberEducation = this.objMember.education;
          this.ListMemberJob = this.objMember.job;
          this.TitleModal =
            "Thông tin chi tiết của thành viên " +
            this.objMemberInfor.MemberName;
        })
        .catch((e) => {
          console.log(e);
        });

      this.$modal.show("member-modal");
      this.isEdit = true;
      this.selectedInfor();
      this.setDefauValueInModal();
    },
    getListJobMember() {
      HTTP.get("getJob", {
        params: {
          MemberId: this.CurrentIdMember,
        },
      }).then((response) => {
        this.ListMemberJob = response.data;
      });
    },
    refreshInputJobAndEducation() {
      this.objMemberJob = {};
      this.objMemberEducation = {};
    },
    removeJobMember() {
      HTTP.delete("removeJob", {
        params: {
          JobID: this.JobIDToUpdate,
        },
      })
        .then(() => {
          this.getListJobMember();
          this.NotificationsDelete("Xóa thông tin nghề nghiệp thành công");
          this.refreshInputJobAndEducation();
        })
        .catch(() => {
          this.NotificationsDelete("Đã sảy ra lỗi, không thể xóa");
        });
    },
    removeMember() {
      HTTP.delete("deleteContact", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).catch(() => {
        this.NotificationsDelete("Đã sảy ra lỗi, không thể xóa");
      });

      HTTP.delete("RemoveListJob", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });

      HTTP.delete("deleteListEducation", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });

      console.log(this.CurrentIdMember);
      HTTP.delete("member", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).then(() => {
        this.NotificationsDelete("remove success fully");
        this.getListMember();
      });
    },
    addNewJobMember() {
      HTTP.post("addJob", {
        memberId: this.CurrentIdMember,
        Organization: this.objMemberJob.Organization,
        OrganizationAddress: this.objMemberJob.OrganizationAddress,
        Role: this.objMemberJob.Role,
        JobName: this.objMemberJob.JobName,
        StartDate: this.objMemberJob.StartDate,
        EndDate: this.objMemberJob.EndDate,
      })
        .then(() => {
          this.getListJobMember();
          this.NotificationsScuccess("Thêm thông tin nghề nghiệp thành công");
          this.refreshInputJobAndEducation();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListEducationMember() {
      HTTP.get("education", {
        params: {
          memberId: this.CurrentIdMember,
        },
      })
        .then((response) => {
          this.ListMemberEducation = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addNewEducationMember() {
      HTTP.post("addEducation", {
        MemberID: this.CurrentIdMember,
        School: this.objMemberEducation.School,
        Description: this.objMemberEducation.Description,
        StartDate: this.objMemberEducation.StartDate,
        EndDate: this.objMemberEducation.EndDate,
      })
        .then(() => {
          this.getListEducationMember();
          this.NotificationsScuccess("Thêm thông tin giáo dục thành công");
          this.refreshInputJobAndEducation();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addNewParentMember() {
      HTTP.post("member", {
        memberName: this.objMemberInfor.MemberName,
        nickName: this.objMemberInfor.NickName,
        parentID: null,
        marriageID: null,
        hasNickName: null,
        birthOrder: this.objMemberInfor.BirthOrder,
        origin: this.objMemberInfor.Origin,
        nationalityId: this.objMemberInfor.NationalityID,
        religionId: this.objMemberInfor.ReligionID,
        dob: this.objMemberInfor.Dob,
        lunarDob: this.objMemberInfor.Dob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        dod: this.objMemberInfor.Dod,
        placeOfDeath: this.objMemberInfor.PlaceOfDeadth,
        graveSite: this.objMemberInfor.GraveSite,
        note: this.objMemberInfor.Note,
        generation: this.generationMember,
        bloodType: this.objMemberInfor.BloodType,
        male: this.objMemberInfor.Male,
        codeId: this.CodeID,
      }).then((response) => {
        this.newIdMember = response.data.data.memberId;
        HTTP.post("addContact", {
          memberId: this.newIdMember,
          Address: this.objMemberContact.Address,
          Phone1: this.objMemberContact.Phone1,
          Phone2: this.objMemberContact.Phone2,
          Email1: this.objMemberContact.Email1,
          Email2: this.objMemberContact.Email2,
          FacebookUrl: this.objMemberContact.FacebookUrl,
          Zalo: this.objMemberContact.Zalo,
        })
          .then(() => {
            this.NotificationsScuccess("Thêm thành công");
          })
          .catch((e) => {
            console.log(e);
          });
        this.insetParentIdToMember(this.newIdMember);
        this.family.load(this.nodes);
        this.getListMember();
      });
    },
    insetParentIdToMember(id) {
      HTTP.post("InsertParentID", {
        ParentID: id,
        memberID: this.CurrentIdMember,
      }).catch((e) => {
        console.log(e);
      });
    },
    getCurrentParentMember() {
      HTTP.get("getparent", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).then((response) => {
        let data = response.data;
        console.log(data);
        if (data.length > 0) {
          this.NotificationsDelete(
            "Thành viên này đã có cha mẹ. Không thể thêm mới"
          );
        } else {
          this.addNewParentMember();
        }
      });
    },
    addNewMarriedMember() {
      HTTP.post("member", {
        memberName: this.objMemberInfor.MemberName,
        nickName: this.objMemberInfor.NickName,
        parentID: null,
        marriageID: this.CurrentIdMember,
        hasNickName: null,
        birthOrder: this.objMemberInfor.BirthOrder,
        origin: this.objMemberInfor.Origin,
        nationalityId: this.objMemberInfor.NationalityID,
        religionId: this.objMemberInfor.ReligionID,
        dob: this.objMemberInfor.Dob,
        lunarDob: this.objMemberInfor.Dob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        dod: this.objMemberInfor.Dod,
        placeOfDeath: this.objMemberInfor.PlaceOfDeadth,
        graveSite: this.objMemberInfor.GraveSite,
        note: this.objMemberInfor.Note,
        generation: this.generationMember,
        bloodType: this.objMemberInfor.BloodType,
        male: this.objMemberInfor.Male,
        codeId: this.CodeID,
      }).then((response) => {
        this.newIdMember = response.data.data.memberId;
        HTTP.post("InserMarrie", {
          memberID: this.CurrentIdMember,
          marriageID: this.newIdMember,
        }).catch((e) => {
          console.log(e);
        });

        HTTP.post("addContact", {
          memberId: this.newIdMember,
          Address: this.objMemberContact.Address,
          Phone1: this.objMemberContact.Phone1,
          Phone2: this.objMemberContact.Phone2,
          Email1: this.objMemberContact.Email1,
          Email2: this.objMemberContact.Email2,
          FacebookUrl: this.objMemberContact.FacebookUrl,
          Zalo: this.objMemberContact.Zalo,
        })
          .then(() => {
            this.NotificationsScuccess("Thêm thành công");
          })
          .catch((e) => {
            console.log(e);
          });
        this.getListMember();
      });
    },
    async addNewChildrenMember() {
      await HTTP.post("member", {
        memberName: this.objMemberInfor.MemberName,
        nickName: this.objMemberInfor.NickName,
        parentID: this.CurrentIdMember,
        marriageID: null,
        hasNickName: null,
        birthOrder: this.objMemberInfor.BirthOrder,
        origin: this.objMemberInfor.Origin,
        nationalityId: this.objMemberInfor.NationalityID,
        religionId: this.objMemberInfor.ReligionID,
        dob: this.objMemberInfor.Dob,
        lunarDob: this.objMemberInfor.Dob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        dod: this.objMemberInfor.Dod,
        placeOfDeath: this.objMemberInfor.PlaceOfDeadth,
        graveSite: this.objMemberInfor.GraveSite,
        note: this.objMemberInfor.Note,
        generation: this.generationMember,
        bloodType: this.objMemberInfor.BloodType,
        male: this.objMemberInfor.Male,
        codeId: this.CodeID,
      })
        .then((response) => {
          this.newIdMember = response.data.data.memberId;
          HTTP.post("addContact", {
            memberId: this.newIdMember,
            Address: this.objMemberContact.Address,
            Phone1: this.objMemberContact.Phone1,
            Phone2: this.objMemberContact.Phone2,
            Email1: this.objMemberContact.Email1,
            Email2: this.objMemberContact.Email2,
            FacebookUrl: this.objMemberContact.FacebookUrl,
            Zalo: this.objMemberContact.Zalo,
          })
            .then(() => {
              this.NotificationsScuccess("Thêm thành công");
            })
            .catch((e) => {
              console.log(e);
            });
          this.family.load(this.nodes);
          this.getListMember();
        })
        .catch((e) => {
          console.log(e);
        });

      this.closeMemberModal();
    },
    setDefauValueInModal() {
      this.objMemberContact = {};
      this.objMemberInfor = {};
      this.objMemberInfor.Male = 1;
      this.objMemberInfor.BloodType = null;
      this.objMemberInfor.NationalityID = 1;
      this.objMemberInfor.ReligionID = 1;
      this.objMemberJob = {};
      this.ListMemberJob = null;

      this.ListMemberEducation = null;
      this.objMemberEducation = {};
    },
    updateEducationMember() {
      HTTP.put("updateEducation", {
        School: this.objMemberEducation.School,
        Description: this.objMemberEducation.Description,
        StartDate: this.objMemberEducation.StartDate,
        EndDate: this.objMemberEducation.EndDate,
        EducationID: this.EducationIdToUpdate,
      }).then(() => {
        this.getListEducationMember();
        this.NotificationsScuccess("Sửa thông tin giáo dục thành công");
        this.refreshInputJobAndEducation();
      });
    },
    updateJobMember() {
      HTTP.put("updateJob", {
        JobID: this.JobIDToUpdate,
        Organization: this.objMemberJob.Organization,
        OrganizationAddress: this.objMemberJob.OrganizationAddress,
        Role: this.objMemberJob.Role,
        JobName: this.objMemberJob.JobName,
        StartDate: this.objMemberJob.StartDate,
        EndDate: this.objMemberJob.EndDate,
      }).then(() => {
        this.getListJobMember();
        this.NotificationsScuccess("Sửa thông tin nghề nghiệp thành công");
        this.refreshInputJobAndEducation();
      });
    },
    updateInformation() {
      HTTP.put("member", {
        memberID: this.CurrentIdMember,
        memberName: this.objMemberInfor.MemberName,
        nickName: this.objMemberInfor.NickName,
        parentID: this.objMemberInfor.ParentID,
        marriageID: this.objMemberInfor.MarriageID,
        hasNickName: this.objMemberInfor.HasNickName,
        birthOrder: this.objMemberInfor.BirthOrder,
        origin: this.objMemberInfor.Origin,
        nationalityId: this.objMemberInfor.NationalityID,
        religionId: this.objMemberInfor.ReligionID,
        dob: this.objMemberInfor.Dob,
        lunarDob: this.objMemberInfor.LunarDob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.objMemberInfor.IsDead,
        dod: this.objMemberInfor.Dod,
        placeOfDeath: this.objMemberInfor.PlaceOfDeadth,
        graveSite: this.objMemberInfor.GraveSite,
        note: this.objMemberInfor.Note,
        generation: this.objMemberInfor.Generation,
        bloodType: this.objMemberInfor.BloodType,
        male: this.objMemberInfor.Male,
        codeId: this.objMemberInfor.CodeID,
      })
        .then(() => {
          this.NotificationsScuccess("Sửa thông tin thành viên thành công");
        })
        .catch((e) => {
          console.log(e);
        });
      HTTP.put("updateContact", {
        MemberID: this.CurrentIdMember,
        Address: this.objMemberContact.Address,
        Phone1: this.objMemberContact.Phone1,
        Phone2: this.objMemberContact.Phone2,
        Email1: this.objMemberContact.Email1,
        Email2: this.objMemberContact.Email2,
        FacebookUrl: this.objMemberContact.FacebookUrl,
        Zalo: this.objMemberContact.Zalo,
      }).then(() => {
        this.NotificationsScuccess("Sửa thông tin thành công");
        this.closeMemberModal();
      });
    },
    setDefaultCondition() {
      this.isAddChildren = false;
      this.isAddMarried = false;
      this.isAddParent = false;
      this.isEdit = false;
    },
    async openMemberModal(action) {
      await this.setDefaultCondition();
      if (action == "children") {
        this.TitleModal = "Thêm Con";
        this.isAddChildren = true;
        this.setDefauValueInModal();
      } else if (action == "married") {
        this.TitleModal = "Thêm Vợ - Chồng";
        this.isAddMarried = true;
        this.setDefauValueInModal();
      } else if (action == "parent") {
        this.TitleModal = "Thêm Cha - mẹ";
        this.isAddParent = true;
        this.setDefauValueInModal();
      }
      this.selectedInfor();
      this.$modal.show("member-modal");
    },
    closeMemberModal() {
      this.$modal.hide("member-modal");
    },
    OnpenModal_SelectOption(id) {
      this.highLightSelectNode(id);
      this.$modal.show("Select-option-Modal");
      this.CurrentIdMember = id;
    },
    closeSelectModal() {
      this.$modal.hide("Select-option-Modal");
    },
    selectRowJob(job) {
      this.JobIDToUpdate = job.JobID;
      this.objMemberJob = job;
      this.objMemberJob.StartDate = this.formatDate(
        this.objMemberJob.StartDate
      );
      this.objMemberJob.EndDate = this.formatDate(this.objMemberJob.EndDate);
    },
    selectRowEducation(education) {
      this.EducationIdToUpdate = education.EducationID;
      this.objMemberEducation = education;
      this.objMemberEducation.StartDate = this.formatDate(
        this.objMemberEducation.StartDate
      );
      this.objMemberEducation.EndDate = this.formatDate(
        this.objMemberEducation.EndDate
      );
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
    GetListFilterMember() {
      HTTP.post("filter-member", {
        CodeID: this.CodeID,
        BloodType: this.selectBloodType,
        selectAge: this.selectAge,
        // Address: "hòa bình"
      })
        .then((response) => {
          this.listFilterMember = response.data.data;
          console.log(this.listFilterMember);
          this.highLightNode();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    highLightSelectNode(SelectNode) {
      // Xóa tất cả các tag "choose" và "notchoose" trên tất cả các nút
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].tags = this.nodes[i].tags.filter(
          (tag) => tag !== "choose" && tag !== "notchoose"
        );
      }

      // Tìm nút được chọn và gán tag "choose" hoặc "notchoose" tương ứng
      const selectedNode = this.nodes.find((node) => node.id == SelectNode);
      if (selectedNode) {
        selectedNode.tags.push("choose");
      } else {
        console.error("Nút không tồn tại:", SelectNode);
      }

      // Cập nhật giao diện
      this.family.load(this.nodes);
    },
    highLightNode() {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].tags = this.nodes[i].tags.filter(
          (tag) => tag !== "choose" && tag !== "notchoose"
        );
      }

      let memberIds = this.listFilterMember.map((item) => item.MemberID);
      if (this.selectBloodType != null || this.selectAge != null)
        this.nodes.forEach((node) => {
          if (memberIds.includes(node.id)) {
            node.tags.push("choose");
          } else {
            node.tags.push("notchoose");
          }
        });

      this.family.load(this.nodes);
    },
    getListAfterSetPaternalAncestor(id) {
      HTTP.get("viewTree", {
        params: {
          memberID: id,
        },
      })
        .then((response) => {
          this.nodes = response.data;
          for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].tags = [];
          }

          this.mytree(this.$refs.tree, this.nodes);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    GetIdPaternalAncestor() {
      HTTP.get("idPaternal", {
        params: {
          CodeId: this.CodeID,
        },
      }).then((response) => {
        this.getListMember(response.data.MemberID);
      });
    },
    async getListUnspecifiedMembers() {
      HTTP.get("unspecified-members", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          this.ListUnspecifiedMembers = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openNotiModal() {
      this.$modal.show("noti-modal");
    },
    closeNotiModal() {
      this.$modal.hide("noti-modal");
    },
    getListMember(idPaternalAncestor) {
      if (idPaternalAncestor != null) {
        this.idPaternalAncestor = idPaternalAncestor;
      }
      HTTP.get("viewTree", {
        params: {
          memberID: this.idPaternalAncestor,
        },
      })
        .then((response) => {
          this.nodes = response.data;
          console.log(this.nodes);
          for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].tags = [];
          }
          this.nodes[0].tags.push("great-grandfather");
          this.mytree(this.$refs.tree, this.nodes);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListAgeGroup() {
      HTTP.get("agegroup")
        .then((response) => {
          this.ListAgeGroup = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getListBloodTypeGroup() {
      HTTP.get("bloodtype")
        .then((response) => {
          this.ListBloodTypeGroup = response.data;
        })
        .catch((err) => {
          console.log(err);
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
      this.objMemberEducation = {};
      this.extendedInfo = false;
      this.extendedContact = false;
      this.extendedEdu = true;
      this.extendedJob = false;
      this.extendedNote = false;
    },
    selectedJob() {
      this.objMemberJob = {};
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
    this.GetIdPaternalAncestor();
    this.getListNationality();
    this.getListReligion();
    this.getListAgeGroup();
    this.getListBloodTypeGroup();
    this.getListUnspecifiedMembers();
  },
};
</script>
 
<style>
@import "../assets/css/familytree.css";
.row-selected {
  --bs-table-bg: #f0f0f0;
}
</style>
