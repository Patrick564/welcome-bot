const Discord = require('discord.js');
const config = require('./config');

const twitter_api = require('./twitter_api');

const client = new Discord.Client();

const prefix = '!';

client.on('ready', () => {
    console.log('> Bot is running...');
});

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        const timeTaken = Date.now() - message.createdTimestamp;

        message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);

    } else if (command === 'sum') {
        const numArgs = args.map(x => parseFloat(x));
        const sum = numArgs.reduce((counter, x) => counter += x);

        message.reply(`The sum of all arguments you provided is ${sum}!`);

    } else if (command === 'tweet') {
        try {
            let lastTweet = await twitter_api;

            message.reply(`Hi ${lastTweet}`);
        } catch (error) {
            console.error(error);
        }
    }
});

client.login(config.BOT_TOKEN);
