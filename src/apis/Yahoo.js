import axios from 'axios'

export const yhAutoComplete = (term) => {
    const options = {
        method: 'GET',
        url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete',
        params: { q: term, region: 'US' },
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_YAHOO_API_KEY,
            'X-RapidAPI-Host': 'apidojo-yahoo-finance-v1.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
};