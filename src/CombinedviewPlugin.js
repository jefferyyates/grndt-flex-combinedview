import { FlexPlugin } from '@twilio/flex-plugin';
import { View, VERSION } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui'
import CombinedView from './components/CombinedView';
import CombinedSidebarButton from './components/CombinedSidebarButton';

import React from 'react';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CombinedviewPlugin';

export default class CombinedviewPlugin extends FlexPlugin {
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
      <View name="CombinedTaskQueueView" key="combined-view">
        <CombinedView name="myCV" key="my-CV"/>
      </View>
    );

    flex.SideNav.Content.add(
      <CombinedSidebarButton key="my-CVB" />
    );

    //Flex.QueuesStatsView.Content.add(<TeamsView key="mytv"/>);
    // Try adding QueuesStatsView to TeamsView, but sort it -1 and/or align start?
    //Flex.TeamsView.Content.add(<div key="mydiv"><QueuesStatsView key="myqsv"/><br key="mybr" style={{clear:"both"}}/><p>&nbsp;</p></div>, { sortOrder: -1});

    /*
    Flex.ViewCollection.Content.add(
      <View name="realtimequeueteamview" key="rtqtv">
        <CombinedView />
      </View>
    );

    Flex.SideNav.Content.add(
      <CombinedSidebarButton key="combined-view-button" />
    );
    */    
    
    /*
    Flex.Actions.addListener("afterRemoveListFilters", (payload, abortFunction) => {
      console.log("JEFFX remove filter payload", payload);
      let newFilters = CombinedViewWorkersDataTable.defaultProps.filters;
      CombinedViewWorkersDataTable.defaultProps.filters = newFilters.filter(function(value, index, arr){
        return value.key != payload.key;
      });
    });

    Flex.Actions.addListener("afterApplyListFilters", (payload, abortFunction) => {
      console.log("JEFFX listener payload", payload);
      console.log("JEFFX listener preFilter", CombinedViewWorkersDataTable.defaultProps.filters);
      console.log("JEFFX listener preFilter", CombinedViewWorkersDataTable.defaultProps);
      console.log("JEFFX listener Flex", Flex);
      console.log("JEFFX Flex.TeamsView.Content", Flex.TeamsView.Content);

      if(payload.filters.length > 0) {
        // OK, need to see if current filters is empty...
        if(!CombinedViewWorkersDataTable.defaultProps.filters) {
          CombinedViewWorkersDataTable.defaultProps.filters = [];
        }
        // OR if current filters contains new filter by name...
        let newFilters = CombinedViewWorkersDataTable.defaultProps.filters;
        CombinedViewWorkersDataTable.defaultProps.filters = newFilters.filter((value, index, arr) => {
          return value.key != payload.key;
        });
        // then either create new list, add to list, or replace an item in list.
        // Well, we created a new list if empty, and removed anything already there,
        // So only thing left is to push new filter on.
        
        payload.filters.forEach(filter => {
          let values = filter.values;
          if(Array.isArray(values)) {
            values = values.join(",");
          }
          CombinedViewWorkersDataTable.defaultProps.filters.push(
            {
              key: payload.key,
              text: payload.key.replace(/-/g,' ').replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()),
              query: `${filter.name} ${filter.condition} "${values}"`,
            }
          );
        });
      }
      console.log("JEFFX listener postFilter", CombinedViewWorkersDataTable.defaultProps.filters);
    });

    // fix css Twilio-WorkerListFilterSelect css
    */
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
