<!-- phùng việt khôi -->
<template>
  <div class="history-screen d-flex h-100 w-100 p-0 position-relative" style="overflow-y: auto;">
    <div class="h-100 position-absolute" style="top: 0; left: 0; width: 20%;">
      <div class="pt-2 px-2 d-flex flex-row align-items-center justify-content-center" style="height: 50px; font-size: 20px; font-weight: bold;">Lịch sử gia phả</div>
      <div class="position-relative p-2 d-flex">
        <label for="text-search" style="position: absolute; inset: 12px;">
          <svg class="text-search-icon h-100 d-flex align-items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </label>
        <div class="w-100" style="height: 48px;">
          <input v-model="keySearch" @change="searchHistory()" class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" />
        </div>
      </div>
      <div class="pb-2 px-2 d-flex flex-row">
        <div class="d-flex align-items-center" style="width: 15%;">Từ</div>
        <input @change="filterHistory()" v-model="filterStartDate" class="form-control" type="date" />
      </div>
      <div class="pb-2 px-2 d-flex flex-row">
        <div class="d-flex align-items-center" style="width: 15%;">Đến</div>
        <input @change="filterHistory()" v-model="filterEndDate" class="form-control" type="date" />
      </div>
      <div class="pb-2 px-2 d-flex justify-content-center">
        <div v-if="memberRole != 3" @click="showAddHistoryModal('Thêm lịch sử dòng họ', 'add')" class="btn bg-primary text-white" style="margin-right: 10px;">Thêm</div>
        <div @click="resertHistory()" class="btn bg-primary text-white">Làm mới</div>
      </div>
    </div>
    <div v-if="listHistory" class="h-100 position-absolute p-2" style="top: 0; right: 0; width: 80%; background-color: #f2f2f2;">
      <draggable :list="listHistory" :disabled="!enabled" class="list-group h-100" style="overflow-y: auto;" ghost-class="ghost" :move="checkMove" @start="dragging = true" @end="dragging = false">
        <div v-for="element in listHistory" :key="element.HistoryID" class="w-100" :style="{ 'min-height': '72px', 'float': element.HistoryID % 2 === 0 ? 'right' : 'left' }">
          <div @click="getInforHistory(element.HistoryID)" class="list-group-item position-relative h-100" :style="{ 'width': '49%', 'float': element.HistoryID % 2 === 0 ? 'right' : 'left' }">
            <div class="position-absolute history-start">{{ formatDate(element.startDate) }}</div>
            <div class="position-absolute history-end">{{ formatDate(element.endDate) }}</div>
            <div class="d-flex align-items-center" style="min-height: inherit; padding-top: 25px;">{{ element.Description }}</div>
          </div>
        </div>
      </draggable>
    </div>
    <div v-else class="h-100 position-absolute p-2" style="top: 0; right: 0; width: 80%; background-color: #f2f2f2;">
      <div class="h-100 w-100 position-relative">
        <div style="inset: 0; margin: auto; position: absolute; height: fit-content; width: fit-content; font-size: 19px;">Gia phả của bạn chưa được tạo lịch sử</div>
      </div>
    </div>
    <div class="addHistory-container">
      <modal name="addHistory-modal">
        <div class="form-group h-100">
          <div class="w-100 h-100 modal-bg position-relative">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">{{ TitleModal }}</div>
              <div class="close-add-form" @click="closeAddHistoryModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column" style="height: calc(100% - 50px);">
              <div class="d-flex flex-row pt-2 px-2">
                <div>Ngày bắt đầu</div>
                <input v-model="startDate" type="date" class="form-control" @change="filterHistory()" />
              </div>
              <div class="d-flex flex-row pt-2 px-2">
                <div>Ngày kết thúc</div>
                <input v-model="endDate" type="date" class="form-control" @change="filterHistory()" />
              </div>
              <div class="pt-2 px-2" style="height: 120px;">
                <textarea v-model="descriptionModal" class="w-100 h-100 text-area description form-control" placeholder="Mô tả"></textarea>
              </div>
            </div>
            <div v-if="memberRole!= 3" class="modal-footer position-absolute w-100" style="bottom: 0;">
              <div v-if="isAdd" @click="addHistory()" class="bg-primary text-white btn mx-2">Thêm</div>
              <div v-else @click="updateHistory()" class="bg-primary text-white btn mx-2">sửa</div>
              <div v-if="!isAdd" @click="removeHistory()" class="bg-danger text-white btn mx-2">Xóa lịch sử</div>
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
import draggable from "vuedraggable";
import { HTTP } from "../assets/js/baseAPI";
import Snackbar from "awesome-snackbar";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      isAdd: false,
      TitleModal: null,
      descriptionModal: null,
      endDate: null,
      startDate: null,
      CodeID: null,
      listHistory: null,
      enabled: true,
      dragging: false,
      historyID: null,
      keySearch: null,
      filterStartDate: null,
      filterEndDate: null,
      memberRole: null,
    };
  },
  methods: {
    //nguyễn lê hùng
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
    //nguyễn lê hùng
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
    getMemberRole() {
      try {
        HTTP.post("roleAccount", {
          accountID: localStorage.getItem("accountID"),
          codeID: localStorage.getItem("CodeID"),
        })
          .then((response) => {
            if (response.data.success == true) {
              this.memberRole = response.data.data.RoleID;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } catch (error) {
        console.log(error);
      }
    },
    //nguyễn lê hùng
    filterHistory() {
      if (this.filterEndDate != null && this.filterStartDate != null) {
        HTTP.post("filterHistory", {
          startDate: this.filterStartDate,
          endDate: this.filterEndDate,
        })
          .then((response) => {
            if (response.data.success == true) {
              this.listHistory = response.data.data;
            } else {
              this.NotificationsDelete("Lỗi hệ thống");
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    //nguyễn lê hùng
    searchHistory() {
      HTTP.post("searchHistory", {
        CodeID: this.CodeID,
        keySearch: this.keySearch,
      })
        .then((response) => {
          if (response.data.success == true) {
            this.listHistory = response.data.data;
          } else {
            this.NotificationsDelete("Lỗi hệ thống");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },

    //nguyễn lê hùng
    removeHistory() {
      HTTP.get("delete-familyhistory", {
        params: {
          FamilyHistoryID: this.historyID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.NotificationsDelete("xóa thành công");
            this.closeAddHistoryModal();
            this.getListHistory();
          } else {
            this.NotificationsDelete(response.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //nguyễn lê hùng
    resertHistory() {
      (this.filterEndDate = null),
        (this.filterStartDate = null),
        this.getListHistory();
    },
    //nguyễn lê hùng
    getInforHistory(historyID) {
      this.isAdd = false;
      this.historyID = historyID;
      HTTP.get("familyhistory", {
        params: {
          FamilyHistoryID: historyID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            let data = response.data.data;
            data = data[0];
            this.endDate = this.formatDate(data.endDate);
            this.startDate = this.formatDate(data.startDate);
            this.descriptionModal = data.Description;
            this.showAddHistoryModal("Thông tin lịch sử");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    //nguyễn lê hùng
    updateHistory() {
      if (
        this.endDate != null &&
        this.startDate != null &&
        this.descriptionModal != null &&
        this.descriptionModal != ""
      ) {
        HTTP.put("familyhistory", {
          FamilyHistoryID: this.historyID,
          Description: this.descriptionModal,
          startDate: this.startDate,
          endDate: this.endDate,
        })
          .then((response) => {
            if (response.data.success == true) {
              this.NotificationsScuccess(response.data.message);
              this.closeAddHistoryModal();
              this.getListHistory();
            } else {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("bạn chưa điền hết thông tin");
      }
    },
    //nguyễn lê hùng
    addHistory() {
      if (this.startDate > this.endDate) {
        this.NotificationsDelete("Ngày bắt đầu đang lớn hơn ngày kết thúc");
      } else {
        if (
          this.endDate != null &&
          this.startDate != null &&
          this.descriptionModal != null &&
          this.descriptionModal != ""
        ) {
          HTTP.post("familyhistory", {
            CodeID: this.CodeID,
            Description: this.descriptionModal,
            startDate: this.startDate,
            endDate: this.endDate,
          })
            .then((response) => {
              if (response.data.success == true) {
                this.NotificationsScuccess(response.data.message);
                this.closeAddHistoryModal();
                this.getListHistory();
              } else {
                this.NotificationsDelete(response.data.message);
              }
            })
            .catch((e) => {
              console.log(e);
            });
        } else {
          this.NotificationsDelete("bạn chưa điền hết thông tin");
        }
      }
    },
    checkMove() {
      console.log("vào đây");
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    getListHistory() {
      HTTP.get("familyhistory", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          if (
            response.data.success == false &&
            response.data.status_code == 402
          ) {
            localStorage.removeItem("CodeID");
            localStorage.removeItem("accountID");
            this.$router.push("/login");
          } else {
            this.listHistory = response.data.data;
            console.log(this.listHistory);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    showAddHistoryModal(title, action) {
      this.TitleModal = title;
      if (action == "add") {
        this.endDate = null;
        this.startDate = null;
        this.descriptionModal = null;
        this.isAdd = true;
      }
      this.$modal.show("addHistory-modal");
    },
    closeAddHistoryModal() {
      this.$modal.hide("addHistory-modal");
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
    if (
      localStorage.getItem("CodeID") != null &&
      localStorage.getItem("accountID") != null
    ) {
      this.getMemberRole();
      this.getListHistory();
    }
  },
};
</script>
