import React, {
  useEffect,
  useSyncExternalStore,
  type PropsWithChildren,
} from "react";
type ConnectAction = { type: "connect"; wallet: string };
type DisconnectAction = { type: "disconnect" };

type Action = ConnectAction | DisconnectAction;
type Dispatch = (action: Action) => void;
type State = { wallet: string | null };

const MetamaskContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

function metamaskReducer(state: State, action: Action) {
  switch (action.type) {
    case "connect": {
      const { wallet } = action;
      return { ...state, wallet };
    }
    case "disconnect": {
      return { ...state, wallet: null };
    }
    default: {
      throw new Error("Unhandled action type");
    }
  }
}

function MetamaskProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = React.useReducer(metamaskReducer, { wallet: "" });
  const value = { state, dispatch };

  useEffect(() => {
    if (typeof window !== undefined) {
      console.log("hello");
    }
  }, []);

  return (
    <MetamaskContext.Provider value={value}>
      {children}
    </MetamaskContext.Provider>
  );  
}

function useMetamask() {
  const context = React.useContext(MetamaskContext);
  if (context === undefined) {
    throw new Error("useCount must be used within a MetamaskProvider");
  }
  return context;
}

export { MetamaskProvider, useMetamask };
