"use strict";
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionConfig = void 0;
const Constants = require("../constants/constants");
const LocalizedConstants = require("../constants/localizedConstants");
const Utils = require("../models/utils");
const vscodeWrapper_1 = require("../controllers/vscodeWrapper");
/**
 * Implements connection profile file storage.
 */
class ConnectionConfig {
    /**
     * Constructor.
     */
    constructor(_vscodeWrapper) {
        this._vscodeWrapper = _vscodeWrapper;
        if (!this.vscodeWrapper) {
            this.vscodeWrapper = new vscodeWrapper_1.default();
        }
    }
    get vscodeWrapper() {
        return this._vscodeWrapper;
    }
    set vscodeWrapper(value) {
        this._vscodeWrapper = value;
    }
    /**
     * Add a new connection to the connection config.
     */
    addConnection(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            let profiles = this.getProfilesFromSettings();
            // Remove the profile if already set
            profiles = profiles.filter(value => !Utils.isSameProfile(value, profile));
            profiles.push(profile);
            return yield this.writeProfilesToSettings(profiles);
        });
    }
    /**
     * Get a list of all connections in the connection config. Connections returned
     * are sorted first by whether they were found in the user/workspace settings,
     * and next alphabetically by profile/server name.
     */
    getConnections(getWorkspaceConnections) {
        let profiles = [];
        let compareProfileFunc = (a, b) => {
            // Sort by profile name if available, otherwise fall back to server name or connection string
            let nameA = a.profileName ? a.profileName : (a.server ? a.server : a.connectionString);
            let nameB = b.profileName ? b.profileName : (b.server ? b.server : b.connectionString);
            return nameA.localeCompare(nameB);
        };
        // Read from user settings
        let userProfiles = this.getProfilesFromSettings();
        userProfiles.sort(compareProfileFunc);
        profiles = profiles.concat(userProfiles);
        if (getWorkspaceConnections) {
            // Read from workspace settings
            let workspaceProfiles = this.getProfilesFromSettings(false);
            workspaceProfiles.sort(compareProfileFunc);
            profiles = profiles.concat(workspaceProfiles);
        }
        if (profiles.length > 0) {
            profiles = profiles.filter(conn => {
                // filter any connection missing a connection string and server name or the sample that's shown by default
                return conn.connectionString || !!(conn.server) && conn.server !== LocalizedConstants.SampleServerName;
            });
        }
        return profiles;
    }
    /**
     * Remove an existing connection from the connection config.
     */
    removeConnection(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            let profiles = this.getProfilesFromSettings();
            // Remove the profile if already set
            let found = false;
            profiles = profiles.filter(value => {
                if (Utils.isSameProfile(value, profile)) {
                    // remove just this profile
                    found = true;
                    return false;
                }
                else {
                    return true;
                }
            });
            yield this.writeProfilesToSettings(profiles);
            return found;
        });
    }
    /**
     * Get all profiles from the settings.
     * This is public for testing only.
     * @param global When `true` profiles come from user settings, otherwise from workspace settings
     * @returns the set of connection profiles found in the settings.
     */
    getProfilesFromSettings(global = true) {
        let configuration = this._vscodeWrapper.getConfiguration(Constants.extensionName, this._vscodeWrapper.activeTextEditorUri);
        let profiles = [];
        let configValue = configuration.inspect(Constants.connectionsArrayName);
        if (global) {
            profiles = configValue.globalValue;
        }
        else {
            profiles = configValue.workspaceValue;
            if (profiles !== undefined) {
                profiles = profiles.concat(configValue.workspaceFolderValue || []);
            }
            else {
                profiles = configValue.workspaceFolderValue;
            }
        }
        if (profiles === undefined) {
            profiles = [];
        }
        return profiles;
    }
    /**
     * Replace existing profiles in the user settings with a new set of profiles.
     * @param profiles the set of profiles to insert into the settings file.
     */
    writeProfilesToSettings(profiles) {
        return __awaiter(this, void 0, void 0, function* () {
            // Save the file
            yield this._vscodeWrapper.setConfiguration(Constants.extensionName, Constants.connectionsArrayName, profiles);
        });
    }
}
exports.ConnectionConfig = ConnectionConfig;

//# sourceMappingURL=connectionconfig.js.map
