const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
const { createDB } = require('../Util/utils');

module.exports = {
        
	async run(bot, interaction) {
        let mode = interaction.options.getSubcommand()
        let user = interaction.options.getUser('user')
        let amount = Math.abs(interaction.options.getInteger('amount'))

        if(!bot.db.has(user.id)) bot.db.set(user.id, createDB())

        if(mode == 'give'){
            let newDB = bot.db.add(`${user.id}.balance`, amount)
            bot.notifyU.send(`${user}, you were given **${amount} coins**. Your new balance is **${newDB.balance} coins**`)
            bot.notifyA.send(`${user}, you were given **${amount} coins**. Your new balance is **${newDB.balance} coins**`)
            return interaction.reply({ content: `You gave **${amount} coins** to ${user}`, ephemeral: true })
        }

        if(mode == 'remove'){
            let newDB = bot.db.subtract(`${user.id}.balance`, amount)
            bot.notifyU.send(`${user}, you were taken **${amount} coins**. Your new balance is **${newDB.balance} coins**`)
            bot.notifyA.send(`${user}, you were taken **${amount} coins**. Your new balance is **${newDB.balance} coins**`)
            return interaction.reply({ content: `You removed **${amount} coins** from ${user}`, ephemeral: true })
        }
	},

	config: {
		adminOnly: true
	},
	
	data: new SlashCommandBuilder()
		.setName('coins')
		.setDescription('Give or remove coins from users')
        .addSubcommand(o => o
            .setName('give')
            .setDescription('Give coins to user')
            .addUserOption(o => o
                .setName('user')
                .setDescription('The user you want to give coins to')
                .setRequired(true)    
            )  
            .addIntegerOption(o => o
                .setName('amount')
                .setDescription('The amount of coins you want to give')
                .setRequired(true)    
            )  
        )
        .addSubcommand(o => o
            .setName('remove')
            .setDescription('Remove coins from user')
            .addUserOption(o => o
                .setName('user')
                .setDescription('The user you want to remove coins from')
                .setRequired(true)    
            )  
            .addIntegerOption(o => o
                .setName('amount')
                .setDescription('The amount of coins you want to remove')
                .setRequired(true)    
            )  
        )
};