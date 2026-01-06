const { EmbedBuilder } = require("discord.js");
const { embedColor } = require("../../variables/vars.js");
const fs = require("fs").promises;
const path = require("path");

// get gif
async function getKillGif() {
  try {
    // Find the file in the same directory as this script
    const filePath = path.join(__dirname, "kill-gif.txt");

    const data = await fs.readFile(filePath, "utf-8");

    // Split into array and remove empty lines/whitespace
    const lines = data.split(/\r?\n/).filter((line) => line.trim() !== "");

    if (lines.length === 0) {
      return "Couldn't find kill gif";
    }

    // Pick and return a random line
    const randomValue = lines[Math.floor(Math.random() * lines.length)];
    return randomValue;
  } catch (err) {
    // Log the actual error to your terminal so you can debug pathing issues
    console.error("Error reading kill-gif.txt:", err.message);
    return "Failed to load a random GIF. Check if the file exists.";
  }
}

// cmd
module.exports = {
  name: "kill",

  async execute(message) {
    const user = message.mentions.users.first();
    const killGif = await getKillGif();

    if (!user) {
      const errorEmbed = new EmbedBuilder()
        .setDescription(`**Please use valid syntax!** \n-kill {user}`)
        .setColor(embedColor);

      await message.reply({
        embeds: [errorEmbed],
      });
    } else {
      const killEmbed = new EmbedBuilder()
        .setDescription(`${message.author} kills ${user} 🔪`)
        .setImage(killGif)
        .setColor(embedColor);

      await message.reply({
        embeds: [killEmbed],
      });
    }
  },
};
