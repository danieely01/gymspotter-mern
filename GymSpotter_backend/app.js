const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require("bcrypt");
const { hash } = require('bcryptjs');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



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
    
//   // Kollekciók létrehozása
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











app.use(cors());
// Middleware
app.use(bodyParser.json());

forUsersCollection = [
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c85"),
      "username": "kovacs_peter",
      "email": "peter.kovacs@example.com",
      "password": bcrypt.hashSync('password123', 10),
      "type": "user",
      "Favourites": [ new ObjectId("60d21b4667d0d8992e610c86")],
      "Reviews": [ new ObjectId("60d21b4667d0d8992e610c87")]
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c88"),
      "username": "szabo_anna",
      "email": "anna.szabo@example.com",
      "password": bcrypt.hashSync('password456', 10),
      "type": "provider",
      "Favourites": [],
      "Reviews": []
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c89"),
      "username": "kiss_gabor",
      "email": "gabor.kiss@example.com",
      "password": bcrypt.hashSync('password789', 10),
      "type": "admin",
      "Favourites": [],
      "Reviews": []
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c8a"),
      "username": "nagy_zoltan",
      "email": "zoltan.nagy@example.com",
      "password": bcrypt.hashSync('password321', 10),
      "type": "user",
      "Favourites": [ new ObjectId("60d21b4667d0d8992e610c86")],
      "Reviews": [ new ObjectId("60d21b4667d0d8992e610c88")]
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c8b"),
      "username": "toth_maria",
      "email": "maria.toth@example.com",
      "password": bcrypt.hashSync('password654', 10),
      "type": "user",
      "Favourites": [],
      "Reviews": [ new ObjectId("60d21b4667d0d8992e610c89")]
    }
  ];
  

forGymsCollection = [
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c86"),
      "providerId": new ObjectId("60d21b4667d0d8992e610c88"),
      "gymName": "Fit Gym",
      "email": "fitgym@example.com",
      "phoneNumber": "+36 1 234 5678",
      "location": "Budapest, XX. kerület",
      "services": ["személyi edzés", "group fitness", "jóga"],
      "rating": 4.5,
      "price": "10000 HUF / hónap",
      "status": "approved"
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c87"),
      "providerId": new ObjectId("60d21b4667d0d8992e610c89"),
      "gymName": "Power Gym",
      "email": "powergym@example.com",
      "phoneNumber": "+36 1 234 5679",
      "location": "Budapest, I. kerület",
      "services": ["erőnléti edzés", "személyi edzés", "úszás"],
      "rating": 4.8,
      "price": "12000 HUF / hónap",
      "status": "pending"
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c88"),
      "providerId": new ObjectId("60d21b4667d0d8992e610c8a"),
      "gymName": "Ultra Fitness",
      "email": "ultrafitness@example.com",
      "phoneNumber": "+36 1 234 5680",
      "location": "Budapest, V. kerület",
      "services": ["crossfit", "jóga", "pilates"],
      "rating": 4.7,
      "price": "15000 HUF / hónap",
      "status": "approved"
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c89"),
      "providerId": new ObjectId("60d21b4667d0d8992e610c8b"),
      "gymName": "Super Gym",
      "email": "supergym@example.com",
      "phoneNumber": "+36 1 234 5681",
      "location": "Budapest, II. kerület",
      "services": ["erőnléti edzés", "súlyzós edzés", "csoportos órák"],
      "rating": 3.9,
      "price": "8000 HUF / hónap",
      "status": "decline"
    }
  ];

forReviewsCollection = [
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c87"),
      "user_id": new ObjectId("60d21b4667d0d8992e610c85"),
      "gym_id": new ObjectId("60d21b4667d0d8992e610c86"),
      "comment": "Nagyon jó edzőterem, szeretem a személyi edzőket!",
      "rating": 5
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c88"),
      "user_id": new ObjectId("60d21b4667d0d8992e610c8a"),
      "gym_id": new ObjectId("60d21b4667d0d8992e610c87"),
      "comment": "Tökéletes a hely, de a szolgáltatások ára magas.",
      "rating": 4
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c89"),
      "user_id": new ObjectId("60d21b4667d0d8992e610c8b"),
      "gym_id": new ObjectId("60d21b4667d0d8992e610c88"),
      "comment": "Minden rendben volt, a légkör nagyon barátságos.",
      "rating": 4
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c8a"),
      "user_id": new ObjectId("60d21b4667d0d8992e610c85"),
      "gym_id": new ObjectId("60d21b4667d0d8992e610c86"),
      "comment": "Tökéletes hely, de túl zsúfolt.",
      "rating": 3
    },
    {
      "_id": new ObjectId("60d21b4667d0d8992e610c8b"),
      "user_id": new ObjectId("60d21b4667d0d8992e610c89"),
      "gym_id": new ObjectId("60d21b4667d0d8992e610c87"),
      "comment": "Jó edzőterem, de az árak magasak.",
      "rating": 3
    }
  ];
  
// ujAdmin = {
//     "_id": new ObjectId("60d21b4667d0d8992e610c99"),
//     "username": "admin",
//     "email": "admin@example.com",
//     "password": bcrypt.hashSync('admin', 10),
//     "type": "admin",
//     "Favourites": [],
//     "Reviews": []
//   }
// async function adminInsert(){
//     const db = await connectToDB();
//     const usersCollection = db.collection('Users');
//     try {
//         await client.connect();
//         await usersCollection.insertOne(ujAdmin);
//     }
//     catch{
//         console.log("Nem sikerült....");
//     }
// }
// adminInsert();
// Tesztadatok feltöltése
// Fő futtatási funkció
// async function run() {
  
//     const db = await connectToDB(); // Adatbázis kiválasztása
//     const usersCollection = db.collection('Users');
//     const gymsCollection = db.collection('Gyms');
//     const reviewsCollection = db.collection('Reviews');
  
//     try {
//       await client.connect();
  
//       // Felhasználók hozzáadása
//       await usersCollection.insertMany(forUsersCollection);
  
//       // Edzőtermek hozzáadása
//     //   await gymsCollection.insertMany(forGymsCollection);
  
//       // Vélemények hozzáadása
//     //   await reviewsCollection.insertMany(forReviewsCollection);
  
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

  try {
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    // Felhasználó keresése
    const user = await usersCollection.findOne({ username: username });
    console.log("admin: "+ user)
    if (!user) {
      return res.status(401).send('Hibás felhasználónév vagy jelszó');
    }

    // Jelszó ellenőrzése
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send('Hibás bejelentkezési adatok');
    }

    // Token generálása
    const token = jwt.sign(
      { id: user._id.toString(), type: user.type },
      'SECRET_KEY', // Ne feledd, ezt rakd környezetváltozóba production-ben
      { expiresIn: '1h' }
    );

    // Válasz visszaküldése
    res.json({
      token,
      userId: user._id,
      userType: user.type,
      userName: user.username
    });

  } catch (error) {
    console.error('Bejelentkezési hiba:', error);
    res.status(500).send('Hiba történt a bejelentkezés során');
  }
});


// Regisztrációs végpont
app.post('/register', async (req, res) => {
  const { username, email, password, type } = req.body;

  try {
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    // Felhasználónév vagy email ellenőrzés
    const existingUser = await usersCollection.findOne({
      $or: [{ username }, { email }]
    });

    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: 'Felhasználónév már létezik' });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: 'Email már regisztrálva van' });
      }
    }

    // Jelszó hash-elése
    const hashedPassword = await bcrypt.hash(password, 10);

    // Új felhasználó létrehozása
    const newUser = {
      username,
      email,
      password: hashedPassword,
      favorites: [],
      reviews: [],
      type,
    };

    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({
      message: 'Sikeres regisztráció!',
      userId: result.insertedId
    });

    console.log('Új felhasználó regisztrálva:', result.insertedId);

  } catch (error) {
    console.error('Regisztrációs hiba:', error);
    res.status(500).json({ error: 'Belső hiba történt' });
  }
});
  

app.get('/konditermek', async (req, res) => {
    try {
      const db = await connectToDB();
  
      const gymsCollection = db.collection('Gyms');
      const reviewsCollection = db.collection('Reviews');
      const usersCollection = db.collection('Users');
        
      // Csak az 'approved' konditermek lekérése
      const approvedGyms = await gymsCollection.find({ status: 'approved' }).toArray();
  
      // Konditermekhez kapcsolódó vélemények és értékelések hozzáadása
      const gymsWithReviews = await Promise.all(approvedGyms.map(async (gym) => {
        // Vélemények lekérése ehhez a kondihoz (feltételezve hogy gym._id-t használunk)
        const reviews = await reviewsCollection.find({ gym_id: gym._id }).toArray();
        
        //ÜRES A REVIEWS TÖMB  !!MEGOLDVA ! 04_12
        console.log(reviews);
        console.log(gym._id);
        
        // Véleményekhez felhasználónevek hozzácsatolása
        const enrichedReviews = await Promise.all(reviews.map(async (review) => {

            
          const user = await usersCollection.findOne({ _id: review._id });

          return {
            ...review,
            user: user ? user.username : 'Ismeretlen'
          };
        }));
  
        // Átlag értékelés számítás
        if (enrichedReviews.length > 0) {
          const avgRating = enrichedReviews.reduce((acc, review) => acc + review.rating, 0) / enrichedReviews.length;
          gym.rating = parseFloat(avgRating.toFixed(1));
        }
  
        gym.reviews = enrichedReviews;
        return gym;
      }));
  
      res.json(gymsWithReviews);
    } catch (error) {
      console.error("Hiba történt a konditermek lekérése során:", error);
      res.status(500).send('Hiba történt az adatbázis lekérése során');
    }
  });



// User oldal értékelés  írása --> JAVÍTÁSRA VÁR
app.post('/konditermek/:gymId/ertekeles', async (req, res) => {
    const { userId, rating, comment } = req.body;
    const gymId  = new ObjectId(req.params.gymId);
    const objectified_userID = ObjectId.createFromHexString(userId);


    console.log('user_id' + objectified_userID);

    try {
      const db = await connectToDB();
      const gymsCollection = db.collection('Gyms');
      const reviewsCollection = db.collection('Reviews');
      const usersCollection = db.collection('Users');
  
      // Ellenőrizzük, hogy a felhasználó létezik-e
      const user = await usersCollection.findOne({ _id: objectified_userID });
      if (!user) {
        return res.status(404).json({ error: 'Felhasználó nem található' });
      }
  
      // Ellenőrizzük, hogy az edzőterem létezik-e
      const gym = await gymsCollection.findOne({ _id: gymId });
      if (!gym) {
        return res.status(404).json({ error: 'Edzőterem nem található' });
      }
  
      // Új vélemény létrehozása
      const newReview = {
        gym_id: gymId,
        user_id: objectified_userID,
        rating: parseFloat(rating),
        comment,
      };
  
      // Vélemény hozzáadása az adatbázishoz
      const result = await reviewsCollection.insertOne(newReview);
      console.log(newReview);
  
      // Felhasználó véleményeinek frissítése
      await usersCollection.updateOne(
        { _id: objectified_userID },
        { $push: { reviews: result.insertedId } }
      );
  
      // Átlagértékelés újraszámítása az adott konditeremhez MEGOLDVA 0412
      const gymReviews = await reviewsCollection.find({ gym_id: gymId }).toArray();
      const avgRating = gymReviews.reduce((acc, review) => acc + review.rating, 0) / gymReviews.length;
  
      // Konditerem értékelésének frissítése
      await gymsCollection.updateOne(
        { _id: gymId },
        { $set: { rating: parseFloat(avgRating.toFixed(1)) } }
      );
  
      // Frissített konditerem adat visszaküldése
      const updatedGym = await gymsCollection.findOne({ _id: gymId });
      res.json(updatedGym);
  
    } catch (error) {
      console.error("Hiba történt a vélemény hozzáadása során:", error);
      res.status(500).json({ error: 'Hiba történt a vélemény hozzáadása során' });
    }
  }); 


// User oldal kedvencek fül
app.get('/:userid/kedvencek', async (req, res) => {
    try {
        const db = await connectToDB();
        const usersCollection = db.collection('Users');
        const gymsCollection = db.collection('Gyms');

        const userId = req.params.userid;

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('Nem található a felhasználó!');
        }

        if (!Array.isArray(user.favorites)) {
            return res.status(400).send('A kedvencek adat nem megfelelő formátumban van!');
        }

        const userGymsCursor = gymsCollection.find({
            _id: { $in: user.favorites },
            status: 'approved',
        });

        const userGyms = await userGymsCursor.toArray();

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
    try {
        const db = await connectToDB();
        const usersCollection = db.collection('Users');
        const gymsCollection = db.collection('Gyms');

        const userId = req.params.userid;
        const gymId = req.params.edzotermekid;

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        const gym = await gymsCollection.findOne({ _id: new ObjectId(gymId) });

        console.log("user:" + user);
        console.log("gym:" + gym);

        if (user && gym) {
            // Ha nincs favorites mező, inicializáljuk
            if (!Array.isArray(user.favorites)) {
                user.favorites = [];
            }

            if (!user.favorites.includes(gym._id)) {
                await usersCollection.updateOne(
                    { _id: new ObjectId(userId) },
                    { $push: { favorites: new ObjectId(gym._id) } }
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
        const db = await connectToDB();
        const usersCollection = db.collection('Users');

        const userId = req.params.userid;
        const gymId = req.params.edzotermekid;

        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('Felhasználó nem található!');
        }

        // Kedvenc konditerem eltávolítása
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },
            { $pull: { favorites: new ObjectId(gymId) } }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send('Konditerem eltávolítva a kedvencekből');
        } else {
            res.status(400).send('A konditerem nem szerepelt a kedvencek között');
        }
    } catch (err) {
        console.error('Hiba történt a kedvenc konditerem törlésénél:', err);
        res.status(500).send('Belső szerverhiba történt');
    }
});


// nem jeleníti meg
app.get('/:userid/ertekeleseim', async (req, res) => {
    try {
        console.log(req.params.userid);  // Ellenőrizd, hogy megérkezik-e a providerId vagy userId
        const db = await connectToDB();  // Csatlakozás az adatbázishoz
        const usersCollection = db.collection('Users');  // Felhasználók kollekciója
        const reviewsCollection = db.collection('Reviews');  // Vélemények kollekciója
        
        const userId = req.params.userid;

        // Felhasználó keresése az ID alapján
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
        console.log('felh id:'+user._id);
        if (!user) {
            return res.status(404).send('Felhasználó nem található');
        }

        // A felhasználó értékeléseinek keresése a user_id alapján
        const userReviews = await reviewsCollection.find({
            user_id: new ObjectId(user._id)  // Feltételezzük, hogy az értékelések `user_id` mezője tartalmazza a felhasználó Id-ját
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
        
        const userId = req.params.userid;
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });
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
    // Adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    try {
        const userId = req.params.userid;

        console.log("Beérkező adatok:", req.body); // Kiírja a frontendről érkező adatokat

        // Felhasználó keresése ID alapján
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).send('User not found');
        }

        console.log("Felhasználó frissítés előtt:", user);

        // Készítünk egy objektumot az új adatokkal
        const updatedUserData = {};

        // Ha jelszót is frissít a felhasználó
        if (req.body.newPassword && req.body.newPassword.trim() !== '') {
            const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
            updatedUserData.password = hashedPassword;  // Csak akkor állítjuk be a jelszót, ha új jelszót adtak meg
        }

        // Frissítjük az emailt, ha változott
        if (req.body.email) {
            updatedUserData.email = req.body.email;
        }

        // Frissítjük a többi adatot (pl. név, cím, stb.)
        Object.assign(updatedUserData, req.body);

        // Ha nem adtak meg új adatokat, nem kell frissíteni
        if (Object.keys(updatedUserData).length === 0) {
            return res.status(400).send('No data to update');
        }

        // A frissített adatokat beállítjuk az adatbázisban
        const result = await usersCollection.updateOne(
            { _id: new ObjectId(userId) },  // A felhasználó ID alapján keresünk
            { $set: updatedUserData }       // Az új adatokat frissítjük
        );

        if (result.matchedCount === 0) {
            return res.status(404).send('User not found');
        }

        console.log("Felhasználó frissítés után:", updatedUserData);

        // Válasz küldése
        res.json({ message: 'Profil frissítve', user: updatedUserData });
    } catch (err) {
        console.error('Hiba a felhasználó frissítésekor:', err);
        res.status(500).send('Error updating user');
    }
});



app.post('/:userid/profilom/ellenorzes', async (req, res) => {
    // adatbázishoz kapcsolódás
    const db = await connectToDB();
    const usersCollection = db.collection('Users');

    const userId = req.params.userid;
    const currentPassword  = req.body.currentPassword;





    try {
        // Felhasználó keresése ID alapján
        const user = await usersCollection.findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ success: false, message: 'Felhasználó nem található!' });
        }

        // Jelszó ellenőrzése bcrypt-tel
        console.log('current password: ' + currentPassword);
        console.log('hashelt jelszó: ' + user.password);
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

        const gymId = req.params.id;

        // Az _id mező alapján történő keresés (MongoDB-ban az ObjectId-t kell használni)
        const result = await gymsCollection.deleteOne({ _id: new ObjectId(gymId) });

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

        const gymId = req.params.id;

        // Konditerem keresése az ID alapján
        const gym = await gymsCollection.findOne({ _id: new ObjectId(gymId) });  // Ha 'Id' mezőt használsz

        if (!gym) {
            return res.status(404).send('Konditerem nem található');
        }

        // Státusz frissítése
        const updatedGym = await gymsCollection.updateOne(
            { _id: new ObjectId(gymId) }, // Keresés az 'Id' mező alapján
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
        const result = await usersCollection.deleteOne({ _id: new ObjectId(userId) });

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
            const gym = await gymsCollection.findOne({ _id: new ObjectId(review.gym_id) }); // MongoDB natív keresés
            // Megkeressük a felhasználót az Id alapján
            const user = await usersCollection.findOne({ _id: new ObjectId(review.user_id) }); // MongoDB natív keresés

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

    const UserId = req.params.id;


    try {
        // Az értékelés törlése az Id alapján 
        const result = await reviewsCollection.findOneAndDelete({ _id: new ObjectId(UserId) });
        console.log(result);

        // if (!result || !result.value) {  // Ha a result null vagy nincs benne value
        //     return res.status(404).send('Értékelés nem található');
        // }

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
        const gymsCount = await gymsCollection.countDocuments({status: "approved" });

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
    const userId  = new ObjectId(req.params.userId);
    

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
    const provider_Id = new ObjectId(req.params.providerid);
    const { name, services, price, email, phoneNumber, location } = req.body;
    // console.log(provider_Id);
    try {
        // adatbázishoz kapcsolódás
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');

        // Ellenőrizzük, hogy a felhasználóhoz tartozó edzőterem státusza 'approved' vagy 'pending'
        const existingGym = await gymsCollection.findOne({
            providerId: new ObjectId(provider_Id),
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
            providerId: provider_Id,
            name,
            services: services.split(',').map(service => service.trim()),
            price,
            email,
            phoneNumber,
            location,
            status: 'pending',
        };
        // Az új edzőterem mentése a MongoDB-be
        const result = await gymsCollection.insertOne(newGym);

        // Válasz visszaküldése
        res.status(201).json({
            _id: result._id,
            ...newGym
        });
    } catch (err) {
        console.error('Hiba történt az edzőterem hozzáadása közben:', err);
        res.status(500).send('Hiba történt az edzőterem hozzáadása közben');
    }
});

app.get('/:providerid/ertekelesek_attekintese', async (req, res) => {

    const providerId = new ObjectId(req.params.providerid);
    try {
        console.log(req.params.providerid);  // Ellenőrizzük, hogy megérkezik e a proiderId
        const db = await connectToDB();
        const gymsCollection = db.collection('Gyms');
        const reviewsCollection = db.collection('Reviews');
        
        const providerGyms = await gymsCollection.find({ providerId: providerId}).toArray();
        // console.log(providerGyms.length)
        if (providerGyms.length === 0) {
            return res.status(404).send('Nincs olyan konditerem, amelyhez tartozik ez a providerId.');
        }

        const gym_Ids = providerGyms.map(gym => gym._id);
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
