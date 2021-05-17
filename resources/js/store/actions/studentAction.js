import {ActionTypes} from "../contants/ActionTypes";
export const setResidents = (residents) => {
    return {
        type: ActionTypes.SET_RESIDENTS,
        payload: residents,
    }
}

export const setResidentsFilter = (filter) => {
    return {
        type: ActionTypes.SET_RESIDENTS_FILTER,
        payload: filter,
    }
}
