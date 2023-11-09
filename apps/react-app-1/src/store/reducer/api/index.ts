import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const streamingDataApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    streamData: builder.query<Uint8Array, void>({
      query: () => 'stream', // Update with your streaming endpoint            
    }),
  }),
});

export const { useStreamDataQuery } = streamingDataApi;
