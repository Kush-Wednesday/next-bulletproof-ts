import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export interface TrackItem {
  artistName: string;
  collectionName: string;
  trackName: string;
  collectionPrice: number;
  trackPrice: number;
  artworkUrl100: string;
  previewUrl: string;
  trackId: number;
  currency: string;
  releaseDate: string;
}

export type TrackDetail = {
  resultCount: number;
  results: TrackItem[];
};

export const trackDetailApi = createApi({
  reducerPath: "trackDetailApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    fetchTrackDetail: builder.query<TrackDetail, number>({
      query: trackid => `lookup?id=${trackid}`,
    }),
  }),
});

export const { useFetchTrackDetailQuery } = trackDetailApi;
