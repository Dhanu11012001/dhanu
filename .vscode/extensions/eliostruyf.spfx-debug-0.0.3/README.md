# SharePoint Framework - Visual Studio Code Debug Configuration Extension

This Visual Studio Code extension can be used to add the required configuration for debugging your SharePoint Framework.

## Why this project?

When you want to debug your SharePoint Framework solutions, it requires a bit of configuration in order to get it working. With this extension you can automatically add the right debugging configuration.

![Add SPFx debugging configuration](https://github.com/estruyf/vscode-spfx-debug-config/raw/master/./assets/spfx-add-debugging.png)

The extension contains the configuration for the local and hosted workbench.

![SPFx debugging tasks](https://github.com/estruyf/vscode-spfx-debug-config/raw/master/./assets/spfx-debug-tasks.png)

When you already have configured something in the `launch.json` file, you can always add these configurations afterwards by clicking on **add configuration** and choosing the one you need:

![SPFx debugging configurations](https://github.com/estruyf/vscode-spfx-debug-config/raw/master/./assets/spfx-debug-configurations.png)

Since version `0.0.2`, the plugin supports SPFx extensions. The following snippets are available:
- SPFx: Local workbench
- SPFx: Hosted workbench
- SPFx: ApplicationCustomizer debug
- SPFx: FieldCustomizer debug
- SPFx: ListViewCommandSet debug

> **Info**: When no `launch.json` file is present, the moment you create a new configuration, the plugin will automatically check the SPFx extensions and do the right configuration for them.

## Changes

You can check the [change log](https://github.com/estruyf/vscode-spfx-debug-config/blob/master/./CHANGELOG.md) to get an overview of all the changes made to this extension.