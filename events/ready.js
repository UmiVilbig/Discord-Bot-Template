/*

This file is for the bot to register slash commands when it is ready.

For development purpose, we will register the commands locally, which means that the commands will only be available in the guild specified in the .env file.
Registering commands in production mode repeatedly (when we are developing) may cause discord to rate limit us, so we will only register commands locally when we are developing.

*/


const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v9");
require("dotenv").config();

module.exports = {
    name: "ready",
    once: true,
    execute (client, commands) {
        console.log("bot is online and ready to go");
        const CLIENT_ID = client.user.id;

        const rest = new REST({
            version: "9"
        }).setToken(process.env.TOKEN);

        (async () => {
            try {
                if (process.env.ENV === "production") {
                    await rest.put(Routes.applicationCommands(CLIENT_ID), {
                        body: commands
                    });
                    console.log("successfully registered commands globally");
                } else {
                    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {
                        body: commands
                    });
                    console.log("Successsfully registered commands locally");
                }
            } catch (err){
                if (err) console.error(err);
            }
        })();
        }
}