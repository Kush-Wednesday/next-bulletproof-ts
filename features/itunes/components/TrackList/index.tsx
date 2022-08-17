import get from "lodash/get";
import { Skeleton, Row, Col, Button } from "antd";
import { If } from "../../../../common";
import { SongResponse, SongItem } from "../../api/getSongs";
import { useMemo, useState } from "react";
import React from "react";
import { injectIntl, IntlShape } from "react-intl";
import TrackCard from "../TrackCard";

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

  const memoizedAudioRef = useMemo(() => {
    if (!results) return;

    const audioRef = {};

    results.map(item => {
      audioRef[item.trackId] = React.createRef<HTMLAudioElement>();
    });
    return audioRef;
  }, [results]);

  const trackEventHandler = trackId => {
    if (currentTrack !== "" && currentTrack !== trackId.toString()) {
      if (memoizedAudioRef?.[currentTrack]) {
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
                <TrackCard
                  result={item}
                  memoizedAudioRef={memoizedAudioRef}
                  trackEventHandler={trackEventHandler}
                />
              </Col>
            ))}
          </Row>
        </Skeleton>
      </If>
    </div>
  );
};

export default injectIntl(TrackList);
