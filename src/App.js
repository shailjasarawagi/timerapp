import React ,{Component} from 'react';
import Timer from './components/Timer';
import './App.css';
import { TIMER, COUNTDOWN } from "./constants";
// import { render } from '@testing-library/react';
import CountDown from './components/CountDown';
class App extends Component {

constructor(props){
  super(props);


  this.state = {
    mode: TIMER
   
  };
  this.handleChanges = this.handleChanges.bind(this);
}
handleChanges(e) {
  var checked = this.refs.toggle.checked;
  console.log(checked);

  if (checked === true) {
    this.setState({
      ...this.state,
      mode: TIMER
    });
  } else if (checked === false) {
    this.setState({
      ...this.state,
      mode: COUNTDOWN
    });
  }
}


  render(){
  return (
    
    <div className="App d-flex flex-column container">
     <div className="Header">
       <h1>Web Timer App</h1>
     </div>

    <div className="d-flex flex-fill justify-content-center flex-column">
      <div className="row">
        <div className="col-md-6 offset-md-3">
        <div className="timer-toggle"  onClick={this.handleChanges}>
                  <input
                    type="checkbox"
                    defaultChecked="checked"
                    data-toggle="toggle"
                    data-on="Timer"
                    ref="toggle"
                    data-off="Countdown"
                  />
                </div>
        <div className="time-container">
                  {this.state.mode === TIMER && <Timer />}
                  {this.state.mode === COUNTDOWN && <CountDown />}
                </div>
        </div>
      </div>
    </div>
    
    <div className="d-flex flex-grow-1 " />

    </div>
  );
}
}

export default App;
