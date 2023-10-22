<template>
    <div class="d-flex w-100">
        <div class="flex-column h-100 w-100">
            <div class="d-flex headlist-button-container">
                <div class="">
                    <button @click="openHeadModal" class="btn headlist-item headlist-item-button text-center my-2 mx-1">Thêm
                        tộc trưởng</button>
                    <button class="btn headlist-item headlist-item-button text-center my-2 mx-1">Xóa</button>
                    <button class="btn headlist-item headlist-item-button text-center my-2 mx-1"
                        style="margin-right: 8px !important;">Xem thông tin</button>
                </div>
            </div>
            <div class="d-flex flex-column headlist-list-container w-100">
                <table class="table headlist-list">
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
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-row align-items-center justify-content-right headlist-item">
                            <div class="px-2">Phân trang</div>
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
                    </div>
                </div>
            </div>
        </div>

        <modal name="head-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
                <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm tộc trưởng
                </div>
                <div class="close-add-form" @click="closeHeadModal">
                    <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                        <path
                            d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </div>
            </div>
            <div class="d-flex flex-column">
                <div class="d-flex flex-row">
                    <div class="col-md-4 mx-1 my-1">
                        <input type="text" class="form-control modal-item" placeholder="Nhập tên thành viên...">
                    </div>
                </div>
                <div class="d-flex flex-column headlist-list-container w-100">
                    <table class="table headlist-list">
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
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-row align-items-center justify-content-right headlist-item">
                                <div class="px-2">Phân trang</div>
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
                        </div>
                    </div>
                </div>
            </div>
            <div class="position-absolute" style="right: 0; bottom: 0;">
                <button class="btn headlist-item headlist-item-button text-center my-2 mx-1">Lưu</button>
            </div>
        </modal>
    </div>
</template>

<script>
export default {
    data() {
        return {
            trClicked: false,
        }
    },
    methods: {
        openHeadModal() {
            this.$modal.show('head-modal')
        },
        closeHeadModal() {
            this.$modal.hide('head-modal')
        },
    }
}
</script>