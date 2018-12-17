import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchanges } from './actions';
import Button from './Button';
import './App.css';

const mapStateToProps = ({ exchangeRates }) => {
  return {
    loading: exchangeRates.loading,
    data: exchangeRates.data,
    errror: exchangeRates.error,
  };
};

class App extends Component {
  renderButton() {
    const { loading, data, error } = this.props;
    if (loading || data || error) return null;
    return <Button onClick={this.props.fetchExchanges}>Load data</Button>;
  }

  renderError() {
    const { error } = this.props;
    if (!error) return;
    return <div>{error}</div>;
  }

  renderData() {
    const { data } = this.props;
    if (!data) return null;
    const rates = Object.keys(data.rates);
    console.log(rates);
    return (
      <table>
        {rates.map(key => (
          <tr key={key}>
            <td className="text-left">{key}</td>
            <td className="text-right">{data.rates[key]}</td>
          </tr>
        ))}
      </table>
    );
  }

  render() {
    return (
      <div className="App">
        {this.renderButton()}
        {this.renderError()}
        {this.renderData()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchExchanges }
)(App);
