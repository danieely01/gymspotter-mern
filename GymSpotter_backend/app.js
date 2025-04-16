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
        password: bcrypt.hashSync('password123', 10), 
        favorites: ['101', '102'], 
        reviews: ['201', '202', '208', '213', '218', '225'],
        type: 'user' 
    },
    { 
        _id: '2', 
        username: 'user2', 
        email: 'user2@example.com', 
        password: bcrypt.hashSync('password123', 10), 
        favorites: ['103'], 
        reviews: ['203', '204', '212', '216', '219', '223', '226'],
        type: 'user' 
    },
    { 
        _id: '3', 
        username: 'user3', 
        email: 'user3@example.com', 
        password: bcrypt.hashSync('password123', 10), 
        favorites: ['101'], 
        reviews: ['205', '209', '217', '220', '224', '227'],
        type: 'user' 
    },
    { 
        _id: '4', 
        username: 'user4', 
        email: 'user4@example.com', 
        password: bcrypt.hashSync('password123', 10), 
        favorites: ['104', '105'], 
        reviews: ['206', '211', '214', '221', '228'],
        type: 'user' 
    },
    { 
        _id: '5', 
        username: 'user5', 
        email: 'user5@example.com', 
        password: bcrypt.hashSync('password123', 10), 
        favorites: ['106'], 
        reviews: ['207', '210', '215', '222', '229'],
        type: 'user' 
    },

    // Admin felhasználók
    { 
        _id: '6', 
        username: 'admin', 
        email: 'admin@example.com', 
        password: bcrypt.hashSync('admin', 10), 
        favorites: [],
        reviews: [],
        type: 'admin' 
    },
    { 
        _id: '7', 
        username: 'admin2', 
        email: 'admin2@example.com', 
        password: bcrypt.hashSync('secureadmin', 10), 
        favorites: [],
        reviews: [],
        type: 'admin' 
    },

    // Szolgáltatók (providerek)
    { _id: '8', username: 'provider1', email: 'provider1@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '9', username: 'provider2', email: 'provider2@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '10', username: 'provider3', email: 'provider3@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '11', username: 'provider4', email: 'provider4@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '12', username: 'provider5', email: 'provider5@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '13', username: 'provider6', email: 'provider6@example.com', password: bcrypt.hashSync('provider123', 10), type: 'provider' },
    { _id: '14', username: 'provider7', email: 'provider7@example.com', password: bcrypt.hashSync('urbanfit', 10), type: 'provider' },
    { _id: '15', username: 'provider8', email: 'provider8@example.com', password: bcrypt.hashSync('protrainer', 10), type: 'provider' },
    { _id: '16', username: 'provider9', email: 'provider9@example.com', password: bcrypt.hashSync('titanmode', 10), type: 'provider' },
    { _id: '17', username: 'provider10', email: 'provider10@example.com', password: bcrypt.hashSync('flexfit', 10), type: 'provider' },
    { _id: '18', username: 'provider11', email: 'provider11@example.com', password: bcrypt.hashSync('pendingfit', 10), type: 'provider' },
    { _id: '19', username: 'provider12', email: 'provider12@example.com', password: bcrypt.hashSync('maxpower', 10), type: 'provider' },
    { _id: '20', username: 'provider13', email: 'provider13@example.com', password: bcrypt.hashSync('oldschool', 10), type: 'provider' },
    { _id: '21', username: 'provider14', email: 'provider14@example.com', password: bcrypt.hashSync('energyboost', 10), type: 'provider' }
];


let gyms = [
    { _id: '101', providerId: '8', phonenumber:'+36 11 7685 8423',  email:"titkosmiki1@gmail.com", name: 'Power Gym', location: 'Szeged', services: ['Yoga', 'Cardio'], rating: 4.5, price: "Havi bérlet: 15.000, Napi jegy: 1200", status: 'approved' },
    { _id: '102', providerId: '9', phonenumber:'+36 11 7685 8424',  email:"titkosmiki2@gmail.com", name: 'Fitness 5 Skála', location: 'Budapest', services: ['Strength', 'HIIT'], rating: 4.2, price: 14500, status: 'approved' },
    { _id: '103', providerId: '10', phonenumber:'+36 11 7685 8425', email:"titkosmiki3@gmail.com", name: 'Johnny Lantos Fitness', location: 'Budapest', services: ['Powerlifting', 'HIIT'], rating: 3.8, price: 18500, status: 'approved' },
    { _id: '104', providerId: '11', phonenumber:'+36 11 7685 8426', email:"titkosmiki4@gmail.com", name: 'Elite Gym', location: 'Debrecen', services: ['Bodybuilding', 'CrossFit'], rating: 4.7, price: 16000, status: 'approved' },
    { _id: '105', providerId: '12', phonenumber:'+36 11 7685 8427', email:"titkosmiki5@gmail.com", name: 'Spartan Strength', location: 'Győr', services: ['Weightlifting', 'Functional Training'], rating: 4.6, price: 15500, status: 'approved' },
    { _id: '106', providerId: '13', phonenumber:'+36 11 7685 8428', email:"titkosmiki6@gmail.com", name: 'Iron Paradise', location: 'Pécs', services: ['Powerlifting', 'Strongman'], rating: 4.3, price: 16500, status: 'approved' },
    { _id: '107', providerId: '14', phonenumber:'+36 11 7685 8429', email:"titkosmiki7@gmail.com", name: 'Urban Fit', location: 'Budapest', services: ['HIIT', 'Pilates'], rating: 4.1, price: 14000, status: 'approved' },
    { _id: '108', providerId: '15', phonenumber:'+36 11 7685 8410', email:"titkosmiki8@gmail.com", name: 'Pro Athlete Gym', location: 'Miskolc', services: ['Strength Training', 'Personal Training'], rating: 4.8, price: 18000, status: 'approved' },
    { _id: '109', providerId: '16', phonenumber:'+36 11 7685 8411', email:"titkosmiki9@gmail.com", name: 'Titan Gym', location: 'Székesfehérvár', services: ['Boxing', 'MMA'], rating: 4.4, price: 15000, status: 'approved' },
    { _id: '110', providerId: '17', phonenumber:'+36 11 7685 8412', email:"titkosmiki10@gmail.com", name: 'Flex & Fit', location: 'Nyíregyháza', services: ['Yoga', 'Zumba'], rating: 4.0, price: 13500, status: 'approved' },
    
    // Pending státuszú edzőtermek
    { _id: '111', providerId: '18', name: 'Future Fitness', location: 'Eger', services: ['CrossFit', 'Calisthenics'], rating: 3.9, price: 14500, status: 'pending' },
    { _id: '112', providerId: '19', name: 'Max Performance', location: 'Kecskemét', services: ['Bodybuilding', 'Powerlifting'], rating: 3.7, price: 15500, status: 'pending' },

    // Declined státuszú edzőtermek
    { _id: '113', providerId: '20', name: 'Old School Gym', location: 'Tatabánya', services: ['Strength Training', 'Weightlifting'], rating: 2.5, price: 12500, status: 'declined' },
    { _id: '114', providerId: '21', name: 'Energy Fit', location: 'Sopron', services: ['HIIT', 'Spinning'], rating: 3.1, price: 13500, status: 'declined' }
];


let reviews = [
    { _id: '201', gym: '101', user: '1', rating: 5, comment: 'Great gym!' },
    { _id: '202', gym: '102', user: '1', rating: 4, comment: 'Good but could improve.' },
    { _id: '203', gym: '101', user: '2', rating: 3, comment: "It wasn't so bad." },
    { _id: '204', gym: '103', user: '2', rating: 2, comment: 'Worst gym ever' },
    { _id: '205', gym: '102', user: '3', rating: 2, comment: "I didn't like it." },
    { _id: '206', gym: '104', user: '4', rating: 4, comment: "Nice place, good machines." },
    { _id: '207', gym: '105', user: '5', rating: 5, comment: "Loved the atmosphere!" },
    { _id: '208', gym: '106', user: '1', rating: 3, comment: "Decent, but nothing special." },
    { _id: '209', gym: '101', user: '3', rating: 4, comment: "Friendly staff, clean place." },
    { _id: '210', gym: '102', user: '5', rating: 5, comment: "Best gym in town!" },
    { _id: '211', gym: '103', user: '4', rating: 1, comment: "Terrible experience, never again." },
    { _id: '212', gym: '105', user: '2', rating: 4, comment: "Good for the price." },
    { _id: '213', gym: '106', user: '1', rating: 3, comment: "Could use better equipment." },
    { _id: '214', gym: '107', user: '4', rating: 5, comment: "Awesome gym, great vibes!" },
    { _id: '215', gym: '108', user: '5', rating: 4, comment: "Clean and well maintained." },
    { _id: '216', gym: '109', user: '2', rating: 3, comment: "A bit too crowded for me." },
    { _id: '217', gym: '110', user: '3', rating: 2, comment: "Needs better equipment." },
    { _id: '218', gym: '111', user: '1', rating: 5, comment: "Highly recommend!" },
    { _id: '219', gym: '112', user: '2', rating: 4, comment: "Good atmosphere, friendly staff." },
    { _id: '220', gym: '113', user: '3', rating: 3, comment: "Not bad, but nothing special." },
    { _id: '221', gym: '114', user: '4', rating: 2, comment: "Wouldn't go back." },
    { _id: '222', gym: '107', user: '5', rating: 4, comment: "Good machines, but a bit pricey." },
    { _id: '223', gym: '108', user: '2', rating: 3, comment: "Could use better air conditioning." },
    { _id: '224', gym: '109', user: '3', rating: 5, comment: "One of the best gyms I've been to!" },
    { _id: '225', gym: '110', user: '1', rating: 2, comment: "Needs more free weights." },
    { _id: '226', gym: '111', user: '2', rating: 5, comment: "Amazing place!" },
    { _id: '227', gym: '112', user: '3', rating: 4, comment: "Very well equipped gym." },
    { _id: '228', gym: '113', user: '4', rating: 3, comment: "Decent, but overpriced." },
    { _id: '229', gym: '114', user: '5', rating: 1, comment: "Worst experience ever." }
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
    
     res.json({ token, userId: user._id, userType: user.type, userName: user.username });
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
     // Vélemények hozzáadása a konditermekhez
    // Vélemények hozzáadása a konditermekhez
    const gymsWithReviews = approvedGyms.map(gym => {
        // Szűrjük a véleményeket a konditerem alapján
        gym.reviews = reviews
            .filter(review => review.gym === gym._id)  // Vélemények szűrése konditerem alapján
            .map(review => {
                // A véleményekhez hozzáadjuk a felhasználó nevét
                const user = users.find(u => u._id === review.user);
                return {
                    ...review,
                    user: user ? user.username : 'Unknown'  // Ha nem találjuk, akkor 'Unknown' név
                };
            });

             // Ha vannak vélemények, számoljuk ki az átlagot
        if (gym.reviews.length > 0) {
            const avgRating = gym.reviews.reduce((acc, review) => acc + review.rating, 0) / gym.reviews.length;
            gym.rating = parseFloat(avgRating.toFixed(1));  // Az átlagolt értékelés
        }
        return gym;
    });

    res.json(gymsWithReviews);
});

app.post('/konditermek/:gymId/ertekeles', (req, res) => {
    const { userId, rating, comment } = req.body;
    const { gymId } = req.params;

    // Ellenőrizzük, hogy a felhasználó létezik-e
    const user = users.find(u => u._id === userId);
    console.log(userId)
    if (!user) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
    }

    // Ellenőrizzük, hogy az edzőterem létezik-e
    const gym = gyms.find(g => g._id === gymId);
    if (!gym) {
        return res.status(404).json({ error: 'Edzőterem nem található' });
    }

    // Új vélemény létrehozása
    const newReview = {
        _id: (reviews.length + 201).toString(), // Új ID generálása
        gym: gymId,
        user: userId,
        rating: parseFloat(rating),
        comment
    };
    reviews.push(newReview);
    user.reviews.push(newReview._id);

    // Frissítjük az edzőterem átlagos értékelését
    const gymReviews = reviews.filter(r => r.gym === gymId);
    const avgRating = gymReviews.reduce((acc, r) => acc + r.rating, 0) / gymReviews.length;
    gym.rating = parseFloat(avgRating.toFixed(1));

    res.json(gym);
});


app.get('/:userid/kedvencek', (req, res) => {
    const user = users.find(u => u._id === req.params.userid);
    if (user) {
        const userGyms = gyms.filter(gym => user.favorites.includes(gym._id) && gym.status === 'approved');
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
    res.json({ gyms: gyms.length, users: users.filter(user => user.type === "user").length });
});

// Szolgáltató API-k
app.get('/:userId/check-gym', (req, res) => {
    const { userId } = req.params;
  
    // Keresd meg azokat az edzőtermeket, amelyek tartalmazzák a megadott providerId-t (felhasználó ID-ja)
    const userGyms = gyms.filter(gym => gym.providerId === userId);
  
    // Ellenőrizzük, hogy a felhasználónak van-e olyan edzőterme, amely "approved" vagy "pending" státuszt kapott
    const hasApprovedOrPendingGym = userGyms.some(gym => gym.status === 'approved' || gym.status === 'pending');
  
    if (hasApprovedOrPendingGym) {
      // Ha van már regisztrált edzőterme, nem engedjük új form megjelenítését
      return res.status(200).json({ canAddGym: false });
    } else {
      // Ha nincs, engedjük a formot
      return res.status(200).json({ canAddGym: true });
    }
  });


app.post('/:providerid/edzotermem', (req, res) => {
    const providerId = req.params.providerid;
    const { name, services, price, email, phoneNumber, location } = req.body;

    // Ellenőrizzük, hogy a felhasználóhoz tartozó edzőterem státusza approved vagy pending
    const existingGym = gyms.find(gym => gym.providerId === providerId && (gym.status === 'approved' || gym.status === 'pending'));

    if (existingGym) {
        return res.status(400).json({ message: 'Már van edzőtermed!' });
    }

    // Új edzőterem hozzáadása pending státusszal
    const newGym = {
        _id: (gyms.length + 1).toString(),
        providerId,
        name,
        services: services.split(',').map(service => service.trim()),
        price,
        email,
        phoneNumber,
        location,
        status: 'pending',
    };

    gyms.push(newGym);

    res.status(201).json(newGym);
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
