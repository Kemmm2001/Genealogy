<template>
    <div class="members-grid-container">
        <div class="overview">
            <div class="ps-4 pe-2">
                <div class="center-content">
                    <div class="">
                        <a>Tổng số thành viên: {{ this.memberList.length }} người</a>
                        <br />
                        <a>Dòng họ có: {{ this.numberGeneration }} đời</a>
                        <br />
                    </div>
                </div>
            </div>
            <div class="px-2">
                <div class="center-content">
                    <div class="">
                        <a>Nam: {{ this.numberMale }} người</a>
                        <br />
                        <a>Nữ: {{ this.numberFemale }} người</a>
                    </div>
                </div>
            </div>
            <div class="ps-2">
                <div class="center-content">
                    <div class="">
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
                <div class="">
                    <div @click="clickGenSort()" :class="{ 'bg-primary': genSort, 'bg-secondary': !genSort }"
                        class="btn text-white d-flex justify-content-center align-items-center p-1">
                        <i v-if="genAscending" class="bi bi-arrow-up" style="padding-right: 2px;"></i>
                        <i v-if="!genAscending" class="bi bi-arrow-up"
                            style="padding-left: 2px; transform: rotate(180deg);"></i>
                        <div>Đời</div>
                    </div>
                </div>
                <div class="ms-1">
                    <div @click="clickDobSort()" :class="{ 'bg-primary': dobSort, 'bg-secondary': !dobSort }"
                        class="btn text-white d-flex justify-content-center align-items-center p-1">
                        <i v-if="dobAscending" class="bi bi-arrow-up" style="padding-right: 2px;"></i>
                        <i v-if="!dobAscending" class="bi bi-arrow-up"
                            style="padding-left: 2px; transform: rotate(180deg);"></i>
                        <div>Ngày sinh</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="member-list">
            <div class="content">
                <div class="d-flex align-items-center">
                    <div class="">
                        <button @click="openEditMemberModal()" class="btn text-white" :disabled="isButtonDisabled"
                            :class="{ 'bg-primary': !isButtonDisabled, 'bg-info': isButtonDisabled }">Chỉnh sửa</button>
                    </div>
                    <div class="ps-2">
                        <button @click="showCfDel(), getInforMember(CurrentIdMember)" class="btn text-white"
                            :disabled="isButtonDisabled"
                            :class="{ 'bg-primary': !isButtonDisabled, 'bg-info': isButtonDisabled }">Xóa</button>
                    </div>
                </div>
                <div class="pt-2">
                    <div class="h-100 w-100">
                        <div v-if="memberList.length == 0" class="center-content">
                            Gia phả chưa có thành viên nào
                        </div>
                        <div class="h-100 d-flex flex-wrap" style="overflow-y: auto;">
                            <div @click="numberItemSelection(index), getInforMember(member.MemberID)" class="member me-3"
                                style="cursor: pointer;" :class="{ choose: itemChoose === index }"
                                v-for="(member, index) in memberFilter" :key="member.MemberID">
                                <div class="h-100" v-if="member.Male == 1">
                                    <img class="h-100" src="../assets/image/270x270-male-avatar.png" />
                                </div>
                                <div class="h-100" v-if="member.Male == 0">
                                    <img class="h-100" src="../assets/image/270x270-female-avatar.png" />
                                </div>
                                <div class="px-2">
                                    <b>{{ member.MemberName }}</b>
                                    <br />
                                    <a>Đời thứ : {{ member.Generation }}</a>
                                    <br />
                                    <a v-if="formatDate(member.Dob) != null">Ngày sinh : {{ new
                                        Date(formatDate(member.Dob)).getDate() + "-" + (new
                                            Date(formatDate(member.Dob)).getMonth() + 1) + "-" + new
                                                Date(formatDate(member.Dob)).getFullYear() }}</a>
                                    <a v-if="formatDate(member.Dob) == null">Ngày sinh : </a>
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
            <div class="input-control d-flex align-items-center justify-content-center" style="">
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
        <div class="edit-member-container">
            <modal name="edit-member-mdl">
                <div class="mdl-container">
                    <div class="mdl-title">
                        <div style="font-family: 'QuicksandBold'; font-size: 17px;">{{ TitleModal }}</div>
                        <div class="mdl-close" @click="closeEditMemberModal()">
                            <svg class="h-100" style="cursor: pointer;" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                    </div>
                    <div class="mdl-body">
                        <div class="edit-member-body">
                            <div class="h-100">
                                <div class="select-menu">
                                    <div class="custom-info" :class="{ selected: extendedInfo }" @click="selectedInfor()">
                                        Thông
                                        tin</div>
                                    <div class="custom-info" :class="{ selected: extendedContact }"
                                        @click="selectedContact()">
                                        Liên hệ</div>
                                    <div class="custom-info" :class="{ selected: extendedNote }" @click="selectedNote()">Ghi
                                        chú
                                    </div>
                                </div>
                            </div>
                            <div class="content">
                                <div class="h-100 p-2 d-flex align-items-center justify-content-center">
                                    <div style="height: 40%; width: 100%;">
                                        <input type="file" ref="fileInput" style="display: none"
                                            @change="updateAvatar($event)" />
                                        <img @click="triggerFileInputClick()" v-if="avatarSrc" class="h-100 w-100"
                                            :src="avatarSrc" style="cursor: pointer; object-fit: cover;" />
                                        <div @click="triggerFileInputClick()" v-else class="w-100 h-100 position-relative"
                                            style="border: 1px dashed #7a95cd; border-radius: 0.375rem; cursor: pointer;">
                                            <div
                                                style="width: 15%; height: 15%; position: absolute; inset: 0; margin: auto;">
                                                <svg xmlns="http://www.w3.org/2000/svg" height="100%" width="100%"
                                                    viewBox="0 0 448 512">
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
                                    <div class="h-100 w-100 p-2 d-flex flex-column justify-content-evenly">
                                        <div class="mdl-item d-flex">
                                            <div class="pe-1" style="position: relative; width: 50%;">
                                                <input v-model="objMemberInfor.MemberName" type="text" class="form-control"
                                                    placeholder />
                                                <label class="form-label" for="input"
                                                    :class="{ 'active': objMemberInfor.MemberName }">
                                                    Tên thành
                                                    viên đầy đủ
                                                </label>
                                            </div>
                                            <div class="ps-1" style="position: relative; width: 50%;">
                                                <input v-model="objMemberInfor.NickName" type="text" class="form-control"
                                                    placeholder />
                                                <label class="form-label" for="input"
                                                    :class="{ 'active': objMemberInfor.NickName }">
                                                    Tên thường
                                                    gọi
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mdl-item" style="display:flex">
                                            <div class="pe-1" style="position: relative;width: 50%; ">
                                                <input v-model="objMemberInfor.BirthOrder" type="number" min="0"
                                                    class="form-control" placeholder />
                                                <label class="form-label-number" for="input"
                                                    :class="{ 'active': objMemberInfor.BirthOrder }">
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
                                                <select v-model="objMemberInfor.BloodType" id="bloodtype"
                                                    class="form-select">
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
                                                    <option v-for="religion in ListReligion" :key="religion.id"
                                                        :value="religion.ReligionID">
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
                                                    <option v-for="nation in ListNationality" :key="nation.id"
                                                        :value="nation.NationalityID">
                                                        {{
                                                            nation.NationalityName }}
                                                    </option>
                                                </select>
                                                <label class="form-label" for="select">Quốc Tịch</label>
                                            </div>
                                            <div class="ps-1" style="position: relative; width: 50%;">
                                                <input v-model="objMemberInfor.Origin" type="text" class="form-control"
                                                    placeholder />
                                                <label class="form-label" for="input"
                                                    :class="{ 'active': objMemberInfor.Origin }">
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
                                                    <input v-model="objMemberInfor.Dob" type="date" class="form-control"
                                                        placeholder @change="convertSolarToLunar()" />
                                                    <label class="form-label" for="input">Dương Lịch</label>
                                                </div>
                                                <div class="ps-1" style="position: relative;width: 50%; ">
                                                    <input v-model="objMemberInfor.LunarDob" type="date"
                                                        class="form-control" placeholder @change="convertLunarToSolar()" />
                                                    <label class="form-label-number" min="0" for="input">Âm lịch</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mdl-item" style="position: relative; ">
                                            <input v-model="objMemberInfor.BirthPlace" type="text" class="form-control"
                                                placeholder />
                                            <label class="form-label" for="input"
                                                :class="{ 'active': objMemberInfor.BirthPlace }">
                                                Nơi
                                                sinh
                                            </label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input v-model="IsDead" type="checkbox" class="form-check-input"
                                                id="lostCheckbox" />
                                            <label style="font-size: 14px; margin-top: 7px;" class="form-check-label"
                                                for="lostCheckbox">
                                                Đã
                                                mất
                                            </label>
                                        </div>
                                        <div class="form-group" v-if="IsDead == 1">
                                            <div class="dead-txt py-1" style="font-size: 13px;">Ngày Mất (*)</div>
                                            <div class="mdl-item" style="display:flex">
                                                <div class="pe-1" style="position: relative; width: 50%;">
                                                    <input v-model="objMemberInfor.Dod" type="date" class="form-control"
                                                        placeholder />
                                                    <label class="form-label" for="input">Dương Lịch</label>
                                                </div>
                                                <div class="ps-1" style="position: relative;width: 50%; ">
                                                    <input v-model="objMemberInfor.LunarDod" type="date"
                                                        class="form-control" placeholder />
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
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="mdl-footer">
                        <div class="h-100 d-flex align-items-center justify-content-end">
                            <div class="pe-2">
                                <button type="button" class="btn btn-danger mt-0" @click="removeFamilyHead()">Xóa</button>
                            </div>
                            <div class="pe-2">
                                <button type="button" class="btn btn-primary mt-0" @click="updateInformation()">Sửa</button>
                            </div>
                            <div class="pe-2">
                                <button type="button" class="btn btn-secondary mt-0"
                                    @click="closeSelectModal()">Cancel</button>
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
                            <div class="d-flex align-items-center justify-content-center">Bạn có chắc chắn muốn xóa thành
                                viên {{ objMemberInfor.MemberName }}</div>
                            <div class="d-flex align-items-center justify-content-evenly">
                                <div class="p-2">
                                    <button class="btn text-white bg-danger"
                                        @click="removeMember(), closeCfDelModal()">Có</button>
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
            HTTP.get("religion", {

            })
                .then((response) => {
                    this.ListReligion = response.data;
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        getListNationality() {
            HTTP.get("nationality", {

            })
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
        openEditMemberModal() {
            this.$modal.show("edit-member-mdl");
        },
        closeEditMemberModal() {
            this.$modal.hide("edit-member-mdl");
        },
        showCfDel() {
            this.$modal.show("cfdel-mdl");
        },
        closeCfDelModal() {
            this.$modal.hide("cfdel-mdl");
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
                    console.log(this.memberList)
                    this.takeInforList();
                } else {
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

    triggerFileInputClick() {
        this.$refs.fileInput.click();
    },
};
</script>