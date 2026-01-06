const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getDieGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "die-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find die gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading die-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  name: "die",

  async execute(message) {
    const dieGif = await getDieGif();

    const dieEmbed = new EmbedBuilder()
      .setDescription(`${message.author} dies`)
      .setImage(dieGif)
      .setTimestamp()
      .setColor(embedColor);

    await message.reply({
      embeds: [dieEmbed],
    });
  },
};
