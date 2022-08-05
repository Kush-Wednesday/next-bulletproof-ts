import { Input } from "antd";
import { debounce } from "lodash-es";
import { useState, useEffect } from "react";
import { SongItem, SongResponse, useFetchSongQuery } from "@features/itunes/api/getSongs";
import { If } from "@common";

export const ITunes = () => {
  const { Search } = Input;
  const [songName, setSongName] = useState("");
  const [display, setDisplay] = useState<SongItem[]>([]);
  const { data, error, isLoading, isFetching } = useFetchSongQuery("Better");

  useEffect(() => {
    console.log("hii", data);
    if (data) {
      setDisplay(data?.results);
    }
  }, [data]);

  const handleOnChange = debounce(rName => {
    setSongName(rName);
  }, 500);

  if (error) {
    // console.log(error);
    return <div>Oops Error Occured</div>;
  }

  return (
    <>
      <Search
        type="text"
        onChange={evt => handleOnChange(evt.target.value)}
        onSearch={searchText => handleOnChange(searchText)}
      />

    
        {display.map(item => (
          <div key={item.trackId}>{item.trackName}</div>
        ))}
      
      {/* <p>{data.results}</p> */}
    </>
  );
};

export default ITunes;
