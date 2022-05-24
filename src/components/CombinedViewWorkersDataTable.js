import React from 'react';
import { WorkersDataTable } from '@twilio/flex-ui';
import { Flex } from '@twilio/flex-ui/';
//import { ActiveFilters } from '@twilio/flex-ui/src/state/ViewState';

export default class CombinedViewWorkersDataTable extends WorkersDataTable {
  constructor(props) {
    super(props);
  }

  render() {
    const { filters } = this.props;

    console.log("JEFFX render filters", filters);
    return super.render();
  }
}

/*
export default class CombinedViewWorkersDataTable extends React.Component {
  constructor() {
    super();
  }

  render() {
    console.log("JEFFX render", this);
    return(
      <div>
        <WorkersDataTable/>
      </div>
    );
  }
}
*/
