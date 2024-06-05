import {Component} from 'react'
import './index.css'

class RandomNumberGenerator extends Component {
  state = {
    randomNumber: 0,
  }
  genrateNumber = () => {
    const randNum = Math.ceil(Math.random() * 100)
    this.setState({randomNumber: randNum})
  }
  render() {
    const {randomNumber} = this.state
    return (
      <div className="main-cont">
        <div className="sub-cont">
          <h1 className="head">Random Number</h1>
          <p className="desc">
            Generate a random number in the range of 0 to 100
          </p>
          <button type="button" className="but" onClick={this.genrateNumber}>
            Generate
          </button>
          <p className="random-number">{randomNumber}</p>
        </div>
      </div>
    )
  }
}

export default RandomNumberGenerator
