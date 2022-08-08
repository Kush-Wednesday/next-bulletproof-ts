import { Input } from "antd";
import { debounce } from "lodash-es";
import { useState, useEffect } from "react";
import { SongItem, SongResponse, useFetchSongQuery } from "@features/itunes/api/getSongs";
import { If } from "@common";

export const ITunes = () => {
  const { Search } = Input;
  const [songName, setSongName] = useState("");
  const { data, error, isLoading, isFetching } = useFetchSongQuery(songName, {
    skip: !songName.trim(),
  });

  const handleOnChange = debounce(rName => {
    setSongName(rName);
  }, 500);

  return (
    <>
      <Search
        type="text"
        onChange={evt => handleOnChange(evt.target.value)}
        onSearch={searchText => handleOnChange(searchText)}
      />

      {data?.results.map(item => (
        <div key={item.trackId}>{item.trackName}</div>
      ))}

    
    </>
  );
};

export default ITunes;
