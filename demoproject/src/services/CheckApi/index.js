import axios from 'axios'
axios.defaults.timeout = 20000;

const checkStatus = (hostUrl, handleCheckStatus) => {
    axios({
        method: 'GET',
        url: hostUrl + '/api/checkStatus',
        responseType: 'json'
    }).then(function (response) {
        handleCheckStatus(response.data);
    }).catch(function (error) {
        handleCheckStatus(false);
        console.log('Error checkStatus :', error);
    });
}

export default {
    checkStatus,
};