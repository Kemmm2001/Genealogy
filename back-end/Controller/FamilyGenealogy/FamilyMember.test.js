const FamilyMember = require('./FamilyMember');
const FamilyManagementService = require("../../service/FamilyGenealogy/FamilyManagement");

const createMockReqRes = (body) => {
    const req = { body };
    const res = { send: jest.fn() };
    return { req, res };
};

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
    it('return success = false for missing 4 required params', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 761
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false missing 3 required params', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 761,
            "MemberName": "Nguyễn Văn A",
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false missing 2 required params', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 761,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = false missing 1 required params', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 761,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": true
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    });
    it('return success = true for a valid request', async () => {
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": true,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    }
    );
    it('return success = false for a memberid not exist', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 9999999999,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": true,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );
    it('return success = false when Male is > 1', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 432,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": true,
            "Male": 2
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );
    it('return success = false when Male is < 0', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 432,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": -1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );
    it('return success = true when Male is = 0', async () => {
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": 0
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    }
    );
    it('return success = true when Male is = 1', async () => {
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    }
    );
    it('return success = true when Male is = true', async () => {
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": true
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    }
    );
    it('return success = true when Male is = false', async () => {
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": false
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    }
    );
    it('return success = false when IsDead is > 1', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 432,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 2,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );
    it('return success = false when IsDead is < 0', async () => {
        const { req, res } = createMockReqRes({
            "MemberID": 432,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": -1,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    }
    );
    it('return success = true when IsDead = true', async () => { 
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": true,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    });
    it('return success = true when IsDead = false', async () => { 
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": false,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    });
    it('return success = true when IsDead = 1', async () => { 
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 1,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    });
    it('return success = true when IsDead = 0', async () => { 
        let data = await addNewNormalMemberToGetMemberData();
        const { req, res } = createMockReqRes({
            "MemberID": data.MemberID,
            "MemberName": "Nguyễn Văn A",
            "BirthOrder": 1,
            "IsDead": 0,
            "Male": 1
        });
        await FamilyMember.updateMember(req, res);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ success: true }));
        FamilyManagementService.deleteMember(data.MemberID);
    });
});
