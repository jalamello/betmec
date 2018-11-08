import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./LoginForm";
import BetsList from "./BetsList";
import BetsForm from "./BetsForm";

export default class Main extends React.Component {
  render() {
    console.log("Main render");

    console.log(typeof this.props.changeEditMode);
    let target = "/list";
    if (sessionStorage.getItem("taget")) {
      target = sessionStorage.getItem("target");
    }

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() =>
            this.props.isLogged ? (
              <Redirect to={target} />
            ) : (
              <LoginForm
                register={this.props.register}
                login={this.props.login}
              />
            )
          }
        />
        <Route
          path="/list"
          render={() =>
            this.props.isLogged ? (
              <BetsList
                list={this.props.list}
                removeBet={this.props.removeBet}
                changeEditMode={this.props.changeEditMode}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
        <Route
          path="/form"
          render={() =>
            this.props.isLogged ? (
              <BetsForm
                addBet={this.props.addBet}
                mode={this.props.mode}
                editBet={this.props.editBet}
                changeEditMode={this.props.changeEditMode}
              />
            ) : (
              <Redirect to="/" />
            )
          }
        />
      </Switch>
    );
  }
}
