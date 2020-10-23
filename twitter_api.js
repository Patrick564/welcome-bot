const axios = require('axios').default;
const config = require('./config.json');

class TwitterApi {
    async getTweet(tweetId) {
        try {
            const tweet = await axios.get(
                `https://api.twitter.com/2/tweets/${tweetId}`,
                {
                    headers: {
                        Authorization: `Bearer ${config.TWITTER_BEARER_TOKEN}`,
                    },
                }
            );

            return tweet.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getTweets() {
        try {
            const tweetsResult = await axios.get(
                `https://api.twitter.com/2/tweets/search/recent?query=from:sinoaliceglobal -has:mentions&tweet.fields=created_at`,
                {
                    headers: {
                        Authorization: `Bearer ${config.TWITTER_BEARER_TOKEN}`,
                    },
                }
            );

            return tweetsResult.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getLastTweet() {
        try {
            const lastTweet = await this.getTweets();

            return lastTweet.meta.newest_id;
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = TwitterApi;
