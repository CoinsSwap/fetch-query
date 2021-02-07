# fetch-query

## install
```sh
npm i --save @coinsswap/fetch-query
```

## usage
```js
import query from 'fetch-query'
const url = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

fetch(url, {
  entity: 'swaps',
  selection: {
    first: 10,
    where: {
      pair: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11'
    },
    orderBy: 'timestamp',
    orderDirection: 'desc'
  },
  query: `
    timestamp
    pair {
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      token0Price
      token1Price
    `
}).then(response => response.json()).then(response => console.log(response))
```
