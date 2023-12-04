<!-- phùng việt khôi -->
<template>
  <div class="d-flex h-100 w-100">
    <div class="info-pages-container h-100 w-100 d-flex flex-column">
      <div class="h-100 px-2" style="border-radius: 0.2rem; background-color: #D0D2D6;">
        <div class="d-flex align-items-center w-100 p-2" style="height: 50px; font-size: 20px; font-weight: bold;">Album dòng họ</div>
        <div class="d-flex flex-row">
          <div class="col-md-6 d-flex align-items-center" style="justify-content: left;">
            <div class="w-100 my-2 mx-2">
              <input v-model="keySearch" @change="searchAlbumPhoto()" type="text" class="form-control modal-item m-0" placeholder="Nhập tên album..." />
            </div>
          </div>
          <div class="col-md-6 d-flex align-items-center" style="justify-content: right;">
            <button @click=" showCfDel()" class="btn bg-primary text-white articlelist-item articlelist-item-button text-center my-4 mx-2" :disabled="isButtonDisabledAlbum" style="outline: none; border: none;">Xóa album</button>
            <button @click="openAddAlbumModal()" class="btn bg-primary text-white articlelist-item articlelist-item-button text-center my-4 mx-2">Tạo album</button>
          </div>
        </div>
        <div class="d-flex flex-row flex-wrap" style="height: calc(100% - 151px); overflow-y: auto;">
          <div class="d-flex" v-for=" (album, index) in this.AlbumPhotoList" :key="album.AlbumID" @click="getAlbumCurrentId(album.AlbumID)">
            <div class="album mx-2 mb-3 d-flex flex-column">
              <div class="album-cover" @click="openEditAlbumModal()" v-if="album.BackGroundPhoto != null" style="background-image: url();">
                <!-- <img :src="album.BackGroundPhoto" /> -->
                <img class="h-100 w-100" style="object-fit: cover;" :src="album.BackGroundPhoto" />
              </div>
              <div class="album-cover" @click="openEditAlbumModal()" v-if="album.BackGroundPhoto == null"></div>
              <div class="album-general-info d-flex align-items-center">
                <div class="d-flex justify-content-center w-100 ellipsis-text" style="padding-left: 8px;">{{ album.AlbumName }}</div>
                <div class="d-flex w-100" style="justify-content: space-around;">
                  <div @click="openAlbumModal()">
                    <svg class="edit-album-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                    </svg>
                  </div>
                  <div style="height: 24px; width: 24px;">
                    <input class="form-check h-100 w-100 p-0" type="checkbox" v-model="ListCheckBoxAlbum[index]" @change="changeCheckAlbum(album.AlbumID, index)" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="albumModal-container">
      <modal name="Album-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-album-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm album</div>
              <div class="close-add-form" @click="closeAlbumModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-row" style="height: calc(100% - 50px);">
              <div class="col-3 h-100 p-2">
                <img class="h-100 w-100" :src="albumPhoto.BackGroundPhoto" style="object-fit: cover;"/>
              </div>
              <div class="col-9 d-flex flex-column">
                <div class="d-flex flex-row mt-2 align-items-center">
                  <label class="col-2 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Sửa album</label>
                  <div class="mx-2 w-100">
                    <input id="article-name" type="text" v-model="albumPhoto.AlbumName" class="form-control" />
                  </div>
                </div>
                <div class="d-flex flex-row mt-2 align-items-center">
                  <label class="col-2 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
                  <div class="mx-2 w-100">
                    <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
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
        </div>
      </modal>
    </div>
    <div class="addAlbum-container">
      <modal name="addAlbum-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-album-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm mới album</div>
              <div class="close-add-form" @click="closeAddAlbumModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column">
              <div class="d-flex flex-row my-2 align-items-center">
                <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên album</label>
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
                <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Thêm ảnh bìa</label>
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
        <div class="form-group position-absolute" style="height: 85%; background-color: #FFFFFF; inset: 11% 0; border-radius: 0.5rem;">
          <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 position-relative">Thêm ảnh vào album {{ albumPhoto.AlbumName }}</div>
          <div class="close-add-form" style="top: 8px; right: 8px;" @click="closeAddPhotoModal()">
            <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
          <div class="add-photo-modal" style="background-color: white; height: calc(100% - 50px);">
            <div class="add-photo-layout">
              <button type="button" class="btn btn-primary mr-2" @click="triggerFileInput" style="margin: 10px;">Chọn ảnh</button>
              <input id="fileAdd" type="file" class="hidden-input form-control" @change="handleFileChangePhoto" style="display: none;" multiple />
              <button class="btn btn-danger mr-2" :disabled="isButtonDisabledPhotoAdd" @click="removeFamilyPhotoAdd()" style="margin: 10px;">Xóa Ảnh</button>
              <button class="btn btn-primary mr-2" @click="addFamilyPhotoByAlbumId()" style="margin: 10px;">Lưu</button>
            </div>
            <div class="add-photo-list d-flex" style="height: calc(100% - 58px);">
              <div class="d-flex flex-row w-100 h-100" style="flex-wrap: wrap; overflow-y: auto; justify-content: center">
                <div class="add-photo d-flex flex-row position-relative" v-for="(photo, index) in FamilyPhotoListAddShow" :key="index" @click="clickPhotoAdd(index)">
                  <div class="w-100 h-100 d-flex align-items-center justify-content-center" style="background-color: #000;">
                    <img style="max-width: 100%;height: fit-content;max-height: 100%;" :src="photo" :class="{ fitHeight: listHeightLarger[index] }" />
                  </div>
                  <div class="w-100 d-flex position-absolute" style="top: 0; right: 0;">
                    <input class="form-check p-0" style="height: 24px; width: 24px;" type="checkbox" v-model="ListCheckBoxPhotoAdd[index]" @change="changeCheckPhotoAdd(index)" />
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
        <div class="form-group h-100">
          <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 position-relative">Album {{ albumPhoto.AlbumName }}</div>
          <div class="close-add-form" style="top: 8px; right: 8px;" @click="closeEditAlbumModal()">
            <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </svg>
          </div>
          <div class="edit-photo-modal" style="background-color: white; height: calc(100% - 50px);">
            <div class="edit-photo-layout d-flex">
              <button class="btn btn-primary mr-2" style="margin: 10px;" @click="checkAddPhotoModalOpen(), openAddPhotoModal()">Thêm ảnh vào album</button>

              <button class="btn btn-danger mr-2" style="margin: 10px;" :disabled="isButtonDisabledPhoto" @click="removeFamilyPhotoByPhotoId()">Xóa Ảnh</button>
            </div>
            <div class="add-photo-list d-flex" style="height: calc(100% - 58px);">
              <div class="d-flex flex-row w-100 h-100" style="flex-wrap: wrap; overflow-y: auto; justify-content: center">
                <div class="add-photo d-flex flex-row position-relative" v-for="(photo, index) in FamilyPhotoList" :key="index" @click="clickPhoto(index), getPhotoCurrentId(photo.PhotoID)">
                  <div class="w-100 h-100 d-flex align-items-center justify-content-center" style="background-color: #000;">
                    <img :src="photo.PhotoUrl" ref="imageRef" style="max-width: 100%;height: fit-content;max-height: 100%;" :class="{ fitHeight: listHeightLarger[index] }" />
                  </div>
                  <div class="w-100 d-flex position-absolute" style="top: 0; right: 0;">
                    <input class="form-check p-0" style="height: 24px; width: 24px; outline: none; border:none;" type="checkbox" v-model="ListCheckBoxPhoto[index]" @click.stop="changeCheckPhoto(photo.PhotoID, index)" />
                  </div>
                </div>
                <vue-easy-lightbox escDisabled moveDisabled :visible="visible" :imgs="ListImgs" :index="indexImg" @hide="handleHide"></vue-easy-lightbox>
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
            <div class="d-flex align-items-center px-3" style="height: 70%; font-size: 19px;">Bạn có chắc chắn muốn xóa album {{ albumPhoto.AlbumName }}</div>
            <div class="d-flex flex-row w-100" style="height: 30%;">
              <div class="col-6 d-flex align-items-center justify-content-center">
                <div class="btn bg-danger text-white" @click="removeAlbumPhotoByAlbumId(), closeCfDelModal()">Có</div>
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
import { HTTP } from "../assets/js/baseAPI.js";
import Snackbar from "awesome-snackbar";
import VueEasyLightbox from "vue-easy-lightbox";
export default {
  components: {
    VueEasyLightbox,
  },
  data() {
    return {
      albumPhoto: {
        AlbumName: "",
        CodeID: null,
        description: "",
        BackGroundPhoto: "",
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
      isButtonDisabledAlbum: true,
      isButtonDisabledPhoto: true,
      isButtonDisabledPhotoAdd: true,
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

      ListImgs: [],
      indexImg: 0,

      visible: false,

      checkAddPhotoModal: false,
      cfDel: false,

      heightLarger: false,
      listHeightLarger: [],
      img: null,
      keySearch: null,
    };
  },
  methods: {
    handleHide() {
      this.visible = false;
    },
    changeCheckAlbum(id, index) {
      if (this.ListCheckBoxAlbum[index]) {
        this.listRemoveAlbum(id, "add");
      } else {
        this.listRemoveAlbum(id, "remove");
      }
      console.log(this.ListAlbumRemove.length);
      if (this.ListAlbumRemove.length != 0) {
        this.isButtonDisabledAlbum = false;
      } else {
        this.isButtonDisabledAlbum = true;
      }
    },
    listRemoveAlbum(id, type) {
      if (type == "add") {
        this.ListAlbumRemove.push(id);
      }
      if (type == "remove") {
        this.ListAlbumRemove = this.ListAlbumRemove.filter(
          (album) => album !== id
        );
      }
    },
    changeCheckPhotoAdd(index) {
      if (this.ListCheckBoxPhotoAdd[index]) {
        this.listRemovePhotoAdd(index, "add");
      } else {
        this.listRemovePhotoAdd(index, "remove");
      }
      if (this.ListPhotoAddRemove.length != 0) {
        this.isButtonDisabledPhotoAdd = false;
      } else {
        this.isButtonDisabledPhotoAdd = true;
      }
    },
    listRemovePhotoAdd(index, type) {
      console.log(index);
      if (type == "add") {
        this.ListPhotoAddRemove.push(index);
        console.log("add" + this.ListPhotoAddRemove);
      }
      if (type == "remove") {
        this.ListPhotoAddRemove = this.ListPhotoAddRemove.filter(
          (photo) => photo !== index
        );
        console.log("remove" + this.ListPhotoAddRemove);
      }
    },
    changeCheckPhoto(id, index) {
      if (this.ListCheckBoxPhoto[index]) {
        this.listRemovePhoto(id, "remove");
      } else {
        this.listRemovePhoto(id, "add");
      }
      if (this.ListPhotoRemove.length != 0) {
        this.isButtonDisabledPhoto = false;
      } else {
        this.isButtonDisabledPhoto = true;
      }
    },
    listRemovePhoto(id, type) {
      console.log(type);
      if (type == "add") {
        console.log(id);
        this.ListPhotoRemove.push(id);
      }
      if (type == "remove") {
        this.ListPhotoRemove = this.ListPhotoRemove.filter(
          (photo) => photo !== id
        );
      }
    },
    clickPhoto(index) {
      this.visible = true;
      this.indexImg = index;
      this.indexClickPhoto = index;
    },
    clickPhotoAdd(index) {
      this.indexClickPhotoAdd = index;
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
      this.listHeightLarger = [];
      this.ListCheckBoxPhoto = [];
      this.$modal.show("editAlbum-modal");
      this.isButtonDisabledPhoto = true;
    },
    closeEditAlbumModal() {
      this.$modal.hide("editAlbum-modal");
      this.isButtonDisabled = true;
    },
    openAddPhotoModal() {
      if (!this.checkAddPhotoModal) {
        this.FamilyPhotoListAdd = [];
        this.FamilyPhotoListAddShow = [];
        this.listHeightLarger = [];
        this.isButtonDisabledPhotoAdd = true;
        this.ListCheckBoxPhotoAdd = [];
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
      console.log("Tại sao lại như thế");
      this.ListCheckBoxPhoto = [];
      this.ListPhotoRemove = [];
      const file = event.target.files[0];
      //     let count = this.listHeightLarger+1;
      let check = 0;
      this.FamilyPhotoListAdd.push(file);
      if (this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length - 1]) {
        // Đọc nội dung của tệp và chuyển thành URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = reader.result;
          this.FamilyPhotoListAddShow.push(this.imageSrc);
          const img = new Image();
          img.src = e.target.result;
          img.onload = () => {
            check += 1;
            console.log(check);
            if (img.width != 0 && img.height != 0) {
              this.checkPhotoSize(img.width, img.height);
            }
          };
        };
        reader.readAsDataURL(
          this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length - 1]
        );
      }
      this.ListCheckBoxPhotoAdd.push(false);
      this.getAlbumPhotoByCodeId();
    },
    checkPhotoSize(width, height) {
      console.log(width, height);
      if (width > height) {
        this.heightLarger = false;
      } else {
        this.heightLarger = true;
      }
      this.listHeightLarger.push(this.heightLarger);
      console.log(this.listHeightLarger);
    },

    handleFileChangeBackGround(event) {
      this.albumPhoto.BackGroundPhoto = event.target.files[0];
    },
    removeFamilyPhotoAdd() {
      console.log(this.ListPhotoAddRemove);
      for (let i = 0; i < this.ListPhotoAddRemove.length; i++) {
        this.FamilyPhotoListAddShow.splice(this.ListPhotoAddRemove[i], 1);
        this.listHeightLarger.splice(this.ListPhotoAddRemove[i], 1);
        this.FamilyPhotoListAdd.splice(this.ListPhotoAddRemove[i], 1);
      }
      this.ListCheckBoxPhotoAdd = [];
      this.ListPhotoAddRemove = [];
      this.isButtonDisabled = true;
    },
    removeFamilyPhotoByPhotoId() {
      for (let i = 0; i < this.ListPhotoRemove.length; i++) {
        let length = this.ListPhotoRemove.length;
        HTTP.get("delete-familyphoto", {
          params: {
            PhotoID: this.ListPhotoRemove[i],
          },
        })
          .then((response) => {
            if (response.data.success) {
              this.getFamilyPhotoByAlbumId();
              if (i == length - 1) {
                this.ListPhotoRemove = [];
                this.ListCheckBoxPhoto = [];
                this.isButtonDisabledPhoto = true;
                this.NotificationsScuccess(response.data.message);
              }
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    searchAlbumPhoto() {
      HTTP.get("searchAlbum", {
        params: {
          CodeID: this.CodeID,
          keySearch: this.keySearch,
        },
      }).then((response) => {
        if (response.data.success == true) {
          this.AlbumPhotoList = response.data.data;
        } else {
          this.NotificationsDelete(response.data.message);
        }
      });
    },
    removeAlbumPhotoByAlbumId() {
      for (let i = 0; i < this.ListAlbumRemove.length; i++) {
        let length = this.ListAlbumRemove.length;
        HTTP.get("delete-albumphoto", {
          params: {
            AlbumID: this.ListAlbumRemove[i],
          },
        })
          .then((response) => {
            if (response.data.success == true) {
              this.getAlbumPhotoByCodeId();
              if (i == length - 1) {
                this.isButtonDisabledAlbum = true;
                this.ListAlbumRemove = [];
                this.ListCheckBoxAlbum = [];
                this.NotificationsScuccess(response.data.message);
              }
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    updateAlbum() {
      const formData = new FormData();
      formData.append("CodeID", this.CodeID);
      formData.append("AlbumID", this.albumCurrentId);
      formData.append("AlbumName", this.albumPhoto.AlbumName);
      formData.append("Description", this.albumPhoto.description);
      formData.append("BackGroundPhoto", this.albumPhoto.BackGroundPhoto);
      HTTP.put("albumphoto", formData)
        .then((response) => {
          if (response.data.success == true) {
            this.getAlbumPhotoByCodeId();
            this.closeAlbumModal();
            this.NotificationsScuccess(response.data.message);
          } else {
            this.NotificationsDelete(response.data.message);
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
            console.log(this.AlbumPhotoList);
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
            console.log(this.albumPhoto);
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
            console.log(this.FamilyPhotoList);
            for (let i = 0; i < this.FamilyPhotoList.length; i++) {
              this.ListCheckBoxPhoto.push(false);
              this.ListImgs.push(this.FamilyPhotoList[i].PhotoUrl);
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
        let formData = new FormData();
        formData.append("AlbumID", this.albumCurrentId);
        formData.append("Photo", this.FamilyPhotoListAdd[i]);
        HTTP.post("familyphoto", formData)
          .then((response) => {
            if (response.data.success) {
              this.getFamilyPhotoByAlbumId();
              if (i == this.FamilyPhotoListAdd.length - 1) {
                this.NotificationsScuccess(response.data.message);
              }
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
      this.closeAddPhotoModal();
    },
    addAlbumPhoto() {
      
      if(this.albumPhoto.AlbumName != null && this.albumPhoto.AlbumName != '' ){
        console.log(1111)
        let formData = new FormData();
        formData.append("AlbumName", this.albumPhoto.AlbumName);
        formData.append("CodeID", this.CodeID);
        formData.append("Description", this.albumPhoto.description);
        formData.append("BackGroundPhoto", this.albumPhoto.BackGroundPhoto);
        HTTP.post("albumphoto", formData)
          .then((response) => {
            if (response.data.success == true) {
              this.NotificationsScuccess(response.data.message);
              this.getAlbumPhotoByCodeId();
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
          this.closeAddAlbumModal();
      }else{
        console.log(2222)
        this.NotificationsDelete("Tên album không được để trống");
      }
      
    },
    showCfDel() {
      this.$modal.show("cfdel-modal");
    },
    closeCfDelModal() {
      this.$modal.hide("cfdel-modal");
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
    this.albumPhoto.CodeID = this.CodeID;
    this.getAlbumPhotoByCodeId();
  },
  created() {
    // EventBus.$emit("HeadList", false);
    // EventBus.$emit("AlbumList", true);
    // EventBus.$emit("ArticleList", false);
  },
  watch: {
    imageInfo() {
      if (this.imageInfo.width < this.imageInfo.height) {
        this.heightLarger = false;
        console.log(this.imageInfo.width);
        console.log(this.imageInfo.height);
      } else if (this.imageInfo.width >= this.imageInfo.height) {
        this.heightLarger = true;
        console.log(this.imageInfo.width);
        console.log(this.imageInfo.height);
      }
    },
  },
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
  width: 17%;
  height: 25%;
}
</style>
