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
    router.get('/membersInGenealogy', CoreFunction.isChecksumValid, FamilyMemberManagement.getAllMembersInGenalogy)

    router.get('/InforMember',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.informationMember)    
    router.post('/setRole',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ManagerFamilyTree.setRole)
    router.get('/viewTree',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.AllMemberInGenelogy)
    router.get('/getFamilyHead',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.getFamilyHead)

    router.get('/listMemberMessage',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.getlistMemberToSendMessage)
    router.get('/relationship',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.getRelationShipMember)
    router.put('/removeRelationship',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ManagerFamilyTree.removeRelationship)    
    router.get('/unspecified-members',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ManagerFamilyTree.getAllUnspecifiedMembers)
    router.get('/listMessage',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ManagerFamilyTree.getListMessage)
    router.get('/listHistoryEmail',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ManagerFamilyTree.getListHistoryEmail)

    router.get('/compare',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, CompareMemberController.compareMember)

    router.get('/getJob',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, JobManagementController.ViewJobMember)
    router.post('/addJob',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, JobManagementController.InsertJobMember)
    router.put('/updateJob',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, JobManagementController.UpdateJobMember)
    router.delete('/removeJob',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, JobManagementController.RemoveJobMember)
    router.get('/RemoveListJob',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, JobManagementController.RemoveListJobMember)

    router.get('/contact',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, ContactManagementController.ViewContactMember)
    router.post('/addContact',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ContactManagementController.InsertContactMember)
    router.put('/updateContact',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ContactManagementController.updateContactMember)
    router.get('/deleteContact',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, ContactManagementController.removeContactMember)

    router.get('/education',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, EducationManagementController.ViewEducation)
    router.post('/addEducation',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EducationManagementController.InsertEducationMember)
    router.put('/updateEducation',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EducationManagementController.UpdateEducationMember)
    router.delete('/deleteEducation',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EducationManagementController.RemoveEducationMember)
    router.get('/deleteListEducation',authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, EducationManagementController.RemoveListEducationMember)

    //API tuấn
    // router.get('/member',authMiddleware.authenticateAndAuthorize(3), FamilyMemberManagement.getMember);
    router.post('/member', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.addMember);
    router.post('/add-child', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.addChild);
    router.post('/add-marriage', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.addMarriage);
    router.put('/member', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.updateMember);
    router.put('/member-photo',authMiddleware.authenticateAndAuthorize(2), CoreFunction.uploadImage("member-photo").single('Image'), FamilyMemberManagement.updateMemberPhoto);
    router.put('/memberToGenealogy', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.updateMemberToGenealogy);
    router.put('/linkRelationship', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.linkRelationship);
    router.get('/delete-member', authMiddleware.authenticateAndAuthorize(2), CoreFunction.isChecksumValid, FamilyMemberManagement.deleteMember)

    //API Nhật anh
    router.get('/members',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, FamilyMemberManagement.getAllMember);
    router.post('/search-member',authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid, FamilyMemberManagement.searchMember);
    router.post('/filter-member', authMiddleware.authenticateAndAuthorize(3), CoreFunction.isChecksumValid,FamilyMemberManagement.filterMember);
    // router.post('/sort-member', FamilyMemberManagement.sortMembers);

    //Tiền tố đứng trước route
    app.use('/api/v1', router);

}

module.exports = initWebRouter;