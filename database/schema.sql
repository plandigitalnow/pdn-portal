-- PDN Portal - MySQL Schema
-- Für HubSpot Customer Portal mit Auth + MFA

-- ===================================
-- Tabelle 1: One-Time Setup Tokens
-- ===================================
-- Für den initialen Setup-Link (24h gültig)

CREATE TABLE IF NOT EXISTS portal_onetime_tokens (
                                                     id INT AUTO_INCREMENT PRIMARY KEY,
                                                     token VARCHAR(64) UNIQUE NOT NULL,
    hubspot_contact_id VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN DEFAULT false,
    used_at TIMESTAMP NULL,
    ip_address VARCHAR(45),

    INDEX idx_token (token),
    INDEX idx_contact (hubspot_contact_id),
    INDEX idx_email (email),
    INDEX idx_expires (expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- Tabelle 2: User Sessions
-- ===================================
-- Speichert aktive Login-Sessions mit JWT

CREATE TABLE IF NOT EXISTS portal_sessions (
                                               id INT AUTO_INCREMENT PRIMARY KEY,
                                               hubspot_contact_id VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    jwt_token TEXT NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_active BOOLEAN DEFAULT true,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_contact (hubspot_contact_id),
    INDEX idx_email (email),
    INDEX idx_active (is_active, expires_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- Tabelle 3: Login History
-- ===================================
-- Audit-Log für alle Login-Versuche

CREATE TABLE IF NOT EXISTS portal_login_history (
                                                    id INT AUTO_INCREMENT PRIMARY KEY,
                                                    hubspot_contact_id VARCHAR(50),
    email VARCHAR(255) NOT NULL,
    success BOOLEAN NOT NULL,
    failure_reason VARCHAR(255),
    ip_address VARCHAR(45),
    user_agent TEXT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_contact (hubspot_contact_id),
    INDEX idx_email (email),
    INDEX idx_timestamp (timestamp),
    INDEX idx_success (success)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- Tabelle 4: Webhook Log
-- ===================================
-- Debug-Log für HubSpot Webhook Events

CREATE TABLE IF NOT EXISTS portal_webhook_log (
                                                  id INT AUTO_INCREMENT PRIMARY KEY,
                                                  event_type VARCHAR(100) NOT NULL,
    hubspot_contact_id VARCHAR(50),
    email VARCHAR(255),
    payload TEXT,
    processed BOOLEAN DEFAULT false,
    error TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_contact (hubspot_contact_id),
    INDEX idx_processed (processed),
    INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ===================================
-- Info: HubSpot Contact Properties
-- ===================================
-- Diese Properties müssen in HubSpot angelegt sein:
--
-- 1. portal_access_approved (Single checkbox)
--    - Trigger für Webhook
--
-- 2. portal_password_hash (Single-line text)
--    - bcrypt hash vom Passwort
--
-- 3. portal_mfa_secret (Single-line text)
--    - Encrypted MFA secret
--
-- 4. portal_mfa_enabled (Single checkbox)
--    - Ist MFA aktiviert?
-- ===================================