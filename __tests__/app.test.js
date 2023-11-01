//const express = require("express");
const request = require("supertest");

const app = require("../app");
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

describe("ExchangeAPI", () => {
  test("convert currency and return a valid response", async () => {
    const response = await request(app)
      .get("/convert")
      .query({ source: "USD", target: "JPY", amount: "$1,525" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      msg: "success",
      amount: expect.stringMatching(/^(¥|\$|\TWD)\d{1,3}(,\d{3})*\.\d{2}$/),
    });
  });

  test("return an error for invalid input", async () => {
    const response = await request(app)
      .get("/convert")
      .query({ source: "INVALID", target: "JPY", amount: "$1,525" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({ msg: "Invalid input" });
  });
});
