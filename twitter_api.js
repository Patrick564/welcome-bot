const axios = require('axios').default;
const config = require('./config.json');

const url = 'https://api.twitter.com/2/tweets/search/recent?query=from:sinoaliceglobal&media.fields=preview_image_url';

async function getLastTweet() {
    try {
        let response = await axios.get(
            url,
            {
                headers: {
                    'Authorization': 'Bearer ' + config.TWITTER_BEARER_TOKEN
                }
            },
        );

        console.log(response.data.meta.newest_id);

        return response.data.meta.newest_id;

    } catch (error) {
        console.error(error);
    }
}

module.exports = getLastTweet();
