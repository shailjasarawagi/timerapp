import React ,{Component} from 'react';

import './Timer.css';

import {Timer} from "easytimer.js";

class Timers extends Component {

    constructor(props){
        super(props);

        var timer = new Timer();
        this.state={
            timer_text: timer.getTimeValues().toString(),
            timer: timer,
            timer_state:"stopped"
        };


        this.startTimer=this.startTimer.bind(this);
        this.stopTimer=this.stopTimer.bind(this);
        this.pauseTimer=this.pauseTimer.bind(this);
        this.resetTimer=this.resetTimer.bind(this);
           

       
        timer.addEventListener("secondsUpdated",this.onTimerUpdated.bind(this));
        timer.addEventListener("started",this.onTimerUpdated.bind(this));
        timer.addEventListener("reset",this.onTimerUpdated.bind(this));
    }


    componentWillUnmount() {
        if (this.state.timer !== null) {
          this.state.timer.stop();
        }
      }
      onTimerUpdated(e){
          this.setState({
              ...this.state,
              timer_text: this.state.timer.getTimeValues().toString()
          });
      }
    
      startTimer(){
            this.state.timer.start();
            this.setState({
            ...this.state,
            timer_state: 'ticking'
            });
      }


      stopTimer(){
        this.state.timer.stop();
        this.setState({
        ...this.state,
        
        timer_state: 'stopped'
        });
      }


      pauseTimer(){
        this.state.timer.pause();
        this.setState({
        ...this.state,
        timer_state: 'paused'
        });
      }

      resetTimer(){
            this.state.timer.reset();
            
            this.setState({
            ...this.state,
            timer_text:"00:00:00",
            timer_state: 'ticking'
            });
      }

  render(){
  return (
    <div className="Timer">
        <div className="timer-text">
        <h2>{this.state.timer_text}</h2>
        </div>
   <div className="timer-buttons text-center">
       {this.state.timer_state !=="ticking" &&(
       <button className="btn btn-success" onClick={this.startTimer}>
           <i className="fa fa-play"/></button>)}

{this.state.timer_state ==="ticking" &&(
       <button className="btn btn-warning" onClick={this.pauseTimer}>
           <i className="fa fa-pause"/></button>)}
     
    <button className="btn btn-danger" onClick={this.stopTimer}>
         <i className="fa fa-stop"/></button>

     <button className="btn btn-primary" onClick={this.resetTimer}>
         <i className="fa  fa-history"/></button>
   </div>
    </div>
  );
}
}

export default Timers;
