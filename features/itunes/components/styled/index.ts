import styled from "styled-components";
import { CustomCard } from "../../../../common";
import { Card } from "antd";
import { styles, colors, fonts } from "@themes";

export const CustomSearchStyle = styled(CustomCard)`
  margin: 20px 0px;
  max-width: 100%;
  background-color: ${colors.secondary};
  border-color: #000000;
`;

export const Heading = styled.h2`
  color: ${colors.primary};
  margin: 0.5rem 0;
`;
export const CustomTrackCard = styled(CustomCard)`
  && {
    background-color: ${colors.secondary};
    border-color: #000000;
  }
`;

export const TrackName = styled.h3`
  ${fonts.weights.bold()};
  color: ${colors.textSecondary};
  margin: 0.5rem 0;
  grid-area: trackname;
`;

export const ArtistName = styled.h3`
  ${fonts.weights.bold()};
  color: ${colors.textSecondary};
  margin: 0.5rem 0;
  grid-area: artistname;
`;

export const AlbumArt = styled.img`
  width: 100%;
  height: 100%;
  grid-area: albumart;
  aspect-ratio: 2/1;
  object-fit: contain;

  @media (max-width: 425px) {
    width: 100%;
    height: 100%;
  }
`;

export const Duration = styled.p`
  grid-area: duration;
`;

export const StyledAudio = styled.div`
  
  margin: 0.5rem auto;
  background-color: ${props => (props.theme === "dark" ? "#222" : "#f5f5f5")};'

`;
