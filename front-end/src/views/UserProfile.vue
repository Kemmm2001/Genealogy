<!-- phùng việt khôi -->
<template>
  <div class="user-screen d-flex flex-row" style="height: calc(100vh - 64px);">
    <div class="func-container col-2 d-flex flex-column">
      <div class="menu px-3 d-flex flex-column">
        <div @click="selectProfile()" :class="{ chosen: profileSelected }" class="menu-item d-flex align-items-center mt-3 px-3 py-2" style="color: #FFFFFF;">Tài khoản cá nhân</div>
        <!-- Phân quyền chỉ dành cho role creator -->
        <div @click="selectEditRole()" :class="{ chosen: editRoleSelected }" class="menu-item d-flex align-items-center mt-2 px-3 py-2" style="color: #FFFFFF;">Phân quyền trong gia tộc</div>
        <div @click="selectChangePwd()" :class="{ chosen: changePwdSelected }" class="menu-item d-flex align-items-center mt-2 px-3 py-2" style="color: #FFFFFF;">Thay đổi mật khẩu</div>
      </div>
    </div>
    <div class="col-9 position-relative">
      <div class="col-6 h-100 d-flex flex-column position-absolute" style="left: 0; right: 0; margin: auto;">
        <div v-if="profileSelected" class="func-detail w-100 h-100 position-relative">
          <div class="func-detail-item">
            <div class="pb-2" style="font-weight: bold;">Tên tài khoản</div>
            <div v-if="accountInfor">
              <input v-model="accountInfor.Username" type="text" class="form-control" />
            </div>
          </div>
          <div v-if="accountInfor" class="func-detail-item mt-3">
            <div class="pb-2" style="font-weight: bold;">Tài khoản gmail</div>
            <div>
              <input v-model="accountInfor.Username" type="text" class="form-control" disabled />
            </div>
          </div>
          <div class="mt-3 func-detail-item" v-if="inforTree">
            <div class="pb-2" style="font-weight: bold;">Gia tộc họ</div>
            <div>
              <input type="text" class="form-control" :value="inforTree.TreeName" disabled />
            </div>
          </div>
          <div class="mt-3 func-detail-item" v-if="inforTree">
            <div class="pb-2" style="font-weight: bold;">Mã gia tộc</div>
            <div>
              <input type="text" class="form-control" :value="inforTree.CodeID" disabled />
            </div>
          </div>
          <div class="func-detail-item mt-3" v-if="accountInfor">
            <div class="pb-2" style="font-weight: bold;">Quyền hạn tài khoản</div>
            <div>
              <input type="text" class="form-control" :value="accountInfor.RoleName" disabled />
            </div>
          </div>
          <div class="w-100 d-flex mt-3" style="justify-content: end;">
            <div @click="changeUserName()" class="btn bg-primary text-white">Lưu thay đổi</div>
          </div>
        </div>
        <div v-if="editRoleSelected" class="func-detail w-100 h-100 position-relative">
          <div class>
            <div class="pb-2 acc-list-container" style="font-weight: bold; height: 32px;">Tài khoản thành viên thuộc gia tộc</div>
            <div class="family-account">
              <div v-for="(m, index) in listMemberRole" :key="index" :class="{
                'family-account-item odd py-2 position-relative': index % 2 !== 0,
                'family-account-item even py-2 position-relative': index % 2 == 0
              }">
                <div class="username position-absolute">{{ m.Email }}</div>
                <div class="role h-100 position-absolute py-1">
                  <select :disabled="m.RoleID != 1 ? false : true" v-model="m.RoleID" class="form-select h-100 px-3 py-0" @change="changeRole(m.RoleID, m.AccountID)">
                    <option v-if="m.RoleID == 1" style="text-align: center;" value="1">Admin</option>
                    <option v-if="m.RoleID != 1" style="text-align: center;" value="3">Thành viên</option>
                    <option v-if="m.RoleID != 1" style="text-align: center;" value="2">Được tin cậy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex mt-3" style="justify-content: end;">
            <div class="btn bg-primary text-white">Lưu thay đổi</div>
          </div>
        </div>
        <div v-if="changePwdSelected" class="func-detail w-100 h-100 position-relative">
          <div class="func-detail-item">
            <div class="pb-2" style="font-weight: bold;">Mật khẩu hiện tại</div>
            <div class="d-flex flex-row position-relative">
              <input v-model="InputCurentPassword" v-bind:type="oldPwdVisibilityType" class="form-control" />
              <div @click="toggleOldPwdVisibility()" class="position-absolute visibility-icon d-flex align-items-center">
                <svg v-if="!oldPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
                <svg v-if="oldPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="func-detail-item mt-3">
            <div class="pb-2" style="font-weight: bold;">Mật khẩu mới</div>
            <div class="d-flex flex-row position-relative">
              <input v-model="InputNewPassword" v-bind:type="newPwdVisibilityType" class="form-control" />
              <div @click="toggleNewPwdVisibility()" class="position-absolute visibility-icon d-flex align-items-center">
                <svg v-if="!newPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
                <svg v-if="newPwdVisibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="func-detail-item mt-3">
            <div class="pb-2" style="font-weight: bold;">Nhập lại mật khẩu mới</div>
            <div class="d-flex flex-row position-relative">
              <input v-model="InputRe_newpassword" v-bind:type="newPwd2VisibilityType" class="form-control" />
              <div @click="toggleNewPwd2Visibility()" class="position-absolute visibility-icon d-flex align-items-center">
                <svg v-if="!newPwd2Visibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                  <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z" />
                </svg>
                <svg v-if="newPwd2Visibility" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-100 d-flex mt-3" style="justify-content: end;">
            <div @click="changePassword()" class="btn bg-primary text-white">Lưu thay đổi</div>
          </div>
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
      accountID: null,
      listMemberRole: null,
      InputCurentPassword: null,
      InputNewPassword: null,
      InputRe_newpassword: null,
      accountInfor: null,
      CodeID: null,
      inforTree: null,

      getCurrentPassword: null,

      profileSelected: true,
      editRoleSelected: false,
      changePwdSelected: false,

      oldPwdVisibility: false,
      newPwdVisibility: false,
      newPwd2Visibility: false,
      oldPwdVisibilityType: "password",
      newPwdVisibilityType: "password",
      newPwd2VisibilityType: "password",
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
    changeUserName() {
      HTTP.post("changeUsername", {
        username: this.accountInfor.username,
        AccountID: this.accountID,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.NotificationsScuccess(respone.data.message);
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changeRole(RoleId, AccountID) {
      console.log(RoleId, AccountID);
      HTTP.post("set-role", {
        RoleId: RoleId,
        accountID: AccountID,
        CodeID: this.CodeID,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.NotificationsScuccess(respone.data.message);
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    changePassword() {
      if (this.InputNewPassword == this.InputRe_newpassword) {
        HTTP.put("changepassword", {
          accountID: this.accountID,
          currentpassword: this.InputCurentPassword,
          newPassword: this.InputNewPassword,
        }).then((respone) => {
          if (respone.data.success == true) {
            console.log(respone.data);
            this.InputCurentPassword = null;
            this.InputNewPassword = null;
            this.InputRe_newpassword = null;
          } else {
            this.NotificationsDelete(respone.data.message);
          }
        });
      } else {
        this.NotificationsDelete("Nhập lại mật khẩu không đúng");
      }
    },
    getInforTree() {
      HTTP.get("inforTree", {
        params: {
          CodeID: this.CodeID,
        },
      }).then((respone) => {
        if (respone.data.success == true) {
          this.inforTree = respone.data.data;
          this.inforTree = this.inforTree[0];
          console.log(this.inforTree);
        }
      });
    },
    getInforAccount() {
      HTTP.post("get-user", {
        accountID: this.accountID,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.accountInfor = respone.data.data;           
          } else {
            this.NotificationsScuccess(respone.data.message);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListRoleMember() {
      console.log(this.CodeID);
      HTTP.get("listrole", {
        params: {
          CodeID: this.CodeID,
        },
      }).then((respone) => {
        if (respone.data.success == true) {
          this.listMemberRole = respone.data.data;
          console.log(this.listMemberRole);
        }
      });
    },
    selectProfile() {
      this.profileSelected = true;
      this.editRoleSelected = false;
      this.changePwdSelected = false;
    },
    selectEditRole() {
      this.profileSelected = false;
      this.editRoleSelected = true;
      this.changePwdSelected = false;
    },
    selectChangePwd() {
      this.profileSelected = false;
      this.editRoleSelected = false;
      this.changePwdSelected = true;
    },
    toggleOldPwdVisibility() {
      this.oldPwdVisibility = !this.oldPwdVisibility;
      this.oldPwdVisibilityType =
        this.oldPwdVisibilityType === "text" ? "password" : "text";
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
  },
  mounted() {
    if (
      localStorage.getItem("CodeID") != null &&
      localStorage.getItem("accountID") != null
    ) {
      this.accountID = localStorage.getItem("accountID");
      this.CodeID = localStorage.getItem("CodeID");
    } else {
      if (localStorage.getItem("accountID") != null) {
        this.$router.push("/familycode");
      } else {
        this.$router.push("/login");
      }
    }
    this.getListRoleMember();
    this.getInforAccount();
    this.getInforTree();
  },
};
</script>