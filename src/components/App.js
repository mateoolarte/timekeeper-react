import React, { Component } from "react";
import store from "../store";
import { createTimer } from "../actionCreators";

import initialData from "./initialData";
import Timekeeper from "./Timekeeper";
import Form from "./Form";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import iconAdd from "@fortawesome/fontawesome-free-solid/faPlus";

function BtnAddTimer({ showFormTimer }) {
  return (
    <button className="button is-large" onClick={() => showFormTimer()}>
      <FontAwesomeIcon icon={iconAdd} />
    </button>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timers: initialData,
      content: true,
      form: false,
      id: initialData.length - 1,
      title: "",
      project: ""
    };

    this.closeFormTimer = this.closeFormTimer.bind(this);
    this.showFormTimer = this.showFormTimer.bind(this);
    this.setValuesToUpdate = this.setValuesToUpdate.bind(this);
    this.createTimer = this.createTimer.bind(this);

    store.subscribe(() => {
      this.setState({
        timers: store.getState().timers
      });
    });
  }
  closeFormTimer() {
    this.setState({
      content: true,
      form: false
    });
  }
  showFormTimer() {
    this.setState({
      content: false,
      form: true
    });
  }
  setValuesToUpdate(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  createTimer() {
    const state = this.state;
    const id = state.id + 1;
    const title = state.title;
    const project = state.project;

    store.dispatch(createTimer(id, title, project));

    this.setState({
      id: id,
      title: "",
      project: ""
    });

    this.closeFormTimer();
  }
  render() {
    return (
      <div className="container">
        <h1 className="is-size-2-mobile is-size-1 has-text-centered has-text-weight-bold margin-2-top margin-3-bottom">
          Timers
        </h1>

        <div className="columns is-multiline">
          {this.state.timers.map(timer => (
            <Timekeeper data={timer} key={timer.title} />
          ))}
        </div>

        <div className="has-text-centered margin-2-bottom">
          {this.state.content && (
            <BtnAddTimer showFormTimer={this.showFormTimer} />
          )}

          {this.state.form && (
            <Form
              setValuesToUpdate={this.setValuesToUpdate}
              closeFormTimer={this.closeFormTimer}
              action={this.createTimer}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
