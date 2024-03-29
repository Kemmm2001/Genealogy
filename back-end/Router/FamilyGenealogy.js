const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
const FamilyMemberManagement = require('../Controller/FamilyGenealogy/FamilyMember')
const PdfController = require('../Controller/FamilyGenealogy/pdfController')

const ArticleController = require('../Controller/FamilyGenealogy/ArticleController')

const JobManagementController = require('../Controller/FamilyGenealogy/JobManagementController')
const ContactManagementController = require('../Controller/FamilyGenealogy/ContactManagementController')
const EducationManagementController = require('../Controller/FamilyGenealogy/EducationManagementController')
const CompareMemberController = require('../Controller/FamilyGenealogy/CompareMemberController')

var router = express.Router();



const initWebRouter = (app) => {
    //API Hùng
    //Get Nationality and Religion
    router.get('/nationality', ManagerFamilyTree.AllNationality)
    router.get('/religion', ManagerFamilyTree.AllReligion)
    // router.get('/', ManagerFamilyTree.AllReligion)
    router.get('/memberRole', ManagerFamilyTree.AllMemberRole)
    router.get('/InforMember', ManagerFamilyTree.informationMember)
    router.post('/setRole', ManagerFamilyTree.setRole)
    router.get('/viewTree', ManagerFamilyTree.AllMemberInGenelogy)  
    
    router.get('/compare',CompareMemberController.compareMember)

    router.get('/getJob', JobManagementController.ViewJobMember)
    router.post('/addJob', JobManagementController.InsertJobMember)
    router.put('/updateJob', JobManagementController.UpdateJobMember)
    router.delete('/removeJob', JobManagementController.RemoveJobMember)

    router.get('/contact', ContactManagementController.ViewContactMember)
    router.post('/addContact', ContactManagementController.InsertContactMember)
    router.put('/updateContact', ContactManagementController.updateContactMember)
    router.delete('/deleteContact', ContactManagementController.removeContactMember)

    router.get('/education', EducationManagementController.ViewEducation)
    router.post('/addEducation', EducationManagementController.InsertEducationMember)
    router.put('/updateEducation', EducationManagementController.UpdateEducationMember)
    router.delete('/deleteEducation', EducationManagementController.RemoveEducationMember)

    //API tuấn
    router.post('/member', FamilyMemberManagement.addMember)
    router.put('/member', FamilyMemberManagement.updateMember)
    router.delete('/member', FamilyMemberManagement.deleteMember)

   
    //API Nhật anh
    router.post('/search-member', FamilyMemberManagement.searchMember);
    router.post('/filter-member', FamilyMemberManagement.filterMember);
    router.post('/export-pdf', PdfController.exportPDF);

    router.get('/article', ArticleController.getAllArticle);
    router.post('/add-article', ArticleController.addArticle);
    router.put('/update-article', ArticleController.updateArticle);
    router.delete('/delete-article', ArticleController.deleteArticle);

    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;