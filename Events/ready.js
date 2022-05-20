module.exports = async (bot) => {
    require('../Handlers/SlashCommands.js')(bot);

    bot.wager = await bot.channels.fetch(bot.config.wagerNotifyChatID).catch(err => console.log('invalid wagerNotifyChat ID', err.message))
    bot.notifyU = await bot.channels.fetch(bot.config.playerNotifyChatID).catch(err => console.log('invalid playerNotifyChat ID', err.message))
    bot.notifyA = await bot.channels.fetch(bot.config.modNotifyChatID).catch(err => console.log('invalid modNotifyChat ID', err.message))

    if(!bot.wager || !bot.notifyA || !bot.notifyU)
        return process.exit(1)
    
    bot.user.setActivity(bot.config.activity, { type: 'PLAYING' })

    console.log(`${bot.user.tag} is Online`)
};

