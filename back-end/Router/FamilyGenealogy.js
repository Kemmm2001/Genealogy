const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
const FamilyMemberManagement = require('../Controller/FamilyGenealogy/FamilyMember')
const JobManagementController = require('../Controller/FamilyGenealogy/JobManagementController')
const ContactManagementController = require('../Controller/FamilyGenealogy/ContactManagementController')
const EducationManagementController = require('../Controller/FamilyGenealogy/EducationManagementController')
const CompareMemberController = require('../Controller/FamilyGenealogy/CompareMemberController')
const CoreFunction = require('../Utils/CoreFunction');

var router = express.Router();



const initWebRouter = (app) => {

    //API Nguyễn Lê Hùng   
    router.get('/nationality', ManagerFamilyTree.AllNationality)
    router.get('/religion', ManagerFamilyTree.AllReligion)
    router.get('/agegroup', FamilyMemberManagement.getListAgeGroup)
    router.get('/bloodtype', FamilyMemberManagement.getListBloodTypeGroup)

    router.get('/memberRole', ManagerFamilyTree.AllMemberRole)
    router.get('/InforMember', ManagerFamilyTree.informationMember)
    router.get('/searchMemberSendMessage', ManagerFamilyTree.searchMemberCanSendMessage)
    router.post('/setRole', ManagerFamilyTree.setRole)
    router.get('/viewTree', ManagerFamilyTree.AllMemberInGenelogy)
    router.get('/getFamilyHead', ManagerFamilyTree.getFamilyHead)

    router.get('/listMemberMessage',ManagerFamilyTree.getlistMemberToSendMessage)
    router.get('/relationship', ManagerFamilyTree.getRelationShipMember)
    router.put('/removeRelationship', ManagerFamilyTree.removeRelationship)
    router.get('/idPaternal', ManagerFamilyTree.GetIdPaternalAncestor)
    router.get('/unspecified-members', ManagerFamilyTree.getAllUnspecifiedMembers)
    router.get('/listMessage', ManagerFamilyTree.getListMessage)
    router.get('/listHistoryEmail', ManagerFamilyTree.getListHistoryEmail)

    router.get('/compare', CompareMemberController.compareMember)

    router.get('/getJob', JobManagementController.ViewJobMember)
    router.post('/addJob', JobManagementController.InsertJobMember)
    router.put('/updateJob', JobManagementController.UpdateJobMember)
    router.delete('/removeJob', JobManagementController.RemoveJobMember)
    router.get('/RemoveListJob', JobManagementController.RemoveListJobMember)

    router.get('/contact', ContactManagementController.ViewContactMember)
    router.post('/addContact', ContactManagementController.InsertContactMember)
    router.put('/updateContact', ContactManagementController.updateContactMember)
    router.get('/deleteContact', ContactManagementController.removeContactMember)

    router.get('/education', EducationManagementController.ViewEducation)
    router.post('/addEducation', EducationManagementController.InsertEducationMember)
    router.put('/updateEducation', EducationManagementController.UpdateEducationMember)
    router.delete('/deleteEducation', EducationManagementController.RemoveEducationMember)
    router.get('/deleteListEducation', EducationManagementController.RemoveListEducationMember)

    //API tuấn
    router.get('/member', FamilyMemberManagement.getMember);
    router.post('/member', FamilyMemberManagement.addMember);
    router.put('/member', FamilyMemberManagement.updateMember);
    router.put('/member-photo', CoreFunction.uploadImage("member-photo").single('Image'), FamilyMemberManagement.updateMemberPhoto);
    router.put('/memberToGenealogy', FamilyMemberManagement.updateMemberToGenealogy);
    router.get('/delete-member', FamilyMemberManagement.deleteMember)
    router.get('/getparent', FamilyMemberManagement.GetCurrentParentMember)
    router.post('/InsertParentID', FamilyMemberManagement.insertParentIdToMember)
    router.post('/InserMarrie', FamilyMemberManagement.InsertMarrieIdToMember)

    //API Nhật anh
    router.get('/members', FamilyMemberManagement.getAllMember);
    router.post('/search-member', FamilyMemberManagement.searchMember);
    router.post('/filter-member', FamilyMemberManagement.filterMember);
    router.post('/sort-member', FamilyMemberManagement.sortMembers);

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;