import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { Game } from './components/Game';

class App extends React.Component {
  render(){
    return (
      <Router>
        <Route path="/" component={Game} />
      </Router>
    )
  }
}

export default App;
