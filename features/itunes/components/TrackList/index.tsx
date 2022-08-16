import get from "lodash/get";
import { isUndefined } from "lodash";
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
import { injectIntl, IntlShape } from "react-intl";

interface TrackListProps {
  intl: IntlShape;
  trackData?: SongResponse;
  loading: boolean;
  trackName: string;
}

const TrackList: React.FC<TrackListProps> = props => {
  const { trackData, loading, trackName } = props;
  const results: SongItem[] = get(trackData, "results", []);
  const resultCount: number = get(trackData, "totalCount", 0);

  const [currentTrack, setCurrentTrack] = useState("");

  const prevRef = useRef<HTMLAudioElement>(null);
  const BlockText = props => <T display="block" {...props} />;

  const memoizedAudioRef = useMemo(() => {
    if (!results) return;

    const audioRef = {};

    results.map(item => {
      audioRef[item.trackId] = React.createRef<HTMLAudioElement>();
    });
    return audioRef;
  }, [results]);

  const trackEventHandler = (trackId, url) => {
    if (currentTrack !== "" && currentTrack !== trackId.toString()) {
      if (memoizedAudioRef?.[currentTrack]) {
        console.log("nenoCallbackref", memoizedAudioRef?.[currentTrack]);
        memoizedAudioRef?.[currentTrack].current?.pause();
        memoizedAudioRef?.[trackId].current?.load();
        memoizedAudioRef?.[trackId].current?.play();
      } else {
        memoizedAudioRef?.[trackId].current?.load();
        memoizedAudioRef?.[trackId].current?.play();
      }
    }

    setCurrentTrack(trackId.toString());
  };

  return (
    <div data-testid="track-list">
      <If condition={results.length !== 0}>
        <Skeleton loading={loading} active>
          {resultCount !== 0 && <h2>{resultCount}</h2>}
          <Row>
            {results.map((item, index: number) => (
              <Col
                key={index}
                xs={{ span: 24 }}
                lg={{ span: 6 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
              >
                <CustomTrackCard data-testid="track-card">
                  <AlbumArt data-testid="album-art" src={item.artworkUrl100}></AlbumArt>
                  <TrackName>
                    <BlockText id="track_name" values={{ name: !isUndefined(item.trackName) && item.trackName.substring(0, 10) }} />
                  </TrackName>
                  <ArtistName>
                    <BlockText
                      id="artist_name"
                      values={{ name: item.artistName.substring(0, 10) }}
                    />
                  </ArtistName>
                  <Duration>
                    <BlockText id="duration" />
                    {Math.floor(item.trackTimeMillis / 60000)}:
                    {Math.floor((item.trackTimeMillis / 1000) % 60)}s
                  </Duration>
                  <audio
                    id={item.previewUrl}
                    autoPlay={false}
                    controls
                    onPlay={() => trackEventHandler(item.trackId, item.previewUrl)}
                    ref={memoizedAudioRef ? memoizedAudioRef?.[item.trackId] : null}
                    style={
                      {
                        display: "block",
                        width: "fit-content<100%>",
                        maxWidth: "100%",
                      } as React.CSSProperties
                    }
                  >
                    <source src={item.previewUrl} type="audio/mp3"></source>
                    Your browser does not support audio tags
                  </audio>
                </CustomTrackCard>
              </Col>
            ))}
          </Row>
        </Skeleton>
      </If>
    </div>
  );
};

export default injectIntl(TrackList);
