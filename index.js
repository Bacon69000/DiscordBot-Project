require('dotenv').config();
const TOKEN = process.env.TOKEN;
const PREFIX = "!";
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES'] })

client.on('ready', () => {
    console.log(`Logged In As ${client.user.tag}!`);
});

client.on('message', async (msg) => {
    if(!msg.content.startsWith(PREFIX)) return;

    const args = msg.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if(command === 'ping') {
        msg.reply('pong');
    }
    if(command === 'membercount') {
        msg.reply(`There Are ${msg.guild.memberCount} Member In This Server!`)
    }
    if(command === 'poll') {
        let message = await msg.reply(args.join(' '));
        await message.react('✅');
        await message.react('❌');
    }
})

client.login(TOKEN);
