# HubSpot Kundenportal - Projekt Status

**Letzte Aktualisierung:** 31. Oktober 2025, 12:05 Uhr
**Projekt:** pdn-portal (HubSpot Customer Portal)
**Domain:** portal.plandigitalnow.com

---

## 🎯 Projektziel

Entwicklung eines umfassenden Kundenportals, das mit HubSpot CRM integriert ist.
Kunden können ihre Daten, Deals, Tickets, Dateien und mehr einsehen und verwalten.

---

## ✅ Was bereits funktioniert

### 1. Infrastruktur
- ✅ Domain portal.plandigitalnow.com ist konfiguriert (DNS bei Variomedia → HostEurope Server)
- ✅ Server-IP: 92.205.175.153
- ✅ Hosting: HostEurope cPanel (Benutzer: voiv5vvt4la6)
- ✅ Git Repository: https://github.com/plandigitalnow/pdn-portal.git
- ✅ PHPStorm mit SFTP Deployment konfiguriert

### 2. Technologie-Stack
- ✅ React 18.3.1 (TypeScript)
- ✅ Vite 5.4.8 als Build Tool
- ✅ TailwindCSS für Styling
- ✅ React Router (installiert, noch nicht implementiert)
- ✅ HubSpot API Client (@hubspot/api-client v11.2.0)

### 3. Lokale Entwicklung
- ✅ Projekt läuft lokal auf http://localhost:3000
- ✅ Production Build funktioniert (npm run build)
- ✅ Automatisches Deployment von PHPStorm zu HostEurope konfiguriert

### 4. HubSpot Integration
- ✅ Private App in HubSpot erstellt (Name: im HubSpot Account unter Legacy Apps)
- ✅ Access Token generiert und sicher gespeichert
- ✅ Scopes konfiguriert (siehe unten)

---

## 🔧 Technische Konfiguration

### Lokales Projekt
**Pfad:** `C:\Users\LutzEckelmann\PhpstormProjects\pdn-portal`

**Wichtige Dateien:**
```
pdn-portal/
├── src/
│   ├── main.tsx          # Entry Point
│   ├── App.tsx           # Haupt-App-Komponente
│   └── index.css         # Tailwind CSS
├── dist/                 # Production Build (wird generiert)
├── public/               # Statische Assets
├── .env.local            # Environment Variables (NICHT in Git!)
├── index.html            # HTML Entry Point
├── vite.config.ts        # Vite Konfiguration
├── tailwind.config.ts    # Tailwind Konfiguration
├── postcss.config.mjs    # PostCSS Konfiguration
├── tsconfig.json         # TypeScript Konfiguration
└── package.json          # Dependencies
```

### Server (HostEurope)
**Pfad:** `/home/voiv5vvt4la6/portal/`

**Document Root (WICHTIG):**
- Sollte auf `/home/voiv5vvt4la6/portal/dist` zeigen
- Status: LETZTE AKTION war das Ändern des Document Root (muss noch bestätigt werden)

**Deployment:**
- Automatisch via PHPStorm SFTP
- Bei Speichern (Ctrl+S) werden Dateien hochgeladen
- Manuell: Tools → Deployment → Upload to HostEurope Production

---

## 🔐 HubSpot Private App Scopes

Die Private App hat folgende Berechtigungen:

### ✅ Konfigurierte Scopes:
```
✓ conversations.read
✓ conversations.write
✓ crm.objects.companies.read
✓ crm.objects.companies.write
✓ crm.objects.contacts.read
✓ crm.objects.contacts.write
✓ crm.objects.deals.read
✓ crm.objects.deals.write
✓ crm.objects.line_items.read
✓ crm.objects.owners.read
✓ e-commerce
✓ files
✓ files.ui_hidden.read
✓ sales-email-read
✓ tickets
✓ timeline
```

**⚠️ WICHTIG:**
- Der Benutzer ist HubSpot Partner
- Als Partner hat er Zugriff auf mehr Scopes als normale Starter-Kunden
- Kunden mit HubSpot Starter haben NICHT: tickets, e-commerce, conversations
- Das Portal sollte feature detection implementieren!

### Access Token Location:
- **Lokal:** `.env.local` (Variable: `HUBSPOT_ACCESS_TOKEN`)
- **Server:** War als Environment Variable in Node.js App konfiguriert (Node.js App wurde gelöscht)
- **⚠️ NÄCHSTER SCHRITT:** Access Token muss anders verfügbar gemacht werden für SPA

---

## 📦 Dependencies
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.26.2",
    "@hubspot/api-client": "^11.2.0",
    "express": "^4.x.x"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "~5.6.2",
    "vite": "^5.4.8"
  }
}
```

---

## 🚀 Deployment-Prozess

### Lokal entwickeln:
```bash
npm run dev          # Startet Dev Server auf localhost:3000
```

### Production Build erstellen:
```bash
npm run build        # Erstellt dist/ Ordner
```

### Auf Server deployen:
1. **PHPStorm:** Tools → Deployment → Upload to HostEurope Production
2. Oder: Automatisch bei Ctrl+S (wenn aktiviert)

### ⚠️ WICHTIG - Node.js App wurde gelöscht:
- Früher: Node.js Express Server für statische Dateien
- Jetzt: Direkt über Apache/LiteSpeed Webserver
- Document Root sollte auf `portal/dist` zeigen

---

## 🔄 Git Workflow
```bash
# Lokale Änderungen committen:
git add .
git commit -m "Beschreibung"
git push

# Stand vom Server pullen:
git pull
```

**Branches:**
- `main` - Production Branch

---

## 📋 Nächste Schritte

### Sofort zu erledigen:
1. ✅ **Document Root Änderung bestätigen**
    - In cPanel → Domains → portal.plandigitalnow.com
    - Prüfen ob Document Root auf `portal/dist` gesetzt wurde
    - Testen: http://portal.plandigitalnow.com sollte das React Portal anzeigen

2. **API-Zugriff für SPA lösen**
    - Problem: React SPA läuft im Browser, kann Access Token nicht sicher speichern
    - Lösungen:
        - **A) Backend API auf Server erstellen** (z.B. PHP oder Node.js API Routes)
        - **B) HubSpot OAuth implementieren** (sichere User-basierte Auth)
        - **C) Serverless Functions** (z.B. Netlify/Vercel Functions)

### Entwicklung - Phase 1 (MVP):
3. **Routing implementieren**
    - React Router einrichten
    - Routen: /login, /dashboard, /deals, /tickets, /profile

4. **Authentication System**
    - Login-Page erstellen
    - HubSpot Contact Email als Username
    - Session Management

5. **Dashboard erstellen**
    - Übersicht für eingeloggte Kunden
    - Anzeige von: offene Deals, aktive Tickets, letzte Aktivitäten

### Entwicklung - Phase 2 (Features):
6. **Deals-Übersicht**
    - Liste aller Deals des Kunden
    - Deal Details anzeigen
    - Timeline/Aktivitäten

7. **Ticket-System**
    - Tickets anzeigen
    - Neue Tickets erstellen
    - Ticket-Status updates

8. **Datei-Management**
    - Dateien anzeigen
    - Download-Funktion
    - Upload neue Dateien

9. **Profil-Verwaltung**
    - Kontaktdaten anzeigen
    - Kontaktdaten bearbeiten (Name, Email, Telefon, etc.)

---

## ⚠️ Bekannte Probleme & Lösungen

### Problem 1: Next.js auf cPanel funktionierte nicht
**Gelöst:** Umstellung auf React SPA mit Vite
- Next.js + Passenger war zu kompliziert
- React SPA ist einfacher zu deployen auf cPanel
- Statische Dateien direkt vom Webserver serviert

### Problem 2: Access Token Sicherheit
**Status:** Noch zu lösen
- Access Token darf NICHT im Frontend-Code stehen
- Optionen:
    - Backend API erstellen (PHP oder Node.js)
    - OAuth Flow implementieren
    - Serverless Functions nutzen

### Problem 3: Feature Detection für verschiedene HubSpot Tiers
**Status:** Noch zu implementieren
- Partner Account hat mehr Scopes als Starter
- Portal muss erkennen welche Features verfügbar sind
- Graceful degradation implementieren

---

## 🔒 Sicherheits-Hinweise

### Sensible Dateien (NICHT in Git):
- `.env.local` - Enthält HUBSPOT_ACCESS_TOKEN
- `node_modules/` - Dependencies
- `dist/` - Build Output

### .gitignore:
```
node_modules/
dist/
.env*
.DS_Store
```

**✅ Aktuell:** Alles korrekt konfiguriert

---

## 📞 Kontakte & Zugänge

### Domain-Provider:
- **Provider:** Variomedia
- **Domain:** plandigitalnow.com
- **Subdomain:** portal.plandigitalnow.com
- **DNS A-Record:** 92.205.175.153

### Hosting:
- **Provider:** HostEurope
- **cPanel Benutzer:** voiv5vvt4la6
- **Server-IP:** 92.205.175.153
- **cPanel URL:** https://sxb1plmcpnl504348.prod.sxb1.secureserver.net:2083

### HubSpot:
- **Account:** plandigitalnow (Partner Account)
- **Private App:** Im HubSpot unter Settings → Integrations → Legacy Apps
- **Portal ID:** (steht in HubSpot oben rechts)

### GitHub:
- **Repository:** https://github.com/plandigitalnow/pdn-portal.git
- **Organization:** plandigitalnow

---

## 💡 Architektur-Entscheidungen

### Warum React SPA statt Next.js?
- ✅ Einfacher zu deployen auf cPanel
- ✅ Keine Server-Konfiguration nötig
- ✅ Schnellere Entwicklung
- ✅ Perfekt für API-basierte Anwendungen
- ❌ Kein SSR (aber nicht nötig für Auth-Portal)
- ❌ Kein SEO (aber nicht nötig für Auth-Portal)

### Warum Vite statt Create React App?
- ✅ Deutlich schneller (HMR)
- ✅ Moderner und besser maintained
- ✅ Bessere TypeScript Integration
- ✅ Kleinere Build-Größe

### Warum TailwindCSS?
- ✅ Schnelles Prototyping
- ✅ Utility-First Approach
- ✅ Keine CSS-Namenskonflikte
- ✅ Responsive Design out of the box

---

## 📊 Projekt-Status

**Aktueller Stand:** 25% fertig
- ✅ Infrastruktur Setup
- ✅ Lokale Entwicklungsumgebung
- ✅ HubSpot Integration vorbereitet
- ⏳ Document Root Umstellung (letzte Aktion)
- ❌ API-Backend noch nicht implementiert
- ❌ Authentication noch nicht implementiert
- ❌ Keine Features implementiert

**Geschätzte Zeit bis MVP:** 2-3 Wochen

---

## 🎬 Quick Start für nächsten Chat
```bash
# 1. Projekt Status prüfen
cd C:\Users\LutzEckelmann\PhpstormProjects\pdn-portal
git status
git pull

# 2. Dependencies prüfen
npm install

# 3. Lokal starten
npm run dev
# → Browser: http://localhost:3000

# 4. Production Build
npm run build

# 5. Deployen
# In PHPStorm: Tools → Deployment → Upload to HostEurope Production
```

**Erste Aufgabe für nächsten Chat:**
1. Prüfen ob http://portal.plandigitalnow.com funktioniert
2. Falls nicht: Document Root in cPanel auf `portal/dist` setzen
3. Dann: Backend API-Strategie entscheiden

---

## 📚 Wichtige Dokumentation

- **Vite:** https://vitejs.dev/
- **React Router:** https://reactrouter.com/
- **TailwindCSS:** https://tailwindcss.com/
- **HubSpot API:** https://developers.hubspot.com/docs/api/overview
- **HubSpot Private Apps:** https://developers.hubspot.com/docs/api/private-apps

---

**Ende der Dokumentation**
**Bereit für Übergabe! ✅**