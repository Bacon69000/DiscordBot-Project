require('dotenv').config();
const TOKEN = process.env.TOKEN;
const Discord = require('discord.js')
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS'] })
const welcomeChannelID = "931731334609666098"
const generateImage = require('./generateImage')

let bot = {
    client,
    prefix: "!",
    owners: ["735782372737417276"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require("./handlers/commands")(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

//client.on('ready', () => {
//    console.log(`Logged In As ${client.user.tag}!`);
//});

client.on('guildMemberAdd', async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelID).send({
        content: `<@${member.id}> Welcome To The Server!`,
        files: [img]
    })
})



client.login(TOKEN);
