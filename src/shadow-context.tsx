/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactElement, ReactNode, useContext, useReducer } from 'react';
import { ContextDevTool } from 'react-context-devtool';
/* eslint-enable @typescript-eslint/no-unused-vars */

enum Actions {
  setWrapperEl = 'setWrapperEl',
  setShadowRight = 'setShadowRight',
  removeShadowRight = 'removeShadowRight',
  setShadowLeft = 'setShadowLeft',
  removeShadowLeft = 'removeShadowLeft',
  setShadowRightPosition = 'setShadowRightPosition',
}

type ActionType =
  | { type: 'setWrapperEl'; payload: { el: HTMLDivElement } }
  | { type: 'setShadowRight' }
  | { type: 'removeShadowRight' }
  | { type: 'setShadowRightPosition'; payload: { shadowRightPosition: number } };

type ShadowState = {
  hasShadowRight: boolean;
  hasShowLeft: boolean;
  shadowRightPosition: number;
  wrapperEl?: HTMLDivElement;
};

type Dispatch = (action: ActionType) => void;

const ShadowContext = React.createContext<ShadowState | undefined>(null);

const ShadowContextDispatch = React.createContext<Dispatch | undefined>(null);

const INITIAL_SHADOW_STATE = {
  hasShadowRight: false,
  hasShowLeft: false,
  shadowRightPosition: 0,
};

const shadowReducer = (state: ShadowState, action: ActionType): ShadowState => {
  switch (action.type) {
    case Actions.setWrapperEl:
      return {
        ...state,
        wrapperEl: action.payload.el,
      };
    case Actions.setShadowRight:
      return {
        ...state,
        hasShadowRight: true,
      };
    case Actions.removeShadowRight:
      return {
        ...state,
        hasShadowRight: false,
      };
    case Actions.setShadowRightPosition:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const ShadowProvider = ({ children }: { children: ReactNode }): ReactElement => {
  const [state, dispatch] = useReducer(shadowReducer, INITIAL_SHADOW_STATE);
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context

  return (
    <ShadowContext.Provider value={state}>
      <ContextDevTool context={ShadowContext} id='shadowContext' displayName='Shadow Context' />
      <ShadowContextDispatch.Provider value={dispatch}>
        <ContextDevTool context={ShadowContextDispatch} id='shadowContextDispatch' displayName='Shadow Context Dispatch' />
        {children}
      </ShadowContextDispatch.Provider>
    </ShadowContext.Provider>
  );
};

const useShadowContext = (): ShadowState => {
  const context = useContext(ShadowContext);
  if (context === undefined) {
    throw new Error('useShadowContext must be used within a ShadowProvider');
  }
  return context;
};

const useShadowContextDispatch = (): Dispatch => {
  const context = useContext(ShadowContextDispatch);
  if (context === undefined) {
    throw new Error('useShadowContextDispatch must be used within a ShadowProvider');
  }
  return context;
};

export { Actions, ShadowProvider, useShadowContext, useShadowContextDispatch };
