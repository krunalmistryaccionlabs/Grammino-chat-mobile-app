import { language } from "../comman/constants";
export const INITIAL_STATE = {
  storageData: [],
  entities: [],
  entityConversation: {},
  userToken: "",
  message: [],
  dumpValue: "",
  chatDetails: [],
  convDetails: [],
  languageSelected: language,
  lan: language.marathi,
  helpMessages: [],
  helpMessageReceived: ""
};

function filterData(data) {
  data.chatDetails[data.index].icon = data.value;
  return data.chatDetails;
}

function filterChat(data) {
  let temp = data.convDetails;
  if (temp.length > 0) {
    if (temp[temp.length - 1]._id !== data.add._id) {
      return [...data.convDetails, data.add];
    } else {
      if (data.add.hasOwnProperty("_id")) {
        return [...data.convDetails];
      } else {
        return [...data.convDetails, data.add];
      }
    }
  } else {
    return [...data.convDetails, data.add];
  }
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SAVE_STORAGE":
      return {
        ...state,
        storageData: action.payload
      };
    case "SAVE_TOKEN":
      return {
        ...state,
        userToken: action.payload
      };
    case "RECEIVED_MESSAGE":
      return {
        ...state,
        message: action.payload.msg
      };
    case "DUMP_OPERATION":
      return {
        ...state,
        dumpValue: action.payload
      };
    case "SET_ENTITIES":
      return {
        ...state,
        entities: action.payload
      };
    case "SAVE_CHAT_DETAILS":
      return {
        ...state,
        chatDetails: action.payload
      };
    case "ICON_CHAT_DETAILS":
      return {
        ...state,
        chatDetails: filterData(action.payload)
      };
    case "ADD_IN_CHAT":
      return {
        ...state,
        chatDetails: [...action.payload.chatDetails, action.payload.add]
      };
    case "SAVE_RECENT_CONV":
      return {
        ...state,
        convDetails: action.payload
      };
    case "SET_ENTITY_CONVERSATION": {
      const { entityId, data } = action.payload;
      console.log("Setting ent conv", action.payload);

      return {
        ...state,
        entityConversation: {
          ...state.entityConversation,
          [entityId]: data
        }
      };
    }
    case "ADD_IN_CONV":
      return {
        ...state,
        convDetails: filterChat(action.payload)
      };

    case "ADD_IN_ENTITY_CONV": {
      const { entityId, data } = action.payload;
      console.log("Adding in ent conv", action.payload);

      return {
        ...state,
        entityConversation: {
          ...state.entityConversation,
          [entityId]: [...state.entityConversation[entityId], data]
        }
      };
    }
    case "RESET_CONV":
      return {
        ...state,
        convDetails: []
      };
    case "CHANGE_LANGUAGE":
      return {
        ...state,
        lan: language[action.payload]
      };
    case "RESET_STORE":
      return {
        ...state,
        storageData: [],
        userToken: "",
        message: [],
        dumpValue: "",
        chatDetails: [],
        convDetails: []
      };
    case "SAVE_HELP_MESSAGES":
      return {
        ...state,
        helpMessages: action.payload
      };
    case "HELP_RECEIVED":
      return {
        ...state,
        helpMessageReceived: action.payload.msg
      };
    case "ADD_IN_HELP":
      return {
        ...state,
        helpMessages: [...action.payload.helpMessages, action.payload.add]
      };
    default:
      return state;
  }
};
