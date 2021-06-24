'use strict';
var db = require("../db/database.js")

var pushMsgNotificatio = require("../controllers/notificationController");
const moment = require("moment");

module.exports = function (app) {

    app.get("/api/checkStatus", (req, res, next) => {
        res.status(200).json({ "message": "Run Server Success" })
    });

    app.get("/api/getAllUser", (req, res, next) => {
        db.all(`SELECT * FROM tb_user_info`, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "message": "Success",
                "data": rows
            })
        });
    });

    app.post("/api/getUser", (req, res, next) => {
        var username = [req.body.username]
        var password = [req.body.password]
        db.all(`SELECT * FROM tb_user_info WHERE username=? AND password=?`, [username, password], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "message": "Success",
                "data": rows
            })
        });
    });

    app.post("/api/registerUser", (req, res, next) => {
        var reqBody = req.body;
        db.run(`INSERT INTO tb_user_info 
                 (username, password, fname, lname, email, tel, lineid, status) 
                VALUES (?,?,?,?,?,?,?,?)`,
            [
                reqBody.username,
                reqBody.password,
                reqBody.fname,
                reqBody.lname,
                reqBody.email,
                reqBody.tel,
                reqBody.lineid,
                'E'
            ],
            function (err) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(200).json({
                    "message": "Success"
                })
            });
    });

    app.post("/api/updateUser", (req, res, next) => {
        var username = [req.body.username]
        db.run(`UPDATE tb_user_info SET status='N' WHERE username=?`,
            [username],
            function (err) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(200).json({
                    "message": "Success"
                })
            });
    });

    app.delete("/api/deleteUser", (req, res, next) => {
        var username = [req.body.username]
        db.run(`DELETE FROM tb_user_info WHERE username=?`, [username],
            function (err) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.status(200).json({
                    "message": "Success",
                    "data": this.changes
                })
            });
    });

    app.get("/api/getConnectDB", (req, res, next) => {
        db.get(`SELECT * FROM tb_noti_fcmtoken`, [], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "message": "ConnectDB Success",
            })
        });
    });

    app.get("/api/getFcmToken", (req, res, next) => {
        var params = [req.body.id_card]
        db.all(`SELECT * FROM tb_noti_fcmtoken WHERE id_card=?`, [params], (err, rows) => {
            if (err) {
                res.status(400).json({ "error": err.message });
                return;
            }
            res.status(200).json({
                "message": "Success",
                "data": rows
            })
        });
    });

    app.post("/api/insertFcmToken", (req, res, next) => {
        var reqBody = req.body;
        db.run(`INSERT INTO tb_noti_fcmtoken 
                 (fcm_token, brand, model, os, device_id, phone_number, id_card, create_date) 
                VALUES (?,?,?,?,?,?,?,?)`,
            [
                reqBody.fcm_token,
                reqBody.brand,
                reqBody.model,
                reqBody.os,
                reqBody.device_id,
                reqBody.phone_number,
                reqBody.id_card,
                reqBody.create_date
            ],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": err.message })
                    return;
                }
                res.status(200).json({
                    "message": "Success",
                    "fcm_token": this.lastID
                })
            });
    });

    app.delete("/api/deleteFcmToken", (req, res, next) => {
        var params = [req.body.id_card]
        db.run(`DELETE FROM tb_noti_fcmtoken WHERE id_card=?`, [params],
            function (err, result) {
                if (err) {
                    res.status(400).json({ "error": res.message })
                    return;
                }
                res.status(200).json({
                    "message": "Success",
                    "data": this.changes
                })
            });
    });

    app.get('/api/pushNotification', (req, res) => {
        //var reqBody = req.body;
        try {
            let dataMsg = [];
            //let arrNotification = reqBody.massage_data;

            db.all(`SELECT * FROM tb_noti_fcmtoken`, [], (err, rows) => {
                if (err) {
                    res.status(400).json({ "error": err.message });
                    return;
                }
                let rowId = 0;
                //for (let i = 0; i < arrNotification.length; i++) {
                //let fcmtokenList = rows.filter(x => x.id_card == arrNotification[i].user_reg_id)
                for (let j = 0; j < rows.length; j++) {
                    dataMsg.push({
                        id: rowId += 1,
                        title: 'ข้อความใหม่ !',
                        body: ' สถานะ: ทำการเปิดใช้งาน รหัสผู้ใช้งานและรหัวผ่าน สำเร็จ' +
                            ' วันที่ ' + moment(new Date()).add(543, 'year').format('DD-MM-YYYY HH:ss:mm') + ' น.',
                        os: rows[j].os,
                        token: rows[j].fcm_token,
                    });
                }
                //}
                pushMsgNotificatio(dataMsg, function (response) { res.end(response) })
            });
        }
        catch (err) {
            res.end(err.toString());
        }
    });
};