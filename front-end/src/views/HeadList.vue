<template>
    <div class="d-flex w-100">
        <div class="d-flex flex-column h-100 w-100">
            <div class="d-flex flex-row">
                <div class="col-md-6 d-flex align-items-center" style="justify-content: left;">
                    <div class="w-100 my-2 mx-2">
                        <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên...">
                    </div>
                    <div class="d-flex w-100 my-2">
                        <div class="px-2">Phân trang</div>
                        <div class="d-flex align-items-center">
                            <select class="form-select px-2 py-0">
                                <option selected value="1">10</option>
                                <option value="2">20</option>
                                <option value="3">30</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 d-flex align-items-center" style="justify-content: right;">
                    <button @click="openAddHeadModal()"
                        class="btn headlist-item headlist-item-button text-center my-4 mx-2">Thêm
                        tộc trưởng</button>
                </div>
            </div>
            <div class="">
                <table class="table headlist-list m-0">
                    <thead>
                        <tr class="headlist-item">
                            <th class="headlist-list-th" scope="col">#</th>
                            <th class="headlist-list-th" scope="col">Họ và Tên</th>
                            <th class="headlist-list-th" scope="col">Giới tính</th>
                            <th class="headlist-list-th" scope="col">Ngày sinh</th>
                            <th class="headlist-list-th" scope="col">Đời</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="headlist-item headlist-table-item">
                            <th @click="openEditHeadModal()" scope="row">1</th>
                            <td @click="openEditHeadModal()" class="headlist-table-td">Mark</td>
                            <td @click="openEditHeadModal()" class="headlist-table-td">Otto</td>
                            <td @click="openEditHeadModal()" class="headlist-table-td">@mdo</td>
                            <td @click="openEditHeadModal()" class="headlist-table-td"></td>
                        </tr>
                        <tr class="headlist-item headlist-table-item">
                            <th @click="openEditHeadModal()" scope="row">2</th>
                            <td @click="openEditHeadModal()">Jacob</td>
                            <td @click="openEditHeadModal()">Thornton</td>
                            <td @click="openEditHeadModal()">@fat</td>
                            <td @click="openEditHeadModal()"></td>
                        </tr>
                        <tr class="headlist-item headlist-table-item">
                            <th @click="openEditHeadModal()" scope="row">3</th>
                            <td @click="openEditHeadModal()">Larry the Bird</td>
                            <td @click="openEditHeadModal()">Larry the Bird</td>
                            <td @click="openEditHeadModal()">@twitter</td>
                            <td @click="openEditHeadModal()"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="d-flex flex-row justify-content-center m-4">
                <button class="btn px-2 py-0">
                    <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                    </svg>
                </button>
                <button class="btn px-2 p-0">
                    <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                </button>
                <div class="d-flex align-items-center justify-content-center">Trang 1</div>
                <button class="btn px-2 p-0">
                    <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                        <path
                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                    </svg>
                </button>
                <button class="btn px-2 p-0">
                    <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                    </svg>
                </button>
            </div>
            <button @click="openNotiModal()" class="btn p-0">Modal thông báo</button>
        </div>

        <modal name="addHead-modal">
            <div class="w-100 h-100 add-head-modal">
                <div class="d-flex flex-row w-100 align-items-center position-relative">
                    <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm tộc
                        trưởng
                    </div>
                    <div class="close-add-form" @click="closeAddHeadModal()">
                        <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                        <div class="col-md-4 m-2">
                            <input type="text" class="form-control modal-item m-0" placeholder="Nhập tên thành viên...">
                        </div>
                    </div>
                    <div class="d-flex flex-column headlist-list-container w-100">
                        <table class="table headlist-list m-0">
                            <thead>
                                <tr class="headlist-item">
                                    <th class="headlist-list-th" scope="col">#</th>
                                    <th class="headlist-list-th" scope="col">Họ và Tên</th>
                                    <th class="headlist-list-th" scope="col">Giới tính</th>
                                    <th class="headlist-list-th" scope="col">Ngày sinh</th>
                                    <th class="headlist-list-th" scope="col">Đời</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="headlist-item headlist-table-item">
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td></td>
                                </tr>
                                <tr class="headlist-item headlist-table-item">
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    <td></td>
                                </tr>
                                <tr class="headlist-item headlist-table-item">
                                    <th scope="row">3</th>
                                    <td>Larry the Bird</td>
                                    <td>Larry the Bird</td>
                                    <td>@twitter</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="headlist-list-footer">
                            <div class="d-flex flex-row align-items-center">
                                <div class="d-flex flex-row align-items-center headlist-item">
                                    <div class="d-flex align-items-center px-2">Phân trang</div>
                                    <div class="d-flex align-items-center">
                                        <select class="form-select px-2 py-0">
                                            <option selected value="1">10</option>
                                            <option value="2">20</option>
                                            <option value="3">30</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="d-flex flex-row justify-content-center" style="flex-grow: 1;">
                                    <button class="btn px-2 py-0">
                                        <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                            <path
                                                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                        </svg>
                                    </button>
                                    <button class="btn px-2 p-0">
                                        <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512">
                                            <path
                                                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                        </svg>
                                    </button>
                                    <div class="d-flex align-items-center justify-content-center">Trang 1</div>
                                    <button class="btn px-2 p-0">
                                        <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 320 512">
                                            <path
                                                d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                        </svg>
                                    </button>
                                    <button class="btn px-2 p-0">
                                        <svg class="headlist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 512 512">
                                            <path
                                                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                        </svg>
                                    </button>
                                </div>

                                <div class="d-flex justify-content-right m-1">
                                    <button class="btn headlist-item headlist-item-button text-center">Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="editHead-modal">
            <div class="card">
                <div class="card-header text-center" style="background-color:#E8C77B">
                    <h5>Thay đổi thông tin</h5>
                    <div class="close-add-form" @click="closeEditHeadModal" style="top: 8px;right:5px">
                        <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                            <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                    </div>
                </div>
                <div class="card-body" style="padding: 0; height: 630px">
                    <div class="row" style="padding: 0;height: 100%;">
                        <div class="col-3 select-menu">
                            <div class="custom-info" :class="{ selected: extendedInfo }" @click="selectedInfor()">
                                <h5>Thông tin</h5>
                            </div>
                            <div class="custom-info" :class="{ selected: extendedContact }" @click="selectedContact()">
                                <h5>Liên Hệ</h5>
                            </div>
                            <div class="custom-info" :class="{ selected: extendedJob }" @click="selectedJob()">
                                <h5>Nghề nghiệp</h5>
                            </div>
                            <div class="custom-info" :class="{ selected: extendedEdu }" @click="selectedEdu()">
                                <h5>Giáo dục</h5>
                            </div>
                            <div class="custom-info" :class="{ selected: extendedNote }" @click="selectedNote()">
                                <h5>Giáo dục</h5>
                            </div>
                        </div>
                        <div class="col-9" style="padding-top: 15px" v-if="extendedInfo">
                            <div class="row">
                                <div class="col-4">
                                    <svg fill="#000000" height="300px" width="300px" version="1.1" id="Layer_1"
                                        xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 512 512" xml:space="preserve">
                                        <g>
                                            <g>
                                                <circle cx="256" cy="114.526" r="114.526" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M256,256c-111.619,0-202.105,90.487-202.105,202.105c0,29.765,24.13,53.895,53.895,53.895h296.421
			c29.765,0,53.895-24.13,53.895-53.895C458.105,346.487,367.619,256,256,256z" />
                                            </g>
                                        </g>
                                    </svg>
                                    <div class="form-group">
                                        <label for="imageUpload">Tải ảnh lên</label>
                                        <input type="file" class="form-control input-file" id="imageUpload"
                                            accept="image/*" />
                                    </div>
                                </div>
                                <div class="col-8">
                                    <div style="position: relative; margin-right:10px">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Tên thành viên đầy đủ</label>
                                    </div>
                                    <div style="display:flex">
                                        <div style="position: relative; width: 50%;margin-right: 10px;">
                                            <input type="text" class="form-control modal-item" placeholder />
                                            <label class="form-label" for="input">Tên thường gọi</label>
                                        </div>
                                        <div style="position: relative;width: 50%; margin-right: 10px;">
                                            <input type="number" class="form-control modal-item" placeholder />
                                            <label class="form-label-number" min="0" for="input">Con Thứ</label>
                                        </div>
                                    </div>
                                    <div style="display:flex">
                                        <div style="position: relative; width: 50%;margin-right: 10px;">
                                            <select class="form-select modal-item">
                                                <option value="1">Nam</option>
                                                <option value="0">Nữ</option>
                                            </select>
                                            <label class="form-label" for="select">Giới Tính</label>
                                        </div>
                                        <div style="position: relative;width: 50%; margin-right: 10px;">
                                            <select id="bloodtype" class="form-select modal-item">
                                                <option value="1">A</option>
                                                <option value="2">B</option>
                                                <option value="3">AB</option>
                                                <option value="4">O</option>
                                            </select>
                                            <label class="form-label-number" for="select">Nhóm Máu</label>
                                        </div>
                                    </div>
                                    <div style="display:flex">
                                        <div style="position: relative; width: 50%;margin-right: 10px;">
                                            <select class="form-select modal-item">
                                                <option v-for="nation in ListNationality" :key="nation.id"
                                                    :value="nation.NationalityID">{{ nation.NationalityName }}</option>
                                            </select>
                                            <label class="form-label" for="select">Quốc Tịch</label>
                                        </div>
                                        <div style="position: relative;width: 50%; margin-right: 10px;">
                                            <select id="bloodtype" class="form-select modal-item">
                                                <option v-for="religion in ListReligion" :key="religion.id"
                                                    :value="religion.ReligionID">{{ religion.ReligionName }}</option>
                                            </select>
                                            <label class="form-label-number" for="select">Tôn Giáo</label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <h6 style="margin-bottom:20px">Ngày Sinh (*)</h6>
                                        <div style="display:flex">
                                            <div style="position: relative; width: 50%;margin-right: 10px;">
                                                <input type="date" class="form-control modal-item" placeholder />
                                                <label class="form-label" for="input">Dương Lịch</label>
                                            </div>
                                            <div style="position: relative;width: 50%; margin-right: 10px;">
                                                <input type="date" class="form-control modal-item" placeholder />
                                                <label class="form-label-number" min="0" for="input">Âm lịch</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="position: relative; margin-right:10px">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Nơi sinh</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input v-model="isDead" type="checkbox" class="form-check-input"
                                            id="lostCheckbox" />
                                        <label style="font-size: 14px; margin-top: 7px;" class="form-check-label"
                                            for="lostCheckbox">Đã mất</label>
                                    </div>
                                    <div class="form-group" v-if="isDead">
                                        <h6 style="margin-bottom:20px">Ngày Mất (*)</h6>
                                        <div style="display:flex">
                                            <div style="position: relative; width: 50%;margin-right: 10px;">
                                                <input type="date" class="form-control modal-item" placeholder />
                                                <label class="form-label" for="input">Dương Lịch</label>
                                            </div>
                                            <div style="position: relative;width: 50%; margin-right: 10px;">
                                                <input type="date" class="form-control modal-item" placeholder />
                                                <label class="form-label-number" min="0" for="input">Âm lịch</label>
                                            </div>
                                        </div>
                                        <div style="position: relative; margin-right:10px">
                                            <input type="text" class="form-control modal-item" placeholder />
                                            <label class="form-label" for="input">Nơi Mất</label>
                                        </div>
                                        <div style="position: relative; margin-right:10px">
                                            <input type="text" class="form-control modal-item" placeholder />
                                            <label class="form-label" for="input">Mộ Phần</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-9" style="padding-top: 15px" v-else-if="extendedContact">
                            <div class="row">
                                <div style="position: relative;padding-right: 23px;">
                                    <input type="text" class="form-control modal-item" placeholder />
                                    <label style="left: 25px;" class="form-label" for="input">Địa chỉ</label>
                                </div>
                                <div style="display:flex">
                                    <div style="position: relative; width: 50%;margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Điện Thoại 1</label>
                                    </div>
                                    <div style="position: relative;width: 50%; margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" min="0" for="input">Điện Thoại 2</label>
                                    </div>
                                </div>
                                <div style="display:flex">
                                    <div style="position: relative; width: 50%;margin-right: 10px;">
                                        <input type="email" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Email 1</label>
                                    </div>
                                    <div style="position: relative;width: 50%; margin-right: 10px;">
                                        <input type="email" class="form-control modal-item" placeholder />
                                        <label class="form-label-number" min="0" for="input">Email 2</label>
                                    </div>
                                </div>
                                <div style="position: relative; padding-right: 23px;">
                                    <input type="text" class="form-control modal-item" placeholder />
                                    <label style="left: 25px;" class="form-label" for="input">Facebook</label>
                                </div>
                                <div style="position: relative; padding-right: 23px;">
                                    <input type="text" class="form-control modal-item" placeholder />
                                    <label style="left: 25px;" class="form-label" for="input">Zalo</label>
                                </div>
                            </div>
                        </div>
                        <div class="col-9" style="padding-top: 15px" v-else-if="extendedJob">
                            <div class="row">
                                <div style="display:flex">
                                    <div style="position: relative; width: 50%;margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Tên Cơ Quan</label>
                                    </div>
                                    <div style="position: relative;width: 50%; margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" min="0" for="input">Địa Chỉ</label>
                                    </div>
                                </div>
                                <div style="display:flex">
                                    <div style="position: relative; width: 50%;margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label" for="input">Vị trí công tác</label>
                                    </div>
                                    <div style="position: relative;width: 50%; margin-right: 10px;">
                                        <input type="text" class="form-control modal-item" placeholder />
                                        <label class="form-label-number" min="0" for="input">nghề nghiệp</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <h6 style="margin-bottom:20px">Thời gian công tác</h6>
                                    <div style="display:flex">
                                        <div style="position: relative; width: 50%;margin-right: 10px;">
                                            <input type="date" class="form-control modal-item" placeholder />
                                            <label class="form-label" for="input">Từ ngày</label>
                                        </div>
                                        <div style="position: relative;width: 50%; margin-right: 10px;">
                                            <input type="date" class="form-control modal-item" placeholder />
                                            <label class="form-label-number" min="0" for="input">Đến ngày</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-primary">Add</button>
                                </div>
                                <div class="form-group" style="margin-top:13px;padding-right:22px">
                                    <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac"
                                        rows="5" placeholder="Nhập lịch sử công tác"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-9" style="padding-top: 15px" v-else-if="extendedEdu">
                            <div class="row">
                                <div style="position: relative;padding-right: 20px;">
                                    <input type="text" class="form-control modal-item" placeholder />
                                    <label style="left: 20px;" class="form-label" for="input">Tên thành viên đầy đủ</label>
                                </div>
                                <div style="position: relative;padding-right: 20px;">
                                    <input type="text" class="form-control modal-item" placeholder />
                                    <label style="left: 20px;" class="form-label" for="input">Mô tả</label>
                                </div>
                                <div class="form-group">
                                    <h6 style="margin-bottom:20px">Thời gian học tập</h6>
                                    <div style="display:flex">
                                        <div style="position: relative; width: 50%;margin-right: 10px;">
                                            <input type="date" class="form-control modal-item" placeholder />
                                            <label class="form-label" for="input">Từ ngày</label>
                                        </div>
                                        <div style="position: relative;width: 50%; margin-right: 10px;">
                                            <input type="date" class="form-control modal-item" placeholder />
                                            <label class="form-label-number" min="0" for="input">Đến ngày</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group" style="margin-top:13px;padding-right:22px">
                                    <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac"
                                        rows="5" placeholder></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="col-9" style="padding-top: 15px" v-else>
                            <div class="form-group" style="margin-top:13px;padding-right:22px">
                                <textarea style="height:300px" class="form-control modal-item" id="lichSuCongTac" rows="5"
                                    placeholder="Ghi Chú"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer" style="background-color:#E8C77B">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-primary mr-2">Thay đổi</button>
                        <button style="margin-left:10px" type="button" class="btn btn-secondary">Xóa khỏi danh sách tộc
                            trưởng</button>
                    </div>
                </div>
            </div>
        </modal>

        <modal name="noti-modal">
            <div class="h-100 d-flex flex-column" style="background-color: white;">
                <div class="modal-title d-flex flex-row align-items-center justify-content-center" style="height: 60px;">
                    <div class="col-3 d-flex flex-row align-items-center h-100 p-3" style="background-color: white;">
                        <div>
                            <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                <path
                                    d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                            </svg>
                        </div>
                        <div class="d-flex justify-content-center" style="flex-grow: 1;">User</div>
                    </div>
                    <div class="col-9 d-flex align-items-center justify-content-center">Thông báo tới thành viên</div>
                </div>
                <div class="d-flex flex-row" style="height: calc(100% - 60px)">
                    <div class="col-3 h-100 d-flex flex-column" style="overflow-y: auto;">
                        <div class="position-relative d-flex" style="height: 48px;">
                            <label for="text-search" style="position: absolute; inset: 12px;">
                                <svg class="text-search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                                </svg>
                            </label>
                            <div class="w-100" style="height: 48px; padding: 8px;">
                                <input class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" />
                            </div>
                        </div>
                        <div class="position-relative d-flex" style="height: 48px;">
                            <div class="d-flex flex-row align-items-center p-2">
                                <input v-model="checkAll" type="checkbox" class="form-check-input" />
                                <div style="padding-left: 8px">Chọn tất cả mọi người</div>
                            </div>
                        </div>
                        <div>
                            <div tabindex="1" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{chosen : checkAll}">
                                <div>
                                    <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                    </svg>
                                </div>
                                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
                            </div>
                            <div tabindex="2" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{chosen : checkAll}">
                                <div>
                                    <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                    </svg>
                                </div>
                                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
                            </div>
                            <div tabindex="3" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{chosen : checkAll}">
                                <div>
                                    <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                    </svg>
                                </div>
                                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
                            </div>
                            <div tabindex="4" class="noti-modal-member d-flex flex-row align-items-center px-2" :class="{chosen : checkAll}">
                                <div>
                                    <svg class="noti-modal-member-ava" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512">
                                        <path
                                            d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                                    </svg>
                                </div>
                                <div class="d-flex justify-content-center" style="flex-grow: 1;">Thành viên A</div>
                            </div>
                        </div>

                    </div>
                    <div class="col-9 h-100 position-relative" style="background-color: #ebebeb;">
                        <div class="position-absolute w-100 px-2 d-flex flex-row" style="bottom: 8px">
                            <input type="text" class="form-control" placeholder="..." />
                            <div class="d-flex align-items-center" style="padding-left: 8px; cursor: pointer;">
                                <svg class="noti-send-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path
                                        d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V396.4c0-4 1.5-7.8 4.2-10.7L331.8 202.8c5.8-6.3 5.6-16-.4-22s-15.7-6.4-22-.7L106 360.8 17.7 316.6C7.1 311.3 .3 300.7 0 288.9s5.9-22.8 16.1-28.7l448-256c10.7-6.1 23.9-5.5 34 1.4z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </modal>
    </div>
</template>

<script>
// import { EventBus } from "../assets/js/MyEventBus.js";
export default {
    data() {
        return {
            extendedInfo: true,
            extendedContact: false,
            extendedJob: false,
            extendedEdu: false,
            extendedNote: false,
            isDead: false,
            ListNationality: null,
            ListReligion: null,

            checkAll: false,
        }
    },
    methods: {
        selectedInfor() {
            this.extendedInfo = true;
            this.extendedContact = false;
            this.extendedEdu = false;
            this.extendedJob = false;
            this.extendedNote = false;
        },
        selectedContact() {
            this.extendedInfo = false;
            this.extendedContact = true;
            this.extendedEdu = false;
            this.extendedJob = false;
            this.extendedNote = false;
        },
        selectedEdu() {
            this.extendedInfo = false;
            this.extendedContact = false;
            this.extendedEdu = true;
            this.extendedJob = false;
            this.extendedNote = false;
        },
        selectedJob() {
            this.extendedInfo = false;
            this.extendedContact = false;
            this.extendedEdu = false;
            this.extendedJob = true;
            this.extendedNote = false;
        },
        selectedNote() {
            this.extendedInfo = false;
            this.extendedContact = false;
            this.extendedEdu = false;
            this.extendedJob = false;
            this.extendedNote = true;
        },
        openAddHeadModal() {
            this.$modal.show('addHead-modal')
        },
        closeAddHeadModal() {
            this.$modal.hide('addHead-modal')
        },
        openEditHeadModal() {
            this.$modal.show('editHead-modal')
        },
        closeEditHeadModal() {
            this.$modal.hide('editHead-modal')
        },
        openNotiModal() {
            this.$modal.show('noti-modal')
        },
        closeNotiModal() {
            this.$modal.hide('noti-modal')
        },
    },
    created() {
        // EventBus.$emit("HeadList", true);
        // EventBus.$emit("AlbumList", false);
        // EventBus.$emit("ArticleList", false);
    },
}
</script>