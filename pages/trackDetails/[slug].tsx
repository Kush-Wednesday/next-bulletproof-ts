import { store } from "@store";
import { TrackDetails } from "@features/trackDetails";
import { GetServerSideProps } from "next";
import { trackDetailApi } from "@features/trackDetails/api/getTrackDetails";

export const TrackDetailsPage = () => {
  return <TrackDetails />;
};

export const getServerSideProps: GetServerSideProps = async context => {
  // This automatically creates a store instance which can be used in getServerSideProps or getInitialProps
  // Refer to https://redux-toolkit.js.org/rtk-query/usage/server-side-rendering
  store.dispatch(
    trackDetailApi.endpoints.fetchTrackDetail.initiate(parseInt(context.query.slug as string))
  );

  await Promise.all(trackDetailApi.util.getRunningOperationPromises());

  return {
    props: {},
  };
};
export default TrackDetailsPage;
