const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { hash } = require('bcryptjs');


app.use(cors());
// Middleware
app.use(bodyParser.json());

// Mock adatbázis
let users = [
    { 
        _id: '1', 
        username: 'user1', 
        email: 'user1@example.com', 
        password: bcrypt.hashSync('password123', 10), // Hash-elt jelszó!
        favorites: ['101', '102'], 
        reviews: ['201', '202'],
        type: 'user' // Felhasználó típusa
    },
    { 
        _id: '2', 
        username: 'user2', 
        email: 'user2@example.com', 
        password: bcrypt.hashSync('password123', 10), // Hash-elt jelszó!
        favorites: ['103'], 
        reviews: ['203'],
        type: 'user' // Felhasználó típusa
    },
    { 
        _id: '3', 
        username: 'user3', 
        email: 'user3@example.com', 
        password: bcrypt.hashSync('password123', 10), // Hash-elt jelszó!
        favorites: ['103', '101'], 
        reviews: [],
        type: 'user' // Felhasználó típusa
    },
    { 
        _id: '4', 
        username: 'admin', 
        email: 'admin@example.com', 
        password: bcrypt.hashSync('admin', 10), // Hash-elt jelszó!
        favorites: [],
        reviews: [],
        type: 'admin' // Admin felhasználó
    },
    { 
        _id: '5', 
        username: 'provider', 
        email: 'provider@example.com', 
        password: bcrypt.hashSync('provider', 10), // Hash-elt jelszó!
        favorites: [],
        reviews: [],
        type: 'provider' // provider felhasználó
    }
];


let gyms = [
    { _id: '101', providerId: '5', name: 'Power Gym', location: 'Szeged', services: ['Yoga', 'Cardio'], rating: 4.5,"price": 17000, status: 'approved' },
    { _id: '102', name: 'Fitness 5 Skála', location: 'Budapest', services: ['Strength', 'HIIT'], rating: 4.2, "price": 14500, status: 'approved' },
    { _id: '103', name: 'Johnny Lantos Fitness', location: 'Budapest', services: ['Powerlifting', 'HIIT'], rating: 3.8, "price": 18500, status: 'pending' },
];

let reviews = [
    { _id: '201', gym: '101', user: '1', rating: 5, comment: 'Great gym!' },
    { _id: '202', gym: '102', user: '1', rating: 4, comment: 'Good but could improve.' },
    { _id: '203', gym: '101', user: '2', rating: 3, comment: "It wasn't so bad." },
    { _id: '204', gym: '102', user: '3', rating: 2, comment: "I didn't like it." },
    { _id: '205', gym: '103', user: '2', rating: 2, comment: 'Worst gym ever' }
];



// Felhasználói API-k
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    // Felhasználó keresése
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó');
    }

    // Jelszó ellenőrzése (simple check for mock)
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).send('Hibás bejelentkezési adatok');
    }

     // Token generálása
     const token = jwt.sign({ id: user._id, type: user.type }, 'SECRET_KEY', { expiresIn: '1h' });
    
     res.json({ token, userType: user.type });
 });

 // Regisztrációs végpont 

 app.post("/register", async (req, res) => {
    const { username, email, password, type } = req.body;
  
    // Ellenőrizzük, hogy létezik-e már a felhasználónév vagy az e-mail
    if (users.find(u => u.username === username)) {
      return res.status(400).json({ error: "Felhasználónév már létezik" });
    }
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: "E-mail már használatban van" });
    }
  
    // Jelszó hash-elése
    const hashedPassword = await hash(password, 10);
  
    // Új felhasználó létrehozása
    const newUser = {
      _id: (users.length + 1).toString(),
      username,
      email,
      password: hashedPassword, 
      favorites: [],
      reviews: [],
      type
    };
  
    users.push(newUser);
    res.status(201).json({ message: "Sikeres regisztráció!" });
  });


app.get('/konditermek', (req, res) => {
    const approvedGyms = gyms.filter(gym => gym.status === 'approved');
    res.json(approvedGyms);
});

app.get('/:userid/kedvencek', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        const userGyms = gyms.filter(gym => user.favorites.includes(gym._id));
        res.json(userGyms);
    } else {
        res.status(404).send('User not found');
    }
});

app.post('/:userid/kedvenc/:edzotermekid', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    const gym = gyms.find(g => g._id === req.params.edzotermekid);
    if (user && gym) {
        user.favorites.push(gym._id);
        res.status(201).send('Konditerem hozzáadva a kedvencekhez');
    } else {
        res.status(404).send('User or Gym not found');
    }
});

app.delete('/:userid/kedvenc/:edzotermekid', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        user.favorites = user.favorites.filter(gymId => gymId !== req.params.edzotermekid);
        res.status(200).send('Konditerem eltávolítva a kedvencekből');
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/:userid/ertekeleseim', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        const userReviews = reviews.filter(review => review.user === user._id);
        res.json(userReviews);
    } else {
        res.status(404).send('User not found');
    }
});

app.get('/:userid/profilom', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.put('/:userid/profilom', async (req, res) => {
    console.log("Beérkező adatok:", req.body); // Kiírja a frontendről érkező adatokat
    const user = users.find(u => u._id === req.params.userid);
    if (!user) {
        return res.status(404).send('User not found');
    }

    console.log("Felhasználó frissítés előtt:", user);

    // Ha jelszót is frissít a felhasználó
    if (req.body.newPassword && req.body.newPassword.trim() !== '') {
        const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedPassword;
    }
    
    user.email = req.body.email || user.email;  // Ha az email változott, frissítjük
    console.log("Felhasználó frissítés után:", user);

    Object.assign(user, req.body); // Frissítjük a többi adatot

    res.json({ message: 'Profil frissítve', user });
});

app.post('/:userid/profilom/ellenorzes', async (req, res) => {
    const { userid } = req.params;
    const { currentPassword } = req.body;

    // Felhasználó keresése a mock tömbben
    const user = users.find(u => u._id === userid);
    if (!user) {
        return res.status(404).json({ success: false, message: 'Felhasználó nem található!' });
    }

    // Jelszó ellenőrzése bcrypt-tel
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Hibás jelszó!' });
    }

    res.json({ success: true });
});



// Admin API-k
app.get('/admin/konditermek_kezelese', (req, res) => {
    const pendingGyms = gyms.filter(gym => gym.status === 'pending');
    res.json(pendingGyms);
});

app.patch('/admin/konditermek_kezelese/:id', (req, res) => {
    const gym = gyms.find(g => g._id === req.params.id);
    if (gym) {
        gym.status = req.body.status;
        res.send(`Konditerem státusza módosítva: ${gym.status}`);
    } else {
        res.status(404).send('Gym not found');
    }
});

// Admin API - Összes konditerem listázása
app.get('/admin/osszes_edzoterem', (req, res) => {
    res.json(gyms);
});

// Admin API - Konditerem törlése
app.delete('/admin/edzoterem_torles/:id', (req, res) => {
    const gymIndex = gyms.findIndex(g => g._id === req.params.id);
    if (gymIndex !== -1) {
        gyms.splice(gymIndex, 1);
        res.send('Konditerem törölve');
    } else {
        res.status(404).send('Gym not found');
    }
});


app.get('/admin/felhasznalok_kezelese', (req, res) => {
    res.json(users);
});

app.delete('/admin/felhasznalo_torles/:id', (req, res) => {
    const userIndex = users.findIndex(u => u._id === req.params.id);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.send('Felhasználó törölve');
    } else {
        res.status(404).send('Felhasználó nem található');
    }
});

app.get('/admin/ertekelesek_kezelese', (req, res) => {
    const reviews2 = reviews.map(review => {
        const gym = gyms.find(g => g._id === review.gym); // Megkeressük a gym nevét
        const user = users.find(u => u._id === review.user); // Megkeressük a felhasználót a review user ID-ja alapján

        return {
            ...review,
            gymName: gym ? gym.name : 'Ismeretlen gym', // Ha van megfelelő gym, hozzáadjuk a nevét, ha nem, 'Ismeretlen gym'
            userName: user ? user.username : 'Ismeretlen felhasználó' // Ha van megfelelő felhasználó, hozzáadjuk a nevét, ha nem, 'Ismeretlen felhasználó'
        };
    });

    res.json(reviews2); // Visszaküldjük a módosított reviews listát
});



app.delete('/admin/ertekeles_torles/:id', (req, res) => {
    const reviewIndex = reviews.findIndex(r => r._id === req.params.id);
    if (reviewIndex !== -1) {
        reviews.splice(reviewIndex, 1);
        res.json({ message: 'Értékelés törölve' });

    } else {
        res.status(404).send('Értékelés nem található');
    }
});




app.get('/admin/statisztika', (req, res) => {
    res.json({ gyms: gyms.length, users: users.length });
});

// Szolgáltató API-k
app.post('/:providerid/edzotermem', (req, res) => {
    const newGym = { 
        _id: (gyms.length + 1).toString(), 
        ...req.body, 
        status: 'pending' // Kezdetben minden edzőterem státusza "pending"
    };
    gyms.push(newGym);
    res.status(201).send('Konditerem hozzáadva, várakozik az admin jóváhagyására');
});

app.get('/:providerid/ertekelesek_attekintese', (req, res) => {
    const providerGyms = gyms.filter(gym => gym.providerId === req.params.providerid);
    const providerReviews = reviews.filter(review => providerGyms.some(gym => gym._id === review.gym));
    res.json(providerReviews);
});

// Server elindítása
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
