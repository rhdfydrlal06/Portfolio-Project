
import React, {useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Header from "./components/Header";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Network from "./pages/Network";
import ReadPortfolio from "./pages/ReadPortfolio";
import NotFound from "./pages/NotFound";

const App = () => {
  const [sessionId, setSessionId] = useState(window.sessionStorage.getItem("id"));
  const [readWhos, setReadWhos] = useState(null);
      return (
          <div>
            <BrowserRouter>
              <Header sessionId={sessionId} setSessionId={setSessionId} />
              <br />
              <Switch>
                <Route exact path="/"><Main sessionId={sessionId} /></Route>
                <Route exact path="/login"><Login setSessionId={setSessionId} /></Route>
                <Route exact path="/signup"><Signup /></Route>
                <Route exact path="/network"><Network sessionId={sessionId} setReadWhos={setReadWhos} /></Route>
                <Route exact path="/read_portfolio"><ReadPortfolio sessionId={sessionId} readWhos={readWhos} /></Route>
                <Route path="/"><NotFound /></Route>

              </Switch>
            </BrowserRouter>
          </div>
      );
}

export default App;