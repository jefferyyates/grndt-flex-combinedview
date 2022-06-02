import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';

const CustomSidebarButton = ({activeView}) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', {viewName: 'CombinedTaskQueueView'});
        //Actions.invokeAction('HistoryPush', `/CombinedTaskQueueView/`);
    };

    return (
      <SideLink
        showLabel={true}
        icon="Data"
        iconActive="DataBold"
        isActive={ activeView === 'CombinedTaskQueueView'}
        onClick= { navigate }
        key="my-CVSL"
      >
        Combined Team and RTQ
      </SideLink>

    );
};

export default CustomSidebarButton;