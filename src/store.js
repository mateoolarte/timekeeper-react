import { createStore } from "redux";
import initialData from "./components/initialData";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_TIMER":
      const newTimer = {
        id: action.id,
        title: action.title,
        project: action.project,
        time: "00:00:00",
        stop: true
      };

      return {
        ...state,
        timers: state.timers.concat(newTimer)
      };

    case "UPDATE_TIMER":
      const timersUpdated = state.timers.map(timer => {
        if (timer.id === action.id) {
          return {
            ...timer,
            title: action.title,
            project: action.project
          }
        } else {
          return timer;
        }
      });

      return {
        ...state,
        timers: timersUpdated
      };

    case "REMOVE_TIMER":
      return {
        ...state,
        timers: state.timers.filter(timer => timer.id !== action.timer.id)
      };

    case "UPDATE_TIME":
      const timeUpdated = state.timers.map(timer => {
        if (timer.id === action.id) {
          return {
            ...timer,
            time: action.time
          }
        } else {
          return timer;
        }
      });

      return {
        ...state,
        timers: timerUpdated
      };

    default:
      return state;
  }
};

export default createStore(reducer, { timers: initialData });
