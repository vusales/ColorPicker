import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import Allpallets from "./components/Allpallets"; 
import SinglePallete from './components/SinglePallete';
import {BrowserRouter , Route, Switch , HashRouter } from "react-router-dom" ;


// allpalletsde silende refresh olmamis silinmir.ona bir bax , 
// app -da copy-de alert cixart 


 
ReactDOM.render(
  <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/allPallets" component={Allpallets} />
          <Route exact path="/Pallets/:value" component={SinglePallete} />
        </Switch>
      </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


