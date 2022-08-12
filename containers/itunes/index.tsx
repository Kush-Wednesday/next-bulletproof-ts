import { Input, Divider } from "antd";
import { debounce } from "lodash-es";
import { useState, useEffect, useRef } from "react";
import { SongItem, SongResponse, useFetchSongQuery } from "@features/itunes/api/getSongs";
import { If, Container } from "@common";
import { CustomSearch, TrackList } from "@features/itunes/components";
import React from "react";
import { IntlShape, injectIntl } from "react-intl";
import { Interface } from "readline";

interface ItunesContainerProps {
  intl: IntlShape;
}
//
export const ITunes: React.FC<ItunesContainerProps> = ({ intl }) => {
  const [songName, setSongName] = useState("");
  const { data, error, isLoading, isFetching } = useFetchSongQuery(songName, {
    skip: !songName.trim(),
  });
  // console.log(data);

  // const trackEventHandler=(trackId)=>{
  //   if(currentTrack!=='' && currentTrack!==trackId)
  //     audioRef.current?.pause();

  //     setCurrentTrack(prevID=>trackId);
  //     console.log("trackID",currentTrack);
  //     console.log("audioRef",audioRef.current?.currentSrc);
  // }
  const handleOnChange = debounce(rName => {
    setSongName(rName);
  }, 500);

  return (
    <>
      <Container
        padding={20}
        maxwidth={1000}
        style={{
          height: "100vh",
          alignSelf: "center",
        }}
      >
        <CustomSearch handlechange={handleOnChange} />

        <Divider />
        <TrackList trackData={data} trackName={songName} loading={isLoading} />

        {/* {data?.results.map(item => (
        <div key={item.trackId}>{item.trackName}</div>
      ))} */}
      </Container>
    </>
  );
};

export default injectIntl(ITunes);
