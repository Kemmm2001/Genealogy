<template>
  <div class="members-grid-container">
    <div class="overview">
      <div class="ps-4 pe-2">
        <div class="center-content">
          <div class>
            <a>Tổng số thành viên: {{ this.memberList.length }} người</a>
            <br />
            <a>Dòng họ có: {{ this.numberGeneration }} đời</a>
            <br />
          </div>
        </div>
      </div>
      <div class="px-2">
        <div class="center-content">
          <div class>
            <a>Nam: {{ this.numberMale }} người</a>
            <br />
            <a>Nữ: {{ this.numberFemale }} người</a>
          </div>
        </div>
      </div>
      <div class="ps-2">
        <div class="center-content">
          <div class>
            <a>Còn sống: {{ this.numberAlive }} người</a>
            <br />
            <a>Đã mất: {{ this.numberDied }} người</a>
            <br />
          </div>
        </div>
      </div>
    </div>
    <div class="sorting-opts">
      <div class="opts-title">
        <div class="center-content" style="font-family: 'QuicksandBold';">Sắp xếp theo</div>
      </div>
      <div class="opts d-flex align-items-center justify-content-center">
        <div class>
          <div @click="clickGenSort()" :class="{ 'bg-primary': genSort, 'bg-secondary': !genSort }"
            class="btn text-white d-flex justify-content-center align-items-center p-1">
            <i v-if="genAscending" class="bi bi-arrow-up" style="padding-right: 2px;"></i>
            <i v-if="!genAscending" class="bi bi-arrow-up" style="padding-left: 2px; transform: rotate(180deg);"></i>
            <div>Đời</div>
          </div>
        </div>
        <div class="ms-1">
          <div @click="clickDobSort()" :class="{ 'bg-primary': dobSort, 'bg-secondary': !dobSort }"
            class="btn text-white d-flex justify-content-center align-items-center p-1">
            <i v-if="dobAscending" class="bi bi-arrow-up" style="padding-right: 2px;"></i>
            <i v-if="!dobAscending" class="bi bi-arrow-up" style="padding-left: 2px; transform: rotate(180deg);"></i>
            <div>Ngày sinh</div>
          </div>
        </div>
      </div>
    </div>
    <div class="member-list">
      <div class="content">
        <div v-if="memberRole != 3" class="d-flex align-items-center">
          <div class>
            <button @click="openEditHeadModal()" class="btn text-white" :disabled="isButtonDisabled"
              :class="{ 'bg-primary': !isButtonDisabled, 'bg-info': isButtonDisabled }">Chỉnh sửa</button>
          </div>
        </div>
        <div class="pt-2">
          <div class="h-100 w-100">
            <div v-if="memberList.length == 0" class="center-content">Gia phả chưa có thành viên nào</div>
            <div class="h-100 d-flex flex-wrap" style="overflow-y: auto;">
              <div @click="numberItemSelection(index), getInforMember(member.MemberID)" class="member me-3"
                style="cursor: pointer;" :class="{ choose: itemChoose === index }" v-for="(member, index) in memberFilter"
                :key="member.MemberID">
                <div class="h-100" v-if="member.Male == 1">
                  <img class="h-100" src="../assets/image/270x270-male-avatar.png" />
                </div>
                <div class="h-100" v-if="member.Male == 0">
                  <img class="h-100" src="../assets/image/270x270-female-avatar.png" />
                </div>
                <div class="px-2 ellipsis-text">
                  <b>{{ member.MemberName }}</b>
                  <br />
                  <a>Đời thứ : {{ member.Generation }}</a>
                  <br />
                  <a v-if="formatDate(member.Dob) != null">
                    {{ new
                      Date(formatDate(member.Dob)).getDate() + "-" + (new
                        Date(formatDate(member.Dob)).getMonth() + 1) + "-" + new
                          Date(formatDate(member.Dob)).getFullYear() }}
                  </a>
                  <a v-if="formatDate(member.Dob) == null">Ngày sinh :</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter">
      <div class="py-2">
        <div class="center-content" style="font-family: 'QuicksandBold';">Tìm kiếm</div>
      </div>
      <div class="input-control">
        <a>Tháng sinh</a>
        <select @change="filter()" v-model="monthSearch" class="form-select">
          <option value="0">Toàn bộ</option>
          <option value="1">Tháng 1</option>
          <option value="2">Tháng 2</option>
          <option value="3">Tháng 3</option>
          <option value="4">Tháng 4</option>
          <option value="5">Tháng 5</option>
          <option value="6">Tháng 6</option>
          <option value="7">Tháng 7</option>
          <option value="8">Tháng 8</option>
          <option value="9">Tháng 9</option>
          <option value="10">Tháng 10</option>
          <option value="11">Tháng 11</option>
          <option value="12">Tháng 12</option>
        </select>
      </div>
      <div class="input-control">
        <a>Giới tính</a>
        <select @change="filter()" v-model="genderSearch" class="form-select">
          <option value="all">Toàn bộ</option>
          <option value="1">Nam</option>
          <option value="0">Nữ</option>
        </select>
      </div>
      <div class="input-control d-flex align-items-center justify-content-center" style>
        <div class="pe-1" style="width: 50%;">
          <a>Trạng thái</a>
          <select @change="filter()" v-model="isDeadSearch" class="form-select py-1 px-2">
            <option value="all">Toàn bộ</option>
            <option value="1">Còn sống</option>
            <option value="0">Đã mất</option>
          </select>
        </div>

        <div class="ps-1" style="width: 50%;">
          <a>Đời</a>
          <select v-model="generationSearch" @change="filter()" class="form-select py-1 px-2">
            <option value="0">Toàn bộ</option>
            <option :value="index" v-for="index in this.numberGeneration" :key="index">{{ index }}</option>
          </select>
        </div>
      </div>
      <div class="input-control">
        <a>Loại thành viên</a>
        <select @change="filter()" v-model="statusSearch" class="form-select">
          <option value="all">Toàn bộ</option>
          <option value="trongdongho">Trong dòng họ</option>
          <option value="ngoaidongho">Ngoài dòng họ</option>
        </select>
      </div>
      <div class="input-control">
        <a>Nhóm tuổi</a>
        <select @change="filter()" v-model="ageSearch" class="form-select">
          <option value="all">Toàn bộ</option>
          <option value="0-5">0-5 tuổi</option>
          <option value="6-17">6-17 tuổi</option>
          <option value="18-40">18-40 tuổi</option>
          <option value="41-60">41-60 tuổi</option>
          <option value=">60">Trên 60 tuổi</option>
        </select>
      </div>
      <div class="pt-2 d-flex align-items-center justify-content-center">
        <button @click="refreshSelect()" class="btn bg-primary text-white button-normal">Làm mới</button>
      </div>
    </div>

    <!-- Modal -->
    <div class="view-member-container">
      <modal name="view-member-mdl">
        <div class="mdl-container">
          <div class="mdl-title">
            <div style="font-family: 'QuicksandBold'; font-size: 17px;">{{ TitleModal }}</div>
            <div class="mdl-close" @click="closeEditHeadModal()">
              <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="mdl-body">
            <div class="view-member-body d-flex" style="padding: 0; height: 100%;">
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
                  <div class="col-4 ps-2 d-flex align-items-center justify-content-center" style="height: 50%;">
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
              <div class="col-10" style="padding-top: 15px" v-show="extendedContact">
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
              <div class="col-10" style="padding-top: 15px" v-if="extendedNote">
                <div class="form-group px-2" style>
                  <textarea v-model="objMemberInfor.Note" style="min-height: 300px; overflow-y: auto;" class="form-control modal-item" id="lichSuCongTac" rows="5" placeholder="Ghi Chú"></textarea>
                </div>
              </div>
            </div>

            <!-- <div class="edit-member-body">
              <div class="h-100">
                <div class="select-menu">
                  <div class="custom-info" :class="{ selected: extendedInfo }" @click="selectedInfor()">
                    Thông
                    tin
                  </div>
                  <div class="custom-info" :class="{ selected: extendedContact }" @click="selectedContact()">Liên hệ</div>
                  <div class="custom-info" :class="{ selected: extendedNote }" @click="selectedNote()">
                    Ghi
                    chú
                  </div>
                </div>
              </div>
              <div class="content">
                <div class="h-100 p-2 d-flex align-items-center justify-content-center">
                  <div style="height: 40%; width: 100%;">
                    <input type="file" ref="fileInput" style="display: none" @change="updateAvatar($event)" />
                    <img @click="triggerFileInputClick()" v-if="avatarSrc" class="h-100 w-100" :src="avatarSrc"
                      style="cursor: pointer; object-fit: cover;" />
                    <div @click="triggerFileInputClick()" v-else class="w-100 h-100 position-relative"
                      style="border: 1px dashed #7a95cd; border-radius: 0.375rem; cursor: pointer;">
                      <div style="width: 15%; height: 15%; position: absolute; inset: 0; margin: auto;">
                        <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%" viewBox="0 0 448 512">
                          <path opacity="1" fill="#7a95cd"
                            d="M246.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 109.3V320c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 53 43 96 96 96H352c53 0 96-43 96-96V352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V352z" />
                        </svg>
                      </div>
                      <div
                        style="color: #7a95cd; position: absolute; inset: 45% 0 0 0; margin: auto; height: fit-content; width: fit-content;">
                        Ảnh thành viên</div>
                    </div>
                  </div>
                </div>
                <div class="d-flex align-items-center">
                  <div class="h-100 w-100 p-2 d-flex flex-column" v-if="extendedInfo">
                    <div class="mdl-item d-flex">
                      <div class="pe-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberInfor.MemberName" type="text" class="form-control" placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.MemberName }">
                          Tên thành
                          viên đầy đủ
                        </label>
                      </div>
                      <div class="ps-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberInfor.NickName" type="text" class="form-control" placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.NickName }">
                          Tên thường
                          gọi
                        </label>
                      </div>
                    </div>
                    <div class="mdl-item" style="display:flex">
                      <div class="pe-1" style="position: relative;width: 50%; ">
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control"
                          placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">
                          Con
                          Thứ
                        </label>
                      </div>
                      <div class="ps-1" style="position: relative; width: 50%;">
                        <select v-model="objMemberInfor.Male" class="form-select">
                          <option value="1">Nam</option>
                          <option value="0">Nữ</option>
                        </select>
                        <label class="form-label" for="select">Giới Tính</label>
                      </div>
                    </div>
                    <div class="mdl-item" style="display:flex">
                      <div class="pe-1" style="position: relative;width: 50%; ">
                        <select v-model="objMemberInfor.BloodType" id="bloodtype" class="form-select">
                          <option :value="null">Chọn Nhóm Máu</option>
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="AB">AB</option>
                          <option value="O">O</option>
                        </select>
                        <label class="form-label-number" for="select">Nhóm Máu</label>
                      </div>
                      <div class="ps-1" style="position: relative;width: 50%; ">
                        <select v-model="objMemberInfor.ReligionID" class="form-select">
                          <option v-for="religion in ListReligion" :key="religion.id" :value="religion.ReligionID">
                            {{
                              religion.ReligionName }}
                          </option>
                        </select>
                        <label class="form-label-number" for="select">Tôn Giáo</label>
                      </div>
                    </div>
                    <div class="mdl-item d-flex">
                      <div class="pe-1" style="position: relative; width: 50%;">
                        <select v-model="objMemberInfor.NationalityID" class="form-select">
                          <option v-for="nation in ListNationality" :key="nation.id" :value="nation.NationalityID">
                            {{
                              nation.NationalityName }}
                          </option>
                        </select>
                        <label class="form-label" for="select">Quốc Tịch</label>
                      </div>
                      <div class="ps-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberInfor.Origin" type="text" class="form-control" placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.Origin }">
                          Nguyên
                          Quán
                        </label>
                      </div>
                    </div>
                    <div class="mdl-item form-group">
                      <div class="dob-txt py-1" style="font-size: 13px;">
                        Ngày Sinh (Tự động đổi từ dương lịch sang âm lịch và
                        ngược lại)
                      </div>
                      <div style="display:flex">
                        <div class="pe-1" style="position: relative; width: 50%;">
                          <input v-model="objMemberInfor.Dob" type="date" class="form-control" placeholder
                            @change="convertSolarToLunar()" />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div class="ps-1" style="position: relative;width: 50%; ">
                          <input v-model="objMemberInfor.LunarDob" type="date" class="form-control" placeholder
                            @change="convertLunarToSolar()" />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                    </div>
                    <div class="mdl-item" style="position: relative; ">
                      <input v-model="objMemberInfor.BirthPlace" type="text" class="form-control" placeholder />
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.BirthPlace }">
                        Nơi
                        sinh
                      </label>
                    </div>
                    <div class="form-check form-check-inline">
                      <input v-model="IsDead" type="checkbox" class="form-check-input" id="lostCheckbox" />
                      <label style="font-size: 14px; margin-top: 7px;" class="form-check-label" for="lostCheckbox">
                        Đã
                        mất
                      </label>
                    </div>
                    <div class="form-group" v-if="IsDead == 1">
                      <div class="dead-txt py-1" style="font-size: 13px;">Ngày Mất (*)</div>
                      <div class="mdl-item" style="display:flex">
                        <div class="pe-1" style="position: relative; width: 50%;">
                          <input v-model="objMemberInfor.Dod" type="date" class="form-control" placeholder />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div class="ps-1" style="position: relative;width: 50%; ">
                          <input v-model="objMemberInfor.LunarDod" type="date" class="form-control" placeholder />
                          <label class="form-label-number" min="0" for="input">Âm lịch</label>
                        </div>
                      </div>
                      <div class="mdl-item d-flex">
                        <div class="pe-1" style="position: relative; width: 50%;">
                          <input type="text" class="form-control" placeholder />
                          <label class="form-label" for="input">Nơi Mất</label>
                        </div>
                        <div class="ps-1" style="position: relative; width: 50%;">
                          <input type="text" class="form-control" placeholder />
                          <label class="form-label" for="input">Mộ Phần</label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="h-100 w-100 p-2 d-flex flex-column" v-if="extendedContact">
                    <div class="mdl-item" style="display:flex">
                      <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                        <select v-model="selectCityMember" class="form-select modal-item" @change="getListDistrict()">
                          <option :value="null" selected>Thành Phố/Tỉnh</option>
                          <option v-for="city in ListCity" :key="city.id" :value="city.id">{{ city.name }}</option>
                        </select>
                        <label class="form-label" for="select">Địa Chỉ (Thành Phố/Tỉnh)</label>
                      </div>
                      <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                        <select class="form-select modal-item">
                          <option :value="null" selected>Quận/Huyện</option>
                        </select>
                        <label class="form-label" for="select">Địa Chỉ (Quận/Huyện)</label>
                      </div>
                    </div>
                    <div class="mdl-item" style="display:flex">
                      <div class="pb-2 pe-1" style="position: relative; width: 50%;">
                        <VuePhoneNumberInput ref="phoneNumberInput" v-model="objMemberContact.Phone"
                          :disabled="isDisabled" :default-country="defaultCountry" :validations="validations">
                        </VuePhoneNumberInput>
                      </div>
                      <div class="pb-2 ps-1" style="position: relative; width: 50%;">
                        <input v-model="objMemberContact.Email" type="email" class="form-control modal-item"
                          placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberContact.Email }">Email</label>
                      </div>
                    </div>
                    <div class="mdl-item pb-2" style="position: relative;">
                      <input v-model="objMemberContact.FacebookUrl" type="text" class="form-control modal-item"
                        placeholder />
                      <label style="left: 25px;" class="form-label" for="input"
                        :class="{ 'active': objMemberContact.FacebookUrl }">Facebook</label>
                    </div>
                    <div class="mdl-item pb-2" style="position: relative;">
                      <input v-model="objMemberContact.Zalo" type="text" class="form-control modal-item" placeholder />
                      <label style="left: 25px;" class="form-label" for="input"
                        :class="{ 'active': objMemberContact.Zalo }">Zalo</label>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->
          </div>
          <div class="mdl-footer">
            <div class="h-100 d-flex align-items-center justify-content-end">
              <div class="pe-2">
                <button type="button" class="btn btn-primary mt-0" @click="updateInformation()">Sửa</button>
              </div>
              <div class="pe-2">
                <button type="button" class="btn btn-secondary mt-0" @click="closeSelectModal()">Cancel</button>
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
              <div class="d-flex align-items-center justify-content-center">Bạn có chắc chắn muốn xóa thành viên {{
                objMemberInfor.MemberName }}</div>
              <div class="d-flex align-items-center justify-content-evenly">
                <div class="p-2">
                  <button class="btn text-white bg-danger" @click="removeMember(), closeCfDelModal()">Có</button>
                </div>
                <div class="p-2">
                  <button class="btn text-white bg-primary" @click="closeCfDelModal()">Không</button>
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
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import { HTTP } from "../assets/js/baseAPI.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LunarDate } from "vietnamese-lunar-calendar";
import { convertLunar2Solar } from "vietnamese-lunar-calendar/build/solar-lunar";
import { getLocalTimezone } from "vietnamese-lunar-calendar/build/solar-lunar/utils";
import Snackbar from "awesome-snackbar";
export default {
  data() {
    return {
      memberList: [],
      memberFilter: [],
      monthSearch: 0,
      generationSearch: 0,
      genderSearch: "all",
      isDeadSearch: "all",
      statusSearch: "all",
      ageSearch: "all",

      numberMale: 0,
      numberFemale: 0,
      totalMember: 0,
      numberGeneration: 0,
      numberAlive: 0,
      numberDied: 0,

      monthDob: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      memberRole: null,

      CodeID: null,
      isUpdateAvatar: false,
      objMemberInfor: {
        MemberID: 0,
        ParentID: null,
        MarriageID: null,
        MemberName: null,
        NickName: null,
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
      TitleModal: null,
      avatarSrc: null,
      isEdit: false,
      IsDead: 0,
      memberIdChoose: null,

      extendedInfo: true,
      extendedContact: false,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,
      isDead: false,
      ListNationality: null,
      ListReligion: null,
      CurrentIdMember: null,

      changeColor: null,
      isButtonDisabled: true,
      itemChoose: null,

      genSort: false,
      dobSort: true,
      genAscending: false,
      dobAscending: true,
    };
  },

  methods: {
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
    triggerFileInputClick() {
      this.$refs.fileInputRef.click();
    },
    getListReligion() {
      HTTP.get("religion", {})
        .then((response) => {
          this.ListReligion = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListNationality() {
      HTTP.get("nationality", {})
        .then((response) => {
          this.ListNationality = response.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    toggleGenAscendDescend() {
      this.genAscending = !this.genAscending;
    },
    toggleDobAscendDescend() {
      this.dobAscending = !this.dobAscending;
    },
    clickGenSort() {
      if (this.genSort) {
        this.toggleGenAscendDescend();
      } else {
        this.genSort = true;
        this.dobSort = false;
      }
      this.sortListMember();
    },
    clickDobSort() {
      if (this.dobSort) {
        this.toggleDobAscendDescend();
      } else {
        this.dobSort = true;
        this.genSort = false;
      }
      this.sortListMember();
    },
    selectedInfor() {
      this.extendedInfo = true;
      this.extendedContact = false;
      this.extendedNote = false;
    },
    selectedContact() {
      this.extendedInfo = false;
      this.extendedContact = true;
      this.extendedNote = false;
    },
    selectedNote() {
      this.extendedInfo = false;
      this.extendedContact = false;
      this.extendedNote = true;
    },
    sortListMember() {
      if (this.genAscending && this.genSort) {
        this.memberFilter.sort((a, b) => a.Generation - b.Generation);
      } else if (!this.genAscending && this.genSort) {
        this.memberFilter.sort((a, b) => b.Generation - a.Generation);
      }
      console.log(this.dobAscending);
      console.log(this.dobSort);
      if (this.dobAscending && this.dobSort) {
        this.memberFilter.sort(
          (a, b) =>
            new Date(this.formatDate(b.Dob)) - new Date(this.formatDate(a.Dob))
        );
      } else if (!this.dobAscending && this.dobSort) {
        this.memberFilter.sort(
          (a, b) =>
            new Date(this.formatDate(a.Dob)) - new Date(this.formatDate(b.Dob))
        );
      }
    },
    chooseMember(id) {
      this.memberIdChoose = id;
      console.log(id);
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
    formatDate(dateString) {
      let formattedDate;
      if (dateString == null) {
        return null;
      }
      if (dateString.length <= 10) {
        const dateParts = dateString.split("-");
        formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      } else {
        formattedDate = dateString;
      }
      const date = new Date(formattedDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    refreshSelect() {
      this.genderSearch = "all";
      this.generationSearch = 0;
      this.monthSearch = 0;
      this.isDeadSearch = "all";
      this.statusSearch = "all";
      this.ageSearch = "all";
      this.itemChoose = null;
      this.filter();
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
      console.log(111)
      if (this.selectDistrictMember != null) {
        this.objMemberContact.Address =
          this.objMemberContact.Address + "-" + this.selectDistrictMember;
      }
      HTTP.put("member", {
        MemberID: this.CurrentIdMember,
        MemberName: this.objMemberInfor.MemberName,
        NickName: this.objMemberInfor.NickName,
        BirthOrder: this.objMemberInfor.BirthOrder,
        Origin: this.objMemberInfor.BirthOrder,
        NationalityID: this.objMemberInfor.NationalityID,
        ReligionID: this.objMemberInfor.ReligionID,
        Dob: this.objMemberInfor.Dob,
        LunarDob: this.objMemberInfor.LunarDob,
        bnirthPlace: this.objMemberInfor.BirthPlace,
        IsDead: this.IsDead,
        Dod: this.objMemberInfor.Dod,
        LunarDod: this.objMemberInfor.LunarDod,
        PlaceOfDeath: this.objMemberInfor.PlaceOfDeadth,
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
              this.$modal.hide("view-member-mdl");
              this.getListMemberInGenalogy();
            });
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
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
    takeDataMember(id) {
      this.CurrentIdMember = this.objMemberInfor.MemberID;
      this.generationMember = this.objMemberInfor.Generation;
      this.CodeID = this.objMemberInfor.CodeID;
      this.IsDead = this.objMemberInfor.IsDead;
      this.idPaternalAncestor = id;
    },
    getInforMember(id) {
      this.CurrentIdMember = id;
      HTTP.get("InforMember", {
        params: {
          memberId: id,
        },
      })
        .then((response) => {
          this.objMember = response.data.data;
          if (this.objMember.infor.length > 0) {
            this.objMemberInfor = this.objMember.infor[0];
            this.takeDataMember(id);
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
          this.changeColor = "rgb(174, 214, 241)";
          console.log(this.isButtonDisabled);
          this.isButtonDisabled = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    numberItemSelection(index) {
      this.itemChoose = index;
    },
    openEditHeadModal() {
      this.$modal.show("view-member-mdl");
    },
    closeEditHeadModal() {
      this.$modal.hide("view-member-mdl");
    },
    closeCfDelModal() {
      this.$modal.hide("cfdel-modal");
    },
    filter() {
      this.memberFilter = this.memberList;
      this.sortListMember();
      if (this.genderSearch != "all") {
        this.memberFilter = this.memberFilter.filter(
          (member) => member.Male == this.genderSearch
        );
      }
      if (this.generationSearch != 0) {
        this.memberFilter = this.memberFilter.filter(
          (member) => member.Generation == this.generationSearch
        );
      }
      if (this.monthSearch != 0) {
        this.memberFilter = this.memberFilter.filter((member) =>
          this.formatDate(member.Dob) != null
            ? new Date(this.formatDate(member.Dob)).getMonth() + 1 ==
            this.monthSearch
            : new Date(this.formatDate(member.Dob)).getMonth() + 1 == 0
        );
      }
      if (this.isDeadSearch != "all") {
        this.memberFilter = this.memberFilter.filter(
          (member) => member.IsDead != this.isDeadSearch
        );
      }
      if (this.statusSearch != "all") {
        if (this.statusSearch == "trongdongho") {
          this.memberFilter = this.memberFilter.filter(
            (member) => member.FatherID != null || member.Generation == 1
          );
        }
        if (this.statusSearch == "ngoaidongho") {
          this.memberFilter = this.memberFilter.filter(
            (member) => member.FatherID == null && member.Generation != 1
          );
        }
      }
      if (this.ageSearch != "all") {
        if (this.ageSearch == "0-5") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter((member) =>
            this.formatDate(member.Dob) != null
              ? 0 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 5
              : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "6-17") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter((member) =>
            this.formatDate(member.Dob) != null
              ? 6 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 17
              : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "18-40") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter((member) =>
            this.formatDate(member.Dob) != null
              ? 18 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 40
              : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "41-60") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter((member) =>
            this.formatDate(member.Dob) != null
              ? 41 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 60
              : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == ">60") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter((member) =>
            this.formatDate(member.Dob) != null
              ? this.ageMember(member.Dob) && this.ageMember(member.Dob) > 60
              : this.ageMember(member.Dob) == -1
          );
        }
      }
    },
    ageMember(memberDob) {
      let dob = new Date(this.formatDate(memberDob));
      let now = new Date();
      var age = Math.floor((now - dob) / (365.25 * 24 * 60 * 60 * 1000));
      return age;
    },
    getNumberMemberByGeneration(generation) {
      let count = 0;
      for (let i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i].generation == generation) {
          count += 1;
        }
      }
      return count;
    },
    takeInforList() {
      (this.numberMale = 0),
        (this.numberFemale = 0),
        (this.totalMember = 0),
        (this.numberGeneration = 0),
        (this.numberAlive = 0),
        (this.numberDied = 0),
        (this.totalMember = this.memberList.length);
      for (let i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i].Male == 1) {
          this.numberMale += 1;
        }
        if (this.memberList[i].Male == 0) {
          this.numberFemale += 1;
        }
        if (this.memberList[i].Generation > this.numberGeneration) {
          this.numberGeneration = this.memberList[i].Generation;
        }
        if (this.memberList[i].IsDead == 0) {
          this.numberAlive += 1;
        }
        if (this.memberList[i].IsDead == 1) {
          this.numberDied += 1;
        }
      }
    },

    getListMemberInGenalogy() {
      HTTP.get("membersInGenealogy", {
        params: {
          CodeID: this.CodeID,
        },
      }).then((response) => {
        if (response.data.success == true) {
          this.memberList = response.data.data;
          for (let i = 0; i < this.memberList.length; i++) {
            if (this.memberList[i].MemberName.length > 13) {
              this.memberList[i].MemberName =
                this.memberList[i].MemberName.substring(0, 12) + "...";
            }
          }
          this.memberFilter = this.memberList;

          console.log(this.memberList);
          this.takeInforList();
        } else {
          if (response.data.status_code == 402) {
            localStorage.removeItem("CodeID");
            localStorage.removeItem("accountID");
            this.$router.push("/login");
          }
          this.memberList = [];
          this.memberFilter = this.memberList;
          this.CurrentIdMember = null;
        }
      });
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
      this.getListMemberInGenalogy();
      this.getListNationality();
      this.getListReligion();
      this.getMemberRole();
    }
  },
};
</script>