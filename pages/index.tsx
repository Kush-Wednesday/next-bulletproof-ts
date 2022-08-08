import { Repos } from "@features/repos";
import { Itunes } from "@features/itunes";
import React, { memo } from "react";
import { injectIntl } from "react-intl";
import { compose } from "redux";

// export const ReposPage = ({ recommendations }) => {
//   return <Repos recommendations={recommendations} />;
// };

// export async function getStaticProps() {
//   // const recommendations = await getReccomendations();
//   return {
//     props: {
//       // recommendations,
//     },
//   };
// }

// export default compose(injectIntl, memo)(ReposPage);

export const SongPage = () => {
  return <Itunes />;
};

export default injectIntl(SongPage);
