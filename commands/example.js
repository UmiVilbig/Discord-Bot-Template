const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        // here we set the name of the command and the description which will be seen when the user hovers over the command
        .setName("example")
        .setDescription("example command"),
    async execute(interaction) {
        // creating an example embed to reply with
        const exampleEmbed = new Discord.MessageEmbed()
        .setColor("#e11f95")
        .setDescription("Example command")
        .setThumbnail('https://media.discordapp.net/attachments/1045594528381423626/1056683450083586138/7c5747448271c2e48c00c5257803a7fd.jpg?width=445&height=438')
        .setTimestamp();

        interaction.reply({
            embeds: [exampleEmbed],
            ephemeral: true
        })
        /*
        
        Here we reply to the user with the embed we created above.
        If you want to just reply with a message, you can use interaction.reply("message") instead of interaction.reply({embeds: [exampleEmbed]})

        the ephemeral option makes it so that only the user who used the command can see the reply, 
        this is useful for commands like this one where we don't want other people to see the reply

        */
    }
}