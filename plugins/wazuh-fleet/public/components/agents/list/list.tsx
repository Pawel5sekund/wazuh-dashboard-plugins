import React, { useState } from 'react';
import {
  EuiPageHeader,
  EuiSpacer,
  EuiButton,
  EuiPopover,
  EuiContextMenuPanel,
  EuiContextMenuItem,
  EuiHorizontalRule,
  EuiFlyout,
  EuiFlyoutBody,
  EuiFlyoutHeader,
  EuiText,
  EuiTitle,
  EuiLink,
} from '@elastic/eui';
import { Agent } from '../../../../common/types';
import { AgentResume } from '../details/resume';
import { getAgentManagement, getCore } from '../../../plugin-services';
import NavigationService from '../../../react-services/navigation-service';
import { enrollmentAgent } from '../../common/views';
import { TableIndexer } from '../../common/table-indexer/table-indexer';
import { ConfirmModal } from '../../common/confirm-modal/confirm-modal';
import { agentsTableColumns } from './columns';
import { AgentsVisualizations } from './visualizations';
import { EditAgentGroupsModal } from './actions/edit-groups-modal';

export interface AgentListProps {
  indexPatterns: any;
  filters: any[];
}

export const AgentList = (props: AgentListProps) => {
  const { indexPatterns, filters } = props;
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [agent, setAgent] = useState<Agent>();
  const [isEditGroupsVisible, setIsEditGroupsVisible] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [agentSelected, setAgentSelected] = useState<Agent[]>([]);

  const closeActions = () => {
    setIsActionsOpen(false);
  };

  const navigateToDeployNewAgent = () => {
    NavigationService.getInstance().navigate(enrollmentAgent.path);
  };

  const onSelectionChange = (selectedItems: Agent[]) => {
    setAgentSelected(selectedItems);
    // if (selectedItems.length < agentList.totalItems) {
    //   setAllAgentsSelected(false);
    // }
  };

  const closeModal = () => {
    setIsDeleteModalVisible(false);
    setAgent(undefined);
  };

  const confirmDelete = () => {
    if (agent) {
      getAgentManagement().delete(agent.agent.id);
      closeModal();
    }
  };

  return (
    <>
      <EuiPageHeader
        pageTitle='Agents'
        rightSideItems={[
          <EuiButton
            key='add-agent'
            fill
            iconType='plusInCircle'
            onClick={() => navigateToDeployNewAgent()}
          >
            Deploy new agent
          </EuiButton>,
          <EuiPopover
            key='actions'
            id='actions'
            button={
              <EuiButton
                iconType='arrowDown'
                iconSide='right'
                onClick={() => setIsActionsOpen(!isActionsOpen)}
              >
                Actions
              </EuiButton>
            }
            isOpen={isActionsOpen}
            closePopover={closeActions}
            panelPaddingSize='none'
            anchorPosition='downLeft'
            panelStyle={{ overflowY: 'unset' }}
          >
            <EuiContextMenuPanel
              items={[
                <EuiContextMenuItem
                  key='add-groups'
                  icon='plusInCircle'
                  onClick={closeActions}
                >
                  Add groups to agents
                </EuiContextMenuItem>,
                <EuiContextMenuItem
                  key='remove-groups'
                  icon='trash'
                  onClick={closeActions}
                >
                  Remove groups from agents
                </EuiContextMenuItem>,
                <EuiHorizontalRule margin='xs' key='horizontalRule' />,
                <EuiContextMenuItem
                  key='upgrade-agents'
                  icon='package'
                  onClick={closeActions}
                >
                  Upgrade agents
                </EuiContextMenuItem>,
                <EuiContextMenuItem
                  key='upgrade-tasks'
                  icon='eye'
                  onClick={closeActions}
                >
                  Upgrade tasks details
                </EuiContextMenuItem>,
              ]}
            />
          </EuiPopover>,
        ]}
      />
      <EuiSpacer />
      {indexPatterns ? (
        <TableIndexer
          filters={filters}
          indexPatterns={indexPatterns}
          topTableComponent={(searchBarProps: any) => (
            <AgentsVisualizations searchBarProps={searchBarProps} />
          )}
          columns={agentsTableColumns({
            setIsFlyoutAgentVisible: setIsFlyoutVisible,
            setAgent,
            setIsDeleteModalVisible,
            setIsEditGroupsVisible,
          })}
          tableProps={{
            hasActions: true,
            isSelectable: true,
            itemId: 'agent',
            selection: {
              selectable: (agent: Agent) => agent.agent.status === 'active',
              selectableMessage: selectable =>
                selectable ? undefined : 'Agent is currently offline',
              onSelectionChange: onSelectionChange,
            },
          }}
        />
      ) : null}
      {isEditGroupsVisible && agent && (
        <EditAgentGroupsModal
          onClose={() => {
            setIsEditGroupsVisible(false);
            setAgent(undefined);
          }}
          reloadAgents={() => {}}
          agent={agent}
        />
      )}
      {isDeleteModalVisible && (
        <ConfirmModal
          isVisible={isDeleteModalVisible}
          title='Delete agent'
          message='Are you sure you want to delete this agent?'
          onConfirm={confirmDelete}
          onCancel={closeModal}
          confirmButtonText='Delete'
          buttonColor='danger'
        />
      )}
      {isFlyoutVisible ? (
        <EuiFlyout
          ownFocus
          onClose={() => setIsFlyoutVisible(false)}
          aria-labelledby='flyout-agent'
        >
          <EuiFlyoutHeader hasBorder>
            <EuiTitle size='m'>
              <h2>
                <EuiLink
                  href={getCore().application.getUrlForApp('wazuh-fleet', {
                    path: `#/agents/${agent?.agent.id}`,
                  })}
                  target='_blank'
                >
                  {agent?.agent.name}
                </EuiLink>
              </h2>
            </EuiTitle>
          </EuiFlyoutHeader>
          <EuiFlyoutBody>
            <EuiText>
              <AgentResume agent={agent} />
            </EuiText>
          </EuiFlyoutBody>
        </EuiFlyout>
      ) : null}
    </>
  );
};
