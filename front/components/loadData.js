import axios from 'axios';

const loadNutrient = async (userData) => {
    try {
        const response = await axios.post('http://192.168.1.28:8000/history', userData, {
        headers: {
            'Content-Type': 'application/json',
        },
        });
        console.log("response : ", response)
        if (response.status === 200) {
        return {
            nutrient: response.data.total_nutrients,
            tdee: response.data.tdee
        }
        } else {
        return {}
        }
    } catch (error) {
        console.error('Error during signup:', error);
        return {}
    }
}


module.exports = {
    loadNutrient
}