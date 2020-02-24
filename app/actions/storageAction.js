export const saveStorageData = (receivedData) => {
    return {
        type: 'SAVE_STORAGE',
        payload: receivedData
    };
}

export const saveUserToken = (receivedData) => {
    return {
        type: 'SAVE_TOKEN',
        payload: receivedData
    };
}

export const messageReceived = (receivedData) => {
    return {
        type: 'RECEIVED_MESSAGE',
        payload: receivedData
    };
}

export const dump = (receivedData) => {
    return {
        type: 'DUMP_OPERATION',
        payload: receivedData
    };
}

export const saveChatDeatils = (receivedData) => {
    return {
        type: 'SAVE_CHAT_DETAILS',
        payload: receivedData
    };
}

export const iconChatDetails = (receivedData) => {
    return {
        type: 'ICON_CHAT_DETAILS',
        payload: receivedData
    };
}

export const addInChat = (receivedData) => {
    return {
        type: 'ADD_IN_CHAT',
        payload: receivedData
    };
}

export const saveRecentConv = (receivedData) => {
    return {
        type: 'SAVE_RECENT_CONV',
        payload: receivedData
    };
}

export const addInConv = (receivedData) => {
    return {
        type: 'ADD_IN_CONV',
        payload: receivedData
    };
}

export const resetConv = () => {
    return {
        type: 'RESET_CONV',
    };
}

export const resetStore = () => {
    return {
        type: 'RESET_STORE',
    };
}

export const changeLanguage = (receivedData) => {
    return {
        type: 'CHANGE_LANGUAGE',
        payload: receivedData
    };
}

export const saveHelpMessages = (receivedData) => {
    return {
        type: 'SAVE_HELP_MESSAGES',
        payload: receivedData
    };
}

export const helpReceived = (receivedData) => {
    return {
        type: 'HELP_RECEIVED',
        payload: receivedData
    };
}

export const addInHelp = (receivedData) => {
    return {
        type: 'ADD_IN_HELP',
        payload: receivedData
    };
}