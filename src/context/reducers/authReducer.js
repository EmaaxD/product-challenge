import { SET_AUTH } from "../types";

export const initialState = {
  auth: null,
};

export const authReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case SET_AUTH:
      return {
        ...state,
        auth: actions.payload,
      };

    default:
      return state;
  }
};
