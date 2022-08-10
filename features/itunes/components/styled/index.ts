import styled from "styled-components";
import { CustomCard } from "../../../../common";
import { Card } from "antd";
import { styles, colors, fonts } from "@themes";

export const CustomSearchStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0px;
  max-width: 100%;
  color: ${colors.primary};
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  margin: 0.5rem 0;
`;
export const CustomTrackCard = styled(CustomCard)`
  && {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

export const TrackName = styled.h3`
  ${fonts.weights.bold()};
  color: ${colors.primary};
  margin: 0.5rem 0;
  grid-area: trackname;
`;

export const ArtistName = styled.h2`
  ${fonts.weights.bold()};
  color: ${colors.primary};
  margin: 0.5rem 0;
  grid-area: artistname;
`;

export const AlbumArt = styled.img`
  border-radius: 5%;
  width: 50%;
  height: 50%px;
  grid-area: albumart;

  @media (max-width: 300px) {
    width: 100%;
    height: 100%;
  }
`;

export const Duration = styled.p`
  grid-area: duration;
`;
