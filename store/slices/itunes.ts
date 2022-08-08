import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SongItem } from '@features/itunes/api/getSongs';

export interface SongState {
    songsCount: number;
    songs: SongItem[];
    error?: string;
  }
  
  const initialState: SongState = {
    songsCount: 0,
    songs: [],
    error: undefined,
  };
  
  export const ituneSlice = createSlice({
    name: "itunesApi",
    initialState,
    reducers: {
      successGetSongs: (state: SongState, action: PayloadAction<SongItem[]>) => {
        state.songs = action.payload;
        state.songsCount = 0;
      },
    },
  });
  
  export const { successGetSongs } = ituneSlice.actions;
  
  export default ituneSlice.reducer;