function App({title = 'Nav Item', index = 0, handleNav}) {

  return (
    <button className='navItem' onClick={handleNav} data-index={index}>{title}</button>
  )
}

export default App
