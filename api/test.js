// Einfacher Test-Endpoint
// Aufruf: https://your-project.vercel.app/api/test

export default function handler(req, res) {
    // CORS Headers für dein Frontend
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle OPTIONS request (preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Einfache Test-Response
    return res.status(200).json({
        success: true,
        message: 'Vercel API funktioniert! ✅',
        timestamp: new Date().toISOString(),
        method: req.method
    });
}


