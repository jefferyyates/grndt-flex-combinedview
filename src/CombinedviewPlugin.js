import { FlexPlugin } from '@twilio/flex-plugin';
import { QueuesStatsView, View, VERSION } from '@twilio/flex-ui';
import * as Flex from '@twilio/flex-ui'
import CombinedView from './components/CombinedView';
import CombinedSidebarButton from './components/CombinedSidebarButton';
import CombinedViewWorkersDataTable from './components/CombinedViewWorkersDataTable';

import React from 'react';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CombinedviewPlugin';
const TEAMS_VIEW_FILTER_KEY = 'teams-view-filter';
const TEAMS_VIEW_FILTER_TEXT = 'Teams View Filter';

  /**
   * Builds and parses rawFilters into filter query strings
   */
  function buildAndStoreCombinedViewFilters() {
    // Build out a complex query...
    let queryAry = [];
  
    // For each complex rawFilter...
    CombinedViewWorkersDataTable.defaultProps.rawFilters.forEach(rawFilter => {
      // For each individual filter...
      rawFilter.filters.forEach(filter => {
        // Build the filter as a query...
        let values = filter.values;
      
        if(Array.isArray(values)) {
          values = values.map((element, index) => {return `'${element}'`;}).join(",");
          values = `[${values}]`;
        } else {
          values = `"${values}"`;
        }
  
        // And add it to the array.
        queryAry.push(`${filter.name} ${filter.condition} ${values}`);
      });
    });
  
    // Convert the array of sub queries to a combined string...
    const query = queryAry.join(' AND ');
  
    // And push it into the CombinedViewWorkersDataTable.
    CombinedViewWorkersDataTable.defaultProps.filters.push(
      {
        key: TEAMS_VIEW_FILTER_KEY,
        text: TEAMS_VIEW_FILTER_TEXT,
        query: query,
      }
    );  
  };

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

    // Add our new View
    flex.ViewCollection.Content.add(
      <View name="CombinedTaskQueueView" key="combined-tq-view">
        <CombinedView name={CombinedView.COMBINEDVIEW_NAME} key="my-CV"/>
      </View>
    );
    
    // Add navigation button for our new View
    Flex.SideNav.Content.add(
      <CombinedSidebarButton key="combined-view-button" />
    );
    
    // Add a listener to manage filters being removed.
    Flex.Actions.addListener("afterRemoveListFilters", (payload, abortFunction) => {

      let newFilters = CombinedViewWorkersDataTable.defaultProps.rawFilters;
      CombinedViewWorkersDataTable.defaultProps.rawFilters = newFilters.filter(function(value, index, arr){
        return value.key != payload.key;
      });

      // Trim out any old versions of the filters with the same key
      newFilters = CombinedViewWorkersDataTable.defaultProps.filters;
      CombinedViewWorkersDataTable.defaultProps.filters = newFilters.filter((value, index, arr) => {
        //return value.key != payload.key;
        return value.key != TEAMS_VIEW_FILTER_KEY;
      });
      
      // Build and store the filters.
      buildAndStoreCombinedViewFilters();

    });

    // Add a listener to manage filters being applied.
    Flex.Actions.addListener("afterApplyListFilters", (payload, abortFunction) => {

      // Only have to do something if there is a payload.
      if(payload.filters.length > 0) {

        // Initialize if there's nothing to start with.
        if(!CombinedViewWorkersDataTable.defaultProps.rawFilters || CombinedViewWorkersDataTable.defaultProps.rawFilters.length == 0) {
          CombinedViewWorkersDataTable.defaultProps.rawFilters = [];
        }

        // Trim out any old versions of the filters with the same key
        let newRawFilters = CombinedViewWorkersDataTable.defaultProps.rawFilters;
        CombinedViewWorkersDataTable.defaultProps.rawFilters = newRawFilters.filter((value, index, arr) => {
          return value.key != payload.key;
        });
        CombinedViewWorkersDataTable.defaultProps.rawFilters.push(payload);
        
        // Initialize if there's nothing to start with.
        if(!CombinedViewWorkersDataTable.defaultProps.filters || CombinedViewWorkersDataTable.defaultProps.filters.length == 0) {
          CombinedViewWorkersDataTable.defaultProps.filters = [];
          CombinedViewWorkersDataTable.defaultFilters.forEach(defFilt => CombinedViewWorkersDataTable.defaultProps.filters.push(defFilt));
        }

        // Trim out any old versions of the filters with the same key
        let newFilters = CombinedViewWorkersDataTable.defaultProps.filters;
        CombinedViewWorkersDataTable.defaultProps.filters = newFilters.filter((value, index, arr) => {
          //return value.key != payload.key;
          return value.key != TEAMS_VIEW_FILTER_KEY;
        });
              
        // Build and store the filters.
        buildAndStoreCombinedViewFilters();
      }

    });
    
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
