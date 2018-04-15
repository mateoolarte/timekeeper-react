import React, { Component } from "react";
import store from "../store";
import { removeTimer, updateTimer, updateTime } from "../actionCreators";

import Form from "./Form";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import iconEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import iconDelete from "@fortawesome/fontawesome-free-solid/faTrashAlt";

function BtnActionTimer({ action, colorBtn, text }) {
  return (
    <button
      onClick={action}
      className={`button is-medium is-fullwidth ${colorBtn}`}
      id="btnTimer"
    >
      {text}
    </button>
  );
}

function StartAndStopTimer({ timer, stopTimer, startTimer }) {
  return (
    <footer className="card-footer">
      {timer.isRunning && (
        <BtnActionTimer action={stopTimer} colorBtn="is-danger" text="Stop" />
      )}

      {!timer.isRunning && (
        <BtnActionTimer
          action={startTimer}
          colorBtn="is-success"
          text="Start"
        />
      )}
    </footer>
  );
}

export default class Timekeeper extends Component {
  constructor(props) {
    super(props);

    this.closeFormTimer = this.closeFormTimer.bind(this);
    this.showFormTimer = this.showFormTimer.bind(this);
    this.setValuesToUpdate = this.setValuesToUpdate.bind(this);
    this.updateTimer = this.updateTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);

    this.state = {
      content: true,
      form: false,
      title: "",
      project: ""
    };

    this.interval = null;
  }

  componentDidMount() {
    if (this.props.data.isRunning) {
      this.interval = setInterval(this.startTimer, 1000);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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

  updateTimer() {
    const state = this.state;
    const { data } = this.props;

    const id = data.id;
    const title = state.title.length > 0 ? state.title : data.title;
    const project = state.project.length > 0 ? state.project : data.project;

    store.dispatch(updateTimer(id, title, project));

    this.closeFormTimer();
  }

  removeTimer(timer) {
    store.dispatch(removeTimer(timer));
  }

  startTimer() {
    const { data } = this.props;

    const id = data.id;
    let milliseconds = data.milliseconds;
    let stateOfTimer = data.isRunning ? data.isRunning : !data.isRunning;

    store.dispatch(updateTime(id, (milliseconds += 1000), stateOfTimer));
  }

  stopTimer() {
    clearInterval(this.interval);
    this.interval = null;

    const { data } = this.props;

    const id = data.id;
    const milliseconds = data.milliseconds;
    let stateOfTimer = data.isRunning;

    store.dispatch(updateTime(id, milliseconds, !stateOfTimer));
  }

  millisecondsToHuman(ms) {
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / 1000 / 60) % 60);
    const hours = Math.floor(ms / 1000 / 60 / 60);

    const humanized = [
      this.pad(hours.toString(), 2),
      this.pad(minutes.toString(), 2),
      this.pad(seconds.toString(), 2)
    ].join(":");

    return humanized;
  }

  pad(numberString, size) {
    let padded = numberString;
    while (padded.length < size) padded = `0${padded}`;
    return padded;
  }

  render() {
    const { data } = this.props;

    return (
      <section className="column is-one-third padding-2">
        {this.state.content && (
          <div className="card">
            <header className="card-header">
              <h2 className="card-header-title">{data.title}</h2>
              <div className="card-header-icon">
                <p className="has-text-grey">{data.project}</p>
              </div>
            </header>
            <div className="card-content">
              <p className="has-text-centered has-text-weight-bold is-size-3">
                {this.millisecondsToHuman(data.milliseconds)}
              </p>
              <p className="field has-text-right margin-3-top">
                <button
                  onClick={this.showFormTimer}
                  className="button is-link is-outlined"
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={iconEdit} />
                  </span>
                </button>
                <button
                  onClick={() => this.removeTimer(data)}
                  className="margin-3-left button is-danger is-outlined"
                >
                  <span className="icon">
                    <FontAwesomeIcon icon={iconDelete} />
                  </span>
                </button>
              </p>
            </div>
            
            <StartAndStopTimer
              timer={data}
              stopTimer={this.stopTimer}
              startTimer={() =>
                (this.interval = setInterval(this.startTimer, 1000))
              }
            />
          </div>
        )}

        {this.state.form && (
          <Form
            value={data}
            setValuesToUpdate={this.setValuesToUpdate}
            closeFormTimer={this.closeFormTimer}
            action={this.updateTimer}
          />
        )}
      </section>
    );
  }
}
