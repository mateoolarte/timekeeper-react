const createTimer = (id, title, project) => {
  return {
    type: "CREATE_TIMER",
    id,
    title,
    project
  }
}

const updateTimer = (id, title, project) => {
  return {
    type: "UPDATE_TIMER",
    id,
    title,
    project
  }
}

const removeTimer = timer => {
  return {
    type: "REMOVE_TIMER",
    timer
  }
}

const updateTime = time => {
  return {
    type: "UPDATE_TIME",
    time
  }
}

export { createTimer, removeTimer, updateTimer, updateTime }