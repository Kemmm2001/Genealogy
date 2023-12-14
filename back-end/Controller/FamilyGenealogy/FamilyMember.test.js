const FamilyMember = require('./FamilyMember');
const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");

async function addNewNormalMemberToGetMemberData() {
    let req = {
        'MemberName': 'Nguyễn Văn A',
        'BirthOrder': 1,
        'IsDead': true,
        'CodeID': '207693',
        'Male': 1,
        'Action': 'AddNormal'
    }
    let data = await FamilyManagementService.addMember(req);
    await FamilyManagementService.setGeneration(0, data.insertId);
    await FamilyManagementService.setRole(3, data.insertId);
    let member = await FamilyManagementService.getMemberByMemberID(data.insertId);
    return member[0];
}

describe('updateMember function', () => {
    //    // các trường bắt buộc phải có trong req.body
    //    const requiredFields = [
    //     'MemberID',
    //     'MemberName',
    //     'BirthOrder',
    //     'IsDead',
    //     'Male'
    // ];
    it('should return success = false for a invalid request', async () => {
        const req = {
            body: {
                "MemberID": 761
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('should return success = false for a invalid request', async () => {
        const req = {
            body: {
                "MemberID": 761,
                "MemberName": "Nguyễn Văn A",
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('should return success = false for a invalid request', async () => {
        const req = {
            body: {
                "MemberID": 761,
                "MemberName": "Nguyễn Văn A",
                "BirthOrder": 1
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('should return success = false for a invalid request', async () => {
        const req = {
            body: {
                "MemberID": 761,
                "MemberName": "Nguyễn Văn A",
                "BirthOrder": 1,
                "IsDead": true
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('should return success = true for a valid request', async () => {
        const data = await addNewNormalMemberToGetMemberData();
        const req = {
            body: {
                "MemberID": data.MemberID,
                "MemberName": "Nguyễn Văn A",
                "BirthOrder": 1,
                "IsDead": true,
                "Male": 1
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
    }
    );
    it('should return success = false for a memberid not exist', async () => {
        const req = {
            body: {
                "MemberID": 9999999999,
                "MemberName": "Nguyễn Văn A",
                "BirthOrder": 1,
                "IsDead": true,
                "Male": 1
            },
        };
        const res = {
            send: jest.fn(),
        };
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );


});
