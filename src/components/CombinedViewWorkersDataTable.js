import React, { Component } from 'react';
import { WorkersDataTable } from '@twilio/flex-ui';
import { Flex } from '@twilio/flex-ui/';
//import { ActiveFilters } from '@twilio/flex-ui/src/state/ViewState';


export default class CombinedViewWorkersDataTable extends WorkersDataTable {
  constructor(props) {
    super(props);
  }

  render() {
    const { filters } = this.props;

    console.log("JEFFX render this", this);
    return super.render();
  }
}


/*
export default class CombinedViewWorkersDataTable extends Component {
  constructor(props) {
    super(props);
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
