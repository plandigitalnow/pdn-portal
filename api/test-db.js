export default async function handler(req, res) {
    try {
        // Dynamic import für Vercel Serverless Functions
        const mysql = await import('mysql2/promise');

        const pool = mysql.default.createPool({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || '3306'),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test query
        const [rows] = await pool.query('SELECT 1 + 1 AS result');

        // Connection erfolgreich
        await pool.end();

        res.status(200).json({
            success: true,
            message: 'Database connection successful! ✅',
            timestamp: new Date().toISOString(),
            test_query: rows[0],
            environment: {
                mysql_connected: true,
                all_vars_present: !!(
                    process.env.MYSQL_HOST &&
                    process.env.MYSQL_USER &&
                    process.env.MYSQL_PASSWORD &&
                    process.env.MYSQL_DATABASE
                )
            }
        });
    } catch (error) {
        console.error('Database Error:', error);
        res.status(500).json({
            success: false,
            message: 'Database connection failed',
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            environment: {
                mysql_host: process.env.MYSQL_HOST || 'not set',
                mysql_database: process.env.MYSQL_DATABASE || 'not set',
                mysql_user: process.env.MYSQL_USER || 'not set',
                password_set: !!process.env.MYSQL_PASSWORD
            }
        });
    }
}