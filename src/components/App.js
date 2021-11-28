import React from 'react';
import Header from '../components/ui/Header'
import Footer from '../components/ui/Footer'
import { ThemeProvider } from '@material-ui/styles'
import theme from './ui/Theme'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route exact path='/' component={() => <div style={{height: "2000px"}}>Home</div>}/>
          <Route path='/services' component={() => {return (<div>services</div>) }}/>
          <Route path='/customsoftware' component={() => <div>customsoftware</div>}/>
        </Switch>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
