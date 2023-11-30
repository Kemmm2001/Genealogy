<template>
    <div>
        <!-- Modal thông báo event -->
        <div @click="showEventNoti()" class="btn bg-primary text-white mx-2">Show</div>
        <div class="eventNoti-modal-container">
            <modal name="eventNoti-modal">
                <div class="w-100 h-100 add-head-modal">
                    <div class="d-flex flex-row w-100 align-items-center position-relative">
                        <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 text-white"
                            style="background-color: rgb(255, 8, 0);;">Quan trọng</div>
                        <div class="close-add-form" @click="closeEventNoti()">
                            <svg class="close-add-form-icon" style="fill: #FFFFFF !important;"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-100 d-flex flex-column align-items-center justify-content-center"
                        style="height: calc(100% - 50px);">
                        <div class="d-flex flex-column align-items-center justify-content-center px-3"
                            style="height: 70%; font-size: 19px; text-align: center;">
                            <div>Tên sự kiện diễn ra vào 00:00 ngày 01/01/2000.</div>
                            <div>Bạn có thể tham gia được không?</div>
                        </div>
                        <div class="d-flex flex-row w-100" style="height: 30%;">
                            <div class="col-6 d-flex align-items-center justify-content-center">
                                <div class="btn bg-danger text-white">Có</div>
                            </div>
                            <div class="col-6 d-flex align-items-center justify-content-center">
                                <div class="btn bg-primary text-white">Không</div>
                            </div>
                        </div>
                    </div>
                </div>
            </modal>
        </div>
        <!-- -------------- -->

        <!-- Modal event hết hạn -->
        <div @click="showEventExpired()" class="btn bg-primary text-white mx-2">Show</div>
        <div class="expiredEvent-modal-container">
            <modal name="expiredEvent-modal">
                <div class="w-100 h-100 add-head-modal">
                    <div class="d-flex flex-row w-100 align-items-center position-relative">
                        <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100 text-white"
                            style="background-color: #D3AEBD;">Đã kết thúc</div>
                        <div class="close-add-form" @click="closeEventExpired()">
                            <svg class="close-add-form-icon" style="fill: #FFFFFF !important;"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                <path
                                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                        </div>
                    </div>
                    <div class="w-100 d-flex flex-column align-items-center justify-content-center"
                        style="height: calc(100% - 100px);">
                        <div class="d-flex flex-column align-items-center justify-content-center px-3"
                            style="height: 70%; font-size: 19px;">
                            <div>Bạn đã không phản hồi sự kiện diễn ra vào 00:00 ngày 01/01/2000.</div>
                        </div>
                    </div>
                    <div class="modal-footer position-absolute w-100" style="bottom: 0;">
                        <div class="bg-secondary text-white btn mx-2">Đóng</div>
                    </div>
                </div>
            </modal>
        </div>
        <!-- ----------------- -->

        <input type="file" @change="handleFileChange" />
        <div v-if="imageInfo">
            <p>Width: {{ imageInfo.width }} pixels</p>
            <p>Height: {{ imageInfo.height }} pixels</p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imageInfo: null,
        }
    },
    methods: {
        showEventNoti() {
            this.$modal.show("eventNoti-modal");
        },
        closeEventNoti() {
            this.$modal.hide("eventNoti-modal");
        },
        showEventExpired() {
            this.$modal.show("expiredEvent-modal");
        },
        closeEventExpired() {
            this.$modal.hide("expiredEvent-modal");
        },

        handleFileChange(event) {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();

                reader.onload = (e) => {
                    const img = new Image();
                    img.src = e.target.result;

                    img.onload = () => {
                        this.imageInfo = {
                            width: img.width,
                            height: img.height,
                        };
                    };
                };
                reader.readAsDataURL(file);
            }
        },
    }
}
</script>