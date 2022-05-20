const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
        
	async run(bot, interaction) {
        let userDB = bot.db.get(interaction.user.id)

        interaction.reply({ content: `You have **${userDB.balance} coins**`, ephemeral: true })
	},

	config: {
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('balance')
		.setDescription('Check your coins')
};