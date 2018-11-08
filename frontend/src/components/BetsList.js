import React from "react";
import { Table, Button } from "semantic-ui-react";

export default class BetsList extends React.Component {
  remove = event => {
    this.props.removeBet(event.target.name);
  };

  edit = event => {
    console.log("edit - event");
    console.log(typeof this.props.changeEditMode);
    this.props.changeEditMode("Edit", event.target.id);
  };

  render() {
    let bets = this.props.list.map((item, index) => {
      return (
        <Table.Row key={item.id}>
          <Table.Cell>{item.eventdate}</Table.Cell>
          <Table.Cell>{item.sportid}</Table.Cell>
          <Table.Cell>{item.country}</Table.Cell>
          <Table.Cell>{item.league}</Table.Cell>
          <Table.Cell>{item.hometeam}</Table.Cell>
          <Table.Cell>{item.awayteam}</Table.Cell>
          <Table.Cell>{item.bettype}</Table.Cell>
          <Table.Cell>{item.bookie}</Table.Cell>
          <Table.Cell>{item.betchoice}</Table.Cell>
          <Table.Cell>{item.stake}</Table.Cell>
          <Table.Cell>{item.odds}</Table.Cell>
          <Table.Cell>{item.ev}</Table.Cell>
          <Table.Cell>{item.result}</Table.Cell>
          <Table.Cell>{item.winnings}</Table.Cell>
          <Table.Cell>{item.saldo}</Table.Cell>
          <Table.Cell>
            <Button onClick={this.remove} name={item.id}>
              Remove
            </Button>
          </Table.Cell>
          <Table.Cell>
            <Button onClick={this.edit} id={item.id}>
              Edit
            </Button>
          </Table.Cell>
        </Table.Row>
      );
    });
    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Event date</Table.HeaderCell>
            <Table.HeaderCell>Sport Id</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
            <Table.HeaderCell>League</Table.HeaderCell>
            <Table.HeaderCell>Home team</Table.HeaderCell>
            <Table.HeaderCell>Away team</Table.HeaderCell>
            <Table.HeaderCell>Bet type</Table.HeaderCell>
            <Table.HeaderCell>Bookie</Table.HeaderCell>
            <Table.HeaderCell>Bet Choice</Table.HeaderCell>
            <Table.HeaderCell>stake</Table.HeaderCell>
            <Table.HeaderCell>Odds</Table.HeaderCell>
            <Table.HeaderCell>EV</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Winnings</Table.HeaderCell>
            <Table.HeaderCell>Saldo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{bets}</Table.Body>
      </Table>
    );
  }
}
