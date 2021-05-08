import { ActionTypes } from "../contants/ActionTypes";
const intialState = {
    residents: [],
    filter: [],
};
export const StudentReducer = (state = intialState, actions) => {
    switch (actions.type) {
        case ActionTypes.SET_RESIDENTS:
            return { ...state, residents: actions.payload };
        case ActionTypes.SET_RESIDENTS_FILTER:
            return { ...state, filter: actions.payload };

        default:
            return state;
    }
};
