<template>
    <div class="event-screen d-flex flex-row w-100 p-0" style="overflow-y: auto;">
        <div class="col-6 h-100 calendar">
            <div class="h-100 p-3" style="background-color: #f2f2f2;">
                <div class="d-flex flex-row" style="height: 48px;">
                    <div class="h-100 w-100" style="padding-right: 4px;">
                        <select @change="getDayOfMonth()" v-model="currentMonth" class="form-control h-100 w-100">
                            <option value="1">Tháng 01</option>
                            <option value="2">Tháng 02</option>
                            <option value="3">Tháng 03</option>
                            <option value="4">Tháng 04</option>
                            <option value="5">Tháng 05</option>
                            <option value="6">Tháng 06</option>
                            <option value="7">Tháng 07</option>
                            <option value="8">Tháng 08</option>
                            <option value="9">Tháng 09</option>
                            <option value="10">Tháng 10</option>
                            <option value="11">Tháng 11</option>
                            <option value="12">Tháng 12</option>
                        </select>
                    </div>
                    <div class="h-100 w-100" style="padding-left: 4px;">
                        <select @change="getDayOfMonth()" v-model="currentYear" class="form-control h-100 w-100">
                            <option v-for="year in listOfYear" :key="year">{{ year }}</option>
                        </select>
                    </div>
                </div>
                <div class="d-flex flex-row pt-3 mt-2"
                    style="height: 48px; background-color: #FFFFFF; border-radius: 0.375rem;">
                    <div class="col-6 text-dark d-flex align-items-center h-100">
                        <div class="w-100 d-flex justify-content-center">Tháng {{ this.currentMonth }} - {{
                            this.currentYear }}</div>
                    </div>
                    <div class="col-6 d-flex align-items-center justify-content-center h-100"
                        @click="setUpDate(), getDayOfMonth()">
                        <div class="btn bg-primary text-white h-100 d-flex align-items-center">Hôm nay</div>
                    </div>
                </div>
                <div class="pt-3" style="height: calc(100% - 96px); background-color: #FFFFFF;">
                    <div class="h-100">
                        <table class="table table-eventlist eventlist-list m-0" style="height: 610px;">
                            <thead style="position: sticky; top: 0;">
                                <tr class="eventlist-item">
                                    <th class="eventlist-list-th" scope="col">CN</th>
                                    <th class="eventlist-list-th" scope="col">T2</th>
                                    <th class="eventlist-list-th" scope="col">T3</th>
                                    <th class="eventlist-list-th" scope="col">T4</th>
                                    <th class="eventlist-list-th" scope="col">T5</th>
                                    <th class="eventlist-list-th" scope="col">T6</th>
                                    <th class="eventlist-list-th" scope="col">T7</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="normal" v-for="(week, weekIndex) in dayOfMonth" :key="weekIndex">
                                    <td class="ngaythang" v-for="(day, dayIndex) in week" :key="dayIndex"
                                        :class="{ choose: dayIndex == indexClickDay && weekIndex == indexClickWeek }"
                                        @click="clickDate(dayIndex, weekIndex)"
                                        :style="{ color: day.solar.month != currentMonth ? '#bebebe' : 'black' }">
                                        <div v-if="day.solar.date == 1" class="cn"
                                            @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{
                                                day.solar.date + "/" + (day.solar.month + 1) }}</div>
                                        <div v-if="day.solar.date != 1" class="cn"
                                            @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{
                                                day.solar.date
                                            }}</div>
                                        <div>Ngày tết âm lịch</div>
                                        <div v-if="day.lunar.date == 1" class="am"
                                            @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{
                                                day.lunar.date + "/" + (day.lunar.month + 1) }}</div>
                                        <div v-if="day.lunar.date != 1" class="am"
                                            @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)">{{
                                                day.lunar.date
                                            }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-6 h-100 event-list">
            <div class="h-100 p-3" style="background-color: #f2f2f2;">
                <div class="search-filter d-flex flex-row position-relative">
                    <div class="search d-flex">
                        <input type="text" class="form-control h-100" placeholder="Nhập tên sự kiện..." />
                    </div>
                    <div class="d-flex flex-row" style="justify-content: end;">
                        <div class="item">
                            <select class="form-control h-100">
                                <option>Kiểu lịch</option>
                                <option>Tất cả</option>
                                <option>Lịch âm</option>
                                <option>Lịch dương</option>
                            </select>
                        </div>
                        <div class="item">
                            <select class="form-control h-100">
                                <option>Kiểu lặp lại</option>
                                <option>Tất cả</option>
                                <option>Không lặp lại</option>
                                <option>Tháng</option>
                                <option>Năm</option>
                            </select>
                        </div>
                        <div class="item">
                            <select class="form-control h-100">
                                <option>Trạng thái</option>
                                <option>Tất cả</option>
                                <option>Chưa kết thúc</option>
                                <option>Đã kết thúc</option>
                            </select>
                        </div>
                        <div class="btn bg-primary text-white d-flex align-items-center item">Làm mới</div>
                    </div>
                </div>
                <div class="button-list d-flex flex-row pt-3 mt-2">
                    <div @click="showAddEventModal()" class="btn bg-primary text-white d-flex align-items-center">Thêm sự
                        kiện
                    </div>
                    <div class="btn bg-primary text-white d-flex align-items-center item">Xuất excel</div>
                </div>
                <div class="pt-3" style="height: calc(100% - 96px);">
                    <div style="overflow-y: auto; height: 610px">
                        <table class="table table-eventlist eventlist-list m-0">
                            <thead style="position: sticky; top: 0;">
                                <tr class="eventlist-item">
                                    <th class="eventlist-list-th" scope="col">#</th>
                                    <th class="eventlist-list-th" scope="col">Tên sự kiện</th>
                                    <th class="eventlist-list-th" scope="col">Thời gian bắt đầu</th>
                                    <th class="eventlist-list-th" scope="col">Thời gian kết thúc</th>
                                    <th class="eventlist-list-th" scope="col">Địa điểm</th>
                                    <th class="eventlist-list-th" scope="col">Kiểu lặp lại</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item odd">
                                    <td>1</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                                <tr @click="showEditEventModal()" class="eventlist-item eventlist-table-item even">
                                    <td>2</td>
                                    <td>AAAA</td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>
                                        <div>01-01-2000 (DL)</div>
                                        <div>02-01-2000 (AL)</div>
                                    </td>
                                    <td>AAAA</td>
                                    <td>Tháng</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Calendar } from "vietnamese-lunar-calendar";
import { HTTP } from "../assets/js/baseAPI.js";
export default {
    data() {
        return {
            eventFamily: {
                eventName: null,
                typeLoop: null,
                description: null,
                hourFrom: null,
                hourTo: null,
                startDate: null,
                endDate: null,
                place: null,
                note: null,
            },

            calendar: null,
            dayOfMonth: [],
            listOfYear: [],
            currentMonth: null,
            currentYear: null,

            chooseDate: null,
            indexClickDay: null,
            indexClickWeek: null,

            currentEventId: null,
        };
    },
    methods: {
        addEvent() {
            HTTP.post("addEvent", {
                EventName: this.eventFamily.eventName,
                CodeID: 258191,
                StartDate: this.eventFamily.startDate,
                EndDate: this.eventFamily.endDate,
                Description: this.eventFamily.description,
                Note: this.eventFamily.note,
                Place: this.eventFamily.place,
            })
                .then(() => {
                    console.log("da vao");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        updateEvent() {
            HTTP.put("updateEvent", {
                EventID: this.currentEventId,
                EventName: this.eventFamily.eventName,
                StartDate: this.eventFamily.startDate,
                EndDate: this.eventFamily.endDate,
                Description: this.eventFamily.description,
                Note: this.eventFamily.note,
                Place: this.eventFamily.place,
            })
                .then(() => {
                    console.log("da vao");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        removeEvent() {
            HTTP.delete("removeEvent", {
                params: {
                    EventID: this.currentEventId,
                },
            })
                .then(() => {
                    console.log("da vao");
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        clickDate(indexDay, indexWeek) {
            this.indexClickDay = indexDay;
            this.indexClickWeek = indexWeek;
        },
        setChooseDate(day, month, year) {
            this.chooseDate = new Date();
            this.chooseDate.setFullYear(year);
            this.chooseDate.setMonth(month - 1); // Tháng bắt đầu từ 0, nên 10 tương ứng với tháng 11
            this.chooseDate.setDate(day);
        },
        setUpDate() {
            const dateNow = new Date();
            this.currentMonth = dateNow.getMonth() + 1;
            this.currentYear = dateNow.getFullYear();
            this.listOfYear = [];
            for (let i = 1500; i < 2199; i++) {
                this.listOfYear.push(i);
            }
        },
        getDayOfMonth() {
            this.dayOfMonth = new Calendar(this.currentYear, this.currentMonth).weeks;
        },
        showAddEventModal() {
            this.$modal.show("add-event-modal");
        },
        closeAddEventModal() {
            this.$modal.hide("add-event-modal");
        },
        showEditEventModal() {
            this.$modal.show("edit-event-modal");
        },
        closeEditEventModal() {
            this.$modal.hide("edit-event-modal");
        },
    },
    mounted() {
        this.setUpDate();
        this.getDayOfMonth();
    },
};
</script>
<style>
table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    /* Thêm khoảng cách giữa bảng và các phần tử khác */
    color: black;
}

th,
td {
    border: 1px solid #ddd;
    /* Đường viền cho các ô */
    padding: 8px;
    /* Khoảng cách giữa nội dung và đường viền */
    text-align: left;
    /* Căn lề nội dung sang trái */
}

.cn {
    font-size: 23px;
}

td.ngaythang.choose {
    background-color: lightblue;
}

td.ngaythang:hover {
    cursor: pointer;
}
</style>