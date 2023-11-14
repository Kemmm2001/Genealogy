<template>
  <div class="container-fluid" style="padding-left: 200px; padding-right: 200px;">
      <div class="d-flex flex-row">
          <div class="col-10 column">
              <div class="filter-member d-flex flex-row w-100">
                  <div class="filter-option col-3">
                      <a>Tổng số thành viên: {{this.memberList.length}} người</a><br>
                      <a>Dòng họ có: {{this.numberGeneration }} người</a>
                  </div>
                  <div class="filter-option col-3">
                      <a>Nam: {{this.numberMale }} người</a><br>
                      <a>Nữ: {{this.numberFemale }} người</a><br>
                      <a>Chưa có: người</a>
                  </div>
                  <div class="filter-option col-3">
                      <a>Còn sống: {{this.numberAlive }} người</a><br>
                      <a>Đã mất: {{this.numberDied }} người</a>
                  </div>
              </div>
              <div class="list-member w-100">
                  <div class="button-member d-flex align-items-center">
                      <button class="btn button-normal m-0" @click="openMemberModal" style="margin-left: 10px !important;">+ Thêm thành viên</button>
                      <button class="btn click-color m-0">Chỉnh sửa</button>
                      <button class="btn click-color m-0">Xóa</button>
                      <button class="btn click-color m-0">Lựa chọn</button>
                  </div>
                  <div class="view-member w-100">
                      <div class="member" v-for="member in displayedItems" :key="member.id">
                          <div class="image-member" v-if="member.gender == 'male'">
                              <img class="avatar" src="https://pereaclinic.com/wp-content/uploads/2019/12/270x270-male-avatar.png"/>
                          </div>
                          <div class="image-member" v-if="member.gender == 'female'">
                              <img class="avatar" src="https://pereaclinic.com/wp-content/uploads/2019/12/270x270-female-avatar.png"/>
                          </div>
                          <div class="infor-member">
                              <b>{{ member.name }}</b><br>
                              <a>Đời thứ:{{ member.generation }}</a><br>
                              <a>Ngày sinh:{{ member.dob }}</a>
                          </div>
                      </div>
                      
                  </div>
                  <div class="pagination justify-content-center align-items-center">
                        <button class="btn button-normal m-0" @click="prevPage">Previous</button>
                        <span style="margin: 10px;">{{ currentPage }}/{{ this.memberFilter.length / this.itemsPerPage }}</span>
                        <button class="btn button-normal m-0" @click="nextPage">Next</button>
                  </div>
              </div>
          </div>
          <div class="col-2 column">
              <div class="sort-member">
                  <p class="title">Sắp xếp</p>
                  <div class="sort-button d-flex justify-content-center">
                      <button class="btn d-flex button-normal justify-content-center align-items-center p-1" style="margin-right: 20px;">
                        <i class="bi bi-arrow-up"></i>Đời</button>
                      <button class="btn d-flex button-normal justify-content-center align-items-center p-1" >
                        <i class="bi bi-arrow-up"></i> Ngày sinh</button>
                  </div>
              </div>
              <div class="search-member">
                  <p class="title">Tìm kiếm</p>
                  <div class="input-control">
                      <a>Tháng sinh</a>
                      <select class="form-select" >
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
                      <select class="form-select">
                      <option value="0">Toàn bộ</option>
                      <option value="1">1</option>
                      <!-- <option value="0">Không rõ</option> -->
                  </select>
                  </div>
                  <div class="input-control">
                      <a>Giới tính</a>
                      <select class="form-select">
                      <option value="all">Toàn bộ</option>
                      <option value="1">Nam</option>
                      <option value="0">Nữ</option>
                      <!-- <option value="0">Không rõ</option> -->
                  </select>
                  </div>
                  <div class="input-control">
                      <a>Trạng thái</a>
                      <select class="form-select">
                          <option value="all">Toàn bộ</option>
                          <option value="1">Còn sống</option>
                          <option value="0">Đã mất</option>
                      </select>
                  </div>
                  <div class="input-control">
                      <a>Loại thành viên</a>
                      <select class="form-select">
                      <option value="all">Toàn bộ</option>
                      <option value="">Trong dòng họ</option>
                      <option value="">Ngoài dòng họ</option>
                      <option value="">Dâu rể</option>
                      <option value="">Con trai</option>
                  </select>
                  </div>
                  
                  
                  
                  
                  <div class="input-control d-flex">
                      <input type="text" class="form-control"  value="" placeholder="Tuổi từ" style="margin-right: 10px;"
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                      <input type="text" class="form-control" value="" placeholder="Đến tuổi" 
                      oninput="this.value = this.value.replace(/[^0-9]/g, '');">
                  </div>
                  <div class="submit-control">
                      <button class="btn button-normal">Làm mới</button>
                  </div>
                  
              </div>
          <div>
      </div>  
      <!-- <modal name="member-modal">
      <div class="d-flex flex-row w-100 align-items-center position-relative">
        <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">
          Thêm thành
          viên
        </div>
        <div class="close-add-form" @click="closeMemberModal">
          <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
          </svg>
        </div>
      </div>
      <div class="d-flex flex-row">
        <div class="col-md-6 d-flex flex-row">
          <div class="col-md-4 d-flex flex-column mt-1" style="padding-left: 4px;">
            <div class="profile-pic"></div>
            <button class="btn p-0 colored mt-1 modal-item">Xoá ảnh</button>       
            <button class="btn p-0 colored mt-1 modal-item" style="margin-top: 120px !important;" @click="dead = !dead" :class="{ alivebuttoncolor: dead }">
              <a v-show="!dead">Còn sống</a>
              <a v-show="dead">Đã mất</a>
            </button>
          </div>
          <div class="d-flex flex-column col-md-8 align-items-center px-1">
            <div class="d-flex flex-row align-items-center w-100">
              <div class="col-md-12 mt-1">
                <input type="text" class="form-control modal-item" placeholder="Tên thành viên đầy đủ" />
              </div>
            </div>
            <div class="d-flex flex-row align-items-center w-100">
              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                <input type="text" class="form-control modal-item" placeholder="Tên thường gọi" />
              </div>
              <div class="col-md-6 mt-1 position-relative">
                <label for="birthorder" class="add-form-birthorder-label position-absolute">
                  Con
                  thứ
                </label>
                <input id="birthorder" type="number" class="form-control flex-grow add-form-birthorder-input modal-item pl-5" value="1" min="1" />
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-around w-100">
              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                <select class="form-select modal-item">
                  <option selected value="1">Giới tính</option>
                  <option value="2">Nam</option>
                  <option value="3">Nữ</option>
                </select>
              </div>
              <div class="col-md-6 mt-1 d-flex flex-row">
                <div class="col-md-8 add-form-bloodtype-label modal-item">Nhóm máu</div>
                <div class="col-md-4">
                  <select id="bloodtype" class="add-form-bloodtype-select form-select modal-item p-0">
                    <option selected value="1">A</option>
                    <option value="2">B</option>
                    <option value="3">AB</option>
                    <option value="4">O</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center w-100">
              <div class="col-md-12">
                <input type="text" class="form-control modal-item mt-1" placeholder="Nguyên quán" />
              </div>
            </div>
            <div class="d-flex flex-row w-100">
              <div class="col-md-6 mt-1" style="padding-right: 4px;">
                <input type="text" class="form-control modal-item" placeholder="Quốc tịch" />
              </div>
              <div class="col-md-6 mt-1">
                <input type="text" class="form-control modal-item" placeholder="Tôn giáo" />
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center w-100">
              <div class="col-md-6 d-flex flex-wrap">
                <div class="add-form-date-label modal-item">Ngày sinh dương lịch</div>
              </div>
              <div class="col-md-6 mt-1">
                <input type="date" class="form-control modal-item" />
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center w-100">
              <div class="col-md-6 d-flex flex-wrap">
                <div class="add-form-date-label modal-item">Ngày sinh âm lịch</div>
              </div>
              <div class="col-md-6 mt-1">
                <input type="date" class="form-control modal-item" />
              </div>
            </div>
            <div class="d-flex flex-row w-100">
              <div class="col-md-12 mt-1">
                <input type="text" class="form-control modal-item" placeholder="Nơi sinh" />
              </div>
            </div>
            <div class="d-flex flex-row align-items-center justify-content-center w-100">
              <div class="col-md-6 d-flex flex-wrap">
                <div class="add-form-date-label modal-item">Ngày mất</div>
              </div>
              <div class="col-md-6 mt-1">
                <input type="date" class="form-control modal-item" v-bind:disabled="!dead" />
              </div>
            </div>
            <div class="d-flex flex-row w-100">
              <div class="col-md-12 mt-1">
                <input type="text" class="form-control modal-item" placeholder="Nơi mất" v-bind:disabled="!dead" />
              </div>
            </div>
            <div class="d-flex flex-row w-100">
              <div class="col-md-12 mt-1 mb-1">
                <input type="text" class="form-control modal-item" placeholder="Mộ phần" v-bind:disabled="!dead" />
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 mt-1" style="padding-right: 4px">
          <div class="d-flex flex-row modal-item align-items-center justify-content-around">
            <div class="w-100">
              <button @click="extendedContact = true; extendedJob = false; extendedEdu = false; extendedNote = false" class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedContact }">
                Liên
                hệ
              </button>
            </div>
            <div class="w-100">
              <button @click="extendedContact = false; extendedJob = true; extendedEdu = false; extendedNote = false" class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedJob }">
                Nghề
                nghiệp
              </button>
            </div>
            <div class="w-100">
              <button @click="extendedContact = false; extendedJob = false; extendedEdu = true; extendedNote = false" class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedEdu }">
                Giáo
                dục
              </button>
            </div>
            <div class="w-100">
              <button @click="extendedContact = false; extendedJob = false; extendedEdu = false; extendedNote = true" class="btn px-2 pt-1 pb-2 extended-info-tab w-100" :class="{ colored: extendedNote }">
                Ghi
                chú
              </button>
            </div>
          </div>
          <div v-if="extendedContact" class="d-flex flex-column extended-info-container extended-contact-container w-100">
            <div class="col-md-12 px-1 mt-1">
              <input type="text" class="form-control modal-item" placeholder="Địa chỉ" />
            </div>
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6" style="padding-right: 2px;">
                <input type="text" class="form-control modal-item" placeholder="Điện thoại 1" />
              </div>
              <div class="col-md-6" style="padding-left: 2px">
                <input type="text" class="form-control modal-item" placeholder="Điện thoại 2" />
              </div>
            </div>
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6" style="padding-right: 2px;">
                <input type="text" class="form-control modal-item" placeholder="Email 1" />
              </div>
              <div class="col-md-6" style="padding-left: 2px">
                <input type="text" class="form-control modal-item" placeholder="Email 2" />
              </div>
            </div>
            <div class="col-md-12 px-1 mt-1">
              <input type="text" class="form-control modal-item" placeholder="Facebook" />
            </div>
            <div class="col-md-12 px-1 mt-1 mb-1">
              <input type="text" class="form-control modal-item" placeholder="Zalo" />
            </div>
          </div>

          <div v-if="extendedJob" class="d-flex flex-column extended-info-container extended-job-container w-100 pb-1">
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6" style="padding-right: 2px;">
                <input type="text" class="form-control modal-item" placeholder="Tên cơ quan" />
              </div>
              <div class="col-md-6" style="padding-left: 2px">
                <input type="text" class="form-control modal-item" placeholder="Địa chỉ" />
              </div>
            </div>
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6" style="padding-right: 2px;">
                <input type="text" class="form-control modal-item" placeholder="Vị trí công tác" />
              </div>
              <div class="col-md-6" style="padding-left: 2px">
                <input type="text" class="form-control modal-item" placeholder="Nghề nghiệp" />
              </div>
            </div>
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                <div class="col-md-3">
                  <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                    <a>Từ</a>
                  </div>
                </div>
                <div class="col-md-9">
                  <input type="date" class="form-control modal-item" />
                </div>
              </div>
              <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                <div class="col-md-3">
                  <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                    <a>Đến</a>
                  </div>
                </div>
                <div class="col-md-9">
                  <input type="date" class="form-control modal-item" />
                </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
              <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
            </div>
            <div class="extended-job-data-container mx-1 mt-2"></div>
          </div>

          <div v-if="extendedEdu" class="d-flex flex-column extended-info-container extended-edu-container w-100 pb-1">
            <div class="ol-md-12 px-1 mt-1">
              <input type="text" class="form-control modal-item" placeholder="Tên trường" />
            </div>
            <div class="col-md-12 px-1 mt-1">
              <input type="text" class="form-control modal-item" placeholder="Mô tả" />
            </div>
            <div class="d-flex flex-row col-md-12 px-1 mt-1">
              <div class="col-md-6 d-flex flex-row" style="padding-right: 2px;">
                <div class="col-md-3">
                  <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                    <a>Từ</a>
                  </div>
                </div>
                <div class="col-md-9">
                  <input type="date" class="form-control modal-item" />
                </div>
              </div>
              <div class="col-md-6 d-flex flex-row" style="padding-left: 2px">
                <div class="col-md-3">
                  <div class="d-flex w-100 h-100 align-items-center justify-content-center">
                    <a>Đến</a>
                  </div>
                </div>
                <div class="col-md-9">
                  <input type="date" class="form-control modal-item" />
                </div>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-around col-md-12 px-1 mt-2">
              <button class="btn modal-item extended-info-colored px-2 py-1">Xoá thông tin</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Tạo mới</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Cập nhật</button>
              <button class="btn modal-item extended-info-colored px-2 py-1">Xóa</button>
            </div>
            <div class="extended-edu-data-container mx-1 mt-2"></div>
          </div>

          <div v-if="extendedNote" class="d-flex flex-column extended-info-container extended-note-container px-1 py-1">
            <textarea class="h-100" placeholder="Viết điều gì đó..."></textarea>
          </div>
        </div>
      </div>
    </modal> -->
  </div>
  
  
      
  </div>
  </div>
</template>
<script>
import { HTTP } from "../assets/js/baseAPI.js";
import 'bootstrap-icons/font/bootstrap-icons.css';
export default {
data() {
  return{
      memberList:[],
      memberFilter:[],
      monthSearch:0,
      generationSearch:0,
      genderSearch:'all',
      aliveSearch:'all',
      kindMemberFilter: 'all',

      numberMale: 0,
      numberFemale: 0,
      numberChuaRo: 0,
      totalMember: 0,
      numberGeneration: 0,
      numberAlive: 0,
      numberDied: 0,

      extendedContact: true,
      extendedJob: false,
      extendedEdu: false,
      extendedNote: false,

      itemsPerPage: 8,  // Số mục dữ liệu trên mỗi trang
      currentPage: 1,    // Trang hiện tại
  }
},

computed: {
  displayedItems() {
    // Tính toán các mục dữ liệu cho trang hiện tại
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.memberFilter.slice(startIndex, endIndex);
  },
},

methods:{
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      console.log(this.currentPage);
    }
  },
  nextPage() {
    if (this.currentPage < Math.ceil(this.memberFilter.length / this.itemsPerPage)) {
      this.currentPage++;
    }
  },
  addMember(){
      
  },
  searchMember(){
      this.filterByMonth()
      // this.filterByGeneration(),
      // this.filterByGender()
      // this.filterByAlive(),
      // this.filterByKind()
  },

  searchByMonth(){
      for(let i = 0;i < this.memberList.length;i++){
          if(this.memberFilter[i].dob.getMonth() == (this.monthSearch - 1)){
              this.memberFilter.push(this.memberFilter[i]);
          }
      }
  },
  searchByGeneration(){
      for(let i = 0;i < this.memberList.length;i++){
          if(this.memberFilter[i].generation== this.generationSearch){
              this.memberFilter.push(this.memberFilter[i]);
          }
      }
  },
  
  searchByGender(){
      for(let i = 0;i < this.memberList.length;i++){
          if(this.memberFilter[i].gender == this.genderSearch){
              this.memberFilter.push(this.memberFilter[i]);
          }
      }
  },

  // filterByAlive(){
  //     for(let i = 0;i < this.memberFilter.length;i++){
  //         if(this.memberFilter[i].dod == ){
  //             this.memberFilter.push(this.memberFilter[i]);
  //         }
  //     }
  // },

  // searchByKind(){
  //     for(let i = 0;i < this.memberFilter.length;i++){
  //         if(this.memberFilter[i].dob.getMonth() == (this.monthFilter - 1)){
  //             this.memberFilter.push(this.memberFilter[i]);
  //         }
  //     }
  // },

  takeInforList(){
      for(let i = 0;i < this.memberList.length;i++){
          if(this.memberFilter[i].gender == 'male'){
              this.numberMale += 1;
          }
          if(this.memberFilter[i].gender == 'female'){
              this.numberFemale += 1;
          }
          if(this.memberFilter[i].generation > this.numberGeneration){
              this.numberGeneration = this.memberFilter[i].generation;
          }
          if(this.memberFilter[i].dod == ""){
              this.numberAlive += 1 ;
          }
          if(this.memberFilter[i].dod != ""){
              this.numberDied += 1 ;
          }
      }
  },
  openMemberModal() {
  this.$modal.show("member-modal");
  },
  closeMemberModal() {
      this.$modal.hide("member-modal");
  },
},

mounted() {
  
  HTTP.get("viewTree", {
      params: {
      CodeID: 123456,
      },
  })
      .then((response) => {
      this.memberList = response.data;
      this.memberFilter = this.memberList;
      this.takeInforList();
      console.log(this.memberList)
      })
      .catch((e) => {
      console.log(e);
      });
},

}
</script>
<style>
@import "../assets/css/memberlist.css";
</style>