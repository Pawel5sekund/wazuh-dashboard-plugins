import React, { Component, Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	EuiCard,
	EuiIcon,
	EuiPanel,
	EuiFlexItem,
	EuiFlexGroup,
	EuiSpacer,
	EuiText,
	EuiFlexGrid,
	EuiButtonEmpty,
	EuiTitle,
	EuiHealth,
	EuiHorizontalRule,
	EuiPage,
	EuiButton,
	EuiPopover,
	WzTextWithTooltipIfTruncated,
	EuiSelect,
	EuiLoadingChart,
	EuiBasicTable,
	WzButtonPermissions,
	EuiToolTip,
	EuiButtonIcon,
	EuiEmptyPrompt,
	EuiPageBody
} from '@elastic/eui';
import { useSelector, useDispatch } from 'react-redux';
import { withReduxProvider, withGlobalBreadcrumb, withUserAuthorizationPrompt } from '../../../../components/common/hocs';
import { toggleAddSuricata, savePluginToEdit, deleteService, syncRuleset, changeServiceStatus } from '../../../../redux/actions/nidsActions';

export const ZeekStatusDetailsTable = () => {
    const dispatch = useDispatch();
	const nodeDetail = useSelector(state => state.nidsReducers.nodeDetail);
	const nodePlugins = useSelector(state => state.nidsReducers.nodePlugins);
	const zeekData = useSelector(state => state.nidsReducers.zeekData);

	const [isLoading, setIsLoading] = useState(false)
	const [plugins, setPlugins] = useState([])
	
    const title = headRender();
    
    useEffect(() => { 
		formatZeek(zeekData)
	}, []);
	
	function formatZeek(zeekData) {
        var data = [];
        [...Object.keys(zeekData.nodes).map((item) => { 
            data.push({...zeekData.nodes[item], nameHost: zeekData.nodes[item].name+"("+zeekData.nodes[item].host+")"})
        })];          
		setPlugins(data)
    }
    
    
	function headRender() {
		return (
			<div>
				<EuiFlexGroup>

					<EuiFlexItem>
						<EuiFlexGroup>
							<EuiFlexItem>
								<EuiTitle size={'s'} style={{ padding: '6px 0px' }}>
									<h2>Status details</h2>
								</EuiTitle>
							</EuiFlexItem>
						</EuiFlexGroup>
					</EuiFlexItem>
				</EuiFlexGroup>
				<EuiSpacer size="xs" />
			</div>
		);
    }
    
    function columns() {
		return [
			{
				field: 'nameHost',
				name: 'Name(host)',
				sortable: true,
				// width: '20%',
				// truncateText: true
			},
			{
				field: 'status',
				name: 'Status',
				// width: '15%',
				// truncateText: true,
				sortable: true
			},
			{
				field: 'type',
				name: 'Type',
				// width: '15%',
				// truncateText: true,
				sortable: true
			},
			{
				field: 'pid',
				name: 'PID',
				// width: '15%',
				// truncateText: true,
				sortable: true
			},
			{
				field: 'started',
				name: 'Started',
				// width: '15%',
				// truncateText: true,
				sortable: true
			},
		];
    }
    
    return (
		<div>
			<EuiSpacer size="m" />
			<EuiPanel paddingSize="m">
				{title}
				<EuiFlexGroup>
					<EuiFlexItem>
						<EuiBasicTable
							items={plugins}
							itemId="uuid"
							 columns={columns()}
							loading={isLoading}
						/>
					</EuiFlexItem>
				</EuiFlexGroup>
			</EuiPanel>
		</div>
    )
}
