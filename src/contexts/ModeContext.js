import React, { useContext, useReducer } from "react";

export const ModeContext = React.createContext();

const ModeReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export const ModeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ModeReducer, {
    mode: "light",
  });

  const changeMode = (mode) => {
    dispatch({
      type: "CHANGE_MODE",
      payload: mode,
    });
  };

  return (
    <ModeContext.Provider value={{ ...state, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
};
