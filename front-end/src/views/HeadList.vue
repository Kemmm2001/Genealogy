<template>
  <div class="container-fluid" style="padding-left: 200px; padding-right: 200px;">
    <div class="d-flex w-100">
      <div class="d-flex flex-column h-100 w-100">
        <div class="d-flex flex-row">
          <div class="col-md-6 d-flex align-items-center" style="justify-content: left;">
            <div class="w-100 my-2 mx-2">
              <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên..." />
            </div>
            <div class="d-flex w-100 my-2">
              <div class="px-2">Phân trang</div>
              <div class="d-flex align-items-center">
                <select class="form-select px-2 py-0">
                  <option selected value="1">10</option>
                  <option value="2">20</option>
                  <option value="3">30</option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center" style="justify-content: right;">
            <button @click="openAddHeadModal()" class="btn headlist-item headlist-item-button text-center my-4 mx-2">
              Thêm
              tộc trưởng
            </button>
          </div>
        </div>
        <div class>
          <table class="table headlist-list m-0">
            <thead>
              <tr class="headlist-item">
                <th class="headlist-list-th" scope="col">#</th>
                <th class="headlist-list-th" scope="col">Họ và Tên</th>
                <th class="headlist-list-th" scope="col">Giới tính</th>
                <th class="headlist-list-th" scope="col">Ngày sinh</th>
                <th class="headlist-list-th" scope="col">Đời</th>
              </tr>
            </thead>
            <tbody>
              <tr @click="getInforMember(familyhead.MemberID)" class="headlist-item headlist-table-item"
                v-for="(familyhead, index) in this.familyheadFilter" :key="familyhead.MemberID">
                <td @click="openEditHeadModal()" scope="row">{{ index + 1 }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td">{{ familyhead.MemberName }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td">{{ familyhead.Male }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td">{{ familyhead.Dob }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td">{{ familyhead.Generation }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex flex-row paging justify-content-center m-4" style="bottom: 12px; left: 0; right: 0;">
          <div class="d-flex flex-row align-items-center">
            <div class="d-flex align-items-center justify-content-center" style="padding-right: 12px;">
              <svg class="headlist-paging-icon" style="transform: rotate(180deg);" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512">
                <path
                  d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </div>
            <div>Trước</div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div class="page">1</div>
            <div class="page">2</div>
            <div class="page">
              <div :class="{chosen : true}">3</div>
            </div>
            <div class="page">4</div>
            <div class="page">5</div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div>Sau</div>
            <div class="d-flex align-items-center justify-content-center" style="padding-left: 12px;">
              <svg class="headlist-paging-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                  d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <modal name="addHead-modal">
        <div class="w-100 h-100 add-head-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">
              Thêm tộc
              trưởng
            </div>
            <div class="close-add-form" @click="closeAddHeadModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row">
              <div class="col-md-4 m-2">
                <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên..." />
              </div>
            </div>
            <div class="d-flex flex-column headlist-list-container w-100">
              <table class="table member headlist-list m-0">
                <thead>
                  <tr class="headlist-item">
                    <th class="headlist-list-th" scope="col">#</th>
                    <th class="headlist-list-th" scope="col">Họ và Tên</th>
                    <th class="headlist-list-th" scope="col">Giới tính</th>
                    <th class="headlist-list-th" scope="col">Ngày sinh</th>
                    <th class="headlist-list-th" scope="col">Đời</th>
                  </tr>
                </thead>
                <tbody>
                  <tr @click="chooseMember(member.id), numberItemSelection(index)"
                    :class="{ selected: itemChoose === index }" class="headlist-item headlist-table-item"
                    v-for="(member, index) in this.memberList" :key="member.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ member.name }}</td>
                    <td>{{ member.gender }}</td>
                    <td>{{ member.dob }}</td>
                    <td>{{ member.generation }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="headlist-list-footer">
                <div class="d-flex flex-row align-items-center">
                  <div class="d-flex flex-row align-items-center headlist-item">
                    <div class="d-flex align-items-center px-2">Phân trang</div>
                    <div class="d-flex align-items-center">
                      <select class="form-select px-2 py-0">
                        <option selected value="1">10</option>
                        <option value="2">20</option>
                        <option value="3">30</option>
                      </select>
                    </div>
                  </div>
                  <div class="d-flex flex-row justify-content-center" style="flex-grow: 1;">
                    <button class="btn px-2 py-0">
                      <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                      </svg>
                    </button>
                    <button class="btn px-2 p-0">
                      <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </button>
                    <div class="d-flex align-items-center justify-content-center">Trang 1</div>
                    <button class="btn px-2 p-0">
                      <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                          d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                      </svg>
                    </button>
                    <button class="btn px-2 p-0">
                      <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                          d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                      </svg>
                    </button>
                  </div>

                  <div class="d-flex justify-content-right m-1">
                    <button @click="SetFamilyHead()"
                      class="btn headlist-item headlist-item-button text-center">Thêm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>

      <modal name="editHead-modal">
        <div class="card">
          <div class="card-header text-center" style="background-color:#E8C77B">
            <h5>Thay đổi thông tin</h5>
            <div class="close-add-form" @click="closeEditHeadModal" style="top: 8px;right:5px">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
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
                    <img style="height:316px;width:360px;margin-bottom:30px" v-if="avatarSrc" :src="avatarSrc"
                      alt="Avatar" />
                    <svg v-else style="margin-bottom:46px" fill="#000000" height="300px" width="300px" version="1.1"
                      id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 512 512" xml:space="preserve">
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
                      <input type="file" class="form-control input-file" id="imageUpload" accept="image/*"
                        @change="updateAvatar($event)" />
                    </div>
                  </div>
                  <div class="col-8">
                    <div style="position: relative; margin-right:10px">
                      <input v-model="objMemberInfor.MemberName" type="text" class="form-control modal-item"
                        placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.MemberName }">Tên thành
                        viên đầy đủ</label>
                    </div>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input v-model="objMemberInfor.NickName" type="text" class="form-control modal-item"
                          placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.NickName }">Tên thường
                          gọi</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control modal-item"
                          placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">Con
                          Thứ</label>
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
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">
                            {{ nation.NationalityName }}</option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <select v-model="objMemberInfor.ReligionID" class="form-select modal-item">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">
                            {{ religion.ReligionName }}</option>
                        </select>
                        <label class="form-label-number" for="select">Tôn Giáo</label>
                      </div>
                    </div>
                    <div style="position: relative; margin-right:10px">
                      <input v-model="objMemberInfor.Origin" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.Origin }">Nguyên
                        Quán</label>
                    </div>
                    <div class="form-group">
                      <h6 style="margin-bottom:20px">Ngày Sinh (Hệ thống sẽ tự đổi từ ngày dương lịch sang âm lịch và
                        ngược lại)</h6>
                      <div style="display:flex">
                        <div style="position: relative; width: 50%;margin-right: 10px;">
                          <input v-model="objMemberInfor.Dob" type="date" class="form-control modal-item" placeholder
                            @change="convertSolarToLunar()" />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div style="position: relative;width: 50%; margin-right: 10px;">
                          <input v-model="objMemberInfor.LunarDob" type="date" class="form-control modal-item" placeholder
                            @change="convertLunarToSolar()" />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                    </div>
                    <div style="position: relative; margin-right:10px">
                      <input v-model="objMemberInfor.BirthPlace" type="text" class="form-control modal-item"
                        placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.BirthPlace }">Nơi
                        sinh</label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input v-model="IsDead" type="checkbox" class="form-check-input" id="lostCheckbox" />
                      <label style="font-size: 14px; margin-top: 7px;" class="form-check-label" for="lostCheckbox">Đã
                        mất</label>
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
              <div class="col-9" style="padding-top: 15px" v-else-if="extendedContact">
                <div class="row">
                  <div style="position: relative;padding-right: 23px;">
                    <input v-model="objMemberContact.Address" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input"
                      :class="{ 'active': objMemberContact.Address }">Địa chỉ</label>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <VuePhoneNumberInput ref="phoneNumberInput" v-model="objMemberContact.Phone" :disabled="isDisabled"
                        :default-country="defaultCountry" :inputClass="inputClass" :validations="validations">
                      </VuePhoneNumberInput>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberContact.Email" type="email" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberContact.Email }">Email</label>
                    </div>
                  </div>
                  <div style="position: relative; padding-right: 23px;">
                    <input v-model="objMemberContact.FacebookUrl" type="text" class="form-control modal-item"
                      placeholder />
                    <label style="left: 25px;" class="form-label" for="input"
                      :class="{ 'active': objMemberContact.FacebookUrl }">Facebook</label>
                  </div>
                  <div style="position: relative; padding-right: 23px;">
                    <input v-model="objMemberContact.Zalo" type="text" class="form-control modal-item" placeholder />
                    <label style="left: 25px;" class="form-label" for="input"
                      :class="{ 'active': objMemberContact.Zalo }">Zalo</label>
                  </div>
                </div>
              </div>
              <div class="col-9" style="padding-top: 15px" v-else-if="extendedJob">
                <div class="row">
                  <div style="display:flex">
                    <div style="position: relative; width: 50%; margin-right: 10px;">
                      <input v-model="objMemberJob.Organization" type="text" class="form-control modal-item"
                        placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Organization }">Tên Cơ
                        Quan</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberJob.OrganizationAddress" type="text" class="form-control modal-item"
                        placeholder />
                      <label class="form-label" min="0" for="input"
                        :class="{ 'active': objMemberJob.OrganizationAddress }">Địa Chỉ</label>
                    </div>
                  </div>
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <input v-model="objMemberJob.Role" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Role }">Vị trí công
                        tác</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <input v-model="objMemberJob.JobName" type="text" class="form-control modal-item" placeholder />
                      <label class="form-label-number" min="0" for="input"
                        :class="{ 'active': objMemberJob.JobName }">nghề nghiệp</label>
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
                      <button type="button" class="btn btn-primary" @click="addNewJobMember()"
                        style="margin-right:10px">Thêm</button>
                      <button type="button" class="btn btn-info mr-1" @click="updateJobMember()"
                        style="margin-right:10px">Sửa</button>
                      <button type="button" class="btn btn-danger mr-1" @click="removeJobMember()"
                        style="margin-right:10px">Xóa</button>
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
                        <tr v-for="job in ListMemberJob" :key="job.id" @click="selectRowJob(job)"
                          :class="{ 'row-selected': job === objMemberJob }">
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
                    <label style="left: 20px;" class="form-label" for="input"
                      :class="{ 'active': objMemberEducation.School }">Tên trường</label>
                  </div>
                  <div style="position: relative;padding-right: 20px;">
                    <input v-model="objMemberEducation.Description" type="text" class="form-control modal-item"
                      placeholder />
                    <label style="left: 20px;" class="form-label" for="input"
                      :class="{ 'active': objMemberEducation.Description }">Mô tả</label>
                  </div>
                  <div class="form-group">
                    <h6 style="margin-bottom:20px">Thời gian học tập</h6>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input v-model="objMemberEducation.StartDate" type="date" class="form-control modal-item"
                          placeholder />
                        <label class="form-label" for="input">Từ ngày</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input v-model="objMemberEducation.EndDate" type="date" class="form-control modal-item"
                          placeholder />
                        <label class="form-label-number" min="0" for="input">Đến ngày</label>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex justify-content-end">
                    <div class="form-group" role="group">
                      <button type="button" class="btn btn-primary" @click="addNewEducationMember()"
                        style="margin-right:10px">Thêm</button>
                      <button type="button" class="btn btn-info mr-1" @click="updateEducationMember()"
                        style="margin-right:10px">Sửa</button>
                      <button type="button" class="btn btn-danger mr-1" @click="deleteJobMember()"
                        style="margin-right:10px">Xóa</button>
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
                        <tr v-for="edu in ListMemberEducation" :key="edu.id" @click="selectRowEducation(edu)"
                          :class="{ 'row-selected': edu === objMemberEducation }">
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
                  <textarea v-model="objMemberInfor.Note" style="height:300px" class="form-control modal-item"
                    id="lichSuCongTac" rows="5" placeholder="Ghi Chú"></textarea>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer" style="background-color:#E8C77B">
            <div class="d-flex justify-content-end">
              <button type="button" class="btn btn-primary mr-2">Thay đổi</button>
              <button @click="removeFamilyHead()" style="margin-left:10px" type="button" class="btn btn-secondary">Xóa
                khỏi danh sách tộc trưởng</button>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
// import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
import Snackbar from "awesome-snackbar";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  components: {
    VuePhoneNumberInput,
  },
  data() {
    return {
      avatarSrc: null,
      isEdit: false,
      IsDead: 0,
      memberIdChoose: null,
      itemChoose: -1,

      extendedInfo: true,
      extendedContact: false,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,
      isDead: false,
      ListNationality: null,
      ListReligion: null,

      ListMemberJob: null,
      ListMemberEducation: null,

      memberList: [],
      familyheadList: [],
      familyheadFilter: [],
      objMember: {},
      objFamilyHeadInfor: {
        MemberID: null,
        MemberName: null,
        Male: null,
        Dob: null,
        Generation: null,
      },

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
    };
  },
  methods: {
    numberItemSelection(index) {
      this.itemChoose = index;
    },
    chooseMember(id) {
      this.memberIdChoose = id;
      console.log(id);
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
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
    openAddHeadModal() {
      this.$modal.show("addHead-modal");
    },
    closeAddHeadModal() {
      this.$modal.hide("addHead-modal");
    },
    openEditHeadModal() {
      this.$modal.show("editHead-modal");
      console.log("Chay vao edit");
    },
    closeEditHeadModal() {
      this.$modal.hide("editHead-modal");
      console.log("Chay ra khoi edit");
    },
    getListMember() {
      HTTP.get("viewTree", {
        params: {
          memberID: 6,
        },
      })
        .then((response) => {
          this.memberList = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeFamilyHead() {
      HTTP.delete("removeFamilyHead", {
        params: {
          memberId: this.objMemberInfor.MemberID,
        },
      })
        .then(() => {
          this.NotificationsDelete("Xóa khỏi danh sách cụ tổ thành công");
        })
        .catch(() => {
          this.NotificationsDelete("Đã xảy ra lỗi, không thể xóa");
        });
    },
    SetFamilyHead() {
      HTTP.post("setRole", {
        memberId: this.memberIdChoose,
        roleId: 2,
        CodeId: 123456,
      })
        .then(() => {
          this.NotificationsScuccess("Thêm thành công");
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getInforMember(id) {
      HTTP.get("InforMember", {
        params: {
          memberId: id,
        },
      })
        .then((response) => {
          this.objMember = response.data;
          console.log(this.objMember);
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

      // this.$modal.show("member-modal");
      // this.isEdit = true;
      // this.selectedInfor();
      // this.setDefauValueInModal();
    },

    takeDataMember(id) {
      this.CurrentIdMember = this.objMemberInfor.MemberID;
      this.generationMember = this.objMemberInfor.Generation;
      this.CodeID = this.objMemberInfor.CodeID;
      this.IsDead = this.objMemberInfor.IsDead;
      this.idPaternalAncestor = id;
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
  },
  mounted() {
    HTTP.get("familyhead", {
      params: {
        CodeID: 123456,
      },
    })
      .then((response) => {
        this.familyheadList = response.data;
        this.familyheadFilter = this.familyheadList;
      })
      .catch((e) => {
        console.log(e);
      });

    this.getListMember();
  },

  created() {
    // EventBus.$emit("HeadList", true);
    // EventBus.$emit("AlbumList", false);
    // EventBus.$emit("ArticleList", false);
  },
};
</script>
<style>tr.selected {
  background-color: lightblue;
  cursor: pointer;
}

.table.member {
  --bs-table-bg: transparent !important;
}</style>