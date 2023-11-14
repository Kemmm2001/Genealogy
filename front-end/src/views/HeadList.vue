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
                <select v-model="itemsPerPageFHead" class="form-select px-2 py-0">
                  <option selected value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
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
              <tr @click="getInforMember(familyhead.MemberID)" class="headlist-item headlist-table-item" v-for="(familyhead, index) in displayedItemsFamilyHead" :key="familyhead.MemberID">
                <th @click="openEditHeadModal()" scope="row" style="text-align: center;">{{ index + 1 }}</th>
                <td @click="openEditHeadModal()" class="headlist-table-td" style="text-align: center;">{{ familyhead.MemberName }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td" style="text-align: center;">{{ familyhead.Male }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td" style="text-align: center;">{{ familyhead.Dob }}</td>
                <td @click="openEditHeadModal()" class="headlist-table-td" style="text-align: center;">{{ familyhead.Generation }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex flex-row paging justify-content-center m-4" style="position:absolute; bottom: 12px; left: 0; right: 0;">
          <div class="d-flex flex-row align-items-center">
            <div class="d-flex align-items-center justify-content-center" style="padding-right: 12px;">

            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div class="d-flex flex-row justify-content-center" style="flex-grow: 1;">
                <div class="pagination justify-content-center align-items-center">
                    <button class="btn button-normal m-0" @click="prevPageFamilyHead">Previous</button>
                    <span style="margin: 10px;">{{ currentPageFHead }}/{{ Math.ceil(this.familyheadFilter.length / this.itemsPerPageFHead) }}</span>
                    <button class="btn button-normal m-0" @click="nextPageFamilyHead">Next</button>
                </div>
              </div>
          </div>
          <div class="d-flex flex-row align-items-center">

          </div>
        </div>
      </div>

      <modal name="addHead-modalll">
        <div class="w-100 add-head-modal position: relative;" style="height:620px">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">
              Thêm tộc
              trưởng
            </div>
            <div class="close-add-form" @click="closeAddHeadModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
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
                    <th class="headlist-list-th" scope="col">Ngày sinh</th>
                    <th class="headlist-list-th" scope="col">Đời</th>
                  </tr>
                </thead>
                <tbody>
                  <tr @click="chooseMember(member.id), numberItemSelection(index)" :class="{ selected: itemChoose === index }" class="headlist-item headlist-table-item" v-for="(member, index) in displayedItemsMember" :key="member.id">
                    <th scope="row" style="text-align: center;">{{ index + 1 }}</th>
                    <td style="text-align: center;">{{ member.name }}</td>
                    <td style="text-align: center;">{{ member.dob }}</td>
                    <td style="text-align: center;">{{ member.generation }}</td>
                  </tr>
                  <tr v-for="index in lengthAgainMember" :key="index">
                    <th scope="row" style="text-align: center;"></th>
                    <td style="text-align: center;"></td>
                    <td style="text-align: center;"></td>
                    <td style="text-align: center;"></td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="headlist-list-footer">
                <div class="d-flex flex-row align-items-center">
                  <div class="d-flex flex-row justify-content-center" style="flex-grow: 1;">
                    <div class="pagination justify-content-center align-items-center">
                        <button class="btn button-normal m-0" @click="prevPageMember">Previous</button>
                        <span style="margin: 10px;">{{ currentPageMember }}/{{ Math.ceil(this.memberList.length / this.itemsPerPageMember) }}</span>
                        <button class="btn button-normal m-0" @click="nextPageMember">Next</button>
                    </div>
                  </div>

                  <div class="d-flex justify-content-right m-1">
                    <button @click="SetFamilyHead()" class="btn headlist-item headlist-item-button text-center">Thêm</button>
                  </div>
                </div>
              </div> -->
            </div>
          </div>
        </div>
      </modal>

      <modal name="addHead-modal">
      <div class="form-group">
        <div class="w-100 h-100 add-article-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm tài liệu
            </div>
            <div class="close-add-form" @click="closeAddArticleModal()">
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
                    <th class="headlist-list-th" scope="col">Ngày sinh</th>
                    <th class="headlist-list-th" scope="col">Đời</th>
                  </tr>
                </thead>
                <tbody>
                  <tr @click="chooseMember(member.id), numberItemSelection(index)" :class="{ selected: itemChoose === index }" class="headlist-item headlist-table-item" v-for="(member, index) in displayedItemsMember" :key="member.id">
                    <th scope="row" style="text-align: center;">{{ index + 1 }}</th>
                    <td style="text-align: center;">{{ member.name }}</td>
                    <td style="text-align: center;">{{ member.dob }}</td>
                    <td style="text-align: center;">{{ member.generation }}</td>
                  </tr>
                  <tr v-for="index in lengthAgainMember" :key="index">
                    <th scope="row" style="text-align: center;"></th>
                    <td style="text-align: center;"></td>
                    <td style="text-align: center;"></td>
                    <td style="text-align: center;"></td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            <div class="d-flex flex-row m-3 align-items-center articlelist-button-container">
              <div class="headlist-list-footer">
                <div class="d-flex flex-row align-items-center">
                  <div class="d-flex flex-row justify-content-center" style="flex-grow: 1;">
                    <div class="pagination justify-content-center align-items-center">
                        <button class="btn button-normal m-0" @click="prevPageMember">Previous</button>
                        <span style="margin: 10px;">{{ currentPageMember }}/{{ Math.ceil(this.memberList.length / this.itemsPerPageMember) }}</span>
                        <button class="btn button-normal m-0" @click="nextPageMember">Next</button>
                    </div>
                  </div>

                  <div class="d-flex justify-content-right m-1">
                    <button @click="SetFamilyHead()" class="btn headlist-item headlist-item-button text-center">Thêm</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>

      <modal name="editHead-modal">
        <div class="card" v-if="objMemberInfor" style="border: none;">
          <div class="card-header modal-title text-center p-0 d-flex align-items-center justify-content-center">
            <h5 class="m-0">{{ TitleModal }}</h5>
            <div class="close-add-form" @click="closeEditHeadModal" style="top: 8px;right:5px">
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
                          <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421 c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" />
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
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">
                            {{
                            nation.NationalityName }}
                          </option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <select v-model="objMemberInfor.ReligionID" class="form-select modal-item">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">
                            {{
                            religion.ReligionName }}
                          </option>
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
                  <!-- <span style="margin-bottom:20px">Hệ thống sẽ lấy thông tin của Quận/huyện</span> -->
                  <div style="display:flex">
                    <div style="position: relative; width: 50%;margin-right: 10px;">
                      <select v-model="selectCityMember" class="form-select modal-item" @change="getListDistrict()">
                        <option :value="null" selected>Thành Phố/Tỉnh</option>
                        <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
                      </select>
                      <label class="form-label" for="select">Địa Chỉ (Thành Phố/Tỉnh)</label>
                    </div>
                    <div style="position: relative;width: 50%; margin-right: 10px;">
                      <select class="form-select modal-item">
                        <option :value="null" selected>Quận/Huyện</option>
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
          <div class="card-footer modal-footer">
            <div class="d-flex justify-content-end" style="padding-right: 12px;">
              <button type="button" class="btn btn-danger mr-2" @click="removeFamilyHead()">Xóa</button>
              <button style="margin-left:10px" type="button" class="btn btn-primary mr-2" @click="updateInformation()">Sửa</button>
              <button style="margin-left:10px" type="button" class="btn btn-secondary" @click="closeSelectModal()">Cancel</button>
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
      itemsPerPageMember: 10,  // Số mục dữ liệu trên mỗi trang
      currentPageMember: 1, 
      itemsPerPageFHead: 10,  // Số mục dữ liệu trên mỗi trang
      currentPageFHead: 1,
      TitleModal:null,
    };
  },
  computed: {
    displayedItemsMember() {
      // Tính toán các mục dữ liệu cho trang hiện tại
      const startIndex = (this.currentPageMember - 1) * this.itemsPerPageMember;
      const endIndex = startIndex + this.itemsPerPageMember;
      return this.memberList.slice(startIndex, endIndex);
    },
    displayedItemsFamilyHead() {
      // Tính toán các mục dữ liệu cho trang hiện tại
      const startIndex = (this.currentPageFHead - 1) * this.itemsPerPageFHead;
      const endIndex = startIndex + this.itemsPerPageFHead;
      return this.familyheadFilter.slice(startIndex, endIndex);
    },
  },
  methods: {
    prevPageMember() {
      if (this.currentPageMember > 1) {
        this.currentPageMember--;
      }
    },
    nextPageMember() {
      if (this.currentPageMember < Math.ceil(this.memberList.length / this.itemsPerPageMember)) {
        this.currentPageMember++;
      }
    },
    prevPageFamilyHead() {
      if (this.currentPageFHead > 1) {
        this.currentPageFHead--;
      }
    },
    nextPageFamilyHead() {
      if (this.currentPageFHead < Math.ceil(this.familyheadFilter.length / this.itemsPerPageFHead)) {
        this.currentPageFHead++;
      }
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
        MemberID: this.CurrentIdMember,
        MemberName: this.objMemberInfor.MemberName,
        NickName: this.objMemberInfor.NickName,
        ParentID: this.objMemberInfor.ParentID,
        MarriageID: this.objMemberInfor.MarriageID,
        BirthOrder: this.objMemberInfor.BirthOrder,
        Origin: this.objMemberInfor.Origin,
        NationalityID: this.objMemberInfor.NationalityID,
        ReligionID: this.objMemberInfor.ReligionID,
        Dob: this.objMemberInfor.Dob,
        LunarDob: this.objMemberInfor.LunarDob,
        BirthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.objMemberInfor.IsDead,
        Dod: this.objMemberInfor.Dod,
        LunarDod: this.objMemberInfor.LunarDod,
        PlaceOfDeath: this.objMemberInfor.PlaceOfDeadth,
        GraveSite: this.objMemberInfor.GraveSite,
        Note: this.objMemberInfor.Note,
        BloodType: this.objMemberInfor.BloodType,
        Male: this.objMemberInfor.Male,
      })
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
              this.closeEditHeadModal();
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
    },
    closeEditHeadModal() {
      this.$modal.hide("editHead-modal");
    },
    getListMember() {
      HTTP.get("viewTree", {
        params: {
          CodeID: 123456,
        },
      })
        .then((response) => {
          this.memberList = response.data;
          this.memberList = this.memberList.filter((member) => member.gender != "female");
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
          this.getFamilyHead();
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
          this.getFamilyHead();
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
    getFamilyHead(){
      HTTP.get("familyhead", {
      params: {
        CodeID: 123456,
      },
    })
      .then((response) => {
        this.familyheadList = response.data;
        console.log(this.familyheadList)
        this.familyheadFilter = this.familyheadList;
      })
      .catch((e) => {
        console.log(e);
      });
    }
  },
  mounted() {
    this.getFamilyHead();
    this.getListNationality(),
    this.getListReligion(),
    this.getListMember();
  },

  created() {
    // EventBus.$emit("HeadList", true);
    // EventBus.$emit("AlbumList", false);
    // EventBus.$emit("ArticleList", false);
  },
};
</script>
<style>
tr.selected {
  background-color: lightblue;
  cursor: pointer;
}

.table.member {
  --bs-table-bg: transparent !important;
}
</style>