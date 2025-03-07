import express from "express";
import con from "../utils/db.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'
import { verify } from 'crypto'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin where email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ Status: "Error", Error: "Error in running query" })
        if (result.length > 0) {

            const email = result[0].email
            const token = jwt.sign({ role: "admin", email: email, id: result[0].id },
                "jwt-secret-key",
                { expiresIn: '1d' });
            res.cookie('token', token);
            return res.json({ Status: "Success" })

        } else {
            return res.json({ Status: "Error", Error: "Wrong Email or Password" });
        }
    })
})

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const loiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/lois');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadLOI = multer({
    storage: loiStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

const lorStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/lors');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadLOR = multer({
    storage: lorStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

const InternloiStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/Internlois');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const uploadInternLOI = multer({
    storage: InternloiStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed.'));
        }
    },
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '11209a014@kanchiuniv.ac.in',
        pass: 'aigi hnhx zjsn obdo',
    },
});

router.get('/getPlacedPercentage', (req, res) => {
    const sql = `SELECT year, COUNT(*) AS totalStudents, SUM(CASE WHEN placement.company IS NOT NULL THEN 1 ELSE 0 END) AS placedStudents
                 FROM users
                 LEFT JOIN placement ON users.regNo = placement.regNo
                 GROUP BY year`;

    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching student placement details:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const lineChartData = {
            labels: [],
            datasets: [
                {
                    label: 'Percentage of Students Placed',
                    data: [],
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        };

        result.forEach(row => {
            const percentage = (row.placedStudents / row.totalStudents) * 100;
            lineChartData.labels.push(row.year);
            lineChartData.datasets[0].data.push(percentage.toFixed(2)); // Round to two decimal places
        });

        return res.json({ Status: 'Success', Result: lineChartData });
    });
});

// Express Route for creating a drive
router.post('/drives', (req, res) => {
    // Extract data from the request body
    const { companyName, description, date, time, lastDateForRegistration, venue, formDetails } = req.body;

    // Perform SQL INSERT operation to add a new drive entry into the 'Drives' table
    const sql = `INSERT INTO Drives (companyName, description, date, time, lastDateForRegistration, venue, formDetails) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [companyName, description, date, time, lastDateForRegistration, venue, formDetails];

    // Execute the SQL query using your database connection and handle any errors
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error creating a new drive:', err);
            return res.status(500).json({ error: 'Error creating a new drive' });
        }
        return res.status(201).json({ message: 'Drive created successfully' });
    });
});





router.get('/studentCount', (req, res) => {
    const sql = "SELECT count(regNo) as Students from users";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})

router.get('/studentCountCSE', (req, res) => {
    const sql = "SELECT count(regNo) as CSEStudents from users where dept='CSE'";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})

router.get('/studentCountIT', (req, res) => {
    const sql = "SELECT count(regNo) as ITStudents from users where dept='IT'";
    // SELECT COUNT(*) AS cse_student_count FROM users WHERE dept = 'CSE' AND year = 2022;
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Error in running student Count query" })
        return res.json(result);
    })
})


router.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
})

router.get('/getPlaced/:year', (req, res) => {
    const { year } = req.params;
    const { companyName } = req.query;

    let sql = `SELECT users.regNo, users.image, users.studentname, users.email, users.year, users.dept, GROUP_CONCAT(DISTINCT placement.company ORDER BY placement.id SEPARATOR ',') AS companies, GROUP_CONCAT(DISTINCT placement.designation ORDER BY placement.id SEPARATOR ',') AS designations, GROUP_CONCAT(DISTINCT placement.salary ORDER BY placement.id SEPARATOR ',') AS salaries, GROUP_CONCAT(DISTINCT placement.loi ORDER BY placement.id SEPARATOR ',') AS lois FROM users INNER JOIN placement ON users.regNo = placement.regNo WHERE users.year = ?`;

    const params = [year];

    if (companyName) {
        sql += ` AND placement.company LIKE ?`; // Change to LIKE for partial matches
        params.push(`%${companyName}%`); // Wrap the company name with % to match partial names
    }

    sql += ' GROUP BY users.regNo'; // Grouping by user to aggregate all their placement details

    con.query(sql, params, (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in SQL" });
        return res.json({ Status: "Success", Result: result });
    });
});

router.get('/getStudent/:year', (req, res) => {
    const { year } = req.params;
    const { studentName } = req.query; // Changed from companyName to studentName

    let sql = `SELECT regNo, image, studentname, email, year, dept FROM users WHERE year = ?`; // Only selecting required fields

    const params = [year];

    if (studentName) {
        sql += ` AND studentname LIKE ?`; // Change to LIKE for partial matches
        params.push(`%${studentName}%`); // Wrap the student name with % to match partial names
    }

    con.query(sql, params, (err, result) => {
        if (err) return res.json({ Error: "Get student details error in SQL" });
        return res.json({ Status: "Success", Result: result });
    });
});



// router.get('/higherstd/:year', (req, res) => {
//     const { year } = req.params;

//     let sql = `SELECT * FROM higherstudies`;

//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Error: "Get student placement details error in SQL" });
//         return res.json({ Status: "Success", Result: result });
//     });
// });

router.get('/higherstd/:year', (req, res) => {
    const { year } = req.params;

    let sql = `SELECT users.regNo, users.studentname, higherstudies.batch, higherstudies.course, higherstudies.university, higherstudies.branch, higherstudies.admissionyear, higherstudies.lor
               FROM users
               INNER JOIN higherstudies ON users.regNo = higherstudies.regNo
               WHERE users.year = ?`;

    con.query(sql, [year], (err, result) => {
        if (err) {
            console.error("Error fetching higher studies details:", err);
            return res.json({ Error: "Get student higher studies details error in SQL" });
        }
        return res.json({ Status: "Success", Result: result });
    });
});



router.get('/getPlaced2022', (req, res) => {
    const year = 2022;
    const sql = `SELECT p.salary, COUNT(*) AS studentCount
                 FROM placement AS p
                 JOIN users AS u ON p.regNo = u.regNo
                 WHERE u.year = ?
                 GROUP BY p.salary`;

    con.query(sql, [year], (err, result) => {
        if (err) {
            console.error('Error fetching student placement details:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Students',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.studentCount);
            chartData.datasets[0].data.push(row.salary);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});

router.get('/getUserCountByYear', (req, res) => {
    const sql = `SELECT year, COUNT(*) AS userCount FROM users GROUP BY year`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user count by year:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Users',
                    data: [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    orderWidth: 1,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.year);
            chartData.datasets[0].data.push(row.userCount);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});

router.get('/getYears', (req, res) => {
    const sql = 'SELECT DISTINCT year FROM users'; // Replace 'users' with your table name
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching years:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const yearOptions = result.map(row => row.year);
        return res.json(yearOptions);
    });
});

router.get('/getDepartments', (req, res) => {
    const sql = 'SELECT DISTINCT dept FROM users'; // Replace 'users' with your table name
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const departmentOptions = result.map(row => row.dept);
        return res.json(departmentOptions);
    });
});


router.get('/getUserCountByYear', (req, res) => {
    const sql = `SELECT year, COUNT(*) AS userCount FROM users GROUP BY year`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching user count by year:', err);
            return res.json({ Error: 'Error fetching data from MySQL' });
        }

        const chartData = {
            labels: [],
            datasets: [
                {
                    label: 'Number of Users',
                    data: [],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    fill: false,
                },
            ],
        };

        result.forEach(row => {
            chartData.labels.push(row.year);
            chartData.datasets[0].data.push(row.userCount);
        });

        return res.json({ Status: 'Success', Result: chartData });
    });
});



router.get('/getPlace/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM placement WHERE regNo = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details for single student error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

router.get('/getInterns/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM internship WHERE regNo = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student internship details for single student error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

router.get('/getIntern/:year', (req, res) => {
    // const sql = "select users.studentname, users.regNo, users.year, users.dept, users.image, placement.company, placement.designation,placement.salary, placement.loi FROM users inner join placement on users.regNo=placement.regNo";
    // const sql = "SELECT u.regNo, u.image, u.studentname, u.email, u.year, u.dept, GROUP_CONCAT(p.company) AS companies, GROUP_CONCAT(p.designation) AS designations, GROUP_CONCAT(p.salary) AS salaries, GROUP_CONCAT(p.loi) AS loisFROM users uINNER JOIN placement p ON u.regNo = p.regNoGROUP BY u.regNo"
    const year = req.params.year;
    const sql = "SELECT users.regNo, users.studentname,users.year, GROUP_CONCAT(DISTINCT internship.company ORDER BY internship.id SEPARATOR ',') AS companies, DATE_FORMAT(MIN(internship.from), '%Y-%m-%d') AS from_date,DATE_FORMAT(MAX(internship.to), '%Y-%m-%d') AS to_date,GROUP_CONCAT(DISTINCT internship.loi ORDER BY internship.id SEPARATOR ',') AS lois FROM users INNER JOIN internship ON users.regNo = internship.regNo WHERE users.year = ? GROUP BY users.regNo;"
    con.query(sql, [year], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

router.get('/get/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM users where regNo=?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

router.get('/getCompany/:company', (req, res) => {
    // const id = req.params.id;
    const company = req.params.company;
    const sql = "SELECT * FROM placement where company = ?";
    con.query(sql, [company], (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})

router.get('/getInternCompany/:id/:company', (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const sql = "SELECT * FROM internship where regNo = ? AND company = ?";
    con.query(sql, [company], (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error in fetching student placement details from the database" });
        }
        const formattedResult = result.map(entry => {
            const formattedFrom = formatRDate(entry.from);
            const formattedTo = formatRDate(entry.to);
            return {
                ...entry,
                from: formattedFrom,
                to: formattedTo
            };
        });
        return res.json({ Status: "Success", Result: formattedResult });
    })
})
function formatRDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;
}

router.get('/getDrive/:jobtitle/:company', (req, res) => {
    const jobtitle = req.params.jobtitle;
    const company = req.params.company;
    const sql = "SELECT * FROM drives WHERE jobtitle = ? AND companyName = ?";

    con.query(sql, [jobtitle, company], (err, result) => {
        if (err) {
            return res.status(500).json({ Error: "Error in fetching drive details from the database" });
        }

        const formattedResult = result.map(entry => {
            // You can format any date fields here if needed
            return entry;
        });

        return res.json({ Status: "Success", Result: formattedResult });
    });
});


router.put('/update/:id', (req, res) => {

    const regNo = req.params.id;
    const { studentname, email, year, dept, image } = req.body;

    let sql = "UPDATE users SET ";
    let values = [];

    if (studentname) {
        sql += "studentname = ?, ";
        values.push(studentname);
    }
    if (email) {
        sql += "email = ?, ";
        values.push(email);
    }
    if (year) {
        sql += "year = ?, ";
        values.push(year);
    }
    if (dept) {
        sql += "dept = ?, ";
        values.push(dept);
    }
    if (image) {
        sql += "image = ?,";
        values.push(image)
    }

    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE regNo = ?";
    values.push(regNo);
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

router.put('/singlePlaceUpdate/:id/:company', (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const { designation, salary, loi } = req.body;

    let sql = "UPDATE placement SET ";
    let values = [];

    if (designation) {
        sql += "designation = ?, ";
        values.push(designation);
    }
    if (salary) {
        sql += "salary = ?, ";
        values.push(salary);
    }
    if (loi) {
        sql += "loi = ?, ";
        values.push(loi);
    }
    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE company = ?";
    values.push(company);
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

router.get('/admin/driveget', (req, res) => {
    const sql = "SELECT * FROM drives";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Error: "Get student placement details error in sql" });
        return res.json({ Status: "Success", Result: result })
    })
})


router.put('/singleInternUpdate/:id/:company', (req, res) => {
    const id = req.params.id;
    const company = req.params.company;
    const { from, to, stipend, loi } = req.body;

    const parseDate = (dateString) => {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    // Convert date strings to MySQL date format
    const fromDate = from ? parseDate(from) : null;
    const toDate = to ? parseDate(to) : null;

    let sql = "UPDATE internship SET ";
    let values = [];

    if (from) {
        sql += "from = ?, ";
        values.push(from);
    }
    if (to) {
        sql += "to = ?, ";
        values.push(to);
    }
    if (stipend) {
        sql += "stipend = ?, ";
        values.push(stipend);
    }
    if (loi) {
        sql += "loi = ?, ";
        values.push(loi);
    }
    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE company = ?";
    values.push(company);

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error updating internship:", err.message);
            return res.status(500).json({ Error: err.message });
        }
        return res.json({ Status: "Success" });
    });
});


router.put('/drive/:jobtitle/:companyName', (req, res) => {
    const jobtitle = req.params.jobtitle;
    const companyName = req.params.companyName;
    const {
        type,
        companyLink,
        lastdate,
        description
    } = req.body;

    let sql = "UPDATE drives SET ";
    let values = [];

    if (type) {
        sql += "type = ?, ";
        values.push(type);
    }
    if (companyLink) {
        sql += "companyLink = ?, ";
        values.push(companyLink);
    }
    if (lastdate) {
        sql += "lastdate = ?, ";
        values.push(lastdate);
    }
    if (description) {
        sql += "description = ?, ";
        values.push(description);
    }

    // Remove the trailing comma and space from the SQL string
    sql = sql.slice(0, -2);

    sql += " WHERE jobtitle = ? AND companyName = ?";
    values.push(jobtitle, companyName);

    con.query(sql, values, (err, result) => {
        if (err) {
            return res.json({ Error: "Update drive details error in SQL" });
        }
        return res.json({ Status: "Success" });
    });
});


router.put('/placeupdate/:id', (req, res) => {
    const regNo = req.params.regNo;
    // const { studentname, email, year, dept } = req.body;
    const sql = "UPDATE placement set dept = ? WHERE regNo = ?"
    // let values = [
    //     req.body.studentname,
    //     req.body.regNo,
    //     req.body.email,
    //     req.body.year,
    //     req.body.dept,
    // ]
    con.query(sql, [req.body.dept, regNo], (err, result) => {
        if (err) return res.json({ Error: "Update student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

router.delete('/delete/:id', (req, res) => {
    const regNo = req.params.id;

    let sql = "DELETE FROM users WHERE regNo = ?";
    con.query(sql, [regNo], (err, result) => {
        if (err) return res.json({ Error: "DELETE student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

router.delete('/singlePDelete/:id/:company', (req, res) => {
    const regNo = req.params.id;
    const company = req.params.company;
    let sql = "DELETE FROM placement WHERE regNo = ? AND company = ?";
    const values = [regNo, company]
    con.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "DELETE student details error in sql" });
        return res.json({ Status: "Success" })
    })
})

router.delete('/singleIDelete/:id/:company', (req, res) => {
    const regNo = req.params.id;
    const company = req.params.company;
    let sql = "DELETE FROM internship WHERE regNo = ? AND company = ?";
    const values = [regNo, company];
    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error deleting internship:", err.message);
            return res.status(500).json({ Error: "Failed to delete internship. Please try again later.", Details: err.message });
        }

        if (result.affectedRows === 0) {
            console.log("No rows deleted.", Error.message);
            return res.status(404).json({ Error: "No matching rows found for deletion." });
        }

        console.log("Internship deleted successfully. Rows affected:", result.affectedRows);
        return res.json({ Status: "Success", RowsAffected: result.affectedRows });
    });
});




router.post('/create', upload.single('image'), (req, res) => {
    const sql = "INSERT INTO users(`studentname`,`regNo`,`email`,`password`,`year`,`dept`,`image`) VALUES (?)"
    bcrypt.hash(req.body.password.toString(), 10, (err, hash) => {
        if (err) return res.json({ Error: "Error in hashing password" })
        const values = [
            req.body.studentname,
            req.body.regNo,
            req.body.email,
            hash,
            req.body.year,
            req.body.dept,
            req.file ? req.file.filename : null
        ]
        con.query(sql, [values], (err, result) => {
            // if (err) return res.json({ Error: "Inside signup query" });
            if (err) return res.json(err);
            return res.json({ Status: "Success" });
        })
    })
})

router.post('/createhighstudy', uploadLOR.single('lor'), (req, res) => {
    const sql = "INSERT INTO higherstudies(`regNo`,`studentname`,`batch`,`course`,`university`,`branch`,`admissionyear`,`lor`) VALUES (?)"
    const values = [
        req.body.regNo,
        req.body.studentname,
        req.body.batch,
        req.body.course,
        req.body.university,
        req.body.branch,
        req.body.admissionyear,
        req.file ? req.file.filename : null
    ]
    con.query(sql, [values], (err, result) => {
        // if (err) return res.json({ Error: "Inside signup query" });
        if (err) return res.json(err);
        return res.json({ Status: "Success" });
    })

})

router.post('/createJob', (req, res) => {
    const sql = "INSERT INTO drives(`jobtitle`, `companyName`, `type`, `companyLink`, `lastdate`, `description`, `year`) VALUES (?)";

    const values = [
        req.body.jobtitle,
        req.body.companyName,
        req.body.type,
        req.body.companyLink,
        req.body.lastdate,
        req.body.description,
        req.body.year,
        // req.body.skills.join(','), // Assuming skills is an array
    ];

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error creating job" });
        }

        // Fetch recipients' email addresses based on the year from the "users" table
        const sqlRecipients = "SELECT email FROM users WHERE year = ?";
        con.query(sqlRecipients, [req.body.year], (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error fetching recipients" });
            }

            // Extract email addresses from the database result
            const recipients = rows.map(row => row.email);

            // Send email notification only to recipients of the specified year
            const mailOptions = {
                from: '11209a014@kanchiuniv.ac.in',
                to: recipients.join(','), // Comma-separated list of recipient emails
                subject: 'New Job Posted',
                text: `A new job has been posted.\n\nJob Title: ${req.body.jobtitle}\nCompany: ${req.body.companyName}\nDescription: ${req.body.description}\nLast Date: ${req.body.lastdate}\nLink: ${req.body.companyLink} `,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error: 'Error sending email' });
                } else {
                    console.log('Email sent:', info.response);
                    return res.status(200).json({ status: 'Success' });
                }
            });
        });

        return res.status(200).json({ status: "Success" });
    });
});



router.get('/users', (req, res) => {
    const year = req.query.year;

    const sql = "SELECT email FROM users WHERE year = ?";
    con.query(sql, [year], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error fetching users" });
        }
        const users = result.map(row => row.email);
        return res.status(200).json(users);
    });
});



router.post('/addPlacement', uploadLOI.single('loi'), (req, res) => {
    const sql = "INSERT INTO placement(`regNo`,`company`,`designation`,`salary`,`loi`) VALUES (?);"
    const values = [
        req.body.regNo,
        req.body.company,
        req.body.designation,
        req.body.salary,
        req.file ? req.file.filename : null
    ]
    con.query(sql, [values], (err, result) => {
        // if (err) return res.json({ Error: "Inside signup query" });
        if (err) return res.json(err);
        return res.json({ Status: "Success" });
    })

})

router.get('/getCompanyOptions', (req, res) => {
    const sql = 'SELECT DISTINCT company FROM placement';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching company options:', err);
            return res.status(500).json({ Error: 'Error fetching data from MySQL' });
        }

        const companyOptions = result.map(row => row.company);
        return res.json(companyOptions);
    });
});


router.post('/addInternship', uploadLOI.single('loi'), (req, res) => {
    const sql = "INSERT INTO internship(`regNo`,`company`,`from`,`to`,`stipend`,`loi`) VALUES (?);"
    const values = [
        req.body.regNo,
        req.body.company,
        formatDate(req.body.from),
        formatDate(req.body.to),
        req.body.stipend,
        req.file ? req.file.filename : null
    ]
    con.query(sql, [values], (err, result) => {
        // if (err) return res.json({ Error: "Inside signup query" });
        if (err) return res.json(err);
        return res.json({ Status: "Success" });
    })

})

function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export { router as adminRouter }