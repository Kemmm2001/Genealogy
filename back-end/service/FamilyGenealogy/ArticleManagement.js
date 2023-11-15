const db = require("../../Models/ConnectDB")

function getAllArticle() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM article';

        db.connection.query(query, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });

}

function getArticle(articleId, codeId) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM article WHERE ArticleID = ? AND CodeID = ?';
        const values = [articleId, codeId];

        db.connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                if (results.length === 0) {
                    // Không tìm thấy bài viết với ArticleID và CodeID cụ thể
                    reject('Không tìm thấy bài viết');
                } else {
                    resolve(results[0]);
                }
            }
        });
    });
}


function addArticle(article) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO article (CodeID, ArticleUrl, ArticleName, ArticleDescription)
            VALUES (?, ?, ?, ?)
        `;

        const values = [
            article.CodeID,
            article.ArticleUrl,
            article.ArticleName,
            article.ArticleDescription
        ];

        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function updateArticle(articleId,codeId, updatedData) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE article
            SET ArticleUrl = ?,
                ArticleName = ?,
                ArticleDescription = ?
            WHERE ArticleID = ? AND CodeID = ?
        `;

        const values = [
            updatedData.ArticleUrl,
            updatedData.ArticleName,
            updatedData.ArticleDescription,
            articleId,
            codeId
        ];

        db.connection.query(query, values, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

function deleteArticle(articleId) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM article WHERE ArticleID = ?`;

        db.connection.query(query, articleId, (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn cơ sở dữ liệu:', err);
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}
module.exports = { getAllArticle, getArticle, addArticle, updateArticle, deleteArticle };