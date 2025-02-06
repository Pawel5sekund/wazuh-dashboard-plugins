import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  WazuhFleetPluginSetup,
  WazuhFleetPluginStart,
} from './types';
import { FleetManagement } from './components';
import { setCore, setPlugins, setWazuhCore } from './plugin-services';
import { appSetup } from './application';

export class WazuhFleetPlugin
  implements Plugin<WazuhFleetPluginSetup, WazuhFleetPluginStart>
{
  public setup(core: CoreSetup, plugins): WazuhFleetPluginSetup {
    appSetup({
      registerApp: app => core.application.register(app),
    });

    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): WazuhFleetPluginStart {
    setCore(core);
    setPlugins(plugins);
    setWazuhCore(plugins.wazuhCore);

    return {
      FleetManagement,
    };
  }

  public stop() {}
}
