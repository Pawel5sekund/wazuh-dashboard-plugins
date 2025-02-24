import React, { useState } from 'react';
import {
  EuiModal,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiModalBody,
  EuiModalFooter,
  EuiButtonEmpty,
  EuiButton,
  EuiForm,
  EuiFormRow,
  EuiText,
  EuiCallOut,
} from '@elastic/eui';
import { IAgentResponse } from '../../../../../../common/types';
import { getAgents } from '../common/get-agents';
import { getAgentManagement } from '../../../../../plugin-services';
import { UpgradeAgentsModalResult } from './result';

export interface Result {
  successAgents?: [];
  errorMessage?: string;
  totalErrorAgents?: number;
  errorAgents?: [];
}

interface UpgradeAgentsModalProps {
  selectedAgents: IAgentResponse[];
  allAgentsSelected: boolean;
  params: any;
  onClose: () => void;
  reloadAgents: () => void;
}

export const UpgradeAgentsModal = ({
  selectedAgents,
  allAgentsSelected,
  params,
  onClose,
  reloadAgents,
}: UpgradeAgentsModalProps) => {
  const [finalAgents, setFinalAgents] = useState<IAgentResponse[]>([]);
  const [getAgentsStatus, setGetAgentsStatus] = useState('disabled');
  const [getAgentsError, setGetAgentsError] = useState();
  const [saveChangesStatus, setSaveChangesStatus] = useState('disabled');
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [result, setResult] = useState<Result>();
  const getArrayByProperty = (
    array: IAgentResponse[],
    propertyName: string,
  ): string[] => array.map(element => element[propertyName]);

  const handleOnSave = async () => {
    setGetAgentsStatus('loading');
    setIsResultVisible(true);

    let agents = selectedAgents;

    if (allAgentsSelected) {
      agents = await getAgents({
        params,
        setGetAgentsError,
        setGetAgentsStatus,
      });
    }

    if (!agents?.length) {
      return;
    }

    setGetAgentsStatus('complete');

    setFinalAgents(agents);

    setSaveChangesStatus('loading');

    const agentIds = getArrayByProperty(agents, '_id');

    try {
      const response = await getAgentManagement().upgrade({
        agentIds,
      });
      const { data, message } = response.data;
      const {
        affected_items: affectedItems,
        failed_items: failedItems,
        total_failed_items: totalFailedItems,
      } = data;

      setResult({
        successAgents: affectedItems,
        errorAgents: failedItems,
        errorMessage: message,
        totalErrorAgents: totalFailedItems,
      });

      setSaveChangesStatus('complete');
    } catch (error) {
      console.log(error);
      setResult({
        errorMessage: error.message,
        errorAgents: [
          {
            error: { message: error.message },
            id: agentIds,
          },
        ],
      });
      setSaveChangesStatus('danger');
    } finally {
      reloadAgents();
    }
  };

  const form = (
    <EuiForm component='form'>
      {allAgentsSelected ? (
        <EuiFormRow>
          <EuiCallOut
            color='warning'
            iconType='alert'
            title='The changes will be applied to all agents that match the filters set in the list'
          />
        </EuiFormRow>
      ) : (
        <EuiFormRow label='Selected agents'>
          <EuiText>{selectedAgents.length}</EuiText>
        </EuiFormRow>
      )}
    </EuiForm>
  );

  return (
    <EuiModal onClose={onClose}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>Upgrade agents</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>
        {isResultVisible ? (
          <UpgradeAgentsModalResult
            finalAgents={finalAgents}
            getAgentsStatus={getAgentsStatus}
            getAgentsError={getAgentsError}
            saveChangesStatus={saveChangesStatus}
            result={result}
          />
        ) : (
          form
        )}
      </EuiModalBody>
      <EuiModalFooter>
        {isResultVisible ? (
          <EuiButton
            onClick={onClose}
            fill
            disabled={
              getAgentsStatus === 'loading' || saveChangesStatus === 'loading'
            }
          >
            Close
          </EuiButton>
        ) : (
          <>
            <EuiButtonEmpty onClick={onClose}>Cancel</EuiButtonEmpty>
            <EuiButton onClick={handleOnSave} fill>
              Upgrade
            </EuiButton>
          </>
        )}
      </EuiModalFooter>
    </EuiModal>
  );
};
