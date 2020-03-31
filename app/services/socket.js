import io from "socket.io-client";
import { socketEnvironment } from "../environment/environment";

let socket = undefined;

const LISTENERS = {
  // eventKey: [executor_func_1, executor_func_2...]
  new_msg: [],
  new_network_msg: [],
  new_entity_msg: []
};

export const emitSocketJoinEvent = phone => {
  console.log(`Socket Service: Joined via ${phone}`);
  socket.emit("join", { phone });
};

export const connectSocket = phone => {
  if (!socket) {
    console.log("Socket Service: Initializing");
    socket = io.connect(socketEnvironment);
    startListening();
  } else {
    if (socket.disconnected) {
      console.log("Socket Service: Reconnecting");
      socket.connect();
    }
  }
  //   socket.emit("join", { phone: storageData.phone });
};

const startListening = () => {
  Object.keys(LISTENERS).forEach(eventKey => {
    socket.on(`${eventKey}`, data => {
      console.log(`Socket Service: ${eventKey} event received`, socket);
      if (LISTENERS[eventKey].length > 0) {
        console.log(`Socket Service: Executor functions found for ${eventKey}`);
        LISTENERS[eventKey].forEach(executorFunction => executorFunction(data));
      } else
        console.log(
          `Socket Service: No executor functions found for ${eventKey}`
        );
    });
  });
};

export const attachEventExecutor = (eventKey, executorFunction) => {
  if (socket) {
    if (
      typeof eventKey === "string" &&
      typeof executorFunction === "function"
    ) {
      if (LISTENERS.hasOwnProperty(eventKey)) {
        LISTENERS[eventKey] = [...LISTENERS[eventKey], executorFunction];
        // console.log(
        //   "Attached Event Executor",
        //   socket,
        //   eventKey,
        //   executorFunction,
        //   LISTENERS
        // );
      } else console.log(`Socket Service: ${eventKey} is not configured`);
    } else console.log(`Socket Service: Failed to attach executor`);
  } else console.log(`Socket Service: Socket not initialized!`);
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("Socket Service: Disconnecting");
    removeAllExecutors();
    socket.disconnect();
  }
};

const removeAllExecutors = () => {
  Object.keys(LISTENERS).forEach(eventKey => {
    LISTENERS[eventKey] = [];
  });
};
