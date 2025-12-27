require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

// Perms
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent
    ]
});

client.on('clientReady', (c) => {
    console.log(`✅ ${c.user.tag} is online.`);
});

// Message reply
const greetings = ['hello', 'hey', 'hi']
client.on('messageCreate', (msg) => {
    if (msg.author.bot) {
        return;
    }

    if (greetings.includes(msg.content.toLowerCase())) {
        msg.reply("Hiya, I am kitty!");
    }
});



// Login
client.login(process.env.TOKEN);
