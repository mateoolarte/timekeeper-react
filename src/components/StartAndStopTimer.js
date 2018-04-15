import React, { Component } from "react";
import store from "../store";
import { updateTime } from "../actionCreators";

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

class StartAndStopTimer extends Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.interval = null;
  }
  componentDidMount() {
    if (this.props.data.isRunning)
      this.interval = setInterval(this.startTimer, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
  render() {
    const { data } = this.props;
    return (
      <footer className="card-footer">
        {data.isRunning && (
          <BtnActionTimer
            action={this.stopTimer}
            colorBtn="is-danger"
            text="Stop"
          />
        )}

        {!data.isRunning && (
          <BtnActionTimer
            action={() => (this.interval = setInterval(this.startTimer, 1000))}
            colorBtn="is-success"
            text="Start"
          />
        )}
      </footer>
    );
  }
}

export default StartAndStopTimer;
