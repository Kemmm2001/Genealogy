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
function addArticle(article) {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO article (CodeID, ArticleUrl)
            VALUES (?, ?)
        `;

        const values = [
            article.CodeID,
            article.ArticleUrl
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

function updateArticle(articleId, updatedData) {
    return new Promise((resolve, reject) => {
        const query = `
            UPDATE article
            SET CodeID = ?,
                ArticleUrl = ?
            WHERE ArticleID = ?
        `;

        const values = [
            updatedData.CodeID,
            updatedData.ArticleUrl,
            articleId
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
        const query = `
            DELETE FROM article
            WHERE ArticleID = ?
        `;

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
module.exports = { getAllArticle, addArticle, updateArticle, deleteArticle };