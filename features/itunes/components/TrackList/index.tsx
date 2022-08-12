import get from "lodash/get";
import { Skeleton, Row, Col, Button } from "antd";
import { T, CustomCard, If } from "../../../../common";
import { SongResponse, SongItem } from "../../api/getSongs";
import {
  CustomTrackCard,
  TrackName,
  ArtistName,
  AlbumArt,
  Duration,
  AudioContainer,
} from "@features/itunes/components/styled";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { iteratorSymbol } from "immer/dist/internal";

interface TrackListProps {
  trackData?: SongResponse;
  loading: boolean;
  trackName: string;
  // playTrackEvent:(x:string)=>void;
  // audioRef:RefObject<HTMLAudioElement>;
}

const TrackList: React.FC<TrackListProps> = props => {
  const { trackData, loading, trackName } = props;
  const results: SongItem[] = get(trackData, "results", []);
  // console.log(trackData);
  const resultCount: number = get(trackData, "totalCount", 0);

  const [currentTrack, setCurrentTrack] = useState("");

  const prevRef = useRef<HTMLAudioElement>(null);

  const memoizedAudioRef = useMemo(() => {
    if (!results) return;

    const audioRef = {};

    results.map(item => {
      audioRef[item.trackId] = React.createRef<HTMLAudioElement>();
    });
    // console.log("audiRef",audioRef);
    return audioRef;
  }, [results]);
  // console.log("currentTrack",currentTrack);
  useEffect(() => {
    // if(currentTrack!=='')
    // memoizedAudioRef[currentTrack].pause();
    console.log("memo", memoizedAudioRef);
    //  prevRef.current=memoizedAudioRef.current
  }, [results]);

  // useRef<HTMLAudioElement>(null);

  const trackEventHandler = (trackId, url) => {
    // console.log("currentTrack",currentTrack);
    // console.log("trackID",trackId.toString());
    if (currentTrack !== "" && currentTrack !== trackId.toString()) {
      if (memoizedAudioRef[currentTrack]) memoizedAudioRef[currentTrack].current?.pause();
      else {
        memoizedAudioRef[trackId].current?.load();
        memoizedAudioRef[trackId].current?.play();
      }
      // console.log("audioRef2",memoizedAudioRef[trackId].current?.currentSrc);
    }

    // console.log("audioRef",audioRef);

    setCurrentTrack(trackId.toString());
  };

  // console.log("audioRef",memoizedAudioRef[trackId].current?.currentSrc);
  return (
    <If condition={results.length !== 0}>
      <Skeleton loading={loading} active>
        {resultCount !== 0 && <h2>{resultCount}</h2>}
        <Row>
          {results.map((item, index: number) => (
            <Col key={index} xs={{ span: 24 }} lg={{ span: 6 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <CustomTrackCard>
                <AlbumArt src={item.artworkUrl100}></AlbumArt>
                <TrackName>Track Name : {item.trackName}</TrackName>
                <ArtistName>Artist : {item.artistName}</ArtistName>
                <Duration>
                  Duration : {Math.floor(item.trackTimeMillis / 60000)}:
                  {Math.floor((item.trackTimeMillis / 1000) % 60)}s
                </Duration>
                {/* <AudioContainer> */}
                <audio
                  id={item.previewUrl}
                  autoPlay={false}
                  controls
                  onPlay={() => trackEventHandler(item.trackId, item.previewUrl)}
                  ref={memoizedAudioRef ? memoizedAudioRef[item.trackId] : null}
                  style={{ display: "block", width: "200px" } as React.CSSProperties}
                >
                  <source src={item.previewUrl} type="audio/mp3"></source>
                  Your browser does not support audio tags
                </audio>
                {/* </AudioContainer> */}
                {/* {console.log("audioRef2",memoizedAudioRef)} */}
              </CustomTrackCard>
            </Col>
          ))}
        </Row>
      </Skeleton>
    </If>
  );
};

export default TrackList;
