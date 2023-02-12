import './App.css'
import { gptchat } from './api'
import { useContext, FormEvent } from 'react'
import { StateContext } from './context/useState'

function App() {

  const [state, dispatch] = useContext(StateContext)

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const input = e.currentTarget.input.value
    const response = await gptchat(input, state.responses)
    const responses = [...state.responses]
    responses.push({ question: input, answer: response})
    dispatch({ type: 'set', payload: responses })
  }

  return (
    <div className='App'>
      <div>{state.responses.map((response, index) => (
        <div key={index}>
          <p>Question: {response.question}</p>
          <p>{response.answer}</p>
        </div>
      ))}</div>
      <div>
        <form onSubmit={submitForm}>
          <label htmlFor='input'>Input</label>
          <textarea
            name='input'
            id='input'
            cols={120}
            rows={10}
          ></textarea>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default App
