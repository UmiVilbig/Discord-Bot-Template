/* 

this file exists to handle the interactionCreate event discord sends when a user uses a slash command

The method discord.js uses to handle slash commands is by using the interactionCreate events

instead of using client.on("interactionCreate", (interaction) => { ... }) we use the execute method in this file
this way we can keep our code more organized and easier to read

You won't need to change anything in this file unless you want to add more events to the bot
*/

module.exports = {
    name: "interactionCreate",
    async execute(interaction){
        if(interaction.isCommand()){
            const command = interaction.client.commands.get(interaction.commandName)
    
            if (!command) return;
            
            try{
                await command.execute(interaction);
            } catch(err){
                if(err) console.error(err);
                await interaction.reply({
                    content: "an error occured when executing that command",
                    ephemeral: true
                })
            }
        } else if (interaction.isAutocomplete()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) {
                console.error(`No command matching ${interaction.commandName} was found.`);
                return;
            }
    
            try {
                await command.autocomplete(interaction);
            } catch (error) {
                console.error(error);
            }
        }
    }
}