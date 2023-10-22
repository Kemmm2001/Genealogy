const CompareMemberService = require('../../service/FamilyGenealogy/CompareMemberService');

var compareMember = async (req, res) => {
    try {
        let MemberID1 = req.query.MemberID1;
        let MemberID2 = req.query.MemberID2;

        let Generation1 = await CompareMemberService.getGenerationByID(MemberID1);
        let Generation2 = await CompareMemberService.getGenerationByID(MemberID2);

        let DefferenceGeneration = Generation2[0].Generation - Generation1[0].Generation;

        if (DefferenceGeneration == 0) {
            await CompareMemberService.GetResultCompare(MemberID1, MemberID2)
        } else if (DefferenceGeneration < 0) {
            MemberID1 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID1);
            await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration)
        } else {
            MemberID2 = await CompareMemberService.getIdToCompare(DefferenceGeneration, MemberID2);
            await CompareMemberService.GetResultCompare(MemberID1, MemberID2, DefferenceGeneration)
        }
    } catch (error) {

    }
}

module.exports = {
    compareMember
}