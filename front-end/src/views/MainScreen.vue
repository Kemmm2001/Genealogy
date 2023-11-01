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
      <div class="list-item d-flex flex-row w-100">
        <div class="col-md-6 pt-1" style="padding-right: 4px;">
          <select v-model="selectBloodType" class="d-flex text-center form-select dropdown p-0" @change="GetListFilterMember()">
            <option v-for="blood in ListBloodTypeGroup" :key="blood.id" class="dropdown-item" :value="blood.id">{{blood.BloodTyoe}}</option>
          </select>
        </div>
        <div class="col-md-6 pt-1">
          <select class="d-flex text-center form-select dropdown p-0" v-model="selectAge" @change="GetListFilterMember()">
            <option v-for="age in ListAgeGroup" :key="age.id" class="dropdown-item" :value="age.id">{{age.Age}}</option>
          </select>
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
                <div v-show="expandAddRelaionship" class="list-group-item">Thêm Cha</div>
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
            <button v-else-if="isAddParent" type="button" class="btn btn-primary mr-2" @click="addNewChildrenMember()">Thêm</button>
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

      selectAge: null,
      selectBloodType: null,
      selectAdress: null,

      listFilterMember: null,

      isAddChildren: false,
      isAddMarried: false,
      isAddParent: false,

      newIdMember: null,
      CurrentIdMember: null,
      generationMember: null,
      CodeID: null,
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
        '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
      FamilyTree.templates.tommy_male.field_2 =
        '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">Ngày Sinh: {val}</text>';
      FamilyTree.templates.tommy_male.field_3 =
        '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">Ngày Mất: {val}</text>';
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
        },
        lazyLoading: false,
        nodeMouseClick: FamilyTree.action.none,
        enableSearch: false,
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
        CodeId: 123456,
      }).then(() => {
        this.getListAfterSetPaternalAncestor(this.CurrentIdMember);
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
    takeDataMember(id) {
      this.CurrentIdMember = this.objMemberInfor.MemberID;
      this.generationMember = this.objMemberInfor.Generation;
      this.CodeID = this.objMemberInfor.CodeID;
      this.IsDead = this.objMemberInfor.IsDead;
      this.idPaternalAncestor = id;
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
    addNewMarriedMember() {
      console.log(this.CurrentIdMember);
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
        CodeID: 123456,
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
    getListMember() {
      HTTP.get("viewTree", {
        params: {
          memberID: 6,
        },
      })
        .then((response) => {
          this.nodes = response.data;
          console.log(this.nodes)
          for (let i = 0; i < this.nodes.length; i++) {
            this.nodes[i].tags = [];
          }

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
    this.getListMember();
    this.getListNationality();
    this.getListReligion();
    this.getListAgeGroup();
    this.getListBloodTypeGroup();
  },
};
</script>
 
<style>
@import "../assets/css/familytree.css";
.row-selected {
  --bs-table-bg: #f0f0f0;
}
</style>
