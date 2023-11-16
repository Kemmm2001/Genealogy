<template>
  <div class="d-flex position-relative" style="padding: 0 120px; height: calc(100% - 64px)">
    <div class="d-flex d-flex align-items-center position-absolute" style="top: 5%; bottom: 5%; left: 5%; right: 5%;">
      <div class="info-pages-container w-100 h-100">
        <div class="d-flex align-items-center w-100 my-2 mx-2" style="height: 50px; font-size: 20px; font-weight: bold;">
          Album dòng họ</div>
        <div class="d-flex flex-row">
          <div class="col-md-6 d-flex align-items-center" style="justify-content: left;">
            <div class="w-100 my-2 mx-2">
              <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên album...">
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
        <div class="d-flex flex-wrap">
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">Tên album</div>
            </div>
          </div>
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">Tên album</div>
            </div>
          </div>
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">Tên album</div>
            </div>
          </div>
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">Tên album</div>
            </div>
          </div>
          <div class="album mx-2 mb-3 d-flex flex-column">
            <div class="album-cover"></div>
            <div class="album-general-info d-flex align-items-center">
              <div class="d-flex justify-content-center w-100">Tên album</div>
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
    </div>

    <modal name="addAlbum-modal">
      <div class="form-group">
        <div class="w-100 h-100 add-album-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm album
            </div>
            <div class="close-add-form" @click="closeAddAlbumModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row mt-4 mb-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Ảnh bìa
                album</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên
                album</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Thêm ảnh</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file" />
              </div>
            </div>
            <div class="d-flex flex-row m-3 align-items-center articlelist-button-container">
              <div class="">
                <button class="articlelist-item-button form-control">Thêm</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal name="editAlbum-modal">
      <div class="form-group">
        <div class="w-100 h-100 add-album-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Cập nhật tài liệu
            </div>
            <div class="close-add-form" @click="closeEditAlbumModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row mt-4 mb-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="off-url" style="cursor: pointer;">Đường dẫn tài liệu
                offline</label>
              <div class="mx-2 w-100">
                <input id="off-url" type="file" class="form-control input-file" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="on-url" style="cursor: pointer;">Đường dẫn tài liệu
                online</label>
              <div class="mx-2 w-100">
                <input id="on-url" type="text" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-name" style="cursor: pointer;">Tên tài
                liệu</label>
              <div class="mx-2 w-100">
                <input id="article-name" type="text" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-1 align-items-center">
              <label class="col-3 d-flex justify-content-center" for="article-des" style="cursor: pointer;">Mô tả</label>
              <div class="mx-2 w-100">
                <input id="article-des" type="text" class="form-control" />
              </div>
            </div>
            <div class="d-flex flex-row my-3 align-items-center articlelist-button-container">
              <div class="">
                <button class="articlelist-item-button form-control"> Lưu thay đổi </button>
              </div>
              <div class="mx-2">
                <button class="articlelist-item-button form-control"> Xóa </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>
  
<script>
// import { EventBus } from "../assets/js/MyEventBus.js";
export default {
  data() {
    return {
      trClicked: false,
    };
  },
  methods: {
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
  },
  created() {
    // EventBus.$emit("HeadList", false);
    // EventBus.$emit("AlbumList", true);
    // EventBus.$emit("ArticleList", false);
  },
};
</script>