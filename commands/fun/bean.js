
// To do
// Add embed

const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('bean')
    .setDescription('Bean members')
    .addStringOption((option) =>
        option
            .setName('user')
            .setDescription('user')
            .setRequired(true)
    )
    .addStringOption((option) => 
        option
            .setName('reason')
            .setDescription('why do you want to bean this user?')
            .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getString('user');
        const reason = interaction.options.getString('reason');

        if (reason) {
            await interaction.reply (
                `${user} beaned for ${reason}`
            )
        } else {
            await interaction.reply (
                `${user} has been beaned!`
            )
        }
    }
};
