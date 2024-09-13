import React, { useState } from 'react';
import axios from 'axios';

const QRPayPayComponent = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateQRCode = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      merchantPaymentId: 'my_payment_id_' + Date.now(),
      amount: 100, // Example amount in JPY
      currency: 'JPY',
      orderDescription: 'Purchase for demo',
      redirectUrl: 'https://paypay-integration.vercel.app/success',
      userAgent: navigator.userAgent, 
    };

    try {
      const response = await axios.post('https://paypay-integration-backend.vercel.app/create-qrcode', payload);
      const qrCodeURL = response.data.qrCodeURL;

      setQrCodeUrl(qrCodeURL);

      window.open(qrCodeURL, '_blank');
      console.log('QR code URL:', qrCodeURL);
    } catch (err) {
      setError('Failed to generate QR code. Please try again.');
      console.log('Error:', err);
    }

    setLoading(false);
  };

  return (
    <div>
      <h1>PayPay QR Code Payment</h1>
      <button onClick={handleGenerateQRCode} disabled={loading}>
        {loading ? 'Generating QR Code...' : 'Generate QR Code'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}


    </div>
  );
};

export default QRPayPayComponent;
