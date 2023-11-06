const express = require('express');
const FamilyHeadController = require('../Controller/InformationGenealogy/FamilyHeadController')
const GeneralInformation = require('../Controller/InformationGenealogy/GeneralInformationController')
const FamilyHistoryController = require('../Controller/InformationGenealogy/FamilyHistory');
const StatisticsController = require('../Controller/InformationGenealogy/StatisticsController')
const AlbumPhotoController = require('../Controller/InformationGenealogy/AlbumPhotoController');
const ArticleController = require('../Controller/FamilyGenealogy/ArticleController')
const MemberPhotoController = require('../Controller/InformationGenealogy/MemberPhotoController');
const AddressController = require('../Controller/InformationGenealogy/AddressController');
const fs = require('fs');

var router = express.Router();
const multer = require("multer");
const crypto = require('crypto');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, '/uploads/images/member-photo');
        },
        filename: (req, file, cb) => {
            // Tạo tên file ngẫu nhiên
            let fileName = generateRandomFileName(file);

            // Kiểm tra tồn tại
            const destPath = `uploads/images/member-photo/${fileName}`;
            while (fs.existsSync(destPath)) {
                // Nếu tồn tại, tạo tên mới
                console.log('File đã tồn tại, tạo tên mới');
                fileName = generateRandomFileName(file);
            }
            console.log('Tên file mới:', fileName);
            // Tên chưa tồn tại, lưu file
            cb(null, fileName);
        }
    })
});

function generateRandomFileName(file) {
    // Tạo tên file ngẫu nhiên
    const randomName = crypto.randomBytes(15).toString('hex');
    // Thêm đuôi file gốc vào 
    const fileName = `${randomName}.${file.originalname.split('.').pop()}`;
    return fileName;
}



const initWebRouter = (app) => {
    //API Hùng
    router.get('/familyhead', FamilyHeadController.ListFamilyHead)
    router.delete('/removeFamilyHead', FamilyHeadController.removeRoleFamilyHead)
    router.post('newGeneral', GeneralInformation.InsertNewGeneralInformation)

    router.get('/generalInfor', GeneralInformation.GetGeneralInformation)
    router.put('/updateInfor', GeneralInformation.UpdateGeneralInformation)

    router.get('/statistics', StatisticsController.Statistics)
    router.get('/filterMonth', StatisticsController.filterMemberByMonth)
    router.get('/filterByAge', StatisticsController.FilterMemberByAge)

    //API tuấn
    // Create a new FamilyHistory
    router.post('/familyhistory', FamilyHistoryController.addFamilyHistory);
    // Retrieve a single FamilyHistory with id
    router.get('/familyhistory', FamilyHistoryController.getFamilyHistory);
    // Update a FamilyHistory with id
    router.put('/familyhistory', FamilyHistoryController.updateFamilyHistory);
    // Delete a FamilyHistory with id
    router.delete('/familyhistory', FamilyHistoryController.deleteFamilyHistory);

    // Create a new AlbumPhoto
    router.post('/albumphoto', AlbumPhotoController.addAlbumPhoto);
    // Retrieve a single AlbumPhoto with id
    router.get('/albumphoto', AlbumPhotoController.getAlbumPhoto);
    // Update an AlbumPhoto with id
    router.put('/albumphoto', AlbumPhotoController.updateAlbumPhoto);
    // Delete an AlbumPhoto with id
    router.delete('/albumphoto', AlbumPhotoController.deleteAlbumPhoto);

    // Create a new MemberPhoto
    router.post('/memberphoto', upload.single('Photo'), MemberPhotoController.addMemberPhoto);
    // Retrieve a single MemberPhoto with id
    router.get('/memberphoto', MemberPhotoController.getMemberPhoto);
    // Update a MemberPhoto with id
    router.put('/memberphoto', upload.single('Photo'), MemberPhotoController.updateMemberPhoto);
    // Delete a MemberPhoto with id
    router.delete('/memberphoto', MemberPhotoController.deleteMemberPhoto);
    // End API tuấn
    //API Nhật anh

    router.get('/article', ArticleController.getAllArticle);
    router.post('/article', ArticleController.getArticle);
    router.post('/add-article', ArticleController.addArticle);
    router.put('/update-article', ArticleController.updateArticle);
    router.delete('/delete-article', ArticleController.deleteArticle);

    router.get('/province', AddressController.getProvince);
    router.get('district/:id', AddressController.getDistrict);
    //Tiền tố đứng trước route
    app.use('/api/v1', router);
}

module.exports = initWebRouter;