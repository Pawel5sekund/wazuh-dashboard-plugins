import React from 'react';
import { EuiSpacer } from '@elastic/eui';
import { getPlugins } from '../../../../plugin-services';
import './dashboard.scss';
import { EventsCount } from './events-count';

export interface AgentDashboardProps {
  agentId: string;
  indexPattern: any;
}

export const AgentDashboard = ({
  // agentId,
  ...restProps
}: AgentDashboardProps) => {
  const SearchBar = getPlugins().data.ui.SearchBar;

  return (
    <div>
      <div className='wz-search-bar-no-padding'>
        <SearchBar />
      </div>
      <EuiSpacer />
      <div style={{ margin: '-8px' }}>
        <EventsCount {...restProps} />
      </div>
    </div>
  );
};
