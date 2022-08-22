import { If, Loader } from "@app/common";
import { useFetchSongQuery } from "@features/itunes/api/getSongs";
import { TrackItem, useFetchTrackDetailQuery } from "@features/trackDetails/api/getTrackDetails";
import { TrackDetail, TrackDetailError, EmptyResult } from "@features/trackDetails/components";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const TrackDetails: React.FC = () => {
  const router = useRouter();
  const slugTrackId = parseInt(router.query.slug as string);
  const [trackDetailsData, setTrackDetailsData] = useState<TrackItem>();
  const songName = router.query.song;

  const { songDetailData  } = useFetchSongQuery(router.query.song as string, {
    selectFromResult: ({ data }) => ({
      songDetailData: data?.results.find(songData => songData.trackId === slugTrackId),
    }),
  });

  // console.log("dd",songDetailData);
  const { data: TrackDetailData, error, isLoading } = useFetchTrackDetailQuery(slugTrackId);
  // console.log("data waasla",TrackDetailData);

  useEffect(() => {
    if (songDetailData) setTrackDetailsData({ ...songDetailData });
    else {
      if (TrackDetailData) setTrackDetailsData({ ...TrackDetailData.results[0] });
    }
  }, [songDetailData, TrackDetailData]);

  if (isLoading) return <Loader />;

  if(!trackDetailsData)
  if (error ||  !trackDetailsData) return <TrackDetailError />;

  return (
    <If condition={!isEmpty(trackDetailsData)} otherwise={<EmptyResult />}>
      <TrackDetail trackDetails={trackDetailsData} />
    </If>
  );
};
// trackDetails={ data?.results[0]}

export default TrackDetails;
