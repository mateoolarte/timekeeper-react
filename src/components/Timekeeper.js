import React from "react";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import iconEdit from "@fortawesome/fontawesome-free-solid/faEdit";
import iconDelete from "@fortawesome/fontawesome-free-solid/faTrashAlt";

export default function Timekeeper({ data }) {
  return (
    <div className="card">
      <header className="card-header">
        <h2 className="card-header-title">{data.title}</h2>
        <div className="card-header-icon">
          <p className="has-text-grey">
          {data.project}
          </p>
        </div>
      </header>
      <div className="card-content">
        <p className="has-text-centered has-text-weight-bold is-size-3">
          {data.time}
        </p>
        <p className="field has-text-right margin-3-top">
          <button className="button is-link is-outlined">
            <span className="icon">
              <FontAwesomeIcon icon={iconEdit} />
            </span>
          </button>
          <button className="margin-3-left button is-danger is-outlined">
            <span className="icon">
              <FontAwesomeIcon icon={iconDelete} />
            </span>
          </button>
        </p>
      </div>
      <footer className="card-footer">
        <a className="button is-success is-medium is-fullwidth">Start</a>
      </footer>
    </div>
  );
}
