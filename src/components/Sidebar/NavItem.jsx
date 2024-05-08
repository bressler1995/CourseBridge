import { useState } from 'react';

function App({title = 'Nav Item'}) {

  return (
    <button className='navItem'>{title}</button>
  )
}

export default App
