<template>
  <div class="d-flex h-100 w-100" style="padding: 32px 120px">
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
          <button @click="openAddAlbumModal()"
            class="btn articlelist-item articlelist-item-button text-center my-4 mx-2">Tạo album</button>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap" style="height: calc(100% - 151px); overflow-y: auto;">
        <div class="d-flex" v-for=" album in this.AlbumPhotoList" :key="album.AlbumID"
          @click="getAlbumCurrentId(album.AlbumID)">
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover" @click="openEditAlbumModal()" v-if="album.backGroundPhoto != null">
              <img :src="album.backGroundPhoto" />
            </div>
            <div class="album-cover" @click="openEditAlbumModal()" v-if="album.backGroundPhoto == null"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">{{ album.AlbumName }} </div>
              <div class="d-flex justify-content-center w-100">
                <button @click="removeAlbumPhotoByAlbumId(album.AlbumID)">Xoa</button>
                <button @click="openAlbumModal()">Chinh sua</button>
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
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                album</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" v-model="albumPhoto.AlbumName" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
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
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                album</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" v-model="albumPhoto.AlbumName" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
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
    <div class="addPhoto-container" style="z-index: 2;">
      <modal name="addPhoto-modal">
        <div class="form-group">
          <div class="add-photo-modal" style="background-color: white;height:700px">
            <div class="add-photo-layout">
              <button type="button" class="btn btn-primary mr-2"  @click="triggerFileInput">Thêm ảnh</button>
              <input ref="fileAdd" type="file" class="hidden-input form-control" @change="handleFileChangePhoto" style="display: none;" />
              <button class="btn btn-danger mr-2" :disabled="isButtonDisabled" @click="removeFamilyPhotoAdd()">Xóa Ảnh</button>
              <button class="btn btn-primary mr-2" @click="addFamilyPhotoByAlbumId()">Lưu</button>
            </div>
            <div class="add-photo-list d-flex">
              <div class="add-photo" v-for="(photo,index) in FamilyPhotoListAddShow" :key="index" :class="{ choose: index == indexClickPhotoAdd }" @click="clickPhotoAdd(index)">
                <img :src="photo" style="width: 300px;">
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
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">{{albumPhoto.AlbumName}}</div>
            <div class="edit-photo-modal" style="background-color: white;height:700px">
              <div class="add-photo-layout d-flex">
                <button class="btn btn-primary mr-2" style="margin: 10px;" @click="triggerFileInput">Thêm ảnh</button>
                <input id="fileAdd" type="file" class="hidden-input form-control" @change="handleFileChangePhoto" style="display: none;" />
                <button class="btn btn-danger mr-2" style="margin: 10px;"  :disabled="isButtonDisabled" @click="removeFamilyPhotoByPhotoId()">Xóa Ảnh</button>
              </div>
              <div class="add-photo-list d-flex">
                <div class="add-photo" v-for="(photo,index) in FamilyPhotoList" :class="{ choose: index == indexClickPhoto }" :key="index" @click="clickPhoto(index),getPhotoCurrentId(photo.PhotoID)" style="margin-left:10px;">
                  <img :src="photo.PhotoUrl" style="width: 300px;">
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
// import { EventBus } from "../assets/js/MyEventBus.js";
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      albumPhoto: {
        AlbumName: null,
        CodeID: 258191,
        description: null,
        BackGroundPhoto: null,
      },
      familyPhoto: {
        albumID: null,
        file: null,
      },
      FamilyPhotoListAdd:[],
      FamilyPhotoListAddShow:[],

      albumCurrentId: null,
      photoCurrentId: null,

      AlbumPhotoList: [],
      FamilyPhotoList: [],

      trClicked: false,
      isButtonDisabled:true,
      imageSrc:null,
      indexClickPhoto:null,
      indexClickPhotoAdd:null,
    };
  },
  methods: {
    clickPhoto(index){
      this.indexClickPhoto = index
    },
    clickPhotoAdd(index){
      this.indexClickPhotoAdd = index
      this.isButtonDisabled = false;
    },
    triggerFileInput() {
      const fileInput = document.getElementById("fileAdd");
      if(fileInput != null){
        fileInput.click();
      }
        
    },
    getAlbumCurrentId(id) {
      this.albumCurrentId = id;
      console.log(id)
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
    openAlbumModal(){
      this.$modal.show("Album-modal");
    },
    closeAlbumModal(){
      this.$modal.hide("Album-modal");
    },
    openEditAlbumModal() {
      this.$modal.show("editAlbum-modal");
    },
    closeEditAlbumModal() {
      this.$modal.hide("editAlbum-modal");
      this.isButtonDisabled = true;
    },
    openAddPhotoModal(){
      this.$modal.show("addPhoto-modal");
    },
    closeAddPhotoModal(){
      this.$modal.hide("addPhoto-modal");
    },
    handleFileChangePhoto(event) {
      const file = event.target.files[0];
      this.FamilyPhotoListAdd;
      this.FamilyPhotoListAdd.push(file)
      console.log(this.FamilyPhotoListAdd)
      if (this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length-1]) {
        // Đọc nội dung của tệp và chuyển thành URL
        const reader = new FileReader();
        reader.onload = () => {
          this.imageSrc = reader.result;
          this.FamilyPhotoListAddShow.push(this.imageSrc);
        };
        reader.readAsDataURL(this.FamilyPhotoListAdd[this.FamilyPhotoListAdd.length-1]);
      }
      this.getAlbumPhotoByCodeId();
      this.openAddPhotoModal();
    },
    handleFileChangeBackGround(event) {
      this.albumPhoto.BackGroundPhoto = event.target.files[0];
    },
    removeFamilyPhotoAdd(){
      this.FamilyPhotoListAddShow.splice(this.indexClickPhotoAdd, 1);
      this.FamilyPhotoListAdd.splice(this.indexClickPhotoAdd, 1);
      this.indexClickPhotoAdd = null,
      this.isButtonDisabled = true;
    },
    getFamilyPhotoByPhotoId() {
      HTTP.get("familyphoto", {
        params: {
          PhotoID: 1,
        },
      })
        .then((response) => {
          if(response.data.success == true){
            this.familyPhoto = response.data.data[0];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    removeFamilyPhotoByPhotoId() {
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa ảnh này?");
      if (isConfirmed) {
        HTTP.delete("familyphoto", {
        params: {
          PhotoID: this.photoCurrentId,
        },
      })
        .then((response) => {
          if(response.data.success){
            this.getFamilyPhotoByAlbumId()
          }
        })
        .catch((e) => {
          console.log(e);
        });
      }
      this.isButtonDisabled=true;
    },
    removeAlbumPhotoByAlbumId(id) {
      console.log(this.albumCurrentId)
      const isConfirmed = window.confirm("Bạn có chắc chắn muốn album này?");
      if (isConfirmed) {
        HTTP.delete("albumphoto", {
        params: {
          AlbumID: id,
        },
        })
          .then((response) => {
            if(response.data.success == true){
              this.getAlbumPhotoByCodeId();
            }
            console.log(this.albumCurrentId)
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    updateAlbum(){
      console.log(this.albumCurrentId)
      HTTP.put("albumphoto", {
          CodeID: 123,
          AlbumID: this.albumCurrentId,
          AlbumName: this.albumPhoto.AlbumName,
          Description:this.albumPhoto.description
      })
        .then((response) => {
          if(response.data.success == true){
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
          CodeID: 123,
        },
      })
        .then((response) => {
          if(response.data.success == true){
            this.AlbumPhotoList = response.data.data;
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
          if(response.data.success == true){
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
          if(response.data.success == true){
            this.FamilyPhotoList = response.data.data;
          }else{
            this.FamilyPhotoList = [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addFamilyPhotoByAlbumId() {
      console.log(this.FamilyPhotoListAdd)
      for(let i = 0; i < this.FamilyPhotoListAdd.length;i++){
        const formData = new FormData();
        formData.append("AlbumID", this.albumCurrentId);
        formData.append("Photo", this.FamilyPhotoListAdd[i]);
        HTTP.post("familyphoto", formData)
        .then((response) => {
          if(response.data.success){
            this.getFamilyPhotoByAlbumId()
          }
         })
        .catch((e) => {
          console.log(e);
        });
      }
      this.closeAddPhotoModal();
    },
    addAlbumPhoto() {
      // const formData = new FormData();
      // formData.append("AlbumName", this.albumPhoto.albumName);
      // formData.append("CodeID", '123');
      console.log()
      HTTP.post("albumphoto", {
        AlbumName: this.albumPhoto.AlbumName,
        Description: this.albumPhoto.description,
        CodeID:123
      })
        .then((response) => {
          if(response.data.success == true){
            this.getAlbumPhotoByCodeId()
          }
        })
        .catch((e) => {
          console.log(e);
        });
        this.closeAddAlbumModal()
    },
  },
  mounted() {
    this.getAlbumPhotoByCodeId();
  },
  created() {
    // EventBus.$emit("HeadList", false);
    // EventBus.$emit("AlbumList", true);
    // EventBus.$emit("ArticleList", false);
  },
};
</script>
<style>
.add-photo.choose {
  border: 5px solid aquamarine;
}
</style>