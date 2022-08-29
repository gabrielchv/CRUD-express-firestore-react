import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import bodyParser from "body-parser";
import session from "express-session";
require("dotenv").config();

// Firebase
import admin from "firebase-admin";
const serviceAccount = require("../teppadev-gabrielchv-firebase-adminsdk-4p3gg-93abdfbdf5.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();

// Express
const app = express();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET || "default-cookie",
    resave: false,
    saveUninitialized: true,
  })
);

// Get main react project
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

// Create user in db
app.post("/api/createuser", async (req, res) => {
  console.log(req.body);

  try {
    const id = req.body.email;
    const userJson = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    const response = db.collection("users").doc(id).set(userJson);
    res.send(response);
  } catch (err) {
    res.send(err);
  }
});

// Read all users in db
app.get("/api/readuser/all", async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const response = await usersRef.get();
    let responseArr: FirebaseFirestore.DocumentData[] = [];
    response.forEach((doc) => {
      responseArr.push(doc.data());
    });
    console.log(responseArr);
    res.send(responseArr);
  } catch (err) {
    res.send(err);
  }
});

// Read specific user in db
app.post("/api/readuser", async (req, res) => {
  console.log(req.body);
  try {
    const usersRef = db.collection("users").doc(req.body.email);
    const response = await usersRef.get();
    console.log(response.data());
    res.send(response.data());
  } catch (err) {
    res.send(err);
  }
});

// Update user FirstName and LastName
app.post("/api/updateuser", async (req, res) => {
  console.log(req.body);
  try {
    const usersRef = await db.collection("users").doc(req.body.email).update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    });
    console.log("Usuário " + req.body.email + " foi atualizado!");
    res.send(usersRef);
  } catch (err) {
    res.send(err);
  }
});

// Delete User
app.post("/api/deleteuser", async (req, res) => {
  console.log(req.body);
  try {
    const usersRef = await db.collection("users").doc(req.body.email).delete();
    console.log("Usuário " + req.body.email + " foi deletado!");
    res.send(usersRef);
  } catch (err) {
    res.send(err);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("http://localhost:" + PORT + "/");
});
