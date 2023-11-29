<template>
  <div class="event-screen d-flex flex-row w-100 p-0" style="overflow-y: auto;background-color: #bf831526">
    <div class="col-6 h-100 calendar">
      <div class="h-100 p-3 bg-colored" style="background-color: #f2f2f2;">
        <div class="d-flex flex-row" style="height: 48px;">
          <div class="h-100 w-100" style="padding-right: 4px;">
            <select @change="getDayOfMonth()" v-model="currentMonth" class="form-control h-100 w-100">
              <option value="1">Tháng 01</option>
              <option value="2">Tháng 02</option>
              <option value="3">Tháng 03</option>
              <option value="4">Tháng 04</option>
              <option value="5">Tháng 05</option>
              <option value="6">Tháng 06</option>
              <option value="7">Tháng 07</option>
              <option value="8">Tháng 08</option>
              <option value="9">Tháng 09</option>
              <option value="10">Tháng 10</option>
              <option value="11">Tháng 11</option>
              <option value="12">Tháng 12</option>
            </select>
          </div>
          <div class="h-100 w-100" style="padding-left: 4px;">
            <select @change="getDayOfMonth()" v-model="currentYear" class="form-control h-100 w-100">
              <option v-for="year in listOfYear" :key="year">{{ year }}</option>
            </select>
          </div>
        </div>
        <div class="d-flex flex-row pt-3 mt-2" style="height: 48px; background-color: #FFFFFF; border-radius: 0.375rem;">
          <div class="col-6 text-dark d-flex align-items-center h-100">
            <div class="w-100 d-flex justify-content-center">Tháng {{ this.currentMonth }} - {{ this.currentYear }}</div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center h-100" @click="setUpDate(), getDayOfMonth()">
            <div class="btn bg-primary text-white h-100 d-flex align-items-center">Hôm nay</div>
          </div>
        </div>
        <div class="pt-3" style="background-color: #FFFFFF;">
          <div class="h-100">
            <table class="table table-eventlist eventlist-list m-0">
              <thead style="position: sticky; top: 0;">
                <tr class="eventlist-item">
                  <th class="eventlist-list-th" scope="col">CN</th>
                  <th class="eventlist-list-th" scope="col">T2</th>
                  <th class="eventlist-list-th" scope="col">T3</th>
                  <th class="eventlist-list-th" scope="col">T4</th>
                  <th class="eventlist-list-th" scope="col">T5</th>
                  <th class="eventlist-list-th" scope="col">T6</th>
                  <th class="eventlist-list-th" scope="col">T7</th>
                </tr>
              </thead>
              <tbody>
                <tr class="normal" v-for="(week, weekIndex) in dayOfMonth" :key="weekIndex">
                  <td class="ngaythang" v-for="(day, dayIndex) in week" :key="dayIndex" :class="{ choose: dayIndex == indexClickDay && weekIndex == indexClickWeek }" @click="clickDate(dayIndex, weekIndex)" :style="{ color: day.solar.month != currentMonth ? '#bebebe' : 'black' }">
                    <div v-if="day.solar.date == 1" class="cn" @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{ day.solar.date + "/" + (day.solar.month) }}</div>
                    <div v-if="day.solar.date != 1" class="cn" @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{ day.solar.date }}</div>
                    <div v-if="day.lunar.date == 1" class="am" @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{ day.lunar.date + "/" + (day.lunar.month) }}</div>
                    <div v-if="day.lunar.date != 1" class="am" @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{ day.lunar.date }}</div>
                    <div v-if="checkDateEvent(`${day.solar.year}-${day.solar.month}-${day.solar.date}`)">Có sự kiện</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 h-100 event-list">
      <div class="h-100 p-3 bg-colored" style="background-color: #f2f2f2;">
        <div class="search-filter d-flex flex-row position-relative">
          <div class="search d-flex">
            <input v-model="keySearch" type="text" class="form-control h-100" placeholder="Nhập tên sự kiện..." @change="searchEvent()" />
          </div>
          <div class="d-flex flex-row" style="justify-content: end;">
            <div class="item">
              <select v-model="filterRepeat" class="form-control h-100" @change="filterEvent()">
                <option :value="null">Kiểu lặp lại</option>
                <option v-for="list in listRepeat" :key="list.id" :value="list.RepeatID">{{list.RepeatName}}</option>
              </select>
            </div>
            <div class="item">
              <select v-model="filterStatus" class="form-control h-100" @change="filterEvent()">
                <option :value="null">Trạng thái</option>
                <option value="1">Chưa kết thúc</option>
                <option value="0">Đã kết thúc</option>
              </select>
            </div>
            <div class="btn bg-primary text-white d-flex align-items-center item">Làm mới</div>
          </div>
        </div>
        <div class="button-list d-flex flex-row pt-3 mt-2">
          <div @click="showAddEventModal()" class="btn bg-primary text-white d-flex align-items-center">Thêm sự kiện</div>
          <div class="btn bg-primary text-white d-flex align-items-center item">Xuất excel</div>
        </div>
        <div class="pt-3" style="height: calc(100% - 96px);">
          <div style="overflow-y: auto;">
            <table class="table table-eventlist eventlist-list m-0">
              <thead style="position: sticky; top: 0;">
                <tr class="eventlist-item">
                  <th class="eventlist-list-th" scope="col">#</th>
                  <th class="eventlist-list-th" scope="col">Tên sự kiện</th>
                  <th class="eventlist-list-th" scope="col">Thời gian bắt đầu</th>
                  <th class="eventlist-list-th" scope="col">Thời gian kết thúc</th>
                  <th class="eventlist-list-th" scope="col">Địa điểm</th>
                </tr>
              </thead>
              <tbody>
                <tr class="eventlist-item eventlist-table-item odd" v-for="(event,index) in listEvent" :key="event.EventID" @click="showEditEventModal(event.EventID)">
                  <td>{{index+1}}</td>
                  <td>{{event.EventName}}</td>
                  <td>
                    <div>{{formattedCreatedAt(event.StartDate)}} (DL)</div>
                    <div>02-01-2000 (AL)</div>
                  </td>
                  <td>
                    <div>{{event.EndDate}} (DL)</div>
                    <div>02-01-2000 (AL)</div>
                  </td>
                  <td>{{event.Place}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="add-event-container">
      <modal name="add-event-modal">
        <div class="form-group h-100">
          <div class="w-100 h-100 modal-bg position-relative">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">{{titleModal}}</div>
              <div class="close-add-form" @click="closeAddEventModal()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-column" style="height: calc(100% - 50px);">
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex flex-row" style="flex-grow: 1;">
                  <div class="d-flex align-items-center" style="padding-right: 8px;">Tên sự kiện(*)</div>
                  <div class="d-flex h-100" style="flex-grow: 1;">
                    <input v-model="eventFamily.EventName" type="text" class="form-control h-100 w-100" />
                  </div>
                </div>
                <div class="d-flex flex-row">
                  <div class="d-flex align-items-center px-2">Kiểu lặp lại</div>
                  <div>
                    <select v-model="eventFamily.RepeatID" class="form-control h-100">
                      <option v-for="list in listRepeat" :key="list.id" :value="list.RepeatID">{{list.RepeatName}}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mt-2 px-2" style="height: 120px;">
                <textarea v-model="eventFamily.Description" class="w-100 h-100 text-area description" placeholder="Mô tả"></textarea>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 38px; margin-right: 8px;">Từ(*)</div>
                <input v-model="startHour" class="form-control time-input" type="number" min="00" max="23" />
                <div class="d-flex align-items-center">:</div>
                <input v-model="startMinute" class="form-control time-input" type="number" min="00" max="59" />
                <div class="d-flex" style="flex-grow: 1;">
                  <input v-model="startDate" type="date" class="form-control h-100 w-100" />
                </div>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 38px; margin-right: 8px;">Đến(*)</div>
                <input v-model="endHour" class="form-control time-input" type="number" min="00" max="23" />
                <div class="d-flex align-items-center">:</div>
                <input v-model="endMinute" class="form-control time-input" type="number" min="00" max="59" />
                <div class="d-flex" style="flex-grow: 1;">
                  <input v-model="endDate" type="date" class="form-control h-100 w-100" />
                </div>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex flex-row" style="flex-grow: 1;">
                  <div class="d-flex align-items-center" style="padding-right: 8px;">Địa điểm(*)</div>
                  <div class="d-flex h-100" style="flex-grow: 1; padding-right: 8px;">
                    <input v-model="eventFamily.Place" type="text" class="form-control h-100 w-100" />
                  </div>
                  <div class="h-100 d-flex flex-row align-items-center" style="padding-right: 8px;">
                    <input v-model="eventFamily.IsImportant" class="form-check-input m-0" type="checkbox" />
                    <div style="padding-left: 8px;">Sự kiện quan trọng</div>
                  </div>
                </div>
              </div>
              <div class="mt-2 px-2" style="height: 120px;">
                <textarea v-model="eventFamily.Note" class="w-100 h-100 text-area" placeholder="Ghi chú"></textarea>
              </div>
            </div>
            <div class="modal-footer position-absolute w-100" style="bottom: 0;">
              <div v-if="isAdd" @click="addEvent()" class="bg-primary text-white btn mx-2">Thêm</div>
              <div v-else @click="updateEvent()" class="bg-primary text-white btn mx-2">Lưu</div>
              <div @click="removeEvent()" class="bg-danger text-white btn mx-2">Xóa sự kiện</div>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Snackbar from "awesome-snackbar";
import { Calendar } from "vietnamese-lunar-calendar";
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      eventFamily: {
        EventID: null,
        EventName: null,
        Status: 1,
        StartDate: null,
        EndDate: null,
        Description: null,
        IsImportant: null,
        Note: null,
        Place: null,
        RepeatID: 1,
      },
      startHour: null,
      startMinute: null,
      startDate: null,

      filterStatus: null,
      filterRepeat: null,

      isAdd: false,
      endHour: null,
      endMinute: null,
      endDate: null,
      keySearch: null,

      titleModal: null,
      CodeID: null,
      calendar: null,
      dayOfMonth: [],
      listOfYear: [],
      currentMonth: null,
      currentYear: null,

      chooseDate: null,
      indexClickDay: null,
      indexClickWeek: null,

      currentEventId: null,
      listEvent: [],
      listRepeat: null,
    };
  },
  computed: {
    formattedCreatedAt() {
      return (dateString) => {
        const date = new Date(dateString);
        //const options = { timeZone: 'Asia/Ho_Chi_Minh' };
        return date.toLocaleString('vi-VN', ""+Intl.DateTimeFormat().resolvedOptions().timeZone);
      };
    },
  },
  methods: {
    checkDateEvent(dateCheck){
      let startDate
      let endDate
      let selectedDate
      console.log(dateCheck)
      for(let i = 0 ; i < this.listEvent.length;i++){
        startDate = new Date(this.listEvent[i].StartDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(this.listEvent[i].EndDate);
        selectedDate = new Date(dateCheck);
        console.log(startDate)
        let check = selectedDate >= startDate && selectedDate <= endDate;
        return check;
      }
      
      return false
      // Kiểm tra xem ngày được chọn có nằm trong khoảng hay không
      
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
    getListEvent() {
      HTTP.get("event", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.listEvent = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListRepeat() {
      HTTP.get("listRepeat")
        .then((response) => {
          if (response.data.success == true) {
            this.listRepeat = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterEvent() {
      if (this.filterStatus == null && this.filterRepeat == null) {
        console.log("vào đây");
        this.getListEvent();
      } else {
        HTTP.post("filter-event", {
          Status: this.filterStatus,
          RepeatID: this.filterRepeat,
          CodeID: this.CodeID,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.listEvent = respone.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    searchEvent() {
      HTTP.post("searchEvent", {
        CodeID: this.CodeID,
        keySearch: this.keySearch,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.listEvent = respone.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addEvent() {
      this.eventFamily.StartDate = `${this.startDate} ${this.startHour}:${this.startMinute}`;
      this.eventFamily.EndDate = `${this.endDate} ${this.endHour}:${this.endMinute}`;
      if (
        this.eventFamily.EventName != null &&
        this.eventFamily.StartDate != null &&
        this.eventFamily.EndDate != null &&
        this.eventFamily.Place != null
      ) {
        HTTP.post("addEvent", {
          EventName: this.eventFamily.EventName,
          CodeID: this.CodeID,
          Status: 1,
          StartDate: this.eventFamily.StartDate,
          EndDate: this.eventFamily.EndDate,
          Description: this.eventFamily.Description,
          Note: this.eventFamily.Note,
          Place: this.eventFamily.Place,
          IsImportant: this.eventFamily.Description ? 1 : 0,
          RepeatID: this.eventFamily.RepeatID,
          isAdd: true,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.closeAddEventModal();
              this.getListEvent();
              this.NotificationsScuccess(respone.data.message);
            } else {
              this.NotificationsDelete(respone.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("bạn nhập thiếu trường (*)");
      }
    },
    updateEvent() {
      this.eventFamily.StartDate = `${this.startDate} ${this.startHour}:${this.startMinute}`;
      this.eventFamily.EndDate = `${this.endDate} ${this.endHour}:${this.endMinute}`;
      if (
        this.eventFamily.EventName != null &&
        this.eventFamily.StartDate != null &&
        this.eventFamily.EndDate != null &&
        this.eventFamily.Place != null
      ) {
        HTTP.put("updateEvent", {
          EventID: this.eventFamily.EventID,
          EventName: this.eventFamily.EventName,
          StartDate: this.eventFamily.StartDate,
          EndDate: this.eventFamily.EndDate,
          Description: this.eventFamily.Description,
          Note: this.eventFamily.Note,
          Place: this.eventFamily.Place,
          IsImportant: this.eventFamily.IsImportant,
          RepeatID: this.eventFamily.RepeatID,
          Status: this.eventFamily.Status,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.NotificationsScuccess(respone.data.message);
              this.closeAddEventModal();
              this.getListEvent();
            } else {
              this.NotificationsDelete(respone.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("bạn nhập thiếu trường (*)");
      }
    },
    removeEvent() {
      HTTP.delete("removeEvent", {
        params: {
          EventID: this.eventFamily.EventID,
        },
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.NotificationsDelete(respone.data.message);
            this.closeAddEventModal();
            this.listEvent();
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    clickDate(indexDay, indexWeek) {
      this.indexClickDay = indexDay;
      this.indexClickWeek = indexWeek;
    },
    setChooseDate(day, month, year) {
      this.chooseDate = new Date();
      this.chooseDate.setFullYear(year);
      this.chooseDate.setMonth(month - 1); // Tháng bắt đầu từ 0, nên 10 tương ứng với tháng 11
      this.chooseDate.setDate(day);
    },
    setUpDate() {
      const dateNow = new Date();
      this.currentMonth = dateNow.getMonth() + 1;
      this.currentYear = dateNow.getFullYear();
      this.listOfYear = [];
      for (let i = 1500; i < 2199; i++) {
        this.listOfYear.push(i);
      }
    },
    getDayOfMonth() {
      this.dayOfMonth = new Calendar(this.currentYear, this.currentMonth).weeks;
      console.log(this.dayOfMonth)
    },
    showAddEventModal() {
      this.eventFamily = {};
      this.eventFamily.Status = 1;
      this.eventFamily.RepeatID = 1;
      this.startHour = null;
      this.startMinute = null;
      this.startDate = null;

      this.endHour = null;
      this.endMinute = null;
      this.endDate = null;
      this.isAdd = true;
      this.titleModal = "Thêm sự kiện";
      this.$modal.show("add-event-modal");
    },
    closeAddEventModal() {
      this.$modal.hide("add-event-modal");
    },
    showEditEventModal(id) {
      this.isAdd = false;
      this.eventFamily = {};
      this.titleModal = "sửa thông tin sự kiện";
      HTTP.get("inforEvent", {
        params: {
          EventID: id,
        },
      }).then((respone) => {
        if (respone.data.success == true) {
          this.eventFamily = respone.data.data;
          this.eventFamily = this.eventFamily[0];
          console.log(this.eventFamily);
          this.startHour = new Date(this.eventFamily.StartDate).getUTCHours();
          this.startMinute = new Date(
            this.eventFamily.StartDate
          ).getUTCMinutes();
          this.startDate = new Date(this.eventFamily.StartDate)
            .toISOString()
            .split("T")[0];

          this.endHour = new Date(this.eventFamily.EndDate).getUTCHours();
          this.endMinute = new Date(this.eventFamily.EndDate).getUTCMinutes();
          this.endDate = new Date(this.eventFamily.EndDate)
            .toISOString()
            .split("T")[0];

          this.$modal.show("add-event-modal");
        }
      });
    },
    closeEditEventModal() {
      this.$modal.hide("edit-event-modal");
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
    this.setUpDate();
    this.getDayOfMonth();
    this.getListEvent();
    this.getListRepeat();
  },
};
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
td.ngaythang.choose {
  background-color: lightblue;
}

td.ngaythang:hover {
  cursor: pointer;
}
</style>