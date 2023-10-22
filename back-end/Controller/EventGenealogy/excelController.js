const EventManagementService = require('../../service/EventGenealogy/EventManagement');

const CsvParser = require('json2csv');

const exportExcel = async(req, res)=>{
    try {
        let events = [];
        let CodeID = req.query.CodeID;
        let data = await EventManagementService.getAllEvent(CodeID);
        data.forEach(event => {
            const {EventId, EventName, Status, StartDate, EndDate, Description, Place} = event;
            events.push({EventId, EventName, Status, StartDate, EndDate, Description, Place});
        });

        const csvFields = ['EventId', 'EventName', 'Status', 'StartDate', 'EndDate', 'Description', 'Place'];
        const csvParser = new CsvParser({csvFields});
        const csvData = csvParser.parse(events);


        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", "attatchment: filename=eventData.csv");
        res.status(200).end(csvData);
        } catch (error) {
        res.send({status:400, success:false, msg:error.message});
    }
}

module.exports = {exportExcel}