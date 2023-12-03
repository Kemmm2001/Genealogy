<!-- phùng việt khôi -->
<template>
  <div class="event-screen d-flex flex-row w-100 p-0" style="overflow-y: auto;background-color: #bf831526">
    <div class="col-6 h-100 calendar">
      <div class="h-100 p-3 bg-colored" style="background-color: #f2f2f2;">
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
        <div class="d-flex flex-row pt-3 mt-2" style="height: 48px; background-color: #FFFFFF; border-radius: 0.375rem;">
          <div class="col-6 text-dark d-flex align-items-center h-100">
            <div class="w-100 d-flex justify-content-center">Tháng {{ this.currentMonth }} - {{ this.currentYear }}</div>
          </div>
          <div class="col-6 d-flex align-items-center justify-content-center h-100" @click="setUpDate(), getDayOfMonth()">
            <div class="btn bg-primary text-white h-100 d-flex align-items-center">Hôm nay</div>
          </div>
        </div>
        <div class="pt-3" style="background-color: #FFFFFF;">
          <div class="h-100">
            <table class="table table-eventlist eventlist-list m-0">
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
                    <div v-if="!checkDateEvent(`${day.solar.year}-${day.solar.month}-${day.solar.date}`)">
                      <div v-if="day.solar.date == 1" class="cn"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.solar.date + "/"
                          + (day.solar.month) }}</a></div>
                      <div v-if="day.solar.date != 1" class="cn"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.solar.date
                        }}</a></div>
                      <div v-if="day.lunar.date == 1" class="am"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.lunar.date + "/"
                          + (day.lunar.month) }}</a></div>
                      <div v-if="day.lunar.date != 1" class="am"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.lunar.date
                        }}</a></div>
                    </div>
                    <div v-if="checkDateEvent(`${day.solar.year}-${day.solar.month}-${day.solar.date}`)"
                      @click="getListEventByDate(`${day.solar.year}-${day.solar.month}-${day.solar.date}`), showEventModal()">
                      <div v-if="day.solar.date == 1" class="cn"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.solar.date + "/"
                          + (day.solar.month) }}</a></div>
                      <div v-if="day.solar.date != 1" class="cn"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.solar.date
                        }}</a></div>
                      <div v-if="day.lunar.date == 1" class="am"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.lunar.date + "/"
                          + (day.lunar.month) }}</a></div>
                      <div v-if="day.lunar.date != 1" class="am"
                        @click="setChooseDate(day.solar.date, day.solar.month, day.solar.year)"><a>{{ day.lunar.date
                        }}</a></div>
                      <div>Có sự kiện</div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 h-100 event-list">
      <div class="h-100 p-3 bg-colored" style="background-color: #f2f2f2;">
        <div class="search-filter d-flex flex-row position-relative">
          <div class="search d-flex">
            <input v-model="keySearch" type="text" class="form-control h-100" placeholder="Nhập tên sự kiện..."
              @change="searchEvent()" />
          </div>
          <div class="d-flex flex-row" style="justify-content: end;">
            <div class="item">
              <select v-model="filterRepeat" class="form-control h-100" @change="filterEvent()">
                <option :value="null">Kiểu lặp lại</option>
                <option v-for="list in listRepeat" :key="list.id" :value="list.RepeatID">{{ list.RepeatName }}</option>
              </select>
            </div>
            <div class="item">
              <select v-model="filterStatus" class="form-control h-100" @change="filterEvent()">
                <option :value="null">Trạng thái</option>
                <option value="1">Chưa kết thúc</option>
                <option value="0">Đã kết thúc</option>
              </select>
            </div>
            <div class="btn bg-primary text-white d-flex align-items-center item">Làm mới</div>
          </div>
        </div>
        <div class="button-list d-flex flex-row pt-3 mt-2">
          <div @click="showAddEventModal()" class="btn bg-primary text-white d-flex align-items-center">Thêm sự kiện</div>
          <div class="btn bg-primary text-white d-flex align-items-center item">Xuất excel</div>
          <div @click="mailSelected = false; notiSelected = !notiSelected"
            class="btn bg-primary text-white d-flex align-items-center item">
            Thông báo</div>
        </div>
        <div class="pt-3" style="height: calc(100% - 96px);">
          <div v-if="!notiSelected && !mailSelected" class="h-100" style="overflow-y: auto;">
            <table class="table table-eventlist eventlist-list m-0">
              <thead style="position: sticky; top: 0;">
                <tr class="eventlist-item">
                  <th class="eventlist-list-th" scope="col">#</th>
                  <th class="eventlist-list-th" scope="col">Tên sự kiện</th>
                  <th class="eventlist-list-th" scope="col">Thời gian bắt đầu</th>
                  <th class="eventlist-list-th" scope="col">Thời gian kết thúc</th>
                  <th class="eventlist-list-th" scope="col">Địa điểm</th>
                  <th class="eventlist-list-th" scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr style="cursor: pointer;" class="eventlist-item eventlist-table-item odd"
                  v-for="(event, index) in listEventFilter" :key="event.EventID">
                  <td @click="showEditEventModal(event.EventID)">{{ index + 1 }}</td>
                  <td @click="showEditEventModal(event.EventID)">{{ event.EventName }}</td>
                  <td @click="showEditEventModal(event.EventID)">
                    <div>{{ formattedCreatedAt(event.StartDate) }} (DL)</div>
                    <div>{{ formattedCreatedAt(convertSolarToLunar(event.StartDate)) }} (AL)</div>
                  </td>
                  <td @click="showEditEventModal(event.EventID)">
                    <div>{{ formattedCreatedAt(event.EndDate) }} (DL)</div>
                    <div>{{ formattedCreatedAt(convertSolarToLunar(event.EndDate)) }} (AL)</div>
                  </td>
                  <td @click="showEditEventModal(event.EventID)">{{ event.Place }}</td>
                  <td @click="showParticipantList()">
                    <div class="">Danh sách thành viên</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-if="notiSelected && !mailSelected" class="h-100">
            <div class="d-flex flex-column mt-2" style="height: 100%; overflow-y: auto;">
              <div class="sent-mail d-flex flex-row">
                <div class="col-3 d-flex align-items-center" style="height: 48px; padding-left: 8px">Sự kiện</div>
                <div class="col-6 h-100 d-flex align-items-center position-relative">
                  <div class="mail-content-prev">Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                </div>
                <div class="col-3 d-flex align-items-center" style="justify-content: end; padding-right: 8px;">1/1/2000
                </div>
              </div>
              <div class="sent-mail d-flex flex-row">
                <div class="col-3 d-flex align-items-center" style="height: 48px; padding-left: 8px">Sự kiện</div>
                <div class="col-6 h-100 d-flex align-items-center position-relative">
                  <div class="mail-content-prev">Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                </div>
                <div class="col-3 d-flex align-items-center" style="justify-content: end; padding-right: 8px;">1/1/2000
                </div>
              </div>
              <div class="sent-mail d-flex flex-row">
                <div class="col-3 d-flex align-items-center" style="height: 48px; padding-left: 8px">Sự kiện</div>
                <div class="col-6 h-100 d-flex align-items-center position-relative">
                  <div class="mail-content-prev">Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                </div>
                <div class="col-3 d-flex align-items-center" style="justify-content: end; padding-right: 8px;">1/1/2000
                </div>
              </div>
              <div class="sent-mail d-flex flex-row">
                <div class="col-3 d-flex align-items-center" style="height: 48px; padding-left: 8px">Sự kiện</div>
                <div class="col-6 h-100 d-flex align-items-center position-relative">
                  <div class="mail-content-prev">Aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</div>
                </div>
                <div class="col-3 d-flex align-items-center" style="justify-content: end; padding-right: 8px;">1/1/2000
                </div>
              </div>
            </div>
          </div>
          <div v-if="!notiSelected && mailSelected" class="h-100">
            <div class="create-mail" :class="{ expanded: mailSelected }">
              <div class="w-100 h-100 d-flex flex-column">
                <div class="create-mail-title d-flex align-items-center justify-content-center position-relative">
                  <div>Email mới</div>
                  <div class="create-mail-close position-absolute" @click="mailSelected = false; notiSelected = true">
                    <div class="position-relative h-100 w-100">
                      <svg class="create-mail-close-icon position-absolute" xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 384 512">
                        <path
                          d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="create-mail-topic px-2 w-100">
                  <input v-model="subjectEmail" type="text" class="mail-topic w-100 p-2" placeholder="Chủ đề email" />
                </div>
                <div class="create-mail-content px-2 w-100">
                  <textarea v-model="contentEmail" style="resize: none; outline: none; border: none;"
                    class="h-100 w-100 p-2" placeholder="Viết gì đó..."></textarea>
                </div>
              </div>
            </div>
            <div class="create-mail-footer d-flex flex-row px-3 py-2 w-100" style="justify-content: end;">
              <div class="d-flex flex-row" @click="sendEmailToMember()">
                <div style="border-radius: 50% 0 0 50%; background: #007bff; width: 25px;"></div>
                <div class="btn d-flex align-items-center justify-content-center"
                  style="padding: 4px 12px; background: #007bff; color: #FFFFFF; border-radius: 0; outline: none; border: none;">
                  Gửi</div>
                <div style="border-radius: 0 50% 50% 0; background: #007bff; width: 25px;"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="add-event-container">
      <modal name="add-event-modal">
        <div class="form-group h-100">
          <div class="w-100 h-100 modal-bg position-relative">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">{{ titleModal }}
              </div>
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
                  <div class="d-flex align-items-center" style="padding-right: 8px;">Tên sự kiện(*)</div>
                  <div class="d-flex h-100" style="flex-grow: 1;">
                    <input v-model="eventFamily.EventName" type="text" class="form-control h-100 w-100" />
                  </div>
                </div>
                <div class="d-flex flex-row">
                  <div class="d-flex align-items-center px-2">Kiểu lặp lại</div>
                  <div>
                    <select v-model="eventFamily.RepeatID" class="form-control h-100">
                      <option v-for="list in listRepeat" :key="list.id" :value="list.RepeatID">{{ list.RepeatName }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="mt-2 px-2" style="height: 120px;">
                <textarea v-model="eventFamily.Description" class="w-100 h-100 text-area description"
                  placeholder="Mô tả"></textarea>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 38px; margin-right: 8px;">Từ(*)</div>
                <input v-model="startHour" class="form-control time-input" type="number" min="00" max="23" />
                <div class="d-flex align-items-center">:</div>
                <input v-model="startMinute" class="form-control time-input" type="number" min="00" max="59" />
                <div class="d-flex" style="flex-grow: 1;">
                  <input v-model="startDate" type="date" class="form-control h-100 w-100" />
                </div>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex align-items-center" style="width: 38px; margin-right: 8px;">Đến(*)</div>
                <input v-model="endHour" class="form-control time-input" type="number" min="00" max="23" />
                <div class="d-flex align-items-center">:</div>
                <input v-model="endMinute" class="form-control time-input" type="number" min="00" max="59" />
                <div class="d-flex" style="flex-grow: 1;">
                  <input v-model="endDate" type="date" class="form-control h-100 w-100" />
                </div>
              </div>
              <div class="item mt-2 px-2 d-flex flex-row">
                <div class="d-flex flex-row" style="flex-grow: 1;">
                  <div class="d-flex align-items-center" style="padding-right: 8px;">Địa điểm(*)</div>
                  <div class="d-flex h-100" style="flex-grow: 1; padding-right: 8px;">
                    <input v-model="eventFamily.Place" type="text" class="form-control h-100 w-100" />
                  </div>
                  <div class="h-100 d-flex flex-row align-items-center" style="padding-right: 8px;">
                    <input v-model="eventFamily.IsImportant" class="form-check-input m-0" type="checkbox" />
                    <div style="padding-left: 8px;">Sự kiện quan trọng</div>
                  </div>
                </div>
              </div>
              <div class="mt-2 px-2" style="height: 120px;">
                <textarea v-model="eventFamily.Note" class="w-100 h-100 text-area" placeholder="Ghi chú"></textarea>
              </div>
            </div>
            <div class="modal-footer position-absolute w-100" style="bottom: 0;">
              <div v-if="isAdd" @click="addEvent()" class="bg-primary text-white btn mx-2">Thêm</div>
              <div v-else @click="updateEvent()" class="bg-primary text-white btn mx-2">Lưu</div>
              <div @click="removeEvent()" class="bg-danger text-white btn mx-2">Xóa sự kiện</div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <div class="participant-container">
      <modal name="participant-list">
        <div class="form-group h-100">
          <div class="w-100 h-100 modal-bg position-relative">
            <div class="d-flex flex-row w-100 align-items-center position-relative">
              <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Danh sách thành
                viên gia tộc</div>
              <div class="close-add-form" @click="closeParticipantList()">
                <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                </svg>
              </div>
            </div>
            <div class="d-flex flex-row" style="height: calc(100% - 50px);">
              <div class="col-6 mt-2 d-flex flex-column" style="padding-left: 8px; padding-right: 4px;">
                <div class="item d-flex justify-content-center" style="background-color: aliceblue;">Có tham gia</div>
                <div class="" style="overflow-y: auto; height: 480px;">
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                </div>
              </div>

              <div class="col-6 mt-2 d-flex flex-column" style="padding-left: 4px; padding-right: 8px;">
                <div class="item d-flex justify-content-center" style="background-color: aliceblue;">Không tham gia</div>
                <div class="" style="overflow-y: auto; height: 480px;">
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                  <div class="item odd">AAAAAAAAAAAAAAAA</div>
                  <div class="item even">BAAAAAAAAAAAAAAA</div>
                </div>
              </div>
            </div>
            <div class="modal-footer position-absolute w-100" style="bottom: 0;">
              <div @click="closeParticipantList()" class="bg-secondary text-white btn mx-2">Đóng</div>
            </div>
          </div>
        </div>
      </modal>
    </div>

    <div class="event-modal-container">
      <modal name="event-modal">
        <div class="w-100 h-100 add-head-modal">
          <div class="d-flex flex-row w-100 align-items-center position-relative">
            <div class="col-md-12 modal-title d-flex align-items-center justify-content-center w-100">Sự kiện trong ngày
              {{ formatDate(dateSelected) }}</div>
            <div class="close-add-form" @click="closeEventModal()">
              <svg class="close-add-form-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>
          </div>
          <div class="w-100 d-flex flex-column align-items-center justify-content-center"
            style="height: calc(100% - 50px);">
            <div class="d-flex h-100 align-items-center px-3" style="overflow-y: auto; font-size: 19px;">
              <table class="table table-eventlist eventlist-list m-0">
                <thead style="position: sticky; top: 0;">
                  <tr class="eventlist-item">
                    <th class="eventlist-list-th" scope="col">#</th>
                    <th class="eventlist-list-th" scope="col">Tên sự kiện</th>
                    <th class="eventlist-list-th" scope="col">Thời gian bắt đầu</th>
                    <th class="eventlist-list-th" scope="col">Thời gian kết thúc</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style="cursor: pointer;" class="eventlist-item eventlist-table-item odd"
                    v-for="(event, index) in listEventByDate" :key="event.EventID">
                    <td>{{ index + 1 }}</td>
                    <td>{{ event.EventName }}</td>
                    <td>
                      <div>{{ formattedCreatedAt(event.StartDate) }} (DL)</div>
                      <div>{{ formattedCreatedAt(convertSolarToLunar(event.StartDate)) }} (AL)</div>
                    </td>
                    <td>
                      <div>{{ formattedCreatedAt(event.EndDate) }} (DL)</div>
                      <div>{{ formattedCreatedAt(convertSolarToLunar(event.EndDate)) }} (AL)</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import Snackbar from "awesome-snackbar";
import { Calendar } from "vietnamese-lunar-calendar";
import { HTTP } from "../assets/js/baseAPI.js";
import { LunarDate } from "vietnamese-lunar-calendar";
//import moment from 'moment-timezone';
require('moment-timezone');
export default {
  data() {
    return {
      eventFamily: {
        EventID: null,
        EventName: null,
        Status: 1,
        StartDate: null,
        EndDate: null,
        Description: null,
        IsImportant: null,
        Note: null,
        Place: null,
        RepeatID: 1,
      },
      startHour: null,
      startMinute: null,
      startDate: null,

      filterStatus: null,
      filterRepeat: null,

      isAdd: false,
      endHour: null,
      endMinute: null,
      endDate: null,
      keySearch: null,

      titleModal: null,
      CodeID: null,
      calendar: null,
      dayOfMonth: [],
      listOfYear: [],
      currentMonth: null,
      currentYear: null,

      chooseDate: null,
      indexClickDay: null,
      indexClickWeek: null,

      currentEventId: null,
      listEvent: [],
      listEventFilter: [],
      listRepeat: null,
      listEventByDate: [],
      dateSelected: null,
      notiSelected: false,
      mailSelected: false,
    };
  },
  computed: {
    formattedCreatedAt() {
      return (dateString) => {
        const moment = require('moment-timezone');
        return moment(dateString).format("HH:mm:ss DD/MM/YYYY");
      };
    },
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${day}/${month}/${year}`;
    },
    convertTZ(date, tzString) {
      return new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", { timeZone: tzString }));
    },

    convertSolarToLunar(dateConvert) {
      let Dob = new Date(dateConvert);
      let month = new LunarDate(Dob).getMonth();
      let date = new LunarDate(Dob).getDate();
      let hour = new Date(dateConvert).getHours();
      let minute = new Date(dateConvert).getUTCMinutes();
      let second = new Date(dateConvert).getUTCSeconds();
      if (new LunarDate(Dob).getMonth() < 10) {
        month = "0" + new LunarDate(Dob).getMonth();
      }
      if (new LunarDate(Dob).getDate() < 10) {
        date = "0" + new LunarDate(Dob).getDate();
      }
      if (new Date(dateConvert).getHours() < 10) {
        hour = "0" + new Date(dateConvert).getHours();
      }
      if (new Date(dateConvert).getUTCMinutes() < 10) {
        minute = "0" + new Date(dateConvert).getUTCMinutes();
      }
      if (new Date(dateConvert).getUTCSeconds() < 10) {
        second = "0" + new Date(dateConvert).getUTCSeconds();
      }
      let result = new LunarDate(Dob).getYear() + "-" + month + "-" + date + "T" + hour + ":" + minute + ":" + second;
      return result
    },
    getListEventByDate(dateCheck) {
      this.listEventByDate = [];
      this.dateSelected = dateCheck;
      let startDate;
      let endDate;
      let selectedDate;
      for (let i = 0; i < this.listEvent.length; i++) {
        startDate = new Date(this.listEvent[i].StartDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(this.listEvent[i].EndDate);
        selectedDate = new Date(dateCheck).setHours(0, 0, 0, 0);
        let check = selectedDate >= startDate && selectedDate <= endDate;
        if (check == true) {
          this.listEventByDate.push(this.listEvent[i])
        }
      }
      if (dateCheck == '30/11/2023') {
        console.log(1)
      }
    },
    checkDateEvent(dateCheck) {
      let startDate;
      let endDate;
      let selectedDate;
      let check = false;
      for (let i = 0; i < this.listEvent.length; i++) {
        startDate = new Date(this.listEvent[i].StartDate);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(this.listEvent[i].EndDate);
        selectedDate = new Date(dateCheck);
        selectedDate.setHours(0, 0, 0, 0)
        check = selectedDate >= startDate && selectedDate <= endDate;
        if (check == true) {
          return true;
        }
      }
      return check;
      // Kiểm tra xem ngày được chọn có nằm trong khoảng hay không

    },
    NotificationsDelete(messagee) {
      new Snackbar(messagee, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#ff4d4d"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
    },
    NotificationsScuccess(messagee) {
      new Snackbar(messagee, {
        position: "bottom-right",
        theme: "light",
        style: {
          container: [
            ["background-color", "#1abc9c"],
            ["border-radius", "5px"],
          ],
          message: [["color", "#fff"]],
        },
      });
    },
    getListEvent() {
      HTTP.get("event", {
        params: {
          CodeID: this.CodeID,
        },
      })
        .then((response) => {
          if (response.data.success == true) {
            this.listEvent = response.data.data;
            this.listEventFilter = this.listEvent;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    getListRepeat() {
      HTTP.get("listRepeat")
        .then((response) => {
          if (response.data.success == true) {
            this.listRepeat = response.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    filterEvent() {
      if (this.filterStatus == null && this.filterRepeat == null) {
        console.log("vào đây");
        this.getListEvent();
      } else {
        HTTP.post("filter-event", {
          Status: this.filterStatus,
          RepeatID: this.filterRepeat,
          CodeID: this.CodeID,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.listEventFilter = respone.data.data;
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    searchEvent() {
      HTTP.post("searchEvent", {
        CodeID: this.CodeID,
        keySearch: this.keySearch,
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.listEventFilter = respone.data.data;
          }
        })
        .catch((e) => {
          console.log(e);
        });
    },
    addEvent() {
      this.eventFamily.StartDate = `${this.startDate} ${this.startHour}:${this.startMinute}`;
      this.eventFamily.EndDate = `${this.endDate} ${this.endHour}:${this.endMinute}`;
      if (
        this.eventFamily.EventName != null &&
        this.eventFamily.StartDate != null &&
        this.eventFamily.EndDate != null &&
        this.eventFamily.Place != null
      ) {
        HTTP.post("addEvent", {
          EventName: this.eventFamily.EventName,
          CodeID: this.CodeID,
          Status: 1,
          StartDate: this.eventFamily.StartDate,
          EndDate: this.eventFamily.EndDate,
          Description: this.eventFamily.Description,
          Note: this.eventFamily.Note,
          Place: this.eventFamily.Place,
          IsImportant: this.eventFamily.Description ? 1 : 0,
          RepeatID: this.eventFamily.RepeatID,
          isAdd: true,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.closeAddEventModal();
              this.getListEvent();
              this.NotificationsScuccess(respone.data.message);
            } else {
              this.NotificationsDelete(respone.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("bạn nhập thiếu trường (*)");
      }
    },
    updateEvent() {
      this.eventFamily.StartDate = `${this.startDate} ${this.startHour}:${this.startMinute}`;
      this.eventFamily.EndDate = `${this.endDate} ${this.endHour}:${this.endMinute}`;
      if (
        this.eventFamily.EventName != null &&
        this.eventFamily.StartDate != null &&
        this.eventFamily.EndDate != null &&
        this.eventFamily.Place != null
      ) {
        HTTP.put("updateEvent", {
          EventID: this.eventFamily.EventID,
          EventName: this.eventFamily.EventName,
          StartDate: this.eventFamily.StartDate,
          EndDate: this.eventFamily.EndDate,
          Description: this.eventFamily.Description,
          Note: this.eventFamily.Note,
          Place: this.eventFamily.Place,
          IsImportant: this.eventFamily.IsImportant,
          RepeatID: this.eventFamily.RepeatID,
          Status: this.eventFamily.Status,
        })
          .then((respone) => {
            if (respone.data.success == true) {
              this.NotificationsScuccess(respone.data.message);
              this.closeAddEventModal();
              this.getListEvent();
            } else {
              this.NotificationsDelete(respone.data.message);
            }
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.NotificationsDelete("bạn nhập thiếu trường (*)");
      }
    },
    removeEvent() {
      HTTP.delete("removeEvent", {
        params: {
          EventID: this.eventFamily.EventID,
        },
      })
        .then((respone) => {
          if (respone.data.success == true) {
            this.NotificationsDelete(respone.data.message);
            this.closeAddEventModal();
            this.listEvent();
          } else {
            this.NotificationsDelete(respone.data.message);
          }
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
      this.eventFamily = {};
      this.eventFamily.Status = 1;
      this.eventFamily.RepeatID = 1;
      this.startHour = null;
      this.startMinute = null;
      this.startDate = null;

      this.endHour = null;
      this.endMinute = null;
      this.endDate = null;
      this.isAdd = true;
      this.titleModal = "Thêm sự kiện";
      this.$modal.show("add-event-modal");
    },
    closeAddEventModal() {
      this.$modal.hide("add-event-modal");
    },
    showEditEventModal(id) {
      this.isAdd = false;
      this.eventFamily = {};
      this.titleModal = "sửa thông tin sự kiện";
      HTTP.get("inforEvent", {
        params: {
          EventID: id,
        },
      }).then((respone) => {
        if (respone.data.success == true) {
          let year;
          let month;
          let day;
          this.eventFamily = respone.data.data;
          this.eventFamily = this.eventFamily[0];
          console.log(this.eventFamily);
          this.startHour = new Date(this.eventFamily.StartDate).getHours();
          console.log(this.startHour)
          this.startMinute = new Date(
            this.eventFamily.StartDate
          ).getMinutes();
          year = new Date(this.eventFamily.StartDate).getFullYear();
          month = String(new Date(this.eventFamily.StartDate).getMonth() + 1).padStart(2, "0");
          day = String(new Date(this.eventFamily.StartDate).getDate()).padStart(2, "0");
          this.startDate = `${year}-${month}-${day}`

          this.endHour = new Date(this.eventFamily.EndDate).getHours();
          this.endMinute = new Date(this.eventFamily.EndDate).getMinutes();
          year = new Date(this.eventFamily.EndDate).getFullYear();
          month = String(new Date(this.eventFamily.EndDate).getMonth() + 1).padStart(2, "0");
          day = String(new Date(this.eventFamily.EndDate).getDate()).padStart(2, "0");
          this.endDate = `${year}-${month}-${day}`
          this.$modal.show("add-event-modal");
        }
      });
    },
    closeEditEventModal() {
      this.$modal.hide("edit-event-modal");
    },
    showParticipantList() {
      this.$modal.show("participant-list")
    },
    closeParticipantList() {
      this.$modal.hide("participant-list")
    },
    showEventModal() {
      this.$modal.show("event-modal")
    },
    closeEventModal() {
      this.$modal.hide("event-modal")
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
    this.setUpDate();
    this.getDayOfMonth();
    this.getListEvent();
    this.getListRepeat();
  },
};
</script>
<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  color: black;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.am a {
  font-size: 12px;
}

td.ngaythang.choose {
  background-color: lightblue;
}

td.ngaythang:hover {
  cursor: pointer;
}
</style>