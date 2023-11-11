<template>
    <div class="w-100 h-100 position-relative familycode-background" style="min-height: inherit;">
        <div class="position-absolute login-form-container">
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
                                    <input v-model="familyTree.treeName" type="text" class="form-control"
                                        placeholder="Nguyễn" />
                                </div>
                            </div>
                            <div class="d-flex flex-row mb-2">
                                <div class="d-flex align-items-center" style="padding-right: 48.15px;">Dân tộc</div>
                                <div class="h-100" style="flex-grow: 1;">
                                    <input v-model="familyTree.ethnicity" type="text" class="form-control"
                                        placeholder="Kinh" />
                                </div>
                            </div>
                            <div class="d-flex flex-row mb-3">
                                <div class="d-flex align-items-center" style="padding-right: 16px;">Ngày giỗ họ</div>
                                <div class="h-100" style="flex-grow: 1;">
                                    <input v-model="familyTree.deathAnniersary" type="date" class="form-control" />
                                </div>
                            </div>
                            <div class="d-flex justify-content-center align-items-center"
                                style="height: auto; width: auto;">
                                <button @click="registerFamilyTree(); showFamilyCode()" class="btn register-button">Đăng
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
                                        <input v-model="code1" type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"> - </div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input v-model="code2" type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"> - </div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input v-model="code3" type="text" class="form-control" placeholder="ABC" />
                                    </div>
                                </div>
                            </div>
                            <!-- <router-link to="/familycode/login"> -->
                            <div class="d-flex justify-content-center align-items-center"
                                style="height: auto; width: auto;">
                                <button @click="loginWithCode()" class="btn login-button">Đăng nhập</button>
                            </div>
                            <!-- </router-link> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="position-absolute familycode-noti" :class="{ appear: showCode }">
            <div class="w-100 h-100 position-relative">
                <button @click="copyCode">Copy</button>
                <div class="position-absolute familycode-noti-timer" :class="{ timerStart: showCode }"></div>
                <div v-if="showCode" class="w-100 h-100 d-flex align-items-center justify-content-content px-3"
                    style="font-size: 20px;">Đăng
                    kí thành công! Mã gia tộc của bạn là ABC DEF GHI</div>
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP } from "../assets/js/baseAPI.js";
import Vue from 'vue';
import VueCookies from 'vue-cookies';
Vue.use(VueCookies)

export default {
    data() {
        return {
            right: false,
            enlarge: false,
            loggingin: true,
            showCode: false,
            familycode: 'ABC DEF GHI',

            familyTree: {
                memberId: null,
                treeName: null,
                ethnicity: null,
                deathAnniersary: null,
                codeId: null,
            },
            code1: null,
            code2: null,
            code3: null,
            codeId: null,
            accountID: null,
        }
    },
    methods: {
        takeAccountId() {
            HTTP.get("protected-route", {
                headers: {
                    'Authorization': 'Bearer ' + VueCookies.get('accessToken'),
                },
            }).then((response) => {
                this.accountID = response.accountID
            })
                .catch((e) => {
                    console.log(e);
                });
        },
        registerFamilyTree() {
            HTTP.post("register-genealogy", {
                accountID: this.accountID,
                treeName: this.familyTree.treeName,
                ethnicity: this.familyTree.ethnicity,
            })
                .then((response) => {
                    this.codeId = response.data[0].codeId
                })
                .catch((e) => {
                    console.log(e);
                });
            HTTP.post("newGeneral", {
                TreeName: this.familyTree.treeName,
                DeathAnniversary: this.familyTree.deathAnniersary,
                Ethnicity: this.familyTree.ethnicity,
                CodeID: 222111222,
            })
                .then((response) => {
                    this.moveToRight()
                    this.enlargeBackground()
                    localStorage.setItem('MemberID', response.data[0].insertId);
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        loginWithCode() {
            this.codeId = this.code1 + this.code2 + this.code3;
            HTTP.get("generalInfor", {
                params: {
                    CodeID: this.codeId,
                }
            }).then((response) => {
                if (response.data[0] != null) {
                    this.$router.push('/');
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

        showFamilyCode() {
            this.showCode = true;
            setTimeout(() => {
                this.showCode = false;
            }, 15000);
        },

        copyCode() {
            this.$copyText(this.familycode).then(function (e) {
                alert('Copied')
                console.log(e)
            }, function (e) {
                alert('Can not copy')
                console.log(e)
            })
        }
    },
    mounted() {
        this.takeAccountId();
    },
    watch: {
        showCode() {
            console.log(this.showCode);
        }
    }
}
</script>