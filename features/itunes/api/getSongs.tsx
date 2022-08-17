import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export interface SongItem {
  artistName: string;
  trackName: string;
  trackId: number;
  artistId: number;
  trackTimeMillis: number;
  artworkUrl100: string;
  previewUrl: string;
}

export type SongResponse = {
  resultCount: number;
  results: SongItem[];
};

export const itunesApi = createApi({
  reducerPath: "itunesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: builder => ({
    fetchSong: builder.query<SongResponse, string>({
      query: name => `search?term=${name}`,
    }),
  }),
});

export const { useFetchSongQuery } = itunesApi;
