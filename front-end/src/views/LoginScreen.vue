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
                            <input v-model="accountRegister.username" id="username" type="text" class="form-control py-2 px-5 position-relative"
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
                            <input  v-model="accountRegister.password" id="password" type="password" class="form-control py-2 px-5 position-relative"
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
                            <input v-model="accountRegister.rePassword" id="password2" type="password" class="form-control py-2 px-5 position-relative"
                                placeholder="Nhập lại mật khẩu" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path style="fill: gray;"
                                        d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex mb-2" style="position: relative;">
                            <input v-model="accountRegister.email" id="email" type="text" class="form-control py-2 px-5 position-relative"
                                placeholder="Email" />
                            <div class="position-absolute d-flex align-items-center justify-content-center h-100"
                                style="left: 0; width: 3rem;">
                                <svg class="login-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path style="fill: gray;"
                                        d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center align-items-center" style="height: auto; width: auto;">
                            <button @click="showRegisterOptions()" class="btn register-button">Đăng kí</button>
                        </div>
                    </div>
                </div>

                <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center"
                    style="left: 0; margin-top: 35px;">
                    <div class="d-flex justify-content-center mt-3 mb-2"
                        style="font-size: 36px; font-weight: bold; color: #fea94e;">Đăng nhập</div>
                    <div class="d-flex flex-column" style="width: 420px;">
                        <div class="d-flex mb-2" style="position: relative;">
                            <input v-model="accountLogin.email"  id="username" type="text" class="form-control py-2 px-5 position-relative"
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
                            <input v-model="accountLogin.password" id="password" type="password" class="form-control py-2 px-5 position-relative"
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
                            <button @click="login(); showLoginOptions()" class="btn login-button">Đăng nhập</button>
                        </div>
                    </div>
                </div>
                <div class="login-options-container">
                    <modal name="register-options">
                        <div class="login-options-modal-container position-relative" style="height: 100vh">
                            <div
                                class="login-options-modal position-absolute h-100 d-flex flex-column align-items-center justify-content-center">
                                <div class="login-options-content d-flex flex-row align-items-center justify-content-center py-3"
                                    style="margin-bottom: 8px;">
                                    <div class="d-flex align-items-center justify-content-center col-4">Nhập
                                        code gia tộc</div>
                                    <div class="position-relative" style="flex-grow: 1; height: 64px;">
                                        <input class="position-absolute code-input p-2" type="text" />
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center"
                                        style="height: auto; width: auto;">
                                        <button class="btn submit-code-button">Đăng nhập</button>
                                    </div>
                                </div>
                                <router-link to="/familycode" class="w-100">
                                    <div class="login-options-content code-register d-flex align-items-center justify-content-center p-3"
                                        style="margin-bottom: 8px;">
                                        Chưa có code gia tộc? Tạo mới ngay</div>
                                </router-link>
                            </div>
                        </div>
                    </modal>
                    <div class="login-options-container">
                    <modal name="login-options">
                        <div class="login-options-modal-container position-relative" style="height: 100vh">
                            <div
                                class="login-options-modal position-absolute h-100 d-flex flex-column align-items-center justify-content-center">
                                <div class="login-options-content d-flex flex-row align-items-center justify-content-center py-3"
                                    style="margin-bottom: 8px;">
                                    <div class="d-flex align-items-center justify-content-center col-4">Nhập
                                        code gia tộc</div>
                                    <div class="position-relative" style="flex-grow: 1; height: 64px;">
                                        <input class="position-absolute code-input p-2" type="text" />
                                    </div>
                                    <div class="col-2 d-flex justify-content-center align-items-center"
                                        style="height: auto; width: auto;">
                                        <button class="btn submit-code-button">Đăng nhập</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </modal>
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

            accountLogin: {
                email: null,
                password: null,
                codeId: null,
            },
            accountRegister: {
                username: null,
                password: null,
                rePassword: null,
                email: null,
            },

            firstMemberId: null,

        }
    },
    methods: {
        register() {
            if (this.accountRegister.password == this.accountRegister.rePassword) {
                HTTP.post("register", {
                    email: this.accountRegister.email,
                    username: this.accountRegister.username,
                    password: this.accountRegister.password,
                })
                    .then(() => {
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            }
        },
        saveInfoSession(){
            localStorage.setItem('CodeID', this.accountLogin.codeId);  
            console.log(localStorage.getItem('CodeID'))
        },
        login() {
            localStorage.removeItem('CodeID');
            this.getFirstMemberIdByCodeId(this.accountLogin.codeId);
            HTTP.post("login", {
                email: this.accountLogin.email,
                password: this.accountLogin.password,
            }).then(() => {
                if(this.firstMemberId != null){
                    this.saveInfoSession();
                    console.log(3)
                    this.$router.push('/');
                }
            })
            .catch((e) => {
                console.log(e);
            });
        },
        getFirstMemberIdByCodeId(id){
            HTTP.get("generalInfor", {
                params: {
                    CodeID: id,
                },
            }).then((response) => {
                if(response.data[0] != null){
                    this.firstMemberId = response.data[0].MemberId;
                }else{
                    this.firstMemberId = null;
                }
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
        },

        showLoginOptions() {
            this.$modal.show("login-options");
        },
        showRegisterOptions(){
            this.$modal.show("register-options");
        }
    },
}
</script>