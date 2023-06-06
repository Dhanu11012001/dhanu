"use strict";exports.id=689,exports.ids=[689],exports.modules={2502:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},8128:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(2502),exports),__exportStar(__webpack_require__(6903),exports),__exportStar(__webpack_require__(2041),exports)},6903:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.RequestLightClient=void 0;const clients_1=__webpack_require__(6502);class RequestLightClient extends clients_1.AbstractCachedRequest{logger;options;xhr;constructor(xhr,requestOptions,requestLogger){super(requestOptions.caching),this.logger=requestLogger,this.options=requestOptions,this.xhr=xhr}clearCache(){this.cache.clear()}async request(method,baseUrl,query={},headers={}){const url=clients_1.UrlHelpers.createUrl(baseUrl,query),cacheKey=method+"_"+url;if(this.cache.cachingOpts.duration>0&&!1===this.cache.hasExpired(cacheKey)){const cachedResp=this.cache.get(cacheKey);if(cachedResp.rejected)throw cachedResp;return cachedResp}try{const response=await this.xhr({url,type:method,headers,strictSSL:this.options.http.strictSSL});return this.createCachedResponse(cacheKey,response.status,response.responseText,!1)}catch(error){const errorResponse=error;throw this.createCachedResponse(cacheKey,errorResponse.status,errorResponse.responseText,!0)}}}exports.RequestLightClient=RequestLightClient},2041:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createJsonClient=exports.createHttpClient=void 0;const clients_1=__webpack_require__(6502),RequireLight=__importStar(__webpack_require__(6283)),requestLightClient_1=__webpack_require__(6903);function createHttpClient(options,logger){return new requestLightClient_1.RequestLightClient(RequireLight.xhr,options,logger)}exports.createHttpClient=createHttpClient,exports.createJsonClient=function(options,logger){return new clients_1.JsonHttpClient(createHttpClient(options,logger))}},7689:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)},__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpmUtils=void 0,__exportStar(__webpack_require__(3755),exports),__exportStar(__webpack_require__(9787),exports),__exportStar(__webpack_require__(5050),exports),__exportStar(__webpack_require__(833),exports),__exportStar(__webpack_require__(9541),exports),__exportStar(__webpack_require__(6568),exports),__exportStar(__webpack_require__(7377),exports),__exportStar(__webpack_require__(906),exports),__exportStar(__webpack_require__(4085),exports),__exportStar(__webpack_require__(2675),exports),exports.NpmUtils=__importStar(__webpack_require__(3813)),__exportStar(__webpack_require__(8060),exports)},5050:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.GitHubClient=void 0;const clients_1=__webpack_require__(6502),packages_1=__webpack_require__(7074),suggestions_1=__webpack_require__(804),semver_1=__importDefault(__webpack_require__(912)),defaultHeaders={accept:"application/vnd.github.v3+json","user-agent":"vscode-contrib/vscode-versionlens"};exports.GitHubClient=class{constructor(config,jsonClient,logger){this.config=config,this.jsonClient=jsonClient,this.logger=logger}config;logger;jsonClient;fetchGithub(npaSpec){const{validRange}=semver_1.default;return npaSpec.gitRange?this.fetchTags(npaSpec):validRange(npaSpec.gitCommittish,packages_1.VersionUtils.loosePrereleases)?(npaSpec.gitRange=npaSpec.gitCommittish,this.fetchTags(npaSpec)):this.fetchCommits(npaSpec)}async fetchTags(npaSpec){const{user,project}=npaSpec.hosted,tagsRepoUrl=`https://api.github.com/repos/${user}/${project}/tags`,headers=this.getHeaders(),clientResponse=await this.jsonClient.request(clients_1.HttpClientRequestMethods.get,tagsRepoUrl,{},headers),{compareLoose}=semver_1.default,rawVersions=clientResponse.data.map((tag=>tag.name)),allVersions=packages_1.VersionUtils.filterSemverVersions(rawVersions).sort(compareLoose),source=packages_1.PackageClientSourceType.Github,type=npaSpec.gitRange?packages_1.PackageVersionType.Range:packages_1.PackageVersionType.Version,versionRange=npaSpec.gitRange,resolved={name:project,version:versionRange},{releases,prereleases}=packages_1.VersionUtils.splitReleasesFromArray(allVersions,this.config.prereleaseTagFilter),suggestions=(0,suggestions_1.createSuggestions)(versionRange,releases,prereleases);return{source,responseStatus:{source:clientResponse.source,status:clientResponse.status},type,resolved,suggestions}}async fetchCommits(npaSpec){const{user,project}=npaSpec.hosted,commitsRepoUrl=`https://api.github.com/repos/${user}/${project}/commits`,headers=this.getHeaders(),clientResponse=await this.jsonClient.request(clients_1.HttpClientRequestMethods.get,commitsRepoUrl,{},headers),commits=clientResponse.data.map((commit=>commit.sha)),source=packages_1.PackageClientSourceType.Github,type=packages_1.PackageVersionType.Committish,versionRange=npaSpec.gitCommittish;if(0===commits.length)return packages_1.ClientResponseFactory.create(packages_1.PackageClientSourceType.Github,clientResponse,[suggestions_1.SuggestionFactory.createNotFound()]);const commitIndex=commits.findIndex((commit=>commit.indexOf(versionRange)>-1)),latestCommit=commits[commits.length-1].substr(0,8),isLatest=versionRange===latestCommit,resolved={name:project,version:versionRange},suggestions=[];return-1===commitIndex?suggestions.push(suggestions_1.SuggestionFactory.createNoMatch(),suggestions_1.SuggestionFactory.createLatest(latestCommit)):isLatest?suggestions.push(suggestions_1.SuggestionFactory.createMatchesLatest(versionRange)):commitIndex>0&&suggestions.push(suggestions_1.SuggestionFactory.createFixedStatus(versionRange),suggestions_1.SuggestionFactory.createLatest(latestCommit)),{source,responseStatus:{source:clientResponse.source,status:clientResponse.status},type,resolved,suggestions,gitSpec:npaSpec.saveSpec}}getHeaders(){const userHeaders={};return this.config.github.accessToken&&this.config.github.accessToken.length>0&&(userHeaders.authorization=`token ${this.config.github.accessToken}`),Object.assign({},userHeaders,defaultHeaders)}}},833:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpmPackageClient=void 0;const clients_1=__webpack_require__(6502),packages_1=__webpack_require__(7074),suggestions_1=__webpack_require__(804),npm_package_arg_1=__importDefault(__webpack_require__(9591)),PackageFactory=__importStar(__webpack_require__(6568)),npaSpec_1=__webpack_require__(7377),NpmUtils=__importStar(__webpack_require__(3813));exports.NpmPackageClient=class{logger;config;pacoteClient;githubClient;constructor(config,pacoteClient,githubClient,logger){this.config=config,this.pacoteClient=pacoteClient,this.githubClient=githubClient,this.logger=logger}fetchPackage(request){let source;const requestedPackage=request.dependency.package;return new Promise(((resolve,reject)=>{let npaSpec;try{npaSpec=npm_package_arg_1.default.resolve(requestedPackage.name,requestedPackage.version,requestedPackage.path)}catch(error){return reject(NpmUtils.convertNpmErrorToResponse(error,clients_1.ClientResponseSource.local))}return npaSpec.type===npaSpec_1.NpaTypes.Directory||npaSpec.type===npaSpec_1.NpaTypes.File?(source=packages_1.PackageClientSourceType.Directory,resolve(PackageFactory.createDirectory(requestedPackage,packages_1.ClientResponseFactory.createResponseStatus(clients_1.ClientResponseSource.local,200),npaSpec))):npaSpec.type===npaSpec_1.NpaTypes.Git?(source=packages_1.PackageClientSourceType.Git,npaSpec.hosted?npaSpec.gitCommittish||"shortcut"===npaSpec.hosted.default?(source=packages_1.PackageClientSourceType.Github,resolve(this.githubClient.fetchGithub(npaSpec))):resolve(packages_1.ClientResponseFactory.createFixed(packages_1.PackageClientSourceType.Git,packages_1.ClientResponseFactory.createResponseStatus(clients_1.ClientResponseSource.local,0),packages_1.PackageVersionType.Committish,"git repository")):reject({status:"EUNSUPPORTEDPROTOCOL",data:"Git url could not be resolved",source:clients_1.ClientResponseSource.local})):(source=packages_1.PackageClientSourceType.Registry,resolve(this.pacoteClient.fetchPackage(request,npaSpec)))})).catch((response=>{this.logger.debug("Caught exception from %s: %O",source,response),response.data||(response=NpmUtils.convertNpmErrorToResponse(response,clients_1.ClientResponseSource.remote));const status=response.status&&!Number.isInteger(response.status)&&response.status.startsWith("E")?response.status.substr(1):response.status;let suggestions;return suggestions="CONNREFUSED"==status?[suggestions_1.SuggestionFactory.createConnectionRefused()]:"CONNRESET"==status?[suggestions_1.SuggestionFactory.createConnectionReset()]:"UNSUPPORTEDPROTOCOL"==status||"Not implemented yet"==response.data?[suggestions_1.SuggestionFactory.createNotSupported()]:"INVALIDTAGNAME"==status||response.data.includes("Invalid comparator:")?[suggestions_1.SuggestionFactory.createInvalid(""),suggestions_1.SuggestionFactory.createLatest()]:"INVALIDPACKAGENAME"==status?[suggestions_1.SuggestionFactory.createInvalid("")]:128==status?[suggestions_1.SuggestionFactory.createNotFound()]:[suggestions_1.SuggestionFactory.createFromHttpStatus(status)],null===suggestions?Promise.reject(response):packages_1.ClientResponseFactory.create(source,packages_1.ClientResponseFactory.createResponseStatus(response.source,response.status),suggestions)}))}}},9541:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result},__importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.PacoteClient=void 0;const clients_1=__webpack_require__(6502),packages_1=__webpack_require__(7074),suggestions_1=__webpack_require__(804),semver_1=__importDefault(__webpack_require__(912)),npaSpec_1=__webpack_require__(7377),NpmUtils=__importStar(__webpack_require__(3813));class PacoteClient extends clients_1.AbstractCachedRequest{constructor(pacote,npmCliConfig,config,logger){super(config.caching),this.pacote=pacote,this.NpmCliConfig=npmCliConfig,this.config=config,this.logger=logger}config;logger;pacote;NpmCliConfig;async fetchPackage(request,npaSpec){const requestedPackage=request.dependency.package,pacoteOpts=await NpmUtils.createPacoteOptions(request.clientData.projectPath,requestedPackage,this.NpmCliConfig),response=await this.request(requestedPackage,npaSpec,pacoteOpts),{compareLoose}=semver_1.default,type=npaSpec.type;let versionRange=type===packages_1.PackageVersionType.Alias?npaSpec.subSpec.rawSpec:npaSpec.rawSpec;const resolved={name:type===packages_1.PackageVersionType.Alias?npaSpec.subSpec.name:npaSpec.name,version:versionRange},responseStatus={source:response.source,status:response.status},packumentResponse=response.data,rawVersions=Object.keys(packumentResponse.versions||{}).sort(compareLoose);let{releases,prereleases}=packages_1.VersionUtils.splitReleasesFromArray(rawVersions,this.config.prereleaseTagFilter);const distTags=packumentResponse["dist-tags"]||{},latestTaggedVersion=distTags.latest;latestTaggedVersion&&(releases=packages_1.VersionUtils.lteFromArray(releases,latestTaggedVersion));const suggestLatestVersion=latestTaggedVersion||(releases.length>0?releases[releases.length-1]:null);if(npaSpec.type===npaSpec_1.NpaTypes.Tag&&(versionRange=distTags[requestedPackage.version],!versionRange))return packages_1.ClientResponseFactory.createNoMatch(packages_1.PackageClientSourceType.Registry,type,responseStatus,suggestLatestVersion);const suggestions=(0,suggestions_1.createSuggestions)(versionRange,releases,prereleases,suggestLatestVersion);return{source:packages_1.PackageClientSourceType.Registry,responseStatus,type,resolved,suggestions}}async request(requestedPackage,npaSpec,options){const cacheKey=this.getCacheKey(requestedPackage);if(this.cache.cachingOpts.duration>0&&!1===this.cache.hasExpired(cacheKey)){this.logger.debug("Fetching from cache using key: %s",cacheKey);const cachedResp=this.cache.get(cacheKey);if(cachedResp.rejected)throw cachedResp;return cachedResp}const before=new Date;try{const packumentResponse=await this.pacote.packument(npaSpec,{before,...options});return this.createCachedResponse(cacheKey,200,packumentResponse,!1)}catch(error){throw this.createCachedResponse(cacheKey,error.code,error.message,!0)}}getCacheKey(pkg){return`${pkg.name}@${pkg.version}_${pkg.path}`}}exports.PacoteClient=PacoteClient},2230:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GitHubContributions=void 0,function(GitHubContributions){GitHubContributions.AccessToken="accessToken"}(exports.GitHubContributions||(exports.GitHubContributions={}))},3755:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpmContributions=void 0,function(NpmContributions){NpmContributions.Caching="npm.caching",NpmContributions.Http="npm.http",NpmContributions.Github="npm.github",NpmContributions.DependencyProperties="npm.dependencyProperties",NpmContributions.FilePatterns="npm.files",NpmContributions.OnSaveChangesTask="npm.onSaveChanges",NpmContributions.PrereleaseTagFilter="npm.prereleaseTagFilter"}(exports.NpmContributions||(exports.NpmContributions={}))},9787:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},6568:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.createDirectory=exports.fileDependencyRegex=void 0;const packages_1=__webpack_require__(7074),suggestions_1=__webpack_require__(804);exports.fileDependencyRegex=/^file:(.*)$/,exports.createDirectory=function(requested,responseStatus,npaSpec){const fileRegExpResult=exports.fileDependencyRegex.exec(requested.version);if(!fileRegExpResult)return packages_1.ClientResponseFactory.createInvalidVersion(responseStatus,npaSpec.type);const source=packages_1.PackageClientSourceType.Directory,type=packages_1.PackageVersionType.Version,resolved={name:npaSpec.name,version:fileRegExpResult[1]};return{source,type,responseStatus,resolved,suggestions:[{name:"file://",version:resolved.version,flags:suggestions_1.SuggestionFlags.release}]}}},7377:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpaTypes=void 0,function(NpaTypes){NpaTypes.Git="git",NpaTypes.Remote="remote",NpaTypes.File="file",NpaTypes.Directory="directory",NpaTypes.Tag="tag",NpaTypes.Version="version",NpaTypes.Range="range",NpaTypes.Alias="alias"}(exports.NpaTypes||(exports.NpaTypes={}))},4085:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpmConfig=void 0;const abstractProviderConfig_1=__webpack_require__(5141),eNpmContributions_1=__webpack_require__(3755);class NpmConfig extends abstractProviderConfig_1.AbstractProviderConfig{constructor(config,caching,http,github){super("npm",config,caching,http),this.github=github}github;get fileMatcher(){return{language:"json",scheme:"file",pattern:this.filePatterns}}get filePatterns(){return this.config.get(eNpmContributions_1.NpmContributions.FilePatterns)}get dependencyProperties(){return this.config.get(eNpmContributions_1.NpmContributions.DependencyProperties)}get onSaveChangesTask(){return this.config.get(eNpmContributions_1.NpmContributions.OnSaveChangesTask)}get prereleaseTagFilter(){return this.config.get(eNpmContributions_1.NpmContributions.PrereleaseTagFilter)}}exports.NpmConfig=NpmConfig},8060:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.configureContainer=void 0;const serviceUtils_1=__webpack_require__(9976);exports.configureContainer=async function(serviceProvider,services){return(0,serviceUtils_1.addCachingOptions)(services),(0,serviceUtils_1.addHttpOptions)(services),(0,serviceUtils_1.addGithubOptions)(services),(0,serviceUtils_1.addNpmConfig)(services),(0,serviceUtils_1.addJsonClient)(services),(0,serviceUtils_1.addGitHubClient)(services),(0,serviceUtils_1.addPacoteClient)(services),(0,serviceUtils_1.addNpmPackageClient)(services),(0,serviceUtils_1.addSuggestionProvider)(services),await services.buildChild("npm",serviceProvider)}},2675:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NpmSuggestionProvider=void 0;const packages_1=__webpack_require__(7074),providers_1=__webpack_require__(6424),npmUtils_1=__webpack_require__(3813),complexTypeHandlers={version:packages_1.createVersionDescFromJsonNode};class NpmSuggestionProvider extends providers_1.SuggestionProvider{constructor(client,logger){super(client,logger),this.config=client.config,this.suggestionReplaceFn=npmUtils_1.npmReplaceVersion}config;suggestionReplaceFn;clearCache(){this.client.pacoteClient.cache.clear(),this.client.githubClient.jsonClient.clearCache()}parseDependencies(packagePath,packageText){const options={includePropNames:this.config.dependencyProperties,complexTypeHandlers},packageDescriptors=(0,packages_1.extractPackageDependenciesFromJson)(packageText,options),packageDependencies=[];for(const packageDesc of packageDescriptors){let name=packageDesc.name;const atIndex=name.indexOf("@");if(atIndex>0&&(name=name.slice(0,atIndex)),packageDesc.hasType(packages_1.PackageDescriptorType.version)){const versionType=packageDesc.getType(packages_1.PackageDescriptorType.version);packageDependencies.push(new packages_1.PackageDependency((0,packages_1.createPackageResource)(name,versionType.version,packagePath),packageDesc.nameRange,versionType.versionRange))}else;}return packageDependencies}async preFetchSuggestions(projectPath,packagePath){return this.config.github.accessToken&&this.config.github.accessToken.length>0&&this.config.github.defrost(),{projectPath}}}exports.NpmSuggestionProvider=NpmSuggestionProvider},3813:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createPacoteOptions=exports.getDotEnv=exports.resolveDotFilePath=exports.convertNpmErrorToResponse=exports.npmReplaceVersion=void 0;const packages_1=__webpack_require__(7074),utils_1=__webpack_require__(7130),dotenv_1=__importDefault(__webpack_require__(5142)),node_os_1=__webpack_require__(612),node_path_1=__webpack_require__(9411);async function resolveDotFilePath(dotFileName,cwds){for(const cwd of cwds){const checkPath=(0,node_path_1.resolve)(cwd,dotFileName);if(await(0,utils_1.fileExists)(checkPath))return checkPath}return""}async function getDotEnv(cwds){const envPath=await resolveDotFilePath(".env",cwds);return 0===envPath.length?{}:dotenv_1.default.parse(await(0,utils_1.readFile)(envPath))}exports.npmReplaceVersion=function(packageInfo,newVersion){return packageInfo.source===packages_1.PackageClientSourceType.Github?function(packageInfo,newVersion){return packageInfo.requested.version.replace(packageInfo.resolved.version,newVersion)}(packageInfo,newVersion):packageInfo.type===packages_1.PackageVersionType.Alias?function(packageInfo,newVersion){const preservedLeadingVersion=packages_1.VersionUtils.formatWithExistingLeading(packageInfo.requested.version,newVersion);return`npm:${packageInfo.resolved.name}@${preservedLeadingVersion}`}(packageInfo,newVersion):packages_1.VersionUtils.formatWithExistingLeading(packageInfo.requested.version,newVersion)},exports.convertNpmErrorToResponse=function(error,source){return{source,status:error.code,data:error.message}},exports.resolveDotFilePath=resolveDotFilePath,exports.getDotEnv=getDotEnv,exports.createPacoteOptions=async function(projectPath,requestedPackage,NpmCliConfig){const resolveDotFilePaths=[requestedPackage.path,projectPath],npmRcFilePath=await resolveDotFilePath(".npmrc",resolveDotFilePaths),hasNpmRcFile=npmRcFilePath.length>0,userConfigPath=(0,node_path_1.resolve)((0,node_os_1.homedir)(),".npmrc"),npmConfig=new NpmCliConfig({shorthands:{},definitions:{},npmPath:requestedPackage.path,cwd:hasNpmRcFile?npmRcFilePath:requestedPackage.path,argv:["","",`--userconfig=${userConfigPath}`],env:hasNpmRcFile?await getDotEnv(resolveDotFilePaths):{}});return await npmConfig.load(),npmConfig.list.reduce(((memo,list)=>({...memo,...list})),{cwd:requestedPackage.path})}},906:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GitHubOptions=void 0;const configuration_1=__webpack_require__(605),eGitHubContributions_1=__webpack_require__(2230);class GitHubOptions extends configuration_1.OptionsWithFallback{constructor(config,section,fallbackSection=null){super(config,section,fallbackSection)}get accessToken(){return this.getOrDefault(eGitHubContributions_1.GitHubContributions.AccessToken,null)}}exports.GitHubOptions=GitHubOptions},9976:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.addSuggestionProvider=exports.addNpmPackageClient=exports.addPacoteClient=exports.addGitHubClient=exports.addJsonClient=exports.addNpmConfig=exports.addGithubOptions=exports.addHttpOptions=exports.addCachingOptions=void 0;const config_1=__importDefault(__webpack_require__(9857)),clients_1=__webpack_require__(6502),utils_1=__webpack_require__(7130),http_1=__webpack_require__(8128),pacote_1=__importDefault(__webpack_require__(9117)),githubClient_1=__webpack_require__(5050),npmPackageClient_1=__webpack_require__(833),pacoteClient_1=__webpack_require__(9541),eNpmContributions_1=__webpack_require__(3755),npmConfig_1=__webpack_require__(4085),npmSuggestionProvider_1=__webpack_require__(2675),githubOptions_1=__webpack_require__(906);exports.addCachingOptions=function(services){services.addSingleton((0,utils_1.nameOf)().npmCachingOpts,(container=>new clients_1.CachingOptions(container.appConfig,eNpmContributions_1.NpmContributions.Caching,"caching")))},exports.addHttpOptions=function(services){services.addSingleton((0,utils_1.nameOf)().npmHttpOpts,(container=>new clients_1.HttpOptions(container.appConfig,eNpmContributions_1.NpmContributions.Http,"http")))},exports.addGithubOptions=function(services){services.addSingleton((0,utils_1.nameOf)().npmGitHubOpts,(container=>new githubOptions_1.GitHubOptions(container.appConfig,eNpmContributions_1.NpmContributions.Github,"github")))},exports.addNpmConfig=function(services){services.addSingleton((0,utils_1.nameOf)().npmConfig,(container=>new npmConfig_1.NpmConfig(container.appConfig,container.npmCachingOpts,container.npmHttpOpts,container.npmGitHubOpts)))},exports.addJsonClient=function(services){services.addSingleton((0,utils_1.nameOf)().githubJsonClient,(container=>(0,http_1.createJsonClient)({caching:container.npmCachingOpts,http:container.npmHttpOpts},container.logger.child({namespace:"npm request"}))))},exports.addGitHubClient=function(services){services.addSingleton((0,utils_1.nameOf)().githubClient,(container=>new githubClient_1.GitHubClient(container.npmConfig,container.githubJsonClient,container.logger.child({namespace:"npm github"}))))},exports.addPacoteClient=function(services){services.addSingleton((0,utils_1.nameOf)().pacoteClient,(container=>new pacoteClient_1.PacoteClient(pacote_1.default,config_1.default,container.npmConfig,container.logger.child({namespace:"npm pacote"}))))},exports.addNpmPackageClient=function(services){services.addSingleton((0,utils_1.nameOf)().npmClient,(container=>new npmPackageClient_1.NpmPackageClient(container.npmConfig,container.pacoteClient,container.githubClient,container.logger.child({namespace:"npm client"}))))},exports.addSuggestionProvider=function(services){services.addScoped((0,utils_1.nameOf)().suggestionProvider,(container=>new npmSuggestionProvider_1.NpmSuggestionProvider(container.npmClient,container.logger.child({namespace:"npm provider"}))))}}};
//# sourceMappingURL=689.bundle.js.map