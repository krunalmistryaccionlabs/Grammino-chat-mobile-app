import { environment } from './../environment/environment';
import { Alert } from 'react-native';
import { errorMessage } from './constants';

const axios = require('axios');

function setHeaders({ token }) {
    return {
        'Content-Type': 'application/json',
        'x-access-token': token,
    };
}

function setHeaders2({ token }) {
    return {
        'Content-Type': `application/x-www-form-urlencoded`,
        'x-access-token': token,
    };
}

export function loginPost(phone, password) {
    var data = {
        phone: phone,
        password: password
    }
    return new Promise((resolve, reject) => {
        axios.post(environment + 'login', data).then(result => {
            resolve(result.data)
        }).catch(err => {
            Alert.alert(errorMessage);
            reject(err)
        });
    });
}

export function signUpPost(userName, phone, password) {
    var data = {
        phone: phone,
        name: userName,
        password: password
    }
    return new Promise((resolve, reject) => {
        axios.post(environment + 'user', data).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function updateContacts(phoneNumbers, token) {
    var data = {
        phoneNumbers: phoneNumbers
    }
    return new Promise((resolve, reject) => {
        axios.post(environment + 'api/updateContacts', data,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function startConversation(phoneNumber, token) {
    var data = {
        reciever: phoneNumber
    }
    return new Promise((resolve, reject) => {
        axios.post(environment + 'api/conversation', data,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function postChatMessage(data, token) {

    return new Promise((resolve, reject) => {
        axios.post(environment + 'api/chat', data,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            console.log(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function postRecent(conversationId, token) {

    var data = {
        conversationId: conversationId,

    }

    return new Promise((resolve, reject) => {
        axios.post(environment + 'api/chat/recent', data,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function getConversations(token) {
    return new Promise((resolve, reject) => {
        axios.get(environment + 'api/conversation/recent',
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function getRunTimeConversation(conversationId, token) {
    return new Promise((resolve, reject) => {
        axios.get(environment + 'api/conversation/' + conversationId,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {

        });
    });
}


export function postChatImage(token, formData) {

    return new Promise((resolve, reject) => {

        axios.post(environment + 'api/chat', formData,
            {
                headers: setHeaders2({
                    token: token,
                })
            }

        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function postProfile(formData, token) {

    return new Promise((resolve, reject) => {

        axios.post(environment + 'api/user/profile', formData,
            {
                headers: setHeaders2({
                    token: token,
                })
            }

        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}


export function getProfile(token) {
    return new Promise((resolve, reject) => {
        axios.get(environment + 'api/user/profile',
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function getHelpMessages(token) {
    return new Promise((resolve, reject) => {
        axios.get(environment + 'api/network/data',
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}


export function postHelpMessage(data, token) {

    return new Promise((resolve, reject) => {
        axios.post(environment + 'network/message', data,
            {
                headers: setHeaders({
                    token: token
                })
            }
        ).then(result => {
            console.log(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}

export function postChatImageHelp(token, formData) {

    return new Promise((resolve, reject) => {

        axios.post(environment + 'network/message', formData,
            {
                headers: setHeaders2({
                    token: token,
                })
            }

        ).then(result => {
            resolve(result)
        }).catch(err => {
            Alert.alert(errorMessage);
        });
    });
}