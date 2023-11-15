const e = require("express");
const ArticleManagementService = require("../../service/FamilyGenealogy/ArticleManagement");


var getAllArticle = async (req, res) => {
    try {
        const articles = await ArticleManagementService.getAllArticle();
        res.json({ success: true, message: 'Articles retrieved successfully', data: articles });
    } catch (e) {
        console.error('Error fetching articles:', e);
        res.status(500).json({ success: false, message: 'Error fetching articles' });
    }
};

var getArticle = async (req, res) => {
    try {
        const articleId = req.body.articleId; // Lấy ArticleID từ đường dẫn URL
        const codeId = req.body.codeId; // Lấy CodeID từ đường dẫn URL
        console.log(articleId)
        console.log(codeId)
        // Gọi hàm service để lấy bài viết dựa trên ArticleID và CodeID
        const article = await ArticleManagementService.getArticle(articleId, codeId);
        console.log(article)
        // Kiểm tra xem bài viết có tồn tại hay không
        if (!article) {
            console.error('Không tìm thấy bài viết');
            return res.status(404).json({ success: false, message: 'Không tìm thấy bài viết' });
        }

        // Trả về thông tin bài viết
        res.json({ success: true, message: 'Lấy bài viết thành công', data: article });
    } catch (e) {
        console.error('Lỗi:', e);
        res.status(500).json({ success: false, message: 'Lỗi khi lấy bài viết' });
    }
};

var addArticle = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        let response;       
        const requiredFields = ['CodeID', 'ArticleUrl', 'ArticleName', 'ArticleDescription'];
        const missingFields = requiredFields.filter(field => !(field in req.body));
        console.log(missingFields);
        // trong trường hợp thiếu trường bắt buộc
        if (missingFields.length) {
            console.error(`Missing required fields: ${missingFields.join(', ')}`);

            response = {
                success: false,
                message: 'Missing required fields',
                missingFields: missingFields
            };

            return res.status(400).json(response);
        }
        console.log("No missing fields");
        // thêm member vào database
        const article = await ArticleManagementService.addArticle(req.body);
        console.log("Add article successfully");
        response = {
            success: true,
            message: 'Add article successfully',
            data: article
        };
        return res.json(response);

    } catch (e) {
        res.send(e);
    }
};

var deleteArticle = async (req, res) => {
    try {
        console.log("Request body: ", req.params);

        // Gọi hàm xóa bài viết từ service
        const result = await ArticleManagementService.deleteArticle(req.params.articleId);

        // Kiểm tra xem việc xóa bài viết có thành công hay không
        if (result.affectedRows === 0) {
            const response = {
                success: false,
                message: 'Delete article failed, no article found',
                data: {
                    articleId: req.body.articleId,
                    affectedRows: result.affectedRows,
                    changedRows: result.changedRows
                }
            };
            return res.json(response);
        } else {
            const response = {
                success: true,
                message: 'Delete article successfully',
                data: {
                    articleId: req.body.articleId,
                    affectedRows: result.affectedRows,
                    changedRows: result.changedRows
                }
            };
            return res.json(response);
        }
    } catch (e) {
        res.send(e);
    }
}

var updateArticle = async (req, res) => {
    try {
        // Log ra thông tin trong req.body
        console.log('Request body: ', req.body);
        let response;

        // Update the article in the database
        const updatedArticle = await ArticleManagementService.updateArticle(req.params.articleId,req.params.codeId,req.body);
        
        // Check if the article was successfully updated
        if (!updatedArticle) {
            console.error('Failed to update the article');
            return res.status(500).json({ success: false, message: 'Failed to update the article' });
        }

        response = {
            success: true,
            message: 'Update article successfully',
            data: updatedArticle
        };

        return res.json(response);

    } catch (e) {
        res.send(e);
    }
};



module.exports = {getAllArticle, getArticle, addArticle, updateArticle, deleteArticle};