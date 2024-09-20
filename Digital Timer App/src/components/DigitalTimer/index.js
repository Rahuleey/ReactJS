// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  timerRunning: false,
  timeElapsed: 0,
  timerLimit: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimit = () => {
    const {timerLimit} = this.state

    if (timerLimit > 1) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onIncreaseTimerLimit = () =>
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))

  renderTimerLimitController = () => {
    const {timerLimit, timeElapsed} = this.state
    const isButtonsDisabled = timeElapsed > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimerLimit}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerLimit}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimit}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  incrementTimeElapsed = () => {
    const {timerLimit, timeElapsed} = this.state
    const isTimerCompleted = timeElapsed === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsed: prevState.timeElapsed + 1,
      }))
    }
  }

  onStartOrPauseTimer = () => {
    const {timerRunning, timeElapsed, timerLimit} = this.state
    const timerCompleted = timeElapsed === timerLimit * 60

    if (timerCompleted) {
      this.setState({timeElapsed: 0})
    }
    if (timerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsed, 1000)
    }
    this.setState(prevState => ({timerRunning: !prevState.timerRunning}))
  }

  renderTimerController = () => {
    const {timerRunning} = this.state
    const startOrPauseImageUrl = timerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = timerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {timerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedTime = () => {
    const {timerLimit, timeElapsed} = this.state
    const remainingSeconds = timerLimit * 60 - timeElapsed
    const minutes = Math.floor(remainingSeconds / 60)
    const seconds = Math.floor(remainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {timerRunning} = this.state
    const labelText = timerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-cont">
        <h1 className="head">Digital Timer</h1>
        <div className="timer-cont">
          <div className="timer-display-cont">
            <div className="elapsed-time-cont">
              <h1 className="elapsed-time">{this.getElapsedTime()}</h1>
              <p className="timer-status">{labelText}</p>
            </div>
          </div>
          <div className="controls-cont">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
