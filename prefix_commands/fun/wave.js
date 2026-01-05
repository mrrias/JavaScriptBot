const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getWaveGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "wave-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find wave gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading wave-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

//cmd
module.exports = {
  name: "wave",

  async execute(message) {
    let user = message.mentions.users.first();
    const waveGif = await getWaveGif();

    if (user) {
      const waveEmbed = new EmbedBuilder()
        .setDescription(`${message.author} waves at ${user}`)
        .setImage(waveGif)
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [waveEmbed],
      });
    } else {
      const waveEmbed = new EmbedBuilder()
        .setDescription(`${message.author} waves`)
        .setImage(waveGif)
        .setTimestamp()
        .setColor(embedColor);

      await message.reply({
        embeds: [waveEmbed],
      });
    }
  },
};
