<template>
  <div class="d-flex h-100 w-100 position-relative">
    <div class="list d-flex flex-column align-items-center">
      <div class="w-100 d-flex flex-row">
        <div class="col-6 px-2" style="padding-top: 8px;">
          <select v-model="selectCity" class="d-flex text-center form-select dropdown p-0" @change="getListDistrict()">
            <option :value="null" selected>Tỉnh/Thành phố</option>
            <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <div class="col-6 px-2" style="padding-top: 8px;">
          <select v-model="selectDistrict" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option :value="null" selected>Quận/Huyện</option>
            <option v-for="d in ListDistrict" :key="d.id" :value="d.DistrictName">{{ d.DistrictName }}</option>
          </select>
        </div>
      </div>
      <div class="w-100 d-flex flex-row">
        <div class="col-6 px-2" style="padding-top: 8px;">
          <select v-model="selectBloodType" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option v-for="blood in ListBloodTypeGroup" :key="blood.id" class="dropdown-item" :value="blood.id">{{ blood.BloodType }}</option>
          </select>
        </div>
        <div class="col-6 px-2" style="padding-top: 8px;">
          <select class="d-flex text-center form-select dropdown p-0" v-model="selectAge" @change="GetListFilterMember()">
            <option class="dropdown-item" :value="null">Nhóm Tuổi</option>
            <option v-for="age in ListAgeGroup" :key="age.id" class="dropdown-item" :value="age.id">{{ age.From }} - {{ age.End }} Tuổi</option>
          </select>
        </div>
      </div>
      <div class="w-100 d-flex flex-row" style="padding-top: 8px">
        <div class="col-6 px-2">
          <div class="w-100">
            <button @click="openNotiModal()" style="width:100%" type="button" class="btn btn-secondary">Tạo thông báo</button>
          </div>
        </div>
        <div class="col-6 px-2">
          <div class="w-100">
            <button @click="openCompareModal()" style="width:100%" type="button" :class="{ 'btn': true, 'btn-secondary': !isCompare, 'btn-primary': isCompare }">So sánh</button>
          </div>
        </div>
      </div>
      <div class="h-100 w-100 d-flex flex-column px-2" style="padding-top: 8px; font-family: 'QuicksandBold', sans-serif;">
        <div class="existing-members d-flex flex-column w-100">
          <div class="d-flex align-items-center justify-content-center px-2 py-1 list-title">Thành viên có trên phả đồ</div>
          <div class="d-flex flex-column w-100" style="overflow-y: auto;cursor: pointer">
            <div v-for="(n, index) in nodes" :key="n.id">
              <div @click="handleLeftClick(n.id)" @contextmenu.prevent="handleRightClick(n.id)" :class="{ 'list-item': true, 'selected-list': n.id == CurrentIdMember, 'ancestor-member': index === 0 }">{{ n.name }}</div>
            </div>
          </div>
        </div>
        <div class="d-flex nonexisting-members flex-column w-100" style="margin-top: 4px">
          <div class="d-flex flex-row px-2 py-1 list-title">
            <div class="d-flex align-items-center justify-content-center">Thành viên không có trên phả đồ</div>
            <div class="d-flex align-items-center justify-content-center" style="padding-left: 12px;cursor:pointer" @click="openMemberModal('AddNormal', ' thành viên không có trên phả đồ')">
              <svg class="add-member-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </div>
          </div>
          <div v-if="ListUnspecifiedMembers" class="d-flex flex-column w-100" style="overflow-y: auto;auto;cursor: pointer">
            <div v-for="list in ListUnspecifiedMembers" :key="list.id" @click="handleLeftClickUnspecifiedMembers(list.MemberID)" class="list-item">{{ list.MemberName }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex main-screen align-items-center w-100 positon-relative">
      <div id="tree" ref="tree"></div>
      <div :class="{ filterExpanded: advancedFilterDown }" class="advanced-filter-container d-flex flex-column p-1 position-absolute">
        <div v-if="advancedFilterDown" class="px-2" style="padding-top: 8px;">
          <select v-model="selectCity" class="d-flex text-center form-select dropdown p-0" @change="getListDistrict()">
            <option :value="null" selected>Tỉnh/Thành phố</option>
            <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
          </select>
        </div>
        <div v-if="advancedFilterDown" class="px-2" style="padding-top: 8px;">
          <select v-model="selectDistrict" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option :value="null" selected>Quận/Huyện</option>
            <option v-for="d in ListDistrict" :key="d.id" :value="d.DistrictName">{{ d.DistrictName }}</option>
          </select>
        </div>
        <div v-if="advancedFilterDown" class="px-2" style="padding-top: 8px;">
          <select v-model="selectBloodType" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option v-for="blood in ListBloodTypeGroup" :key="blood.id" class="dropdown-item" :value="blood.id">{{ blood.BloodType }}</option>
          </select>
        </div>
        <div v-if="advancedFilterDown" class="px-2" style="padding-top: 8px;">
          <select class="d-flex text-center form-select dropdown p-0" v-model="selectAge" @change="GetListFilterMember()">
            <option class="dropdown-item" :value="null">Nhóm Tuổi</option>
            <option v-for="age in ListAgeGroup" :key="age.id" class="dropdown-item" :value="age.id">{{ age.From }} - {{ age.End }} Tuổi</option>
          </select>
        </div>
        <div @click="advancedFilterDown = !advancedFilterDown" class="p-2 d-flex align-items-center justify-content-center" style="height: 48px; cursor: pointer;">
          <div>
            <svg :class="{ rotateDown: advancedFilterDown }" class="advanced-filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div class="Container-select-modal">
      <modal name="Select-option-Modal">
        <div class="card" style="width: 370px;left:45%">
          <div class="card-header modal-title text-center d-flex justify-content-center align-items-center">
            <h5 class="m-0">{{ TitleModal }}</h5>
            <div class="close-add-form" @click="closeSelectModal()" style="top: 8px;right:5px">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="card-body" style="padding: 5px;height:auto">
            <div class="list-group">
              <div class="list-group-item feature-overview">Các chức năng chính</div>
              <div class="list-group-item" @click="getInforMember(CurrentIdMember)">Thông tin chi tiết</div>
              <div class="list-group-item" @click="openModalRelationship()">Xem các mối quan hệ</div>
              <div v-if="canAddFather" class="list-group-item" @click="openMemberModal('AddParent', 'Cha')">Thêm Cha</div>
              <div v-if="canAddMother" class="list-group-item" @click="openMemberModal('AddParent', 'Mẹ')">Thêm Mẹ</div>
              <div v-if="canAddhusband" class="list-group-item" @click="openMemberModal('AddMarriage', 'Chồng')">Thêm Chồng</div>
              <div v-if="canAddWife" class="list-group-item" @click="openMemberModal('AddMarriage', 'Vợ')">Thêm Vợ</div>
              <div class="list-group-item" @click="openMemberModal('AddChild', 'Con')">Thêm Con</div>
              <div class="list-group-item" @click="openModalAddMemberFromList()">Thêm mối quan hệ từ Danh Sách</div>
              <div class="list-group-item" @click="openCfDelModal(false,null,TitleModal)">Xóa thành viên (*)</div>
              <div class="list-group-item feature-overview">Các chức năng Khác</div>
              <div class="list-group-item" style="border-top: none;" @click="setPaternalAncestor(2)">Set làm tộc trưởng</div>
              <div class="list-group-item" @click="setPaternalAncestor(1)">Set làm tổ phụ</div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Modal raletionship -->
    <div class="modal-relationship">
      <modal name="modal-relationship">
        <div class="form-group h-100">
          <div class="w-100 h-100 add-article-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Các mối quan hệ của</div>
              <div class="close-add-form" @click="closeModalRelationship()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column" style="height: calc(100% - 50px);">
              <div class="d-flex flex-row">
                <div class="col-md-4 m-2">
                  <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên..." />
                </div>
              </div>
              <div class="d-flex flex-column headlist-list-container w-100">
                <table class="table table-member headlist-list m-0">
                  <thead>
                    <tr class="headlist-item">
                      <th class="headlist-list-th" scope="col">Họ và Tên</th>
                      <th class="headlist-list-th" scope="col">Giới tính</th>
                      <th class="headlist-list-th" scope="col">Ngày sinh</th>
                      <th class="headlist-list-th" scope="col">Mối quan hệ</th>
                      <th class="headlist-list-th" scope="col"></th>
                    </tr>
                  </thead>
                  <tbody v-if="ResultRelationship">
                    <tr v-if="ResultRelationship.Father" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Father.MemberID)">
                      <td style="text-align: center;">{{ ResultRelationship.Father.MemberName }}</td>
                      <td style="text-align: center;">{{ ResultRelationship.Father.Male == 1 ? "Nam" : "Nữ" }}</td>
                      <td style="text-align: center;">{{ formatDate(ResultRelationship.Father.Dob) }}</td>
                      <td style="text-align: center;">Cha</td>
                      <td style="text-align: center;">
                        <button class="btn btn-secondary" @click.stop="openCfDelModal(true,ResultRelationship.Father.MemberID,ResultRelationship.Father.MemberName,'RemoveParent')">Hủy mối quan hệ</button>
                      </td>
                    </tr>
                    <tr v-if="ResultRelationship.Mother" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Mother.MemberID)">
                      <td style="text-align: center;">{{ ResultRelationship.Mother.MemberName }}</td>
                      <td style="text-align: center;">{{ ResultRelationship.Mother.Male == 1 ? "Nam" : "Nữ" }}</td>
                      <td style="text-align: center;">{{ formatDate(ResultRelationship.Mother.Dob) }}</td>
                      <td style="text-align: center;">Mẹ</td>
                      <td style="text-align: center;">
                        <button class="btn btn-secondary" @click.stop="openCfDelModal(true,ResultRelationship.Mother.MemberID,ResultRelationship.Mother.MemberName,'RemoveParent')">Hủy mối quan hệ</button>
                      </td>
                    </tr>
                    <tr v-if="ResultRelationship.Husband" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Husband.MemberID)">
                      <td style="text-align: center;">{{ ResultRelationship.Husband.MemberName }}</td>
                      <td style="text-align: center;">{{ ResultRelationship.Husband.Male == 1 ? "Nam" : "Nữ" }}</td>
                      <td style="text-align: center;">{{ formatDate(ResultRelationship.Husband.Dob) }}</td>
                      <td style="text-align: center;">Chồng</td>
                      <td style="text-align: center;">
                        <button class="btn btn-secondary" @click.stop="openCfDelModal(true,ResultRelationship.Husband.MemberID,ResultRelationship.Husband.MemberName,'RemoveMarried')">Hủy mối quan hệ</button>
                      </td>
                    </tr>
                    <tr v-if="ResultRelationship.Wife" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Wife.MemberID)">
                      <td style="text-align: center;">{{ ResultRelationship.Wife.MemberName }}</td>
                      <td style="text-align: center;">{{ ResultRelationship.Wife.Male == 1 ? "Nam" : "Nữ" }}</td>
                      <td style="text-align: center;">{{ formatDate(ResultRelationship.Wife.Dob) }}</td>
                      <td style="text-align: center;">Vợ</td>
                      <td style="text-align: center;">
                        <button class="btn btn-secondary" @click.stop="openCfDelModal(true,ResultRelationship.Wife.MemberID,ResultRelationship.Wife.MemberName,'RemoveMarried')">Hủy mối quan hệ</button>
                      </td>
                    </tr>
                    <tr v-for="(c,index) in ResultRelationship.child" :key="index" class="headlist-item headlist-table-item" @click="getInforMember(c.MemberID)">
                      <td style="text-align: center;">{{ c.MemberName }}</td>
                      <td style="text-align: center;">{{ c.Male == 1 ? "Nam" : "Nữ" }}</td>
                      <td style="text-align: center;">{{ formatDate(c.Dob) }}</td>
                      <td style="text-align: center;">Con</td>
                      <td style="text-align: center;">
                        <button class="btn btn-secondary" @click.stop="openCfDelModal(true,c.MemberID,c.MemberName,'RemoveChild')">Hủy mối quan hệ</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-footer position-absolute w-100" style="bottom: 0; padding-right: 8px;">
            <div class="compare-modal-btn btn">Cancel</div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Đât là modal thông báo -->
    <modal name="noti-modal">
      <div class="h-100 d-flex flex-column" style="background-color: white;">
        <div class="modal-title d-flex flex-row align-items-center justify-content-center position-relative" style="border-radius:0px">
          <div class="col-9 d-flex align-items-center justify-content-center" style="height:50px">Thông báo tới thành viên</div>
          <div class="close-noti-form position-absolute" @click="closeNotiModal()" style="top: 8px;right:5px">
            <svg class="close-noti-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        </div>
        <div class="d-flex flex-row" style="height: calc(100% - 50px)">
          <div class="col-3 h-100 d-flex flex-column" style="overflow-y: auto">
            <div class="position-relative d-flex" style="height: 48px;">
              <label for="text-search" style="position: absolute; inset: 12px;">
                <svg class="text-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                </svg>
              </label>
              <div class="w-100" style="height: 48px; padding: 8px;">
                <input v-model="searchKeyword" class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" @change="searchMember()" />
              </div>
            </div>
            <div class="position-relative d-flex" style="height: 48px;">
              <div class="d-flex flex-row align-items-center p-2">
                <input v-model="checkAll" type="checkbox" class="form-check-input" @change="toggleSelectAll()" />
                <div style="padding-left: 8px">Chọn tất cả mọi người</div>
              </div>
            </div>
            <div>
              <div v-for="(n, index) in nodes" :key="n.id" :tabindex="index" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{ chosen: ListPhoneToSendMessage.includes(n.id) }" @click="toggleSelection(n.id)">
                <div>
                  <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                  </svg>
                </div>
                <div class="d-flex justify-content-center" style="flex-grow: 1;">{{ n.name }}</div>
              </div>
            </div>
          </div>
          <div class="col-9 h-100 position-relative" style="background: #ebebeb">
            <div class="position-absolute w-100 d-flex flex-column" style="height: calc(100% - 64px); top: 0;">
              <div class="d-flex flex-row" style="height: 48px; background-color: #FFFFFF">
                <div @click="selectSMS()" :class="{ notiSelected: smsSelected }" class="col-6 d-flex align-items-center justify-content-center" style="border-radius: 0 0.375rem 0 0; cursor: pointer;">SMS</div>
                <div @click="selectEmail()" :class="{ notiSelected: emailSelected }" class="col-6 d-flex align-items-center justify-content-center" style="border-radius: 0.375rem 0 0 0; cursor: pointer;">Email</div>
              </div>
              <div v-if="emailSelected" class="d-flex flex-column mt-2" style="height: calc(100% - 48px); overflow-y: auto;">
                <div class="sent-mail d-flex flex-row">
                  <div class="h-100 d-flex align-items-center px-3">
                    <input type="checkbox" class="form-check-input m-0" style="height: 20px; width: 20px;" />
                  </div>
                  <div class="col-4 d-flex align-items-center" style="height: 48px">Người nhận: Tất cả mọi người</div>
                  <div class="d-flex align-items-center" style="flex-grow: 1;">Giỗ cụ tổ</div>
                </div>
                <div class="sent-mail d-flex flex-row">
                  <div class="h-100 d-flex align-items-center px-3">
                    <input type="checkbox" class="form-check-input m-0" style="height: 20px; width: 20px;" />
                  </div>
                  <div class="col-4 d-flex align-items-center" style="height: 48px">Người nhận: Tất cả mọi người</div>
                  <div class="d-flex align-items-center" style="flex-grow: 1;">Giỗ cụ tổ</div>
                </div>
                <div class="sent-mail d-flex flex-row">
                  <div class="h-100 d-flex align-items-center px-3">
                    <input type="checkbox" class="form-check-input m-0" style="height: 20px; width: 20px;" />
                  </div>
                  <div class="col-4 d-flex align-items-center" style="height: 48px">Người nhận: Tất cả mọi người</div>
                  <div class="d-flex align-items-center" style="flex-grow: 1;">Giỗ cụ tổ</div>
                </div>
              </div>

              <div v-if="smsSelected" class="d-flex flex-column" style="height: calc(100% - 48px); align-items: flex-end; padding-top: 6px; overflow-y: auto">
                <div v-for="m in ListMessage" :key="m.id" class="position-relative d-flex flex-row">
                  <div v-if="m.IsSMS == 1" class="position-absolute sent-time">{{ formatDate(m.NotificationDate) }}</div>
                  <div v-if="m.IsSMS == 1" class="sent-sms">{{ m.NotificationContent }}</div>
                </div>
              </div>
            </div>
            <div class="position-absolute w-100" style="bottom: 8px">
              <div v-if="smsSelected" class="w-100 px-3 d-flex flex-row">
                <input type="text" class="form-control" style="height: 48px;" placeholder="..." v-model="contentMessage" />
                <div class="d-flex align-items-center" style="padding-left: 12px; cursor: pointer;" @click="sendMessageToMember()">
                  <svg class="noti-send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                  </svg>
                </div>
              </div>
              <div v-if="emailSelected" class="w-100 btn px-3 position-relative" style="height: 48px;">
                <div @click="expandCreateEmail = !expandCreateEmail" class="btn px-2 py-1 position-absolute" style="right: 16px; background-color: #E8C77B;">Tạo email mới</div>
              </div>
            </div>
            <div class="position-absolute create-mail" :class="{ expanded: expandCreateEmail }">
              <div class="w-100 h-100 d-flex flex-column">
                <div class="create-mail-title d-flex align-items-center justify-content-center position-relative">
                  <div>Email mới</div>
                  <div class="create-mail-close position-absolute" @click="expandCreateEmail = !expandCreateEmail">
                    <div class="position-relative h-100 w-100">
                      <svg class="create-mail-close-icon position-absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="create-mail-topic px-2 w-100">
                  <input type="text" class="mail-topic w-100 p-2" placeholder="Chủ đề email" />
                </div>
                <div class="create-mail-content px-2 w-100">
                  <textarea style="resize: none; outline: none; border: none;" class="h-100 w-100 p-2" placeholder="Viết gì đó..."></textarea>
                </div>
                <div class="create-mail-footer d-flex flex-row px-5 py-2 w-100" style="justify-content: end;">
                  <div style="border-radius: 50% 0 0 50%; background: #007bff; width: 25px;"></div>
                  <div class="btn d-flex align-items-center justify-content-center" style="padding: 4px 12px; background: #007bff; color: #FFFFFF; border-radius: 0">Gửi</div>
                  <div style="border-radius: 0 50% 50% 0; background: #007bff; width: 25px;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <!-- Đât là modal so sánh -->
    <modal name="compare-modal">
      <div class="h-100 d-flex flex-column position-relative">
        <div class="modal-title d-flex flex-row align-items-center justify-content-center">
          <div class="col-12 d-flex align-items-center justify-content-center">So sánh 2 thành viên</div>
          <div class="close-add-form" @click="closeCompareModal()">
            <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
        </div>
        <div class="d-flex flex-row" style="flex-grow: 1; background-color: #FFFFFF;">
          <div class="col-6" style="padding: 0px 4px 48px 8px;">
            <div class="h-100 d-flex flex-column p-2" style="background-color: #FFFFFF; border-radius: 0.375rem;">
              <div class="d-flex flex-row pb-2" style="height: 220px">
                <div class="h-100 col-4" style="background-color: gray; border-radius: 0.375rem;">Ảnh</div>
                <div class="d-flex flex-column" style="flex-grow: 1; padding-left: 8px;">
                  <input type="text" class="compare-modal-item form-control" :value="objCompareMember1.name" disabled />
                  <div class="d-flex flex-row pt-2">
                    <div class="col-6" style="padding-right: 4px">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember1.gender" disabled />
                    </div>
                    <div class="col-6" style="padding-left: 4px">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember1.generation" disabled />
                    </div>
                  </div>
                  <div class="pt-2">
                    <input type="text" class="compare-modal-item form-control" :value="'Ngày Sinh: ' + objCompareMember1.dob" disabled />
                  </div>
                  <div class="pt-2">
                    <input type="text" class="compare-modal-item form-control" value="Ngày mất (Nếu có)" disabled />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column" style="flex-grow: 1; background-color: #f2f2f2;">
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="objCompareMember1.father !== undefined ? objCompareMember1.father + ' (Bố)' : 'Không có trên phả đồ'" disabled />
                </div>
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="objCompareMember1.mother !== undefined ? objCompareMember1.mother + ' (Mẹ)' : 'Không có trên phả đồ'" disabled />
                </div>
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="resultCompare1 !== undefined ? 'Mối quan hệ: ' + resultCompare1 : 'Không xác định'" disabled />
                </div>
              </div>
            </div>
          </div>
          <div class="col-6" style="padding: 0px 8px 48px 4px;">
            <div class="h-100 d-flex flex-column p-2" style="background-color: #FFFFFF; border-radius: 0.375rem;">
              <div class="d-flex flex-row pb-2" style="height: 220px">
                <div class="h-100 col-4" style="background-color: gray; border-radius: 0.375rem;">Ảnh</div>
                <div class="d-flex flex-column" style="flex-grow: 1; padding-left: 8px;">
                  <input type="text" class="compare-modal-item form-control" :value="objCompareMember2.name" disabled />
                  <div class="d-flex flex-row pt-2">
                    <div class="col-6" style="padding-right: 4px">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember2.gender" disabled />
                    </div>
                    <div class="col-6" style="padding-left: 4px">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember2.generation" disabled />
                    </div>
                  </div>
                  <div class="pt-2">
                    <input type="text" class="compare-modal-item form-control" :value="'Ngày Sinh: ' + objCompareMember2.dob" disabled />
                  </div>
                  <div class="pt-2">
                    <input type="text" class="compare-modal-item form-control" value="Ngày mất (Nếu có)" disabled />
                  </div>
                </div>
              </div>
              <div class="d-flex flex-column" style="flex-grow: 1; background-color: #f2f2f2;">
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="objCompareMember2.father !== undefined ? objCompareMember2.father + ' (Bố)' : 'Không có trên phả đồ'" disabled />
                </div>
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="objCompareMember2.mother !== undefined ? objCompareMember2.mother + ' (Mẹ)' : 'Không có trên phả đồ'" disabled />
                </div>
                <div class="compare-modal-item mx-2 mt-2">
                  <input type="text" class="w-100 h-100 form-control" :value="resultCompare2 !== undefined ? 'Mối quan hệ: ' + resultCompare2 : 'Mối quan hệ: Không xác định'" disabled />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div class="compare-modal-btn btn position-absolute">Đổi vị trí trên phả đồ</div>
        </div>
      </div>
    </modal>
    <!-- Đây là modal add mối quan hệ từ danh sách -->
    <div>
      <modal name="add-from-list">
        <div class="w-100 h-100 add-head-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm {{ TitleModal }} Từ Danh Sách</div>
            <div class="close-add-form" @click="closeModalAddMemberFromList()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-column" style="height: calc(100% - 50px)">
            <div class="d-flex flex-row">
              <div class="col-md-4 m-2">
                <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên..." />
              </div>
            </div>
            <div class="d-flex flex-column headlist-list-container w-100">
              <table class="table table-member headlist-list m-0">
                <thead>
                  <tr class="headlist-item">
                    <th class="headlist-list-th">#</th>
                    <th class="headlist-list-th">Họ và Tên</th>
                    <th class="headlist-list-th">Giới tính</th>
                    <th class="headlist-list-th">Ngày sinh</th>
                    <th class="headlist-list-th">Chọn mối quan hệ</th>
                  </tr>
                </thead>
                <tbody style="cursor: pointer">
                  <tr v-for="(m, index) in ListUnspecifiedMembers" :key="m.id" @click="selectMemberFromTable(m, index)" :class="{ 'row-selected': selectedRowIndex === index }">
                    <th style="text-align: center;">{{ index + 1 }}</th>
                    <th>{{ m.MemberName }}</th>
                    <td style="text-align: center;">{{ m.Male === 1 ? 'Nam' : 'Nữ' }}</td>
                    <td style="text-align: center;">{{ formatDate(m.Dob) }}</td>
                    <td class="d-flex justify-content-center">
                      <select v-model="m.relationship" class="form-control" style="text-align: center; width: 150px;">
                        <option selected :value="undefined">Mối quan hệ</option>
                        <option value="AddParent">Cha</option>
                        <option value="AddParent">Mẹ</option>
                        <option value="AddMarriage">Vợ</option>
                        <option value="AddMarriage">Chồng</option>
                        <option value="AddChild">Con</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <div class="d-flex justify-content-end" style="padding-right: 12px;">
                <button type="button" class="btn btn-primary mr-2" @click="addMemberFromList()">Thêm</button>
                <button style="margin-left:10px" type="button" class="btn btn-secondary">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <!-- Đây là modal member-->
    <div class="member-modal-container">
      <modal name="member-modal">
        <div class="card h-100" v-if="objMemberInfor" style="border: none; position: relative;">
          <div class="card-header modal-title text-center p-0 d-flex align-items-center justify-content-center">
            <h5 class="m-0">{{ TitleModal }}</h5>
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
                    <img style="height:316px;width:360px;margin-bottom:20px" v-if="avatarSrc" :src="avatarSrc" alt="Avatar" />
                    <svg v-else style="margin-bottom:36px" fill="#000000" height="300px" width="300px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                      <g>
                        <g>
                          <circle cx="256" cy="114.526" r="114.526" />
                        </g>
                      </g>
                      <g>
                        <g>
                          <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421 c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" />
                        </g>
                      </g>
                    </svg>
                    <div class="form-group">
                      <label style="margin-bottom:10px" v-if="objMemberInfor.Image" for="imageUpload">Thay đổi ảnh</label>
                      <label style="margin-bottom:10px" v-else for="imageUpload">Tải ảnh lên</label>
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
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">{{ nation.NationalityName }}</option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <select v-model="objMemberInfor.ReligionID" class="form-select modal-item">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">{{ religion.ReligionName }}</option>
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
                          <input v-model="objMemberInfor.Dod" type="date" class="form-control modal-item" placeholder />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div style="position: relative;width: 50%; margin-right: 10px;">
                          <input v-model="objMemberInfor.LunarDod" type="date" class="form-control modal-item" placeholder />
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
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <select v-model="selectCityMember" class="form-select modal-item" @change="getListDistrictMember()">
                        <option :value="null" selected>Thành Phố/Tỉnh</option>
                        <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
                      </select>
                      <label class="form-label" for="select">Địa Chỉ (Thành Phố/Tỉnh)</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <select v-model="selectDistrictMember" class="form-select modal-item">
                        <option :value="null" selected>Quận/Huyện</option>
                        <option v-for="d in ListDistrictMember" :key="d.id" :value="d.DistrictName">{{ d.DistrictName }}</option>
                      </select>
                      <label class="form-label" for="select">Địa Chỉ (Quận/Huyện)</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <VuePhoneNumberInput ref="phoneNumberInput" v-model="objMemberContact.Phone" :disabled="isDisabled" :default-country="defaultCountry" :validations="validations"></VuePhoneNumberInput>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberContact.Email" type="email" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberContact.Email }">Email</label>
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
                          <td>{{ job.Organization }}</td>
                          <td>{{ job.Role }}</td>
                          <td>{{ formatDate(job.StartDate) }}</td>
                          <td>{{ formatDate(job.EndDate) }}</td>
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
                          <td>{{ edu.School }}</td>
                          <td>{{ formatDate(edu.StartDate) }}</td>
                          <td>{{ formatDate(edu.EndDate) }}</td>
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
          <div class="card-footer modal-footer position-absolute w-100" style="bottom: 0;">
            <div class="d-flex justify-content-end" style="padding-right: 12px;">
              <button v-if="isAdd" type="button" class="btn btn-primary mr-2" @click="addMember()">Thêm</button>
              <button v-else-if="isEdit" type="button" class="btn btn-primary mr-2" @click="updateInformation()">Sửa</button>
              <button style="margin-left:10px" type="button" class="btn btn-secondary" @click="closeSelectModal()">Cancel</button>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <div class="cfdel-modal-container">
      <modal name="cfdel-modal">
        <div class="w-100 h-100 add-head-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 text-white" style="background-color: rgb(255, 8, 0);;">Quan trọng</div>
            <div class="close-add-form" @click="closeCfDelModal()">
              <svg class="close-add-form-icon" style="fill: #FFFFFF !important;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="w-100 d-flex flex-column align-items-center justify-content-center" style="height: calc(100% - 50px);">
            <div class="d-flex align-items-center" style="height: 50%; font-size: 19px;">{{TitleConfirm}}</div>
            <div class="d-flex flex-row w-100" style="height: 50%;">
              <div v-if="isRemoveRelationship" class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn text-white" @click="removeRelationship()" style="background-color: rgb(255, 8, 0);">Có</div>
              </div>
              <div v-else class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn bg-danger text-white" @click="removeMember()">Có</div>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn bg-primary text-white" @click="closeCfDelModal()">Không</div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Snackbar from "awesome-snackbar";
import FamilyTree from "@balkangraph/familytree.js";
import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
import { LunarDate } from "vietnamese-lunar-calendar";
import { convertLunar2Solar } from "vietnamese-lunar-calendar/build/solar-lunar";
import { getLocalTimezone } from "vietnamese-lunar-calendar/build/solar-lunar/utils";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      phoneNumber: "",
      isDisabled: false,
      defaultCountry: "VN",
      validations: {
        required: true,
      },
      ResultRelationship: null,
      ListCity: null,
      ListDistrict: null,
      ListDistrictMember: null,
      ListMessage: null,
      contentMessage: null,
      ListPhoneToSendMessage: [],
      searchKeyword: null,
      avatarSrc: null,
      JobIDToUpdate: null,
      EducationIdToUpdate: null,
      ListAgeGroup: null,
      ListBloodTypeGroup: null,
      ListUnspecifiedMembers: null,

      selectAge: null,
      selectBloodType: null,
      selectAdress: null,
      selectCity: null,
      selectCityMember: null,
      selectDistrict: null,
      selectDistrictMember: null,
      listFilterMember: null,

      action: null,
      isAdd: false,
      isEdit: false,
      checkAll: false,
      newIdMember: null,
      CurrentIdMember: null,

      isRemoveRelationship: false,
      TitleConfirm: null,

      generationMember: null,
      CodeID: null,
      idPaternalAncestor: null,
      IsDead: 0,
      ListMemberJob: null,
      ListMemberEducation: null,

      darkMode: true,

      objMemberInfor: {
        MemberID: 0,
        ParentID: null,
        MarriageID: null,
        MemberName: null,
        NickName: null,
        BirthOrder: 1,
        Origin: null,
        NationalityID: 1,
        ReligionID: 1,
        Dob: null,
        LunarDob: null,
        BirthPlace: null,
        IsDead: 0,
        Dod: null,
        LunarDod: null,
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
        Phone: null,
        Email: null,
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
      ListNationality: null,
      ListReligion: null,
      nodes: [],
      formData: null,

      extendedInfo: true,
      extendedContact: false,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,

      canAddFather: true,
      canAddMother: true,
      canAddhusband: true,
      canAddWife: true,

      lastClickedNodeId: null,
      isCompare: false,
      objCompareMember1: {},
      objCompareMember2: {},
      displayList: false,
      expandAddRelationship: false,
      emailSelected: false,
      smsSelected: true,
      expandCreateEmail: false,
      advancedFilterDown: false,
      selectNodeHighLight: [],
      resultCompare1: null,
      resultCompare2: null,
      selectedRowIndex: null,
      UrlAvatar: null,
      imagePath:
        "/uploads/images/member-photo/726235fb96dc3db0ce8e76a4c9afe1.jpeg",
    };
  },
  methods: {
    mytree: function (domEl, x) {
      FamilyTree.templates.tommy_male.img_0 =
        '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="10" y="20" width="70" height="70"></image>';
      FamilyTree.templates.tommy_female.img_0 =
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="10" y="20" width="70" height="70"></image>';

      FamilyTree.templates.tommy_male.field_0 =
        '<text class="field_0" style="font-size: 16px;" fill="#ffffff" x="90" y="30">{val}</text>';
      FamilyTree.templates.tommy_male.field_1 =
        '<text class="field_1" style="font-size: 12px;" fill="#ffffff" x="90" y="50">Giới Tính: Nam</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_2" style="font-size: 12px;" fill="#ffffff" x="90" y="70">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_male.field_3 =
        '<text class="field_3" style="font-size: 12px;" fill="#ffffff" x="90"  y="90">Ngày Mất: {val}</text>';
      FamilyTree.templates.tommy_male.field_4 =
        '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="110">Đời: {val}</text>';

      FamilyTree.templates.tommy_female.field_0 =
        '<text class="field_0" style="font-size: 16px;" fill="#ffffff" x="90" y="30">{val}</text>';
      FamilyTree.templates.tommy_female.field_1 =
        '<text class="field_1" style="font-size: 12px;" fill="#ffffff" x="90" y="50">Giới Tính: Nữ</text>';
      FamilyTree.templates.tommy_female.field_2 =
        '<text class="field_2" style="font-size: 12px;" fill="#ffffff" x="90" y="70">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_female.field_3 =
        '<text class="field_3" style="font-size: 12px;" fill="#ffffff" x="90" y="90">Ngày Mất: {val}</text>';
      FamilyTree.templates.tommy_female.field_4 =
        '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="110">Đời: {val}</text>';
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
      });
      this.family.onInit(() => {
        this.family.load(this.nodes);
      });
      this.family.onField((args) => {
        if (args.data.dod == null) {
          FamilyTree.templates.tommy_female.field_3 = null;
          FamilyTree.templates.tommy_male.field_3 = null;
          ('<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="195" y="50" text-anchor="middle"></text>');
          FamilyTree.templates.tommy_female.field_4 =
            '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="90">Đời: {val}</text>';
          FamilyTree.templates.tommy_male.field_4 =
            '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="90">Đời: {val}</text>';
        } else {
          FamilyTree.templates.tommy_female.field_3 =
            '<text class="field_3" style="font-size: 12px;" fill="#ffffff" x="90" y="90">Ngày Mất: {val}</text>';
          FamilyTree.templates.tommy_female.field_4 =
            '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="110">Đời: {val}</text>';
          FamilyTree.templates.tommy_male.field_3 =
            '<text class="field_3" style="font-size: 12px;" fill="#ffffff" x="90"  y="90">Ngày Mất: {val}</text>';
          FamilyTree.templates.tommy_male.field_4 =
            '<text class="field_4" style="font-size: 12px;" fill="#ffffff" x="90" y="110">Đời: {val}</text>';
        }
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
        if (this.isCompare) {
          this.highLightSelectCompareNode(arg.node.id);
          if (this.lastClickedNodeId == null) {
            this.lastClickedNodeId = arg.node.id;
          } else {
            if (this.lastClickedNodeId != arg.node.id) {
              this.compareMember(this.lastClickedNodeId, arg.node.id);
            } else {
              this.lastClickedNodeId = null;
            }
          }
        } else {
          this.getInforMember(arg.node.id);
        }
      });
    },
    getViewBox() {
      return this.family.getViewBox();
    },
    getResultMember(id) {
      const objdata = {};
      const result = this.nodes.find((node) => node.id == id);

      objdata.name = result.name;
      objdata.gender = result.gender === "male" ? "Nam" : "Nữ";

      if (result.pids[0] != null) {
        const resultMid = this.nodes.find((node) => node.id == result.pids[0]);
        objdata[result.gender === "male" ? "wife" : "husband"] = resultMid.name;
      } else {
        objdata[result.gender === "male" ? "wife" : "husband"] = `Không có ${
          result.gender === "male" ? "vợ" : "chồng"
        }`;
      }
      objdata.dob = result.dob;
      objdata.dod = result.dod;

      if (result.fid) {
        const resultFid = this.nodes.find((node) => node.id == result.fid);
        objdata.father = resultFid.name;
      }

      if (result.mid) {
        const resultMid = this.nodes.find((node) => node.id == result.mid);
        objdata.mother = resultMid.name;
      }
      objdata.generation = result.generation;

      return objdata;
    },
    compareMember(memberId1, memberId2) {
      this.RemoveHightLight();
      this.selectNodeHighLight = [];
      this.lastClickedNodeId = null;
      this.objCompareMember1 = this.getResultMember(memberId1);
      this.objCompareMember2 = this.getResultMember(memberId2);
      HTTP.get("compare", {
        params: {
          MemberID1: memberId1,
          MemberID2: memberId2,
        },
      })
        .then((response) => {
          this.resultCompare1 = response.data.result1;
          this.resultCompare2 = response.data.result2;
          this.$modal.show("compare-modal");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    setPaternalAncestor(roleId) {
      HTTP.post("setRole", {
        memberId: this.CurrentIdMember,
        roleId: roleId,
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
      console.log("Vào Take: " + this.objMemberInfor.Generation);
      this.IsDead = this.objMemberInfor.IsDead;
    },
    sendMessageToMember() {
      if (
        this.contentMessage != null &&
        this.ListPhoneToSendMessage.length > 0 &&
        this.contentMessage != ""
      ) {
        HTTP.post("send-sms", {
          ListMemberID: this.ListPhoneToSendMessage,
          contentMessage: this.contentMessage,
          action: "sms",
          CodeID: 123456,
        })
          .then(() => {
            this.getListMessage();
            this.NotificationsScuccess("Gửi thông báo thành công");
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (this.ListPhoneToSendMessage.length == 0) {
        this.NotificationsDelete("Hãy chọn những người bạn muốn gửi thông báo");
      } else {
        this.NotificationsDelete("Không có thông báo gì để gửi ");
      }
    },
    searchMember() {
      this.ListPhoneToSendMessage = this.nodes.filter((node) =>
        node.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      console.log(this.searchKeyword);
    },
    toggleSelectAll() {
      this.ListPhoneToSendMessage = this.checkAll
        ? this.nodes.map((node) => node.id)
        : [];
    },
    toggleSelection(id) {
      let index = this.ListPhoneToSendMessage.indexOf(id);
      if (index !== -1) {
        this.ListPhoneToSendMessage.splice(index, 1);
      } else {
        this.ListPhoneToSendMessage.push(id);
      }
    },
    convertLunarToSolar() {
      let LunarDob = new Date(this.objMemberInfor.LunarDob);
      let timezone = (0, getLocalTimezone)();
      const dob = convertLunar2Solar(
        LunarDob.getDate(),
        LunarDob.getMonth() + 1,
        LunarDob.getFullYear(),
        false,
        timezone
      );
      let month = dob.getMonth() + 1;
      let date = dob.getDate();
      if (month < 10) {
        month = "0" + (dob.getMonth() + 1);
      }
      if (date < 10) {
        date = "0" + dob.getDate();
      }
      this.$set(
        this.objMemberInfor,
        "Dob",
        "" + dob.getFullYear() + "-" + month + "-" + date
      );
    },
    convertSolarToLunar() {
      let Dob = new Date(this.objMemberInfor.Dob);
      let month = new LunarDate(Dob).getMonth();
      let date = new LunarDate(Dob).getDate();
      if (new LunarDate(Dob).getMonth() < 10) {
        month = "0" + new LunarDate(Dob).getMonth();
      }
      if (new LunarDate(Dob).getDate() < 10) {
        date = "0" + new LunarDate(Dob).getDate();
      }
      this.$set(
        this.objMemberInfor,
        "LunarDob",
        "" + new LunarDate(Dob).getYear() + "-" + month + "-" + date
      );
    },
    getAdressMember(addressString) {
      let addressParts = addressString.split("-");
      let SelectCityName = addressParts[0].trim();
      let SelectDistinName =
        addressParts.length > 1 ? addressParts[1].trim() : null;

      this.selectCityMember = this.ListCity.find(
        (city) => city.name === SelectCityName
      );
      this.selectCityMember = this.selectCityMember.id;
      if (SelectDistinName != null) {
        this.selectDistrictMember = SelectDistinName;
        HTTP.get("district", {
          params: {
            cityID: this.selectCityMember,
          },
        })
          .then((response) => {
            this.ListDistrictMember = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
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
            this.objMemberInfor.LunarDod = this.formatDate(
              this.objMemberInfor.LunarDod
            );
            this.avatarSrc = this.objMemberInfor.Image;
          }
          if (this.objMember.contact.length > 0) {
            this.objMemberContact = this.objMember.contact[0];
            if (this.objMemberContact.Address != undefined) {
              this.getAdressMember(this.objMemberContact.Address);
            }
          } else {
            this.selectCityMember = null;
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
          MemberID: this.CurrentIdMember,
        },
      }).catch(() => {
        this.NotificationsDelete("Đã sảy ra lỗi, không thể xóa");
      });

      HTTP.delete("RemoveListJob", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });

      HTTP.delete("deleteListEducation", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });
      HTTP.delete("member", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).then((response) => {
        if (response.data.success == true) {
          this.NotificationsDelete(response.data.message);
        } else {
          this.NotificationsDelete(response.data.message);
        }
        this.$modal.hide("Select-option-Modal");
        this.getListMember();
        this.closeCfDelModal();
      });
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
    addMemberFromList() {
      if (this.action == undefined) {
        this.NotificationsDelete("Bạn chưa chọn mối quan hệ");
      } else {
        HTTP.put("memberToGenealogy", {
          InGenealogyID: this.CurrentIdMember,
          OutGenealogyID: this.newIdMember,
          Action: this.action,
        })
          .then((response) => {
            if (response.data.success == true) {
              this.NotificationsScuccess(response.data.message);
              this.family.load(this.nodes);
              this.getListMember();
              this.getListUnspecifiedMembers();
              this.closeModalAddMemberFromList();
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    updateAvatar(event) {
      const file = event.target.files[0];
      this.UrlAvatar = file;
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.avatarSrc = e.target.result; // Cập nhật ảnh avatar bằng ảnh tải lên
        };
        reader.readAsDataURL(file);
      } else {
        this.avatarSrc = null;
      }
    },
    appendIfDefined(key, value) {
      if (value !== undefined && value !== null) {
        this.formData.append(key, value);
        console.log(value);
      }
    },
    async addMember() {
      this.formData = new FormData();
      if (this.action == "AddNormal") {
        this.generationMember = 0;
      }
      console.log(this.avatarSrc);
      this.appendIfDefined("MemberName", this.objMemberInfor.MemberName);
      this.appendIfDefined("NickName", this.objMemberInfor.NickName);
      this.appendIfDefined("CurrentMemberID", this.CurrentIdMember);
      this.appendIfDefined("BirthOrder", this.objMemberInfor.BirthOrder);
      this.appendIfDefined("Origin", this.objMemberInfor.Origin);
      this.appendIfDefined("NationalityID", this.objMemberInfor.NationalityID);
      this.appendIfDefined("ReligionID", this.objMemberInfor.ReligionID);
      this.appendIfDefined("Dob", this.objMemberInfor.Dob);
      this.appendIfDefined("LunarDob", this.objMemberInfor.LunarDob);
      this.appendIfDefined("bnirthPlace", this.objMemberInfor.BirthPlace);
      this.appendIfDefined("IsDead", this.IsDead);
      this.appendIfDefined("Dod", this.objMemberInfor.Dod);
      this.appendIfDefined("LunarDod", this.objMemberInfor.LunarDod);
      this.appendIfDefined("PlaceOfDeath", this.objMemberInfor.PlaceOfDeadth);
      this.appendIfDefined("GraveSite", this.objMemberInfor.GraveSite);
      this.appendIfDefined("Note", this.objMemberInfor.Note);
      this.appendIfDefined("CurrentGeneration", this.generationMember);
      this.appendIfDefined("BloodType", this.objMemberInfor.BloodType);
      this.appendIfDefined("Male", this.objMemberInfor.Male);
      this.appendIfDefined("CodeID", this.CodeID);
      this.appendIfDefined("Action", this.action);
      this.appendIfDefined("Image", this.UrlAvatar);

      await HTTP.post("member", this.formData)
        .then((response) => {
          if (this.action == "AddNormal") {
            this.getListUnspecifiedMembers();
          }
          if (response.data.success == true) {
            this.NotificationsScuccess(response.data.message);
          } else {
            this.NotificationsDelete(response.data.message);
          }
          this.newIdMember = response.data.data.MemberID;
          if (
            this.objMemberContact.Phone != null ||
            this.objMemberContact.Address != null ||
            this.objMemberContact.Email != null ||
            this.FacebookUrl != null ||
            this.objMemberContact.Zalo != null
          ) {
            this.objMemberContact.Phone = "+84" + this.objMemberContact.Phone;
            HTTP.post("addContact", {
              memberId: this.newIdMember,
              Address: this.objMemberContact.Address,
              Phone: this.objMemberContact.Phone,
              Email: this.objMemberContact.Email,
              FacebookUrl: this.objMemberContact.FacebookUrl,
              Zalo: this.objMemberContact.Zalo,
            }).catch((e) => {
              console.log(e);
            });
          }
          this.$modal.hide("member-modal");
          this.$modal.hide("Select-option-Modal");
          this.family.load(this.nodes);
          this.getListMember();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    selectMemberFromTable(member, index) {
      this.selectedRowIndex = index;
      this.action = member.relationship;
      this.newIdMember = member.MemberID;
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
      this.formData = new FormData();
      console.log(this.objMemberInfor.MarriageID);
      this.appendIfDefined("MemberID", this.CurrentIdMember);
      this.appendIfDefined("MemberName", this.objMemberInfor.MemberName);
      this.appendIfDefined("NickName", this.objMemberInfor.NickName);
      this.appendIfDefined("ParentID", this.objMemberInfor.ParentID);
      this.appendIfDefined("MarriageID", this.objMemberInfor.MarriageID);
      this.appendIfDefined("BirthOrder", this.objMemberInfor.BirthOrder);
      this.appendIfDefined("Origin", this.objMemberInfor.Origin);
      this.appendIfDefined("NationalityID", this.objMemberInfor.NationalityID);
      this.appendIfDefined("ReligionID", this.objMemberInfor.ReligionID);
      this.appendIfDefined("Dob", this.objMemberInfor.Dob);
      this.appendIfDefined("LunarDob", this.objMemberInfor.LunarDob);
      this.appendIfDefined("BirthPlace", this.objMemberInfor.BirthPlace);
      this.appendIfDefined("IsDead", this.objMemberInfor.IsDead);
      this.appendIfDefined("Dod", this.objMemberInfor.Dod);
      this.appendIfDefined("LunarDod", this.objMemberInfor.LunarDod);
      this.appendIfDefined("PlaceOfDeath", this.objMemberInfor.PlaceOfDeadth);
      this.appendIfDefined("GraveSite", this.objMemberInfor.GraveSite);
      this.appendIfDefined("Note", this.objMemberInfor.Note);
      this.appendIfDefined("BloodType", this.objMemberInfor.BloodType);
      this.appendIfDefined("Male", this.objMemberInfor.Male);
      this.appendIfDefined("Image", this.UrlAvatar);

      if (this.selectDistrictMember != null) {
        this.objMemberContact.Address =
          this.objMemberContact.Address + "-" + this.selectDistrictMember;
      }
      HTTP.put("member", this.formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.success == true) {
            this.NotificationsScuccess(response.data.message);
            if (this.objMemberContact.Phone != null) {
              this.objMemberContact.Phone = "+84" + this.objMemberContact.Phone;
            }
            HTTP.put("updateContact", {
              MemberID: this.CurrentIdMember,
              Address: this.objMemberContact.Address,
              Phone: this.objMemberContact.Phone,
              Email: this.objMemberContact.Email,
              FacebookUrl: this.objMemberContact.FacebookUrl,
              Zalo: this.objMemberContact.Zalo,
            }).then(() => {
              this.closeMemberModal();
              this.family.load(this.nodes);
              this.getListMember();
            });
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
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
    GetListFilterMember() {
      if (this.selectDistrict != null) {
        this.selectAdress = this.selectAdress + "-" + this.selectDistrict;
      }
      HTTP.post("filter-member", {
        CodeID: this.CodeID,
        BloodType: this.selectBloodType,
        selectAge: this.selectAge,
        Address: this.selectAdress,
      })
        .then((response) => {
          this.listFilterMember = response.data.data;
          this.highLightNode();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    RemoveHightLight() {
      var nodeElement;
      for (let i = 0; i < this.nodes.length; i++) {
        nodeElement = this.family.getNodeElement(this.nodes[i].id);
        nodeElement.classList.remove("selected");
        nodeElement.classList.remove("notselected");
      }
    },
    highLightSelectCompareNode(SelectNode) {
      var nodeElement;
      let selectedNode = this.nodes.find((node) => node.id == SelectNode);
      if (this.selectNodeHighLight.includes(selectedNode.id)) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.remove("selected");
        this.selectNodeHighLight = this.selectNodeHighLight.filter(
          (id) => id != selectedNode.id
        );
      } else if (selectedNode) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.add("selected");
        this.selectNodeHighLight.push(selectedNode.id);
      } else {
        console.log(selectedNode);
        console.log("Nút không tồn tại:", SelectNode);
      }
    },
    highLightSelectNode(SelectNode) {
      var nodeElement;
      this.RemoveHightLight();
      let selectedNode = this.nodes.find((node) => node.id == SelectNode);
      if (selectedNode) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.add("selected");
      } else {
        console.log("Nút không tồn tại:", SelectNode);
      }
    },
    handleRightClick(id) {
      this.OnpenModal_SelectOption(id);
    },
    handleLeftClickUnspecifiedMembers(id) {
      this.getInforMember(id);
    },
    handleLeftClick(id) {
      this.family.center(id);
    },
    highLightNode() {
      var nodeElement;
      this.RemoveHightLight();
      let memberIds = this.listFilterMember.map((item) => item.MemberID);
      if (
        this.selectBloodType != null ||
        this.selectAge != null ||
        this.selectAdress != null
      )
        this.nodes.forEach((node) => {
          if (memberIds.includes(node.id)) {
            nodeElement = this.family.getNodeElement(node.id);
            nodeElement.classList.add("selected");
          } else {
            nodeElement = this.family.getNodeElement(node.id);
            nodeElement.classList.add("notselected");
          }
        });
    },
    getListAfterSetPaternalAncestor(id) {
      HTTP.get("viewTree", {
        params: {
          CodeID: id,
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
    closeModalAddMemberFromList() {
      this.$modal.hide("add-from-list");
      this.closeSelectModal();
    },
    openModalAddMemberFromList() {
      this.TitleModal = " mối quan hệ ";
      this.$modal.show("add-from-list");
    },
    openNotiModal() {
      this.ListPhoneToSendMessage = [];
      this.contentMessage = null;
      this.checkAll = false;
      this.$modal.show("noti-modal");
    },
    closeNotiModal() {
      this.$modal.hide("noti-modal");
    },
    openCompareModal() {
      this.RemoveHightLight();
      this.isCompare = !this.isCompare;
    },
    closeCompareModal() {
      this.$modal.hide("compare-modal");
    },
    openMemberModal(action, title) {
      this.IsDead = 0;
      this.isAdd = true;
      this.isEdit = false;
      this.objMemberInfor = {};
      this.objMemberInfor.BirthOrder = 1;
      this.objMemberInfor.Male = 1;
      this.objMemberInfor.BloodType = null;
      this.objMemberInfor.NationalityID = 1;
      this.objMemberInfor.ReligionID = 1;
      this.objMemberContact = {};
      this.TitleModal = "Thêm Thông Tin " + title;
      this.action = action;
      this.$modal.show("member-modal");
    },
    closeMemberModal() {
      this.$modal.hide("member-modal");
      this.CurrentIdMember = 0;
    },
    setFunctionCanDo(foundNode) {
      this.canAddFather = true;
      this.canAddhusband = true;
      this.canAddMother = true;
      this.canAddWife = true;
      if (foundNode.fid != null) {
        this.canAddFather = false;
      }
      if (foundNode.mid != null) {
        this.canAddMother = false;
      }
      if (foundNode.pids[0] == null) {
        if (foundNode.gender == "male") {
          this.canAddhusband = false;
        } else {
          this.canAddWife = false;
        }
      } else {
        this.canAddWife = false;
        this.canAddhusband = false;
      }
    },
    OnpenModal_SelectOption(id) {
      let foundNode = this.nodes.find((node) => node.id == id);
      this.setFunctionCanDo(foundNode);
      console.log(foundNode);
      this.TitleModal = foundNode.name;
      this.generationMember = foundNode.generation;
      this.highLightSelectNode(id);
      this.$modal.show("Select-option-Modal");
      this.CurrentIdMember = id;
    },
    closeSelectModal() {
      this.CurrentIdMember = 0;
      this.RemoveHightLight();
      this.$modal.hide("Select-option-Modal");
    },
    removeRelationship() {
      HTTP.put("removeRelationship", {
        CurrentID: this.CurrentIdMember,
        RemoveID: this.newIdMember,
        action: this.action,
      })
        .then((response) => {
          if (response.data.success == true) {
            this.NotificationsScuccess(response.data.message);
          } else {
            this.NotificationsDelete(response.data.message);
          }
          this.closeCfDelModal();
          this.openModalRelationship();
          this.getListMember();
          this.getListUnspecifiedMembers();
          this.closeSelectModal();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    openCfDelModal(flag, id, name, action) {
      this.isRemoveRelationship = flag;
      this.$modal.show("cfdel-modal");
      if (this.isRemoveRelationship) {
        this.TitleConfirm = "Bạn có chắc chắn muốn hủy mối quan hệ với " + name;
        this.action = action;
        this.newIdMember = id;
        console.log(id);
      } else {
        console.log(this.TitleConfirm);
        this.TitleConfirm = "Bạn có chắc chắn xóa " + name + " khỏi gia phả";
        this.$modal.show("cfdel-modal");
      }
    },

    closeCfDelModal() {
      this.$modal.hide("cfdel-modal");
    },

    openModalRelationship() {
      this.$modal.show("modal-relationship");
      HTTP.get("relationship", {
        params: {
          memberID: this.CurrentIdMember,
        },
      }).then((response) => {
        this.ResultRelationship = response.data.data;
        console.log(this.ResultRelationship);
      });
    },
    closeModalRelationship() {
      this.$modal.hide("modal-relationship");
    },

    getListMember() {
      HTTP.get("viewTree", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          this.nodes = response.data;
          console.log(this.nodes);
          for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].tags = [];
            if (this.nodes[i].isDead == 1) {
              this.nodes[i].tags.push("died");
            }
            if (this.nodes[i].img == null || this.nodes[i].img == "") {
              if (this.nodes[i].gender == "male") {
                this.nodes[i].img =
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw8HBhUQBw4SFRUQFhAQFhUTDRgVFRUYFRYWFhUWGxcZHSggGholHRcXITEiJSkrMC4uGB8zODMtNygtLisBCgoKDg0OFxAQFSslHx0rKy0tKy0rNy0tLS0tLS8tLSstLS0tLi0rLS0rKy0tLS8rLTArLSstKy0tLS0tKzcrK//AABEIALIBGwMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAQUDBAYCB//EADMQAQABAgQDBAkDBQAAAAAAAAABAgMEBRExEiFRQWFxsRMzcoGRocHR4SIyNBRCU4Lw/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAIDAQT/xAAcEQEBAQEBAAMBAAAAAAAAAAAAAQIRMQMhURL/2gAMAwEAAhEDEQA/APogD0MgB0AAAAAAAAAAAABNFE3KtKImfCNW3ayu7c3iI9qfs5bI7xpi3t5N/lrn3R9zE4GxhbWtyau6OLnPyT/cOVUALcAAAAAAAAAAAAExshMbOCAHQAAAAAAAAAAB6tW5u3IpojnPIC3bm7XpbjWZ7FvhcoimNcROs9I2/LbwWEpwtvSned56/hssdb74uZeaLdNunSiIiO6NHoEKGrjsHGLo5zpMa6T49zaCXg5fEYerD16XI8J7J8GJ1N+xTft8NyNY8u9zuMw04W7pVt2T1htnXUWcYAFpAAAAAAAAAAExshMbAgAAAAAAAAAAABaZHa4rlVU9mkR791Wuch9VV4x5I347n1aAMWgAAAA1MzsRewk9aYmqPc22PERrYq8KvJ2DlhCXoZAAAAAAAAAACY2QmNgQAAAAAAAAAAAAush9RV7X0hSrvIv41XtfSEb8Vn1ZAMVgAAADxe9TV4T5Pbxe9TV4T5A5RKEvSyAAAAAAAAAAExshMbAgAAAAAAAAAAAB0GVYerD2Ji7GkzOu/dDnnWW6uK3E9YiWfyVWXoBksAAAAeLsa2piO2JewHKXLc2q+G5GkxpyeW3ms64+r/WPlDUeieM6AOuAAAAAAAACY2QmNgQAAAAAAAAAAAA6TL7npMHTPdEfDk5tZZJemm9NEzymNY8Y/CNzsVldgMVgAAACJ2S0s1vzYws8G9X6fju7J0UmLr9JiqpjtmWIG7IAdAAAAAAAABMbITGwIAAAAAAAAAAAAZ8Bc9Fi6Znrp8eX1YByjrRoZVjPT2+Gv91Pzjq32FnGoA4AAClzy7xXopj+2NZ8Z/75rXEXosWZqq7HM3bk3bk1V7zzXiffU6ryA2QAAAAAAAAAAJjZCY2BAAAAAAAAAAAAAALLIqdb9U9I0+M/hdqzJbFVqKpu0zGvDprHis2G/Wk8AEugANTNv4FXu84c66PM6JuYKqLcazPDy98OcmNJ0nsa/H4jQA0SAAAAAAAAAAJjZCY2BAAAAAAAAAAAADZyy36TG06xtPF8Pzow2rNV6rS1TM+ELrK8FOGiZu6azpHKdoTq8jsiwAYNAAAABz+b2+DGzOn7oifpLoGlmeEnFW49HprT16dseSs3lcs+nPjJesV2J0u0zHl8WNuzAAAAAAAAAAExshMbAgAAAAAAAAbeGy65f5zHDHWfpC1w2W27HPTinrP2TdyOyKfD4K5iP2U8us8o/K0w+U0W+d6eKfhCxGd3auZeaKIop0oiIjpEaPQIdAAAAAAAARNMVRpVDRxGVW7vq/0z3bfBvjstg53EZbcsbRxR1p+zUda18Tg6MR6ynn1jlK58n6m5c0LHE5TXb52Z4o6bT+VfVTNNWlUaTHWGksvieIAdcAAAAExshMbAgAAAACmOKdI7eQMmHw9WIucNqPtC8wmXUYfnV+qrrP0hlweGjDWeGn3z1lsMdb6uQAQoAAAAAAAAAAAAAAAAYcRhqMRTpdjXv7Y97MA53H4CcLOsc6Z7eni1HV3KIuUTFcaxPJzOLsf0+ImmezbvjsbY11FjEAtIAAmNkJjYABwAAGXC/wAqj2qPOAKOnAedqAAAAAAAAAAAAAAAAAAAAKPO/wCXHsx5yC8eua8V4DVmAAJAH//Z";
              } else if (this.nodes[i].gender == "female") {
                this.nodes[i].img =
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIHDw0PEBEREA8NEA0PDw4QDRAQDQ8OFhEWFhURExYYHjQgGBolHRUVITEiJiorLi4uFx8zODgsNyg5LisBCgoKDQ0NFQ0QFTcZFRkrKzctNystKysrLSstNy0rKysrKy03LSsrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAAABQQDBgIBB//EADQQAQABAgMFBwMDBAMBAAAAAAABAgMEESEFEjFRcRMyQWGBkaFSscEzctEiQvDxI2KCFP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/pgDTIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAN+G2dNetekfTHe9eTdRhKKP7Y9Yzn5QxCa7Gzq7ms5UxPPj7Kc4WiZid2ImJiYyjJ2NXE6NlR9U+0PivZUxwqiesZKghiDewtdnjGnONYcXpGHF7Pi5rRpVy/tn+F0xJH7VTNEzExlMcYfioAAAAAAAAAAAAAAAAAA/FXZ2E3YiurjPdjlHNiwNjt64jwjWenJdSrABFAAAAAAZMfhO3jOO/HDzjkjPSJG07HZ1b0cK+PlUsSxiAVAAAAAAAAAAAAAAAHTD2+2rpp5zr08QVdm2eyoz8a9fTwayIyGWgAAAAAAAByxNrt6KqefDr4OoDzcxl6DVtK12dyZ8KtfXxZWmQAAAAAAAAAAAAABv2RbzmqrlERHWWBY2VTu28/qmZ/H4SkbAEaAAAAAAAAAAYNr0Z001cpy9J/wBJS5j6d61X0z9pzQ1jNAFAAAAAAAAAAAABcwEZWqOn5Q13A/pUdPylI7gI0AAAAAAAAAA54mM6K/21fZ556DFzlbuftq+yAsSgCoAAAAAAAAAAAALWzZztU+W9HzKKqbIrzpqp5Tn6T/pKRQARoAAAAAAAAABl2lXu26vPKPlFU9sV6UU85mf890xYzQBQAAAAAAAAAAAAa9mXNy5EfVEx68WR1wn6lv8AdHsC+Ay0AAAAAAAAAAj7WqzuRHKmPvLG17UjK5PnFOTIrNAFAAAAAAAAAAAABS2Xhsv+Sf8AzH5TXWzia7PdnTlOsIL4m29qfVT60z+JbMPiacRnu56cc4yRp2AAAAAAAAHO/eixGdWeXDSM2K5tSI7tMz1nKAddpYftqc471PzHJHd72MrvcZyjlGkOCsgCgAAAAAAAAAAAAAD8arWOqtRERFOUf9WYBrq2lcn6Y6U/ysUcIz45Rm87RTvTTHOYj5ejSrABFAAEe5jrluqqM4nKqqNYjmsIWOp3blfXP31WJX3XtCuuJid3KeMbrKCoAAAAAAAAAAAAAAAAAAAA07Ot9pcp5U/1T+PnJbY9m4fsac571XxHhDYzVgAKAAJO1reVUVfVGXrCs4Yyx/8ARRMeMax1EqEExlnE8Y4wNIAAAAAAAAAAAAAAA+rdqq73YmekaA+RvtbMqq707vlGstlrBUWvDOedWqGJNnDV3uEac50hTwuAizrP9VXxDYGrgAigAAAAAM2KwdOI14VfVH55pl/B12fDOOcargJjzYu3sJRe40xnzjSWO7suY7tWflVx911MTh0u2KrPeiY8/D3c81AAAAAAAAB92bU3pypjOfiI5y+Kad6YiOM6R1XcJh4w9OXjOtU85QjjY2dTR3v6p8+77NlMbukaP0RoAAAAAAAAAAAAAAAA4st/AUXfDdnnH8NQCDicNOHnKeE8J8JcXoL1qL1M0z4+8TzQr1ubVU0zxj581iV8AKgAAADfsqzvTNc8KdI6/wCfdVcsLa7GimnlGvXxdWWgAAAAAAAAAAAAAAAAAAABP2rY3qYrjjTpPRQfNdO/ExPCYmJB50ftdHZzMTxiZh+NMgAD6td6n91P3AHogGWgAAAAAAAAAAAAAAAAAAAAAELH/q19Y+0OAKyAKP/Z";
              }
            }
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
    getListMessage() {
      HTTP.get("listMessage", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          this.ListMessage = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListDistrictMember() {
      let selectedCity = this.ListCity.find(
        (city) => city.id == this.selectCityMember
      );
      this.objMemberContact.Address = selectedCity.name;
      console.log(this.objMemberContact.Address);
      if (this.selectCityMember == null) {
        this.ListDistrictMember = null;
      } else {
        HTTP.get("district", {
          params: {
            cityID: this.selectCityMember,
          },
        })
          .then((response) => {
            this.ListDistrictMember = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getListDistrict() {
      if (this.selectCity == null) {
        this.ListDistrict = null;
        this.selectDistrict = null;
        this.RemoveHightLight();
      } else {
        let selectedCity = this.ListCity.find(
          (city) => city.id == this.selectCity
        );
        this.selectAdress = selectedCity.name;
        this.GetListFilterMember();
        HTTP.get("district", {
          params: {
            cityID: this.selectCity,
          },
        }).then((response) => {
          this.ListDistrict = response.data;
        });
      }
    },
    getListCity() {
      HTTP.get("province")
        .then((response) => {
          this.ListCity = response.data;
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
    selectEmail() {
      this.emailSelected = true;
      this.smsSelected = false;
    },
    selectSMS() {
      this.smsSelected = true;
      this.emailSelected = false;
      this.expandCreateEmail = false;
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
    if (localStorage.getItem("CodeID") != null) {
      this.CodeID = localStorage.getItem("CodeID");
    } else {
      if (localStorage.getItem("accountID") != null) {
        this.$router.push("/familycode");
      } else {
        this.$router.push("/login");
      }
    }
    console.log("CodeID: " + localStorage.getItem("CodeID"));
    console.log("accountID: " + localStorage.getItem("accountID"));
    this.getListMessage();
    this.getListCity();
    this.getListNationality();
    this.getListReligion();
    this.getListAgeGroup();
    this.getListBloodTypeGroup();
    this.getListUnspecifiedMembers();
    this.getListMember();
  },
};
</script>
    
<style>
@import "../assets/css/familytree.css";

.row-selected {
  --bs-table-bg: #f0f0f0;
}
</style>