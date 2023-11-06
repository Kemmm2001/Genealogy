const GeneralInformationService = require('../../service/InformationGenealogy/GeneralInformation')

var GetGeneralInformation = async (req, res) => {
    try {
        let CodeID = req.query.CodeID;
        let data = await GeneralInformationService.GeneralInformation(CodeID);
        // if (data.MemberId != null) data.inforMember = await GeneralInformationService.GetInformationMember(data.MemberId);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
}

var InsertNewGeneralInformation = async (req, res) => {
    try {
        let objData = {}
        objData.CodeID = req.body.CodeID;
        objData.TreeName = req.body.TreeName;
        objData.Ethnicity = req.body.Ethnicity;
        objData.DeathAnniversary = req.body.DeathAnniversary;
        await GeneralInformationService.InsertNewGeneral(objData);
        res.send("sucess")
    } catch (error) {
        console.log(error)
    }
}

var UpdateGeneralInformation = async (req, res) => {
    try {
        let objData = {};
        objData.TreeName = req.body.TreeName;
        objData.Ethnicity = req.body.Ethnicity;
        objData.DeathAnniversary = req.body.DeathAnniversary;
        objData.MemberId = req.body.MemberId;
        objData.CodeID = req.body.CodeID;
        await GeneralInformationService.UpdateGeneralInformation(objData);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    GetGeneralInformation, UpdateGeneralInformation, InsertNewGeneralInformation
}