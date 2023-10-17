<template>
    <div class="d-flex main-screen align-items-center justify-content-center p-0">
        <div class="d-flex main-screen align-items-center justify-content-center p-0">
            <button type="button" class="btn p-0 btn-modal" @click="openModal">Mở Modal</button>
            <modal name="my-modal">
                <div class="modal-title d-flex align-items-center justify-content-center">Thêm con</div>
                <div class="d-flex flex-row">
                    <div class="col-md-6 d-flex flex-row">
                        <div class="col-md-4 d-flex flex-column justify-content-center">
                            <div class="profile-pic"></div>
                            <button class="btn p-0 colored m-1">Xoá ảnh</button>
                            <!-- <div class="d-flex align-items-center justify-content-center">                   -->
                            <button class="btn p-0 colored m-1">Đã mất</button>
                            <!-- </div>  -->
                        </div>
                        <div class="d-flex flex-column col-md-8 align-items-center mx-1">
                            <div class="d-flex flex-row align-items-center justify-content-around">
                                <div class="col-md-12">
                                    <input type="text" class="form-control modal-item mt-1"
                                        placeholder="Tên thành viên đầy đủ">
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-around">
                                <div class="col-md-7">
                                    <input type="text" class="form-control flex-grow modal-item mt-1"
                                        placeholder="Tên thường gọi">
                                </div>
                                <div class="col-md-5">
                                    <select class="form-select modal-item mt-1">
                                        <option selected value="1">Con ruột</option>
                                        <option value="2">Con riêng</option>
                                        <option value="3">Con nuôi</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-around">
                                <div class="col-md-6">
                                    <select class="form-select modal-item mt-1">
                                        <option selected value="1">Giới tính</option>
                                        <option value="2">Nam</option>
                                        <option value="3">Nữ</option>
                                    </select>
                                </div>
                                <div class="col-md-6 position-relative">
                                    <label for="birthorder" class="add-form-birthorder-label position-absolute">Con
                                        thứ</label>
                                    <input id="birthorder" type="number"
                                        class="form-control flex-grow add-form-birthorder-input modal-item mt-1 pl-5"
                                        value="1" min="1">
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-center">
                                <div class="col-md-7 d-flex align-items-center justify-content-center">
                                    <div class="add-form-bloodtype-label modal-item">Nhóm máu</div>
                                </div>
                                <div class="col-md-5">
                                    <select id="bloodtype" class="add-form-bloodtype-select form-select modal-item mt-1">
                                        <option selected value="1">A</option>
                                        <option value="2">B</option>
                                        <option value="3">AB</option>
                                        <option value="4">O</option>
                                    </select>
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-center">
                                <div class="col-md-12">
                                    <input type="text" class="form-control flex-grow modal-item mt-1"
                                        placeholder="Nguyên quán">
                                </div>
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-center">
                                <div class="col-md-12">
                                    <input type="date" class="form-control flex-grow modal-item mt-1">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button @click="closeModal">Đóng</button>
            </modal>
        </div>

        <div class="config-sidebar">
            <!--Chọn chủ đề-->
            <div class="topic config-item">
                <select class="form-select">
                    <option selected value="1">Chủ đề 1</option>
                    <option value="2">Chủ đề 2</option>
                    <option value="3">Chủ đề 3</option>
                </select>
            </div>
            <!--Config menu-->
            <div class="d-flex row align-items-center justify-content-around config-menu">
                <div @click="configmenu = true" class="config-menu-item text-center col-md-6"
                    :class="{ notchosenconfigmenu: !configmenu }">
                    <a>Phả đồ</a>
                </div>
                <div @click="configmenu = false" class="config-menu-item text-center col-md-6"
                    :class="{ notchosenconfigmenu: configmenu }">
                    <a>Hỗ trợ in ấn</a>
                </div>
                <div v-if="configmenu" class="config-menu-board d-flex flex-column">
                    <div class="config-menu-item">
                        <button @click="expandconfigitem1 = !expandconfigitem1" type="button" class="btn p-0"
                            :class="{ rotated1: expandconfigitem1 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Thành viên</a>
                    </div>
                    <div v-show="expandconfigitem1" class="config-menu-item-expanded">
                        <a>Thành viên hiển thị</a>
                        <select class="form-select">
                            <option selected>Tất cả</option>
                        </select>
                        <a>Số đời hiển thị</a>
                        <select class="form-select">
                            <option selected>Tất cả</option>
                            <option>20</option>
                        </select>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem2 = !expandconfigitem2" type="button" class="btn p-0"
                            :class="{ rotated2: expandconfigitem2 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Bảng vẽ</a>
                    </div>
                    <div v-show="expandconfigitem2" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Màu nền bảng vẽ</a>
                            <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                        </div>
                        <div class="config-menu-item-content">
                            <a>Khoảng cách 2 thẻ</a>
                        </div>
                        <div class="d-flex flex-column align-items-center">
                            <div class="d-flex flex-row">
                                <div class="col-md-6 config-menu-item-content">Ngang</div>
                                <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                    type="number" value="0" min="0">
                            </div>
                            <div class="d-flex flex-row">
                                <div class="col-md-6 config-menu-item-content">Dọc</div>
                                <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                    type="number" value="0" min="0">
                            </div>
                        </div>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem3 = !expandconfigitem3" type="button" class="btn p-0"
                            :class="{ rotated3: expandconfigitem3 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Khung thẻ</a>
                    </div>
                    <div v-show="expandconfigitem3" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Khung viền</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Màu viền</a>
                            <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                        </div>
                        <div class="d-flex flex-row">
                            <div class="col-md-6 config-menu-item-content">Độ đậm</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Khung ảnh</a>
                        </div>
                        <div class="d-flex flex-row">
                            <div class="col-md-6 config-menu-item-content">Khung thẻ</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem4 = !expandconfigitem4" type="button" class="btn p-0"
                            :class="{ rotated4: expandconfigitem4 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Thông tin thẻ</a>
                    </div>
                    <div v-show="expandconfigitem4" class="config-menu-item-expanded">
                        <div class="d-flex flex-row align-items-center">
                            <div class="col-md-6 config-menu-item-content">Tỉ lệ cơ bản (%)</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                        <div class="d-flex flex-row">
                            <div class="col-md-6 config-menu-item-content align-items-center">Tỉ lệ tổ phụ so với cơ bản (%)
                            </div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                        <div class="d-flex flex-row">
                            <div class="col-md-6 config-menu-item-content align-items-center">Độ đậm đường kẻ</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Màu chữ</a>
                            <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Màu nền</a>
                            <div class="d-flex position-relative">
                                <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF"
                                    id="color-for-male">
                                <label class="label-color-input" for="color-for-male">Nam</label>
                            </div>
                            <div class="d-flex position-relative">
                                <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF"
                                    id="color-for-male">
                                <label class="label-color-input" for="color-for-male">Nữ</label>
                            </div>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <div class="d-flex position-relative">
                                <input class="form-control-color config-menu-color-genderunknown-input p-0" type="color"
                                    value="#FFFFFF" id="color-for-male">
                                <label class="label-color-input" for="color-for-male">Không rõ GT</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="!configmenu" class="config-menu-board d-flex flex-column">
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem1 = !expandconfigitem1" type="button" class="btn p-0"
                            :class="{ rotated1: expandconfigitem1 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Khung viền</a>
                    </div>
                    <div v-show="expandconfigitem1" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Vẽ khung</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Đường viền</a>
                            <select class="form-select">
                                <option selected value="1">Mặc định 1</option>
                                <option value="2">Mặc định 2</option>
                                <option value="3">Mặc định 3</option>
                            </select>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div class="col-md-6 config-menu-item-content">Tỉ lệ khung ảnh (%)</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem2 = !expandconfigitem2" type="button" class="btn p-0"
                            :class="{ rotated2: expandconfigitem2 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Tiêu đề</a>
                    </div>
                    <div v-show="expandconfigitem2" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Vẽ ảnh tiêu đề</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <select class="form-select">
                                <option selected value="1">Hoàng phi 1</option>
                                <option value="2">Hoàng phi 2</option>
                                <option value="3">Hoàng phi 3</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <button type="button" class="btn btn-light m-6">Thêm</button>
                            <button type="button" class="btn btn-light m-6">Sửa</button>
                            <button type="button" class="btn btn-light m-6">Xóa</button>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div class="col-md-6 config-menu-item-content">Tỉ lệ ảnh tiêu đề</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem3 = !expandconfigitem3" type="button" class="btn p-0"
                            :class="{ rotated3: expandconfigitem3 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Nền</a>
                    </div>
                    <div v-show="expandconfigitem3" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Vẽ màu nền</a>
                            <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Vẽ ảnh nền</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <select class="form-select">
                                <option selected value="1">Nền cam</option>
                                <option value="2">Nền đỏ</option>
                                <option value="3">Nền vàng</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <button type="button" class="btn btn-light">Chọn ảnh</button>
                            <button type="button" class="btn btn-light">Xóa ảnh</button>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <select class="form-select">
                                <option selected value="1">Giãn ảnh</option>
                                <option value="2">Lặp lại</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Vẽ họa tiết</a>
                            <button type="button" class="btn btn-light"></button>
                            <button type="button" class="btn btn-light"></button>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <select class="form-select">
                                <option selected value="1">Song đồng</option>
                                <option value="2">Trống đồng</option>
                            </select>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <select class="form-select">
                                <option selected value="1">Tự động</option>
                                <option value="2">Giãn ảnh</option>
                                <option value="3">Lặp lại</option>
                            </select>
                        </div>
                    </div>
                    <div class="d-flex config-menu-item align-items-center">
                        <button @click="expandconfigitem4 = !expandconfigitem4" type="button" class="btn p-0"
                            :class="{ rotated4: expandconfigitem4 }">
                            <svg class="fa fa-fw config-menu-icons" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512">
                                <path
                                    d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
                            </svg>
                        </button>
                        <a>Thông tin ngày tạo</a>
                    </div>
                    <div v-show="expandconfigitem4" class="config-menu-item-expanded">
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Hiện ngày tạo</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <input class="form-check-input config-menu-checkbox-input" type="checkbox">
                            <a>Hiện người tạo</a>
                        </div>
                        <div class="d-flex align-items-center config-menu-item-content">
                            <a>Màu chữ</a>
                            <input class="form-control-color config-menu-color-input p-0" type="color" value="#FFFFFF">
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <div class="col-md-6 config-menu-item-content">Cỡ chữ</div>
                            <input class="col-md-6 form-control config-menu-number-input config-menu-item-content"
                                type="number" value="0" min="0">
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <a>Vị trí người tạo</a>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <select class="form-select">
                                <option selected>Trên - Trái</option>
                                <option>Trên - Phải</option>
                                <option>Dưới - Trái</option>
                                <option>Dưới - Phải</option>
                            </select>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <a>Tên người tạo</a>
                        </div>
                        <div class="d-flex flex-row align-items-center">
                            <input class="form-control config-menu-item-content" type="text" readonly>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FamilyTree from "@balkangraph/familytree.js";
export default {
    data() {
        return {
            expandconfigitem1: false,
            rotated1: false,
            expandconfigitem2: false,
            rotated2: false,
            expandconfigitem3: false,
            rotated3: false,
            expandconfigitem4: false,
            rotated4: false,

            configmenu: true,

            nodes: [
                {
                    id: 1,
                    pids: [2],
                    name: "Amber McKenzie",
                    gender: "female",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    dob: new Date(2023, 0, 13),
                    dod: new Date(2023, 0, 13),
                    generation: 1,
                    tags: ["died", "choose"],
                },
                {
                    id: 2,
                    pids: [1],
                    name: "Ava Field",
                    gender: "male",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    dob: new Date(2023, 0, 13),
                    dod: new Date(2023, 0, 13),
                    generation: 1,
                    tags: ["died"]
                },
                {
                    id: 3,
                    mid: 1,
                    fid: 2,
                    name: "Peter Stevens",
                    gender: "male",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    generation: 2,
                },
                {
                    id: 4,
                    mid: 1,
                    fid: 2,
                    name: "Peter Stevens",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    gender: "female",
                    generation: 2,
                },
                {
                    id: 5,
                    mid: 1,
                    fid: 2,
                    name: "Peter Stevens",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    gender: "male",
                    generation: 2,
                },
                {
                    id: 6,
                    mid: 1,
                    fid: 2,
                    name: "Peter Stevens",
                    img: "https://cdn.balkan.app/shared/2.jpg",
                    gender: "female",
                    generation: 2,
                },
            ],
        }
    },
    methods: {
        mytree: function (domEl, x) {
            FamilyTree.templates.tommy_male.field_0 =
                '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_1 =
                '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_male.field_3 =
                '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_0 =
                '<text class="field_0" style="font-size: 20px;" fill="#ffffff" x="125" y="30" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_1 =
                '<text class="field_1" style="font-size: 14px;" fill="#ffffff" x="125" y="50" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_2 =
                '<text class="field_2" style="font-size: 14px;" fill="#ffffff" x="125" y="70" text-anchor="middle">{val}</text>';
            FamilyTree.templates.tommy_female.field_3 =
                '<text class="field_3" style="font-size: 14px;" fill="#ffffff" x="125" y="90" text-anchor="middle">{val}</text>';
            this.family = new FamilyTree(domEl, {
                nodes: x,
                nodeBinding: {
                    field_0: "name",
                    img_0: "img",
                    field_1: "gender",
                    field_2: "dob",
                    field_3: "dod",
                    field_4: "generation",
                },
            });
        },
        openModal() {
            this.$modal.show('my-modal')
        },
        closeModal() {
            this.$modal.hide('my-modal')
        }
    },
    // mounted() {
    //   this.mytree(this.$refs.tree, this.nodes);
    // },
}

</script>
 
<style>



#tree {
    width: 100%;
    height: 100%;
}

svg.tommy .node.died.male rect {
    fill: gray;
}

svg.tommy .node.died.female rect {
    fill: gray;
}

svg.tommy .node.choose.male rect {
    fill: #EDF048;
}

svg.tommy .node.choose.female rect {
    fill: #EDF048;
}

svg.tommy .node.male>rect {
    fill: #C69934;
}

svg.tommy .node.female>rect {
    fill: pink;
}
</style>
