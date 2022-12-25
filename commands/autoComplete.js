const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example-autocomplete')
        .setDescription('example command with autocomplete')
        .addStringOption(option => 
            option.setName('options')
			.setDescription('example option')
			.setRequired(true)
			.setAutocomplete(true)),
            
        async autocomplete(interaction) {
            const focusedValue = interaction.options.getFocused();
            const choices = ['Popular Topics: Threads', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
            const filtered = choices.filter(choice => choice.startsWith(focusedValue));
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice })),
            );
        },
        async execute(interaction) {
            const input = interaction.options._hoistedOptions[0].value
            interaction.reply(input)
        }
}
