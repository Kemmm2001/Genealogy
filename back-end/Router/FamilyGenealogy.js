const express = require('express');
const ManagerFamilyTree = require('../Controller/FamilyGenealogy/FamilyTree')
const FamilyMemberManagement = require('../Controller/FamilyGenealogy/FamilyMember')
const PdfController = require('../Controller/FamilyGenealogy/pdfController')
const ArticleController = require('../Controller/FamilyGenealogy/ArticleController')
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

    router.get('/viewTree', ManagerFamilyTree.AllMemberInGenelogy)   
    // router.post('/setGeneration', ManagerFamilyTree.setGeneration)
    router.delete('/removeFamilyHead', ManagerFamilyTree.removeRoleFamilyHead)

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