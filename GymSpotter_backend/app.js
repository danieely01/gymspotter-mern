const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { hash } = require('bcryptjs');
const { MongoClient, ServerApiVersion } = require('mongodb');

// const connectToDB = require('./db');



// Csatlakozás a MongoDD Atlas serverhez
const uri = "mongodb+srv://user:GymSpotter-2025@gymspotter.mvpvvpz.mongodb.net/?retryWrites=true&w=majority&appName=GymSpotter";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// Csatlakozás a MongoDB-hez
async function connectToDB() {
    try {
        // MongoClient inicializálása a Stable API verzióval
        if (!client.topology || !client.topology.isConnected()){
            await client.connect();
            console.log("Sikeresen csatlakozott MongoDB Atlas-hoz!");
        }
        return client.db('GymSpotter');
      } catch (error) {
        console.error("Hiba történt a MongoDB csatlakozása során:", error);
      }
  }
    
  // Kollekciók létrehozása
//   async function createCollections() {
//     const db = await connectToDB();  // Csatlakozás

  
//     try {
//       // Kollekciók létrehozása
//       await db.createCollection("Users");
//       console.log("Users collection created");
  
//       await db.createCollection("Gyms");
//       console.log("Gyms collection created");
  
//       await db.createCollection("Reviews");
//       console.log("Reviews collection created");
  
//     } catch (error) {
//       console.error("Error creating collections:", error);
//     } finally {
//       await client.close();  // Kapcsolat bezárása
//     }
//   }
//   createCollections();


  // Felhasználó hozzáadása az adatbázishoz, ha még nem létezik
//   async function addUserIfNotExists(newUser) {
//     // Az új MongoDB driver beállításokat alkalmazva létrehozza a MongoDB-klienset
//     const client = new MongoClient(uri, { useUnifiedTopology: true });
    
//     try {
//       await client.connect();
//       const db = client.db("GymSpotter");
//       const usersCollection = db.collection("Users");
  
//       // Ellenőrizzük, hogy a felhasználó ID-ja már létezik-e
//       const existingUser = await usersCollection.findOne({ Id: newUser.Id });
      
//       if (!existingUser) {
//         // Ha nem létezik, adjuk hozzá az új felhasználót
//         const result = await usersCollection.insertOne(newUser);
//         console.log("Új felhasználó hozzáadva Id-val:", result.insertedId);
        
//       } else {
//         console.log("Felhasználó már létezik ezzel az Id-val:", newUser.Id);
//       }
      
//     } catch (error) {
//       console.error("Error:", error);
//     } finally {
//       await client.close();  // Kapcsolat bezárása
//     }
//   }
  
  // Példa új felhasználóra, amit hozzá szeretnénk adni
//   const newUser = {
//     Id: 123456,  // Az új felhasználó egyedi ID-ja
//     name: "John Doe",
//     email: "john.doe@example.com",
//     password: "password123",
//     type: "user",
//     favourites: [],
//     reviews: []
// };
// addUserIfNotExists(newUser);



reviewIds = 1000;
gymIds = 1000;
userIds = 1000;








app.use(cors());
// Middleware
app.use(bodyParser.json());



// Tesztadatok feltöltése
// Fő futtatási funkció
// async function run() {
//     const client = await connectToDB();  // Csatlakozás
  
//     const db = client.db("GymSpotter"); // Adatbázis kiválasztása
//     const usersCollection = db.collection("Users");
//     const gymsCollection = db.collection("Gyms");
//     const reviewsCollection = db.collection("Reviews");
  
//     try {
//       await client.connect();
//       const db = client.db('GymSpotter'); // Cseréld ki az adatbázis nevére
  
//       // Felhasználók hozzáadása
//       await usersCollection.insertMany(users);
  
//       // Edzőtermek hozzáadása
//       await gymsCollection.insertMany(gyms);
  
//       // Vélemények hozzáadása
//       await reviewsCollection.insertMany(reviews);
  
//       console.log('Adatok sikeresen hozzáadva!');
//     } catch (error) {
//       console.error('Hiba történt:', error);
//     } finally {
//       await client.close();
//     }
// }
// run();
//már hozzá lettek adva a tesztadatok




// Felhasználói API-k


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await connectToDB();  // MongoDB kapcsolat létrehozása
    const usersCollection = db.collection('Users');  // A "Users" gyűjteményhez való hozzáférés

    try {
      // Felhasználó keresése
      const user = await usersCollection.findOne({ username });
      if (!user) {
        return res.status(401).send('Hibás felhasználónév vagy jelszó');
      }
  
      // Jelszó ellenőrzése
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).send('Hibás bejelentkezési adatok');
      }
  
      // Token generálása
      const token = jwt.sign({ Id: user.Id, type: user.type }, 'SECRET_KEY', { expiresIn: '1h' });
  
      // Válasz visszaküldése
      res.json({ token, userId: user.Id, userType: user.type, userName: user.username });
      
      // Az ügyfél kapcsolatot zárjuk be
      await client.close();
    } catch (error) {
      console.error("Bejelentkezési hiba:", error);
      res.status(500).send('Hiba történt a bejelentkezés során');
    }
  });



 // Regisztrációs végpont
 app.post("/register", async (req, res) => {
    const { username, email, password, type } = req.body;
    
    const db = await connectToDB();
    const usersCollection = db.collection('Users');
    
    try {
      // Ellenőrizzük, hogy létezik-e már a felhasználónév vagy e-mail
      const existingUserByUsername = await usersCollection.findOne({ username });
      const existingUserByEmail = await usersCollection.findOne({ email });
  
      if (existingUserByUsername) {
        return res.status(400).json({ error: "Felhasználónév már létezik" });
      }
      
      if (existingUserByEmail) {
        return res.status(400).json({ error: "Email már regisztrálva van" });
      }
  
      // Jelszó hash-elése
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Új felhasználó létrehozása
      const newUser = {
        Id: `${userIds + 1}`,
        username,
        email,
        password: hashedPassword,
        favorites: [],
        reviews: [],
        type
      };
      userIds++;

      // Felhasználó hozzáadása a Users kollekcióhoz
      const result = await usersCollection.insertOne(newUser);
  
      // Visszajelzés a sikeres regisztrációról
      res.status(201).json({ message: "Sikeres regisztráció!", userId: result.insertedId });
      console.log("Új felhasználó sikeresen regisztrálva!");
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Belső hiba történt" });
    }
  });
  

// User oldal konditermek kilistázása
app.get('/konditermek', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();

    try {
        // kollekciók tárolása
        const gymsCollection = db.collection('Gyms');
        const reviewsCollection = db.collection('Reviews');
        const usersCollection = db.collection('Users');

        // Konditermek lekérése, ahol a státusz 'approved'
        const approvedGyms = await gymsCollection.find({ status: 'approved' }).toArray();

        // Vélemények hozzáadása a konditermekhez
        const gymsWithReviews = await Promise.all(approvedGyms.map(async (gym) => {
            // Vélemények lekérése konditerem alapján
            const reviews = await reviewsCollection.find({ gym: gym.Id }).toArray();

            // Véleményekhez hozzáadjuk a felhasználó nevét
            const gymsWithUserReviews = await Promise.all(reviews.map(async (review) => {
                const user = await usersCollection.findOne({ Id: review.user });
                return {
                    ...review,
                    user: user ? user.username : 'Ismeretlen'
                };
            }));

            // átlag számítás véleményekhez
            if (gymsWithUserReviews.length > 0) {
                const avgRating = gymsWithUserReviews.reduce((acc, review) => acc + review.rating, 0) / gymsWithUserReviews.length;
                gym.rating = parseFloat(avgRating.toFixed(1));  // átlagolt értékelés
            }

            gym.reviews = gymsWithUserReviews;
            return gym;
        }));

        res.json(gymsWithReviews);
    } catch (error) {
        console.error("Hiba történt a konditermek lekérése során:", error);
        res.status(500).send('Hiba történt az adatbázis lekérése során');
    }
});



// User oldal értékelés  írása
app.post('/konditermek/:gymId/ertekeles', async (req, res) => {
    const { userId, rating, comment } = req.body;
    const { gymId } = req.params;
    
    // adatbázishoz kapcsolódás
    const db = await connectToDB();

    try {
        // kollekciók tárolása
        const gymsCollection = db.collection('Gyms');
        const reviewsCollection = db.collection('Reviews');
        const usersCollection = db.collection('Users');

        // Ellenőrizzük, hogy a felhasználó létezik-e
        const user = await usersCollection.findOne({ Id: userId });
        if (!user) {
            return res.status(404).json({ error: 'Felhasználó nem található' });
        }

        // Ellenőrizzük, hogy az edzőterem létezik-e
        const gym = await gymsCollection.findOne({ Id: gymId });
        if (!gym) {
            return res.status(404).json({ error: 'Edzőterem nem található' });
        }

        // Új vélemény létrehozása
        // console.log("Új Id: " + Object.keys(reviewsCollection).length + 1)
        const newReview = {
            Id: `${reviewIds + 1}`,
            gym_id: gymId,
            user_id: userId,
            rating: parseFloat(rating),
            comment
        };
        reviewIds++;

        // Vélemény hozzáadása az adatbázishoz
        const result = await reviewsCollection.insertOne(newReview);

        // Frissítjük a felhasználó véleményeit
        await usersCollection.updateOne(
            { Id: userId },
            { $push: { reviews: result.Id } }
        );

        // Frissítjük az edzőterem véleményeit
        const gymReviews = await reviewsCollection.find({ gym: gymId }).toArray();
        const avgRating = gymReviews.reduce((acc, review) => acc + review.rating, 0) / gymReviews.length;

        // Frissítjük az edzőterem átlagos értékelését
        await gymsCollection.updateOne(
            { Id: gymId },
            { $set: { rating: parseFloat(avgRating.toFixed(1)) } }
        );

        // Válasz visszaadása
        const updatedGym = await gymsCollection.findOne({ Id: gymId });
        res.json(updatedGym);
    } catch (error) {
        console.error("Hiba történt a vélemény hozzáadása során:", error);
        res.status(500).json({ error: 'Hiba történt a vélemény hozzáadása során' });
    }
}); 


// User oldal kedvencek fül
app.get('/:userid/kedvencek', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const usersCollection = db.collection('Users');
        const gymsCollection = db.collection('Gyms');
        
        // Felhasználó keresése Id alapján
        const user = await usersCollection.findOne({ Id: req.params.userid });

        if (!user) {
            return res.status(404).send('Nem található a felhasználó!');
        }

        // Ha a favorites nem tömb, akkor hibát dobunk
        if (!Array.isArray(user.favorites)) {
            return res.status(400).send('A kedvencek adat nem megfelelő formátumban van!');
        }

        // Approved állapottal rendelkező termek a felhasználó kedvencei között
        const userGymsCursor = gymsCollection.find({
            Id: { $in: user.favorites },  
            status: 'approved',       
        });

        // Kurzor átalakítása tömbbé
        const userGyms = await userGymsCursor.toArray();

        // Válasz visszaadása
        res.json(userGyms);

    } catch (error) {
        console.error('Error fetching user favorites:', error);
        res.status(500).send('Internal server error');
    }
});


/*
Kedvencekhez adom a termet
Kedvencek fül megnyitása
Vissza az edzőtermek fülre --> Nem piros a szív
*/
// User kedvencekhez adás
app.post('/:userid/kedvenc/:edzotermekid', async (req, res) => {

    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');
    const gymsCollection = db.collection('Gyms');

    // Felhasználó keresése Id alapján
    const user = await usersCollection.findOne({ Id: req.params.userid });

    // Konditerem keresése Id alapján
    const gym = await gymsCollection.findOne({ Id: req.params.edzotermekid });

    try { 
        if (user && gym) {
            // Ha még nem szerepel a kedvencek között, akkor hozzáadjuk
            if (!user.favorites.includes(gym.Id)) {
                await usersCollection.updateOne(
                    { Id: req.params.userid },
                    { $push: { favorites: gym.Id } }
                );
                res.status(201).send('Konditerem hozzáadva a kedvencekhez!');
            } else {
                res.status(400).send('A konditerem már a kedvencek között szerepel!');
            }
        } else {
            res.status(404).send('Felhasználó vagy konditerem nem található!');
        }
    } catch (error) {
        console.error('Error adding gym to favorites:', error);
        res.status(500).send('Internal server error');
    }
});

app.delete('/:userid/kedvenc/:edzotermekid', async (req, res) => {
    try {
        // Kapcsolódunk az adatbázishoz
        const db = await connectToDB();
        const usersCollection = db.collection('Users'); // 'Users' kollekció

        // Felhasználó keresése az ID alapján
        const user = await usersCollection.findOne({ Id: req.params.userid });
        
        if (!user) {
            return res.status(404).send('Felhasználó nem található!');
        }

        // Kedvenc konditermek listájának frissítése (konditerem eltávolítása)
        const updatedUser = await usersCollection.updateOne(
            { Id: req.params.userid }, // Felhasználó keresése az ID alapján
            { $pull: { favorites: req.params.edzotermekid } } // 'favorites' mezőből eltávolítjuk az edzőtermet
        );

        // Ha a frissítés sikeres, visszaküldjük a választ
        if (updatedUser.modifiedCount > 0) {
            res.status(200).send('Konditerem eltávolítva a kedvencekből');
        } else {
            res.status(400).send('Nem történt változás');
        }
    } catch (err) {
        console.error('Hiba történt a kedvenc konditerem törlésénél:', err);
        res.status(500).send('Hiba történt a kedvenc konditerem törlésénél');
    }
});


// nem jeleníti meg
app.get('/:userid/ertekeleseim', async (req, res) => {
    try {
        console.log(req.params.userid);  // Ellenőrizd, hogy megérkezik-e a providerId vagy userId
        const db = await connectToDB();  // Csatlakozás az adatbázishoz
        const usersCollection = db.collection('Users');  // Felhasználók kollekciója
        const reviewsCollection = db.collection('Reviews');  // Vélemények kollekciója
        
        // Felhasználó keresése az ID alapján
        const user = await usersCollection.findOne({ Id: req.params.userid });
        console.log('felh id:'+user.Id);
        if (!user) {
            return res.status(404).send('Felhasználó nem található');
        }

        // A felhasználó értékeléseinek keresése a user_id alapján
        const userReviews = await reviewsCollection.find({
            user_id: user.Id  // Feltételezzük, hogy az értékelések `user_id` mezője tartalmazza a felhasználó Id-ját
        }).toArray();
        console.log('userreviews hossz:'+userReviews.length);
        if (userReviews.length === 0) {
            return res.status(404).send('Nincs értékelés a felhasználóhoz');
        }

        // Az értékelések visszaküldése
        res.json(userReviews);

    } catch (error) {
        console.error('Hiba történt az értékelések lekérésekor:', error);
        res.status(500).send('Belső hiba történt');
    }
});





app.get('/:userid/profilom', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    try {
        const user = await usersCollection.findOne({ Id: req.params.userid });
        if (user) {
            res.json(user);
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Error retrieving user');
    }
});

// PUT: Profil frissítése
app.put('/:userid/profilom', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    try {
        console.log("Beérkező adatok:", req.body); // Kiírja a frontendről érkező adatokat

        // Felhasználó keresése ID alapján
        const user = await usersCollection.findOne({ Id: req.params.userid });

        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log("Felhasználó frissítés előtt:", user);

        // Ha jelszót is frissít a felhasználó
        if (req.body.newPassword && req.body.newPassword.trim() !== '') {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            user.password = hashedPassword;
        }

        // Frissítjük az emailt, ha változott
        user.email = req.body.email || user.email;

        // Frissítjük a többi adatot
        Object.assign(user, req.body);

        // Mentjük a frissített felhasználót az adatbázisba
        await user.save();

        console.log("Felhasználó frissítés után:", user);

        res.json({ message: 'Profil frissítve', user });
    } catch (err) {
        console.error('Hiba a felhasználó frissítésekor:', err);
        res.status(500).send('Error updating user');
    }
});



app.post('/:userid/profilom/ellenorzes', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    const { userid } = req.params;
    const { currentPassword } = req.body;

    try {
        // Felhasználó keresése ID alapján
        const user = await usersCollection.findOne({ Id: userid });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Felhasználó nem található!' });
        }

        // Jelszó ellenőrzése bcrypt-tel
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Hibás jelszó!' });
        }

        res.json({ success: true });
    } catch (err) {
        console.error('Hiba a jelszó ellenőrzésekor:', err);
        res.status(500).json({ success: false, message: 'Hiba történt a jelszó ellenőrzésekor' });
    }
});





// Admin API-k

// Összes edzőterem megjelenítée
app.get('/admin/osszes_edzoterem', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');
        
        // Az összes konditerem lekérdezése
        const gyms = await gymsCollection.find().toArray();

        res.json(gyms);  // Válasz visszaadása
    } catch (err) {
        console.error('Hiba történt a konditermek listázásakor:', err);
        res.status(500).send('Hiba történt a konditermek listázásakor');
    }
});

// Konditermek kezelése fül betöltése
app.get('/admin/konditermek_kezelese', async (req, res) => {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');

    try {


        // Pending státuszú konditermek lekérdezése
        const pendingGyms = await gymsCollection.find({ status: 'pending' }).toArray();

        // Ha nincs pending státuszú gym, visszaküldjük a megfelelő választ
        if (pendingGyms.length === 0) {
            return res.status(404).send('Nincs pending státuszú konditerem.');
        }

        res.json(pendingGyms);
    } catch (err) {
        console.error('Hiba történt a konditermek lekérdezésekor:', err);
        res.status(500).send('Hiba történt a konditermek lekérdezésekor.');
    }
});

// Edzőterem törlése gomb
app.delete('/admin/edzoterem_torles/:id', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');

        // Az _id mező alapján történő keresés (MongoDB-ban az ObjectId-t kell használni)
        const result = await gymsCollection.deleteOne({ Id: req.params.id });

        // Ha nem található a konditerem, válaszolunk hibával
        if (result.deletedCount === 0) {
            return res.status(404).send('Konditerem nem található');
        }

        // Sikeres törlés esetén
        res.send('Konditerem törölve');
    } catch (err) {
        console.error('Hiba történt a konditerem törlésekor:', err);
        res.status(500).send('Hiba történt a konditerem törlésekor');
    }
});

app.patch('/admin/konditermek_kezelese/:id', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');

        // Konditerem keresése az ID alapján
        const gym = await gymsCollection.findOne({ Id: req.params.id });  // Ha 'Id' mezőt használsz

        if (!gym) {
            return res.status(404).send('Konditerem nem található');
        }

        // Státusz frissítése
        const updatedGym = await gymsCollection.updateOne(
            { Id: req.params.id }, // Keresés az 'Id' mező alapján
            { $set: { status: req.body.status } } // Státusz frissítése
        );

        if (updatedGym.modifiedCount > 0) {
            res.send(`Konditerem státusza módosítva: ${req.body.status}`);
        } else {
            res.status(400).send('Hiba történt a státusz frissítésekor');
        }
    } catch (err) {
        console.error('Hiba történt a konditerem státuszának frissítésekor:', err);
        res.status(500).send('Hiba történt a konditerem státuszának frissítésekor');
    }
});




// Admin API - Felhasználók listázása
app.get('/admin/felhasznalok_kezelese', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        // Az összes felhasználó lekérdezése
        const users = await usersCollection.find().toArray(); // MongoDB natív módszer

        res.json(users);
    } catch (err) {
        console.error('Hiba történt a felhasználók listázásakor:', err);
        res.status(500).send('Hiba történt a felhasználók listázásakor');
    }
});

app.delete('/admin/felhasznalo_torles/:id', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const userId = req.params.id; // A frontend által küldött userId

        // Felhasználó törlése az 'Id' mező alapján
        const result = await usersCollection.deleteOne({ Id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).send('Felhasználó nem található');
        }

        res.send('Felhasználó törölve');
    } catch (err) {
        console.error('Hiba történt a felhasználó törlésekor:', err);
        res.status(500).send('Hiba történt a felhasználó törlésekor');
    }
});

// Admin API - Értékelések kezelése
app.get('/admin/ertekelesek_kezelese', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const usersCollection = db.collection('Users');
        const reviewsCollection = db.collection('Reviews');
        const gymsCollection = db.collection('Gyms');

        // Az összes értékelés lekérdezése
        const reviewsCursor = reviewsCollection.find(); // MongoDB natív keresés
        const reviews = await reviewsCursor.toArray(); // A kurzor átalakítása tömbbé

        // Az értékelések részletezése (felhasználó és konditerem információ)
        const reviewsWithDetails = await Promise.all(reviews.map(async (review) => {
            // Megkeressük a konditermet az Id alapján
            const gym = await gymsCollection.findOne({ Id: review.gym_id }); // MongoDB natív keresés
            // Megkeressük a felhasználót az Id alapján
            const user = await usersCollection.findOne({ Id: review.user_id }); // MongoDB natív keresés

            return {
                ...review,
                gymName: gym ? gym.name : 'Ismeretlen gym',
                userName: user ? user.username : 'Ismeretlen felhasználó',
            };
        }));

        // Válasz visszaküldése
        res.json(reviewsWithDetails);
    } catch (err) {
        console.error('Hiba történt az értékelések listázásakor:', err);
        res.status(500).send('Hiba történt az értékelések listázásakor');
    }
});

// Admin API - Értékelés törlése
app.delete('/admin/ertekeles_torles/:id', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const reviewsCollection = db.collection('Reviews');

    try {
        // Az értékelés törlése az Id alapján 
        const result = await reviewsCollection.findOneAndDelete({ _id: new ObjectId(req.params.id) });

        if (!result || !result.value) {  // Ha a result null vagy nincs benne value
            return res.status(404).send('Értékelés nem található');
        }

        // Ha sikeres volt a törlés, válasz visszaküldése
        res.json({ message: 'Értékelés törölve' });
    } catch (err) {
        console.error('Hiba történt az értékelés törlésekor:', err);
        res.status(500).send('Hiba történt az értékelés törlésekor');
    }
});


// Admin API - Statisztika lekérése
app.get('/admin/statisztika', async (req, res) => {
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const usersCollection = db.collection('Users');
        const gymsCollection = db.collection('Gyms');

        // Összes konditerem
        const gymsCount = await gymsCollection.countDocuments();

        // Összes felhasználó, akik nem adminok
        const usersCount = await usersCollection.countDocuments({ type: "user" });

        // Válasz visszaküldése
        res.json({ gyms: gymsCount, users: usersCount });
    } catch (err) {
        console.error('Hiba történt a statisztika lekérésekor:', err);
        res.status(500).send('Hiba történt a statisztika lekérésekor');
    }
});


// Szolgáltató API-k
app.get('/:userId/check-gym', async (req, res) => {
    const userId  = req.params.id;

    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');
        
        // Keresés a MongoDB-ben a providerId és a státusz alapján
        const userGyms = await gymsCollection.find({
            providerId: userId,
            status: { $in: ['approved', 'pending'] }
        }).toArray();

        // Ellenőrizzük, hogy van-e olyan edzőterem, amely "approved" vagy "pending" státuszú
        if (userGyms.length > 0) {
            // Ha van regisztrált edzőterem
            return res.status(200).json({ canAddGym: false });
        } else {
            // Ha nincs, engedjük az új edzőterem hozzáadását
            return res.status(200).json({ canAddGym: true });
        }
    } catch (err) {
        console.error('Hiba történt az edzőtermek lekérdezésekor:', err);
        res.status(500).send('Hiba történt az edzőtermek lekérdezésekor');
    }
});


app.post('/:providerid/edzotermem', async (req, res) => {
    const provider_Id = req.params.id;
    const { name, services, price, email, phoneNumber, location } = req.body;
    // console.log(provider_Id);
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');

        // Ellenőrizzük, hogy a felhasználóhoz tartozó edzőterem státusza 'approved' vagy 'pending'
        const existingGym = await gymsCollection.findOne({
            providerId: provider_Id,
            $or: [
                { status: 'approved' },
                { status: 'pending' }
            ]
        });

        if (existingGym) {
            return res.status(400).json({ message: 'Már van edzőtermed!' });
        }

        // Új edzőterem hozzáadása 'pending' státusszal
        const newGym = {
            Id: `${gymIds + 1}`,
            providerId: `${provider_Id}`,
            name,
            services: services.split(',').map(service => service.trim()),
            price,
            email,
            phoneNumber,
            location,
            status: 'pending',
        };
        gymIds++;
        // Az új edzőterem mentése a MongoDB-be
        const result = await gymsCollection.insertOne(newGym);

        // Válasz visszaküldése
        res.status(201).json({
            Id: result.Id,
            ...newGym
        });
    } catch (err) {
        console.error('Hiba történt az edzőterem hozzáadása közben:', err);
        res.status(500).send('Hiba történt az edzőterem hozzáadása közben');
    }
});

app.get('/:providerid/ertekelesek_attekintese', async (req, res) => {
    try {
        console.log(req.params.providerid);  // Ellenőrizzük, hogy megérkezik e a proiderId
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');
        const reviewsCollection = db.collection('Reviews');
        
        const providerGyms = await gymsCollection.find({ providerId: req.params.providerid }).toArray();
        // console.log(providerGyms.length)
        if (providerGyms.length === 0) {
            return res.status(404).send('Nincs olyan konditerem, amelyhez tartozik ez a providerId.');
        }

        const gym_Ids = providerGyms.map(gym => gym.Id);
        // console.log(gym_Ids)
        const providerReviews = await reviewsCollection.find({
            gym_id: { $in: gym_Ids }
        }).toArray();

        res.json(providerReviews);
    } catch (err) {
        console.error('Hiba történt az értékelések lekérésekor:', err);
        res.status(500).send('Hiba történt az értékelések lekérésekor');
    }
});

// Server elindítása
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
