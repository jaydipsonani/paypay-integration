// const express = require("express");
// const PAYPAY = require("@paypayopa/paypayopa-sdk-node");
// const app = express();
// const cors = require("cors");

// const port = process.env.PORT || 5000;

// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET,POST"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

// app.use(express.json());

// PAYPAY.Configure({
//   clientId: "a_ZyXlznntc3_4oZk",
//   clientSecret: "/6UWRDjGEIHURyjk/52oy+1GzdRt719lqNWMOx1xJmU=",
//   merchantId: "823219629258997760",
//   productionMode: false,
// });

// app.post("/create-qrcode", (req, res) => {
//   const payload = {
//     merchantPaymentId: req.body.merchantPaymentId,
//     amount: {
//       amount: req.body.amount,
//       currency: req.body.currency,
//     },
//     codeType: "ORDER_QR",
//     orderDescription: req.body.orderDescription,
//     isAuthorization: false,
//     redirectUrl: req.body.redirectUrl,
//     redirectType: "WEB_LINK",
//     userAgent: req.body.userAgent,
//   };

//   PAYPAY.QRCodeCreate(payload, (response) => {
//     if (response && response.BODY.resultInfo.code === "SUCCESS") {
//       res.status(200).json({ qrCodeURL: response.BODY.data.url });
//     } else {
//       res.status(400).json({ error: "Failed to generate QR code" });
//     }
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running on port ${port}`);
// });



const express = require("express");
const PAYPAY = require("@paypayopa/paypayopa-sdk-node");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000", // Allow frontend to access backend
    methods: ["GET,POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());

// PayPay API Configuration
PAYPAY.Configure({
  clientId: "a_ZyXlznntc3_4oZk",
  clientSecret: "/6UWRDjGEIHURyjk/52oy+1GzdRt719lqNWMOx1xJmU=",
  merchantId: "823219629258997760",
  productionMode: false, // Set to true for production
});

app.post("/create-qrcode", (req, res) => {
  const payload = {
    merchantPaymentId: req.body.merchantPaymentId,
    amount: {
      amount: req.body.amount, // e.g., 100 JPY
      currency: req.body.currency,
    },
    codeType: "ORDER_QR", // QR code for order
    orderDescription: req.body.orderDescription,
    isAuthorization: false,
    redirectUrl: req.body.redirectUrl,
    redirectType: "WEB_LINK",
    userAgent: req.body.userAgent,
  };

  PAYPAY.QRCodeCreate(payload, (response) => {
    console.log("response",response)
    if (response && response.BODY.resultInfo.code === "SUCCESS") {
      console.log("response.BODY.resultInfo.code",response.BODY.resultInfo.code)
      res.status(200).json({ qrCodeURL: response.BODY.data.url });
      console.log("QR code URL:", response.BODY.data.url);  // Display QR code URL for the user to scan with PayPay app or website.  // You can use this URL to generate a QR code image using a QR code generator or a QR code scanning app.  // Example: https://api.qrserver.com/v1/create-qr-code/?data=<QR_CODE_URL>&size=250x250
    } else {
      res.status(400).json({ error: "Failed to generate QR code" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
