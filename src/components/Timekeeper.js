import React, { Component } from "react";
import store from "../store";
import { removeTimer, updateTimer } from "../actionCreators";

import Form from "./Form";
import StartAndStopTimer from "./StartAndStopTimer";
import ConvertMstoHumanized from "./convertMstoHumanized";

import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import iconEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import iconDelete from "@fortawesome/fontawesome-free-solid/faTrashAlt";

export default class Timekeeper extends Component {
  constructor(props) {
    super(props);

    this.closeFormTimer = this.closeFormTimer.bind(this);
    this.showFormTimer = this.showFormTimer.bind(this);
    this.setValuesToUpdate = this.setValuesToUpdate.bind(this);
    this.updateTimer = this.updateTimer.bind(this);

    this.state = {
      content: true,
      form: false,
      title: "",
      project: ""
    };
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
                {ConvertMstoHumanized(data.milliseconds)}
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

            <StartAndStopTimer data={data} />
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
