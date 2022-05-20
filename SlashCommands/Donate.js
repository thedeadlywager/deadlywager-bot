const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { createDB } = require('../Util/utils');

module.exports = {
        
	async run(bot, interaction) {
        let user = interaction.options.getUser('user')
        let amount = Math.abs(interaction.options.getInteger('amount'))

        if(bot.db.get(interaction.user.id).balance < amount)
            return interaction.reply({ content: `You can't donate more than you have!`, ephemeral: true })

        if(!bot.db.has(user.id)) bot.db.set(user.id, createDB())

        let newDB = bot.db.add(`${user.id}.balance`, amount)
        bot.db.subtract(`${interaction.user.id}.balance`, amount)
        interaction.reply({ content: `You donated **${amount} coins** to ${user}`, ephemeral: true })

        bot.notifyU.send(`${user}, you were donated **${amount} coins** from ${interaction.user}. Your new balance is **${newDB.balance} coins**`)
        bot.notifyA.send(`${user}, you were donated **${amount} coins** from ${interaction.user}. Your new balance is **${newDB.balance} coins**`)
	},

	config: {
		//adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('donate')
		.setDescription('Donate coins to other players')
        .addUserOption(o => o
            .setName('user')
            .setDescription('The user you want to donate coins to')
            .setRequired(true)    
        )  
        .addIntegerOption(o => o
            .setName('amount')
            .setDescription('The amount of coins you want to donate')
            .setRequired(true)    
        )
};