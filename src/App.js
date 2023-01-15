import React, { Component } from 'react'
import Inside from './images/InsideFrame.png'
import Outside from './images/OutsideFrame.svg'
import styles from './page.module.css'
import Timer from './images/Timer.svg'
import Humadity from './images/Humadity.svg'
import Temp from './images/Temp.svg'
import Wind from './images/Wind.svg'


export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fl: null,
      hu: null,
      tp: null,
      ws: null,
      clockText: null,
    }
  }

  async componentDidMount() {
    await fetch("https://api.openweathermap.org/data/2.5/weather?q=Atyrau,kz&APPID=bd32786b7240ee712e3181243e5039ab")
      .then(res => res.json())
      .then(data => {


        this.setState({
          fl: parseInt(data.main.feels_like - 273.15),
          hu: parseInt(data.main.humidity),
          tp: parseInt(data.main.temp - 273.15),
          ws: parseInt(data.wind.speed * 3.6),
        })
      })

    let date = new Date();
    let day = date.getDay();
    let hour = date.getHours();
    let minute = date.getMinutes();

    if (day === 0 || day === 6) {
      this.setState({
       clockText: "End"
      })
    } else{
      if (hour === 9 && minute <= 49) {
        this.setState ({
          clockText: "10:10"
        })
      }
      else if (hour === 12 && minute <= 30) {
        this.setState({
          clockText: "1:17"
        })
      }
      else if (hour === 11 && minute <= 46) {
        this.setState({
          clockText: "12:30"
        })
      }
      else {
        this.setState({
          clockText: "Bye"
        })
      }
    }

  }
  render() {
    let { fl, hu, tp, ws, clockText } = this.state;
    let isInside = (fl < -16) ? true : false;


    return (
      <div className={isInside ? styles.insideDiv : styles.outsideDiv}>
        <img alt="Frame" className={isInside ? styles.insideImg : styles.outsideImg} src={isInside ? Inside : Outside}></img>

        <h1 className={styles.tempH1}>{fl}°C</h1>
        <div className={styles.clockDiv}>
          <img alt="Timer" className={styles.timer} src={Timer} />
          <span className={styles.time}>{clockText}</span>
        </div>
        <div className={styles.weatherDiv}>
          <div><span>{hu}</span> <img alt='Humadity' src={Humadity} /></div>
          <div><span>{tp}</span> <img alt='Temp' src={Temp} /></div>
          <div><span>{ws}km/h</span> <img alt='Wind' src={Wind} /></div>
        </div>
      </div>
    )

  }
}
