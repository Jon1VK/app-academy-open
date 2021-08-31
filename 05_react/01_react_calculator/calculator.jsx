import React from 'react';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.setNum = this.setNum.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.state = {
      result: 0,
      num1: '',
      num2: '',
    };
  }

  setNum(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleOperation(e) {
    let num1 = +this.state.num1;
    let num2 = +this.state.num2;
    let result;

    switch (e.target.dataset.operation) {
      case 'addition':
        result = num1 + num2;
        break;
      case 'subtraction':
        result = num1 - num2;
        break;
      case 'multiplication':
        result = num1 * num2;
        break;
      case 'division':
        result = num1 / num2;
        break;
      case 'clear':
        result = 0;
        this.setState({
          num1: '',
          num2: '',
        });
    }

    this.setState({
      result,
    });
  }

  render() {
    const { result, num1, num2 } = this.state;

    return (
      <div>
        <h1>{result}</h1>
        <input type="text" name="num1" value={num1} onChange={this.setNum} />
        <input type="text" name="num2" value={num2} onChange={this.setNum} />
        <div onClick={this.handleOperation}>
          <button data-operation="addition">+</button>
          <button data-operation="subtraction">-</button>
          <button data-operation="multiplication">*</button>
          <button data-operation="division">/</button>
          <button data-operation="clear">C</button>
        </div>
      </div>
    );
  }
}

export default Calculator;
