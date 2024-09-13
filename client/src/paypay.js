// import React, { useState } from 'react';
// import axios from 'axios';

// const QRPayPayComponent = () => {
//   const [qrCodeUrl, setQrCodeUrl] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleGenerateQRCode = async () => {
//     setLoading(true);
//     setError(null);

//     const payload = {
//       merchantPaymentId: 'my_payment_id_' + Date.now(),
//       amount: 100, // Example amount in JPY
//       currency: 'JPY',
//       orderDescription: 'Purchase for demo',
//       redirectUrl: 'http://localhost:3000/success',
//       userAgent: navigator.userAgent,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/create-qrcode', payload);
//       const qrCodeURL = response.data.qrCodeURL;

//       setQrCodeUrl(qrCodeURL);

//       window.location.href = qrCodeURL;
//       console.log('QR code URL:', qrCodeURL);
//     } catch (err) {
//       setError('Failed to generate QR code. Please try again.');
//       console.log('Error:', err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div>
//       <h1>PayPay QR Code Payment</h1>
//       <button onClick={handleGenerateQRCode} disabled={loading}>
//         {loading ? 'Generating QR Code...' : 'Generate QR Code'}
//       </button>

//       {error && <p style={{ color: 'red' }}>{error}</p>}

//     </div>
//   );
// };

// export default QRPayPayComponent;



import React, { useState } from "react";
import axios from "axios";

const QRPayPayComponent = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [popup, setPopup] = useState(null);

  const handleGenerateQRCode = async () => {
    setLoading(true);
    setError(null);

    const payload = {
      merchantPaymentId: "my_payment_id_" + Date.now(),
      amount: 50,
      currency: "JPY",
      orderDescription: "Purchase for demo",
      redirectUrl: "http://localhost:3000/success",
      userAgent: navigator.userAgent,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/create-qrcode",
        payload
      );
      const qrCodeURL = response.data.qrCodeURL;
      console.log("response",response)
      const popupWidth = 600;
      const popupHeight = 700;
      const left = window.innerWidth / 2 - popupWidth / 2;
      const top = window.innerHeight / 2 - popupHeight / 2;
      const newPopup = window.open(
        qrCodeURL,
        "PayPay",
        `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`
      );

      setPopup(newPopup);

      window.location.href = qrCodeURL;
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
        {loading ? "Generating QR Code..." : "Generate QR Code"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default QRPayPayComponent;


