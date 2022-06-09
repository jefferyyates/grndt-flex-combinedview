import React from 'react';
import { QueuesStatsView, TeamsView, WorkersDataTable } from '@twilio/flex-ui';
import CombinedViewWorkersDataTable from './CombinedViewWorkersDataTable';

const CombinedView = (viewState) => {
//export default class CombinedView extends React.Component {
//  render() {
    return(
      <div>
        <div>
          <QueuesStatsView name="myQSV" key="my-QSV"/>
        </div>
        <div>
          <CombinedViewWorkersDataTable name="myWV" key="my-WV" isViewActive={viewState.isViewActive}/>
        </div>
      </div>
    );
//  }
}

export default CombinedView;
