<template>
    <div class="d-flex w-100">
      <div class="d-flex flex-column h-100 w-100">
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
            <button @click="openAddArticleModal()"
              class="btn articlelist-item articlelist-item-button text-center my-4 mx-2">Tạo album</button>
          </div>
        </div>
        <div class="">
          <!-- <table class="table articlelist-list m-0">
            <thead>
              <tr class="articlelist-item">
                <th class="articlelist-list-th" scope="col">#</th>
                <th class="articlelist-list-th" scope="col">Tên tài liệu</th>
                <th class="articlelist-list-th" scope="col">Mô tả tài liệu</th>
                <th class="articlelist-list-th" scope="col">Công khai</th>
                <th class="articlelist-list-th" scope="col">Người tạo</th>
                <th class="articlelist-list-th" scope="col">Cập nhật lần cuối</th>
              </tr>
            </thead>
            <tbody>
              <tr class="articlelist-item articlelist-table-item">
                <th @click="openEditArticleModal()" scope="row">1</th>
                <td @click="openEditArticleModal()" class="articlelist-table-td">Mark</td>
                <td @click="openEditArticleModal()" class="articlelist-table-td">Otto</td>
                <td @click="openEditArticleModal()" class="articlelist-table-td">@mdo</td>
                <td @click="openEditArticleModal()" class="articlelist-table-td"></td>
                <td @click="openEditArticleModal()" class="articlelist-table-td"></td>
              </tr>
              <tr class="articlelist-item articlelist-table-item">
                <th @click="openEditArticleModal()" scope="row">2</th>
                <td @click="openEditArticleModal()">Jacob</td>
                <td @click="openEditArticleModal()">Thornton</td>
                <td @click="openEditArticleModal()">@fat</td>
                <td @click="openEditArticleModal()"></td>
                <td @click="openEditArticleModal()"></td>
              </tr>
              <tr class="articlelist-item articlelist-table-item">
                <th @click="openEditArticleModal()" scope="row">3</th>
                <td @click="openEditArticleModal()">Larry the Bird</td>
                <td @click="openEditArticleModal()">Larry the Bird</td>
                <td @click="openEditArticleModal()">@twitter</td>
                <td @click="openEditArticleModal()"></td>
                <td @click="openEditArticleModal()"></td>
              </tr>
            </tbody>
          </table> -->

          <div class=""></div>
        </div>
        <div class="d-flex flex-row justify-content-center m-4">
          <button class="btn px-2 py-0">
            <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </button>
          <button class="btn px-2 p-0">
            <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </button>
          <div class="d-flex align-items-center justify-content-center">Trang 1</div>
          <button class="btn px-2 p-0">
            <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
              <path
                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
            </svg>
          </button>
          <button class="btn px-2 p-0">
            <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </button>
        </div>
      </div>
  
      <modal name="addArticle-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-article-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm tài liệu
              </div>
              <div class="close-add-form" @click="closeAddArticleModal()">
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
              <div class="d-flex flex-row m-3 align-items-center articlelist-button-container">
                <div class="">
                  <button class="articlelist-item-button form-control">Thêm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </modal>
  
      <modal name="editArticle-modal">
        <div class="form-group">
          <div class="w-100 h-100 add-article-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Cập nhật tài liệu
              </div>
              <div class="close-add-form" @click="closeEditArticleModal()">
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
      openAddArticleModal() {
        this.$modal.show("addArticle-modal");
      },
      closeAddArticleModal() {
        this.$modal.hide("addArticle-modal");
      },
      openEditArticleModal() {
        this.$modal.show("editArticle-modal");
      },
      closeEditArticleModal() {
        this.$modal.hide("editArticle-modal");
      },
    },
    created(){
      // EventBus.$emit("HeadList", false);
      // EventBus.$emit("AlbumList", true);
      // EventBus.$emit("ArticleList", false);
    },
  };
  </script>