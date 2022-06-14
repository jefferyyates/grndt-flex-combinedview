import React from 'react';
import styled from 'react-emotion';
import { QueuesStatsView } from '@twilio/flex-ui';
import CombinedViewWorkersDataTable from './CombinedViewWorkersDataTable';

const COMBINEDVIEW_NAME = "CombinedView";

const CombinedViewStyles = styled('div')`
  .Twilio-CombinedTaskQueueView {
    position: relative;
    overflow-x: hidden;
    display: flex;
    flex-flow: column nowrap;
    -webkit-box-flex: 1;
    flex-grow: 1;
    flex-shrink: 1;
  }
  .myDiv {
    overflow-y: scroll;
    height: 50vh;
    }
  `;

const CombinedView = (viewState) => {
    return(
      <CombinedViewStyles>
      <div className="Twilio Twilio-CombinedTaskQueueView">
        <div className="myDiv">
          <QueuesStatsView name="myQSV" key="my-QSV"/>
        </div>
        <hr/>
        <div className="myDiv">
          <CombinedViewWorkersDataTable name="myWV" key="my-QSV" isViewActive={viewState.isViewActive}/>
        </div>
      </div>
      </CombinedViewStyles>
    );
}

export default CombinedView;
