const express = require("express");
const mongoose = require("mongoose");
const betModel = require("../models/bet");

let router = express.Router();

//API

// get bets

router.get("/bets", function(req, res) {
  console.log(req.user);
  betModel.find({}, function(err, bets) {
    if (err) {
      return res.status(404).json({ message: "not found" });
    }
    return res.status(200).json(bets);
  });
});

// add bet

router.post("/bets", function(req, res) {
  console.log("router.post(/bets");
  // TODO: check user permissions for add. Only admin can add new bets
  let bet = new betModel({
    eventdate: req.body.eventdate,
    sportsid: req.body.sportsid,
    country: req.body.country,
    league: req.body.league,
    hometeam: req.body.hometeam,
    awayteam: req.body.awayteam,
    bettype: req.body.bettype,
    bookie: req.body.bookie,
    betchoice: req.body.betchoice,
    stake: req.body.stake,
    odds: req.body.odds,
    ev: req.body.ev,
    result: req.body.result,
    winnings: req.body.winnings,
    saldo: req.body.saldo
  });
  bet.save(function(err, item) {
    if (err) {
      return res.status(409).json({ message: err });
    }
    return res.status(200).json({ message: "success" });
  });
});

router.delete("/bets/:id", function(req, res) {
  betModel.findById(req.params.id, function(err, task) {
    if (err) {
      return res.status(404).json({ message: "not found" });
    }

    betModel.deleteOne({ _id: req.params.id }, function(err) {
      if (err) {
        return res.status(409).json({ message: err });
      } else {
        return res.status(200).json({ message: "success" });
      }
    });
  });
});

// EDIT

router.post("/bets/:id", function(req, res) {
  //TODO: check user permissions for edit. Only admin can edit

  betModel.findById(req.params.id, function(err, bet) {
    if (err) {
      return res.status(404).json({ message: "not found" });
    }

    betModel.findOneAndUpdate(
      { _id: req.paramas.id },

      {
        $set: {
          eventdate: req.body.eventdate,
          sportsid: req.body.sportsid,
          country: req.body.country,
          league: req.body.league,
          hometeam: req.body.hometeam,
          awayteam: req.body.awayteam,
          bettype: req.body.bettype,
          bookie: req.body.bookie,
          betchoice: req.body.betchoice,
          stake: req.body.stake,
          odds: req.body.odds,
          ev: req.body.ev,
          result: req.body.result,
          winnings: req.body.winnings,
          saldo: req.body.saldo
        }
      },
      function(err) {
        if (err) {
          return res.status(409).json({ message: "conflict" });
        }
        return res.status(200).json({ message: "success" });
      }
    );
  });
});

module.exports = router;
