const express = require("express");
const app = express();
const port = 8081;
const cors = require("cors");
const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

const mypw = "";  // set mypw to the hr schema password
var PyResult = null;

async function checkLogin(email, password){
    const spawn = require("child_process").spawn;
    const pythonProcess = spawn('python', ["./script.py", email, password]);
    pythonData = null;
    pythonProcess.stdout.on('data', (data) => {
        pythonData = data.toString();
        PyResult = pythonData;
    });
    await new Promise( (resolve) => {
        pythonProcess.on('close', resolve)
    })
    pythonProcess.on('close', (code) => {
        console.log('child process exited with code ' + code);
    });
    PyResult = PyResult.replace(/\s+/g, '');
    if(PyResult == "false"){
        return "false";
    }else if (PyResult == "true"){
        let connection;
        var query = 'INSERT INTO SKKUUSER VALUES (' + "'" + email.toString() + "', '" + password.toString() + "', 'y')";
        try {
          connection = await oracledb.getConnection(  {
            user          : "username",
            password      : "password",
            connectString : "localhost/xe"
          });
      
          const result = await connection.execute(
            query
          );
      
        } catch (err) {
          console.error(err);
        } finally {
          if (connection) {
            try {
              await connection.close();
            } catch (err) {
              console.error(err);
            }
          }
        }        
        return "true";
    }

}

app.use(express.json());
app.use(cors());


app.get("/api/home", (req, res) =>{
    res.json({message: "Hello World"});
});

app.post("/login", (req, res) => {
    var student = [];
    student = req.body;
    checkLogin(student.email, student.password).then((result)=>{
        res.json({loginStatus : result});
    });
});

app.listen(port, () => {
    console.log('Server started on port ${PORT}');
});