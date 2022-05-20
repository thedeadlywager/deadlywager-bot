const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');

module.exports = {
        
	async run(bot, interaction) {
        let all = bot.db.all().map(db => ({ id: db.ID, ...bot.db.get(db.ID) })).sort((a, b) => b.balance - a.balance).slice(0, 40)

        interaction.reply({ content: all.map((o, i) => `${i + 1}. <@${o.id}> ${o.balance.toLocaleString()}`).join('\n') || 'No data yet', ephemeral: true })
	},

	config: {
		adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('leaderboard')
		.setDescription('See the coin leaderboard')
};