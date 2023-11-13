<template>
    <div class="container-fluid">
        <div class="m-5">
            <h1 class="pt-4">Thống kê chung</h1>
            <div class="d-flex flex-row m-4">
                <div class="col-2">
                    <p class="d-block text-decoration-underline">Thống kê thành viên</p>
                    <p class="d-block">Tổng số thành viên: 1 người</p>
                    <p class="d-block">Số đời: 1</p>
                    <p class="d-block">Đời nhiều thành viên nhất</p>
                    <p class="d-block">Còn sống: 1 người (100%)</p>
                    <p class="d-block">Đã mất: 0 người (0%)</p>
                </div>
                <div class="col-2">
                    <p class="d-block text-decoration-underline">Thống kê giới tính</p>
                    <p class="d-block">Nam: 1 người (100%)</p>
                    <p class="d-block">Nữ: 0 người (0%)</p>
                    <p class="d-block">Không rõ: 0 người (0%)</p>
                </div>
                <div class="col-2">
                    <p class="d-block text-decoration-underline">Thống kê dâu rể</p>
                    <p class="d-block">Rể: 0 người (0%)</p>
                    <p class="d-block">Dâu: 0 người (0%)</p>
                </div>
                <div class="col-2">
                    <p class="d-block text-decoration-underline">Thống kê độ tuổi</p>
                    <p class="d-block">Từ 0-5: 0 người (0%)</p>
                    <p class="d-block">Từ 6-17: 0 người (0%)</p>
                    <p class="d-block">Từ 18-40: 0 người (0%)</p>
                    <p class="d-block">Từ 41-60: 0 người (0%)</p>
                    <p class="d-block">Từ 60 - 69: 0 người (0%)</p>
                    <p class="d-block">Từ 70-79: 0 người (0%)</p>
                    <p class="d-block">Từ 80-89: 0 người (0%)</p>
                    <p class="d-block">Trên 90: 0 người (0%)</p>
                    <p class="d-block">Không rõ: 1 người (100%)</p>
                </div>
                <div class="col-2">
                    <p class="d-block text-decoration-underline">Thống kê đặc biệt</p>
                    <p class="d-block">Thành viên lớn tuổi nhất: Chưa có</p>
                    <p class="d-block">Thành viên lớn tuổi nhất còn sống: Chưa có</p>
                    <p class="d-block">Thành viên nhỏ tuổi nhất còn sống: Chưa có</p>
                </div>
            </div>
            
            
        </div>
        <div class="m-5">
            <h2 class="pt-4">Thống kê chi tiết</h2>
            <div class="m-4">
                <div>
                    <span>* Chọn các ô bên dưới để lọc dữ liệu biểu đồ</span><br>
                    <span>* Click vào biểu đồ để xem chi tiết:</span>
                </div>
                <div class="d-flex">
                    <div class="filter-form m-2">
                        <select class="form-select">
                            <option value="">Tất cả</option>
                            <option value="">Nam</option>
                            <option value="">Nữ</option>
                            <option value="">Không rõ</option>
                        </select>
                    </div>
                    <div class="filter-form m-2">
                        <select class="form-select">
                            <option value="">Tất cả</option>
                            <option value="">Còn sống</option>
                            <option value="">Đã mất</option>
                        </select>
                    </div>
                    <div class="filter-form m-2">
                        <select class="form-select">
                            <option value="">Tất cả</option>
                            <option value="">Tháng 1</option>
                            <option value="">Tháng 2</option>
                            <option value="">Tháng 3</option>
                            <option value="">Tháng 4</option>
                            <option value="">Tháng 5</option>
                            <option value="">Tháng 6</option>
                            <option value="">Tháng 7</option>
                            <option value="">Tháng 8</option>
                            <option value="">Tháng 9</option>
                            <option value="">Tháng 10</option>
                            <option value="">Tháng 11</option>
                            <option value="">Tháng 12</option>
                        </select>
                    </div>
                    <div class="filter-form m-2">
                        <select class="form-select">
                            <option value="">Tất cả</option>
                            <option value="">1</option>
                        </select>
                    </div>
                    
                    <div class="filter-form m-2">
                        <select class="form-select">
                            <option value="">Tất cả</option>
                            <option value="">0-5</option>
                            <option value="">6-17</option>
                            <option value="">18-40</option>
                            <option value="">41-60</option>
                            <option value="">60-69</option>
                            <option value="">70-79</option>
                            <option value="">80-89</option>
                            <option value="">Trên 90</option>
                        </select>
                    </div>
                    <div class="filter-form m-2">
                        <button class="btn click-color m-0">Lọc</button>
                    </div>
                    <div class="filter-form m-2">
                        <button class="btn click-color m-0">Làm mới</button>
                    </div>
                </div>
                <div class="d-flex row">
                    <div class="graph justify-content-center" style="height: 400px; max-width: 300px;">
                        <Bar
                            id="my-chart-id"
                            :options="graphGender.chartOptions"
                            :data="graphGender.chartData"
                            :style="myGenderStyle"
                        />
                        <b style="margin:20%">1.Biểu đồ giới tính</b>
                    </div>
                    <div class="graph" style="height: 400px; max-width: 300px;">
                        <Bar
                            id="my-chart-id"
                            :options="graphAlive.chartOptions"
                            :data="graphAlive.chartData"
                            :style="myAliveStyle"
                        />
                        <b style="margin:20%">2.Biểu đồ trạng thái</b>
                    </div>
                    <div class="graph" style="height: 400px;max-width: 700px;">
                        <Bar
                        id="my-chart-id"
                            :options="graphAge.chartOptions"
                            :data="graphAge.chartData"
                            :style="myAgeStyle"
                        />
                        <b style="margin:20%">3.Biểu đồ độ tuổi</b>
                    </div>
                    <div class="graph" style="height: 600px;max-width: 2000px;margin-top: 100px;padding-bottom: 100px;">
                        <Bar
                            id="my-chart-id"
                            :options="graphMonthDob.chartOptions"
                            :data="graphMonthDob.chartData"
                            :style="myMonthStyle"
                        />
                        <b>4.Biểu đồ tháng sinh</b>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
export default {
    components: {
        Bar,
    },
    data() {
        return {
            graphGender:{
                chartData : {
                    labels: ["Nam: 1", "Nữ: 0", "Khác: 0"],
                    datasets: [ 
                        { 
                            label: "",
                            data: [1, 0, 0],
                            backgroundColor:'black',
                        }
                    ,]
                    },
                chartOptions : {
                    responsive: true,
                }
            },
            graphAlive:{
                chartData : {
                    labels: ["Đã mất: 0","Còn sống: 1"],
                    datasets: [ 
                        { 
                            label: "",
                            data: [0,1],
                            backgroundColor:'blue',
                        }
                    ,]
                    },
                chartOptions : {
                    responsive: true,
                }
            },
            graphAge:{
                chartData : {
                    labels: ["Từ 0-5 tuổi: 0", "Từ 6-17 tuổi: 0","Từ 18-40 tuổi: 0","Từ 41-60 tuổi: 0","Từ 60-69 tuổi: 0","Từ 70-79 tuổi: 0","Từ 80-89 tuổi: 0","Trên 90 tuổi: 0"],
                    datasets: [ 
                        { 
                            label:"",
                            data: [0,0,1,0,0,0,0,0],
                            backgroundColor:'yellow',
                        }
                    ,]
                    },
                chartOptions : {
                    responsive: true,
                }
            },
            graphMonthDob:{
                chartData : {
                    labels: ["Tháng 01: 0", "Tháng 2: 0","Tháng 3: 0","Tháng 4: 0","Tháng 5: 0","Tháng 6: 0","Tháng 7: 0","Tháng 8: 0","Tháng 9: 0","Tháng 10: 0","Tháng 11: 0","Tháng 12: 0"],
                    datasets: [ 
                        { 
                            label:"",
                            data: [0,0,0,0,1,0,0,0,0,0,0,0],
                            backgroundColor:'red',
                        }
                    ,]
                    },
                chartOptions : {
                    responsive: true,
                }
            },
        }
    },
    computed: {
        myGenderStyle () {
            return {
                height: `400px`,
                width:'200px',
            }
        },
        myAliveStyle () {
            return {
                height: `400px`,
                width:'200px',
            }
        },
        myAgeStyle () {
            return {
                height: `400px`,
                width:'600px',
            }
        },
        myMonthStyle () {
            return {
                height: `600px`,
                width:'1800px',
            }
        }
    }
}
</script>
<style>
.m-5{
    background-color: #e5e5e5;
    border-radius: 0.375rem;
}
.col-2{
    margin-right: 40px;
}
h1.pt-4{
    font-size: 35px;
    padding-left: 24px;
}
h2.pt-4{
    font-size: 35px;
    padding-left: 24px;
}
.click-color{
    background-color: #E8C77B;
    width: 150px;
    height: 50px;
}
.form-select{
    width: 150px;
    height: 50px;
}
#my-chart-id{
    width: 400px;
}
.text-decoration-underline{
    font-size: 30px;
}
</style>