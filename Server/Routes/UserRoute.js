import express from "express";
import con from "../utils/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const router = express.Router()

router.post('/userlogin', (req, res) => {
    const sql = "SELECT * FROM users where email = ? ";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ Status: "Error", Error: "Wrong Password" });
                if (response) {
                    const email = result[0].email
                    const token = jwt.sign({ role: "user", email: email, id: result[0].id },
                        "jwt-secret-key",
                        { expiresIn: '1d' });
                    res.cookie('token', token);
                    return res.json({ Status: "Success", id: result[0].regNo })
                }
            })


        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})

// const verifyUser = (req, res, next) => {
//     const token = req.cookies.token;
//     if (!token) {
//         return res.json({ Error: "You are not Authenticated" })
//     } else {
//         jwt.verify(token, "user-secret-key", (err, decoded) => {
//             if (err) return res.json({ Error: "Token wrong" });
//             next();
//         })
//     }
// }

// router.get('/dashboard', verifyUser, (req, res) => {
//     return res.json({ Status: "Success" })
// })

router.get('/detail/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users where regNo = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Error Fetching User Data" });
        return res.json(result)
    })
})

router.get('/detail/placement/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM placement where regNo = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Error Fetching User Data" });
        return res.json(result)
    })
})


router.get('/detail/intenship/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM internship where regNo = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Error Fetching User Data" });
        return res.json(result)
    })
})

// router.get('/detail/drive', (req, res) => {
//     const sql = "SELECT * FROM drives";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Error: "Get student placement details error in sql" });
//         return res.json({ Status: "Success", Result: result })
//     })
// })
router.get('/detail/drive', (req, res) => {
    const sql = "SELECT * FROM drives";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Error fetching drive details:", err);
            return res.json({ Error: "Get student placement details error in sql" });
        }
        return res.json({ Status: "Success", Result: result });
    });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
})

export { router as UserRouter }