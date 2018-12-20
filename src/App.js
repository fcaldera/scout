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
    this.props.resetError();
  };

  renderButton() {
    const { loading, data, error } = this.props;
    if (loading || data || error) return null;
    return (
      <Button onClick={this.props.fetchExchanges} data-test-id="button">
        Load data
      </Button>
    );
  }

  renderError() {
    const { error } = this.props;
    if (!error) return null;

    return (
      <Modal data-test-id="modal-error">
        <p data-test-id="modal-error-msg">{error}</p>
        <Button onClick={this.handleCloseModal} data-test-id="close-button">
          Close
        </Button>
      </Modal>
    );
  }

  renderData() {
    const { data } = this.props;
    if (!data) return null;
    const rates = Object.keys(data.rates);

    return (
      <table data-test-id="data">
        <tbody>
          {rates.map(key => (
            <tr key={key} data-test-id="data-record">
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
    return <Spinner data-test-id="spinner" />;
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
