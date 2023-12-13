<template>
    <div class="stat-grid-container">
        <div class="overview mb-4">
            <div class="p-2">
                <h4 style="font-weight: bold; font-family: 'QuicksandBold';">Thống kê chung</h4>
            </div>
            <div class="d-flex">
                <div class="col-3 ps-2 pb-2">
                    <p class="d-block">Tổng số thành viên: {{ this.totalMember }} người</p>
                    <p class="d-block">Số đời: {{ this.numberGeneration }}</p>
                    <p class="d-block">Đời nhiều thành viên nhất: {{ this.maxMemberGeneration }}</p>
                    <p class="d-block">Còn sống: {{ this.numberAlive }} người ({{ this.totalMember != 0 ? (this.numberAlive
                        != 0
                        ? (this.numberAlive / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Đã mất: {{ this.numberDied }} người ({{ this.totalMember != 0 ? (this.numberDied != 0
                        ? (this.numberDied / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                </div>
                <div class="col-3 ps-2 pb-2">
                    <p class="d-block">Nam: {{ this.numberMale }} người ({{ this.totalMember != 0 ? (this.numberMale != 0 ?
                        (this.numberMale / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Nữ: {{ this.numberFemale }} người ({{ this.totalMember != 0 ? (this.numberFemale != 0
                        ?
                        (this.numberFemale / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Rể: {{ this.numberSonInLaw }} người ({{ this.totalMember != 0 ? (this.numberSonInLaw
                        != 0
                        ? (this.numberSonInLaw / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Dâu: {{ this.numberDaughterInLaw }} người ({{ this.totalMember != 0 ?
                        (this.numberDaughterInLaw != 0 ? (this.numberDaughterInLaw / this.totalMember * 100).toFixed(1) : 0)
                        : 0
                    }}%)</p>
                </div>
                <div class="col-3 ps-2 pb-2">
                    <p class="d-block">Từ 0-5: {{ this.age0to5 }} người ({{ this.totalMember != 0 ? (this.age0to5 != 0 ?
                        (this.age0to5 / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Từ 6-17: {{ this.age61up }} người ({{ this.totalMember != 0 ? (this.age61up != 0 ?
                        (this.age61up / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Từ 18-40: {{ this.age18to40 }} người ({{ this.totalMember != 0 ? (this.age18to40 != 0
                        ?
                        (this.age18to40 / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Từ 41-60: {{ this.age41to60 }} người ({{ this.totalMember != 0 ? (this.age41to60 != 0
                        ?
                        (this.age41to60 / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                    <p class="d-block">Trên 61: {{ this.age61up }} người ({{ this.totalMember != 0 ? (this.age61up != 0 ?
                        (this.age61up / this.totalMember * 100).toFixed(1) : 0) : 0 }}%)</p>
                </div>
                <div class="col-3 ps-2 pb-2">
                    <p v-if="this.memberOldest.age != 0 && this.memberOldest.age != null" class="d-block">Thành viên lớn
                        tuổi
                        nhất: {{ this.memberOldest.name }} ({{ this.memberOldest.age }})</p>
                    <p v-else class="d-block">Thành viên lớn tuổi nhất: </p>
                    <p v-if="this.memberOldestAlive.age != 0 && this.memberOldestAlive.age != null" class="d-block">
                        Thành viên lớn tuổi nhất còn sống : {{ this.memberOldestAlive.name }}
                        ({{ this.memberOldestAlive.age }})
                    </p>
                    <p v-else class="d-block">
                        Thành viên lớn tuổi nhất còn sống:
                    </p>
                </div>
            </div>
        </div>
        <div class="detail">
            <div class="p-2">
                <h4 style="font-weight: bold; font-family: 'QuicksandBold';">Thống kê chi tiết</h4>
            </div>
            <div class="ps-2 pb-2">
                <div>* Chọn các ô bên dưới để lọc dữ liệu biểu đồ</div>
                <div>* Trỏ chuột vào biểu đồ để xem thông tin chi tiết hơn</div>
            </div>
            <div class="px-2 pb-2 d-flex">
                <div class="col-2">
                    <select v-model="monthSearch" class="form-select filter" @change="filter()">
                        <option value="0">Toàn bộ</option>
                        <option value="1">Tháng 1</option>
                        <option value="2">Tháng 2</option>
                        <option value="3">Tháng 3</option>
                        <option value="4">Tháng 4</option>
                        <option value="5">Tháng 5</option>
                        <option value="6">Tháng 6</option>
                        <option value="7">Tháng 7</option>
                        <option value="8">Tháng 8</option>
                        <option value="9">Tháng 9</option>
                        <option value="10">Tháng 10</option>
                        <option value="11">Tháng 11</option>
                        <option value="12">Tháng 12</option>
                        <!-- <option value="0">Không rõ</option> -->
                    </select>
                </div>
                <div class="col-2">
                    <select v-model="generationSearch" class="form-select filter" @change="filter()">
                        <option value="0">Toàn bộ</option>
                        <option :value="index" v-for="index in this.numberGeneration" :key="index">{{ index }}</option>
                    </select>
                </div>
                <div class="col-2">
                    <select v-model="genderSearch" class="form-select filter" @change="filter()">
                        <option value="all">Toàn bộ</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                </div>
                <div class="col-2">
                    <select v-model="isDeadSearch" class="form-select filter" @change="filter()">
                        <option value="all">Toàn bộ</option>
                        <option value="1">Còn sống</option>
                        <option value="0">Đã mất</option>
                    </select>
                </div>
                <div class="col-2">
                    <select v-model="ageSearch" class="form-select filter" @change="filter()">
                        <option value="all">Toàn bộ</option>
                        <option value="0-5">0-5 tuổi</option>
                        <option value="6-17">6-17 tuổi</option>
                        <option value="18-40">18-40 tuổi</option>
                        <option value="41-60">41-60 tuổi</option>
                        <option value=">60">Trên 60 tuổi</option>
                    </select>
                </div>
                <div class="col-2">
                    <div class="center-content">
                        <button class="btn bg-primary text-white m-0" @click="refreshSelect()">Làm mới</button>
                    </div>
                </div>
            </div>
            <div class="px-2 pb-2">
                <div class="d-flex" style="max-height: 400px;">
                    <div class="col-6 pb-2 pe-2 flex-column">
                        <div class="h-100" style="border: 1px solid #ccc;">
                            <Bar id="my-chart-id" :options="graphGender.chartOptions" :data="graphGender.chartData"
                                :style="myGenderStyle" />
                        </div>
                    </div>
                    <div class="col-6 pb-2 flex-column">
                        <div class="h-100" style="border: 1px solid #ccc;">
                            <Bar id="graphAlive" :options="graphAlive.chartOptions" :data="graphAlive.chartData"
                                :style="myAliveStyle" />
                        </div>
                    </div>
                </div>
                <div style="max-height: 400px;">
                    <div class="pb-2">
                        <div class="h-100 pb-2" style="border: 1px solid #ccc;">
                            <Bar id="graphAge" :options="graphAge.chartOptions" :data="graphAge.chartData"
                                :style="myAgeStyle" />
                        </div>
                    </div>
                </div>
                <div style="max-height: 400px;">
                    <div class="pb-2">
                        <div style="border: 1px solid #ccc;">
                            <div class="h-100 pb-2" style="border: 1px solid #ccc;">
                                <Bar id="graphMonthDob" :options="graphMonthDob.chartOptions"
                                    :data="graphMonthDob.chartData" :style="myMonthStyle" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import VueCookies from "vue-cookies";
Vue.use(VueCookies);
import { Bar } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import { HTTP } from "../assets/js/baseAPI.js";

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
);
export default {
    components: {
        Bar,
    },
    data() {
        return {
            numberMale: 0,
            numberFemale: 0,
            totalMember: 0,
            numberGeneration: 0,
            numberAlive: 0,
            numberDied: 0,
            numberSonInLaw: 0,
            numberDaughterInLaw: 0,
            age0to5: 0,
            age6to17: 0,
            age18to40: 0,
            age41to60: 0,
            age61up: 0,
            monthDob: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            monthDobFilter: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            memberOldest: {
                name: null,
                age: null,
            },
            memberOldestAlive: {
                name: null,
                age: null,
            },
            maxMemberGeneration: 0,

            memberFilter: null,
            memberList: null,

            monthSearch: 0,
            generationSearch: 0,
            genderSearch: "all",
            isDeadSearch: "all",
            ageSearch: "all",

            numberMaleFilter: 0,
            numberFemaleFilter: 0,
            numberAliveFilter: 0,
            numberDiedFilter: 0,
            age0to5Filter: 0,
            age6to17Filter: 0,
            age18to40Filter: 0,
            age41to60Filter: 0,
            age61upFilter: 0,
            monthFilter: 0,
            numberGenerationFilter: 0,

            CodeID: null,
        };
    },
    computed: {
        myGenderStyle() {
            return {
                height: `400px`,
                width: "200px",
            };
        },
        myAliveStyle() {
            return {
                height: `400px`,
                width: "200px",
            };
        },
        myAgeStyle() {
            return {
                height: `400px`,
                width: "600px",
            };
        },
        myMonthStyle() {
            return {
                height: `600px`,
                width: "1800px",
            };
        },
        graphGender() {
            return {
                chartData: {
                    labels: [
                        "Nam: " + this.numberMaleFilter,
                        "Nữ: " + this.numberFemaleFilter,
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [this.numberMaleFilter, this.numberFemaleFilter],
                            backgroundColor: "black",
                        },
                    ],
                },
                chartOptions: {
                    responsive: true,
                },
            };
        },
        graphAlive() {
            return {
                chartData: {
                    labels: [
                        "Đã mất: " + this.numberDiedFilter,
                        "Còn sống: " + this.numberAliveFilter,
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [this.numberDiedFilter, this.numberAliveFilter],
                            backgroundColor: "blue",
                        },
                    ],
                },
                chartOptions: {
                    responsive: true,
                },
            };
        },
        graphAge() {
            return {
                chartData: {
                    labels: [
                        "Từ 0-5 tuổi: " + this.age0to5Filter,
                        "Từ 6-17 tuổi: " + this.age6to17Filter,
                        "Từ 18-40 tuổi: " + this.age18to40Filter,
                        "Từ 41-60 tuổi: " + this.age41to60Filter,
                        "Trên 61 tuổi: " + this.age61upFilter,
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [
                                this.age0to5Filter,
                                this.age6to17Filter,
                                this.age18to40Filter,
                                this.age41to60Filter,
                                this.age61upFilter,
                            ],
                            backgroundColor: "yellow",
                        },
                    ],
                },
                chartOptions: {
                    responsive: true,
                },
            };
        },
        graphMonthDob() {
            return {
                chartData: {
                    labels: [
                        "Tháng 01: " + this.monthDobFilter[0],
                        "Tháng 2: " + this.monthDobFilter[1],
                        "Tháng 3: " + this.monthDobFilter[2],
                        "Tháng 4: " + this.monthDobFilter[3],
                        "Tháng 5: " + this.monthDobFilter[4],
                        "Tháng 6: " + this.monthDobFilter[5],
                        "Tháng 7: " + this.monthDobFilter[6],
                        "Tháng 8: " + this.monthDobFilter[7],
                        "Tháng 9: " + this.monthDobFilter[8],
                        "Tháng 10: " + this.monthDobFilter[9],
                        "Tháng 11: " + this.monthDobFilter[10],
                        "Tháng 12: " + this.monthDobFilter[11],
                    ],
                    datasets: [
                        {
                            label: "",
                            data: [
                                this.monthDobFilter[0],
                                this.monthDobFilter[1],
                                this.monthDobFilter[2],
                                this.monthDobFilter[3],
                                this.monthDobFilter[4],
                                this.monthDobFilter[5],
                                this.monthDobFilter[6],
                                this.monthDobFilter[7],
                                this.monthDobFilter[8],
                                this.monthDobFilter[9],
                                this.monthDobFilter[10],
                                this.monthDobFilter[11],
                            ],
                            backgroundColor: "red",
                        },
                    ],
                },
                chartOptions: {
                    responsive: true,
                },
            };
        },
    },
    methods: {
        getNumberMemberByGeneration(generation) {
            let count = 0;
            for (let i = 0; i < this.memberList.length; i++) {
                if (this.memberList[i].generation == generation) {
                    count += 1;
                }
            }
            return count;
        },
        refreshSelect() {
            (this.monthSearch = 0),
                (this.generationSearch = 0),
                (this.genderSearch = "all"),
                (this.isDeadSearch = "all"),
                (this.ageSearch = "all"),
                this.filter();
        },
        takeInforList() {
            (this.numberMale = 0),
                (this.numberFemale = 0),
                (this.totalMember = 0),
                (this.numberGeneration = 0),
                (this.numberAlive = 0),
                (this.numberDied = 0),
                (this.numberSonInLaw = 0),
                (this.numberDaughterInLaw = 0),
                (this.age0to5 = 0),
                (this.age6to17 = 0),
                (this.age18to40 = 0),
                (this.age41to60 = 0),
                (this.age61up = 0),
                (this.memberOldest = {}),
                (this.memberOldestAlive = {});
            this.totalMember = this.memberList.length;

            let max = 0;
            for (let i = 0; i < this.memberList.length; i++) {
                this.memberOldest.age = 0;
                this.memberOldestAlive.age = 0;
                if (
                    this.getNumberMemberByGeneration(this.memberList[i].generation) > max
                ) {
                    max = this.getNumberMemberByGeneration(this.memberList[i]);
                    this.maxMemberGeneration = this.memberList[i].generation;
                }
                if (this.memberList[i].gender == "male") {
                    this.numberMale += 1;
                    if (this.memberList[i].fid == null || this.memberList[i].fid == "") {
                        this.numberSonInLaw += 1;
                    }
                }
                if (this.memberList[i].gender == "female") {
                    this.numberFemale += 1;
                    if (this.memberList[i].fid == null || this.memberList[i].fid == "") {
                        this.numberDaughterInLaw += 1;
                    }
                }
                if (this.memberList[i].generation > this.numberGeneration) {
                    this.numberGeneration = this.memberList[i].generation;
                }
                if (this.memberList[i].isDead == 0) {
                    this.numberAlive += 1;
                }
                if (this.memberList[i].isDead == 1) {
                    this.numberDied += 1;
                }
                if (this.memberList[i].dob != null) {
                    if (
                        this.ageMember(this.memberList[i].dob) >= 0 &&
                        this.ageMember(this.memberList[i].dob) <= 5
                    ) {
                        this.age0to5 += 1;
                    }
                    if (
                        this.ageMember(this.memberList[i].dob) >= 6 &&
                        this.ageMember(this.memberList[i].dob) <= 17
                    ) {
                        this.age6to17 += 1;
                    }
                    if (
                        this.ageMember(this.memberList[i].dob) >= 18 &&
                        this.ageMember(this.memberList[i].dob) <= 40
                    ) {
                        this.age18to40 += 1;
                    }
                    if (
                        this.ageMember(this.memberList[i].dob) >= 41 &&
                        this.ageMember(this.memberList[i].dob) <= 60
                    ) {
                        this.age41to60 += 1;
                    }
                    if (this.ageMember(this.memberList[i].dob) >= 61) {
                        this.age61up += 1;
                    }
                    let month = 1;
                    while (
                        new Date(this.formatDate(this.memberList[i].dob)).getMonth() + 1 !=
                        month
                    ) {
                        month += 1;
                    }
                    this.monthDob[month - 1] += 1;
                    if (this.ageMember(this.memberList[i].dob) > this.memberOldest.age) {
                        this.memberOldest.age = this.ageMember(this.memberList[i].dob);
                        this.memberOldest.name = this.memberList[i].name;
                    }
                }

                if (
                    this.ageMember(this.memberList[i].dob) > this.memberOldestAlive.age ||
                    this.memberList[i].isDead == 0
                ) {
                    this.memberOldestAlive.age = this.ageMember(this.memberList[i].dob);
                    this.memberOldest.name = this.memberList[i].name;
                }
            }
            console.log(this.monthDob);
            this.monthDobFilter = this.monthDob;
            (this.numberMaleFilter = this.numberMale),
                (this.numberFemaleFilter = this.numberFemale),
                (this.numberAliveFilter = this.numberAlive),
                (this.numberDiedFilter = this.numberDied),
                (this.age0to5Filter = this.age0to5),
                (this.age6to17Filter = this.age6to17),
                (this.age18to40Filter = this.age18to40),
                (this.age41to60Filter = this.age41to60),
                (this.age61upFilter = this.age61up);
            // this.monthFilter = 0,
            // this.numberGenerationFilter = 0,
        },
        ageMember(memberDob) {
            if (memberDob != null) {
                let dob = new Date(this.formatDate(memberDob));
                let now = new Date();
                var age = Math.floor((now - dob) / (365.25 * 24 * 60 * 60 * 1000));
                return age;
            } else {
                return null;
            }
        },
        filter() {
            console.log(this.monthSearch);
            this.memberFilter = this.memberList;
            if (this.genderSearch != "all") {
                this.memberFilter = this.memberFilter.filter(
                    (member) => member.gender == this.genderSearch
                );
            }
            if (this.generationSearch != 0) {
                this.memberFilter = this.memberFilter.filter(
                    (member) => member.generation == this.generationSearch
                );
            }
            if (this.monthSearch != 0) {
                this.memberFilter = this.memberFilter.filter(
                    (member) =>
                        new Date(this.formatDate(member.dob)).getMonth() + 1 ==
                        this.monthSearch
                );
            }
            if (this.isDeadSearch != "all") {
                this.memberFilter = this.memberFilter.filter(
                    (member) => member.isDead != this.isDeadSearch
                );
            }
            if (this.ageSearch != "all") {
                if (this.ageSearch == "0-5") {
                    console.log(this.ageSearch);
                    this.memberFilter = this.memberFilter.filter(
                        (member) =>
                            0 <= this.ageMember(member.dob) && this.ageMember(member.dob) <= 5
                    );
                }
                if (this.ageSearch == "6-17") {
                    console.log(this.ageSearch);
                    this.memberFilter = this.memberFilter.filter(
                        (member) =>
                            6 <= this.ageMember(member.dob) &&
                            this.ageMember(member.dob) <= 17
                    );
                }
                if (this.ageSearch == "18-40") {
                    console.log(this.ageSearch);
                    this.memberFilter = this.memberFilter.filter(
                        (member) =>
                            18 <= this.ageMember(member.dob) &&
                            this.ageMember(member.dob) <= 40
                    );
                }
                if (this.ageSearch == "41-60") {
                    console.log(this.ageSearch);
                    this.memberFilter = this.memberFilter.filter(
                        (member) =>
                            41 <= this.ageMember(member.dob) &&
                            this.ageMember(member.dob) <= 60
                    );

                }
                if (this.ageSearch == ">60") {
                    console.log(this.ageSearch);
                    this.memberFilter = this.memberFilter.filter(
                        (member) =>
                            this.ageMember(member.dob) && this.ageMember(member.dob) > 60
                    );
                }
            }
            this.numberMaleFilter = 0;
            this.numberFemaleFilter = 0;
            this.numberAliveFilter = 0;
            this.numberDiedFilter = 0;
            this.age0to5Filter = 0;
            this.age6to17Filter = 0;
            this.age18to40Filter = 0;
            this.age41to60Filter = 0;
            this.age61upFilter = 0;
            this.monthFilter = 0;
            this.monthDobFilter = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            for (let i = 0; i < this.memberFilter.length; i++) {
                this.memberOldest.age = 0;
                this.memberOldestAlive.age = 0;
                if (this.memberFilter[i].gender == "male") {
                    this.numberMaleFilter += 1;
                }
                if (this.memberFilter[i].gender == "female") {
                    this.numberFemaleFilter += 1;
                }
                if (this.memberFilter[i].isDead == 0) {
                    this.numberAliveFilter += 1;
                }
                if (this.memberFilter[i].isDead == 1) {
                    this.numberDiedFilter += 1;
                }
                let month = 1;
                while (
                    new Date(this.formatDate(this.memberFilter[i].dob)).getMonth() + 1 !=
                    month
                ) {
                    month += 1;
                }
                this.monthDobFilter[month - 1] += 1;
                if (this.memberFilter[i].dob != null) {
                    if (
                        this.ageMember(this.memberFilter[i].dob) >= 0 &&
                        this.ageMember(this.memberFilter[i].dob) <= 5
                    ) {
                        this.age0to5Filter += 1;
                    }
                    if (
                        this.ageMember(this.memberFilter[i].dob) >= 6 &&
                        this.ageMember(this.memberFilter[i].dob) <= 17
                    ) {
                        this.age6to17Filter += 1;
                    }
                    if (
                        this.ageMember(this.memberFilter[i].dob) >= 18 &&
                        this.ageMember(this.memberFilter[i].dob) <= 40
                    ) {
                        this.age18to40Filter += 1;
                    }
                    if (
                        this.ageMember(this.memberFilter[i].dob) >= 41 &&
                        this.ageMember(this.memberFilter[i].dob) <= 60
                    ) {
                        this.age41to60Filter += 1;
                        console.log(this.ageMember(this.memberFilter[i].dob))
                    }
                    if (this.ageMember(this.memberFilter[i].dob) >= 61) {
                        this.age61upFilter += 1;
                    }
                }
            }
        },
        formatDate(dateString) {
            let formattedDate;
            if (dateString != null) {
                if (dateString.length <= 10) {
                    const dateParts = dateString.split("-");
                    formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
                } else {
                    formattedDate = dateString;
                }
                const date = new Date(formattedDate);
                const year = date.getFullYear();
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const day = String(date.getDate()).padStart(2, "0");
                return `${year}-${month}-${day}`;
            } else {
                return null;
            }
        },
        getListMember() {
            HTTP.get("viewTree", {

                params: {
                    CodeID: this.CodeID,
                },
            })
                .then((response) => {
                    if (response.data.success == true) {
                        this.memberList = response.data.data;
                        this.memberFilter = this.memberList;
                        this.takeInforList();
                    }
                })
                .catch((e) => {
                    console.log(e);
                });
        },
    },
    mounted() {
        if (localStorage.getItem("CodeID") != null) {
            this.CodeID = localStorage.getItem("CodeID");
        } else {
            if (localStorage.getItem("accountID") != null) {
                this.$router.push("/familycode");
            } else {
                this.$router.push("/login");
            }
        }
        this.getListMember();
    },
};
</script>
<style>
.m-5.bg-colored {
    background-color: #ffffff;
    border-radius: 0.375rem;
}

.col-2.filter {
    margin-right: 40px;
}

h1.pt-4 {
    font-size: 35px;
    padding-left: 24px;
}

h2.pt-4 {
    font-size: 35px;
    padding-left: 24px;
}

.click-color {
    background-color: #e8c77b;
    width: 150px;
    height: 50px;
}

.form-select.filter {
    width: 150px;
    height: 50px;
}

#my-chart-id {
    width: 400px;
}

.text-decoration-underline {
    font-size: 30px;
}
</style>