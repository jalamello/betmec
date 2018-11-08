import React from "react";
import { Form, Button, Dropdown } from "semantic-ui-react";

export default class BetsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      eventdate: 0,
      sportsid: 1,
      country: "",
      league: "",
      hometeam: "",
      awayteam: "",
      bettype: "",
      bookie: "",
      betchoice: "",
      stake: 0,
      odds: 0,
      ev: 0,
      result: "",
      winnings: 0,
      saldo: 0,
      onEdit: 1
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    if (newProps.mode === "Edit") {
      if (prevState.onEdit === 1) {
        console.log(newProps);
        return {
          id: newProps.editBet.id,
          eventdate: newProps.editBet.eventdate,
          sportsid: newProps.editBet.sportsid,
          country: newProps.editBet.country,
          league: newProps.editBet.league,
          hometeam: newProps.editBet.hometeam,
          awayteam: newProps.editBet.awayteam,
          bettype: newProps.editBet.bettype,
          bookie: newProps.editBet.bookie,
          betchoice: newProps.editBet.betchoice,
          stake: newProps.editBet.stake,
          odds: newProps.editBet.odds,
          ev: newProps.editBet.ev,
          result: newProps.editBet.result,
          winnings: newProps.editBet.winnings,
          saldo: newProps.editBet.saldo,
          onEdit: 0
        };
      }
    }
    return null;
  }

  onChange = event => {
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  };

 

  submit = event => {
    event.preventDefault();
    if (this.state.hometeam.length === 0) {
      return;
    }
    let bet = {
      id: this.state.id,
      eventdate: this.state.eventdate,
      sportsid: this.state.sportsid,
      country: this.state.country,
      league: this.state.league,
      hometeam: this.state.hometeam,
      awayteam: this.state.awayteam,
      bettype: this.state.bettype,
      bookie: this.state.bookie,
      betchoice: this.state.betchoice,
      stake: this.state.stake,
      odds: this.state.odds,
      ev: this.state.ev,
      result: this.state.result,
      winnings: this.state.winnings,
      saldo: this.state.saldo
    };
    this.props.addBet(bet);
    /*
    this.setState({
      eventdate: "",
      sportsid: "",
      country: "",
      league: "",
      hometeam: "",
      awayteam: "",
      bettype: "",
      bookie: "",
      betchoice: "",
      stake: 0,
      odds: 0,
      ev: 0,
      result: "",
      winnings: 0,
      saldo: 0
      //onEdit: 1
    });
    */
  };

  render() {
    let users = [];
    /*
      for(let i=0;i<this.props.userlist.length;i++) {
        users.push({
            "key":this.props.userlist[i],
            "text":this.props.userlist[i],
            "value":this.props.userlist[i],
        })
    }*/
    return (
      <Form id="bets_form">
        <Form.Field>
          <label>Event time</label>
          <input
            type="datetime-local"
            onChange={this.onChange}
            name="eventdate"
            value={this.state.eventdate}
          />
        </Form.Field>
        <Form.Field>
          <label>SportsId</label>
          <input
            type="number"
            onChange={this.onChange}
            name="sportsid"
            value={this.state.sportsid}
          />
        </Form.Field>
        <Form.Field>
          <label>Country</label>
          <input
            type="text"
            onChange={this.onChange}
            name="country"
            value={this.state.country}
          />
        </Form.Field>
        <Form.Field>
          <label>League</label>
          <input
            type="text"
            onChange={this.onChange}
            name="league"
            value={this.state.league}
          />
        </Form.Field>
        <Form.Field>
          <label>Home</label>
          <input
            type="text"
            onChange={this.onChange}
            name="hometeam"
            value={this.state.hometeam}
          />
        </Form.Field>
        <Form.Field>
          <label>Away</label>
          <input
            type="text"
            onChange={this.onChange}
            name="awayteam"
            value={this.state.awayteam}
          />
        </Form.Field>
        <Form.Field>
          <label>Bet type</label>
          <input
            type="text"
            onChange={this.onChange}
            name="bettype"
            value={this.state.bettype}
          />
        </Form.Field>
        <Form.Field>
          <label>Bookie</label>
          <input
            type="text"
            onChange={this.onChange}
            name="bookie"
            value={this.state.bookie}
          />
        </Form.Field>
        <Form.Field>
          <label>Bet choice</label>
          <input
            type="text"
            onChange={this.onChange}
            name="betchoice"
            value={this.state.betcchoice}
          />
        </Form.Field>
        <Form.Field>
          <label>Stake</label>
          <input
            type="number"
            onChange={this.onChange}
            name="stake"
            value={this.state.stake}
          />
        </Form.Field>
        <Form.Field>
          <label>Odds</label>
          <input
            type="number"
            onChange={this.onChange}
            name="odds"
            value={this.state.odds}
          />
        </Form.Field>
        <Form.Field>
          <label>EV</label>
          <input
            type="number"
            onChange={this.onChange}
            name="ev"
            value={this.state.ev}
          />
        </Form.Field>
        <Form.Field>
          <label>Result</label>
          <input
            type="text"
            onChange={this.onChange}
            name="result"
            value={this.state.result}
          />
        </Form.Field>
        <Form.Field>
          <label>Winnings</label>
          <input
            type="number"
            onChange={this.onChange}
            name="winnings"
            value={this.state.winnings}
          />
        </Form.Field>
        <Form.Field>
          <label>Saldo</label>
          <input
            type="number"
            onChange={this.onChange}
            name="saldo"
            value={this.state.saldo}
          />
        </Form.Field>
        <Button type="submit" onClick={this.submit}>
          {this.props.mode} // Add Edit
        </Button>
      </Form>
    );
  }
}
