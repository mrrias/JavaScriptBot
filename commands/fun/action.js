
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('actions')
    .setDescription('Pick and action')
    .addStringOption((option) =>
        option
            .setName('action')
            .setDescription('pick action')
            .setRequired(true)
            .addChoices(
                { name: 'high-five', value: 'high-five' },
                { name: 'slap', value: 'slap' },
                { name: 'kiss', value: 'kiss' },
            )
    )
    .addStringOption((option) => 
        option
            .setName('user')
            .setDescription('user')
            .setRequired(false)
    ),

    async execute(interaction) {
        const actionName = interaction.options.getString('action');
        const user = interaction.options.getString('user');
        
        try {

            if (actionName === 'high-five') {

                if (user) {
                    await interaction.reply(
                        `<@${interaction.user.id}> gave ${user} a high five!`
                    );

                } else {
                    await interaction.reply(
                        `<@${interaction.user.id}> is proud of themselves... **high five!**`
                    )
                }

            } else if (actionName === 'slap') {

                if (user) {
                    await interaction.reply(
                        `<@${interaction.user.id}> slaps ${user}`
                    );

                } else {
                    await interaction.reply(
                        'Hey why are you tring to slap yourself?'
                    )
                }

            } else if (actionName === 'kiss') {
                
                if (user) {
                    await interaction.reply(
                        `<@${interaction.user.id}> gibs ${user} a lil kiss`
                    );

                } else {
                    await interaction.reply(
                        'Important to love yourself too :3'
                    )
                }

            }

        } catch {

        }
    }
};
