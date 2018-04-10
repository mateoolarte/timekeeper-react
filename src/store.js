import { createStore } from "redux";
import initialData from "./components/initialData";

const reducer = (state, action) => {
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timers: state.timers.concat(action.timer)
    };
  }

  return state;
};

export default createStore(reducer, { timers: initialData });
