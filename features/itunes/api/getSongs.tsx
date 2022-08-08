import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface SongItem {
  artistName: string;
  trackName: string;
  trackId: number;
  artistId: number;
}

export type SongResponse = {
  resultCount: number;
  results: SongItem[];
};

export const itunesApi = createApi({
  reducerPath: "itunesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://itunes.apple.com/" }),
  endpoints: builder => ({
    fetchSong: builder.query<SongResponse, string>({
      query: name => `search?term=${name}`,
    }),
  }),
});

export const { useFetchSongQuery } = itunesApi;
