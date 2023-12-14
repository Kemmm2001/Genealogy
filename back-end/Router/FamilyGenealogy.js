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
    router.get('/nationality',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.AllNationality)
    router.get('/religion',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.AllReligion)
    router.get('/agegroup',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getListAgeGroup)
    router.get('/bloodtype',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getListBloodTypeGroup)
    router.get('/membersInGenealogy',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getAllMembersInGenalogy)

    router.get('/InforMember',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.informationMember)
    router.get('/searchMemberSendMessage',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.searchMemberCanSendMessage)
    router.post('/setRole',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.setRole)
    router.get('/viewTree',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.AllMemberInGenelogy)
    router.get('/getFamilyHead',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.getFamilyHead)

    router.get('/listMemberMessage',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.getlistMemberToSendMessage)
    router.get('/relationship',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.getRelationShipMember)
    router.put('/removeRelationship',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.removeRelationship)    
    router.get('/unspecified-members',authMiddleware.authenticateAndAuthorize(3), ManagerFamilyTree.getAllUnspecifiedMembers)
    router.get('/listMessage',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.getListMessage)
    router.get('/listHistoryEmail',authMiddleware.authenticateAndAuthorize(2), ManagerFamilyTree.getListHistoryEmail)

    router.get('/compare',authMiddleware.authenticateAndAuthorize(3), CompareMemberController.compareMember)

    router.get('/getJob',authMiddleware.authenticateAndAuthorize(3), JobManagementController.ViewJobMember)
    router.post('/addJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.InsertJobMember)
    router.put('/updateJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.UpdateJobMember)
    router.delete('/removeJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.RemoveJobMember)
    router.get('/RemoveListJob',authMiddleware.authenticateAndAuthorize(2), JobManagementController.RemoveListJobMember)

    router.get('/contact',authMiddleware.authenticateAndAuthorize(3), ContactManagementController.ViewContactMember)
    router.post('/addContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.InsertContactMember)
    router.put('/updateContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.updateContactMember)
    router.get('/deleteContact',authMiddleware.authenticateAndAuthorize(2), ContactManagementController.removeContactMember)

    router.get('/education',authMiddleware.authenticateAndAuthorize(3), EducationManagementController.ViewEducation)
    router.post('/addEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.InsertEducationMember)
    router.put('/updateEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.UpdateEducationMember)
    router.delete('/deleteEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.RemoveEducationMember)
    router.get('/deleteListEducation',authMiddleware.authenticateAndAuthorize(2), EducationManagementController.RemoveListEducationMember)

    //API tuấn
    // router.get('/member',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getMember);
    router.post('/member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addMember);
    router.post('/add-child', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addChild);
    router.post('/add-marriage', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.addMarriage);
    router.put('/member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.updateMember);
    router.put('/member-photo',authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("member-photo").single('Image'), FamilyMemberManagement.updateMemberPhoto);
    router.put('/memberToGenealogy', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.updateMemberToGenealogy);
    router.put('/linkRelationship', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.linkRelationship);
    router.get('/delete-member', authMiddleware.authenticateAndAuthorize(2), FamilyMemberManagement.deleteMember)

    //API Nhật anh
    router.get('/members', FamilyMemberManagement.getAllMember);
    router.post('/search-member', FamilyMemberManagement.searchMember);
    router.post('/filter-member', FamilyMemberManagement.filterMember);
    // router.post('/sort-member', FamilyMemberManagement.sortMembers);

    //Tiền tố đứng trước route
    app.use('/api/v1', router);

}

module.exports = initWebRouter;