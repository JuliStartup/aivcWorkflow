import React, { Component } from 'react';
import * as api from '../../api/index.js';
export default class SquarePayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      fees: 0
    };
  }
  componentWillMount() {
    const that = this;
    const appId = 'sandbox-sq0idb-iggxCHRgliZn1YNBztfd9w';
    const locationId = 'L1EDEPWSGX3QW';

    async function initializeCard(payments) {
      const card = await payments.card();
      await card.attach('#card-container');
      return card;
    }
    // Call this function to send a payment token, buyer name, and other details
    // to the project server code so that a payment can be created with
    // Payments API
    async function createPayment(token) {
      let user = JSON.parse(localStorage.getItem('profile'));
      const body = {
        locationId,
        amount: localStorage.getItem('fees'),
        sourceId: token
      };
      const postData = {
        paid: false,
        email: user.result,
        category: localStorage.getItem('fileCategory')
      };
      const paymentResponse = await api.createPayment(body);
      console.log(paymentResponse);
      let userData = await api.getPost(user.result);
      if (userData && !userData.data.length) {
        postData.paid = true;
        let newPost = await api.createPost({ ...postData });
        if (newPost) localStorage.setItem('payment', true);
      }
      if (paymentResponse.ok) {
        localStorage.setItem('payment', true);
        return paymentResponse.json();
      }
      const errorBody = await paymentResponse.text();
      throw new Error(errorBody);
    }

    // This function tokenizes a payment method.
    // The ‘error’ thrown from this async function denotes a failed tokenization,
    // which is due to buyer error (such as an expired card). It is up to the
    // developer to handle the error and provide the buyer the chance to fix
    // their mistakes.
    async function tokenize(paymentMethod) {
      const tokenResult = await paymentMethod.tokenize();
      if (tokenResult.status === 'OK') {
        return tokenResult.token;
      } else {
        let errorMessage = `Tokenization failed-status: ${tokenResult.status}`;
        if (tokenResult.errors) {
          errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
        }
        throw new Error(errorMessage);
      }
    }

    // Helper method for displaying the Payment Status on the screen.
    // status is either SUCCESS or FAILURE;
    function displayPaymentResults(status) {
      const statusContainer = document.getElementById('payment-status-container');
      if (status === 'SUCCESS') {
        statusContainer.classList.remove('is-failure');
        statusContainer.classList.add('is-success');
      } else {
        statusContainer.classList.remove('is-success');
        statusContainer.classList.add('is-failure');
      }

      statusContainer.style.visibility = 'visible';
    }

    let sqPaymentScript = document.createElement('script');
    sqPaymentScript.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    sqPaymentScript.type = 'text/javascript';
    sqPaymentScript.async = false;
    sqPaymentScript.onload = async () => {
      that.setState({
        loaded: true
      });
      if (!window.Square) {
        throw new Error('Square.js failed to load properly');
      }
      const payments = window.Square.payments(appId, locationId);
      let card;
      try {
        card = await initializeCard(payments);
      } catch (e) {
        console.error('Initializing Card failed', e);
        return;
      }

      async function handlePaymentMethodSubmission(event, paymentMethod) {
        event.preventDefault();

        try {
          // disable the submit button as we await tokenization and make a
          // payment request.
          cardButton.disabled = true;
          const token = await tokenize(paymentMethod);
          const paymentResults = await createPayment(token);
          displayPaymentResults('SUCCESS');

          console.debug('Payment Success', paymentResults);
        } catch (e) {
          cardButton.disabled = false;
          displayPaymentResults('FAILURE');
          console.error(e.message);
        }
      }

      const cardButton = document.getElementById('card-button');
      cardButton.addEventListener('click', async function (event) {
        await handlePaymentMethodSubmission(event, card);
      });
    };
    document.getElementsByTagName('head')[0].appendChild(sqPaymentScript);
  }
  render() {
    var fees = 0;
    const category = localStorage.getItem('fileCategory');
    switch (category) {
      // console.log(category);
      case 'NewVisit':
      case 'NewStudy':
        fees = 235;
        break;
      case 'ExtendVisit':
      case 'ExtendStudy':
      case 'ExtendWork':
        fees = 99;
        break;
      case 'Spousal':
      case 'CEC':
      case 'PNP':
        fees = 499;
        break;
      case 'FSW':
        fees = 599;
        break;
      case 'PGWP':
        fees = 149;
        break;
      case 'CECPNP':
        fees = 1099;
        break;
      default:
        fees = 0;
        break;
    }
    localStorage.setItem('fees', fees);
    return (
      this.state.loaded && (
        <>
          <form id="payment-form">
            <div id="card-container"></div>
            <button id="card-button" type="button">
              Pay ${fees}
            </button>
          </form>
          <div id="payment-status-container"></div>
        </>
      )
    );
  }
}
