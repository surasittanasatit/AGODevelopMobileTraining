import axios from 'axios'
axios.defaults.timeout = 20000;

const getUser = (hostUrl, username, password, handleGetUser) => {
    let data = {
        'username': username,
        'password': password,
    }
    axios({
        method: 'POST',
        url: hostUrl + '/api/getUser',
        responseType: 'json',
        data: data,
    }).then(function (response) {
        handleGetUser(response.data);
    }).catch(function (error) {
        handleGetUser(false);
        console.log('Error GetUser :', error);
    });
}

const getUserAll = (hostUrl, handleGetUserAll) => {
    axios({
        method: 'GET',
        url: hostUrl + '/api/getAllUser',
        responseType: 'json'
    }).then(function (response) {
        handleGetUserAll(response.data);
    }).catch(function (error) {
        handleGetUserAll(false);
        console.log('Error GetUserAll :', error);
    });
}

const registerUser = (hostUrl, objdata, handleRegisterUser) => {
    let data = {
        'username': objdata.username,
        'password': objdata.password,
        'fname': objdata.fname,
        'lname': objdata.lname,
        'email': objdata.email,
        'tel': objdata.tel,
        'lineid': objdata.lineid,
    }
    axios({
        method: 'POST',
        url: hostUrl + '/api/registerUser',
        responseType: 'json',
        data: data
    }).then(function (response) {
        handleRegisterUser(response.data);
    }).catch(function (error) {
        handleRegisterUser(false);
        console.log('Error RegisterUser :', error);
    });
}

const updateUser = (hostUrl, username, handleUpdateUser) => {
    let data = {
        username: username,
    }
    axios({
        method: 'POST',
        url: hostUrl + '/api/updateUser',
        responseType: 'json',
        data: data
    }).then(function (response) {
        handleUpdateUser(response.data);
    }).catch(function (error) {
        handleUpdateUser(false);
        console.log('Error updateUser :', error);
    });
}

const deleteUser = (hostUrl, username, handleDeleteUser) => {
    let data = {
        username: username
    }
    axios({
        method: 'DELETE',
        url: hostUrl + '/api/deleteUser',
        responseType: 'json',
        data: data
    }).then(function (response) {
        handleDeleteUser(response.data);
    }).catch(function (error) {
        handleDeleteUser(false);
        console.log('Error deleteUser :', error);
    });
}

export default {
    getUser,
    getUserAll,
    registerUser,
    updateUser,
    deleteUser
};