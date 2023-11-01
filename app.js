const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000;

const exchangeRates = {
  currencies: {
    TWD: {
      TWD: 1,
      JPY: 3.669,
      USD: 0.03281,
    },
    JPY: {
      TWD: 0.26956,
      JPY: 1,
      USD: 0.00885,
    },
    USD: {
      TWD: 30.444,
      JPY: 111.801,
      USD: 1,
    },
  },
};

app.use(bodyParser.json());

app.get("/convert", (req, res) => {
  const source = req.query.source;
  const target = req.query.target;
  const amount = parseFloat(req.query.amount.replace("$", "").replace(",", ""));

  if (
    isNaN(amount) ||
    !exchangeRates.currencies[source] ||
    !exchangeRates.currencies[source][target]
  ) {
    res.status(400).json({ msg: "Invalid input" });
    return;
  }

  const convertedAmount = (
    amount * exchangeRates.currencies[source][target]
  ).toFixed(2);
  const formattedAmount = Number(convertedAmount).toLocaleString(undefined, {
    style: "currency",
    currency: target,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  res.json({ msg: "success", amount: formattedAmount });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
