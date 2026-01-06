const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getDisappearGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "disappear-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find disappear gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading disappear-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  name: "disappear",

  async execute(message) {
    const disappearGif = await getDisappearGif();

    const disappearEmbed = new EmbedBuilder()
      .setDescription(`${message.author} disappears`)
      .setImage(disappearGif)
      .setTimestamp()
      .setColor(embedColor);

    await message.reply({
      embeds: [disappearEmbed],
    });
  },
};
