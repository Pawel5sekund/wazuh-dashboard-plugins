import React, { useState, useEffect } from 'react';
import { FormattedMessage, I18nProvider } from '@osd/i18n/react';
import {
  EuiPage,
  EuiPageBody,
  EuiSideNav,
  EuiPageSideBar,
  EuiPanel,
} from '@elastic/eui';
import { Router, Route, Switch, Redirect, useParams } from 'react-router-dom';
import { getCore, getHistory } from '../plugin-services';
import { IntegrationOverview } from './integretions/overview';
import { IntegrationView } from './integretions/integration';

interface ViewInterface {
  name: string;
  id: string;
  render: () => React.ReactNode;
  renderDetails?: () => React.ReactNode;
}

const views: ViewInterface[] = [
  {
    name: 'Integrations',
    id: 'integrations',
    render: () => <IntegrationOverview />,
    renderDetails: () => <IntegrationView />,
  },
  {
    name: 'Rules',
    id: 'rules',
    render: () => <div>Rules</div>,
  },
  {
    name: 'Decoders',
    id: 'decoders',
    render: () => <div>Decoders</div>,
  },
  {
    name: 'KVDB',
    id: 'kvdb',
    render: () => <div>KVDBs</div>,
  },
];

export const WazuhSecurityPoliciesApp = () => {
  const history = getHistory();
  const [currentTab, setCurrentTab] = useState('');

  useEffect(() => {
    setCurrentTab(history.location.pathname);
  }, []);

  const sideNav = [
    {
      name: 'Ruleset',
      id: 'wazuhRuleset',
      items: views.map(item => ({
        id: item.id,
        name: item.name,
        onClick: () => {
          history.push(`/${item.id}`);
          setCurrentTab(item.id);
        },
        isSelected:
          item.id === currentTab || history.location.pathname === `/${item.id}`,
      })),
    },
  ];

  // Render the application DOM.
  // Note that `navigation.ui.TopNavMenu` is a stateful component exported on the `navigation` plugin's start contract.
  return (
    <Router history={history}>
      <I18nProvider>
        <>
          <EuiPage paddingSize='m'>
            <EuiPageSideBar>
              <EuiSideNav aria-label='Ruleset' items={sideNav} />
            </EuiPageSideBar>
            <EuiPageBody component='main'>
              <EuiPanel
                paddingSize='none'
                color='transparent'
                hasShadow={false}
                hasBorder={false}
              >
                <Switch>
                  {views.map(view => [
                    view.renderDetails && (
                      <Route
                        key={`${view.id}-details`}
                        path={`/${view.id}/:id`}
                        component={() => {
                          const { id } = useParams();

                          getCore().chrome.setBreadcrumbs([
                            {
                              text: (
                                <FormattedMessage
                                  id={`wazuhSecurityPolicies.breadcrumbs.${view.id}`}
                                  defaultMessage={view.name}
                                />
                              ),
                              href: getCore().application.getUrlForApp(
                                'wazuhSecurityPolicies',
                                {
                                  path: `#/${view.id}`,
                                },
                              ),
                            },
                            {
                              className: 'osdBreadcrumbs',
                              text: id,
                            },
                          ]);

                          return view.renderDetails();
                        }}
                      />
                    ),
                    <Route
                      key={view.id}
                      path={`/${view.id}`}
                      component={() => {
                        getCore().chrome.setBreadcrumbs([
                          {
                            className: 'osdBreadcrumbs',
                            text: (
                              <FormattedMessage
                                id={`wazuhSecurityPolicies.breadcrumbs.${view.id}`}
                                defaultMessage={view.name}
                              />
                            ),
                          },
                        ]);

                        return view.render();
                      }}
                    />,
                  ])}
                  <Redirect to={`/${views[0].id}`} />
                </Switch>
              </EuiPanel>
            </EuiPageBody>
          </EuiPage>
        </>
      </I18nProvider>
    </Router>
  );
};
