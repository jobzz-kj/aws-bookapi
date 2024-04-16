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
    const categoryName = event.pathParameters.name;

    try {
        const connection = await pool.getConnection();

        try {
            const [rows] = await connection.execute(
                'SELECT category_id FROM category WHERE name = ?',
                [categoryName]
            );

            if (rows.length) {
                const categoryId = rows[0].category_id;
                return {
                    statusCode: 200,
                    body: { categoryId },
                };
            } else {
                return {
                    statusCode: 404,
                    body: JSON.stringify({ error: 'Category not found' }),
                };
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify({ error: 'Error fetching category from database' }),
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