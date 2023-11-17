<template>
    <div class="event-screen d-flex flex-row w-100 p-0">
        <div class="col-6 h-100 calendar">
            <div class="d-flex flex-row">
                <select @change="getDayOfMonth()" v-model="currentMonth" class="form-control">
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
                <select @change="getDayOfMonth()" v-model="currentYear" class="form-control">
                    <option v-for="year in listOfYear" :key="year">{{year}}</option>
                </select>
            </div>
            <div class="d-flex flex-row">
                <div class="col-6 text-dark">Tháng {{this.currentMonth}} - {{this.currentYear}}</div>
                <div class="btn bg-primary text-white" @click="setUpDate(),getDayOfMonth()">Hôm nay</div>
            </div>
            <table border="1" class="thang" cellpadding="2" cellspacing="2" width="100%">
                <tbody><tr class="ngaytuan" style="font-size: 25px;font-weight: bold;background-color: #0088ff;">
                <td>CN</td> <td>T2</td> <td>T3</td> <td>T4</td> <td>T5</td> <td>T6</td> <td>T7</td>
                </tr>
                    <tr class="normal" v-for="(week,weekIndex) in dayOfMonth" :key="weekIndex">
                        <td class="ngaythang" v-for="(day,dayIndex) in week" :key="dayIndex" 
                        :class="{choose: dayIndex == indexClickDay && weekIndex == indexClickWeek }" @click="clickDate(dayIndex,weekIndex)"
                        :style="{color: day.solar.month != currentMonth ? '#bebebe': 'black'}">
                            <div v-if="day.solar.date == 1" class="cn" @click="setChooseDate(day.solar.date,day.solar.month,day.solar.year)">{{ day.solar.date+"/"+(day.solar.month+1) }}</div>
                            <div v-if="day.solar.date != 1" class="cn" @click="setChooseDate(day.solar.date,day.solar.month,day.solar.year)">{{ day.solar.date }}</div>
                            <div>Ngày tết âm lịch</div>
                            <div v-if="day.lunar.date == 1" class="am" @click="setChooseDate(day.solar.date,day.solar.month,day.solar.year)">{{ day.lunar.date+"/"+(day.lunar.month+1) }}</div>
                            <div v-if="day.lunar.date != 1" class="am" @click="setChooseDate(day.solar.date,day.solar.month,day.solar.year)">{{ day.lunar.date }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-6 event-list d-flex flex-column">
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
            <div class="button-list d-flex flex-row mt-3">
                <div @click="showAddEventModal()" class="btn bg-primary text-white d-flex align-items-center">Thêm sự kiện
                </div>
                <div class="btn bg-primary text-white d-flex align-items-center item">Xuất excel</div>
            </div>
            <div class="mt-3" style="height: 560px; overflow-y: auto;">
                <table class="table table-eventlist eventlist-list m-0">
                    <thead style="position: sticky; top: 0">
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

        <div class="add-event-container">
            <modal name="add-event-modal">
                <div class="form-group h-100">
                    <div class="w-100 h-100 modal-bg position-relative">
                        <div class="d-flex flex-row w-100 align-items-center position-relative">
                            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Thêm
                                sự kiện</div>
                            <div class="close-add-form" @click="closeAddEventModal()">
                                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                                    <path
                                        d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                                </svg>
                            </div>
                        </div>
                        <div class="d-flex flex-column" style="height: calc(100% - 50px);">
                            <div class="item mt-2 px-2 d-flex flex-row">
                                <div class="d-flex flex-row" style="flex-grow: 1;">
                                    <div class="d-flex align-items-center" style="padding-right: 8px;">Tên sự kiện</div>
                                    <div class="d-flex h-100" style="flex-grow: 1;">
                                        <input type="text" class="form-control h-100 w-100" />
                                    </div>
                                </div>
                                <div class="d-flex flex-row">
                                    <div class="d-flex align-items-center px-2">Kiểu lặp lại</div>
                                    <div>
                                        <select class="form-control h-100">
                                            <option>Tất cả</option>
                                            <option>Không lặp lại</option>
                                            <option>Tháng</option>
                                            <option>Năm</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 px-2" style="height: 120px;">
                                <textarea class="w-100 h-100 text-area description" placeholder="Mô tả"></textarea>
                            </div>
                            <div class="item mt-2 px-2 d-flex flex-row">
                                <div class="d-flex align-items-center" style="width: 38px; padding-right: 8px;">Từ</div>
                                <input class="form-control time-input" type="number" min="00" max="23" />
                                <div class="d-flex align-items-center">:</div>
                                <input class="form-control time-input" type="number" min="00" max="59" />
                                <div class="d-flex" style="flex-grow: 1;">
                                    <input type="date" class="form-control h-100 w-100" />
                                </div>
                            </div>
                            <div class="item mt-2 px-2 d-flex flex-row">
                                <div class="d-flex align-items-center" style="width: 38px; padding-right: 8px;">Đến</div>
                                <input class="form-control time-input" type="number" min="00" max="23" />
                                <div class="d-flex align-items-center">:</div>
                                <input class="form-control time-input" type="number" min="00" max="59" />
                                <div class="d-flex" style="flex-grow: 1;">
                                    <input type="date" class="form-control h-100 w-100" />
                                </div>
                            </div>
                            <div class="item mt-2 px-2 d-flex flex-row">
                                <div class="d-flex flex-row" style="flex-grow: 1;">
                                    <div class="d-flex align-items-center" style="padding-right: 8px;">Địa điểm</div>
                                    <div class="d-flex h-100" style="flex-grow: 1; padding-right: 8px;">
                                        <input type="text" class="form-control h-100 w-100" />
                                    </div>
                                    <div class="h-100 d-flex flex-row align-items-center" style="padding-right: 8px;">
                                        <input class="form-check-input m-0" type="checkbox" />
                                        <div style="padding-left: 8px;">Sự kiện quan trọng</div>
                                    </div>
                                </div>
                            </div>
                            <div class="mt-2 px-2" style="height: 120px;">
                                <textarea class="w-100 h-100 text-area" placeholder="Ghi chú"></textarea>
                            </div>
                        </div>
                        <div class="modal-footer position-absolute w-100" style="bottom: 0;">
                            <div class="bg-primary text-white btn mx-2">Lưu</div>
                        </div>
                    </div>
                </div>
            </modal>
        </div>
        <modal name="edit-event-modal">
        </modal>
    </div>
</template>

<script>
import { Calendar } from "vietnamese-lunar-calendar";
export default {
    data(){
        return{
            calendar:null,
            dayOfMonth:[],
            listOfYear:[],
            currentMonth: null,
            currentYear: null,

            chooseDate: null,
            indexClickDay:null,
            indexClickWeek:null,
        }
    },
    methods: {
        clickDate(indexDay,indexWeek){
            this.indexClickDay = indexDay
            this.indexClickWeek = indexWeek
        },
        setChooseDate(day,month,year){
            this.chooseDate = new Date();
            this.chooseDate.setFullYear(year);
            this.chooseDate.setMonth(month-1); // Tháng bắt đầu từ 0, nên 10 tương ứng với tháng 11
            this.chooseDate.setDate(day);
        },
        setUpDate(){
            const dateNow = new Date();
            this.currentMonth = dateNow.getMonth()+1;
            this.currentYear = dateNow.getFullYear();
            this.listOfYear = [];
            for(let i = 1500 ;i < 2199;i++){
                this.listOfYear.push(i)
            }
        },
        getDayOfMonth(){
            this.dayOfMonth = new Calendar(this.currentYear,this.currentMonth).weeks;
            console.log(this.dayOfMonth)
        },
        showAddEventModal() {
            this.$modal.show("add-event-modal")
        },
        closeAddEventModal() {
            this.$modal.hide("add-event-modal")
        },
        showEditEventModal() {
            this.$modal.show("edit-event-modal")
        },
        closeEditEventModal() {
            this.$modal.hide("edit-event-modal")
        },
    },
    mounted(){
        this.setUpDate();
        this.getDayOfMonth();
    }
}
</script>
<style>
table {
width: 100%;
border-collapse: collapse;
margin-bottom: 20px; /* Thêm khoảng cách giữa bảng và các phần tử khác */
color: black;
}

th, td {
border: 1px solid #ddd; /* Đường viền cho các ô */
padding: 8px; /* Khoảng cách giữa nội dung và đường viền */
text-align: left; /* Căn lề nội dung sang trái */
}

.cn{
    font-size: 23px;
}
td.ngaythang.choose{
    background-color: lightblue;
}
td.ngaythang:hover{
    cursor: pointer;
}
  </style>