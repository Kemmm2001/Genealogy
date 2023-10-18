const StatisticsGenealogyService = require('../../service/InformationGenealogy/StatisticsGenealogy')

var Statistics = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = {};
        data.result = await StatisticsGenealogyService.GetListMember(CodeID);
        data.GenerationNumber = await StatisticsGenealogyService.getGenerationNumber(CodeID);
        data.From0To5Age = await StatisticsGenealogyService.getMemberByAge(0, 5, CodeID);
        data.From6To17Age = await StatisticsGenealogyService.getMemberByAge(6, 17, CodeID);
        data.From18To40Age = await StatisticsGenealogyService.getMemberByAge(18, 40, CodeID);
        data.From41To60Age = await StatisticsGenealogyService.getMemberByAge(41, 60, CodeID);
        data.From60 = await StatisticsGenealogyService.getMemberByAge(61, 200, CodeID);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

var filterMemberByMonth = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let month = req.query.Month;
        let data = await StatisticsGenealogyService.filtetMemberByMonth(month, CodeID);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}





module.exports = {
    Statistics, filterMemberByMonth
}