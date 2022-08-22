import { repoInfoApi } from "@features/info";
import { recommendationsApi } from "@features/repos";
import { itunesApi } from "@features/itunes";
import { trackDetailApi } from "@features/trackDetails/api/getTrackDetails";

const middlewares = [
  recommendationsApi.middleware,
  repoInfoApi.middleware,
  itunesApi?.middleware,
  trackDetailApi.middleware,
];

export default middlewares;
