import React from 'react';
import { View, VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from '@twilio/flex-plugin';
import CombinedView from './components/CombinedView';
import CombinedSidebarButton from './components/CombinedSidebarButton';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'GrndtFlexCombinedviewPlugin';

export default class GrndtFlexCombinedviewPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    flex.ViewCollection.Content.add(
      <View name="realtimequeueteamview" key="rtqtv">
        <CombinedView />
      </View>
    );

    flex.SideNav.Content.add(
      <CombinedSidebarButton key="combined-view-button" />
    );

    flex.Actions.addListener("afterRemoveListFilters", (payload, abortFunction) => {
      console.log("JEFFX remove filter payload", payload);
      let newFilters = flex.WorkersDataTable.defaultProps.filters;
      flex.WorkersDataTable.defaultProps.filters = newFilters.filter(function(value, index, arr){
        return value.key != payload.key;
      });
    });

    flex.Actions.addListener("afterApplyListFilters", (payload, abortFunction) => {
      console.log("JEFFX listener payload", payload);
      console.log("JEFFX listener preFilter", flex.WorkersDataTable.defaultProps.filters);
      // OK, need to see if current filters is empty...
      if(!flex.WorkersDataTable.defaultProps.filters) {
        flex.WorkersDataTable.defaultProps.filters = [];
      }
      // OR if current filters contains new filter by name...
      let newFilters = flex.WorkersDataTable.defaultProps.filters;
      flex.WorkersDataTable.defaultProps.filters = newFilters.filter((value, index, arr) => {
        return value.key != payload.filters[0].key;
      });
      // then either create new list, add to list, or replace an item in list.
      // Well, we created a new list if empty, and removed anything already there,
      // So only thing left is to push new filter on.
      
      payload.filters.forEach(filter => {
        let values = filter.values;
        if(Array.isArray(values)) {
          values = values.join(",");
        }
        flex.WorkersDataTable.defaultProps.filters.push(
          {
            key: payload.key,
            text: payload.key,
            query: `${filter.name} ${filter.condition} "${values}"`,
          }
        );
      });
      console.log("JEFFX listener postFilter", flex.WorkersDataTable.defaultProps.filters);

    });

    // fix css Twilio-WorkerListFilterSelect css

  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
