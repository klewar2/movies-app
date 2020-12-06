import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import fetch from 'isomorphic-unfetch';
import { HttpLink } from 'apollo-link-http';
import { SERVER, WEB_SOCKET_LINK } from './config';
import { WebSocketLink } from 'apollo-link-ws';

interface Definition {
  kind: string;
  operation?: string;
}

const httpLink = new HttpLink({
  fetch,
  uri: SERVER,
});

const webSocketLink: WebSocketLink = new WebSocketLink({
  uri: WEB_SOCKET_LINK,
  options: {
    reconnect: true,
  },
});

const link = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  httpLink
);

const client = new ApolloClient<NormalizedCacheObject>({
  link: link as any,
  cache: new InMemoryCache().restore({}),
  connectToDevTools: true,
});

export default client;
