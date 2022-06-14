import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';

const CustomSidebarButton = ({activeView}) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', {viewName: 'CombinedTaskQueueView'});
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
        Combined Team and Queue View
      </SideLink>

    );
};

export default CustomSidebarButton;