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
    const bookId = event.pathParameters.id;

    try {
        const connection = await pool.getConnection();

        try {
            const [rows] = await connection.execute(
                'SELECT * FROM book WHERE book_id = ?',
                [bookId]
            );

            if (rows.length > 0) {
                return {
                    statusCode: 200,
                    body: rows[0],
                };
            } else {
                return {
                    statusCode: 404,
                    body: { error: 'Book not found' },
                };
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: { error: 'Error fetching book from database' },
            };
        } finally {
            connection.release();
        }
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: { error: 'Error connecting to database' },
        };
    }
};