<!-- phùng việt khôi -->
<template>
    <div class="resetpwd-screen d-flex flex-row h-100 w-100">
        <div class="resetpwd-container d-flex flex-column p-3">
            <div class="func-detail-item">
                <div class="pb-2" style="font-weight: bold;">Mật khẩu mới</div>
                <div class="d-flex flex-row position-relative">
                    <input v-bind:type="newPwdVisibilityType" v-model="newPwd" class="form-control" />
                    <div @click="toggleNewPwdVisibility()"
                        class="position-absolute visibility-icon d-flex align-items-center">
                        <svg v-if="!newPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                        </svg>
                        <svg v-if="newPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path
                                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="func-detail-item mt-4">
                <div class="pb-2" style="font-weight: bold;">Nhập lại mật khẩu mới</div>
                <div class="d-flex flex-row position-relative">
                    <input v-bind:type="newPwd2VisibilityType" v-model="reNewPwd" class="form-control" />
                    <div @click="toggleNewPwd2Visibility()"
                        class="position-absolute visibility-icon d-flex align-items-center">
                        <svg v-if="!newPwd2Visibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                            <path
                                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                        </svg>
                        <svg v-if="newPwd2Visibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path
                                d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="w-100 d-flex mt-4" style="justify-content: end;" >
                <div class="btn bg-primary text-white" @click="changePassWord()">Lưu thay đổi</div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
import Snackbar from "awesome-snackbar";
import CryptoJS from 'crypto-js';
export default {
    data() {
        return {
            newPwdVisibility: false,
            newPwd2Visibility: false,
            newPwdVisibilityType: "password",
            newPwd2VisibilityType: "password",

            newPwd:null,
            reNewPwd:null,
            token:null,
        };
    },
    methods: {
        changePassWord(){
            // Dữ liệu cần mã hóa
            var dataToEncrypt1 = this.newPwd;
            var dataToEncrypt2 = this.reNewPwd;
            var secureKey = process.env.VUE_APP_KEY_SECRET
            // Mã hóa dữ liệu với khóa
            var encryptedData1 = CryptoJS.AES.encrypt(dataToEncrypt1, secureKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            var encryptedData2 = CryptoJS.AES.encrypt(dataToEncrypt2, secureKey, {
                mode: CryptoJS.mode.ECB,
                padding: CryptoJS.pad.Pkcs7
            });
            HTTP.post("reset-password", {
                password: encryptedData1.toString(),
                repassword: encryptedData2.toString(),
            },{
                params: {
                    token: this.token,
                },
            }).then((response) => {
                if(response.data.success == true){
                    this.$router.push("/login");
                    this.NotificationsScuccess(response.data.message)
                }else{
                    this.NotificationsDelete(response.data.message)
                }
            })
            .catch((e) => {
                this.NotificationsDelete(e);
            });
        },
        toggleNewPwdVisibility() {
            this.newPwdVisibility = !this.newPwdVisibility;
            this.newPwdVisibilityType =
                this.newPwdVisibilityType === "text" ? "password" : "text";
        },
        toggleNewPwd2Visibility() {
            this.newPwd2Visibility = !this.newPwd2Visibility;
            this.newPwd2VisibilityType =
                this.newPwd2VisibilityType === "text" ? "password" : "text";
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
    mounted() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString)

        // Lấy giá trị của tham số 'token'
        let takeToken = urlParams.get("token");
        takeToken = takeToken.replace('token=', '');
        this.token = takeToken;
        // const query = this.$route.query;

        // // Check if the "token" parameter is present
        // if (query.token) {
        //     // Token is present, you can access its value
        //     const tokenValue = query.token;
        //     console.log(`Token found: ${tokenValue}`);

        //     // Now you can use the tokenValue as needed, e.g., store it in the component's data
        //     this.$data.token = tokenValue;
        // } else {
        //     // Token is not present
        //     console.log('Token not found');
        // }
    }
}
</script>