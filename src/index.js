"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
// Firebase
const firebase_admin_1 = __importDefault(require("firebase-admin"));
var serviceAccount = require("../teppadev-gabrielchv-firebase-adminsdk-4p3gg-93abdfbdf5.json");
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
});
const db = firebase_admin_1.default.firestore();
require("dotenv").config();
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend/build")));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET || "default-cookie",
    resave: false,
    saveUninitialized: true,
}));
// Get main react project
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "frontend/dist", "index.html"));
});
app.post("/api/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    }
    catch (err) {
        res.send(err);
    }
}));
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("http://localhost:" + PORT + "/");
});
