<template>
  <div class="cfevent-screen h-100 w-100 position-relative">
    <div class="cfevent-container">
      <div v-if="false" class="h-100 w-100">
        <div class="d-flex flex-column align-items-center justify-content-center px-3" style="height: 70%; font-size: 20px; text-align: center;">
          <div>Tên sự kiện diễn ra vào 00:00 ngày 01/01/2000.</div>
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
      <div v-if="true" class="h-100 w-100">
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
export default {
  data() {
    return {};
  },
  mounted() {
    const token = this.$route.query.token;

    if (token) {
      console.log("Token:", token);
    } else {
      console.log("Không có token trong URL");
    }
  },
};
</script>