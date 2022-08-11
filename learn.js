//express server
const {Pool}    = require('pg')
const bodyParser = require('body-parser');
var express = require('express');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: '1234',
    port: 5432,
})





const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => { 
    var local = []
    var reportList =[]
    var match = []
    pool.query('SELECT * from location_data', (err, data) => {
        local = data.rows

        pool.query('SELECT * from october_17', (err, report) => {
            reportList = report.rows
            
            local.forEach(loc =>{
                reportList.forEach(repo=>{
                    if(repo.acct_ != null){
                        if (loc.identity_c.trim() == repo.acct_.trim()) {
                            const temp = {
                                ...loc,
                                ...repo
                            }
                            match.push(temp)
                        }
                    }
                    
                    
                })
            })

            res.send(match)

        })
        
     
    })

    


})


app.listen(3000,()=>{
    console.log("man im up");
})