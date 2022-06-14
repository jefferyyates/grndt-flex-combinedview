import React, { Component } from 'react';
import { WorkersDataTable } from '@twilio/flex-ui';
import { Flex } from '@twilio/flex-ui/';

export default class CombinedViewWorkersDataTable extends WorkersDataTable {
  constructor(props) {
    super(props);
  }

  render() {
    const { filters } = this.props;
    return super.render();
  }
}
