<!-- phùng việt khôi -->
<template>
    <div class="w-100 h-100 position-relative verify-background" style="min-height: inherit;">
        <div class="position-absolute verify-container d-flex align-items-center flex-column" style="opacity: 93%; justify-content: space-around; font-size: 18px;">
            <div style="font-weight: bold;">Chúng tôi đã gửi email xác nhận tới tài khoản aaa@gmail.com</div>
            <div style="padding: 0 10%;">Nhấn vào đường dẫn trong hòm thư để xác nhận tài khoản. Nếu bạn không thể tìm thấy email, hãy check trong thư mục spam hoặc bấm vào <span class="text-primary" style="cursor: pointer; text-decoration: underline;">đây</span> để gửi lại.</div>
            <div>
                <div class="btn bg-primary text-white"> Trở về trang đăng nhập</div>
            </div>
        </div>
    </div>
</template>

<style>
.verify-container{
    height: 35%;
    width: 50%;
    inset: 0;
    margin: auto;
    background-color: #FFFFFF;
}

.verify-background{
    background-image: url(../assets/verify.jpg);
    background-position: bottom;
}
</style>