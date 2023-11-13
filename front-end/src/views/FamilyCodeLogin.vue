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
                                <button @click="registerFamilyTree()" class="btn register-button">Đăng
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
                                        <input v-model="code1" type="text" class="form-control" placeholder="***" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"></div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input v-model="code2" type="text" class="form-control" placeholder="***" />
                                    </div>
                                    <div class="d-flex align-items-center p-1"></div>
                                </div>
                                <div class="col-4 h-100 d-flex flex-row">
                                    <div>
                                        <input v-model="code3" type="text" class="form-control" placeholder="***" />
                                    </div>
                                </div>
                            </div>
                            <!-- <router-link to="/familycode/login"> -->
                            <div class="d-flex justify-content-center align-items-center"
                                style="height: auto; width: auto;">
                                <button @click="showLoginHistoryModal()" class="btn login-button"
                                    style="margin-right: 36px;">Lịch sử đăng nhập</button>
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
                <div class="position-absolute familycode-noti-timer" :class="{ timerStart: showCode }"></div>
                <div v-if="showCode" class="w-100 h-100 d-flex align-items-center justify-content-content px-3"
                    style="font-size: 20px;">Đăng
                    kí thành công! Mã gia tộc của bạn là {{ this.familycode }}</div>
            </div>
        </div>
        <modal name="loginhistory-modal">
            <div class="w-100 h-100 add-album-modal">
                <div class="d-flex flex-row w-100 align-items-center position-relative">
                    <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Lịch sử đăng
                        nhập code gia tộc
                    </div>
                    <div class="close-add-form" @click="closeLoginHistoryModal()">
                        <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
                <div class="d-flex flex-column" style="height: calc(100% - 100px); overflow-y: auto;">
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                    <div class="odd d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">AAA AAA AAA</div>
                    </div>
                    <div class="even d-flex flex-row align-items-center">
                        <div class="col-6 d-flex justify-content-center" style="height: 40px;">12/12/2002</div>
                        <div class="col-6 d-flex justify-content-center">BBB BBB BBB</div>
                    </div>
                </div>
                <div class="modal-footer w-100 position-absolute" style="bottom: 0;">
                    <div class="d-flex h-100 align-items-center justify-content-end" style="padding-right: 12px;">
                        <button type="button" class="btn btn-primary mr-2" @click="addMemberFromList()">Thêm</button>
                        <button style="margin-left:10px" type="button" class="btn btn-secondary">Cancel</button>
                    </div>
                </div>
            </div>
        </modal>
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
            familycode: null,

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
            codeIdLogin: null,
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
                this.accountID = response.data.accountID
                console.log(this.accountID)
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
                deathAnniversary: this.familyTree.deathAnniersary
            })
                .then((response) => {
                    this.familycode = response.data.codeID
                    this.showFamilyCode();
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        loginWithCode() {
            this.codeIdLogin = this.code1 + "-" + this.code2 + "-" + this.code3;
            HTTP.post("check-codeId", {
                codeID: this.codeIdLogin,
            }).then((response) => {
                if (response.data.doesExist == true) {
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
        showLoginHistoryModal() {
            this.$modal.show("loginhistory-modal");
        },
        closeLoginHistoryModal() {
            this.$modal.hide("loginhistory-modal");
        }
    },
    mounted() {
        this.takeAccountId();
    },
}
</script>