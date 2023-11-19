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
          <button @click="openAddAlbumModal()"
            class="btn articlelist-item articlelist-item-button text-center my-4 mx-2">Tạo album</button>
        </div>
      </div>
      <div class="d-flex flex-row flex-wrap" style="height: calc(100% - 151px); overflow-y: auto;">
        <div class="d-flex" v-for=" album in this.AlbumPhotoList" :key="album.AlbumID"
          @click="getAlbumCurrentId(album.AlbumID); openEditAlbumModal()">
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover" v-if="album.backGroundPhoto != null">
              <img :src="'C/' + album.backGroundPhoto" />
            </div>
            <div class="album-cover" v-if="album.backGroundPhoto == null"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">{{ album.AlbumName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex flex-row paging justify-content-center m-4"
        style="position:absolute; bottom: 12px; left: 0; right: 0;">
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
            <div :class="{ chosen: true }">3</div>
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
            <!-- <div class="d-flex flex-row mt-4 mb-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Ảnh bìa
                album</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file"  @change="handleFileChange" />
              </div>
            </div>-->
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                album</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" v-model="albumPhoto.albumName" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" v-model="albumPhoto.description" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Thêm ảnh</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file" @change="handleFileChangePhoto" />
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

    <div class="editAlbum-container">
      <modal name="editAlbum-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-album-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Cập nhật album
              </div>
              <div class="close-add-form" @click="closeEditAlbumModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column">
              <div class="pic-list d-flex flex-row align-items-center mb-2">
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list chosen"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
                <div class="pic-in-list"></div>
              </div>
              <div class="pic-container d-flex flex-row mb-2">
                <div class="d-flex align-items-center" style="transform: rotate(180deg);">
                  <svg class="change-pic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                      d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </div>
                <div class="main-pic"></div>
                <div class="d-flex align-items-center">
                  <svg class="change-pic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                    <path
                      d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                  </svg>
                </div>
              </div>
              <div class="modal-footer">
                <div class="d-flex justify-content-end" style="padding-right: 12px;">
                  <button type="button" class="btn btn-danger mr-2">Xóa ảnh</button>
                  <button style="margin-left:10px" type="button" class="btn btn-primary mr-2">Lưu</button>
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
        albumName: null,
        codeID: 258191,
        description: null,
        backGroundPhoto: null,
      },
      familyPhoto: {
        albumID: null,
        file: null,
      },
      albumCurrentId: null,
      photoCurrentId: null,
      AlbumPhotoList: [],
      FamilyPhotoList: [],
      trClicked: false,
    };
  },
  methods: {
    getAlbumCurrentId(id) {
      this.albumCurrentId = id;
    },
    getPhotoCurrentId(id) {
      this.photoCurrentId = id
    },
    openAddAlbumModal() {
      this.$modal.show("addAlbum-modal");
    },
    closeAddAlbumModal() {
      this.$modal.hide("addAlbum-modal");
    },
    openEditAlbumModal() {
      this.$modal.show("editAlbum-modal");
    },
    closeEditAlbumModal() {
      this.$modal.hide("editAlbum-modal");
    },
    handleFileChangePhoto(event) {
      this.familyPhoto.file = event.target.files[0];
    },
    handleFileChangeBackGround(event) {
      this.albumPhoto.backGroundPhoto = event.target.files[0];
    },
    getFamilyPhotoByPhotoId() {
      HTTP.get("familyphoto", {
        params: {
          PhotoID: 1,
        },
      })
        .then((response) => {
          this.familyPhoto = response.data.data[0];
          console.log(response.data.data);
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
          this.AlbumPhotoList = response.data.data;
          console.log(this.AlbumPhotoList);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getFamilyPhotoByAlbumId(id) {
      HTTP.get("familyphoto", {
        params: {
          AlbumID: id,
        },
      })
        .then((response) => {
          this.AlbumPhotoList = response.data.data;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addFamilyPhoto() {
      const formData = new FormData();
      formData.append("AlbumID", 1);
      formData.append("Photo", this.familyPhoto.file);
      HTTP.post("familyphoto", formData)
        .then(() => { })
        .catch((e) => {
          console.log(e);
        });
    },
    addAlbumPhoto() {
      const formData = new FormData();
      formData.append("AlbumName", this.albumPhoto.albumName);
      formData.append("CodeID", 258191);
      HTTP.post("albumphoto", formData)
        .then(() => {
          this.addFamilyPhoto();
        })
        .catch((e) => {
          console.log(e);
        });
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