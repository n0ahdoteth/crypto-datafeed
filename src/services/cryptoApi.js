import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const cryptoApiHeaders = {
    'X-RapidAPI-Key': 'e9f12a612cmsh4f8f8fb2baad8ccp148521jsnd3b05b44f3a0',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

const baseUrl = 'https://coinranking1.p.rapidapi.com'

const createRequest = (url) => ({url, headers: cryptoApiHeaders});

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`),
        }),
    })
});

export const {
    useGetCryptosQuery, useGetCryptoDetailsQuery
} = cryptoApi;

// const options = {
//     method: 'GET',
//     url: 'https://coinranking1.p.rapidapi.com/coins',
//     params: {
//       referenceCurrencyUuid: 'yhjMzLPhuIDl',
//       timePeriod: '24h',
//       'tiers[0]': '1',
//       orderBy: 'marketCap',
//       orderDirection: 'desc',
//       limit: '50',
//       offset: '0'
//     },
//     headers: {
//       'X-RapidAPI-Key': 'e9f12a612cmsh4f8f8fb2baad8ccp148521jsnd3b05b44f3a0',
//       'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
//     }
//   };

