import React from "react";

function Input({ title, name, typeValue, setValuesToUpdate }) {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <input
          type="text"
          className="input"
          name={name}
          defaultValue={typeValue !== undefined ? typeValue : ""}
          onChange={setValuesToUpdate}
        />
      </div>
    </div>
  );
}

export default function Form(props) {
  const { value, setValuesToUpdate, closeFormTimer, action } = props;
  
  return (
    <div className={value === undefined ? "card cardIsHome" : "card"}>
      <div className="card-content">
        <Input
          title="Title"
          name="title"
          typeValue={value !== undefined ? value.title : undefined}
          setValuesToUpdate={setValuesToUpdate}
        />
        <Input
          title="Project"
          name="project"
          typeValue={value !== undefined ? value.project : undefined}
          setValuesToUpdate={setValuesToUpdate}
        />

        <div className="field is-grouped">
          <p className="control">
            <button onClick={action} className="button is-primary is-outlined">
              {value === undefined ? "Create" : "Update"}
            </button>
          </p>
          <p className="control">
            <button
              onClick={closeFormTimer}
              className="button is-danger is-outlined"
            >
              Cancel
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
