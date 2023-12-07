<template>
  <div class="cfevent-screen h-100 w-100 position-relative">
    <div class="cfevent-container">
      <div v-if="confirmed && inforEvent" class="h-100 w-100">
        <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px; text-align: center;">
          <div>Bạn đã phản hồi {{resultIsGoing == 1 ? "Có" : "Không"}} tham gia sự kiện {{inforEvent.EventName}} diễn ra vào {{hour}}:{{minute}} ngày {{day}}/{{month}}/{{year}}.</div>
        </div>
        <div class="d-flex align-items-center" style="justify-content: end; padding-right: 32px; height: 35%;">
          <div @click="resetConfirmed()" class="btn bg-secondary text-white">Phản hồi lại</div>
        </div>
      </div>
      <div v-else-if="!isExpired && inforEvent" class="h-100 w-100">
        <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px; text-align: center;">
          <div>Sự kiện {{inforEvent.EventName}} diễn ra vào {{hour}}:{{minute}} ngày {{day}}/{{month}}/{{year}}.</div>
          <div>Bạn có thể tham gia được không?</div>
        </div>
        <div class="d-flex flex-row w-100" style="height: 30%;">
          <div class="col-6 d-flex align-items-center justify-content-center">
            <div @click="UpdateIsGoing(1)" class="btn bg-danger text-white">Có</div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <div @click="UpdateIsGoing(0)" class="btn bg-primary text-white">Không</div>
          </div>
        </div>
      </div>
      <div v-else-if="isExpired" class="h-100 w-100">
        <div class="w-100 d-flex flex-column align-items-center justify-content-center" style="height: 50%;">
          <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px;">
            <div>Bạn đã không phản hồi sự kiện {{inforEvent.EventName}} diễn ra vào {{hour}}:{{minute}} ngày {{day}}/{{month}}/{{year}}.</div>
          </div>
        </div>
        <div class="d-flex align-items-center" style="justify-content: end; padding-right: 32px; height: 50%;">
          <div class="btn bg-secondary text-white">Đóng</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { HTTP } from "../assets/js/baseAPI.js";
import Snackbar from "awesome-snackbar";
export default {
  data() {
    return {
      resultIsGoing: null,
      isGoing: null,
      confirmed: false,
      isExpired: false,
      inforEvent: null,
      day: null,
      month: null,
      year: null,
      hour: null,
      minute: null,
      token: null,
      eventId: null,
      memberId: null,
    };
  },
  methods: {
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
    resetConfirmed() {
      if (this.isExpired == true) {
        this.NotificationsDelete("Sự kiện đã kết thúc");
      } else {
        this.confirmed = false;
      }
    },
    formatdate(startDateString) {
      let startDate = new Date(startDateString);

      this.day = startDate.getDate();
      this.month = startDate.getMonth() + 1;
      this.year = startDate.getFullYear(); 
      this.hour = startDate.getHours(); 
      this.minute = startDate.getMinutes();
    },
    UpdateIsGoing(IsGoing) {
      console.log("vào đây");
      HTTP.put("UpdateIsGoing", {
        memberId: this.memberId,
        eventId: this.eventId,
        IsGoing: IsGoing,
      }).then((respone) => {
        if (respone.data.success == true) {
          this.confirmed = true;
          this.resultIsGoing = IsGoing;
          this.NotificationsScuccess(respone.data.message);
        } else {
          this.NotificationsDelete(respone.data.message);
        }
      }).catch((e) => {
          console.log(e);
        });
    },
    checkConfirmedEvent() {
      HTTP.post("checkConfirmed", {
        EventID: this.eventId,
        MemberID: this.memberId,
        token: this.token,
      }).then((respone) => {
        if (respone.data.success == false) {
          this.confirmed = false;
        } else {
          this.resultIsGoing = respone.data.data;
          console.log(respone.data.data);
          this.confirmed = true;
        }
      }).catch((e) => {
          console.log(e);
        });
    },
    getInforEvent() {
      HTTP.get("inforEvent", {
        params: {
          EventID: this.eventId,
        },
      }).then((respone) => {
        if (respone.data.success == true) {
          this.inforEvent = respone.data.data;
          this.inforEvent = this.inforEvent[0];
          this.formatdate(this.inforEvent.StartDate);
          this.checkConfirmedEvent();
        }
      }).catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.token = this.$route.query.token;
    if (this.token) {
      console.log(this.token);
      HTTP.get("getEventByToken", {
        params: {
          token: this.token,
        },
      }).then((respone) => {
        console.log(respone.data);
        if (respone.data.success == true) {
          this.isExpired = false;
          this.eventId = respone.data.data.eventId;
          this.memberId = respone.data.data.memberId;
          this.getInforEvent();
        } else {
          this.isExpired = true;
        }
      }).catch((e) => {
          console.log(e);
        });
    } else {
      console.log("Không có token trong URL");
    }
  },
};
</script>