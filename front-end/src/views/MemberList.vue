<!-- Lâm -->
<!-- phùng việt khôi -->
<template>
  <div class="container-fluid position-relative" style="padding: 32px 120px;overflow-y: auto;">
    <div class="d-flex flex-row position-absolute" style="width: calc(100% - 240px); height: calc(100% - 32px);">
      <div class="col-10 column m-0" style="height: calc(100% - 32px);">
        <div class="filter-member d-flex flex-row w-100">
          <div class="filter-option col-3">
            <a>Tổng số thành viên: {{ this.memberList.length }} người</a>
            <br />
            <a>Dòng họ có: {{ this.numberGeneration }} đời</a>
            <br />
          </div>
          <div class="filter-option col-3">
            <a>Nam: {{ this.numberMale }} người</a>
            <br />
            <a>Nữ: {{ this.numberFemale }} người</a>
          </div>
          <div class="filter-option col-3">
            <a>Còn sống: {{ this.numberAlive }} người</a>
            <br />
            <a>Đã mất: {{ this.numberDied }} người</a>
            <br />
          </div>
        </div>
        <div class="list-member w-100">
          <div class="button-member d-flex align-items-center">
            <button @click="openEditHeadModal()" class="btn bg-info text-white m-2" :disabled="isButtonDisabled">
              Chỉnh
              sửa
            </button>
            <button @click="showCfDel(), getInforMember(CurrentIdMember)" class="btn bg-info text-white m-2"
              :disabled="isButtonDisabled">Xóa</button>
          </div>
          <div class="view-member">
            <div @click="numberItemSelection(index), getInforMember(member.MemberID)" class="member" style="cursor: pointer;" :class="{ choose: itemChoose === index }" v-for="(member, index) in memberFilter" :key="member.MemberID">
              <div class="image-member" v-if="member.Male == 1">
                <img class="avatar" src="https://pereaclinic.com/wp-content/uploads/2019/12/270x270-male-avatar.png" />
              </div>
              <div class="image-member" v-if="member.Male == 0">
                <img class="avatar" src="https://pereaclinic.com/wp-content/uploads/2019/12/270x270-female-avatar.png" />
              </div>
              <div class="infor-member">
                <b>{{ member.MemberName }}</b>
                <br />
                <a>Đời thứ : {{ member.Generation }}</a>
                <br />
                <a v-if="formatDate(member.Dob) != null">Ngày sinh : {{ new Date(formatDate(member.Dob)).getDate()+"-"+(new Date(formatDate(member.Dob)).getMonth()+1 )+"-"+new Date(formatDate(member.Dob)).getFullYear()}}</a>
                <a v-if="formatDate(member.Dob) == null">Ngày sinh : </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-2 column m-0" style="height: calc(100% - 35px);">
        <div class="sort-member">
          <p class="title">Sắp xếp</p>
          <div class="sort-button d-flex justify-content-center">
            <button @click="clickGenSort()" :class="{ chosen: genSort }"
              class="btn d-flex justify-content-center align-items-center">
              <i v-if="genAscending" class="bi bi-arrow-up" style="padding-right: 8px;"></i>
              <i v-if="!genAscending" class="bi bi-arrow-up" style="padding-left: 8px; transform: rotate(180deg);"></i>
              <div>Đời</div>
            </button>
            <button @click="clickDobSort()" :class="{ chosen: dobSort }"
              class="btn d-flex justify-content-center align-items-center" style="margin-left: 4px;">
              <i v-if="dobAscending" class="bi bi-arrow-up" style="padding-right: 8px;"></i>
              <i v-if="!dobAscending" class="bi bi-arrow-up" style="padding-left: 8px; transform: rotate(180deg);"></i>
              <div>Ngày sinh</div>
            </button>
          </div>
        </div>
        <div class="search-member">
          <p class="title">Tìm kiếm</p>
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
              <!-- <option value="0">Không rõ</option> -->
            </select>
          </div>
          <div class="input-control">
            <a>Đời</a>
            <select v-model="generationSearch" @change="filter()" class="form-select">
              <option value="0">Toàn bộ</option>
              <option :value="index" v-for="index in this.numberGeneration" :key="index">{{ index }}</option>
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
          <div class="input-control">
            <a>Trạng thái</a>
            <select @change="filter()" v-model="isDeadSearch" class="form-select">
              <option value="all">Toàn bộ</option>
              <option value="1">Còn sống</option>
              <option value="0">Đã mất</option>
            </select>
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
          <div class="submit-control">
            <button @click="refreshSelect()" class="btn bg-primary text-white button-normal">Làm mới</button>
          </div>
        </div>
        <div></div>
      </div>
      <modal name="editHead-modal">
        <div class="card" v-if="objMemberInfor" style="border: none;">
          <div class="card-header modal-title text-center p-0 d-flex align-items-center justify-content-center">
            <h5 class="m-0">{{ TitleModal }}</h5>
            <div class="close-add-form" @click="closeEditHeadModal" style="top: 8px;right:5px">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
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
                          <path
                            d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421 c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" />
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
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.MemberName }">
                        Tên thành
                        viên đầy đủ
                      </label>
                    </div>
                    <div style="display:flex">
                      <div style="position: relative; width: 50%;margin-right: 10px;">
                        <input v-model="objMemberInfor.NickName" type="text" class="form-control modal-item"
                          placeholder />
                        <label class="form-label" for="input" :class="{ 'active': objMemberInfor.NickName }">
                          Tên thường
                          gọi
                        </label>
                      </div>
                      <div style="position: relative;width: 50%; margin-right: 10px;">
                        <input v-model="objMemberInfor.BirthOrder" type="number" min="0" class="form-control modal-item"
                          placeholder />
                        <label class="form-label-number" for="input" :class="{ 'active': objMemberInfor.BirthOrder }">
                          Con
                          Thứ
                        </label>
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
                      <label class="form-label" for="input" :class="{ 'active': objMemberInfor.Origin }">
                        Nguyên
                        Quán
                      </label>
                    </div>
                    <div class="form-group">
                      <h6 style="margin-bottom:20px">
                        Ngày Sinh (Hệ thống sẽ tự đổi từ ngày dương lịch sang âm lịch và
                        ngược lại)
                      </h6>
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
                      <h6 style="margin-bottom:20px">Ngày Mất (*)</h6>
                      <div style="display:flex">
                        <div style="position: relative; width: 50%;margin-right: 10px;">
                          <input v-model="objMemberInfor.Dod" type="date" class="form-control modal-item" placeholder />
                          <label class="form-label" for="input">Dương Lịch</label>
                        </div>
                        <div style="position: relative;width: 50%; margin-right: 10px;">
                          <input v-model="objMemberInfor.LunarDod" type="date" class="form-control modal-item"
                            placeholder />
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
                      <VuePhoneNumberInput ref="phoneNumberInput" v-model="objMemberContact.Phone" :disabled="isDisabled"
                        :default-country="defaultCountry" :validations="validations"></VuePhoneNumberInput>
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
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Organization }">
                        Tên Cơ
                        Quan
                      </label>
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
                      <label class="form-label" for="input" :class="{ 'active': objMemberJob.Role }">
                        Vị trí công
                        tác
                      </label>
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
          <div class="card-footer modal-footer">
            <div class="d-flex justify-content-end" style="padding-right: 12px;">
              <button type="button" class="btn btn-danger mr-2" @click="removeFamilyHead()">Xóa</button>
              <button style="margin-left:10px" type="button" class="btn btn-primary mr-2"
                @click="updateInformation()">Sửa</button>
              <button style="margin-left:10px" type="button" class="btn btn-secondary"
                @click="closeSelectModal()">Cancel</button>
            </div>
          </div>
        </div>
      </modal>
      <div class="cfdel-modal-container">
        <modal name="cfdel-modal">
          <div class="w-100 h-100 add-head-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 text-white"
                style="background-color: rgb(255, 8, 0);;">Quan trọng</div>
              <div class="close-add-form" @click="closeCfDelModal()">
                <svg class="close-add-form-icon" style="fill: #FFFFFF !important;" xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="w-100 d-flex flex-column align-items-center justify-content-center"
              style="height: calc(100% - 50px);">
              <div class="d-flex align-items-center px-3" style="height: 70%; font-size: 19px;">
                Bạn có chắc chắn muốn xóa
                thành viên {{ objMemberInfor.MemberName }}
              </div>
              <div class="d-flex flex-row w-100" style="height: 30%;">
                <div class="col-6 d-flex align-items-center justify-content-center">
                  <div class="btn bg-danger text-white" @click="removeMember(), closeCfDelModal()">Có</div>
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
  </div>
</template>
<script>
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

      CodeID: null,

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
    getListReligion() {
      HTTP.get("religion")
        .then((response) => {
          this.ListReligion = response.data;
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
            this.getListUnspecifiedMembers();
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
          this.objMember = response.data;
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
      this.$modal.show("editHead-modal");
    },
    closeEditHeadModal() {
      this.$modal.hide("editHead-modal");
    },
    showCfDel() {
      this.$modal.show("cfdel-modal");
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
        this.memberFilter = this.memberFilter.filter(
          (member) => this.formatDate(member.Dob) != null ? 
            new Date(this.formatDate(member.Dob)).getMonth() + 1 ==
            this.monthSearch : new Date(this.formatDate(member.Dob)).getMonth() + 1 == 0
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
          this.memberFilter = this.memberFilter.filter(
            (member) => this.formatDate(member.Dob) != null ?
              0 <= this.ageMember(member.Dob) && this.ageMember(member.Dob) <= 5 : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "6-17") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter(
            (member) => this.formatDate(member.Dob) != null ?
              6 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 17 : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "18-40") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter(
            (member) => this.formatDate(member.Dob) != null ?
              18 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 40 : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == "41-60") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter(
            (member) => this.formatDate(member.Dob) != null ?
              41 <= this.ageMember(member.Dob) &&
              this.ageMember(member.Dob) <= 60 : this.ageMember(member.Dob) == -1
          );
        }
        if (this.ageSearch == ">60") {
          console.log(this.ageSearch);
          this.memberFilter = this.memberFilter.filter(
            (member) => this.formatDate(member.Dob) != null ?
              this.ageMember(member.Dob) && this.ageMember(member.Dob) > 60 : this.ageMember(member.Dob) == -1
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
      this.totalMember = this.memberList.length;
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
        // let month = 1;
        // while (
        //   new Date(this.formatDate(this.memberList[i].dob)).getMonth() + 1 !=
        //   month
        // ) {
        //   month += 1;
        // }
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
          this.memberFilter = this.memberList;
          console.log(this.memberList )
          this.takeInforList();
        }else{
          this.memberList = [];
          this.memberFilter = this.memberList;
          this.CurrentIdMember = null;
        }
      });
    },
    openMemberModal() {
      this.$modal.show("member-modal");
    },
    closeMemberModal() {
      this.$modal.hide("member-modal");
    },
    removeMember() {
      HTTP.get("deleteContact", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).catch((response) => {
        this.NotificationsDelete(response.data.message);
      });

      HTTP.get("RemoveListJob", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });

      HTTP.get("deleteListEducation", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).catch((e) => {
        console.log(e);
      });
      HTTP.get("delete-member", {
        params: {
          MemberID: this.CurrentIdMember,
        },
      }).then((response) => {
        if (response.data.success == true) {
          // this.nodes.length = this.nodes.length - 1;
          this.NotificationsDelete(response.data.message);
          this.$modal.hide("Select-option-Modal");
          this.getListMemberInGenalogy();
        } else {
          this.NotificationsDelete(response.data.message);
        }
      });
    },
    // getListMember() {
    //   HTTP.get("viewTree", {
    //     params: {
    //       CodeID: this.CodeID,
    //     },
    //   })
    //     .then((response) => {
    //       if (response.data.success == true) {
    //         console.log(response.data.data);
    //         this.memberList = response.data.data;
    //         this.memberFilter = this.memberList;
    //         this.takeInforList();
    //       }
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // },
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
    this.getListMemberInGenalogy();
    this.getListNationality();
    this.getListReligion();
 //   this.getListMember();
  },
};
</script>
<!---->