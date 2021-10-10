import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import Allpallets from "./components/Allpallets"; 
import {BrowserRouter , Route, Switch , HashRouter } from "react-router-dom" ; 



// allpalletsde silende refresh olmamis silinmir.ona bir bax , 
// app -da copy-de alert cixart 
// router yazmalisan all pallets-i clickleyende ve allpalletsde reng divine basanda sehifelere kecid etmelidir.
// allpalletsden kecen  rengler sehifesini yig


 
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/allPallets" component={Allpallets} />
      </Switch>
    </HashRouter>

    {/* <App/>  */}
    {/* <Allpallets/> */}

  </React.StrictMode>,
  document.getElementById('root')
);


