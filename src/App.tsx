function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Kundenportal
                </h1>
                <p className="text-lg text-gray-600">
                    Willkommen im HubSpot Kundenportal!
                </p>
                <div className="mt-8 bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-semibold mb-4">Status</h2>
                    <p className="text-green-600 font-medium">✅ React SPA läuft!</p>
                    <p className="text-gray-600 mt-2">Bereit für HubSpot Integration</p>
                </div>
            </div>
        </div>
    )
}

export default App