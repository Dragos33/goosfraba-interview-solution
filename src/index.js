import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({
	uri: 'https://fakerql.goosfraba.ro/graphql',
	cache: new InMemoryCache(),
})

const rootElement = document.getElementById('root')
ReactDOM.render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	rootElement
)

reportWebVitals()
