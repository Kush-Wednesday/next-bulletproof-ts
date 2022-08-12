import get from "lodash/get";
import { Skeleton } from "antd";
import { T, CustomCard, If } from "../../../../common";
import { SongResponse, SongItem } from "../../api/getSongs";
import {
  CustomTrackCard,
  TrackName,
  ArtistName,
  AlbumArt,
  Duration,
} from "@features/itunes/components/styled";

interface TrackListProps {
  trackData?: SongResponse;
  loading: boolean;
  trackName: string;
}

const TrackList: React.FC<TrackListProps> = props => {
  const { trackData, loading, trackName } = props;
  const results: SongItem[] = get(trackData, "results", []);
  // console.log(trackData);
  const resultCount: number = get(trackData, "totalCount", 0);
  return (
    <If condition={results.length !== 0}>
      <CustomCard data-testid="track-list">
        <Skeleton loading={loading} active>
          {resultCount !== 0 && <h2>{resultCount}</h2>}
          {results.map((item, index: number) => (
            <CustomTrackCard key={index}>
              <AlbumArt src={item.artworkUrl100}></AlbumArt>
              <TrackName>Track Name : {item.trackName}</TrackName>
              <ArtistName>Artist : {item.artistName}</ArtistName>
              <Duration>
                Duration : {Math.floor(item.trackTimeMillis / 60000)}:
                {Math.floor((item.trackTimeMillis / 1000) % 60)}s
              </Duration>
            </CustomTrackCard>
          ))}
        </Skeleton>
      </CustomCard>
    </If>
  );
};

export default TrackList;
