import React, { Component } from 'react'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fl: null,
      hu: null,
      tp: null,
      ws: null
    }
  }

  componentDidMount() {
    let { fl, hu, tp, ws } = this.state;
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Atyrau,kz&APPID=bd32786b7240ee712e3181243e5039ab")
      .then(res => res.json())
      .then(res => {
        fl = res.main.feels_like;
        hu = res.main.humidity;
        tp = res.main.temp;
        ws = res.wind.speed;
        
        this.setState({
          fl: parseInt(fl - 273.15),
          hu: parseInt(hu),
          tp: parseInt(tp - 273.15),
          ws: parseInt(ws * 3.6),
        })
      })

  }
  render() {
    let { fl, hu, tp, ws } = this.state;
    return (
      <div>
      </div>
    )
  }
}
