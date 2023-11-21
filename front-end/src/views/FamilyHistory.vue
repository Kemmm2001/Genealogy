<template>
    <div class="history-screen d-flex h-100 w-100 p-0 position-relative" style="overflow-y: auto;">
        <div class="h-100 position-absolute" style="top: 0; left: 0; width: 20%;">
            <div class="position-relative d-flex">
                <label for="text-search" style="position: absolute; inset: 12px;">
                    <svg class="text-search-icon h-100 d-flex align-items-center" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path
                            d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                    </svg>
                </label>
                <div class="w-100" style="height: 56px; padding: 8px;">
                    <input class="form-control px-5 py-0 w-100 h-100" id="text-search" type="text" />
                </div>
            </div>
            <div class="pb-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 15%;">Từ</div>
                <input class="form-control" type="date"/>
            </div>
            <div class="pb-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 15%;">Đến</div>
                <input class="form-control" type="date"/>
            </div>
            <div class="pb-2 px-2">
                <div class="w-100 d-flex flex-column" style="height: 420px; background-color: black; overflow-y: auto;">
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 1</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 2</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 3</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 4</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 5</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 6</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 7</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 8</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 9</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 10</div>
                    <div class="item mx-2 mt-2 d-flex align-items-center">Sự kiện 11</div>
                </div>
            </div>
            <div class="pb-2 px-2 d-flex justify-content-center">
                <div @click="showAddHistoryModal()" class="btn bg-primary text-white">Thêm</div>
            </div>
        </div>
        <div class="h-100 position-absolute" style="top: 0; right: 0; width: 80%; background-color: gray;"></div>
        <div class="addHistory-container">
            <modal name="addHistory-modal">
                <div class="form-group h-100">
                    <div class="w-100 h-100 modal-bg position-relative">
                        <div class="d-flex flex-row w-100 align-items-center position-relative">
                            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm
                                lịch sử dòng họ</div>
                            <div class="close-add-form" @click="closeAddHistoryModal()">
                                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="height: calc(100% - 50px);">
                            <div class="d-flex flex-row pt-2 px-2">
                                <div>Ngày bắt đầu</div>
                                <input type="date" class="form-control"/>
                            </div>
                            <div class="d-flex flex-row pt-2 px-2">
                                <div>Ngày kết thúc</div>
                                <input type="date" class="form-control"/>
                            </div>
                            <div class="pt-2 px-2" style="height: 120px;">
                                <textarea class="w-100 h-100 text-area description" placeholder="Mô tả"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer position-absolute w-100" style="bottom: 0;">
                            <div class="bg-primary text-white btn mx-2">Thêm</div>
                        </div>
                    </div>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    methods: {
        showAddHistoryModal(){
            this.$modal.show("addHistory-modal");
        },
        closeAddHistoryModal(){
            this.$modal.hide("addHistory-modal");
        }
    }
}
</script>