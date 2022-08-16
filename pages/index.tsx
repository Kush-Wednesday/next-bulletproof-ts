
import { Itunes } from "@features/itunes";
import React from "react";
import { injectIntl } from "react-intl";


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
