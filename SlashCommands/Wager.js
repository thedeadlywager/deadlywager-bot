const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { createDB } = require('../Util/utils');

module.exports = {
        
	async run(bot, interaction) {
        let amount = Math.abs(interaction.options.getInteger('amount'))

        if(bot.db.get(interaction.user.id).balance < amount)
            return interaction.reply({ content: `You can't wager more than you have!`, ephemeral: true })

        bot.db.subtract(`${interaction.user.id}.balance`, amount)
        interaction.reply({ content: `You wagered **${amount} coins**`, ephemeral: true })

        bot.wager.send(`${interaction.user} has wagered **${amount} coins**!`)
	},

	config: {
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('wager')
		.setDescription('Wager coins') 
        .addIntegerOption(o => o
            .setName('amount')
            .setDescription('The amount of coins you want to wager')
            .setRequired(true)    
        )
};