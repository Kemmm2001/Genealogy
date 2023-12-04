<!-- phùng việt khôi -->
<template>
    <div class="w-100 h-100 position-relative raining-background" style="min-height: inherit;">
        <div class="position-absolute login-form-container d-flex align-items-center flex-column" style="opacity: 93%;">
            <div class="d-flex justify-content-center text-danger mb-2"
                style="font-size: 36px; font-weight: bold; margin-top: 51px;">Quên mật khẩu</div>
            <div class="d-flex flex-column" style="width: 420px;">
                <div class="d-flex mb-2" style="position: relative;">
                    <input type="text" class="form-control py-2 px-5 position-relative" v-model="emailReset" placeholder="Email khôi phục" />
                    <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                        style="left: 0; width: 3rem;">
                        <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path style="fill: gray;"
                                d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                        </svg>
                    </div>
                </div>
                <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
                    <button class="btn bg-danger text-white register-button" @click="sendEmail()">Gửi mail xác nhận</button>
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
            emailReset:null,
        };
    },
    methods: {
        sendEmail(){
            HTTP.post("forget-password", {
                email: this.emailReset,
            }).then((response) => {
                if(response.data.success == true){
                    this.NotificationsScuccess(response.data.message)
                }else{
                    this.NotificationsDelete(response.data.message)
                }
            })
            .catch((e) => {
                this.NotificationsDelete(e);
            });
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
    },
}
</script>