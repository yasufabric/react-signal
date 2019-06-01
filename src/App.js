import React, { Component } from "react";
import "./App.css";

class SignalBox extends Component {
  render() {
    return (
      <div
        style={{
          width: "40px",
          borderRadius: "10px",
          background: "pink",
          padding: "20px",
          border: "solid 2px"
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

class Light extends Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          background: this.props.on ? `${this.props.color}` : "gray",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          margin: "0px, 10px, 0px, 0px"
        }}
      >
        {this.props.color}
      </div>
    );
  }
}

class Signal extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: 0, currentColor: this.props.firstLight };
  }

  tick() {
    this.nextLight();
  }

  start() {
    this.timer = setInterval(this.tick, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }

  nextLight = () => {
    const currentColor = this.state.currentColor;
    if (currentColor === "blue") {
      if (this.state.seconds === 0) {
        this.setState({ currentColor: "yellow", seconds: 1 });
      }
    } else if (currentColor === "yellow") {
      if (this.state.seconds === 0) {
        this.setState({ currentColor: "red", seconds: 2 });
      }
    } else {
      if (this.state.seconds === 0) {
        this.setState({ currentColor: "blue", seconds: 2 });
      }
    }
    this.setState({ seconds: this.state.seconds - 1 });
    console.log(currentColor, this.state.seconds);
  };

  render() {
    return (
      <div>
        <SignalBox>
          <Light color="blue" on={this.state.currentColor === "blue"} />
          <Light color="yellow" on={this.state.currentColor === "yellow"} />
          <Light color="red" on={this.state.currentColor === "red"} />
        </SignalBox>
        <button onClick={() => this.start()}>start </button>
        <button onClick={() => this.stop()}>stop</button>
      </div>
    );
  }
}

class Intersection extends Component {
  constructor(props) {
    super(props);
    this.Top = React.createRef();
    this.Right = React.createRef();
    this.Left = React.createRef();
    this.Bottom = React.createRef();
  }

  start() {
    this.Top.current.start();
    this.Right.current.start();
    this.Left.current.start();
    this.Bottom.current.start();
  }

  stop() {
    this.Top.current.stop();
    this.Right.current.stop();
    this.Left.current.stop();
    this.Bottom.current.stop();
  }

  render() {
    return (
      <div>
        <div>
          TOP
          <Signal firstLight="blue" ref={this.Top} />
        </div>
        <div>
          Bottom
          <Signal firstLight="blue" ref={this.Bottom} />
        </div>
        <div>
          Right
          <Signal firstLight="red" ref={this.Right} />
        </div>
        <div>
          Left
          <Signal firstLight="red" ref={this.Left} />
        </div>
        <div>
          <button onClick={() => this.start()}>start all</button>
          <button onClick={() => this.stop()}>stop all</button>
        </div>
      </div>
    );
  }
}

export default Intersection;
