// HubSpot Test API Route
// Testet die Verbindung zur HubSpot API
// Aufruf: https://your-project.vercel.app/api/hubspot-test

import { Client } from '@hubspot/api-client';

export default async function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur GET erlaubt
    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            error: 'Method not allowed'
        });
    }

    try {
        // Prüfe ob Token vorhanden
        if (!process.env.HUBSPOT_ACCESS_TOKEN) {
            return res.status(500).json({
                success: false,
                error: 'HubSpot Access Token nicht konfiguriert',
                hint: 'Füge HUBSPOT_ACCESS_TOKEN in Vercel Environment Variables hinzu'
            });
        }

        // HubSpot Client initialisieren
        const hubspotClient = new Client({
            accessToken: process.env.HUBSPOT_ACCESS_TOKEN
        });

        // Test API Call - Account Info abrufen
        const accountInfo = await hubspotClient.apiRequest({
            method: 'GET',
            path: '/account-info/v3/api-usage/daily'
        });

        // Erfolgreiche Response
        return res.status(200).json({
            success: true,
            message: 'HubSpot API Verbindung erfolgreich! ✅',
            timestamp: new Date().toISOString(),
            accountInfo: {
                currentUsage: accountInfo.currentUsage || 0,
                dailyLimit: accountInfo.dailyLimit || 'N/A'
            }
        });

    } catch (error) {
        // Fehlerbehandlung
        console.error('HubSpot API Error:', error);

        // Spezifische Fehler
        if (error.code === 401 || error.statusCode === 401) {
            return res.status(401).json({
                success: false,
                error: 'HubSpot Authentication fehlgeschlagen',
                hint: 'Überprüfe deinen Access Token in Vercel Environment Variables',
                details: error.message
            });
        }

        if (error.code === 403 || error.statusCode === 403) {
            return res.status(403).json({
                success: false,
                error: 'HubSpot API Zugriff verweigert',
                hint: 'Überprüfe die Scopes deiner Private App',
                details: error.message
            });
        }

        // Allgemeiner Fehler
        return res.status(500).json({
            success: false,
            error: 'HubSpot API Fehler',
            details: error.message || 'Unbekannter Fehler'
        });
    }
}