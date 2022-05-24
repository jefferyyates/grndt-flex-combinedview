import React from 'react';
import { SideLink, Actions } from '@twilio/flex-ui';

const CustomSidebarButton = ({activeView}) => {
    function navigate() {
        Actions.invokeAction('NavigateToView', {viewName: 'realtimequeueteamview'});
    };

    return (
      <SideLink
        showLabel={true}
        icon="Data"
        iconActive="DataBold"
        isActive={ activeView === 'realtimequeueteamview'}
        onClick= { navigate }
        key="MyCustomPageSideLink"
      >
        Combined Team and RTQ
      </SideLink>

    );
};

export default CustomSidebarButton;