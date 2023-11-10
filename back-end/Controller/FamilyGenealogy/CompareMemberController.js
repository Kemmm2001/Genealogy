const CompareMemberService = require('../../service/FamilyGenealogy/CompareMemberService');

var compareMember = async (req, res) => {
    try {
        let data;
        let isInLaw1;
        let isInLaw2;
        let Flag1 = false;
        let Flag2 = false;
        let Generation1;
        let Generation2;
        let MemberID1 = req.query.MemberID1;
        let MemberID2 = req.query.MemberID2;

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
        Generation1 = await CompareMemberService.getGenerationByID(MemberID1);
        Generation2 = await CompareMemberService.getGenerationByID(MemberID2);

        let DefferenceGeneration = Generation2[0].Generation - Generation1[0].Generation;

        if (DefferenceGeneration == 0) {
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2)
            res.send(data)
        } else if (DefferenceGeneration < 0) {
            MemberID1 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID1);
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2)
            res.send(data)
        } else {
            MemberID2 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID2);
            data = await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration, Flag1, Flag2)
            res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    compareMember
}