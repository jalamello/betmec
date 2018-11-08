const mongoose = require("mongoose");

let Schema = mongoose.Schema({
  eventdate: String,
  sportsid: Number,
  country: String,
  league: String,
  hometeam: String,
  awayteam: String,
  bettype: String,
  bookie: String,
  betchoice: String,
  stake: Number,
  odds: Number,
  ev: Number,
  result: String,
  winnings: Number,
  saldo: Number
});

module.exports = mongoose.model("Bet", Schema);
