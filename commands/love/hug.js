
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('hug')
    .setDescription('Spread love<3')
    .addStringOption((option) => 
        option.setName('user')
        .setDescription('user')
        .setRequired(false)
    ),

    async execute(interaction) {
        const user = interaction.options.getString('user');

        if (user) {
            await interaction.reply(
                `<@${interaction.user.id}> hugs ${user}`
            );
        } else {
            await interaction.reply(
                `<@${interaction.user.id}> hugs themselves!`
            );
        }
    }
};
