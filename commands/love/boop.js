
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('boop')
    .setDescription('Boop :3')
    .addStringOption((option) =>
        option
            .setName('user')
            .setDescription('user you want to boop')
            .setRequired(true)
    ),

    async execute(interaction) {
        const user = interaction.options.getString('user');

        try {
            await interaction.reply(
                `<@${interaction.user.id}> boops ${user}`
            );
        } catch {
            await interaction.reply(
                'Failed to boop!'
            );
        }
    }
};
