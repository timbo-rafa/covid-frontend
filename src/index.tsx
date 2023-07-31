
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3030/graphql',
  cache: new InMemoryCache(),
});

// apolloClient.query({
//   query: gql`
// query getCanadaCovidData {
//   covidData(countryCovidDataInput: {countryIds: [38]}) {
//     id
//     name
//     isoCode
//   }
// }`
// })
// .then((result) => console.log(`apollo result= ${result}`))
// .catch(err => console.log(`apollo error=${JSON.stringify(err)}`))


const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
