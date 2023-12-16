const FamilyHistory = require('./FamilyHistory');
const FamilyHistoryManagementService = require("../../service/InformationGenealogy/FamilyHistoryManagement");
const { format, addDays, subDays } = require('date-fns');

// Tạo ngẫu nhiên một ngày trong khoảng từ start đến end
const randomDateInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
    return new Date(randomTime);
};

// 5 truong la HistoryID, CodeID, Description, startDate, endDate

const createMockReqRes = (body, query) => {
    const req = { body, query };
    const res = { send: jest.fn() };
    return { req, res };
};


async function addNewFamilyHistoryToGetFamilyHistoryData() {

    // Tạo đối tượng req với startDate và endDate ngẫu nhiên
    let req = {
        "CodeID": "207693",
        "Description": "Test",
        "startDate": format(randomDateInRange("1500-11-11", "1800-12-31"), 'yyyy-MM-dd'),
        "endDate": format(randomDateInRange("1801-11-11", "2020-12-31"), 'yyyy-MM-dd')
    };

    let data = await FamilyHistoryManagementService.insertFamilyHistory(req);
    let historyData = await FamilyHistoryManagementService.getFamilyHistoryById(data.insertId);
    return historyData[0];
}

describe('test addNewFamilyHistoryToGetFamilyHistoryData function', () => {
    it(' test addNewFamilyHistoryToGetFamilyHistoryData function', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        expect(historyData).toHaveProperty('HistoryID');
        expect(historyData).toHaveProperty('CodeID');
        expect(historyData).toHaveProperty('Description');
        expect(historyData).toHaveProperty('startDate');
        expect(historyData).toHaveProperty('endDate');
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    }
    );
});

describe('getFamilyHistory function', () => {
    it('return success = true for missing required param', async () => {
        const { req, res } = createMockReqRes(null, {});
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid FamilyHistoryID', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "-1",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = ""', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = "              "', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "            ",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = "null"', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "null",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = null', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": null,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID not exist', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "99999999999",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID not exist', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "4",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for  FamilyHistoryID too long', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111222222222222222222222222222222222222222222222222222222222222222222222255555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555549999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for valid FamilyHistoryID', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": historyData.HistoryID,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for valid FamilyHistoryID', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": 46,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
    it('return success = true for valid FamilyHistoryID', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": 47,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "-1",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "            ",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": null,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "null",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID too long', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999"
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID not exist', async () => {
        const { req, res } = createMockReqRes(null, {
            "CodeID": "99999999999",
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for valid CodeID', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes(null, {
            "CodeID": historyData.CodeID,
        });
        await FamilyHistory.getFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });


});

describe('addFamilyHistory function', () => {
    it('return success = false for missing Description required param', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for missing CodeID required param', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for enough required params', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for valid CodeID', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for valid CodeID number', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": 207693,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = false for invalid CodeID', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "-12207693a",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID not exist', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "1",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID < 0', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "-1",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = "" ', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = "            "', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "            ",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = ""', async () => {
        const { req, res } = createMockReqRes({
            "Description": "",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = "            "', async () => {
        const { req, res } = createMockReqRes({
            "Description": "            ",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = null', async () => {
        const { req, res } = createMockReqRes({
            "Description": null,
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = undefined', async () => {
        const { req, res } = createMockReqRes({
            "Description": undefined,
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for valid Description', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for number Description', async () => {
        const { req, res } = createMockReqRes({
            "Description": 123456,
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for Description too long', async () => {
        const { req, res } = createMockReqRes({
            "Description": "52555555555222222wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222225555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222255555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555",
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = false for Description number too long', async () => {
        const { req, res } = createMockReqRes({
            "Description": 123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312,
            "CodeID": "207693",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid startDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-11a",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for number startDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": 123456,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = ""', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": "",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = "            "', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": "            ",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = undefined', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": undefined,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "endDate": "2020-11-11a",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for number endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "endDate": 123456,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false endDate = ""', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "endDate": "",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it("return success = false for endDate = '            '", async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "endDate": "            ",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for endDate = undefined', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "endDate": undefined,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid startDate and endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-11a",
            "endDate": "2020-11-11a",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = null', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": null,
            "endDate": "2020-11-16",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for endDate = null', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": "2020-11-15",
            "endDate": null,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = null and endDate = null', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "258191",
            "startDate": null,
            "endDate": null,
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for MM-dd-yyyy startDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "15-11-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for MM-dd-yyyy endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "endDate": "15-11-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for MM-dd-yyyy startDate and endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "15-11-2020",
            "endDate": "15-11-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for dd-MM-yyyy startDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "11-15-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for dd-MM-yyyy endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "endDate": "11-15-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for dd-MM-yyyy startDate and endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "11-15-2020",
            "endDate": "11-15-2020",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for yyyy-MM-dd startDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-15",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for yyyy-MM-dd endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for yyyy-MM-dd startDate and endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-15",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = false for startDate > endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-16",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for startDate = endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-15",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });
    it('return success = true for startDate < endDate', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
            "startDate": "2020-11-15",
            "endDate": "2020-11-16",
        });
        await FamilyHistory.addFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(res.send.mock.calls[0][0].data.familyHistoryId);
    });

});

describe('updateFamilyHistory function', () => {
    it('return success = false for missing Description required param', async () => {
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": "1",
            "CodeID": "207693",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for missing HistoryID required param', async () => {
        const { req, res } = createMockReqRes({
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid HistoryID', async () => {
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": "1a",
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for HistoryID not exist', async () => {
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": "1",
            "Description": "Test",
            "CodeID": "207693",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for missing CodeID required param', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid CodeID', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "1a",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID not exist', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "1",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID < 0', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "-1",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = "" ', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = "            "', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "            ",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = null', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": null,
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for CodeID = undefined', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": undefined,
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = ""', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "",
            "CodeID": "207693",
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = "            "', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "            ",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = null', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": null,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for Description = undefined', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": undefined,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for valid Description', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
    it('return success = true for Description too long', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "525555555552223321788888888888888888888888888888888888888888888888888888852555555555222332178888888888888888888888888888888888888888888888888888885255555555522233217888888888888888888888888888888888888888888888888888888525555555552223321788888888888888888888888888888888888888888888888888888852555555555222332178888888888888888888888888888888888888888888888888888885255555555522233217888888888888888888888888888888888888888888888888888888525555555552223321788888888888888888888888888888888888888888888888888888852555555555222332178888888888888888888888888888888888888888888888888888885255555555522233217888888888888888888888888888888888888888888888888888888",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
    it('return success = false for Description number too long', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": 123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312123123123123211231231231231231231313123131312312312,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for startDate = ""', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it("return success = false for startDate = '            '", async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "            ",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for startDate = null', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": null,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for startDate = "undefined"', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "undefined",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for endDate = ""', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": "",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it("return success = false for endDate = '            '", async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": "            ",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for endDate = null', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": null,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for endDate = "undefined"', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": "undefined",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for invalid startDate and endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "2020-11-11a",
            "endDate": "2020-11-11a",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for startDate = null and endDate = null', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": null,
            "endDate": null,
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for MM-dd-yyyy startDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "startDate": "15-11-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for MM-dd-yyyy endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": "15-11-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for MM-dd-yyyy startDate and endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "startDate": "15-11-2020",
            "endDate": "15-11-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for dd-MM-yyyy startDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "11-15-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for dd-MM-yyyy endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "endDate": "11-15-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for dd-MM-yyyy startDate and endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "11-15-2020",
            "endDate": "11-15-2020",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for yyyy-MM-dd startDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "2020-11-15",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for yyyy-MM-dd endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "endDate": "2020-11-15",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for yyyy-MM-dd startDate and endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "2020-11-15",
            "endDate": "2020-11-15",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = false for startDate > endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "startDate": "2020-11-16",
            "endDate": "2020-11-15",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for startDate = endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "2020-11-15",
            "endDate": "2020-11-15",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });
    it('return success = true for startDate < endDate', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "FamilyHistoryID": historyData.HistoryID,
            "Description": "Test",
            "startDate": "2020-11-15",
            "endDate": "2020-11-16",
            "CodeID": "207693"
        });
        await FamilyHistory.updateFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        await FamilyHistoryManagementService.removeFamilyHistory(historyData.HistoryID);
    });

});

describe('deleteFamilyHistory function', () => {
    it('return success = false for missing FamilyHistoryID required param', async () => {
        const { req, res } = createMockReqRes(null, {});
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for invalid FamilyHistoryID', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "1a",
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID not exist', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "1",
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for valid FamilyHistoryID', async () => {
        let historyData = await addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": historyData.HistoryID,
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    });
    it('return success = false for FamilyHistoryID < 0', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "-1",
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = "" ', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "",
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = "            "', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": "            ",
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false for FamilyHistoryID = null', async () => {
        const { req, res } = createMockReqRes(null, {
            "FamilyHistoryID": null,
        });
        await FamilyHistory.deleteFamilyHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });

});

describe('searchHistory function', () => {
    it('return success = boolean for missing CodeID required param', async () => {
        const { req, res } = createMockReqRes({});
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for invalid CodeID', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "1a",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for CodeID not exist', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "1",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for valid CodeID', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for CodeID < 0', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "-1",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for CodeID = "" ', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for CodeID = "            "', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "            ",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for CodeID = null', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": null,
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    // chỉ có keySearch
    it('return success = boolean for only keySearch param', async () => {
        const { req, res } = createMockReqRes({
            "keySearch": "Test",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    // có thêm tham số là CodeID và keySearch
    it('return success = boolean for missing keySearch required param', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for keySearch = ""', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
            "keySearch": "",
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for keySearch = null', async () => {
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
            "keySearch": null,
        });
        await FamilyHistory.searchHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for keySearch = "Test"', async () => {
        let data = addNewFamilyHistoryToGetFamilyHistoryData();
        const { req, res } = createMockReqRes({
            "CodeID": "207693",
            "keySearch": "Test",
        });
        await FamilyHistory.searchHistory(req, res);
        await FamilyHistoryManagementService.removeFamilyHistory(data.HistoryID);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
});

// filter bởi startDate và endDate
describe('filterHistory function', () => {
    it('return success = boolean for missing startDate required param', async () => {
        const { req, res } = createMockReqRes({
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for invalid startDate', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15a",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for startDate = ""', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it("return success = boolean for startDate = '            '", async () => {
        const { req, res } = createMockReqRes({
            "startDate": "            ",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for startDate = null', async () => {
        const { req, res } = createMockReqRes({
            "startDate": null,
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    // endDate
    it('return success = boolean for missing endDate required param', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for invalid endDate', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
            "endDate": "2020-11-15a",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for endDate = ""', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
            "endDate": "",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it("return success = boolean for endDate = '            '", async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
            "endDate": "            ",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for endDate = null', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
            "endDate": null,
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });
    it('return success = boolean for only startDate and endDate param', async () => {
        const { req, res } = createMockReqRes({
            "startDate": "2020-11-15",
            "endDate": "2020-11-15",
        });
        await FamilyHistory.filterHistory(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: expect.any(Boolean) }));
    });

});
