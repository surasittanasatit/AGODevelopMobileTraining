const admin = require('firebase-admin')

const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'
const SCOPES = [MESSAGING_SCOPE]

const serviceAccount = require('../../samplefirebase-8ab5d-firebase-adminsdk-128a5-1b44d90328.json')
const databaseURL = 'https://samplefirebase-8ab5d.firebaseio.com'
const URL = 'https://fcm.googleapis.com/v1/projects/samplefirebase-8ab5d/messages:send'

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL
})

async function pushMsgNotificatio(dataMsg, callback) {
    callback("Push Notification : true")
    for (let i = 0; i < dataMsg.length; i++) {
        try {
            const userToken = dataMsg[i].token;
            const payload = {
                "data": {
                    "badge": '0'
                },
                "notification": {
                    "title": dataMsg[i].title,
                    "body": dataMsg[i].body,
                    "sound": 'default',
                    "badge": '0',
                    "android_channel_id": "agolawaid-659"
                }
            };

            const options = {
                "contentAvailable": true
            };
            admin.messaging().sendToDevice(userToken, payload, options).then(function (response) {
                console.log("Successfully sent message: ", JSON.stringify(response));
            }).catch(function (error) {
                console.log("Error sending message: ", error);
            });
        } catch (err) {
            callback('Error Notification :', err.message);
        }
    }
    return myAsyncFunc(callback);
}


function myAsyncFunc(callback) {
    callback();
}

module.exports = pushMsgNotificatio;