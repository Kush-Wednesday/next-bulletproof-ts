
import { Itunes } from "@features/itunes";
import React from "react";
import { injectIntl } from "react-intl";

export const SongPage = () => {
  return <Itunes />;
};

export default injectIntl(SongPage);
