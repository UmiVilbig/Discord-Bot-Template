require('dotenv').config();
const fs = require('fs');
const { Client, Intents, Message, Collection } = require('discord.js');
const Database = require("./config/Database")

// connecting to the database through ./config/Database.js
const db = new Database()
db.connect()

// declaring intents for discord.js
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
});

// getting a list of all the commands by parsing all file names in the commands folder and filtering out the ones that don't end with .js
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

const commands = [];
client.commands = new Collection();

// getting the command names and setting them to discord for slash commands
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

// getting the events we define in the events folder
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"));

// setting up the events
for (const file of eventFiles){
    const event = require(`./events/${file}`)
    
    if(event.once){
        client.once(event.name, (...args) => event.execute(...args, commands));
    } else {
        client.on(event.name, (...args) => event.execute(...args, commands));
    }
}

client.login(process.env.TOKEN);