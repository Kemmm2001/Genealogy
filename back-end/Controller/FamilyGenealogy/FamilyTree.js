const FamilyTreeService = require("../../service/FamilyGenealogy/ViewFamilyTree");

// Ví dụ
var AllReligion = async (req, res) => {
    try {
        let data = await FamilyTreeService.getAllReligion();
        console.log(data)
        res.send(data);
    } catch (e) {
        res.send(e);
    }
};

module.exports = {
    AllReligion
};