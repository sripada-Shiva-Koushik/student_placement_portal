import express from 'express'
import cors from 'cors'
import { adminRouter } from './Routes/AdminRoute.js'
import cookieParser from 'cookie-parser'
import { UserRouter } from './Routes/UserRoute.js'
import jwt from "jsonwebtoken"


const app = express();
app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    }
));

//    res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//   app.use(function (req, res, next) {
//    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use('/auth', adminRouter)
app.use('/user', UserRouter)

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "You are not Authenticated" })
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) return res.json({ Error: "Token wrong" });
            req.id = decoded.id;
            req.role = decoded.role;
            next();
        })
    }
}

app.get('/verify', verifyUser, (req, res) => {
    return res.json({ Status: "Success", role: req.role, id: req.id })
})





app.listen(8080, () => {
    console.log("Running in Port 8080");
})