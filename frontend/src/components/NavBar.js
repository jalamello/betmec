import React from "react";
import { List } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class NavBar extends React.Component {
  logout = () => {
    this.props.logout();
  };

  saveToStorage = event => {
    let target = "/" + event.target.name;
    sessionStorage.setItem("target", target);

    if (this.props.mode === "Edit") {
      this.props.changeEditMode("Add");
    }
  };

  render() {
    let navbar;

    console.log(this.props.isLogged);

    if (this.props.isLogged) {
      navbar = (
        <List>
          <List.Item>
            <Link name="list" to="/list" onClick={this.saveToStorage}>
              Bets
            </Link>
          </List.Item>
          <List.Item>
            <Link name="form" to="/form" onClick={this.saveToStorage}>
              Add Bet
            </Link>
          </List.Item>
          <List.Item>
            <Link to="/mybookies">My bookies</Link>
          </List.Item>
          <List.Item>
            <Link to="/mysports">My sports</Link>
          </List.Item>
          <List.Item>
            <Link to="/mybettypes">My bet types</Link>
          </List.Item>
          <List.Item>
            <Link to="/" onClick={this.logout}>
              Logout
            </Link>
          </List.Item>
        </List>
      );
    } else {
      navbar = (
        <List>
          <List.Item>
            <Link name="list" to="/list">
              Bets
            </Link>
          </List.Item>
        </List>
      );
    }
    return <div>{navbar}</div>;
  }
}
