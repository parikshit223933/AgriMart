import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { connect } from 'react-redux';
import
{
    CardElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";
import '../../checkOutForm.css';

const CheckOutForm = (props) =>
{
    /* we will render this component on buy now on a product page or cart checkout 
    in props we have to send items it could be all cart item or a specific item 
    for cart pass user.cart as props while for specific item pass item and quantity = 1*/
    const location = useLocation();
    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState('');
    const [amount, setAmount] = useState(0);

    const stripe = useStripe();
    const elements = useElements();
    const userEmail = props.auth.user.email;
    useEffect(() =>
    {
        if (userEmail)
            // Create PaymentIntent as soon as the page loads
            window
                .fetch("http://localhost:8000/api/v1/checkout/createPayment", {
                    method: "POST",
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify({ state: location.state, userEmail }) //where, items: [{price: 100, quantity: 7}]
                })
                .then(res =>
                {
                    return res.json();
                })
                .then(data =>
                {
                    setClientSecret(data.clientSecret);
                    setAmount(data.amount);
                });
    }, [location.state, userEmail]);

    const cardStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: 'Arial, sans-serif',
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d"
                }
            },

            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a"
            }
        }
    };

    const handleChange = async (event) =>
    {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async ev =>
    {
        ev.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: ev.target.name.value
                }
            }
        });

        if (payload.error)
        {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
        } else
        {
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    };

    return (
        <div className="container">
            <h1 className="center">Enter Card details for INR {amount}</h1>
            <form id="payment-form" onSubmit={handleSubmit}>
                <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
                <button
                    disabled={processing || disabled || succeeded}
                    id="submit"
                >
                    <span id="button-text">
                        {processing ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                                "Pay"
                            )}
                    </span>
                </button>

                {/* Show any error that happens when processing the payment */}
                {error && (
                    <div className="card-error" role="alert">
                        {error}
                    </div>
                )}

                {/* Show a success message upon completion */}
                <p className={succeeded ? "result-message" : "result-message hidden"}>
                    Payment succeeded, see the result in your
                    <a
                        href={`https://dashboard.stripe.com/test/payments`}
                    >
                        {" "}
                        Stripe dashboard.
                    </a>
                    Refresh the page to pay again.
                </p>
            </form>
        </div>

    );
}
function mapStateToProps({ auth })
{
    return { auth };
}
export default connect(mapStateToProps)(CheckOutForm);