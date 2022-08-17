import { repoInfoApi } from "@features/info";
import { recommendationsApi } from "@features/repos";
import { itunesApi } from "@features/itunes";

const middlewares = [recommendationsApi.middleware, repoInfoApi.middleware, itunesApi?.middleware];

export default middlewares;
