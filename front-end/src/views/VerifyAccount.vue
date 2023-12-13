<!-- phùng việt khôi -->
<template>
  <div class="w-100 h-100 position-relative verify-background" style="min-height: inherit;">
    <div class="position-absolute verify-container d-flex align-items-center flex-column" style="opacity: 93%; justify-content: space-around; font-size: 18px;">
      <div v-if="isActive" style="font-weight: bold;">Cảm ơn bạn đã dùng ứng dụng của chúng tôi. Chúng tôi đã xác nhận tới tài khoản {{ email }}</div>
      <div v-else>
        Bạn đã hết thời gian xác nhận tài khoản. Click
        <a @click="verify_EmailAgain()" style="color:red;cursor: pointer">vào đây</a> để gửi lại email xác nhận
      </div>
      <div v-if="isActive">
        <div class="btn bg-primary text-white" @click="comeBackLogin()">Trở về trang đăng nhập</div>
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
      email: null,
      isActive: true,
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
    verify_EmailAgain() {
      HTTP.post("re_verify-account", {
        token: this.token,
      }).then((resspone) => {
        if (resspone.data.success) {
          this.NotificationsScuccess("Gửi lại email xác nhận thành công");
        } else {
          this.NotificationsDelete(resspone.data.message);
        }
      });
    },
    comeBackLogin() {
      this.$router.push("/login");
    },
  },
  mounted() {
    this.token = this.$route.query.token;
    HTTP.post("setActive", {
      token: this.token,
    }).then((resspone) => {
      if (resspone.data.success) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
  },
};
</script>
<style>
.verify-container {
  height: 35%;
  width: 50%;
  inset: 0;
  margin: auto;
  background-color: #ffffff;
}

.verify-background {
  background-image: url(../assets/verify.jpg);
  background-position: bottom;
}
</style>