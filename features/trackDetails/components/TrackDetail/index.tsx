import { If, T, CustomCard } from "../../../../common";
import { Button, Card as AntDCard, Tag, Image } from "antd";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { IntlShape, injectIntl } from "react-intl";
import styled from "styled-components";
import { TrackItem } from "../../api/getTrackDetails";
import { styles, colors, fonts } from "@themes";

type ContainerProps = {
  maxwidth: number;
  padding: number;
};

const Container = styled.div<ContainerProps>`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${props => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
    background-color: "#57CC99";
  }
`;

const CustomTrackCard = styled(AntDCard)`
  && {
    padding: 1rem;
    border: 1px solid #111;
    border-radius: 10px;
    margin: 20px 0;
    background-color: ${colors.secondary};
    box-shadow: 0 0 5px rgba(2, 2, 2, 0.2);
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const FColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const StyledAudio = styled.div`
  
  margin: 0.5rem auto;
  background-color: ${props => (props.theme === "dark" ? "#222" : "#f5f5f5")};'

`;

interface TrackDetailProps {
  intl: IntlShape;
  trackDetails: TrackItem;
}
const TrackDetail: React.FC<TrackDetailProps> = ({ intl, trackDetails }) => {
  // console.log("trackdetails", trackDetails);
  const {
    artistName,
    collectionName,
    trackName,
    collectionPrice,
    trackPrice,
    artworkUrl100,
    previewUrl,
    trackId,
    currency,
    releaseDate,
  } = trackDetails;

  const [isPlaying, setIsPlaying] = useState(false);
  const router = useRouter();
  const audioRef = useRef<HTMLAudioElement>(null);

  function handleOnPlay(evt) {
    evt.preventDefault();
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  }

  return (
    <Container data-testid="track-details" maxwidth={600} padding={20}>
      <Button type="primary" size="small" onClick={() => router.push("/")}>
        {intl.formatMessage({ id: "back_to_home_button" })}
      </Button>

      <CustomTrackCard>
        <Flex>
          <If
            condition={!isEmpty(artworkUrl100)}
            otherwise={<T data-testid="artwork-unavailable" id="artwork_unavailable" />}
          >
            <Image
              data-testid="album-art"
              style={{ paddingRight: "20px" }}
              height={200}
              src={artworkUrl100}
              alt="no image"
            />
          </If>

          <FColumn>
            <If
              condition={!isEmpty(collectionName)}
              otherwise={
                <T data-testid="collection-name-unavailable" id="collection_name_unavailable" />
              }
            >
              <T
                data-testid="collection-name"
                id="collection_name"
                values={{ collectionName: collectionName }}
              />
            </If>

            <StyledAudio>
              <audio
                id={previewUrl}
                data-testid="audio-test"
                aria-label="audio-label"
                autoPlay={false}
                controls
                onPlay={handleOnPlay}
                ref={audioRef}
                style={
                  {
                    display: "block",
                    width: "fit-content<100%>",
                    maxWidth: "100%",
                  } as React.CSSProperties
                }
              >
                <source src={previewUrl} type="audio/mp3"></source>
                Your browser does not support audio tags
              </audio>
            </StyledAudio>
          </FColumn>
        </Flex>

        <If
          condition={!isEmpty(artistName)}
          otherwise={<T data-testid="artist-name-unavailable" id="artist_name_unavailable" />}
        >
          <T data-testid="artist-name" id="artist_name" values={{ name: artistName }} />
        </If>

        <If condition={!isEmpty(trackName)}>
          <T text={trackName} type="heading" />
        </If>
        <If
          condition={!isNaN(collectionPrice)}
          otherwise={
            <T data-testid="collection-price-unavailable" id="collection_price_unavailable" />
          }
        >
          <T
            data-testid="collection-price"
            id="collection_price"
            values={{ currency: currency, collectionPrice: collectionPrice }}
          />
        </If>
        <If
          condition={!isEmpty(releaseDate)}
          otherwise={<T data-testid="release-date-unavailable" id="release_date_unavailable" />}
        >
          <T
            data-testid="release-date"
            id="release_date"
            values={{ releaseDate: new Date(releaseDate).toDateString() }}
          />
        </If>
      </CustomTrackCard>
    </Container>
  );
};

export default injectIntl(TrackDetail);
