import React, { Component } from 'react'
import BookList from './components/BookList'

export class App extends Component {
  render() {
    return (
      <div id = "main">
        Reading List
        <BookList />
      </div>
    )
  }
}

export default App
