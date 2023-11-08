<template>
    <div class="w-100 h-100 position-relative familycode-background" style="min-height: inherit;">
        <div class="position-absolute login-form-container" style="opacity: 93%;">
            <div class="d-flex flex-row w-100 h-100 position-relative">
                <div :class="{ rightPos: right, leftPos: !right, enlarged: enlarge }"
                    class="h-100 position-absolute codelogin-background" style="z-index: 1;">
                    <div v-if="loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <div class="my-3"
                            style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Nhập
                            mã để vào gia tộc đã đăng kí</div>
                        <button @click="moveToRight(); enlargeBackground()" class="btn my-3 change-form-button"
                            :class="{ changeToLoginBtn: loggingin }">Đăng
                            nhập</button>
                    </div>
                    <div v-if="!loggingin" class="d-flex flex-column align-items-center justify-content-center h-100 w-100">
                        <div class="my-3"
                            style="font-size: 20px !important; font-weight: bold; color: #FFFFFF; text-align: center;">Đăng
                            kí gia tộc mới</div>
                        <button @click="moveToLeft(); enlargeBackground()" class="btn my-3 change-form-button"
                            :class="{ changeToRegisterBtn: !loggingin }">Đăng
                            kí</button>
                    </div>
                </div>

                <div v-if="!right" class="login-form h-100 d-flex flex-column align-items-center">
                    <div class="d-flex flex-column align-items-center" style="margin: auto;">
                        <div class="d-flex justify-content-center mt-3 mb-2"
                            style="font-size: 36px; font-weight: bold; color: #84e9c0;">Đăng kí gia tộc</div>
                        <div class="d-flex flex-column" style="width: 420px;">
                            <div class="d-flex flex-row mb-2">
                                <div class="d-flex align-items-center" style="padding-right: 30.79px;">Gia tộc họ</div>
                                <div class="h-100" style="flex-grow: 1;">
                                    <input type="text" class="form-control" placeholder="Nguyễn" />
                                </div>
                            </div>
                            <div class="d-flex flex-row mb-2">
                                <div class="d-flex align-items-center" style="padding-right: 48.15px;">Dân tộc</div>
                                <div class="h-100" style="flex-grow: 1;">
                                    <input type="text" class="form-control" placeholder="Kinh" />
                                </div>
                            </div>
                            <div class="d-flex flex-row mb-3">
                                <div class="d-flex align-items-center" style="padding-right: 16px;">Ngày giỗ họ</div>
                                <div class="h-100" style="flex-grow: 1;">
                                    <input type="date" class="form-control" />
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center"
                                style="height: auto; width: auto;">
                                <button @click="moveToRight(); enlargeBackground()" class="btn register-button">Đăng
                                    kí</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="right" class="login-form h-100 d-flex flex-column align-items-center" style="left: 0;">
                    <div class="d-flex flex-column align-items-center" style="margin: auto;">
                        <div class="d-flex justify-content-center mt-3 mb-2"
                            style="font-size: 36px; font-weight: bold; color: #fea94e;">Mã gia tộc</div>
                        <div class="d-flex flex-column" style="width: 420px;">
                            <div class="d-flex flex-row mb-3">
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"> - </div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"> - </div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                </div>
                            </div>
                            <router-link to="/familycode/login">
                                <div class="d-flex justify-content-center align-items-center"
                                    style="height: auto; width: auto;">
                                    <button @click="login(); showLoginOptions()" class="btn login-button">Đăng nhập</button>
                                </div>
                            </router-link>
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
        saveInfoSession() {
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
                if (this.firstMemberId != null) {
                    this.saveInfoSession();
                    console.log(3)
                    this.$router.push('/');
                }
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        getFirstMemberIdByCodeId(id) {
            HTTP.get("generalInfor", {
                params: {
                    CodeID: id,
                },
            }).then((response) => {
                if (response.data[0] != null) {
                    this.firstMemberId = response.data[0].MemberId;
                } else {
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
        showRegisterOptions() {
            this.$modal.show("register-options");
        }
    },
}
</script>