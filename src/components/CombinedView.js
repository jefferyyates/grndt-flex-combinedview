import React from 'react';
import { QueuesStatsView } from '@twilio/flex-ui';
import CombinedViewWorkersDataTable from './CombinedViewWorkersDataTable';


export default class CombinedView extends React.Component {
    render() {
        return(
            <div>
              <CombinedViewWorkersDataTable/>
              <div>
                <QueuesStatsView/>
              </div>
            </div>
        );
    }
}