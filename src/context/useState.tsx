import React, { useReducer, createContext, ReactNode } from 'react'

export interface Response {
  question: string
  answer: string
}

interface State {
  count: number
  responses: Response[]
}

interface Action {
  type: 'increment' | 'decrement' | 'set'
  payload?: Response[]
}

const initialState: State = {
  count: 0,
  responses: []
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case 'set':
      if (!action.payload) {
        return state
      }
      return { ...state, responses: action.payload }
    default:
      return state
  }
}

const StateContext = createContext<[State, React.Dispatch<Action>]>([initialState, () => {
}])

const StateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  )
}

export { StateContext, StateProvider }
