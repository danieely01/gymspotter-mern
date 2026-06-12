# GymSpotter - Edzőterem Kereső és Értékelő Platform

🌍 **Élő demó:** [https://gymspotter.onrender.com/](https://gymspotter.onrender.com/)

A GymSpotter egy Full-Stack webalkalmazás, amely hidat épít az edzőtermek üzemeltetői és a sportolni vágyók közé. A platform célja, hogy a felhasználók transzparens, közösség által értékelt képet kapjanak a különböző konditermekről, miközben a szolgáltatók bemutathatják saját termeiket. 

A rendszer fejlett szerepkör-alapú (Role-Based) jogosultságkezeléssel rendelkezik.

## 🚀 Főbb funkciók szerepkörök szerint

### 🏋️‍♂️ Felhasználók (Users)
* **Böngészés és Keresés:** A platformon elérhető, már jóváhagyott edzőtermek listázása.
* **Értékelési rendszer:** A látogatott termek értékelése 1-5 csillagos skálán, valamint szöveges vélemény (komment) formájában.

### 🏢 Szolgáltatók (Providers)
* **Terem regisztrációja:** Új edzőterem profiljának beküldése a rendszerbe (a megjelenés adminisztrátori jóváhagyáshoz kötött).

### 🛡️ Adminisztrátor (Admin)
* **Moderáció:** Újonnan beküldött edzőtermek áttekintése, jóváhagyása vagy elutasítása.
* **Tartalomkezelés:** Nem megfelelő értékelések (kommentek) és edzőtermek törlése.
* **Felhasználókezelés:** Felhasználói fiókok felfüggesztése/törlése a közösségi irányelvek betartatása érdekében.

## 🛠 Alkalmazott Technológiák

A projekt modern JavaScript/TypeScript ökoszisztémára épül.

**Frontend:**
* **Keretrendszer:** React 18 (Vite build tool segítségével a maximális sebességért).
* **Routing:** React Router v7 a kliensoldali navigációhoz.
* **Állapotkezelés & API Kommunikáció:** Axios a backend hívásokhoz.
* **Autentikáció:** `jwt-decode` a JSON Web Tokenek kliensoldali feldolgozásához.
* **UI & Dizájn:** Bootstrap 5, React-Bootstrap és React Icons a reszponzív, tiszta felületért.
* **Adatvizualizáció:** Chart.js (`react-chartjs-2`) a statisztikák és értékelések vizuális megjelenítéséhez.

**Backend:**
* Node.js alapú kiszolgáló (Express.js).
* JWT (JSON Web Token) alapú, biztonságos hitelesítés.

## 💻 Helyi futtatás (Local Development)

A projekt futtatásához Node.js környezet telepítése szükséges.

**1. A Backend elindítása:**
Nyiss egy terminált a `GymSpotter_backend` mappában, és futtasd az alábbi parancsokat:

    npm install
    node app.js

*(A backend alapértelmezett URL-je: `http://localhost:3000/`)*

**2. A Frontend elindítása:**
Nyiss egy új terminált a `Gymspotter_main` mappában, és futtasd ezeket:

    npm install
    npm run dev

*(A frontend elérhetősége: `http://localhost:5173/`)*

## 🔑 Tesztelési hozzáférés
A rendszer adminisztrátori funkcióinak teszteléséhez az alábbi hitelesítő adatok használhatók:
* **Felhasználónév:** `admin`
* **Jelszó:** `admin`
