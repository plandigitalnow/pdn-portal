// Database Connection Utility
// Für MySQL Connection mit Connection Pool

import mysql from 'mysql2/promise';

let pool = null;

/**
 * Get or create MySQL connection pool
 */
export function getPool() {
    if (!pool) {
        pool = mysql.createPool({
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || '3306'),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0
        });
    }
    return pool;
}

/**
 * Execute a query
 */
export async function query(sql, params = []) {
    const pool = getPool();
    const [rows] = await pool.execute(sql, params);
    return rows;
}

/**
 * Get a single row
 */
export async function queryOne(sql, params = []) {
    const rows = await query(sql, params);
    return rows[0] || null;
}

/**
 * Test database connection
 */
export async function testConnection() {
    try {
        const pool = getPool();
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();
        return { success: true, message: 'Database connection successful' };
    } catch (error) {
        return {
            success: false,
            message: 'Database connection failed',
            error: error.message
        };
    }
}

/**
 * Close all connections (for graceful shutdown)
 */
export async function closePool() {
    if (pool) {
        await pool.end();
        pool = null;
    }
}