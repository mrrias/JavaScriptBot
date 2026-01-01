const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { embedColor } = require("../variables/vars.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("actions")
    .setDescription("Pick and action")
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("pick action")
        .setRequired(true)
        .addChoices(
          { name: "high-five", value: "high-five" },
          { name: "slap", value: "slap" }
        )
    )
    .addUserOption((option) =>
      option.setName("user").setDescription("user").setRequired(false)
    ),

  async execute(interaction) {
    const actionName = interaction.options.getString("action");
    const user = interaction.options.getUser("user");

    await interaction.reply("-# *Loading...*");

    if (actionName === "high-five") {
      if (user) {
        const highFiveEmbed = new EmbedBuilder()
          .setDescription(`<@${interaction.user.id}> high fives ${user}`)
          .setColor(embedColor);

        await interaction.editReply({
          embeds: [highFiveEmbed],
        });
      } else {
        const highFiveEmbed = new EmbedBuilder()
          .setDescription(`<@${interaction.user.id}> high fives themselves`)
          .setColor(embedColor);

        await interaction.editReply({
          embeds: [highFiveEmbed],
        });
      }
    } else if (actionName === "slap") {
      if (user) {
        let slapEmbed = new EmbedBuilder()
          .setDescription(`<@${interaction.user.id}> slaps ${user}`)
          .setColor(embedColor);

        await interaction.editReply({
          embeds: [slapEmbed],
        });
      } else {
        const slapEmbed = new EmbedBuilder()
          .setDescription(
            `Hey Hey <@${interaction.user.id}> why you want to slap yourself?`
          )
          .setColor(embedColor);

        await interaction.editReply({
          embeds: [slapEmbed],
        });
      }
    } else {
      return;
    }
  },
};
