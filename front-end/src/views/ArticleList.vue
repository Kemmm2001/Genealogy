<template>
    <div class="d-flex w-100">
        <div class="flex-column h-100 w-100">
            <div class="d-flex articlelist-button-container">
                <div class="d-flex col-md-4 align-items-center">
                    <input type="text" class="form-control modal-item mx-1" placeholder="Nhập tài liệu...">
                </div>
                <div class="d-flex col-md-8 articlelist-button-container">
                    <button @click="openArticleModal"
                        class="btn articlelist-item articlelist-item-button text-center my-2 mx-1">Thêm tài liệu</button>
                    <button class="btn articlelist-item articlelist-item-button text-center my-2 mx-1">Sửa</button>
                    <button class="btn articlelist-item articlelist-item-button text-center my-2 mx-1">Xóa</button>
                    <button class="btn articlelist-item articlelist-item-button text-center my-2 mx-1">Công khai</button>
                    <button class="btn articlelist-item articlelist-item-button text-center my-2 mx-1"
                        style="margin-right: 8px !important;">Xem chi tiết</button>
                </div>
            </div>
            <div class="d-flex flex-column articlelist-list-container w-100">
                <table class="table articlelist-list">
                    <thead>
                        <tr class="articlelist-item">
                            <th class="articlelist-list-th" scope="col">#</th>
                            <th class="articlelist-list-th" scope="col">Tên tài liệu</th>
                            <th class="articlelist-list-th" scope="col">Mô tả tài liệu</th>
                            <th class="articlelist-list-th" scope="col">Công khai</th>
                            <th class="articlelist-list-th" scope="col">Người tạo</th>
                            <th class="articlelist-list-th" scope="col">Cập nhật lần cuối</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="articlelist-item articlelist-table-item">
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="articlelist-item articlelist-table-item">
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr class="articlelist-item articlelist-table-item">
                            <th scope="row">3</th>
                            <td>Larry the Bird</td>
                            <td>Larry the Bird</td>
                            <td>@twitter</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div class="articlelist-list-footer">
                    <div class="d-flex flex-row">
                        <div class="d-flex flex-row align-items-center justify-content-right articlelist-item">
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
                                <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                </svg>
                            </button>
                            <button class="btn px-2 p-0">
                                <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path
                                        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </button>
                            <div class="d-flex align-items-center justify-content-center">Trang 1</div>
                            <button class="btn px-2 p-0">
                                <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512">
                                    <path
                                        d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                </svg>
                            </button>
                            <button class="btn px-2 p-0">
                                <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
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

        <modal name="article-modal">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
                <div class="col-md-12 modal-title d-flex align-items-center  justify-content-center w-100">Thêm tài liệu
                </div>
                <div class="close-add-form" @click="closeArticleModal">
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
                <div class="d-flex flex-column articlelist-list-container w-100">
                    <table class="table articlelist-list">
                        <thead>
                            <tr class="articlelist-item">
                                <th class="articlelist-list-th" scope="col">#</th>
                                <th class="articlelist-list-th" scope="col">Họ và Tên</th>
                                <th class="articlelist-list-th" scope="col">Giới tính</th>
                                <th class="articlelist-list-th" scope="col">Ngày sinh</th>
                                <th class="articlelist-list-th" scope="col">Đời</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="articlelist-item articlelist-table-item">
                                <th scope="row">1</th>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td></td>
                            </tr>
                            <tr class="articlelist-item articlelist-table-item">
                                <th scope="row">2</th>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                <td></td>
                            </tr>
                            <tr class="articlelist-item articlelist-table-item">
                                <th scope="row">3</th>
                                <td>Larry the Bird</td>
                                <td>Larry the Bird</td>
                                <td>@twitter</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="articlelist-list-footer">
                        <div class="d-flex flex-row">
                            <div class="d-flex flex-row align-items-center justify-content-right articlelist-item">
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
                                    <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
                                    </svg>
                                </button>
                                <button class="btn px-2 p-0">
                                    <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                    </svg>
                                </button>
                                <div class="d-flex align-items-center justify-content-center">Trang 1</div>
                                <button class="btn px-2 p-0">
                                    <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512">
                                        <path
                                            d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z" />
                                    </svg>
                                </button>
                                <button class="btn px-2 p-0">
                                    <svg class="articlelist-paging-icon p-0" xmlns="http://www.w3.org/2000/svg"
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
                <button class="btn articlelist-item articlelist-item-button text-center my-2 mx-1">Lưu</button>
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
        openArticleModal() {
            this.$modal.show('article-modal')
        },
        closeArticleModal() {
            this.$modal.hide('article-modal')
        },
    }
}
</script>