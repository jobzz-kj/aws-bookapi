const mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

const pool = mysql.createPool(dbConfig);

exports.handler = async (event) => {
    const { categoryId, categoryName } = event.body;

    try {
        const connection = await pool.getConnection();

        try {
            await connection.execute(
                'INSERT INTO category (category_id, name) VALUES (?, ?)',
                [categoryId, categoryName]
            );

            return {
                statusCode: 201,
                body: JSON.stringify({ message: 'Category added successfully' }),
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error adding category to database' }),
            };
        } finally {
            connection.release();
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error connecting to database' }),
        };
    }
};