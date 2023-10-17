const EventManagementService = require('../../service/EventGenealogy/EventManagement');

var getAllEventGenealogy = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.getAllEvent(CodeID);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}


var InsertEvent = async (req, res) => {
    try {
        let objData = {};
        objData.EventName = req.body.EventName;
        objData.CodeID = req.body.CodeID;
        objData.Status = req.body.Status;
        objData.StartDate = req.body.StartDate;
        objData.EndDate = req.body.EndDate;
        objData.Description = req.body.Description;
        objData.IsImportant = req.body.IsImportant;
        objData.Note = req.body.Note;
        objData.Place = req.body.Place;
        objData.RepeatID = req.body.RepeatID;
        objData.IsSolarCalendar = req.body.IsSolarCalendar;
        objData.eventfamilycol = req.body.eventfamilycol;
        await EventManagementService.InsertNewEvent(objData);
        res.send("Success")
    } catch (error) {
        console.log(error)
    }
}

var UpdateEvent = async (req, res) => {
    try {
        let objData = {};
        objData.EventName = req.body.EventName;
        objData.Status = req.body.Status;
        objData.StartDate = req.body.StartDate;
        objData.EndDate = req.body.EndDate;
        objData.Description = req.body.Description;
        objData.IsImportant = req.body.IsImportant;
        objData.Note = req.body.Note;
        objData.Place = req.body.Place;
        objData.RepeatID = req.body.RepeatID;
        objData.IsSolarCalendar = req.body.IsSolarCalendar;
        objData.eventfamilycol = req.body.eventfamilycol;
        objData.EventID = req.body.EventID;
        await EventManagementService.UpdateEvent(objData);
        res.send("update success")
    } catch (error) {
        console.log(error)
    }
}
var RemoveEvent = async (req, res) => {
    try {
        let EventID = req.query.EventID;
        await EventManagementService.RemoveEvent(EventID);
        res.send("Successuly")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getAllEventGenealogy, InsertEvent, UpdateEvent, RemoveEvent
}