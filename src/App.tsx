import './App.css'
import { gptchat } from './api'
import { useContext, FormEvent, useState } from 'react'
import { StateContext } from './context/useState'
import MarkdownPreview from '@uiw/react-markdown-preview'

function App() {

  const [state, dispatch] = useContext(StateContext)
  const [waiting, setWaiting] = useState(false)

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setWaiting(true)
    const input = e.currentTarget.input.value
    const response = await gptchat(input, state.responses)
    const responses = [...state.responses]
    responses.push({ question: input, answer: response})
    dispatch({ type: 'set', payload: responses })
    setWaiting(false)
  }

  return (
    <div className='App'>
      <div className='container'>
        <div className='responses'>
        <div>{state.responses.map((response, index) => {
          const mdStart = response.answer?.indexOf('```')
          const mdEnd = response.answer?.indexOf('```', mdStart + 3)
          let md = ''
          if (mdStart !== -1 && mdEnd !== -1) {
            md = response.answer?.slice(mdStart + 3, mdEnd)
            console.log(md)
          }
          return (
            <div key={index} className='response'>
              <div style={{textAlign:'right'}}>
              <div className='questionText'>{response.question}</div>
              </div>
              <div className='answerText'>{response.answer ? <MarkdownPreview source={response.answer}/> : 'error'}</div>
            </div>
          )})}</div>
        </div>
        <form onSubmit={submitForm}>
          <div className='form'>
            <textarea
              name='input'
              id='input'
              cols={120}
              rows={5}
              defaultValue='Wat is de meest gebruikte functionele programmeertaal?'
            ></textarea>
          <button disabled={waiting} type='submit'>{waiting ? '...' : 'Submit'}</button>
        </div>
        </form>
      </div>
    </div>
  )
}

export default App
