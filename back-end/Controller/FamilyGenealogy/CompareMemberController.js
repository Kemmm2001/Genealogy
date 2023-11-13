const CompareMemberService = require('../../service/FamilyGenealogy/CompareMemberService');

var compareMember = async (req, res) => {
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

        console.log('MemberID1: ' + MemberID1)
        console.log('MemberID2: ' + MemberID2)
        console.log("inforMember1[0].Male: " + inforMember1[0].Male)
        console.log("inforMember2[0].Male: " + inforMember2[0].Male)

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