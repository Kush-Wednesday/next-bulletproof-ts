import { Input ,Divider } from "antd";
import { debounce } from "lodash-es";
import { useState, useEffect } from "react";
import { SongItem, SongResponse, useFetchSongQuery } from "@features/itunes/api/getSongs";
import { If, Container } from "@common";
import { CustomSearch } from "@features/itunes/components";


export const ITunes = () => {
  
  const [songName, setSongName] = useState("");
  const { data, error, isLoading, isFetching } = useFetchSongQuery(songName, {
    skip: !songName.trim(),
  });

  const handleOnChange = debounce(rName => {
    setSongName(rName);
  }, 500);

  return (
    <>
    <Container
      padding={20}
      maxwidth={500}
      style={{
        height: "100vh",
        alignSelf: "center",
      }}
    >
      <CustomSearch handlechange={handleOnChange} />
   
      <Divider/>
      {data?.results.map(item => (
        <div key={item.trackId}>{item.trackName}</div>
      ))}

    </Container>
    </>
    
  );
};

export default ITunes;
