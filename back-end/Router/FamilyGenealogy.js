const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
const FamilyMemberManagement = require('../Controller/FamilyGenealogy/FamilyMember')
var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    //Get Nationality and Religion
    router.get('/nationality', ManagerFamilyTree.AllNationality)
    router.get('/religion', ManagerFamilyTree.AllReligion)


    router.get('/', ManagerFamilyTree.AllReligion)
    router.get('/memberRole', ManagerFamilyTree.AllMemberRole)
    router.get('/InforMember', ManagerFamilyTree.informationMember)
    router.post('/setRole', ManagerFamilyTree.setRole)
    router.delete('/removeFamilyHead',ManagerFamilyTree.removeRoleFamilyHead)

    //API tuấn
    router.post('/member', FamilyMemberManagement.addMember)
    router.put('/member', FamilyMemberManagement.updateMember)
    router.delete('/member', FamilyMemberManagement.deleteMember)

    //API Nhật anh

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;