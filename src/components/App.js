import React, { Component } from "react";
import initialData from "./initialData";
import store from "../store";
import Timekeeper from "./Timekeeper";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import iconAdd from "@fortawesome/fontawesome-free-solid/faPlus";

class App extends Component {
  constructor() {
    super();

    this.showNewTimer = this.showNewTimer.bind(this);

    this.state = {
      timers: initialData
    };

    store.subscribe(() => {
      this.setState({
        timers: store.getState().timers
      });
    });
  }

  showNewTimer() {
    console.log("Hi!");
  }

  render() {
    return (
      <div className="App">
        <h1 className="is-size-2-mobile is-size-1 has-text-centered has-text-weight-bold margin-2-top margin-3-bottom">
          Cronometros
        </h1>

        <div className="container">
          <div className="columns is-multiline">
            {this.state.timers.map(timer => {
              return (
                <div className="column is-one-third padding-2" key={timer.id}>
                  <Timekeeper data={timer} />
                </div>
              );
            })}
          </div>

          <div className="has-text-centered margin-2-bottom">
            <button
              className="button is-large is-success"
              onClick={this.showNewTimer}
            >
              <FontAwesomeIcon icon={iconAdd} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
