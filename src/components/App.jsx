import React, { Component } from 'react'

function* getUtcToIsoAppDisplay() {
  while (true) 
    yield new Date().toISOString().split('T')[0];
}

class App extends Component {
  render() {
    const UTC_ITERATOR = getUtcToIsoAppDisplay();
    return <div>{UTC_ITERATOR.next().value}</div>
  }
}

export default App

