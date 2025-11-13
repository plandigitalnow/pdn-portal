// Test API Route für MySQL Connection
// Aufruf: /api/test-db

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Check Environment Variables
        const envCheck = {
            MYSQL_HOST: !!process.env.MYSQL_HOST,
            MYSQL_USER: !!process.env.MYSQL_USER,
            MYSQL_PASSWORD: !!process.env.MYSQL_PASSWORD,
            MYSQL_DATABASE: !!process.env.MYSQL_DATABASE,
            JWT_SECRET: !!process.env.JWT_SECRET,
            RESEND_API_KEY: !!process.env.RESEND_API_KEY,
            HUBSPOT_ACCESS_TOKEN: !!process.env.HUBSPOT_ACCESS_TOKEN
        };

        const missingEnv = Object.entries(envCheck)
            .filter(([key, value]) => !value)
            .map(([key]) => key);

        if (missingEnv.length > 0) {
            return res.status(500).json({
                success: false,
                error: 'Missing environment variables',
                missing: missingEnv,
                hint: 'Add missing variables in Vercel Dashboard → Settings → Environment Variables'
            });
        }

        // Dynamic import für db utility
        const { testConnection } = await import('../../lib/db.js');

        // Test MySQL Connection
        const dbTest = await testConnection();

        if (!dbTest.success) {
            return res.status(500).json({
                success: false,
                error: 'Database connection failed',
                details: dbTest.error,
                config: {
                    host: process.env.MYSQL_HOST,
                    port: process.env.MYSQL_PORT || '3306',
                    user: process.env.MYSQL_USER,
                    database: process.env.MYSQL_DATABASE
                }
            });
        }

        // Test simple query
        const { query } = await import('../../lib/db.js');
        const result = await query('SELECT 1 + 1 AS result');

        return res.status(200).json({
            success: true,
            message: 'Database connection successful! ✅',
            timestamp: new Date().toISOString(),
            test_query: result[0],
            environment: {
                all_vars_present: true,
                mysql_connected: true
            }
        });

    } catch (error) {
        console.error('Database test error:', error);

        return res.status(500).json({
            success: false,
            error: 'Database test failed',
            details: error.message,
            hint: 'Check MySQL credentials and network access'
        });
    }
}