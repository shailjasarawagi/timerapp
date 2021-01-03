import React, { Component } from "react";
import "./CountDown.css";

import {Timer} from "easytimer.js";

//Extra components
import CountDownInput from "./CountDownInput";

class CountDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      countdown_text: "00:00:00",
      edit_duration: true,
      timer: null,
      duration: 30
    };

    //bind functions
    this.resetCountDown = this.resetCountDown.bind(this);
    this.updateDuration = this.updateDuration.bind(this);
    this.editDuration = this.editDuration.bind(this);
    this.bindListeners = this.bindListeners.bind(this);
  }

  bindListeners(timer) {
    //Add the listeners
    timer.addEventListener("started", this.onTimerStarted.bind(this));
    timer.addEventListener("reset", this.onTimerStarted.bind(this));
    timer.addEventListener("secondsUpdated", this.onTimerUpdated.bind(this));
    timer.addEventListener("targetAchieved", this.onTimerEnd.bind(this));
  }

  onTimerStarted(e) {
    console.log("started...");

    if (this.state.timer) {
      console.log(this.state.timer.getTimeValues().toString());

      this.setState({
        ...this.state,
        countdown_text: this.state.timer.getTimeValues().toString()
      });
    }

    console.log("started");
  }

  onTimerUpdated(e) {
    this.setState({
      ...this.state,
      countdown_text: this.state.timer.getTimeValues().toString()
    });
  }

  onTimerEnd(e) {
    var countdown_message = "Countdown complete!";

    this.setState({
      ...this.state,
      countdown_text: countdown_message
    });
  }

  componentDidMount() {
    var timer = new Timer();

    this.bindListeners(timer);

    if (this.state.edit_duration === false) {
      timer.start({
        countdown: true,
        startValues: { minutes: this.state.duration }
      });

      this.setState({
        ...this.state,
        timer: timer
      });
    }
  }

  componentWillUnmount() {
    if (this.state.timer !== null) {
      this.state.timer.stop();
    }
  }

  editDuration() {
    this.setState({
      ...this.state,
      edit_duration: true,
      countdown_text: "00:00:00"
    });
  }

  updateDuration(duration) {
    console.log(duration);

    var timer = new Timer();

    this.bindListeners(timer);

    timer.start({
      countdown: true,
      startValues: { minutes: duration }
    });

    this.setState({
      ...this.state,
      duration: duration,
      timer: timer,
      edit_duration: false,
      countdown_text: timer.getTimeValues().toString()
    });
  }

  resetCountDown() {
    this.state.timer.reset();
  }

  render() {
    return (
      <div className="Countdown">
        {this.state.edit_duration === false && (
          <div>
            <div className="countdown-buttons row">
              <div className="col text-left">
                <button
                  onClick={this.resetCountDown}
                  className="btn btn-primary"
                >
                  <i className="fa fa-history" />
                </button>
              </div>
              <div className="edit-countdown col text-right">
                <button
                  onClick={this.editDuration}
                  className="btn btn-secondary"
                >
                  <i className="fa fa-pencil" />
                </button>
              </div>
            </div>

            <div className="countdown-text">
              <h2>{this.state.countdown_text}</h2>
            </div>
          </div>
        )}
        {this.state.edit_duration === true && (
          <div>
            <CountDownInput
              duration={this.state.duration}
              updateDuration={this.updateDuration}
            />
          </div>
        )}
      </div>
    );
  }
}

export default CountDown;