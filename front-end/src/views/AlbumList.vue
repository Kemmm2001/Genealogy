<template>
  <div class="d-flex h-100 w-100">
    <div class="info-pages-container h-100 w-100 d-flex flex-column">
      <div class="d-flex align-items-center w-100 my-2 mx-2" style="height: 50px; font-size: 20px; font-weight: bold;">
        Album dòng họ</div>
      <div class="d-flex flex-row">
        <div class="col-md-6 d-flex align-items-center" style="justify-content: left;">
          <div class="w-100 my-2 mx-2">
            <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên album..." />
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-center" style="justify-content: right;">
          <button @click="removeAlbumPhotoByAlbumId(); showCfDel()"
            class="btn articlelist-item articlelist-item-button text-center my-4 mx-2">Xóa album</button>
          <button @click="openAddAlbumModal()"
            class="btn articlelist-item articlelist-item-button text-center my-4 mx-2">Tạo album</button>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap" style="height: calc(100% - 151px); overflow-y: auto;">
        <div class="d-flex" v-for=" (album, index) in this.AlbumPhotoList" :key="album.AlbumID"
          @click="getAlbumCurrentId(album.AlbumID)">
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover" @click="openEditAlbumModal()" v-if="album.BackGroundPhoto != null">
              <img :src="album.BackGroundPhoto" />
            </div>
            <div class="album-cover" @click="openEditAlbumModal()" v-if="album.BackGroundPhoto == null"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">{{ album.AlbumName }} </div>
              <div class="d-flex w-100" style="justify-content: space-around;">
                <!-- <div @click="removeAlbumPhotoByAlbumId()">
                  <svg class="remove-album-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z" />
                  </svg>
                </div> -->
                <div @click="openAlbumModal()">
                  <svg class="edit-album-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                  </svg>
                </div>
                <div style="height: 24px; width: 24px;">
                  <input class="form-check h-100 w-100 p-0" type="checkbox" v-model="ListCheckBoxAlbum[index]"
                    @change="changeCheckAlbum(album.AlbumID, index)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal name="Album-modal">
      <div class="form-group">
        <div class="w-100 h-100 add-album-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm album</div>
            <div class="close-add-form" @click="closeAlbumModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row my-2 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                album</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" v-model="albumPhoto.AlbumName" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-2 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-2 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Thêm ảnh
                bìa</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file" @change="handleFileChangeBackGround" />
              </div>
            </div>
            <div class="d-flex flex-row m-3 align-items-center articlelist-button-container">
              <div class>
                <button class="articlelist-item-button form-control" @click="updateAlbum()">Cập nhật</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
    <div class="addAlbum-container">
      <modal name="addAlbum-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-album-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm album</div>
              <div class="close-add-form" @click="closeAddAlbumModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column">
              <div class="d-flex flex-row my-2 align-items-center">
                <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                  album</label>
                <div class="mx-2 w-100">
                  <input id="article-name" type="text" v-model="albumPhoto.AlbumName" class="form-control" />
                </div>
              </div>
              <div class="d-flex flex-row my-2 align-items-center">
                <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô
                  tả</label>
                <div class="mx-2 w-100">
                  <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
                </div>
              </div>
              <div class="d-flex flex-row my-2 align-items-center">
                <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Thêm ảnh
                  bìa</label>
                <div class="mx-2 w-100">
                  <input id="off-url" type="file" class="form-control input-file" @change="handleFileChangeBackGround" />
                </div>
              </div>
              <div class="d-flex flex-row m-3 align-items-center articlelist-button-container">
                <div class>
                  <button class="articlelist-item-button form-control" @click="addAlbumPhoto()">Thêm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <div class="addPhoto-container" style="z-index: 2;">
      <modal name="addPhoto-modal" style="height: ;">
        <div class="form-group position-absolute" style="height: 85%; background-color: #FFFFFF; inset: 11% 0">
          <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm ảnh vào album
          </div>
          <div class="add-photo-modal" style="background-color: white; height: calc(100% - 50px);">
            <div class="add-photo-layout">
              <button type="button" class="btn btn-primary mr-2" @click="triggerFileInput" style="margin: 10px;">Thêm
                ảnh</button>
              <input id="fileAdd" type="file" class="hidden-input form-control" @change="handleFileChangePhoto"
                style="display: none;" />
              <button class="btn btn-danger mr-2" :disabled="isButtonDisabled" @click="removeFamilyPhotoAdd()"
                style="margin: 10px;">Xóa Ảnh</button>
              <button class="btn btn-primary mr-2" @click="addFamilyPhotoByAlbumId()" style="margin: 10px;">Lưu</button>
            </div>
            <div class="add-photo-list d-flex" style="height: calc(100% - 50px);">
            <div class="d-flex flex-row w-100 h-100">
              <div class="add-photo d-flex flex-row" v-for="(photo, index) in FamilyPhotoListAddShow" :key="index"
                @click="clickPhotoAdd(index)">
                <div class="w-100 h-100 d-flex align-items-center justify-content-center" style="background-color: #000;">
                  <img style="width: 100%; height: fit-content;" :src="photo" :class="{fitHeight : listHeightLarger[index]}">
                </div>
                <div class="w-100 d-flex justify-content-center pt-2">
                  <input class="form-check p-0" style="height: 24px; width: 24px;" type="checkbox" v-model="ListCheckBoxPhotoAdd[index]"
                    @change="changeCheckPhotoAdd(index)" />
                </div>
              </div>
              
            </div>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <div class="editAlbum-container" style="z-index: 1;">
      <modal name="editAlbum-modal">
        <div class="form-group">
          <div class="form-group">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">
              {{ albumPhoto.AlbumName }}</div>
            <div class="edit-photo-modal" style="background-color: white; height: 700px;">
              <div class="edit-photo-layout d-flex">
                <button class="btn btn-primary mr-2" style="margin: 10px;"
                  @click="checkAddPhotoModalOpen(), openAddPhotoModal()">Thêm ảnh</button>

                <button class="btn btn-danger mr-2" style="margin: 10px;" :disabled="isButtonDisabled"
                  @click="removeFamilyPhotoByPhotoId()">Xóa Ảnh</button>
              </div>
              <div class="add-photo-list d-flex flex-row w-100 h-100" style="overflow-y: auto;">
                <div class="edit-photo" v-for="(photo, index) in FamilyPhotoList" :key="index"
                  @click="clickPhoto(index), getPhotoCurrentId(photo.PhotoID)" style="margin-left:10px;width: 20%;height: 20%;background-color: black;">
                  <div class="d-flex flex-column" >
                    <img src="https://cdn.diemnhangroup.com/seoulcenter/2022/11/gai-xinh-1.jpg" ref="imageRef" style="height: auto;width: auto; ">
                    <div class="w-100 d-flex justify-content-center pt-2">
                    <input class="form-check p-0" style="height: 24px; width: 24px;" type="checkbox" v-model="ListCheckBoxPhoto[index]"
                      @change="changeCheckPhoto(photo.PhotoID,index)" />
                     </div>
                  </div>
                </div>
              </div>
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
            <div class="d-flex align-items-center px-3" style="height: 70%; font-size: 19px;">Bạn có chắc chắn muốn xóa album AAAAA</div>
            <div class="d-flex flex-row w-100" style="height: 30%;">
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn bg-danger text-white">Có</div>
              </div>
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn bg-primary text-white">Không</div>
              </div>
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
export default {
  data() {
    return {
      albumPhoto: {
        AlbumName: null,
        CodeID: null,
        description: null,
        BackGroundPhoto: null,
      },
      CodeID: null,
      familyPhoto: {
        albumID: null,
        file: null,
      },
      FamilyPhotoListAdd: [],
      FamilyPhotoListAddShow: [],

      albumCurrentId: null,
      photoCurrentId: null,

      AlbumPhotoList: [],
      FamilyPhotoList: [],

      trClicked: false,
      isButtonDisabled: true,
      imageSrc: null,
      indexClickPhoto: null,
      indexClickPhotoAdd: null,

      isCheckAlbum: null,
      isCheckPhoto: null,
      isCheckPhotoAdd: null,

      ListAlbumRemove: [],
      ListPhotoRemove: [],
      ListPhotoAddRemove: [],

      ListCheckBoxAlbum: [],
      ListCheckBoxPhoto: [],
      ListCheckBoxPhotoAdd: [],

      checkAddPhotoModal: false,
      cfDel: false,

      heightLarger: false,
      listHeightLarger: [],
    };
  },
  methods: {
    changeCheckAlbum(id, index) {
      if (this.ListCheckBoxAlbum[index]) {
        this.listRemoveAlbum(id, 'add')
      } else {
        this.listRemoveAlbum(id, 'remove')
      }
    },
    listRemoveAlbum(id, type) {
      if (type == 'add') {
        this.ListAlbumRemove.push(id);
      }
      if (type == 'remove') {
        this.ListAlbumRemove = this.ListAlbumRemove.filter(album => album !== id);
      }
    },
    changeCheckPhotoAdd(index) {
      if (this.ListCheckBoxPhotoAdd[index]) {
        this.listRemovePhotoAdd(index, 'add')
      } else {
        this.listRemovePhotoAdd(index, 'remove')
      }
    },
    listRemovePhotoAdd(index, type) {
      if (type == 'add') {
        this.ListPhotoAddRemove.push(index);
      }
      if (type == 'remove') {
        this.ListPhotoAddRemove.splice(index, 1);
      }
    },
    changeCheckPhoto(id,index) {
      if (this.ListCheckBoxPhoto[index]) {
        this.listRemovePhoto(id, 'add')
      } else {
        this.listRemovePhoto(id, 'remove')
      }
    },
    listRemovePhoto(id, type) {
      console.log(type)
      if (type == 'add') {
        console.log(id)
        this.ListPhotoRemove.push(id);
      }
      if (type == 'remove') {
        this.ListPhotoRemove = this.ListPhotoRemove.filter(photo => photo !== id);
      }
    },
    clickPhoto(index) {
      this.indexClickPhoto = index
    },
    clickPhotoAdd(index) {
      this.indexClickPhotoAdd = index
      this.isButtonDisabled = false;
    },
    triggerFileInput() {
      const fileInput = document.getElementById("fileAdd");
      if (fileInput != null) {
        fileInput.click();
      }
    },
    getAlbumCurrentId(id) {
      this.albumCurrentId = id;
      this.getAlbumPhotoByAlbumId();
      this.getFamilyPhotoByAlbumId();
    },

    getPhotoCurrentId(id) {
      this.photoCurrentId = id;
      this.isButtonDisabled = false;
    },
    openAddAlbumModal() {
      this.albumPhoto = {};
      this.$modal.show("addAlbum-modal");
    },
    closeAddAlbumModal() {
      this.$modal.hide("addAlbum-modal");
    },
    openAlbumModal() {
      this.$modal.show("Album-modal");
    },
    closeAlbumModal() {
      this.$modal.hide("Album-modal");
    },
    openEditAlbumModal() {
      this.$modal.show("editAlbum-modal");
    },
    closeEditAlbumModal() {
      this.$modal.hide("editAlbum-modal");
      this.isButtonDisabled = true;
    },
    openAddPhotoModal() {
      if (!this.checkAddPhotoModal) {
        this.FamilyPhotoListAdd = [];
        this.FamilyPhotoListAddShow = []
      }
      this.checkAddPhotoModal = true;
      this.$modal.show("addPhoto-modal");
    },
    closeAddPhotoModal() {
      this.$modal.hide("addPhoto-modal");
    },
    checkAddPhotoModalOpen() {
      this.checkAddPhotoModal = false;
    },
    handleFileChangePhoto(event) {
      const file = event.target.files[0];
      this.FamilyPhotoListAdd.push(file)
      if (this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length - 1]) {
        // Đọc nội dung của tệp và chuyển thành URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = reader.result;
          this.FamilyPhotoListAddShow.push(this.imageSrc);
          const img = new Image();
          img.src = e.target.result;
          if(img.width > img.height){
            this.heightLarger = false;
          }else {
            this.heightLarger = true;
          }
          this.listHeightLarger.push(this.heightLarger);
          
        };
        console.log(this.listHeightLarger)
        reader.readAsDataURL(this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length - 1]);
      }
      this.ListCheckBoxPhotoAdd.push(false)
      this.getAlbumPhotoByCodeId();
    },

    // compareWidthHeight(event){
    //   const file = event.target.files[0];
    //   if (file) {
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //       const img = new Image();
    //       img.src = e.target.result;
    //       console.log(img.width);
    //       console.log(img.height);
    //       img.onload = () => {
    //         if(img.width > img.height){
    //           this.heightLarger = false;
    //         }else {
    //           this.heightLarger = true;
    //         }
    //       };
    //     };
    //     reader.readAsDataURL(file);
    //   }
    // },

    handleFileChangeBackGround(event) {
      this.albumPhoto.BackGroundPhoto = event.target.files[0];
    },
    removeFamilyPhotoAdd() {
      for (let i = 0; i < this.ListPhotoAddRemove.length; i++) {
        this.FamilyPhotoListAddShow.splice(this.ListPhotoAddRemove[i], 1);
        this.listHeightLarger.splice(this.ListPhotoAddRemove[i], 1);
        this.FamilyPhotoListAdd.splice(this.ListPhotoAddRemove[i], 1);
      }
      this.ListCheckBoxPhotoAdd = []
      this.ListPhotoAddRemove = []
      this.isButtonDisabled = true;
    },
    getFamilyPhotoByPhotoId() {
      HTTP.get("familyphoto", {
        params: {
          PhotoID: 1,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.familyPhoto = response.data.data[0];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeFamilyPhotoByPhotoId() {
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa ảnh này?");
      console.log(this.ListPhotoRemove)
      if (isConfirmed) {
        for(let i = 0 ;i < this.ListPhotoRemove.length;i++){
          HTTP.get("delete-familyphoto", {
          params: {
            PhotoID: this.ListPhotoRemove[i],
          },
        })
          .then((response) => {
            if (response.data.success) {
              this.getFamilyPhotoByAlbumId()
              this.NotificationsDelete(response.data.message)
            }
          })
          .catch((e) => {
            console.log(e);
          });
          // if( i == this.ListCheckBoxPhoto.length - 1){
          //   this.getFamilyPhotoByAlbumId()
          // }
        }
        
      }
      this.isButtonDisabled = true;
    },
    removeAlbumPhotoByAlbumId() {
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa album này?");
      if (isConfirmed) {
        for (let i = 0; i < this.ListAlbumRemove.length; i++) {
          HTTP.get("delete-albumphoto", {
            params: {
              AlbumID: this.ListAlbumRemove[i],
            },
          })
            .then((response) => {
              if (response.data.success == true) {
                this.getAlbumPhotoByCodeId();
                this.NotificationsDelete(response.data.message)
              }
            })
            .catch((e) => {
              console.log(e);
            });
        }
      }
    },
    updateAlbum() {
      // formData.append("AlbumName", this.albumPhoto.AlbumName);
      // formData.append("CodeID", this.CodeID);
      // formData.append("Description",  this.albumPhoto.description);
      // formData.append("BackGroundPhoto",  this.albumPhoto.BackGroundPhoto);
      const formData = new FormData();
      formData.append("CodeID", this.CodeID);
      formData.append("AlbumID", this.albumCurrentId);
      formData.append("AlbumName", this.albumPhoto.AlbumName);
      formData.append("Description", this.albumPhoto.description);
      formData.append("BackGroundPhoto", this.albumPhoto.BackGroundPhoto)
      HTTP.put("albumphoto", formData)
        .then((response) => {
          if (response.data.success == true) {
            this.getAlbumPhotoByCodeId();
            this.closeAlbumModal();
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAlbumPhotoByCodeId() {
      HTTP.get("albumphoto", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.AlbumPhotoList = response.data.data;
            for (let i = 0; i < this.AlbumPhotoList.length; i++) {
              this.ListCheckBoxAlbum.push(false);
            }
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getAlbumPhotoByAlbumId() {
      HTTP.get("albumphoto", {
        params: {
          AlbumID: this.albumCurrentId,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.albumPhoto = response.data.data[0];
            console.log(this.albumPhoto)
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFamilyPhotoByAlbumId() {
      HTTP.get("familyphoto", {
        params: {
          AlbumID: this.albumCurrentId,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.FamilyPhotoList = response.data.data;
            for (let i = 0; i < this.FamilyPhotoList.length; i++) {
              this.ListCheckBoxPhoto.push(false);
            }
          } else {
            this.FamilyPhotoList = [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addFamilyPhotoByAlbumId() {
      for (let i = 0; i < this.FamilyPhotoListAdd.length; i++) {
        const formData = new FormData();
        formData.append("AlbumID", this.albumCurrentId);
        formData.append("Photo", this.FamilyPhotoListAdd[i]);
        HTTP.post("familyphoto", formData)
          .then((response) => {
            if (response.data.success) {
              this.getFamilyPhotoByAlbumId()
              this.NotificationsScuccess(response.data.message)
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.closeAddPhotoModal();
    },
    addAlbumPhoto() {
      const formData = new FormData();
      formData.append("AlbumName", this.albumPhoto.AlbumName);
      formData.append("CodeID", this.CodeID);
      formData.append("Description", this.albumPhoto.description);
      formData.append("BackGroundPhoto", this.albumPhoto.BackGroundPhoto);
      HTTP.post("albumphoto", formData)
        .then((response) => {
          if (response.data.success == true) {
            this.getAlbumPhotoByCodeId()
            this.NotificationsScuccess(response.data.message)
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.closeAddAlbumModal()
    },
    showCfDel() {
      this.$modal.show("cfdel-modal");
    },
    closeCfDelModal() {
      this.$modal.hide("cfdel-modal");
    },
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
    this.albumPhoto.CodeID = this.CodeID
    this.getAlbumPhotoByCodeId();
  },
  created() {
    // EventBus.$emit("HeadList", false);
    // EventBus.$emit("AlbumList", true);
    // EventBus.$emit("ArticleList", false);
  },
  watch:{
    imageInfo(){
      if(this.imageInfo.width < this.imageInfo.height){
        this.heightLarger = false;
        console.log(this.imageInfo.width);
        console.log(this.imageInfo.height);
      }else if(this.imageInfo.width >= this.imageInfo.height){
        this.heightLarger = true;
        console.log(this.imageInfo.width);
        console.log(this.imageInfo.height);
      }
    }
  }
};
</script>
<style>
.add-photo.choose {
  border: 5px solid aquamarine;
}

.edit-photo-layout {
  position: absolute;
  bottom: 0;
  right: 0;
}

.add-photo-layout {
  position: absolute;
  bottom: 0;
  right: 0;
}

.add-photo {
  margin: 10px;
  width: 30%;
  height: 25%;
}
</style>