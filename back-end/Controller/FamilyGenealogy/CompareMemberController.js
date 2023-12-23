const CompareMemberService = require('../../service/FamilyGenealogy/CompareMemberService');
const Response = require("../../Utils/Response");

//Nguyễn Lê Hùng
var compareMember = async (req, res) => {
    try {
        let idMember1 = req.query.MemberID1;
        let idMember2 = req.query.MemberID2;
        let currentIdMember1 = idMember1;
        let currentIdMember2 = idMember2;
        console.log('idMember1: ' + idMember1)
        console.log('idMember2: ' + idMember2)
        let Flag = false;
        let generationMember1 = await CompareMemberService.getGenerationByID(req.query.MemberID1);
        let generationMember2 = await CompareMemberService.getGenerationByID(req.query.MemberID2);

        console.log("vào đâyy")

        //Kiểm tra xem người đó có phải làm dâu hoặc làm rể không và gán id mới nhất 
        idMember1 = await CompareMemberService.checkBrideOrGroom(req.query.MemberID1)
        if (idMember1 != req.query.MemberID1) {
            Flag = true
        }


        idMember2 = await CompareMemberService.checkBrideOrGroom(req.query.MemberID2)
        if (idMember2 != req.query.MemberID2) {
            Flag = true
        }

        console.log("đã vào đâyy")
        let DefferenceGeneration = generationMember2[0].Generation - generationMember1[0].Generation;
        if (DefferenceGeneration == 0) {
            console.log("vào 0")
            let data = await CompareMemberService.GetResultCompare(idMember1, idMember2, DefferenceGeneration, Flag, generationMember1[0].Male, generationMember2[0].Male)
            if (data) {
                return res.send(Response.successResponse(data))
            } else {
                return res.send(Response.badRequestResponse(null, 'Lỗi hệ thống'))
            }

        } else if (DefferenceGeneration < 0) {
            console.log("vào nhỏ hơn 0")
            let resultCheckMaternalOrPaternal = await CompareMemberService.checkMaternalOrPaternal(idMember1);
            idMember1 = await CompareMemberService.getIdToCompare(DefferenceGeneration, idMember1);
            let data = await CompareMemberService.GetResultCompare(idMember1, idMember2, DefferenceGeneration, Flag, generationMember1[0].Male, generationMember2[0].Male, resultCheckMaternalOrPaternal, currentIdMember1, currentIdMember2)
            if (data) {
                return res.send(Response.successResponse(data))
            } else {
                return res.send(Response.badRequestResponse(null, 'Lỗi hệ thống'))
            }
        } else {
            console.log("vào lớn hơn 0")
            let resultCheckMaternalOrPaternal = await CompareMemberService.checkMaternalOrPaternal(idMember2);
            idMember2 = await CompareMemberService.getIdToCompare(DefferenceGeneration, idMember2);
            let data = await CompareMemberService.GetResultCompare(idMember1, idMember2, DefferenceGeneration, Flag, generationMember1[0].Male, generationMember2[0].Male, resultCheckMaternalOrPaternal, currentIdMember1, currentIdMember2)
            if (data) {
                return res.send(Response.successResponse(data))
            } else {
                return res.send(Response.badRequestResponse(null, 'Lỗi hệ thống'))
            }
        }
    } catch (error) {
        return res.send(Response.badRequestResponse(error, 'Lỗi hệ thống'))
    }
}

module.exports = {
    compareMember
}