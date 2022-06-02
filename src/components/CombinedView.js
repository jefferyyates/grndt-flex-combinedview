import React from 'react';
import { QueuesStatsView, TeamsView, WorkersDataTable } from '@twilio/flex-ui';

const CombinedView = (viewState) => {
  return(
    <div>
      <div>
        <QueuesStatsView name="myQSV" key="my-QSV"/>
      </div>
      <div>
        <TeamsView name="myTV" key="my-TV" isViewActive={viewState.isViewActive}/>
      </div>
    </div>
  );
}

export default CombinedView;
