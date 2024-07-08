import axios from 'axios';

const sendingSignUp = async (userData) => {
    try {
        const response = await axios.post('http://192.168.1.28:8000/signup', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.status === 200) {
        console.log('Signup Successful', response.data);
        } else {
        console.error('Signup Failed', response.data);
        }
    } catch (error) {
        console.error('Error during signup:', error);
    }
};

const sendingLogin = async (userData) => {
    try {
        const response = await axios.post('http://192.168.1.28:8000/login', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
        });

        if (response.status === 200) {
        console.log('Login Successful', response.data);
        return response.data
        } else {
        return false
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return false
    }
}

module.exports = {
    sendingSignUp,
    sendingLogin,
}