const categoryController = require('../src/controllers/categoryController');

exports.getAllCategoryHandler = async (event, context) => {
    const books = await categoryController.getAllCategory();
    return {
        statusCode: 200,
        body: JSON.stringify(books)
    };
};
