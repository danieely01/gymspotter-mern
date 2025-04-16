const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');


app.use(cors());
// Middleware
app.use(bodyParser.json());

// Mock adatbázis
let users = [
    { 
        _id: '1', 
        username: 'user1', 
        email: 'user1@example.com', 
        password: 'password123', // Fontos: valós esetekben hashelni kell a jelszót
        favorites: ['101', '102'], 
        reviews: ['201', '202'],
        type: 'user' // Felhasználó típusa
    },
    { 
        _id: '2', 
        username: 'admin', 
        email: 'admin@example.com', 
        password: 'admin123',
        favorites: [],
        reviews: [],
        type: 'admin' // Admin felhasználó
    },
    { 
        _id: '3', 
        username: 'provider', 
        email: 'provider@example.com', 
        password: 'provider123',
        favorites: [],
        reviews: [],
        type: 'provider' // provider felhasználó
    }
];


let gyms = [
    { _id: '101', name: 'Power Gym', location: 'Szeged', services: ['Yoga', 'Cardio'], rating: 4.5,"price": 17000, status: 'approved' },
    { _id: '102', name: 'Fitness 5 Skála', location: 'Budapest', services: ['Strength', 'HIIT'], rating: 4.2, "price": 14500, status: 'approved' },
];

let reviews = [
    { _id: '201', gym: '101', user: '1', rating: 5, comment: 'Great gym!' },
    { _id: '202', gym: '102', user: '1', rating: 4, comment: 'Good but could improve.' },
];






// Felhasználói API-k
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    // Felhasználó keresése
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó');
    }

    // Jelszó ellenőrzése (simple check for mock)
    if (user.password !== password) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó');
    }

     // Token generálása
     const token = jwt.sign({ id: user._id, type: user.type }, 'SECRET_KEY', { expiresIn: '1h' });
    
     res.json({ token, userType: user.type });
 });

 // Regisztrációs végpont (alap példa)
app.post('/register', (req, res) => {
    const { username, email, password, type } = req.body;

    // Ellenőrizzük, hogy létezik-e már felhasználó a megadott felhasználónévvel
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
        return res.status(400).send('Felhasználónév már létezik');
    }

    // Új felhasználó hozzáadása
    const newUser = {
        _id: (users.length + 1).toString(),
        username,
        email,
        password, // Valós alkalmazásban a jelszót hashelni kellene
        favorites: [],
        reviews: [],
        type: type // Alapértelmezett felhasználói típus
    };

    users.push(newUser);
    res.status(201).send('Felhasználó sikeresen regisztrálva!');
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

app.put('/:userid/profilom', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        Object.assign(user, req.body); // Frissítjük a felhasználó adatokat
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Admin API-k
app.get('/admin/edzotermek_kezelese', (req, res) => {
    const pendingGyms = gyms.filter(gym => gym.status === 'pending');
    res.json(pendingGyms);
});

app.patch('/admin/edzotermek_kezelese/:id', (req, res) => {
    const gym = gyms.find(g => g._id === req.params.id);
    if (gym) {
        gym.status = req.body.status;
        res.send(`Konditerem státusza módosítva: ${gym.status}`);
    } else {
        res.status(404).send('Gym not found');
    }
});

app.get('/admin/felhasznalok_kezelese', (req, res) => {
    res.json(users);
});

app.get('/admin/ertekelesek_kezelese', (req, res) => {
    res.json(reviews);
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
