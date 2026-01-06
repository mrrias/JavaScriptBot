const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getHideGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "hide-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find hide gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading hide-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  name: "hide",

  async execute(message) {
    const user = message.mentions.users.first();
    const hideGif = await getHideGif();

    if (user) {
      const hideEmbed = new EmbedBuilder()
        .setDescription(`${message.author} hides from ${user}`)
        .setImage(hideGif)
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [hideEmbed],
      });
    } else {
      const hideEmbed = new EmbedBuilder()
        .setDescription(`${message.author} hides`)
        .setImage(hideGif)
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [hideEmbed],
      });
    }
  },
};
