import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { withRouter } from "react-router-dom";
import Main from "./components/Main";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isLogged: false,
      mode: "Add",
      token: "",
      userlist: [],
      editBet: {}
    };
  }

  componentDidMount() {
    if (sessionStorage.getItem("isLogged")) {
      let temp;
      let isLogged = sessionStorage.getItem("isLogged");
      if (isLogged === "true") {
        temp = true;
      } else {
        temp = false;
      }
      let token = sessionStorage.getItem("token");
      this.setState({
        isLogged: temp,
        token: token
      });
      if (temp === true) {
        console.log("temp===true ...... getBets");
        this.getBets(token);
        this.getUserList(token);
      }
    }
  }

  setSessionStorage = (isLogged, token) => {
    let temp;
    if (isLogged) {
      temp = "true";
    } else {
      temp = "false";
    }
    sessionStorage.setItem("isLogged", temp);
    sessionStorage.setItem("token", token);
  };

  // LOGIN API
  register = user => {
    console.log("register");
    console.log(user);

    let registerObject = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    };
    fetch("/register", registerObject)
      .then(response => {
        if (response.ok) {
          alert("Register successful");
        }
        if (response.status === 409) {
          alert("Username already in use");
        }
      })
      .catch(error => {
        console.log("VIRHE");
        console.log(error);
      });
  };

  login = user => {
    let loginObject = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    };
    fetch("/login", loginObject)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              this.setState({
                isLogged: true,
                token: data.token
              });
              this.setSessionStorage(true, data.token);
              this.getBets();
              this.getUserList();
              //this.props.history.push("/list");
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          alert("Wrong username or password");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  logout = () => {
    let logoutObject = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: this.state.token
      }
    };
    fetch("/logout", logoutObject)
      .then(response => {
        this.setState({
          isLogged: false,
          token: ""
        });
        this.setSessionStorage(false, "");
      })
      .catch(error => {
        console.log(error);
      });
  };

  getUserList = token => {
    let tempToken;

    if (token) {
      tempToken = token;
    } else {
      tempToken = this.state.token;
    }
    let userObject = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: tempToken
      }
    };
    fetch("/users", userObject)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              this.setState({
                userlist: data
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  // TASKS API

  getBets = token => {
    console.log("NOW in getBEts");
    let tempToken;
    if (token) {
      tempToken = token;
    } else {
      tempToken = this.state.token;
    }
    let fetchObject = {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: tempToken
      }
    };
    console.log("fetch /Api/bets");
    fetch("/api/bets", fetchObject)
      .then(response => {
        if (response.ok) {
          response
            .json()
            .then(data => {
              console.log("getBets OK");
              this.setState({
                list: data
              });
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          console.log("Server responded with status:" + response.status);
        }
      })
      .catch(error => {
        console.log(error);
      });
    console.log("EBD fetch");
  };

  addBet = bet => {
    if (this.state.mode === "Add") {
      let addObject = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: this.state.token
        },
        body: JSON.stringify(bet)
      };
      fetch("/api/bets", addObject)
        .then(response => {
          if (response.ok) {
            this.getBets();
          } else {
            console.log("Server returned with status:" + response.status);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log(bet);
      this.changeEditMode("Add");
      this.props.history.push("/list");
      let editObject = {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          token: this.state.token
        },
        body: JSON.stringify(bet)
      };
      fetch("/api/bets/" + bet.id, editObject)
        .then(response => {
          if (response.ok) {
            this.getBets();
          } else {
            console.log("Server responded with status:" + response.status);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  changeEditMode = (mode, id) => {
    console.log("changeEditMode " + mode + " " + id);
    let bet = {};
    if (id) {
      let tempId = parseInt(id, 10);
      for (let i = 0; i < this.state.list.length; i++) {
        if (tempId === this.state.list[i].id) {
          bet = this.state.list[i];
        }
      }
    }
    if (mode === "Edit") {
      this.props.history.push("/form");
    }
    console.log(bet);

    this.setState({
      mode: mode,
      editBet: bet
    });
  };

  removeBet = id => {
    let deleteBet = {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        token: this.state.token
      }
    };
    fetch("/api/bets/" + id, deleteBet)
      .then(response => {
        if (response.ok) {
          this.getBets();
        } else {
          console.log("Server responded with status:" + response.status);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="App">
        <NavBar
          isLogged={this.state.isLogged}
          mode={this.state.mode}
          logout={this.logout}
          changeEditMode={this.changeEditMode}
        />
        <hr />
        <Main
          login={this.login}
          register={this.register}
          list={this.state.list}
          isLogged={this.state.isLogged}
          userlist={this.state.userlist}
          addBet={this.addBet}
          removeBet={this.removeBet}
          editBet={this.state.editBet}
          mode={this.state.mode}
          changeEditMode={this.changeEditMode}
        />
      </div>
    );
  }
}

export default withRouter(App);
