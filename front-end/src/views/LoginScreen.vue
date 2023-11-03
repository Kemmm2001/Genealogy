<template>
    <div class="w-100 h-100 position-relative starry-background" style="min-height: inherit;">
        <div class="position-absolute login-form-container" style="opacity: 93%;">
            <div class="d-flex flex-row w-100 h-100 position-relative">
                <div :class="{ rightPos: right, leftPos: !right, enlarged: enlarge }"
                    class="h-100 position-absolute login-background" style="z-index: 1;">
                    <div v-if="loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <div class="my-3"
                            style="font-size: 22px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Bạn
                            đã sử dụng App rồi?</div>
                        <div class="my-3"
                            style="font-size: 22px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Tiếp
                            tục cuộc hành trình</div>
                        <button @click="moveToRight(); enlargeBackground()" class="btn my-3 change-form-button">Đăng
                            nhập</button>
                    </div>
                    <div v-if="!loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <div class="my-3"
                            style="font-size: 22px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Bạn
                            là người dùng mới?</div>
                        <div class="my-3"
                            style="font-size: 22px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Bắt
                            đầu cuộc hành trình với chúng tôi</div>
                        <button @click="moveToLeft(); enlargeBackground()" class="btn my-3 change-form-button">Đăng
                            kí</button>
                    </div>
                </div>

                <div v-if="!right" class="login-form h-100 d-flex flex-column align-items-center" style="margin-top: 35px;">
                    <div class="d-flex justify-content-center mt-3 mb-2"
                        style="font-size: 36px; font-weight: bold; color: #84e9c0;">Đăng kí tài khoản</div>
                    <div class="d-flex flex-column" style="width: 420px;">
                        <div class="d-flex mb-2" style="position: relative;">
                            <input id="username" type="text" class="form-control py-2 px-5 position-relative"
                                placeholder="Tên tài khoản" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex mb-2" style="position: relative;">
                            <input id="password" type="password" class="form-control py-2 px-5 position-relative"
                                placeholder="Mật khẩu" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex mb-2" style="position: relative;">
                            <input id="password2" type="password" class="form-control py-2 px-5 position-relative"
                                placeholder="Nhập lại mật khẩu" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
                            <button class="btn register-button">Đăng kí</button>
                        </div>
                    </div>
                </div>

                <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center"
                    style="left: 0; margin-top: 35px;">
                    <div class="d-flex justify-content-center mt-3 mb-2"
                        style="font-size: 36px; font-weight: bold; color: #fea94e;">Đăng nhập</div>
                    <div class="d-flex flex-column" style="width: 420px;">
                        <div class="d-flex mb-2" style="position: relative;">
                            <input id="username" type="text" class="form-control py-2 px-5 position-relative"
                                placeholder="Tên tài khoản" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex mb-2" style="position: relative;">
                            <input id="password" type="password" class="form-control py-2 px-5 position-relative"
                                placeholder="Mật khẩu" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
                            <button class="btn login-button">Đăng nhập</button>
                        </div>
                    </div>
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
            right: false,
            enlarge: false,
            loggingin: true,

            accountLogin:{
                username: null,
                password: null,
            },
            accountRegister:{
                username: null,
                password: null,
                rePassword: null,
            },


        }
    },
    methods: {
        register(){
            if(this.accountRegister.password == this.accountRegister.rePassword){
                HTTP.post("register", {
                email: this.accountRegister.username,
                password: this.accountRegister.password,
            })
            .then(() => {
            })
            .catch((e) => {
            console.log(e);
            });
            }
        },
        login(){
             HTTP.post("login", {
                email: this.accountLogin.username,
                password: this.accountLogin.password,
            })
            .then(() => {
            })
            .catch((e) => {
            console.log(e);
            });
        },
        enlargeBackground() {
            this.enlarge = true;
            setTimeout(() => {
                this.enlarge = false;
            }, 300);
        },

        moveToRight() {
            this.loggingin = false;
            setTimeout(() => {
                this.right = true;
            }, 300);
        },

        moveToLeft() {
            this.loggingin = true;
            setTimeout(() => {
                this.right = false;
            }, 300);
        }
    },
}
</script>