const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
const FamilyMemberManagement = require('../Controller/FamilyGenealogy/FamilyMember')
const JobManagementController = require('../Controller/FamilyGenealogy/JobManagementController')
const ContactManagementController = require('../Controller/FamilyGenealogy/ContactManagementController')
const EducationManagementController = require('../Controller/FamilyGenealogy/EducationManagementController')
const CompareMemberController = require('../Controller/FamilyGenealogy/CompareMemberController')
const CoreFunction = require('../Utils/CoreFunction');
const authMiddleware = require('../helper/author_helper')

var router = express.Router();



const initWebRouter = (app) => {

    //API Nguyễn Lê Hùng   
    router.get('/nationality', ManagerFamilyTree.AllNationality)
    router.get('/religion', ManagerFamilyTree.AllReligion)
    router.get('/agegroup', FamilyMemberManagement.getListAgeGroup)
    router.get('/bloodtype', FamilyMemberManagement.getListBloodTypeGroup)
    router.get('/membersInGenealogy', FamilyMemberManagement.getAllMembersInGenalogy)

    router.get('/InforMember', ManagerFamilyTree.informationMember)
    router.get('/searchMemberSendMessage',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.searchMemberCanSendMessage)
    router.post('/setRole',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.setRole)
    router.get('/viewTree', ManagerFamilyTree.AllMemberInGenelogy)
    router.get('/getFamilyHead', ManagerFamilyTree.getFamilyHead)

    router.get('/listMemberMessage', ManagerFamilyTree.getlistMemberToSendMessage)
    router.get('/relationship', ManagerFamilyTree.getRelationShipMember)
    router.put('/removeRelationship',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.removeRelationship)    
    router.get('/unspecified-members', ManagerFamilyTree.getAllUnspecifiedMembers)
    router.get('/listMessage', ManagerFamilyTree.getListMessage)
    router.get('/listHistoryEmail', ManagerFamilyTree.getListHistoryEmail)

    router.get('/compare', CompareMemberController.compareMember)

    router.get('/getJob', JobManagementController.ViewJobMember)
    router.post('/addJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.InsertJobMember)
    router.put('/updateJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.UpdateJobMember)
    router.delete('/removeJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.RemoveJobMember)
    router.get('/RemoveListJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.RemoveListJobMember)

    router.get('/contact', ContactManagementController.ViewContactMember)
    router.post('/addContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.InsertContactMember)
    router.put('/updateContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.updateContactMember)
    router.get('/deleteContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.removeContactMember)

    router.get('/education', EducationManagementController.ViewEducation)
    router.post('/addEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.InsertEducationMember)
    router.put('/updateEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.UpdateEducationMember)
    router.delete('/deleteEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.RemoveEducationMember)
    router.get('/deleteListEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.RemoveListEducationMember)

    //API tuấn
    router.get('/member',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getMember);
    router.post('/member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addMember);
    router.post('/add-child', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addChild);
    router.post('/add-marriage', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addMarriage);
    router.put('/member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.updateMember);
    router.put('/member-photo',authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("member-photo").single('Image'), FamilyMemberManagement.updateMemberPhoto);
    router.put('/memberToGenealogy', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.updateMemberToGenealogy);
    router.put('/linkRelationship', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.linkRelationship);
    router.get('/delete-member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.deleteMember)
    router.get('/getparent',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.GetCurrentParentMember)
    router.post('/InsertParentID', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.insertParentIdToMember)

    //API Nhật anh
    router.get('/members', FamilyMemberManagement.getAllMember);
    router.post('/search-member', FamilyMemberManagement.searchMember);
    router.post('/filter-member', FamilyMemberManagement.filterMember);
    // router.post('/sort-member', FamilyMemberManagement.sortMembers);

    //Tiền tố đứng trước route
    app.use('/api/v1', router);

}

module.exports = initWebRouter;