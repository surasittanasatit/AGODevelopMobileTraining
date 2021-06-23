import axios from 'axios'
axios.defaults.timeout = 20000;

const insertFcmToken = (hostUrl, objdata, handleInsertFcmToken) => {
    let data = {
        fcm_token: objdata.fcm_token,
        brand: objdata.brand,
        model: objdata.model,
        os: objdata.os,
        device_id: objdata.device_id,
        phone_number: objdata.phone_number,
        id_card: objdata.id_card,
        create_date: objdata.create_date,
    }

    axios({
        method: 'POST',
        url: hostUrl + '/api/insertFcmToken',
        responseType: 'json',
        data: data
    }).then(function (response) {
        handleInsertFcmToken(response.data);
    }).catch(function (error) {
        handleInsertFcmToken(false);
        console.log('Error insertFcmToken :', error);
    });
}


const pushNotification = (hostUrl, handlePushNotification) => {
    axios({
        method: 'GET',
        url: hostUrl + '/api/pushNotification',
        responseType: 'json'
    }).then(function (response) {
        handlePushNotification(response.data);
    }).catch(function (error) {
        handlePushNotification(false);
        console.log('Error pushNotification :', error);
    });
}

export default {
    insertFcmToken,
    pushNotification
};