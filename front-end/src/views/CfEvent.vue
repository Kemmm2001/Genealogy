<template>
  <div class="cfevent-screen h-100 w-100 position-relative">
    <div class="cfevent-container">
      <div v-if="!isExpired && inforEvent" class="h-100 w-100">
        <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px; text-align: center;">
          <div>Sự kiện {{inforEvent.EventName}} diễn ra vào {{hour}}:{{minute}} ngày {{day}}/{{month}}/{{year}}.</div>
          <div>Bạn có thể tham gia được không?</div>
        </div>
        <div class="d-flex flex-row w-100" style="height: 30%;">
          <div class="col-6 d-flex align-items-center justify-content-center">
            <div class="btn bg-danger text-white">Có</div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center">
            <div class="btn bg-primary text-white">Không</div>
          </div>
        </div>
      </div>
      <div v-else class="h-100 w-100">
        <div class="w-100 d-flex flex-column align-items-center justify-content-center" style="height: 50%;">
          <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px;">
            <div>Bạn đã không phản hồi sự kiện diễn ra vào 00:00 ngày 01/01/2000.</div>
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
export default {
  data() {
    return {
      isExpired: false,
      memberId: null,
      inforEvent: null,
      day: null,
      month: null,
      year: null,
      hour: null,
      minute: null,
    };
  },
  methods: {
    formatdate(startDateString) {
      let startDate = new Date(startDateString);

      this.day = startDate.getDate(); // Ngày
      this.month = startDate.getMonth() + 1; // Tháng (lưu ý rằng tháng bắt đầu từ 0)
      this.year = startDate.getFullYear(); // Năm
      this.hour = startDate.getHours(); // Giờ
      this.minute = startDate.getMinutes();
    },
  },
  mounted() {
    const token = this.$route.query.token;
    if (token) {
      console.log(token);
      HTTP.get("getEventByToken", {
        params: {
          token: token,
        },
      }).then((respone) => {
        console.log(respone.data);
        if (respone.data.success == true) {
          this.isExpired = false;
          let data = respone.data.data.eventId;
          if (data) {
            HTTP.get("inforEvent", {
              params: {
                EventID: data,
              },
            }).then((respone) => {
              if (respone.data.success == true) {
                this.inforEvent = respone.data.data;
                this.inforEvent = this.inforEvent[0]
                this.formatdate(this.inforEvent.StartDate);
                console.log(this.inforEvent);
              }
            });
          }
        } else {
          this.isExpired = true;
        }
      });
    } else {
      console.log("Không có token trong URL");
    }
  },
};
</script>