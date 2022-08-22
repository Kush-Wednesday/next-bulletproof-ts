import React, { useRef, useState } from "react";
import { SongItem } from "../../api/getSongs";
import {
  CustomTrackCard,
  TrackName,
  ArtistName,
  AlbumArt,
  Duration,
  StyledAudio,
} from "@features/itunes/components/styled";
import { isUndefined } from "lodash";
import { injectIntl, IntlShape } from "react-intl";
import { T } from "../../../../common";
import { useRouter } from "next/router";

interface TrackCardProps {
  intl: IntlShape;
  result: SongItem;
  searchedTerm:string;
  memoizedAudioRef;
  trackEventHandler;
}

const TrackCard: React.FC<TrackCardProps> = props => {
  const { result, memoizedAudioRef, trackEventHandler,searchedTerm } = props;
  const BlockText = props => <T display="block" {...props} />;
  const router = useRouter();

  return (
    <CustomTrackCard data-testid="track-card">
      <AlbumArt
        data-testid="album-art"
        src={result.artworkUrl100}
        onClick={() => router.push(`/trackDetails/${result.trackId}?song=${searchedTerm}`)}
      ></AlbumArt>
      <TrackName>
        <BlockText
          id="track_name"
          values={{ name: !isUndefined(result.trackName) && result.trackName.substring(0, 10) }}
        />
      </TrackName>
      <ArtistName>
        <BlockText
          id="artist_name"
          values={{ name: !isUndefined(result.trackName) && result.artistName.substring(0, 10) }}
        />
      </ArtistName>
      <BlockText id="duration" />
      {result.trackTimeMillis && Math.floor(result.trackTimeMillis / 60000)}:
      {result.trackTimeMillis && Math.floor((result.trackTimeMillis / 1000) % 60)}s
      <StyledAudio>
        <audio
          id={result.previewUrl}
          data-testid="audio-test"
          aria-label="audio-label"
          autoPlay={false}
          controls
          onPlay={() => trackEventHandler(result.trackId)}
          ref={memoizedAudioRef ? memoizedAudioRef?.[result.trackId] : null}
          style={
            {
              display: "block",
              width: "fit-content<100%>",
              maxWidth: "100%",
              color: "c9ada7",
            } as React.CSSProperties
          }
        >
          <source src={result.previewUrl} type="audio/mp3"></source>
          Your browser does not support audio tags
        </audio>
      </StyledAudio>
    </CustomTrackCard>
  );
};

export default injectIntl(TrackCard);
