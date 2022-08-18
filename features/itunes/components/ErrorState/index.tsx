/**
 *
 * ErrorState
 *
 */

 import React from "react";
 import get from "lodash/get";
 import { compose } from "redux";
 import { injectIntl, IntlShape } from "react-intl";
 import { T, CustomCard } from "../../../../common";
 import { SongResponse } from "@features/itunes/api/getSongs";
 
 interface ErrorStateProps {
   intl: IntlShape;
   loading: boolean;
   trackData: SongResponse | undefined;
   tracksError: string | undefined;
 }
 
 const ErrorState: React.FC<ErrorStateProps> = ({ intl, trackData, tracksError, loading }) => {
   let trackError: string | undefined;
   if (tracksError) {
    trackError = tracksError;
   } else if (!get(trackData, "resultCount", 0)) {
    trackError = "";
   }
 
   return !loading && trackError ? (
     <CustomCard
       color={tracksError ? "red" : "grey"}
       data-testid="error-state"
     >
       <T id={trackError} />
     </CustomCard>
   ) : null;
 };
 
 export default compose(injectIntl)(ErrorState);
 