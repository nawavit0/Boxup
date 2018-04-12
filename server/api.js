const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/authenticate/:username/:password', function(req, res) {
    console.log('login');
    var username = req.params.username;
    var password = req.params.password;
    console.log(username);
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT * FROM Learner WHERE Username = ?', [username], function(err, results, fields){
        if(err) {
            console.log('Error connecting database .... ');
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            if(results.length > 0) {
                if(results[0].Password == password) {
                    var response = {
                        'code': 200,
                        'log': 'Login successful',
                        'user': {
                            'id': results[0].Learner_ID,
                            'card': results[0].Card_ID,
                            'username': results[0].Username,
                            'password': results[0].Password,
                            'firstname': results[0].Firstname,
                            'lastname': results[0].Lastname,
                            'dob': results[0].DOB,
                            'gender': results[0].Gender,
                            'address': results[0].Address,
                            'academy': results[0].Academy,
                            'edu': results[0].Educational_LV,
                            'pic': results[0].Picture
                        }
                    }
                    res.json(response);
                    console.log(response);
                } else {
                    res.json({
                        'code': 204,
                        'log': 'Username and Password does not match'
                    });
                }
            } else {
                res.json({
                    'code': 204,
                    'log': 'Username does not exist'
                });
            }
        }
    });
    connection.end();
})

router.get('/register/:card/:username/:password/:firstname/:lastname/:dob/:gender/:address/:academy/:edu', function(req, res) {
    var card = req.params.card;
    var username = req.params.username;
    var password = req.params.password;
    var firstname = req.params.firstname;
    var lastname = req.params.lastname;
    var dob = req.params.dob;
    var gender = req.params.gender;
    var address = req.params.address;
    var academy = req.params.academy;
    var edu = req.params.edu;
    console.log(dob);
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('INSERT INTO Learner (Card_ID, Username, Password, Firstname, Lastname, DOB, Gender, Address, Academy, Educational_LV) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
    [card, username, password, firstname, lastname, dob, gender, address, academy, edu], function(err){
        if(err) {
            console.log(err);
            res.json({
                'code': 400,
                'log': err
            });
        } else {
            console.log('Register successful');
            res.json({
                'code': 200,
                'log': 'Register successful'
            });
        }
    });
    connection.end();
})

router.get('/playinglog/:learnerID', function(req, res) {
    var learner_id = req.params.learnerID;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT PlayingLog.*, Stage.Name AS Stage_Name, Chapter.Name AS Chapter_Name, Chapter.Description AS Chapter_Des FROM PlayingLog INNER JOIN Stage INNER JOIN Chapter ON PlayingLog.Stage_ID = Stage.Stage_ID AND Stage.Chapter_ID = Chapter.Chapter_ID WHERE PlayingLog.Learner_ID = ? ORDER BY PlayingLog.Date_Time DESC', [learner_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            if(results.length > 0) {
                res.json({
                    'code': 200,
                    'log': 'Retrieving playing log successful',
                    'result': results
                });
            } else {
                res.json({
                    'code': 202,
                    'log': 'There is no playing log.',
                    'result': []
                });
            }
        }
    });
    connection.end();
})

router.get('/playinganswer/:logid', function(req, res) {
    var log_id = req.params.logid;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT PlayingAnswer.*, Word.Word FROM PlayingAnswer INNER JOIN Word ON PlayingAnswer.Word_ID = Word.Word_ID WHERE PlayingLog_ID = ?;', [log_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving playing answer successful',
                'result': results
            });
        }
    });
    connection.end();
})

router.get('/totalword/:learner', function(req, res) {
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT COUNT(*) AS countTotalWord FROM WordComplete WHERE Learner_ID = ?', [learner_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving total learned words successful',
                'result': results[0].countTotalWord
            });
        }
    });
    connection.end();
})

router.get('/totalplay/:learner', function(req, res) {
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT COUNT(*) AS countTotalPlay FROM PlayingLog AS pl WHERE pl.Learner_ID = ?;', [learner_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving total played words successful',
                'result': results[0].countTotalPlay
            });
        }
    });
    connection.end();
})

router.get('/totalspendtime/:learner', function(req, res) {
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT SUM(pa.Spend_Time) AS SpendTime FROM PlayingLog AS pl INNER JOIN PlayingAnswer AS pa ON pl.PlayingLog_ID = pa.PlayingLog_ID WHERE pl.Learner_ID = ?;', [learner_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving total spend time successful',
                'result': results[0].SpendTime
            });
        }
    });
    connection.end();
})

router.get('/totalskipword/:learner', function(req, res) {
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT (SELECT COUNT(*) FROM WordComplete AS wc WHERE wc.Learner_ID = ?) - (SELECT COUNT(*) FROM WordInStage AS ws INNER JOIN (SELECT pl.Stage_ID AS Stage_ID FROM PlayingLog AS pl WHERE pl.Learner_ID = ? GROUP BY pl.Stage_ID) AS stage ON ws.Stage_ID = stage.Stage_ID) AS totalSkip;', [learner_id, learner_id], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving total skip words successful',
                'result': results[0].totalSkip
            });
        }
    });
    connection.end();
})

router.get('/wordInMonth/:learner/:length', function(req, res) {
    var length = req.params.length;
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT YEAR(wc.Date) AS Year, MONTH(wc.Date) AS Month, COUNT(*) AS countWord FROM WordComplete AS wc WHERE wc.Learner_ID = ? AND wc.Date >= DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL ? MONTH)), INTERVAL 1 DAY) AND wc.Date <= DATE_SUB(NOW(), INTERVAL 1 MINUTE) GROUP BY MONTH(wc.Date), YEAR(wc.Date) ORDER BY Year, Month;', [learner_id, length], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving number of learned words in x months successful',
                'result': results
            });
        }
    });
    connection.end();
})

router.get('/playInMonth/:learner/:length', function(req, res) {
    var length = req.params.length;
    var learner_id = req.params.learner;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT YEAR(pl.Date_Time) AS Year, MONTH(pl.Date_Time) AS Month, COUNT(*) AS countPlay FROM PlayingLog AS pl WHERE pl.Learner_ID = ? AND pl.Date_Time >= DATE_ADD(LAST_DAY(DATE_SUB(NOW(), INTERVAL ? MONTH)), INTERVAL 1 DAY) AND pl.Date_Time <= DATE_SUB(NOW(), INTERVAL 1 MINUTE) GROUP BY MONTH(pl.Date_Time), YEAR(pl.Date_Time) ORDER BY Year, Month;', [learner_id, length], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving number of learned words in x months successful',
                'result': results
            });
        }
    });
    connection.end();
})

router.get('/word/:wordid', function(req, res) {
    var wordID = req.params.wordid;
    var connection = mysql.createConnection({
        host     : 'ec2-54-169-238-254.ap-southeast-1.compute.amazonaws.com',
        user     : 'root',
        password : 'e5m268x7',
        database : 'Boxup'
    });
    connection.connect();
    connection.query('SELECT w.* FROM Boxup.Word AS w WHERE w.Word_ID = ?;', [wordID], function(err, results, fields){
        if(err) {
            res.json({
                'code': 400,
                'log': 'Error connecting database .... '
            });
        } else {
            console.log(results);
            res.json({
                'code': 200,
                'log': 'Retrieving word successful',
                'result': results
            });
        }
    });
    connection.end();
})

module.exports = router;