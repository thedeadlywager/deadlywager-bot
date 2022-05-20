const Discord = require('discord.js');
const { createDB } = require('../Util/utils');

module.exports = async (bot, interaction) => {
    
    if(interaction.isCommand()){
        const command = bot.slashCommands.get(interaction.commandName);
        if(!command) return
        
        if(command.config?.adminOnly && (interaction.channel.type == 'DM' || !interaction.member.roles.cache.has(bot.config.adminRoleID)))
            return interaction.reply({ content: 'This command is admin only', ephemeral: true })
    

        if(!bot.db.has(interaction.user.id)) bot.db.set(interaction.user.id, createDB())


        try { await command.run(bot, interaction) } catch (error) {
            console.error(error);
            await interaction.reply({ 
                content: 'There was an error while executing this command!', 
                ephemeral: true 
            })
        }
        return
    }

    if(interaction.isButton()){ //https://discord.js.org/#/docs/main/13.0.1/class/ButtonInteraction
        let [btnCommand, ...data] = interaction.customId.split('_')
        const buttonCommand = bot.buttons.get(btnCommand)
        if(!buttonCommand) return
        
        return buttonCommand.run(bot, interaction, data)
    }
};

