import styled from "styled-components";
import { CustomCard } from "../../../../common";
import { Card } from "antd";
import { styles, colors, fonts } from "@themes";

export const CustomSearchStyle = styled(CustomCard)`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
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
    // display: flex;
    // flex-direction: column;
    // // justify-content: space-between;
    // align-items: center;
    // height: 100%;
  }
`;

export const TrackName = styled.h3`
  ${fonts.weights.bold()};
  color: ${colors.primary};
  margin: 0.5rem 0;
  grid-area: trackname;
`;

export const ArtistName = styled.h3`
  ${fonts.weights.bold()};
  color: ${colors.primary};
  margin: 0.5rem 0;
  grid-area: artistname;
`;

export const AlbumArt = styled.img`
  border-radius: 5%;
  width: 50%;
  height: 50%;
  grid-area: albumart;

  @media (max-width: 300px) {
    width: 100%;
    height: 100%;
  }
`;

export const Duration = styled.p`
  grid-area: duration;
`;

export const AudioContainer = styled.div`
   width: 50%;
   height:50%;
  border: 1px solid red;
  margin: 0.5rem auto;
  background-color: ${props => (props.theme === "dark" ? "#222" : "#f5f5f5")};'

`;
