const { getPrecisionForIdentifier } = require("@uma/common");

// Default price feed configs for currently approved identifiers.
const defaultConfigs = {
  "ETH/BTC": {
    type: "medianizer",
    pair: "ethbtc",
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro" },
      { type: "cryptowatch", exchange: "binance" },
      { type: "cryptowatch", exchange: "bitstamp" }
    ]
  },
  "COMP/USD": {
    // Kovan uses the "/"
    type: "medianizer",
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro", pair: "compusd" },
      { type: "cryptowatch", exchange: "poloniex", pair: "compusdt" },
      { type: "cryptowatch", exchange: "ftx", pair: "compusd" }
    ]
  },
  COMPUSD: {
    // Mainnet has no "/"
    type: "medianizer",
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro", pair: "compusd" },
      { type: "cryptowatch", exchange: "poloniex", pair: "compusdt" },
      { type: "cryptowatch", exchange: "ftx", pair: "compusd" }
    ]
  },
  USDETH: {
    type: "medianizer",
    invertPrice: true,
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro", pair: "ethusd" },
      { type: "cryptowatch", exchange: "binance", pair: "ethusdt" },
      { type: "cryptowatch", exchange: "kraken", pair: "ethusd" }
    ]
  },
  USDBTC: {
    type: "medianizer",
    invertPrice: true,
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro", pair: "btcusd" },
      { type: "cryptowatch", exchange: "binance", pair: "btcusdt" },
      { type: "cryptowatch", exchange: "bitstamp", pair: "btcusd" }
    ]
  },
  USDPERL: {
    type: "medianizer",
    invertPrice: true,
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [{ type: "cryptowatch", exchange: "binance", pair: "perlusdt" }]
  },
  BCHNBTC: {
    type: "medianizer",
    minTimeBetweenUpdates: 60,
    medianizedFeeds: [
      { type: "cryptowatch", exchange: "coinbase-pro", pair: "BCHBTC" },
      { type: "cryptowatch", exchange: "binance", pair: "BCHBTC" },
      { type: "cryptowatch", exchange: "huobi", pair: "BCHBTC" }
    ]
  },
  STABLESPREAD: {
    // This is alternatively known as "STABLESPREAD/ETH"
    type: "basketspread",
    lookback: 7200,
    minTimeBetweenUpdates: 60,
    experimentalPriceFeeds: [
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "ustusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "ustusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "binance", pair: "busdusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "busdusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "cusdusdt" }
          // NOTE: The OKCoin exchange is not available on Cryptowatch for this pair,
          // presumably because it has such low volume.
          // { type: "cryptowatch", exchange: "okcoin" }
        ]
      }
    ],
    baselinePriceFeeds: [
      {
        type: "medianizer",
        medianizedFeeds: [
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "bitfinex", pair: "usdtusd" },
              { type: "cryptowatch", exchange: "kraken", pair: "usdtusd" }
            ]
          },
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "kraken", pair: "usdcusd" },
              { type: "cryptowatch", exchange: "bitstamp", pair: "usdcusd" }
            ]
          }
        ]
      }
    ],
    denominatorPriceFeed: {
      type: "medianizer",
      medianizedFeeds: [
        { type: "cryptowatch", exchange: "coinbase-pro", pair: "ethusd" },
        { type: "cryptowatch", exchange: "binance", pair: "ethusdt" }
      ]
    }
  },
  "STABLESPREAD/USDC": {
    type: "basketspread",
    lookback: 7200,
    minTimeBetweenUpdates: 60,
    experimentalPriceFeeds: [
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "ustusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "ustusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "binance", pair: "busdusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "busdusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "cusdusdt" }
          // NOTE: The OKCoin exchange is not available on Cryptowatch for this pair,
          // presumably because it has such low volume.
          // { type: "cryptowatch", exchange: "okcoin" }
        ]
      }
    ],
    baselinePriceFeeds: [
      {
        type: "medianizer",
        medianizedFeeds: [
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "bitfinex", pair: "usdtusd" },
              { type: "cryptowatch", exchange: "kraken", pair: "usdtusd" }
            ]
          },
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "kraken", pair: "usdcusd" },
              { type: "cryptowatch", exchange: "bitstamp", pair: "usdcusd" }
            ]
          }
        ]
      }
    ]
  },
  "STABLESPREAD/BTC": {
    type: "basketspread",
    lookback: 7200,
    minTimeBetweenUpdates: 60,
    experimentalPriceFeeds: [
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "ustusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "ustusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "binance", pair: "busdusdt" },
          { type: "cryptowatch", exchange: "uniswap-v2", pair: "busdusdt" }
        ]
      },
      {
        type: "medianizer",
        computeMean: true,
        medianizedFeeds: [
          { type: "cryptowatch", exchange: "bittrex", pair: "cusdusdt" }
          // NOTE: The OKCoin exchange is not available on Cryptowatch for this pair,
          // presumably because it has such low volume.
          // { type: "cryptowatch", exchange: "okcoin" }
        ]
      }
    ],
    baselinePriceFeeds: [
      {
        type: "medianizer",
        medianizedFeeds: [
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "bitfinex", pair: "usdtusd" },
              { type: "cryptowatch", exchange: "kraken", pair: "usdtusd" }
            ]
          },
          {
            type: "medianizer",
            computeMean: true,
            medianizedFeeds: [
              { type: "cryptowatch", exchange: "kraken", pair: "usdcusd" },
              { type: "cryptowatch", exchange: "bitstamp", pair: "usdcusd" }
            ]
          }
        ]
      }
    ],
    denominatorPriceFeed: {
      type: "medianizer",
      medianizedFeeds: [
        { type: "cryptowatch", exchange: "kraken", pair: "btcusd" },
        { type: "cryptowatch", exchange: "bitstamp", pair: "btcusd" }
      ]
    }
  },
  "GASETH-TWAP-1Mx1M": {
    type: "uniswap",
    uniswapAddress: "0x25fb29D865C1356F9e95D621F21366d3a5DB6BB0",
    twapLength: 7200
  },
  "GASETH-FEB21": {
    type: "uniswap",
    uniswapAddress: "0x4a8a2ea3718964ed0551a3191c30e49ea38a5ade",
    twapLength: 7200
  },
  "GASETH-MAR21": {
    type: "uniswap",
    uniswapAddress: "0x683ea972ffa19b7bad6d6be0440e0a8465dba71c",
    twapLength: 7200
  },
  BTCDOM: {
    type: "domfi",
    pair: "BTCDOM",
    minTimeBetweenUpdates: 60,
    lookback: 7200
  },
  ALTDOM: {
    type: "domfi",
    pair: "ALTDOM",
    minTimeBetweenUpdates: 60,
    lookback: 7200
  }
};

// Pull in the number of decimals for each identifier from the common getPrecisionForIdentifier. This is used within the
// Voterdapp and ensures that price feeds are consistently scaled through the UMA ecosystem.
Object.keys(defaultConfigs).forEach(identifierName => {
  defaultConfigs[identifierName].priceFeedDecimals = getPrecisionForIdentifier(identifierName);
});

module.exports = { defaultConfigs };
