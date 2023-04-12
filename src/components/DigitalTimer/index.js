import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timerLimitInMinutes: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onClickStatusButton = () => {
    const {
      isTimerRunning,
      timeElapsedInSeconds,
      timerLimitInMinutes,
    } = this.state

    const isTimerComplete = timeElapsedInSeconds === timerLimitInMinutes * 60
    if (isTimerComplete) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const isTimerComplete = timeElapsedInSeconds === timerLimitInMinutes * 60

    if (isTimerComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  onClickResetButton = () => {
    this.clearTimerInterval()
    this.setState({
      timeElapsedInSeconds: 0,
      timerLimitInMinutes: 25,
      isTimerRunning: false,
    })
  }

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timerLimitInMinutes} = this.state
    const isButtonDisabled = isTimerRunning

    const imgUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="bg-container">
        <h1 className="M-heading">Digital Timer</h1>
        <div className="digital-timer-container">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="timer-paragraph">
                {isTimerRunning ? 'Running' : 'Paused'}
              </p>
            </div>
          </div>
          <div className="buttons-container">
            <div className="timer-controller-container">
              <button
                type="button"
                className="button"
                onClick={this.onClickStatusButton}
              >
                <img alt={startOrPauseAltText} src={imgUrl} className="icon" />
                <p className="label">{isTimerRunning ? 'Pause' : 'Start'}</p>
              </button>
              <button
                type="button"
                className="button"
                onClick={this.onClickResetButton}
              >
                <img
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  className="icon"
                />
                <p className="label">Reset</p>
              </button>
            </div>
            <div className="timer-limit-controller-container">
              <p className="limit-label">Set Timer limit</p>
              <div className="timer-limit-controller">
                <button
                  className="limit-controller-button"
                  disabled={isButtonDisabled}
                  onClick={this.onDecreaseTimerLimitInMinutes}
                  type="button"
                >
                  -
                </button>
                <div className="limit-label-and-value-container">
                  <p className="limit-value">{timerLimitInMinutes}</p>
                </div>
                <button
                  className="limit-controller-button"
                  disabled={isButtonDisabled}
                  onClick={this.onIncreaseTimerLimitInMinutes}
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
