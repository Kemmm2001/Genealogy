const CompareMemberService = require('../../service/FamilyGenealogy/CompareMemberService');
const Response = require("../../Utils/Response");


var compareMember = async (req, res) => {
    try {
        let idMember1 = req.query.MemberID1;
        let idMember2 = req.query.MemberID2;
        let newIdToCampereMember1;
        let newIdToCampereMember2;
        let Flag1 = false;
        let Flag2 = false;
        let generationMember1 = await CompareMemberService.getGenerationByID(req.query.MemberID1);
        let generationMember2 = await CompareMemberService.getGenerationByID(req.query.MemberID2);

        //Kiểm tra xem người đó có phải làm dâu hoặc làm rể không và gán id mới nhất
        if (generationMember1[0].Generation != 1) {
            newIdToCampereMember1 = await CompareMemberService.checkBrideOrGroom(req.query.MemberID1)
            if (newIdToCampereMember1 != req.query.MemberID1) {
                Flag1 = true
            }
        }
        if (generationMember2[0].Generation != 1) {
            newIdToCampereMember2 = await CompareMemberService.checkBrideOrGroom(req.query.MemberID2)
            if (newIdToCampereMember2 != req.query.MemberID2) {
                Flag2 = true
            }
        }

        let DefferenceGeneration = generationMember2[0].Generation - generationMember1[0].Generation;
        if (DefferenceGeneration == 0) {
            console.log("Vào đây")
        } else if (DefferenceGeneration < 0) {
            let resultCheckMaternalOrPaternal = await CompareMemberService.checkMaternalOrPaternal(newIdToCampereMember1);
            idMember1 = await CompareMemberService.getIdToCompare(DefferenceGeneration, newIdToCampereMember1);
            let data = await CompareMemberService.GetResultCompare(idMember1, idMember2, DefferenceGeneration, Flag1, Flag2, generationMember1[0].Male, generationMember2[0].Male, resultCheckMaternalOrPaternal)
            if (data) {
                return res.send(Response.successResponse(data))
            }
        } else {
            let resultCheckMaternalOrPaternal = await CompareMemberService.checkMaternalOrPaternal(newIdToCampereMember2);
            idMember2 = await CompareMemberService.getIdToCompare(DefferenceGeneration, newIdToCampereMember2);
            let data = await CompareMemberService.GetResultCompare(idMember1, idMember2, DefferenceGeneration, Flag1, Flag2, generationMember1[0].Male, generationMember2[0].Male, resultCheckMaternalOrPaternal)
            if (data) {
                return res.send(Response.successResponse(data))
            }
        }
    } catch (error) {

    }
}
var compareMember1 = async (req, res) => {
    try {
        let data;
        let isInLaw1;
        let isInLaw2;
        let Flag1 = false;
        let Flag2 = false;
        let inforMember1;
        let inforMember2;
        let MemberID1 = req.query.MemberID1;
        let MemberID2 = req.query.MemberID2;

        inforMember1 = await CompareMemberService.getGenerationByID(MemberID1);
        inforMember2 = await CompareMemberService.getGenerationByID(MemberID2);

        isInLaw1 = await CompareMemberService.isInLaw(MemberID1);
        if (isInLaw1.ParentID == null && isInLaw1.MarriageID != null) {
            MemberID1 = isInLaw1.MarriageID
            Flag1 = true;
        }
        isInLaw2 = await CompareMemberService.isInLaw(MemberID2);
        if (isInLaw2.ParentID == null && isInLaw2.MarriageID != null) {
            MemberID2 = isInLaw2.MarriageID
            Flag2 = true;
        }

        let DefferenceGeneration = inforMember2[0].Generation - inforMember1[0].Generation;

        if (DefferenceGeneration == 0) {
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2, inforMember1[0].Male, inforMember2[0].Male)
            res.send(data)
        } else if (DefferenceGeneration < 0) {
            MemberID1 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID1);
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2, inforMember1[0].Male, inforMember2[0].Male)
            res.send(data)
        } else {
            MemberID2 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID2);
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2, inforMember1[0].Male, inforMember2[0].Male)
            res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    compareMember
}