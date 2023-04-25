const joinedAt = require("../schemas/voiceJoinedAt");
const voiceUser = require("../schemas/voiceUser");
const voiceGuild = require("../schemas/voiceGuild");
const guildChannel = require("../schemas/voiceGuildChannel");
const userChannel = require("../schemas/voiceUserChannel");
const userParent = require("../schemas/voiceUserParent");
const { MessageEmbed } = require("discord.js");
const coin = require("../schemas/coin");
const conf = require("../configs/sunucuayar.json")
const isimcek = require("../configs/isimcek.json")
const emojis = require("../configs/emojis.json")
const dolar = require("../schemas/dolar")
const client = global.bot;
const Stat = require("../schemas/level");

module.exports = async (oldState, newState) => {
    if ((oldState.member && oldState.member.user.bot) || (newState.member && newState.member.user.bot)) return;
    
    if (!oldState.channelId && newState.channelId) await joinedAt.findOneAndUpdate({ userID: newState.id }, { $set: { date: Date.now() } }, { upsert: true });
      
    let joinedAtData = await joinedAt.findOne({ userID: oldState.id });
  
    if (!joinedAtData) await joinedAt.findOneAndUpdate({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
    joinedAtData = await joinedAt.findOne({ userID: oldState.id });
    const data = Date.now() - joinedAtData.date;
  
    if (oldState.channelId && !newState.channelId) {
      await saveData(oldState, oldState.channel, data);
      await joinedAt.deleteOne({ userID: oldState.id });
    } else if (oldState.channelId && newState.channelId) {
      await saveData(oldState, oldState.channel, data);
      await joinedAt.updateOne({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
    } 
    if (oldState.channelId && !newState.channelId) {
        await saveDatas(oldState, oldState.channel, data);
        await joinedAt.deleteOne({ userID: oldState.id });
      } else if (oldState.channelId && newState.channelId) {
        await saveDatas(oldState, oldState.channel, data);
        await joinedAt.updateOne({ userID: oldState.id }, { $set: { date: Date.now() } }, { upsert: true });
      } 
  };
  
  async function saveData(user, channel, data) {
    await voiceUser.findOneAndUpdate({ guildID: conf.GuildID, userID: user.id }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
    await voiceGuild.findOneAndUpdate({ guildID: conf.GuildID }, { $inc: { topStat: data, dailyStat: data, weeklyStat: data, twoWeeklyStat: data } }, { upsert: true });
    await guildChannel.findOneAndUpdate({ guildID: conf.GuildID, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    await userChannel.findOneAndUpdate({ guildID: conf.GuildID, userID: user.id, channelID: channel.id }, { $inc: { channelData: data } }, { upsert: true });
    if (channel.parent) await userParent.findOneAndUpdate({ guildID: conf.GuildID, userID: user.id, parentID: channel.parentId }, { $inc: { parentData: data } }, { upsert: true });
  
    await client.checkLevel(user.id, conf.GuildID, "ses")
    levelVoiceXP(user.id, channel.id, data, data / 1000, channel.parentId);

    if (channel.parent && conf.publicParents.includes(channel.parentId)) {
        if (data >= (1000 * 60) * conf.Main.voiceCount) await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: user.id }, { $inc: { dolar: conf.Main.voiceDolar * parseInt(data/1000/60) } }, { upsert: true });
      } else if (data >= (1000 * 60) * conf.Main.voiceCount) await dolar.findOneAndUpdate({ guildID: conf.GuildID, userID: user.id }, { $inc: { dolar: conf.Main.voiceDolar * parseInt(data/1000/60) } }, { upsert: true });
  }

  async function saveDatas(user, channel, data) {
    if (conf.staffs.some(x => user.member.roles.cache.has(x))) {
      if (channel.parent && conf.publicParents.includes(channel.parentId)) {
        if (data >= (1000 * 60) * conf.Main.voiceCount) await coin.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { coin: Math.floor(parseInt(data/1000/60) / conf.Main.voiceCount) * conf.publicCoin } }, { upsert: true });
      } else if (data >= (1000 * 60) * conf.Main.voiceCount) await coin.findOneAndUpdate({ guildID: user.guild.id, userID: user.id }, { $inc: { coin: Math.floor(parseInt(data/1000/60) / conf.Main.voiceCount) * conf.voiceCoin } }, { upsert: true });
      const coinData = await coin.findOne({ guildID: user.guild.id, userID: user.id });
      if (coinData && client.ranks.some((x) => x.coin >= coinData.coin)) {
        let newRank = client.ranks.filter((x) => coinData.coin >= x.coin);
        newRank = newRank[newRank.length-1];
        if (newRank && Array.isArray(newRank.role) && !newRank.role.some(x => user.member.roles.cache.has(x)) || newRank && !Array.isArray(newRank.role) && !user.member.roles.cache.has(newRank.role)) {
          user.member.roles.add(newRank.role);
          const oldRoles = client.ranks.filter((x) => coinData.coin < x.coin && user.member.hasRole(x.role));
          oldRoles.forEach((x) => x.role.forEach((r) => user.member.roles.remove(r)));
          client.channels.cache.find(x => x.name.includes(isimcek.kanalcek.ranklog)).send({ content:`${user.member.toString()} üyesi **${coinData.coin}** coin hedefine ulaştı ve **${Array.isArray(newRank.role) ? newRank.role.map(x => `${user.guild.roles.cache.get(x).name}`).join(", ") : `${user.guild.roles.cache.get(newRank.role).name}`}** rolü verildi! :tada: :tada:`});
        }
      }
    }
  }
  
  async function levelVoiceXP(id, channel, value, xp, category) {
  let randomVoiceXP = ((Math.random() * 0.008) + 0.001).toFixed(3);
  await Stat.findOneAndUpdate({ guildID: conf.GuildID, userID: id }, { $inc: { voiceXP: xp * randomVoiceXP } }, { upsert: true });
  const data = await Stat.findOne({ guildID: conf.GuildID, userID: id });
  let siradakilevel = data.voiceLevel * 643;
  if (siradakilevel <= data.voiceXP) { 
  await Stat.findOneAndUpdate({ guildID: conf.GuildID, userID: id }, { $inc: {["voiceLevel"]: 1 }}, { upsert: true });
  }
  };
  
  module.exports.conf = {
    name: "voiceStateUpdate",
  };