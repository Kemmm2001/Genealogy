<template>
  <div class="main-grid-container">
    <div class="sidebar" :class="{ expand: expandSidebar }" @mouseover="sidebarHover()" @mouseleave="siderbarLeave()">
      <div class="content-display" style="display: grid; grid-template-rows: 50% 50%; position: relative;">
        <div class="w-100 d-flex flex-row pt-2">
          <div v-if="memberRole != 3" class="col-6 ps-2 pe-1">
            <div class="w-100 h-100">
              <button @click="openNotiModal()" style="width:100%; font-size: 15px; color:white" type="button" class="m-0 d-flex align-items-center justify-content-center btn btn-secondary w-100 h-100">Tạo thông báo</button>
            </div>
          </div>
          <div class="col-6 ps-1 pe-2">
            <div class="w-100 h-100">
              <button @click="openCompareModal()" type="button" style="width:100%; font-size: 15px; color:white" class="d-flex align-items-center justify-content-center" :class="{ 'm-0': true, 'btn': true, ' w-100': true, 'h-100': true, 'btn-secondary': !isCompare, 'btn-primary': isCompare }">Xác định quan hệ</button>
            </div>
          </div>
        </div>
        <div v-if="memberRole != 3" class="w-100 d-flex flex-row pt-2">
          <div class="col-6 ps-2 pe-1">
            <div class="w-100 h-100">
              <button @click="BackUpdata()" style="width:100%; font-size: 15px; color:white" type="button" class="btn btn-secondary h-100 m-0 d-flex align-items-center justify-content-center">Lưu trữ dữ liệu</button>
            </div>
          </div>
          <div class="col-6 ps-1 pe-2">
            <div class="w-100 h-100">
              <label for="upload" style="width:100%; font-size: 15px; color:white" type="button" class="d-flex align-items-center justify-content-center btn btn-secondary h-100">Xuất dữ liệu vào</label>
              <input ref="importFile" id="upload" type="file" style="display: none" @change="getFileImportMember($event)" />
            </div>
          </div>
        </div>
        <div class style="position: absolute;"></div>
      </div>
      <div class="content-display" style="display: grid; grid-template-rows: 50% 50%;">
        <div class="mems pt-2 pb-1 px-2">
          <div class="title p-0 d-flex align-items-center justify-content-center" style="background-color: #AED6F1; font-family: 'QuicksandBold'; text-align: center;">Thành viên có trên phả đồ</div>
          <div class="h-100 w-100" style="overflow-y: auto; background-color: #FFFFFF; font-family: 'QuicksandBold';">
            <div v-for="(n, index) in nodes" :key="n.id">
              <div @click="handleLeftClick(n.id)" @contextmenu.prevent="handleRightClick(n.id)" style="cursor: pointer;" :class="{ 'list-item': true, 'selected-list': n.id == CurrentIdMember, 'ancestor-member': index === 0, 'ellipsis-text': true, 'w-100': true }">{{ n.name }}</div>
            </div>
            <div class="center-content" v-if="nodes.length == 0">Danh sách chưa có thành viên</div>
          </div>
        </div>
        <div class="mems pt-1 pb-2 px-2">
          <div class="title d-flex p-0 justify-content-center" style="background-color: #AED6F1; font-family: 'QuicksandBold'; text-align: center; position: relative;">
            <div class="d-flex align-items-center">Thành viên không có trên phả đồ</div>
            <div v-if="memberRole != 3" class="d-flex align-items-center h-100 ps-1" style="cursor: pointer;" @click="openMemberModal('AddNormal', ' thành viên không có trên phả đồ')">
              <svg class="add-member-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
              </svg>
            </div>
          </div>
          <div class="h-100 w-100" style="overflow-y: auto; background-color: #FFFFFF; font-family: 'QuicksandBold';">
            <div v-if="ListUnspecifiedMembers" class="d-flex flex-column w-100" style="overflow-y: auto; flex-grow: 1; cursor: pointer">
              <div v-for="list in ListUnspecifiedMembers" :key="list.id" @click="handleLeftClickUnspecifiedMembers(list.MemberID)" class="list-item ellipsis-text w-100">{{ list.MemberName }}</div>
            </div>
            <div class="center-content" v-if="nodes.length == 0">Danh sách chưa có thành viên</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div v-show="nodes.length != 0" id="tree" ref="tree"></div>
      <div v-show="nodes.length == 0" class="center-content">
        <div @click="openMemberModal('AddFirst', 'cụ tổ')" class="btn bg-primary text-white d-flex flex-row align-items-center">
          <div style="padding-right: 8px;">Thêm thông tin cụ tổ</div>
          <svg style="fill: white;" class="add-member-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </div>
      </div>
      <div :class="{ filterExpanded: advancedFilterDown }" class="advanced-filter-container d-flex flex-column p-1 position-absolute col-3 col-sm-2 col-md-3 col-lg-4" style="cursor: pointer;">
        <div :class="{ expand: advancedFilterDown }" class="filter-item">
          <div v-if="advancedFilterDown" class="px-2" style="padding-top: 8px;">
            <select v-model="selectCity" class="d-flex text-center form-select dropdown p-0" @change="getListDistrict(), GetListFilterMember()">
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
              <option v-for="age in ListAgeGroup" :key="age.id" class="dropdown-item" :value="age.id">{{ age.From != 61 ? age.From : 'Trên ' + age.From }} {{ age.End != 200 ? ' - ' + age.End : '' }} Tuổi</option>
            </select>
          </div>
        </div>
        <div @click="advancedFilterDown = !advancedFilterDown" class="d-flex flex-column align-items-center justify-content-center h-100">
          <div class="filter-text" v-if="!advancedFilterDown" style="color: white; font-family: 'QuicksandBold'">Bộ lọc nâng cao</div>
          <div>
            <svg :class="{ rotateDown: !advancedFilterDown }" class="advanced-filter-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <!-- Chọn tương tác với thành viên -->
    <div class="select-opts-container">
      <modal name="select-opts-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">{{ TitleModal }}</div>
            <div class="mdl-close" @click="closeSelectModal()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body" style="overflow-x: hidden;height: auto">
            <div class="select-opts-body list-group">
              <div class="list-group-item feature-overview">Các chức năng chính</div>
              <div class="list-group-item" @click="getInforMember(CurrentIdMember)">Thông tin chi tiết</div>
              <div class="list-group-item" @click="openModalRelationship()">Xem các mối quan hệ</div>
              <div class="list-group-item" @click="openMemberModal('AddParent', 'phụ huynh')">Thêm phụ huynh</div>
              <div class="list-group-item" @click="openMemberModal('AddMarriage', 'hôn nhân')">Thêm hôn nhân</div>
              <div v-for="list in ListMarriedMember" :key="list.id" class="list-group-item" @click="openMemberModal('AddChild', 'Con', list.id)">Thêm Con với {{ list.name }}</div>
              <div class="list-group-item" @click="openMemberModal('AddChild', 'Con')">Thêm Con</div>
              <div class="list-group-item" @click="openModalAddMemberFromList()">Thêm mối quan hệ từ Danh Sách</div>
              <div class="list-group-item" @click="openCfDelModal('removeMember', null, TitleModal)">Xóa thành viên (*)</div>
              <div class="list-group-item feature-overview">Các chức năng Khác</div>
              <div class="list-group-item" @click="openCfDelModal('SetPaternalAncestor', null, TitleModal)">Đặt làm cụ tổ</div>
              <div v-for="list in parentRelationship" :key="list.id" @click="openCfDelModal('LinkRelationship', list.id, list.name)" class="list-group-item">Nối mối quan hệ với {{ list.name }}</div>
            </div>
          </div>
          <div class="mdl-footer"></div>
        </div>
      </modal>
    </div>

    <!-- Xem các mối quan hệ -->
    <div class="view-relas-container">
      <modal name="view-relas-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">{{ TitleModal }}</div>
            <div class="mdl-close" @click="closeModalRelationship()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body" style="overflow-x: hidden;">
            <div class="view-relas-body">
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
                      <button class="btn btn-secondary" @click.stop="openCfDelModal('removeRelationship', ResultRelationship.Father.MemberID, ResultRelationship.Father.MemberName, 'RemoveParent')">Hủy mối quan hệ</button>
                    </td>
                  </tr>
                  <tr v-if="ResultRelationship.Mother" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Mother.MemberID)">
                    <td style="text-align: center;">{{ ResultRelationship.Mother.MemberName }}</td>
                    <td style="text-align: center;">{{ ResultRelationship.Mother.Male == 1 ? "Nam" : "Nữ" }}</td>
                    <td style="text-align: center;">{{ formatDate(ResultRelationship.Mother.Dob) }}</td>
                    <td style="text-align: center;">Mẹ</td>
                    <td style="text-align: center;">
                      <button class="btn btn-secondary" @click.stop="openCfDelModal('removeRelationship', ResultRelationship.Mother.MemberID, ResultRelationship.Mother.MemberName, 'RemoveParent')">Hủy mối quan hệ</button>
                    </td>
                  </tr>
                  <tr v-for="hus in ResultRelationship.Husband" :key="hus.MemberID" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Husband.MemberID)">
                    <td style="text-align: center;">{{ hus.MemberName }}</td>
                    <td style="text-align: center;">Nam</td>
                    <td style="text-align: center;">{{ formatDate(hus.Dob) }}</td>
                    <td style="text-align: center;">Chồng</td>
                    <td style="text-align: center;">
                      <button class="btn btn-secondary" @click.stop="openCfDelModal('removeRelationship', hus.MemberID, hus.MemberName, 'RemoveMarried')">Hủy mối quan hệ</button>
                    </td>
                  </tr>
                  <tr v-for="Wife in ResultRelationship.Wife" :key="Wife.MemberID" class="headlist-item headlist-table-item" @click="getInforMember(ResultRelationship.Wife.MemberID)">
                    <td style="text-align: center;">{{ Wife.MemberName }}</td>
                    <td style="text-align: center;">Nữ</td>
                    <td style="text-align: center;">{{ formatDate(Wife.Dob) }}</td>
                    <td style="text-align: center;">Vợ</td>
                    <td style="text-align: center;">
                      <button class="btn btn-secondary" @click.stop="openCfDelModal('removeRelationship', Wife.MemberID, Wife.MemberName, 'RemoveMarried')">Hủy mối quan hệ</button>
                    </td>
                  </tr>
                  <tr v-for="(c, index) in ResultRelationship.child" :key="index" class="headlist-item headlist-table-item" @click="getInforMember(c.MemberID)">
                    <td style="text-align: center;">{{ c.MemberName }}</td>
                    <td style="text-align: center;">{{ c.Male == 1 ? "Nam" : "Nữ" }}</td>
                    <td style="text-align: center;">{{ formatDate(c.Dob) }}</td>
                    <td style="text-align: center;">Con</td>
                    <td style="text-align: center;">
                      <button class="btn btn-secondary" @click.stop="openCfDelModal('removeRelationship', c.MemberID, c.MemberName, 'RemoveChild')">Hủy mối quan hệ</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="mdl-footer">
            <div class="h-100 d-flex align-items-center justify-content-end">
              <div class="pe-2">
                <button @click="closeModalRelationship()" type="button" class="btn btn-secondary mt-0">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Thông báo -->
    <div class="send-noti-container">
      <modal name="send-noti-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">Thông báo tới thành viên</div>
            <div class="mdl-close" @click="closeNotiModal()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body">
            <div class="d-flex flex-row position-relative h-100" style="overflow: hidden;">
              <div class="col-3 h-100" style="display: grid; grid-template-rows: 7% 7% 7% 79%;">
                <div class="position-relative d-flex">
                  <label for="text-search" style="position: absolute; inset: 12px;">
                    <svg class="text-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                  </label>
                  <div class="w-100" style="padding: 8px;">
                    <input v-model="searchKeyword" class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" @change="searchMember()" />
                  </div>
                </div>
                <div class="position-relative d-flex">
                  <div v-if="numberDeath != nodes.length" class="d-flex flex-row align-items-center p-2">
                    <input v-model="checkAll" type="checkbox" class="m-0 form-check-input" @change="toggleSelectAll()" />
                    <div style="padding-left: 8px">Chọn tất cả mọi người</div>
                  </div>
                </div>
                <div class="position-relative d-flex">
                  <div v-if="numberDeath != nodes.length" class="d-flex flex-row align-items-center p-2">
                    <input v-model="checkWithFilter" type="checkbox" class="m-0 form-check-input" @change="toggleSelectWithFilter()" />
                    <div style="padding-left: 8px">Chọn theo bộ lọc</div>
                  </div>
                </div>
                <div class="h-100" style="overflow-y: auto;">
                  <div class="d-flex align-items-center justify-content-center" style="height: 10%" v-for="(n, index) in ListMemberCanSendMessage" :key="n.id">
                    <div v-if="n.isDead != 1" :tabindex="index" class="send-noti-mdl-member d-flex flex-row align-items-center px-2" :class="{ chosen: ListPhoneToSendMessage.includes(n.MemberID) }" @click="toggleSelection(n.MemberID)">
                      <div>
                        <svg class="send-noti-mdl-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                          <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                        </svg>
                      </div>
                      <div class="d-flex justify-content-center w-100">{{ n.MemberName }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-9 h-100 position-relative" style="background: #ebebeb;">
                <div class="position-absolute w-100 d-flex flex-column h-100" style="top: 0; height: 90%;">
                  <div class="d-flex flex-row" style="background-color: #FFFFFF; height: 8%;">
                    <div @click="selectSMS()" :class="{ notiSelected: smsSelected }" class="col-6 d-flex align-items-center justify-content-center" style="border-radius: 0 0.375rem 0 0; cursor: pointer;">SMS ({{remainingSMS}})</div>
                    <div @click="selectEmail()" :class="{ enotiSelected: emailSelected }" class="col-6 d-flex align-items-center justify-content-center" style="border-radius: 0.375rem 0 0 0; cursor: pointer;">Email ({{remainingEmail}})</div>
                  </div>
                  <div class="pt-2" style="height: 92%; background: #fff">
                    <div style="overflow-y: auto; height: 100%;">
                      <div v-if="emailSelected" class="d-flex flex-column">
                        <div style="cursor: pointer;" v-for="e in ListHistoryEmail" :key="e.id" class="sent-mail d-flex flex-row" @click="getInforEmail(e)">
                          <div class="col-3 d-flex align-items-center ellipsis-text" style="padding-left: 8px; margin: auto;">Chủ đề: {{ e.EmailSubject }}</div>
                          <div class="col-6 h-100 d-flex align-items-center position-relative">
                            <div class="mail-content-prev">{{ e.EmailContent }}</div>
                          </div>
                          <div class="col-3 d-flex align-items-center" style="justify-content: end; padding-right: 8px;">{{ formatDate(e.EmailDate) }}</div>
                        </div>
                      </div>
                      <div v-if="smsSelected" class="d-flex flex-column">
                        <div v-for="m in ListMessage" :key="m.id" class="d-flex flex-row justify-content-end">
                          <div class="position-relative sent-sms">
                            <div>{{ m.NotificationContent }}</div>
                            <div class="position-absolute sent-time">{{ formatDate(m.NotificationDate) }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="position-absolute w-100" style="bottom: 0; height: 8%">
                  <div v-if="smsSelected" class="h-100 w-100 px-3 py-2 d-flex flex-row">
                    <div style="flex-grow: 1;">
                      <input type="text" class="h-100 w-100 form-control" placeholder="..." v-model="contentMessage" />
                    </div>
                    <div class="d-flex align-items-center ps-2" style="cursor: pointer;" @click="sendMessageToMember()">
                      <svg class="noti-send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                      </svg>
                    </div>
                  </div>
                  <div v-if="emailSelected" class="h-100 w-100 btn px-3 d-flex justify-content-end">
                    <div @click="expandCreateEmail = !expandCreateEmail" class="btn btn-primary px-2 py-1 d-flex align-items-center">Tạo email mới</div>
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
                      <input v-model="subjectEmail" type="text" class="mail-topic w-100 p-2" placeholder="Chủ đề email" />
                    </div>
                    <div class="create-mail-content px-2 w-100">
                      <textarea v-model="contentEmail" style="resize: none; outline: none; border: none;" class="h-100 w-100 p-2" placeholder="Viết gì đó..."></textarea>
                    </div>
                    <div class="create-mail-footer d-flex flex-row px-3 py-2 w-100" style="justify-content: end;">
                      <div class="d-flex flex-row" @click="sendEmailToMember()">
                        <div style="border-radius: 50% 0 0 50%; background: #007bff; width: 25px;"></div>
                        <div class="btn d-flex align-items-center justify-content-center" style="padding: 4px 12px; background: #007bff; color: #FFFFFF; border-radius: 0; outline: none; border: none;">Gửi</div>
                        <div style="border-radius: 0 50% 50% 0; background: #007bff; width: 25px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="inforEmail" class="col-9 email-detail position-absolute" style="bottom: 0; right: 0;" :class="{ expand: emailDetail }">
                <div class="create-mail-title d-flex align-items-center justify-content-center position-relative">
                  <div>{{ inforEmail.EmailSubject }}</div>
                  <div class="create-mail-close position-absolute" @click="closeGetInforEmail()">
                    <div class="position-relative h-100 w-100">
                      <svg class="create-mail-close-icon position-absolute" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="create-mail-content p-4 w-100">{{ inforEmail.EmailContent }}</div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Xác đinh quan hệ giữa 2 thành viên -->
    <div class="relation-container">
      <modal name="relation-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">Xác định mối quan hệ giữa 2 thành viên</div>
            <div class="mdl-close" @click="closeCompareModal()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body">
            <div class="relation-body" style="flex-grow: 1; background-color: #FFFFFF;">
              <div class="col-6">
                <div class="h-100 d-flex flex-column p-2" style="background-color: #FFFFFF; border-radius: 0.375rem;">
                  <div class="d-flex flex-row pb-2">
                    <div class="h-100 col-4" style="background-color: gray; border-radius: 0.375rem;">
                      <img style="width: 100%; height: 100%" :src="objCompareMember1.img" alt />
                    </div>
                    <div class="d-flex flex-column" style="flex-grow: 1; padding-left: 8px;">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember1.name" disabled />
                      <div class="d-flex flex-row pt-2">
                        <div class="col-6" style="padding-right: 4px">
                          <input type="text" class="compare-modal-item form-control" :value="objCompareMember1.gender" disabled />
                        </div>
                        <div class="col-6" style="padding-left: 4px">
                          <input type="text" class="compare-modal-item form-control" :value="'Đời ' + objCompareMember1.generation" disabled />
                        </div>
                      </div>
                      <div class="pt-2">
                        <input type="text" class="compare-modal-item form-control" :value="'Ngày Sinh: ' + (objCompareMember1.dob ? objCompareMember1.dob : 'không rõ')" disabled />
                      </div>
                      <div class="pt-2">
                        <input type="text" class="compare-modal-item form-control" :value="'Ngày Mất: ' + (objCompareMember1.dod ? objCompareMember1.dod : 'không rõ')" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-column pt-2" style="flex-grow: 1;">
                    <div class="compare-modal-item">
                      <input type="text" class="w-100 form-control" :value="resultCompare1 !== undefined ? 'Mối quan hệ: ' + resultCompare1 : 'Không xác định'" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="h-100 d-flex flex-column p-2" style="background-color: #FFFFFF; border-radius: 0.375rem;">
                  <div class="d-flex flex-row pb-2">
                    <div class="h-100 col-4" style="background-color: gray; border-radius: 0.375rem;">
                      <img style="width: 100%; height: 100%" :src="objCompareMember2.img" alt />
                    </div>
                    <div class="d-flex flex-column" style="flex-grow: 1; padding-left: 8px;">
                      <input type="text" class="compare-modal-item form-control" :value="objCompareMember2.name" disabled />
                      <div class="d-flex flex-row pt-2">
                        <div class="col-6" style="padding-right: 4px">
                          <input type="text" class="compare-modal-item form-control" :value="objCompareMember2.gender" disabled />
                        </div>
                        <div class="col-6" style="padding-left: 4px">
                          <input type="text" class="compare-modal-item form-control" :value="'Đời ' + objCompareMember2.generation" disabled />
                        </div>
                      </div>
                      <div class="pt-2">
                        <input type="text" class="compare-modal-item form-control" :value="'Ngày Sinh: ' + (objCompareMember2.dob ? objCompareMember2.dob : 'không rõ')" disabled />
                      </div>
                      <div class="pt-2">
                        <input type="text" class="compare-modal-item form-control" :value="'Ngày Mất: ' + (objCompareMember2.dod ? objCompareMember2.dod : 'không rõ')" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="d-flex flex-column pt-2" style="flex-grow: 1;">
                    <div class="compare-modal-item">
                      <input type="text" class="w-100 form-control" :value="resultCompare2 !== undefined ? 'Mối quan hệ: ' + resultCompare2 : 'Mối quan hệ: Không xác định'" disabled />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Thêm mối quan hệ từ danh sách -->
    <div class="add-relation-container">
      <modal name="add-relation-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">Thêm {{ TitleModal }} Từ Danh Sách</div>
            <div class="mdl-close" @click="closeModalAddMemberFromList()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body">
            <div class="add-relation-body">
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
                      <td style="text-align: center;">{{ index + 1 }}</td>
                      <td style="text-align: center;">{{ m.MemberName }}</td>
                      <td style="text-align: center;">{{ m.Male === 1 ? 'Nam' : 'Nữ' }}</td>
                      <td style="text-align: center;">{{ formatDate(m.Dob) }}</td>
                      <td style="text-align: center;">
                        <select v-model="m.relationship" class="form-control" style="text-align: center; width: 150px; margin: auto">
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
            </div>
          </div>
          <div class="mdl-footer">
            <div class="h-100 d-flex align-items-center justify-content-end">
              <div class="pe-2">
                <button @click="addMemberFromList()" type="button" class="btn btn-primary mt-0">Thêm</button>
              </div>
              <div class="pe-2">
                <button @click="closeModalAddMemberFromList()" type="button" class="btn btn-secondary mt-0">Đóng</button>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <!-- Modal member -->
    <div class="view-member-container">
      <modal name="view-member-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold';">{{ TitleModal }}</div>
            <div class="mdl-close" @click="closeMemberModal()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body">
            <div class="view-member-body" style="padding: 0; height: 100%;">
              <div class="col-2 select-menu">
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
              <div class="col-10 h-100" style="padding-top: 15px" v-if="extendedInfo">
                <div class="h-100 d-flex flex-row">
                  <div v-if="isEdit" class="col-4 ps-2 d-flex align-items-center justify-content-center" style="height: 50%;">
                    <img id="myImage" @load="getImageSize" style="width:100%;" :class="{ fitHeight: heightLarger }" v-if="avatarSrc" :src="avatarSrc" alt="Avatar" @click="triggerFileInputClick()" />
                    <div v-else style="fill: #000000; height: 100%; width: 100%;">
                      <div @click="triggerFileInputClick()" class="w-100 h-100 position-relative" style="border: 1px dashed #7a95cd; border-radius: 0.375rem; cursor: pointer;">
                        <div style="width: 15%; height: 15%; position: absolute; inset: 0; margin: auto;">
                          <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 448 512">
                            <path opacity="1" fill="#7a95cd" d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
                          </svg>
                        </div>
                        <div style="color: #7a95cd; position: absolute; inset: 45% 0 0 0; margin: auto; height: fit-content; width: fit-content;">Ảnh chân dung</div>
                      </div>
                    </div>

                    <div class="form-group" style="display: none">
                      <label style="margin-bottom:10px" v-if="objMemberInfor.Image" for="imageUpload">Thay đổi ảnh</label>
                      <label style="margin-bottom:10px" v-else for="imageUpload">Tải ảnh lên</label>
                      <input ref="fileInputRef" type="file" class="form-control input-file" id="imageUpload" accept="image/*" @change="updateAvatar($event)" />
                    </div>
                  </div>
                  <div class="w-100 px-2" style="display: grid; grid-template-rows: 8% 8% 8% 8% 8% 15% 8% 8% 29%">
                    <div class="pb-2" style="position: relative;">
                      <input v-model="objMemberInfor.MemberName" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.MemberName }">Tên thành viên đầy đủ</label>
                    </div>
                    <div class="pb-2" style="display:flex">
                      <div class="pe-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberInfor.NickName" type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.NickName }">Tên thường gọi</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-if="objMemberInfor.FatherID != null && action == null">
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control modal-item" placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con thứ</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-else-if="objMemberInfor.FatherID == null && action == null && objMemberInfor.MarriageNumber != null && objMemberInfor.MotherID == null">
                        <input v-model="objMemberInfor.MarriageNumber" type="number" min="0" max="20" class="form-control modal-item" disabled placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.MarriageNumber }">{{ objMemberInfor.Male == 1 ? 'Chồng thứ' : 'Vợ thứ' }}</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-else-if="action == 'AddChild'">
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control modal-item" placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con thứ</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-else-if="action == 'AddMarriage'">
                        <input v-model="objMemberInfor.MarriageNumber" type="number" min="0" max="20" class="form-control modal-item" disabled placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.MarriageNumber }">{{ isFather == false ? 'Chồng thứ' : 'Vợ thứ' }}</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-else-if="action == 'AddParent'">
                        <input v-model="objMemberInfor.BirthOrder" disabled type="number" min="0" class="form-control modal-item" placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con thứ</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%;" v-else>
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" max="20" class="form-control modal-item" placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con thứ</label>
                      </div>
                    </div>
                    <div class="pb-2" style="display:flex">
                      <div class="pe-1" style="position: relative; width: 50%;">
                        <select v-model="objMemberInfor.Male" class="form-select modal-item" v-if="isFather == true">
                          <option value="1">Nam</option>
                          <option value="0" selected>Nữ</option>
                        </select>
                        <select v-model="objMemberInfor.Male" class="form-select modal-item" v-else>
                          <option value="1" selected>Nam</option>
                          <option value="0">Nữ</option>
                        </select>
                        <label class="form-label" for="select">Giới Tính</label>
                      </div>
                      <div class="ps-1" style="position: relative; width: 50%;">
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
                    <div class="pb-2" style="display:flex">
                      <div class="pe-1" style="position: relative; width: 50%;">
                        <select v-model="objMemberInfor.NationalityID" class="form-select modal-item">
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">{{ nation.NationalityName }}</option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div class="ps-1" style="position: relative; width: 50%;">
                        <select v-model="objMemberInfor.ReligionID" class="form-select modal-item">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">{{ religion.ReligionName }}</option>
                        </select>
                        <label class="form-label-number" for="select">Tôn Giáo</label>
                      </div>
                    </div>
                    <div class="pb-2" style="position: relative;">
                      <input v-model="objMemberInfor.Origin" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.Origin }">Nguyên Quán</label>
                    </div>
                    <div class="form-group">
                      <div style="height: 40%; font-family: 'QuicksandBold';">Ngày Sinh (Hệ thống sẽ tự đổi từ ngày dương lịch sang âm lịch và ngược lại)</div>
                      <div class="pb-2" style="height: 60%; display: flex;">
                        <div class="pe-1" style="position: relative; width: 50%;">
                          <input v-model="objMemberInfor.Dob" type="date" class="form-control modal-item" placeholder @change="convertSolarToLunar('live')" />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div class="ps-1" style="position: relative;width: 50%;">
                          <input v-model="objMemberInfor.LunarDob" type="date" class="form-control modal-item" placeholder @change="convertLunarToSolar('live')" />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                    </div>
                    <div class="pb-2" style="position: relative;">
                      <input v-model="objMemberInfor.BirthPlace" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.BirthPlace }">Nơi sinh</label>
                    </div>
                    <div class="form-check form-check-inline" style="margin: auto 0;">
                      <input v-model="IsDead" type="checkbox" class="form-check-input" id="lostCheckbox" />
                      <label style="font-size: 14px; margin-top: 7px;" class="form-check-label" for="lostCheckbox">Đã mất</label>
                    </div>
                    <div class="form-group pb-2" v-if="IsDead == 1">
                      <div style="height: 20%; font-family: 'QuicksandBold';">Ngày Mất (*)</div>
                      <div class="pb-2" style="display:flex; height: 28%;">
                        <div class="pe-1" style="position: relative; width: 50%;">
                          <input v-model="objMemberInfor.Dod" type="date" class="form-control modal-item" placeholder @change="convertSolarToLunar('died')" />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div class="ps-1" style="position: relative;width: 50%;">
                          <input v-model="objMemberInfor.LunarDod" type="date" class="form-control modal-item" placeholder @change="convertLunarToSolar('died')" />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                      <div class="pb-2" style="position: relative; height: 26%;">
                        <input v-model="objMemberInfor.PlaceOfDeath" type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Nơi Mất</label>
                      </div>
                      <div class="pb-2" style="position: relative; height: 26%;">
                        <input v-model="objMemberInfor.GraveSite" type="text" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Mộ Phần</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-10" style="padding-top: 15px" v-else-if="extendedContact">
                <div class="row h-100 px-2" style="display: grid; grid-template-rows: 8% 8% 8% 8% 8%;">
                  <div style="display:flex">
                    <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                      <select v-model="selectCityMember" class="form-select modal-item" @change="getListDistrictMember()">
                        <option :value="null" selected>Thành Phố/Tỉnh</option>
                        <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
                      </select>
                      <label class="form-label" for="select">Địa Chỉ (Thành Phố/Tỉnh)</label>
                    </div>
                    <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                      <select v-model="selectDistrictMember" class="form-select modal-item">
                        <option :value="null" selected>Quận/Huyện</option>
                        <option v-for="d in ListDistrictMember" :key="d.id" :value="d.DistrictName">{{ d.DistrictName }}</option>
                      </select>
                      <label class="form-label" for="select">Địa Chỉ (Quận/Huyện)</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                      <VuePhoneNumberInput ref="phoneNumberInput" v-model="objMemberContact.Phone" v-bind="props"></VuePhoneNumberInput>
                    </div>
                    <div class="pb-2 ps-1" style="position: relative;width: 50%;">
                      <input v-model="objMemberContact.Email" type="email" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberContact.Email }">Email</label>
                    </div>
                  </div>
                  <div class="pb-2" style="position: relative;">
                    <input v-model="objMemberContact.FacebookUrl" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input" :class="{ 'active': objMemberContact.FacebookUrl }">Facebook</label>
                  </div>
                  <div class="pb-2" style="position: relative;">
                    <input v-model="objMemberContact.Zalo" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input" :class="{ 'active': objMemberContact.Zalo }">Zalo</label>
                  </div>
                </div>
              </div>
              <div class="col-10" style="padding-top: 15px" v-else-if="extendedJob">
                <div class="row h-100 px-2" style="display: grid; grid-template-rows: 8% 8% 13% 8% 8% 55%;">
                  <div style="display: flex">
                    <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                      <input v-model="objMemberJob.Organization" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Organization }">Tên Cơ Quan</label>
                    </div>
                    <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                      <input v-model="objMemberJob.OrganizationAddress" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" min="0" for="input" :class="{ 'active': objMemberJob.OrganizationAddress }">Địa Chỉ</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                      <input v-model="objMemberJob.Role" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Role }">Vị trí công tác</label>
                    </div>
                    <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                      <input v-model="objMemberJob.JobName" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input" :class="{ 'active': objMemberJob.JobName }">nghề nghiệp</label>
                    </div>
                  </div>
                  <div class="form-group">
                    <div class="pb-2" style="height: 40%; font-family: 'QuicksandBold';">Thời gian công tác</div>
                    <div style="display:flex; height: 60%;">
                      <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberJob.StartDate" type="date" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Từ ngày</label>
                      </div>
                      <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberJob.EndDate" type="date" class="form-control modal-item" placeholder />
                        <label class="form-label-number" min="0" for="input">Đến ngày</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="form-group d-flex align-items-center" role="group">
                      <button type="button" class="btn btn-primary" @click="addNewJobMember()" style="margin-right:10px">Thêm</button>
                      <button type="button" class="btn btn-info mr-1" @click="updateJobMember()" style="margin-right:10px">Sửa</button>
                      <button type="button" class="btn btn-danger mr-1" @click="removeJobMember()" style="margin-right:10px">Xóa</button>
                    </div>
                  </div>
                  <div class="form-group pb-2" style="margin-top: 13px; padding-right: 22px">
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
              <div class="col-10" style="padding-top: 15px" v-else-if="extendedEdu">
                <div class="row h-100 px-2" style="display: grid; grid-template-rows: 8% 8% 13% 8% 8% 55%;">
                  <div class="pb-2" style="position: relative;">
                    <input v-model="objMemberEducation.School" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 20px;" class="form-label" for="input" :class="{ 'active': objMemberEducation.School }">Tên trường</label>
                  </div>
                  <div class="pb-2" style="position: relative;">
                    <input v-model="objMemberEducation.Description" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 20px;" class="form-label" for="input" :class="{ 'active': objMemberEducation.Description }">Mô tả</label>
                  </div>
                  <div class="form-group">
                    <div class="pb-2" style="height: 40%; font-family: 'QuicksandBold';">Thời gian học tập</div>
                    <div style="display: flex; height: 60%;">
                      <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberEducation.StartDate" type="date" class="form-control modal-item" placeholder />
                        <label class="form-label" for="input">Từ ngày</label>
                      </div>
                      <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberEducation.EndDate" type="date" class="form-control modal-item" placeholder />
                        <label class="form-label-number" min="0" for="input">Đến ngày</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="form-group d-flex align-items-center" role="group">
                      <button type="button" class="btn btn-primary" @click="addNewEducationMember()" style="margin-right:10px">Thêm</button>
                      <button type="button" class="btn btn-info mr-1" @click="updateEducationMember()" style="margin-right:10px">Sửa</button>
                      <button type="button" class="btn btn-danger mr-1" @click="removeEducation()" style="margin-right:10px">Xóa</button>
                    </div>
                  </div>
                  <div class="form-group" style="margin-top: 13px; padding-right: 22px">
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
              <div class="col-10" style="padding-top: 15px" v-else>
                <div class="form-group px-2" style>
                  <textarea v-model="objMemberInfor.Note" style="min-height: 300px; overflow-y: auto;" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder="Ghi Chú"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="mdl-footer">
            <div class="h-100 d-flex align-items-center justify-content-end">
              <div v-if="isAdd && memberRole != 3" class="pe-2">
                <button type="button" class="btn btn-primary mr-2" @click="addMember()">Thêm</button>
              </div>
              <div v-else-if="isEdit && memberRole != 3" class="pe-2">
                <button type="button" class="btn btn-primary mr-2" @click="updateInformation()">Sửa</button>
              </div>
              <div v-if="nodes.length && memberRole != 3" class="pe-2">
                <button style="margin-left:10px" type="button" class="btn btn-danger" @click="openCfDelModal('removeMember', null, objMemberInfor.MemberName)">Xóa thành viên</button>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <div class="cfdel-container">
      <modal name="cfdel-mdl">
        <div class="cfdel-mdl-container">
          <div class="mdl-title" style="background-color: rgb(255, 8, 0);">
            <div class="text-white" style="font-family: 'QuicksandBold';">Quan trọng</div>
          </div>
          <div class="mdl-body">
            <div class="cfdel-body">
              <div class="d-flex align-items-center justify-content-center">{{ TitleConfirm }}</div>
              <div class="d-flex align-items-center justify-content-evenly">
                <div v-if="isRemoveRelationship == 'removeRelationship'" class="p-2">
                  <div class="btn text-white" @click="removeRelationship()" style="background-color: rgb(255, 8, 0);">Có</div>
                </div>
                <div v-else-if="isRemoveRelationship == 'removeMember'" class="p-2">
                  <div class="btn bg-danger text-white" @click="removeMember()">Có</div>
                </div>
                <div v-else-if="isRemoveRelationship == 'LinkRelationship'" class="p-2">
                  <div class="btn bg-danger text-white" @click="linkRelationship()">Có</div>
                </div>
                <div v-else-if="isRemoveRelationship == 'SetPaternalAncestor'" class="p-2">
                  <div class="btn bg-danger text-white" @click="setPaternalAncestor()">Có</div>
                </div>
                <div v-else-if="isRemoveRelationship == 'backUp'" class="p-2">
                  <div class="btn bg-danger text-white" @click="ImportMember()">Có</div>
                </div>
                <div class="p-2">
                  <div class="btn bg-primary text-white" @click="closeCfDelModal()">Không</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
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
      props: {
        clearable: true,
        fetchCountry: true,
        preferredCountries: ["US", "GB"],
        noExample: false,
        translations: {
          countrySelectorLabel: "Country code",
          countrySelectorError: "Error",
          phoneNumberLabel: "Nhập số điện thoại",
          example: "Example:",
        },
      },
      idParent: null,
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
      ListUnspecifiedMembers: [],
      CurrentIdToLinkRelationship: null,

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
      checkWithFilter: false,
      newIdMember: null,
      CurrentIdMember: null,
      ListHistoryEmail: null,
      remainingSMS: 0,
      remainingEmail: 0,

      isRemoveRelationship: false,
      TitleConfirm: null,

      subjectEmail: null,
      contentEmail: null,

      generationMember: null,
      CodeID: null,
      idPaternalAncestor: null,
      IsDead: 0,
      ListMemberJob: null,
      ListMemberEducation: null,
      memberRole: null,
      ListMarriedMember: null,

      darkMode: true,
      emailDetail: false,

      expandSidebar: true,

      objMemberInfor: {
        MarriageNumber: 1,
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
        PlaceOfDeath: null,
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
      inforEmail: null,
      objMember: {},
      TitleModal: null,
      ListNationality: null,
      ListReligion: null,
      nodes: [],
      formData: null,
      isFather: null,

      extendedInfo: true,
      extendedContact: false,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,
      idFamilyHead: null,

      canAddFather: true,
      canAddMother: true,
      canAddhusband: true,
      canAddWife: true,
      ListMemberCanSendMessage: null,

      lastClickedNodeId: null,
      isCompare: false,
      objCompareMember1: {},
      objCompareMember2: {},
      displayList: false,
      expandAddRelationship: false,
      emailSelected: false,
      smsSelected: true,
      expandCreateEmail: false,
      expandEventList: false,
      expandEventListSMS: false,
      advancedFilterDown: false,
      selectNodeHighLightCompare: [],
      resultCompare1: null,
      resultCompare2: null,
      selectedRowIndex: null,

      nodeLength: null,
      CoordinatesNode: null,
      isUpdateAvatar: false,
      fileBackup: null,

      selectedNodes: [],
      notSelectedNodes: [],
      selectedNodesCompare: [],
      nodeRightClickHighLight: null,

      helpNoti: false,
      helpCompare: false,
      helpExist: false,
      helpNonExist: false,
      helpTree: false,
      parentRelationship: [],

      idNodeWatching: null,

      numberDeath: 0,
      listMember: [],

      heightLarger: null,
      checkUpdate: false,
    };
  },
  methods: {
    //lưu tùng lâm
    mytree: function (domEl, x) {
      FamilyTree.templates.tommy_male.img_0 =
        '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="10" y="20" width="70" height="70"></image>';
      FamilyTree.templates.tommy_female.img_0 =
        '<image preserveAspectRatio="xMidYMid slice" clip-path="url(#ulaImg)" xlink:href="{val}" x="10" y="20" width="70" height="70"></image>';

      FamilyTree.templates.tommy_male.field_0 =
        '<text class="field_0" style="font-size: 16px;" fill="#ffffff" x="90" y="40">{val}</text>';
      FamilyTree.templates.tommy_male.field_1 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="90" y="60">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="90" y="80">Đời: {val}</text>';

      FamilyTree.templates.tommy_female.field_0 =
        '<text class="field_0" style="font-size: 16px;" fill="#ffffff" x="90" y="40">{val}</text>';
      FamilyTree.templates.tommy_female.field_1 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="90" y="60">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_female.field_2 =
        '<text class="field_4" style="font-size: 14px;" fill="#ffffff" x="90" y="80">Đời: {val}</text>';

      var iconGG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tree-fill" viewBox="0 0 16 16">
  <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5z"/>
</svg>`;
      FamilyTree.templates.tommy_male.isGG =
        '<g transform="translate(220,7)";>' + iconGG + "</g>";
      var iconFH =
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16"><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>';
      FamilyTree.templates.tommy_male.isFH =
        '<g transform="translate(220,7)";>' + iconFH + "</g>";

      FamilyTree.elements._textbox = FamilyTree.elements.textbox;
      FamilyTree.elements.textbox = function (param1, param2, param3) {
        if (param2 && param2.label == FamilyTree.SEARCH_PLACEHOLDER) {
          return {
            html: `<input type="text" class="form-control" id="txt_search" name="txt_search" placeholder="Tìm kiếm thành viên"> <button class="btn-x" data-input-btn="">X</button>`,
            id: "txt_search",
          };
        } else {
          return FamilyTree.elements._textbox(param1, param2, param3);
        }
      };
      this.family = new FamilyTree(domEl, {
        nodes: x,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
          field_1: "dob",
          field_2: "generation",
          isGG: "isGG",
          isFH: "isFH",
        },
        sticky: false,
        nodeMouseClick: FamilyTree.action.none,
      });
      const self = this;
      this.family.onInit(() => {
        this.family.load(this.nodes);
      });

      this.CoordinatesNode = this.getViewBox();
      this.family.onRedraw(() => {
        var nodeElement;
        if (this.selectedNodes.length != 0) {
          for (let i = 0; i < this.selectedNodes.length; i++) {
            nodeElement = document.querySelector(
              '[data-n-id="' + this.selectedNodes[i] + '"]'
            );
            if (nodeElement != null) {
              nodeElement.classList.add("selected");
            }
          }
        }
        if (this.selectedNodesCompare.length != 0) {
          for (let i = 0; i < this.selectedNodesCompare.length; i++) {
            nodeElement = document.querySelector(
              '[data-n-id="' + this.selectedNodesCompare[i] + '"]'
            );
            if (nodeElement != null) {
              nodeElement.classList.add("selected-compare");
            }
          }
        }
        if (this.notSelectedNodes.length != 0) {
          for (let i = 0; i < this.notSelectedNodes.length; i++) {
            nodeElement = document.querySelector(
              '[data-n-id="' + this.notSelectedNodes[i] + '"]'
            );
            if (nodeElement != null) {
              nodeElement.classList.add("notselected");
            }
          }
        }
      });

      if (this.memberRole != 3) {
        this.family.onInit(function () {
          this.element.addEventListener(
            "contextmenu",
            function (ev) {
              let nodeElement = ev.target;
              if (nodeElement.hasAttribute("data-n-id") == false) {
                nodeElement = nodeElement.parentNode;
              }
              this.isFather = null;
              if (nodeElement && nodeElement.hasAttribute("data-n-id")) {
                let id = nodeElement.getAttribute("data-n-id");
                self.idNodeWatching = id;
                self.OnpenModal_SelectOption(id);
              }
            },
            false
          );
        });
      }
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
          this.isFather = null;
          this.getInforMember(arg.node.id);
        }
      });
    },

    getViewBox() {
      return this.family.getViewBox();
    },
    importData() {},
    //Nguyễn Lê Hùng
    BackUpdata() {
      let id = this.nodes.map((item) => item.id);
      console.log(id);
      HTTP.post("back-up", {
        memberIDs: id,
      })
        .then((response) => {
          if (response.data.success == true) {
            //Mở một window khác ở đây
            let newWindow = window.open(
              `https://giaphanguoiviet.com${response.data.data.fileName}`,
              "_blank"
            );
            if (newWindow) {
              this.NotificationsScuccess(response.data.message);
            } else {
              this.NotificationsDelete(
                "Không thể mở cửa sổ mới. Vui lòng kiểm tra cài đặt trình duyệt của bạn."
              );
            }
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch(() => {
          this.NotificationsDelete("Có lỗi hệ thống");
        });
    },
    //Nguyễn Lê Hùng
    getResultMember(id) {
      let objdata = {};
      let result = this.nodes.find((node) => node.id == id);

      objdata.img = result.img;

      objdata.name = result.name;
      objdata.gender = result.gender === "male" ? "Nam" : "Nữ";

      objdata.dob = result.dob;
      objdata.dod = result.dod;

      if (result.fid) {
        let resultFid = this.nodes.find((node) => node.id == result.fid);
        objdata.father = resultFid.name;
      }

      if (result.mid) {
        let resultMid = this.nodes.find((node) => node.id == result.mid);
        objdata.mother = resultMid.name;
      }
      objdata.generation = result.generation;

      return objdata;
    },
    //Nguyễn Lê Hùng
    compareMember(memberId1, memberId2) {
      this.selectNodeHighLightCompare = [];
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
          if (response.data.success == true) {
            this.resultCompare1 = response.data.data.result1;
            this.resultCompare2 = response.data.data.result2;
            this.$modal.show("relation-mdl");
            this.removeFromSelectedNodesCompare();
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    async setPaternalAncestor() {
      HTTP.post("setRole", {
        memberId: this.CurrentIdMember,
        CodeId: this.CodeID,
      })
        .then((respone) => {
          if (respone.data.success) {
            this.getListUnspecifiedMembers();
            this.getListMember();
            this.closeSelectModal();
            this.closeCfDelModal();
            this.NotificationsScuccess(respone.data.message);
            this.mytree(this.$refs.tree, this.nodes);
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch(() => {
          this.NotificationsDelete("Có lỗi hệ thống");
        });
    },
    //Nguyễn Lê Hùng
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
    //Nguyễn Lê Hùng
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
    //Nguyễn Lê Hùng
    formatDate(dateString) {
      if (dateString == null) {
        return null;
      }
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    //Nguyễn Lê Hùng
    takeDataMember() {
      this.CurrentIdMember = this.objMemberInfor.MemberID;
      this.generationMember = this.objMemberInfor.Generation;
      this.IsDead = this.objMemberInfor.IsDead;
    },
    //Nguyễn Lê Hùng
    updateStatusEvent() {
      try {
        HTTP.put("updateStatusEvent", {
          CodeID: this.CodeID,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              console.log("Update status event thành công");
            } else {
              console.log("Update status event thất bại");
            }
          })
          .catch(() => {
            this.NotificationsDelete("Có lỗi hệ thống");
          });
      } catch (error) {
        console.log(error);
      }
    },
    //Nguyễn Lê Hùng
    sendEmailToMember() {
      if (
        this.subjectEmail != null &&
        this.subjectEmail != "" &&
        this.contentEmail != null &&
        this.contentEmail != "" &&
        this.ListPhoneToSendMessage.length > 0
      ) {
        HTTP.post("send-email", {
          listID: this.ListPhoneToSendMessage,
          subject: this.subjectEmail,
          text: this.contentEmail,
          CodeID: this.CodeID,
        })
          .then((response) => {
            if (response.data.success == true) {
              this.subjectEmail = null;
              this.contentEmail = null;
              this.NotificationsScuccess("Gửi email thành công");
              this.expandCreateEmail = false;
              this.getListHistoryEmail();
            } else {
              this.NotificationsDelete(response.data.message);
            }
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
    getMaxMarriage(id) {
      let count = 0;
      console.log(id);
      for (let i = 0; i < this.nodes.length; i++) {
        let j = 0;
        while (j < this.nodes[i].pids.length) {
          if (this.nodes[i].pids[j] == id) {
            count++;
          }
          j++;
        }
      }
      return count + 1;
    },
    getListMemberToSendMessage() {
      try {
        console.log(this.CodeID);
        HTTP.get("listMemberMessage", {
          params: {
            CodeID: this.CodeID,
          },
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.ListMemberCanSendMessage = respone.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    //Nguyễn Lê Hùng
    sendMessageToMember() {
      if (
        this.contentMessage != null &&
        this.ListPhoneToSendMessage.length > 0 &&
        this.contentMessage != ""
      ) {
        HTTP.post("send-sms", {
          ListMemberID: this.ListPhoneToSendMessage,
          contentMessage: this.contentMessage,
          CodeID: this.CodeID,
        })
          .then(() => {
            this.contentMessage = null;
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

    //Nguyễn Lê Hùng
    searchMember() {
      HTTP.get("searchMemberSendMessage", {
        params: {
          CodeID: this.CodeID,
          keySearch: this.searchKeyword,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            console.log(response.data.data);
            this.ListMemberCanSendMessage = response.data.data;
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    toggleSelectAll() {
      this.ListPhoneToSendMessage = this.checkAll
        ? this.nodes.map((node) => node.id)
        : [];
    },
    //Nguyễn Lê Hùng
    toggleSelectWithFilter() {
      if (this.listFilterMember) {
        this.ListPhoneToSendMessage = this.checkWithFilter
          ? this.listFilterMember.map((node) => node.MemberID)
          : [];
      }
    },
    //Nguyễn Lê Hùng
    toggleSelection(id) {
      let index = this.ListPhoneToSendMessage.indexOf(id);
      if (index !== -1) {
        this.ListPhoneToSendMessage.splice(index, 1);
        this.checkAll = false;
      } else {
        this.ListPhoneToSendMessage.push(id);
      }
    },
    //Lưu tùng lâm
    convertLunarToSolar(type) {
      if (type == "died") {
        let LunarDod = new Date(this.objMemberInfor.LunarDod);
        let timezone = (0, getLocalTimezone)();
        const dod = convertLunar2Solar(
          LunarDod.getDate(),
          LunarDod.getMonth() + 1,
          LunarDod.getFullYear(),
          false,
          timezone
        );
        let month = dod.getMonth() + 1;
        let date = dod.getDate();
        if (month < 10) {
          month = "0" + (dod.getMonth() + 1);
        }
        if (date < 10) {
          date = "0" + dod.getDate();
        }
        this.$set(
          this.objMemberInfor,
          "Dod",
          "" + dod.getFullYear() + "-" + month + "-" + date
        );
      } else if (type == "live") {
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
      }
    },
    //Lưu tùng lâm
    convertSolarToLunar(type) {
      if (type == "live") {
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
      } else if (type == "died") {
        let Dod = new Date(this.objMemberInfor.Dod);
        let month = new LunarDate(Dod).getMonth();
        let date = new LunarDate(Dod).getDate();
        if (new LunarDate(Dod).getMonth() < 10) {
          month = "0" + new LunarDate(Dod).getMonth();
        }
        if (new LunarDate(Dod).getDate() < 10) {
          date = "0" + new LunarDate(Dod).getDate();
        }
        this.$set(
          this.objMemberInfor,
          "LunarDod",
          "" + new LunarDate(Dod).getYear() + "-" + month + "-" + date
        );
      }
    },
    //Nguyễn Lê Hùng
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
    //Nguyễn Lê Hùng
    getInforMember(id) {
      this.isAdd = false;
      this.isEdit = true;
      HTTP.get("InforMember", {
        params: {
          memberId: id,
        },
      })
        .then((response) => {
          this.selectCityMember = null;
          this.selectDistrictMember = null;
          this.objMember = response.data.data;
          console.log(id);
          console.log(this.objMember);
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
            console.log("avatarSrc: " + this.avatarSrc);
          }
          console.log("result: " + this.objMemberInfor.PlaceOfDeath);
          if (this.objMember.contact.length > 0) {
            this.objMemberContact = this.objMember.contact[0];
            console.log(this.objMemberContact);
            console.log(this.objMember.contact);
            if (
              this.objMemberContact.Address != undefined &&
              this.objMemberContact.Address != null
            ) {
              this.getAdressMember(this.objMemberContact.Address);
            }
          }
          if (response.data.data.MarriageNumber != null) {
            this.objMemberInfor.MarriageNumber =
              response.data.data.MarriageNumber;
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
      this.action = null;
      this.$modal.show("view-member-mdl");
      this.isEdit = true;
      this.selectedInfor();
      this.setDefauValueInModal();
    },
    //Nguyễn Lê Hùng
    refreshInputJobAndEducation() {
      this.objMemberJob = {};
      this.objMemberEducation = {};
    },
    //Nguyễn Lê Hùng
    removeJobMember() {
      HTTP.delete("removeJob", {
        params: {
          JobID: this.JobIDToUpdate,
        },
      })
        .then((response) => {
          if (response.data.success) {
            this.getListJobMember();
            this.NotificationsDelete(response.data.message);
            this.refreshInputJobAndEducation();
          }
        })
        .catch(() => {
          this.NotificationsDelete("Đã sảy ra lỗi, không thể xóa");
        });
    },
    //Nguyễn Lê Hùng
    removeMember() {
      HTTP.get("deleteContact", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success == false) {
            console.log("Xẩy ra lỗi khi xóa contact");
          }
        })
        .catch(() => {
          this.NotificationsDelete("Đã sảy ra lỗi, không thể xóa");
        });

      HTTP.get("RemoveListJob", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success == false) {
            console.log("Xẩy ra lỗi khi xóa Job");
          }
        })
        .catch((e) => {
          console.log(e);
        });

      HTTP.get("deleteListEducation", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success == false) {
            console.log("Xẩy ra lỗi khi xóa education");
          }
        })
        .catch((e) => {
          console.log(e);
        });

      HTTP.get("delete-member", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            // this.nodes.length = this.nodes.length - 1;
            this.removeFromSelectedNodes(this.CurrentIdMember);
            this.NotificationsScuccess(response.data.message);
            this.getListUnspecifiedMembers();
            this.$modal.hide("select-opts-mdl");
            this.$modal.hide("view-member-mdl");
            this.getListMember();
            this.getAllListMember();
            this.closeCfDelModal();
            this.getListMemberToSendMessage();
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    removeFromSelectedNodes(memberid) {
      var nodeElement;
      for (let i = 0; i < this.selectedNodes.length; i++) {
        if (this.selectedNodes[i] == memberid) {
          this.selectedNodes.splice(i, 1);
          nodeElement = document.querySelector(
            '[data-n-id="' + memberid + '"]'
          );
          if (nodeElement != null) {
            nodeElement.classList.remove("selected");
          }
        }
      }
    },
    removeFromSelectedNodesCompare() {
      var nodeElement;
      console.log(this.selectedNodesCompare);
      for (let i = 0; i < this.selectedNodesCompare.length; i++) {
        console.log(this.selectedNodesCompare[i]);

        nodeElement = document.querySelector(
          '[data-n-id="' + this.selectedNodesCompare[i] + '"]'
        );
        if (nodeElement != null) {
          nodeElement.classList.remove("selected-compare");
        }
      }
      this.selectedNodesCompare = [];
    },
    //Nguyễn Lê Hùng
    getListJobMember() {
      HTTP.get("getJob", {
        params: {
          MemberId: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success) {
            this.ListMemberJob = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListEducationMember() {
      console.log(this.CurrentIdMember);
      HTTP.get("education", {
        params: {
          memberId: this.CurrentIdMember,
        },
      })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.success) {
            this.ListMemberEducation = response.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Nguyễn Lê Hùng
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
        .then((response) => {
          if (response.data.success) {
            this.getListJobMember();
            this.NotificationsScuccess(response.data.message);
            this.refreshInputJobAndEducation();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //Nguyễn Lê Hùng
    addNewEducationMember() {
      HTTP.post("addEducation", {
        MemberID: this.CurrentIdMember,
        School: this.objMemberEducation.School,
        Description: this.objMemberEducation.Description,
        StartDate: this.objMemberEducation.StartDate,
        EndDate: this.objMemberEducation.EndDate,
      })
        .then((response) => {
          if (response.data.success) {
            this.getListEducationMember();
            this.NotificationsScuccess(response.data.message);
            this.refreshInputJobAndEducation();
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    setDefautAction() {
      this.CurrentIdMember = null;
      this.newIdMember = null;
      this.action = null;
    },
    //Nguyễn Lê Hùng
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
              this.setDefautAction();
              this.getListMember();
              this.getListUnspecifiedMembers();
              this.closeModalAddMemberFromList();
              this.getListMemberToSendMessage();
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    ImportMember() {
      let formData = new FormData();
      formData.append("xlsx", this.fileBackup);
      HTTP.post("import", formData)
        .then((respone) => {
          console.log(respone.data);
          if (respone.data.success) {
            this.NotificationsScuccess(respone.data.message);
            this.setDefautAction();
            this.getListMember();
            this.getListUnspecifiedMembers();
            this.closeModalAddMemberFromList();
            this.getListMemberToSendMessage();
            this.closeCfDelModal();
            this.fileBackup = null;
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getFileImportMember(event) {
      this.fileBackup = event.target.files[0];
      this.openCfDelModal("backUp");
    },
    //Nguyễn Lê Hùng
    updateAvatar(event) {
      if (this.memberRole != 3) {
        let formData = new FormData();
        this.isUpdateAvatar = true;
        let file = event.target.files[0];
        formData.append("Image", file);
        formData.append("MemberID", this.CurrentIdMember);
        HTTP.put("member-photo", formData)
          .then((response) => {
            if (response.data.success == true) {
              this.getListMember();
              this.NotificationsScuccess(response.data.message);
            } else {
              this.NotificationsScuccess(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });

        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.avatarSrc = e.target.result; // Cập nhật ảnh avatar bằng ảnh tải lên
          };
          reader.readAsDataURL(file);
        } else {
          this.avatarSrc = null;
        }
      }
    },
    getImageSize() {
      const img = document.getElementById("myImage");
      // Lấy kích thước của hình ảnh
      this.imgWidth = img.width;
      this.imgHeight = img.height;
      this.checkPhotoSize(this.imgWidth, this.imgHeight);
    },
    checkPhotoSize(width, height) {
      if (width > height) {
        this.heightLarger = false;
      } else {
        this.heightLarger = true;
      }
    },
    //Nguyễn Lê Hùng
    addMemberChild(FatherID, MotherID) {
      HTTP.post("add-child", {
        FatherID: FatherID,
        MotherID: MotherID,
        MemberName: this.objMemberInfor.MemberName,
        NickName: this.objMemberInfor.NickName,
        BirthOrder: this.objMemberInfor.BirthOrder,
        Origin: this.objMemberInfor.Origin,
        NationalityID: this.objMemberInfor.NationalityID,
        ReligionID: this.objMemberInfor.ReligionID,
        Dob: this.objMemberInfor.Dob,
        LunarDob: this.objMemberInfor.LunarDob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        Dod: this.objMemberInfor.Dod,
        LunarDod: this.objMemberInfor.LunarDod,
        PlaceOfDeath: this.objMemberInfor.PlaceOfDeath,
        GraveSite: this.objMemberInfor.GraveSite,
        Note: this.objMemberInfor.Note,
        CurrentGeneration: this.generationMember,
        BloodType: this.objMemberInfor.BloodType,
        Male: this.objMemberInfor.Male,
        CodeID: this.CodeID,
      })
        .then((response) => {
          if (response.data.success == true) {
            console.log("response: " + response.data.data);
            this.action = null;
            this.getAllListMember();
            this.isUpdateAvatar = false;
            this.$modal.hide("view-member-mdl");
            this.$modal.hide("select-opts-mdl");
            this.getListMember();
            this.NotificationsScuccess(response.data.message);
            this.getListMemberToSendMessage();
          } else {
            this.NotificationsDelete(response.data.message);
          }
          this.newIdMember = response.data.data.MemberID;
          console.log("newIdMember: " + this.newIdMember);
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
            })
              .then((response) => {
                if (response.data.success == true) {
                  //     this.setDefauValueInModal();
                  this.selectDistrictMember = null;
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addMemberMarried() {
      console.log(this.objMemberInfor.MarriageNumber);
      HTTP.post("add-marriage", {
        CurrentMemberID: this.CurrentIdMember,
        MemberName: this.objMemberInfor.MemberName,
        NickName: this.objMemberInfor.NickName,
        MarriageNumber: this.objMemberInfor.MarriageNumber,
        Origin: this.objMemberInfor.Origin,
        NationalityID: this.objMemberInfor.NationalityID,
        ReligionID: this.objMemberInfor.ReligionID,
        Dob: this.objMemberInfor.Dob,
        LunarDob: this.objMemberInfor.LunarDob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        Dod: this.objMemberInfor.Dod,
        LunarDod: this.objMemberInfor.LunarDod,
        PlaceOfDeath: this.objMemberInfor.PlaceOfDeath,
        GraveSite: this.objMemberInfor.GraveSite,
        Note: this.objMemberInfor.Note,
        CurrentGeneration: this.generationMember,
        BloodType: this.objMemberInfor.BloodType,
        Male: this.objMemberInfor.Male,
        CodeID: this.CodeID,
      })
        .then((response) => {
          if (this.action == "AddNormal") {
            this.getListUnspecifiedMembers();
          }
          if (response.data.success == true) {
            this.getAllListMember();
            this.isUpdateAvatar = false;
            this.action = null;
            this.$modal.hide("view-member-mdl");
            this.$modal.hide("select-opts-mdl");
            console.log("getlist");
            this.getListMember();
            this.NotificationsScuccess(response.data.message);
            this.getListMemberToSendMessage();
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
            })
              .then((response) => {
                if (response.data.success == true) {
                  //     this.setDefauValueInModal();
                  this.selectDistrictMember = null;
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    addMember() {
      console.log("Token: " + VueCookies.get("accessToken"));
      let FatherID;
      let MotherID;
      if (this.action == "AddNormal") {
        this.generationMember = 0;
      }
      if (this.action == "AddChild") {
        console.log("vào add child");
        if (this.isFather) {
          FatherID = this.CurrentIdMember;
          MotherID = this.idParent;
        } else {
          FatherID = this.idParent;
          MotherID = this.CurrentIdMember;
        }
        this.addMemberChild(FatherID, MotherID);
        console.log("FatherID: " + FatherID);
        console.log("MotherID: " + MotherID);
      } else if (this.action == "AddMarriage") {
        this.addMemberMarried();
      } else {
        console.log("vào add mare");
        HTTP.post("member", {
          CurrentMemberID: this.CurrentIdMember,
          MemberName: this.objMemberInfor.MemberName,
          NickName: this.objMemberInfor.NickName,
          BirthOrder: this.objMemberInfor.BirthOrder,
          Origin: this.objMemberInfor.Origin,
          NationalityID: this.objMemberInfor.NationalityID,
          ReligionID: this.objMemberInfor.ReligionID,
          Dob: this.objMemberInfor.Dob,
          LunarDob: this.objMemberInfor.LunarDob,
          birthPlace: this.objMemberInfor.BirthPlace,
          IsDead: this.IsDead,
          Dod: this.objMemberInfor.Dod,
          LunarDod: this.objMemberInfor.LunarDod,
          PlaceOfDeath: this.objMemberInfor.PlaceOfDeath,
          GraveSite: this.objMemberInfor.GraveSite,
          Note: this.objMemberInfor.Note,
          CurrentGeneration: this.generationMember,
          BloodType: this.objMemberInfor.BloodType,
          Male: this.objMemberInfor.Male,
          CodeID: this.CodeID,
          Action: this.action,
        })
          .then((response) => {
            if (this.action == "AddNormal") {
              this.getListUnspecifiedMembers();
            }
            if (response.data.success == true) {
              this.getAllListMember();
              this.isUpdateAvatar = false;
              this.action = null;
              this.$modal.hide("view-member-mdl");
              this.$modal.hide("select-opts-mdl");
              console.log("getlist");
              this.getListMember();
              this.NotificationsScuccess(response.data.message);
              this.getListMemberToSendMessage();
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
              })
                .then((response) => {
                  if (response.data.success == true) {
                    //     this.setDefauValueInModal();
                    this.selectDistrictMember = null;
                  }
                })
                .catch((e) => {
                  console.log(e);
                });
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getRemainingEmail() {
      HTTP.get("remainingEmail")
        .then((respone) => {
          if (respone.data.success == true) {
            this.remainingEmail = respone.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getRemainingSMS() {
      HTTP.get("remainingSMS")
        .then((respone) => {
          if (respone.data.success == true) {
            this.remainingSMS = respone.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    triggerFileInputClick() {
      this.$refs.fileInputRef.click();
    },
    //Nguyễn Lê Hùng
    selectMemberFromTable(member, index) {
      this.selectedRowIndex = index;
      this.action = member.relationship;
      this.newIdMember = member.MemberID;
    },
    //Nguyễn Lê Hùng
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

    //Nguyễn Lê Hùng
    updateEducationMember() {
      HTTP.put("updateEducation", {
        School: this.objMemberEducation.School,
        Description: this.objMemberEducation.Description,
        StartDate: this.objMemberEducation.StartDate,
        EndDate: this.objMemberEducation.EndDate,
        EducationID: this.EducationIdToUpdate,
      })
        .then((respone) => {
          if (respone.data.success) {
            this.getListEducationMember();
            this.NotificationsScuccess(respone.data.message);
            this.refreshInputJobAndEducation();
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    updateJobMember() {
      HTTP.put("updateJob", {
        JobID: this.JobIDToUpdate,
        Organization: this.objMemberJob.Organization,
        OrganizationAddress: this.objMemberJob.OrganizationAddress,
        Role: this.objMemberJob.Role,
        JobName: this.objMemberJob.JobName,
        StartDate: this.objMemberJob.StartDate,
        EndDate: this.objMemberJob.EndDate,
      })
        .then((respone) => {
          if (respone.data.success) {
            this.getListJobMember();
            this.NotificationsScuccess(respone.data.message);
            this.refreshInputJobAndEducation();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    updateInformation() {
      console.log(this.objMemberInfor.BirthOrder);
      if (this.selectDistrictMember != null) {
        this.objMemberContact.Address =
          this.objMemberContact.Address + "-" + this.selectDistrictMember;
      }
      if (this.selectCityMember == null) {
        this.objMemberContact.Address = null;
      }
      HTTP.put("member", {
        MemberID: this.CurrentIdMember,
        MemberName: this.objMemberInfor.MemberName,
        NickName: this.objMemberInfor.NickName,
        BirthOrder:
          this.objMemberInfor.BirthOrder == "null"
            ? this.objMemberInfor.BirthOrder
            : 1,
        Origin: this.objMemberInfor.Origin,
        NationalityID: this.objMemberInfor.NationalityID,
        ReligionID: this.objMemberInfor.ReligionID,
        Dob: this.objMemberInfor.Dob,
        LunarDob: this.objMemberInfor.LunarDob,
        birthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        Dod: this.objMemberInfor.Dod,
        LunarDod: this.objMemberInfor.LunarDod,
        PlaceOfDeath: this.objMemberInfor.PlaceOfDeath,
        GraveSite: this.objMemberInfor.GraveSite,
        Note: this.objMemberInfor.Note,
        CurrentGeneration: this.generationMember,
        BloodType: this.objMemberInfor.BloodType,
        Male: this.objMemberInfor.Male,
        CodeID: this.CodeID,
        Action: this.action,
      })
        .then((response) => {
          if (response.data.success == true) {
            this.isUpdateAvatar = false;
            this.getListUnspecifiedMembers();
            this.getListMemberToSendMessage();
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
            })
              .then((respone) => {
                if (respone.data.success == true) {
                  this.checkUpdate = true;
                  this.closeMemberModal();
                  this.getListMember();
                } else {
                  this.NotificationsDelete("Có lỗi hệ thống");
                }
              })
              .catch(() => {
                this.NotificationsDelete("Có lỗi hệ thống");
              });
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //Nguyễn Lê Hùng
    selectRowJob(job) {
      this.JobIDToUpdate = job.JobID;
      this.objMemberJob = job;
      this.objMemberJob.StartDate = this.formatDate(
        this.objMemberJob.StartDate
      );
      this.objMemberJob.EndDate = this.formatDate(this.objMemberJob.EndDate);
    },
    //Nguyễn Lê Hùng
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
    //Nguyễn Lê Hùng
    GetListFilterMember() {
      let city = this.selectAdress;
      if (this.selectDistrict != null) {
        city = this.selectAdress + "-" + this.selectDistrict;
      }
      console.log(city);
      console.log(this.selectAdress);
      HTTP.post("filter-member", {
        CodeID: this.CodeID,
        BloodType: this.selectBloodType,
        selectAge: this.selectAge,
        Address: city,
      })
        .then((response) => {
          this.listFilterMember = response.data.data;
          this.highLightNode();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInforEmail(Infor) {
      this.emailDetail = !this.emailDetail;
      this.inforEmail = Infor;
      console.log(Infor);
    },
    closeGetInforEmail() {
      this.emailDetail = false;
      this.inforEmail = null;
    },
    //Lưu tùng lâm
    RemoveHightLight() {
      this.selectedNodes = [];
      this.notSelectedNodes = [];
      var nodeElement;
      for (let i = 0; i < this.nodes.length; i++) {
        nodeElement = this.family.getNodeElement(this.nodes[i].id);
        if (nodeElement != null) {
          nodeElement.classList.remove("selected");
          nodeElement.classList.remove("notselected");
        }
      }
    },
    highLightSelectCompareNode(SelectNode) {
      var nodeElement;
      let selectedNode = this.nodes.find((node) => node.id == SelectNode);
      if (this.selectNodeHighLightCompare.includes(selectedNode.id)) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.remove("selected-compare");
        this.selectNodeHighLightCompare =
          this.selectNodeHighLightCompare.filter((id) => id != selectedNode.id);
      } else if (selectedNode) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.add("selected-compare");
        this.selectedNodesCompare.push(selectedNode.id);
        this.selectNodeHighLightCompare.push(selectedNode.id);
      } else {
        console.log("Nút không tồn tại:", SelectNode);
      }
    },
    highLightSelectNode(SelectNode) {
      var nodeElement;
      //this.RemoveHightLight();
      let selectedNode = this.nodes.find((node) => node.id == SelectNode);
      if (selectedNode) {
        nodeElement = this.family.getNodeElement(selectedNode.id);
        nodeElement.classList.add("selected");
        this.selectedNodes.push(selectedNode.id);
      } else {
        console.log("Nút không tồn tại:", SelectNode);
      }
    },
    handleRightClick(id) {
      if (this.memberRole != 3) {
        this.OnpenModal_SelectOption(id);
      }
    },
    handleLeftClickUnspecifiedMembers(id) {
      this.getInforMember(id);
    },
    handleLeftClick(id) {
      this.family.center(id);
    },
    highLightNode() {
      let nodeElement;
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
            if (nodeElement != null) {
              nodeElement.classList.add("selected");
              this.selectedNodes.push(node.id);
            }
          } else {
            nodeElement = this.family.getNodeElement(node.id);
            if (nodeElement != null) {
              nodeElement.classList.add("notselected");
              this.notSelectedNodes.push(node.id);
            }
          }
        });
    },
    async getListUnspecifiedMembers() {
      try {
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
      } catch (error) {
        console.log(error);
      }
    },
    closeModalAddMemberFromList() {
      this.$modal.hide("add-relation-mdl");
      this.closeSelectModal();
    },
    openModalAddMemberFromList() {
      this.TitleModal = " Mối quan hệ ";
      this.$modal.show("add-relation-mdl");
    },
    openNotiModal() {
      this.ListPhoneToSendMessage = [];
      this.contentMessage = null;
      this.checkAll = false;
      this.expandCreateEmail = false;
      this.smsSelected = true;
      this.emailSelected = false;
      this.$modal.show("send-noti-mdl");
    },
    closeNotiModal() {
      this.$modal.hide("send-noti-mdl");
    },
    openCompareModal() {
      //  this.RemoveHightLight();
      this.isCompare = !this.isCompare;
      if (this.isCompare == false) {
        this.removeFromSelectedNodesCompare();
      }
    },
    closeCompareModal() {
      this.$modal.hide("relation-mdl");
    },
    openMemberModal(action, title, idParent) {
      console.log(this.CurrentIdMember);
      this.idParent = idParent;
      this.IsDead = 0;
      this.isAdd = true;
      this.isEdit = false;
      this.objMemberInfor = {};
      this.objMemberContact = {};
      this.objMemberJob = {};
      this.objMemberEducation = {};
      this.selectDistrictMember = null;
      this.selectCityMember = null;
      this.objMemberInfor.BirthOrder = 1;
      this.objMemberInfor.Male = 1;
      console.log(action);
      if (action == "AddMarriage") {
        this.objMemberInfor.MarriageNumber = this.getMaxMarriage(
          this.CurrentIdMember
        );
        console.log(this.getMaxMarriage(this.CurrentIdMember));
        console.log("đã vào");
      }
      if (this.isFather == true && action == "AddMarriage") {
        console.log(this.isFather);
        this.objMemberInfor.Male = 0;
      } else if (!this.isFather && action == "AddMarriage") {
        this.objMemberInfor.Male = 1;
      }

      this.objMemberInfor.BloodType = null;
      this.objMemberInfor.NationalityID = 1;
      this.objMemberInfor.ReligionID = 1;
      this.objMemberContact = {};
      this.TitleModal = "Thêm mối quan hệ " + title;
      this.action = action;
      if (this.action == "AddMother" || this.action == "AddWife") {
        this.objMemberInfor.Male = 0;
      }
      console.log(this.action);
      this.$modal.show("view-member-mdl");
    },
    closeMemberModal() {
      this.$modal.hide("view-member-mdl");
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
    getLinkRelationship(Node) {
      this.idParent = null;
      if (
        (Node.fid != "" && Node.mid == "") ||
        (Node.mid != "" && Node.fid == "")
      ) {
        if (Node.fid != "") {
          let foundNode = this.nodes.find((node) => node.id == Node.fid);
          console.log(foundNode);
          this.parentRelationship = this.nodes.filter((node) =>
            foundNode.pids.includes(node.id)
          );
          console.log(this.parentRelationship);
        } else {
          let foundNode = this.nodes.find((node) => node.id == Node.mid);
          console.log(foundNode);
          this.parentRelationship = this.nodes.filter((node) =>
            foundNode.pids.includes(node.id)
          );
          console.log(this.parentRelationship);
        }
      }
    },
    linkRelationship() {
      HTTP.put("linkRelationship", {
        MemberID1: this.CurrentIdToLinkRelationship,
        MemberID2: this.newIdMember,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.NotificationsScuccess(respone.data.message);
            this.CurrentIdToLinkRelationship = null;
            this.newIdMember = null;
            this.getListMember();
            this.closeCfDelModal();
            this.closeSelectModal();
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("idparent: " + this.idParent);
      console.log("idLink: " + this.newIdMember);
    },

    OnpenModal_SelectOption(id) {
      this.parentRelationship = null;
      this.selectedInfor();
      let foundNode = this.nodes.find((node) => node.id == id);
      this.CurrentIdToLinkRelationship = foundNode.id;
      this.getLinkRelationship(foundNode);
      console.log("parentRelationship: " + this.parentRelationship);
      if (foundNode.gender == "female") {
        this.isFather = false;
      } else {
        this.isFather = true;
      }

      this.getAllMarriedInMember(foundNode.pids);
      this.setFunctionCanDo(foundNode);
      this.TitleModal = foundNode.name;
      console.log("TitleModal: " + this.TitleModal);
      this.generationMember = foundNode.generation;
      if (this.nodeRightClickHighLight != null) {
        this.removeFromSelectedNodes(this.nodeRightClickHighLight);
      }
      this.highLightSelectNode(id);
      this.nodeRightClickHighLight = id;
      this.$modal.show("select-opts-mdl");
      this.CurrentIdMember = id;

      this.objMemberInfor = {};
      //  this.removeFromSelectedNodes(id);
    },
    getAllMarriedInMember(membersArray) {
      this.ListMarriedMember = this.nodes.filter((member) =>
        membersArray.includes(member.id)
      );
    },

    closeSelectModal() {
      this.CurrentIdMember = 0;
      this.removeFromSelectedNodes(this.idNodeWatching);
      this.$modal.hide("select-opts-mdl");
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
    openCfDelModal(actionCf, id, name, action) {
      this.isRemoveRelationship = actionCf;
      console.log(actionCf);
      if (this.isRemoveRelationship == "removeRelationship") {
        this.TitleConfirm = "Bạn có chắc chắn muốn hủy mối quan hệ với " + name;
        this.action = action;
        this.newIdMember = id;
      } else if (this.isRemoveRelationship == "removeMember") {
        this.TitleConfirm = "Bạn có chắc chắn xóa " + name + " khỏi gia phả";
      } else if (this.isRemoveRelationship == "LinkRelationship") {
        this.TitleConfirm = "Bạn chắc chắn muốn nối mối quan hệ với " + name;
        this.newIdMember = id;
      } else if (this.isRemoveRelationship == "SetPaternalAncestor") {
        this.TitleConfirm =
          "Bạn chắc chắn muốn đổi " +
          name +
          " Thành cụ tổ " +
          "\n Lưu ý: Tất cả thành viên cũng sẽ thay đổi theo cụ tổ";
      } else if (this.isRemoveRelationship == "backUp") {
        this.TitleConfirm =
          "Bạn đang chuẩn bị xuất dữ liệu mới. Hành động này có thể dẫn đến việc mất dữ liệu cũ đã tồn tại. Hãy xác nhận nếu bạn chắc chắn muốn tiếp tục";
      }
      this.$modal.show("cfdel-mdl");
    },

    closeCfDelModal() {
      this.$modal.hide("cfdel-mdl");
    },

    openModalRelationship() {
      this.$modal.show("view-relas-mdl");
      HTTP.get("relationship", {
        params: {
          CodeID: this.CodeID,
          memberID: this.CurrentIdMember,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            console.log(response.data.data);
            this.ResultRelationship = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    closeModalRelationship() {
      this.$modal.hide("view-relas-mdl");
    },

    getAllListMember() {
      try {
        HTTP.get("members", {
          params: {
            codeID: this.CodeID,
          },
        })
          .then((response) => {
            if (response.data.success == true) {
              this.listMember = response.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },

    getListMember() {
      HTTP.get("getFamilyHead", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.idFamilyHead = response.data.data;
          } else {
            if (response.data.status_code == 402) {
              localStorage.removeItem("CodeID");
              localStorage.removeItem("accountID");
              this.$router.push("/login");
            }
          }
          HTTP.get("viewTree", {
            params: {
              CodeID: this.CodeID,
            },
          })
            .then((response) => {
              this.nodes = [];
              this.numberDeath = 0;
              if (response.data.success == true) {
                this.nodes = response.data.data;
                console.log(this.nodes);
                for (let i = 0; i < this.nodes.length; i++) {
                  if (this.nodes[i].pids.length > 1) {
                    let listPid = [];
                    for (let j = this.nodes[i].pids.length - 1; j >= 0; j--) {
                      listPid.push(this.nodes[i].pids[j]);
                    }
                    this.nodes[i].pids = listPid;
                  }
                  this.nodes[i].tags = [];
                  if (this.nodes[i].name.length > 15) {
                    this.nodes[i].name =
                      this.nodes[i].name.substring(0, 16) + "...";
                  }
                  if (this.idFamilyHead != null) {
                    if (this.nodes[i].id == this.idFamilyHead && i != 0) {
                      this.nodes[i].isFH = "true";
                    }
                  }
                  if (this.nodes[i].isDead == 1) {
                    this.numberDeath += 1;
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
                this.nodes[0].isGG = "true";
                this.family.config.nodes = this.nodes;
                this.family.config.roots = this.nodes[0].id
                this.family.draw();
                //  this.mytree(this.$refs.tree, this.nodes);
              }
              //  this.family.load(this.nodes);
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListAgeGroup() {
      try {
        HTTP.get("agegroup", {})
          .then((response) => {
            this.ListAgeGroup = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListBloodTypeGroup() {
      try {
        HTTP.get("bloodtype", {})
          .then((response) => {
            this.ListBloodTypeGroup = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListNationality() {
      try {
        HTTP.get("nationality")
          .then((response) => {
            this.ListNationality = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListMessage() {
      try {
        HTTP.get("listMessage", {
          params: {
            CodeID: this.CodeID,
          },
        })
          .then((response) => {
            if (response.data.success == true) {
              this.ListMessage = response.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    removeEducation() {
      HTTP.delete("deleteEducation", {
        params: {
          EducationID: this.EducationIdToUpdate,
        },
      }).then((response) => {
        if (response.data.success) {
          this.NotificationsScuccess(response.data.message);
          this.refreshInputJobAndEducation();
          this.getListEducationMember();
        }
      });
    },
    getListHistoryEmail() {
      try {
        HTTP.get("listHistoryEmail", {
          params: {
            CodeID: this.CodeID,
          },
        })
          .then((response) => {
            if (response.data.success == true) {
              this.ListHistoryEmail = response.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListDistrictMember() {
      let selectedCity = this.ListCity.find(
        (city) => city.id == this.selectCityMember
      );
      console.log(this.selectCityMember);
      if (selectedCity != null) {
        this.objMemberContact.Address = selectedCity.name;
      } else {
        this.objMemberContact.Address = null;
      }

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
      this.selectDistrict = null;
      if (this.selectCity == null) {
        this.ListDistrict = null;
        this.selectDistrict = null;
        this.selectAdress = null;
        // this.RemoveHightLight();
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
        })
          .then((response) => {
            this.ListDistrict = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    getMemberRole() {
      try {
        HTTP.post("roleAccount", {
          accountID: localStorage.getItem("accountID"),
          codeID: localStorage.getItem("CodeID"),
        })
          .then((response) => {
            if (response.data.success == true) {
              this.memberRole = response.data.data.RoleID;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListCity() {
      try {
        HTTP.get("province", {})
          .then((response) => {
            this.ListCity = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    getListReligion() {
      try {
        HTTP.get("religion")
          .then((response) => {
            this.ListReligion = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
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
      this.expandEventListSMS = false;
    },
    selectSMS() {
      this.smsSelected = true;
      this.emailSelected = false;
      this.expandCreateEmail = false;
      this.expandEventList = false;
    },

    // Hàm thay đổi sidebar
    sidebarHover() {
      if (window.innerWidth <= 1080) {
        this.expandSidebar = true;
      }
    },
    siderbarLeave() {
      this.expandSidebar = false;
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
    if (
      localStorage.getItem("CodeID") != null &&
      localStorage.getItem("accountID") != null
    ) {
      this.getListMember();
      this.getListMessage();
      this.getListCity();
      this.getListNationality();
      this.getListReligion();
      this.getListAgeGroup();
      this.getListBloodTypeGroup();
      this.getListUnspecifiedMembers();
      this.getMemberRole();
      this.getListHistoryEmail();
      this.getAllListMember();
      this.getListMemberToSendMessage();
      this.updateStatusEvent();
      this.getRemainingSMS();
      this.getRemainingEmail();
      this.mytree(this.$refs.tree, this.nodes);
    }
  },
};
</script>
    
<style>
@import "../assets/css/familytree.css";

.row-selected {
  --bs-table-bg: #f0f0f0;
}

input#txt_search {
  height: 40px;
  width: 300px;
  border: 0px;
}

button.btn-x {
  display: none;
}
</style>