import mysql from 'mysql'

const con = mysql.createConnection({

})

con.connect(function (err) {
    if (err) {
        console.log("Error in Connection");
    } else {
        console.log("Connected");
    }
})

export default con;