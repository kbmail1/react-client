import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client'

import App from './App'
import './index.scss'

// this is for test against a public apollo server
/*
const apolloClient = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
  cache: new InMemoryCache(),
})
apolloClient
  .query({
    query: gql`
      query GetRates {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then((result) => console.log(result))
*/

export const apolloClient = new ApolloClient({
  uri: 'https://localhost:8888',
  cache: new InMemoryCache(),
})

export const GET_WORDINFO = gql`
  query Query($word: String!) {
    getWordInfo(word: $word) {
      word
      origin
      phonetic
      phonetics {
        text
        audio
      }
      meanings {
        partOfSpeech
        definitions {
          definition
          synonyms
          antonyms
        }
      }
    }
  }
`

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
