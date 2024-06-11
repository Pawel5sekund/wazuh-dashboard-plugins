/*
 * Wazuh app - React test for Ruleset component.
 *
 * Copyright (C) 2015-2022 Wazuh, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 *
 */

import React from 'react';
import WzRuleset from '../ruleset/main-ruleset';
import { renderWithProviders } from '../../../../../redux/render-with-redux-provider';

jest.mock('../../../../../kibana-services', () => ({
  getHttp: () => ({
    basePath: {
      prepend: str => str,
    },
  }),
  getUiSettings: () => ({
    get: (setting: string): any => {
      if (setting === 'theme:darkMode') {
        return false;
      }
    },
  }),
}));

describe('Ruleset component', () => {
  it('renders correctly to match the snapshot', () => {
    const logtestProps = '';
    const clusterStatus = '';
    const { container } = renderWithProviders(
      <WzRuleset logtestProps={logtestProps} clusterStatus={clusterStatus} />,
    );
    expect(container).toMatchSnapshot();
  });
});
