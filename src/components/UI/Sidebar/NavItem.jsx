function App({title = 'Nav Item', index = 0, navState, handleNav}) {
  let isActive = '';

  if(navState == index) {
    isActive = ' active';
  }

  return (
    <button className={'navItem' + isActive} onClick={handleNav} data-index={index}>{title}</button>
  )
}

export default App
