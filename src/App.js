import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExchanges, resetError } from './actions';
import Button from './Button';
import Spinner from './Spinner';
import Modal from './Modal';
import './App.css';

const mapStateToProps = ({ exchangeRates }) => {
  return {
    loading: exchangeRates.loading,
    data: exchangeRates.data,
    error: exchangeRates.error,
  };
};

export class App extends Component {
  handleCloseModal = () => {
    const { resetError } = this.props;
    if (resetError) resetError();
  };

  renderButton() {
    const { loading, data, error } = this.props;
    if (loading || data || error) return null;
    return <Button onClick={this.props.fetchExchanges}>Load data</Button>;
  }

  renderError() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <Modal>
        <p>{error}</p>
        <Button onClick={this.handleCloseModal}>Close</Button>
      </Modal>
    );
  }

  renderData() {
    const { data } = this.props;
    if (!data) return null;
    const rates = Object.keys(data.rates);

    return (
      <table>
        <tbody>
          {rates.map(key => (
            <tr key={key}>
              <td className="text-left">{key}</td>
              <td className="text-right">{data.rates[key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  renderSpinner() {
    const { loading } = this.props;
    if (!loading) return null;
    return <Spinner />;
  }

  render() {
    return (
      <div className="App">
        {this.renderButton()}
        {this.renderError()}
        {this.renderData()}
        {this.renderSpinner()}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { fetchExchanges, resetError }
)(App);
