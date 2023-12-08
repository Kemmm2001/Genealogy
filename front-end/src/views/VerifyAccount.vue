<!-- phùng việt khôi -->
<template>
    <div class="w-100 h-100 position-relative verify-background" style="min-height: inherit;">
        <div class="position-absolute verify-container d-flex align-items-center flex-column" style="opacity: 93%; justify-content: space-around; font-size: 18px;">
            <div style="font-weight: bold;">Chúng tôi đã gửi email xác nhận tới tài khoản {{ email }}</div>
            <div style="padding: 0 10%;">Nhấn vào đường dẫn trong hòm thư để xác nhận tài khoản. Nếu bạn không thể tìm thấy email, hãy check trong thư mục spam hoặc bấm vào <span @click="verifyAccount()" class="text-primary" style="cursor: pointer; text-decoration: underline;">đây</span> để gửi lại.</div>
            <div>
                <div class="btn bg-primary text-white" @click="comeBackLogin()"> Trở về trang đăng nhập</div>
            </div>
        </div>
    </div>
</template>
<script>
import { HTTP } from "../assets/js/baseAPI.js";
export default {
  data() {
    return {
      email:null,
    };
  },
  methods: {
    comeBackLogin(){
        localStorage.removeItem("emailRegister"),
        this.$router.push("/login");
    },
    verifyAccount(){
      HTTP.post("verify-account", {
          email: this.email,
        })
          .then((response) => {
            console.log(response.data.success)
            console.log(this.email)
            if (response.data.success == false) {
              this.NotificationsDelete(response.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.email = localStorage.getItem("emailRegister")
  },
};
</script>
<style>
.verify-container{
    height: 35%;
    width: 50%;
    inset: 0;
    margin: auto;
    background-color: #FFFFFF;
}

.verify-background{
    background-image: url(../assets/verify.jpg);
    background-position: bottom;
}
</style>