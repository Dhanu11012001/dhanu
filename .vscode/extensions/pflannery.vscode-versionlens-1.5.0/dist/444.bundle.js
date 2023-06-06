"use strict";exports.id=444,exports.ids=[444],exports.modules={9279:module=>{module.exports={cmd:(input,doubleEscape)=>{if(!input.length)return'""';let result;if(/[ \t\n\v"]/.test(input)){result='"';for(let i=0;i<=input.length;++i){let slashCount=0;for(;"\\"===input[i];)++i,++slashCount;if(i===input.length){result+="\\".repeat(2*slashCount);break}'"'===input[i]?(result+="\\".repeat(2*slashCount+1),result+=input[i]):(result+="\\".repeat(slashCount),result+=input[i])}result+='"'}else result=input;return result=result.replace(/[ !%^&()<>|"]/g,"^$&"),doubleEscape&&(result=result.replace(/[ !%^&()<>|"]/g,"^$&")),result},sh:input=>{if(!input.length)return"''";if(!/[\t\n\r "#$&'()*;<>?\\`|~]/.test(input))return input;return`'${input.replace(/'/g,"'\\''")}'`.replace(/^(?:'')+(?!$)/,"").replace(/\\'''/g,"\\'")}}},2593:(module,__unused_webpack_exports,__webpack_require__)=>{const{spawn}=__webpack_require__(2081),os=__webpack_require__(2037),which=__webpack_require__(3926),escape=__webpack_require__(9279),promiseSpawn=(cmd,args,opts={},extra={})=>{if(opts.shell)return spawnWithShell(cmd,args,opts,extra);let proc;const p=new Promise(((res,rej)=>{proc=spawn(cmd,args,opts);const stdout=[],stderr=[],reject=er=>rej(Object.assign(er,{cmd,args,...stdioResult(stdout,stderr,opts),...extra}));proc.on("error",reject),proc.stdout&&(proc.stdout.on("data",(c=>stdout.push(c))).on("error",reject),proc.stdout.on("error",(er=>reject(er)))),proc.stderr&&(proc.stderr.on("data",(c=>stderr.push(c))).on("error",reject),proc.stderr.on("error",(er=>reject(er)))),proc.on("close",((code,signal)=>{const result={cmd,args,code,signal,...stdioResult(stdout,stderr,opts),...extra};code||signal?rej(Object.assign(new Error("command failed"),result)):res(result)}))}));return p.stdin=proc.stdin,p.process=proc,p},spawnWithShell=(cmd,args,opts,extra)=>{let command=opts.shell;!0===command&&(command="win32"===process.platform?process.env.ComSpec:"sh");const options={...opts,shell:!1},realArgs=[];let script=cmd;if(/(?:^|\\)cmd(?:\.exe)?$/i.test(command)){let pathToInitial,doubleEscape=!1,initialCmd="",insideQuotes=!1;for(let i=0;i<cmd.length;++i){const char=cmd.charAt(i);if(" "===char&&!insideQuotes)break;initialCmd+=char,'"'!==char&&"'"!==char||(insideQuotes=!insideQuotes)}try{pathToInitial=which.sync(initialCmd,{path:options.env&&options.env.PATH||process.env.PATH,pathext:options.env&&options.env.PATHEXT||process.env.PATHEXT}).toLowerCase()}catch(err){pathToInitial=initialCmd.toLowerCase()}doubleEscape=pathToInitial.endsWith(".cmd")||pathToInitial.endsWith(".bat");for(const arg of args)script+=` ${escape.cmd(arg,doubleEscape)}`;realArgs.push("/d","/s","/c",script),options.windowsVerbatimArguments=!0}else{for(const arg of args)script+=` ${escape.sh(arg)}`;realArgs.push("-c",script)}return promiseSpawn(command,realArgs,options,extra)};promiseSpawn.open=(_args,opts={},extra={})=>{const options={...opts,shell:!0},args=[].concat(_args);let platform=process.platform;"linux"===platform&&os.release().toLowerCase().includes("microsoft")&&(platform="win32");let command=options.command;return command||("win32"===platform?(options.shell=process.env.ComSpec,command='start ""'):command="darwin"===platform?"open":"xdg-open"),spawnWithShell(command,args,options,extra)};const isPipe=(stdio="pipe",fd)=>"pipe"===stdio||null===stdio||!!Array.isArray(stdio)&&isPipe(stdio[fd],fd),stdioResult=(stdout,stderr,{stdioString=!0,stdio})=>{const result={stdout:null,stderr:null};return isPipe(stdio,1)&&(result.stdout=Buffer.concat(stdout),stdioString&&(result.stdout=result.stdout.toString().trim())),isPipe(stdio,2)&&(result.stderr=Buffer.concat(stderr),stdioString&&(result.stderr=result.stderr.toString().trim())),result};module.exports=promiseSpawn},2502:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},8128:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(2502),exports),__exportStar(__webpack_require__(6903),exports),__exportStar(__webpack_require__(2041),exports)},6903:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.RequestLightClient=void 0;const clients_1=__webpack_require__(6502);class RequestLightClient extends clients_1.AbstractCachedRequest{logger;options;xhr;constructor(xhr,requestOptions,requestLogger){super(requestOptions.caching),this.logger=requestLogger,this.options=requestOptions,this.xhr=xhr}clearCache(){this.cache.clear()}async request(method,baseUrl,query={},headers={}){const url=clients_1.UrlHelpers.createUrl(baseUrl,query),cacheKey=method+"_"+url;if(this.cache.cachingOpts.duration>0&&!1===this.cache.hasExpired(cacheKey)){const cachedResp=this.cache.get(cacheKey);if(cachedResp.rejected)throw cachedResp;return cachedResp}try{const response=await this.xhr({url,type:method,headers,strictSSL:this.options.http.strictSSL});return this.createCachedResponse(cacheKey,response.status,response.responseText,!1)}catch(error){const errorResponse=error;throw this.createCachedResponse(cacheKey,errorResponse.status,errorResponse.responseText,!0)}}}exports.RequestLightClient=RequestLightClient},2041:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__setModuleDefault=this&&this.__setModuleDefault||(Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:!0,value:v})}:function(o,v){o.default=v}),__importStar=this&&this.__importStar||function(mod){if(mod&&mod.__esModule)return mod;var result={};if(null!=mod)for(var k in mod)"default"!==k&&Object.prototype.hasOwnProperty.call(mod,k)&&__createBinding(result,mod,k);return __setModuleDefault(result,mod),result};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createJsonClient=exports.createHttpClient=void 0;const clients_1=__webpack_require__(6502),RequireLight=__importStar(__webpack_require__(6283)),requestLightClient_1=__webpack_require__(6903);function createHttpClient(options,logger){return new requestLightClient_1.RequestLightClient(RequireLight.xhr,options,logger)}exports.createHttpClient=createHttpClient,exports.createJsonClient=function(options,logger){return new clients_1.JsonHttpClient(createHttpClient(options,logger))}},6421:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},7422:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(6421),exports),__exportStar(__webpack_require__(1493),exports),__exportStar(__webpack_require__(9398),exports)},1493:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.PromiseSpawnClient=void 0;const clients_1=__webpack_require__(6502);class PromiseSpawnClient extends clients_1.AbstractCachedRequest{constructor(promiseSpawnFn,processOpts,processLogger){super(processOpts),this.logger=processLogger,this.promiseSpawn=promiseSpawnFn}promiseSpawn;logger;clearCache(){this.cache.clear()}async request(cmd,args,cwd){const cacheKey=`${cmd} ${args.join(" ")}`;if(this.cache.cachingOpts.duration>0&&!1===this.cache.hasExpired(cacheKey)){this.logger.debug("cached - %s",cacheKey);const cachedResp=this.cache.get(cacheKey);if(cachedResp.rejected)throw cachedResp;return cachedResp}this.logger.debug("executing - %s",cacheKey);try{const result=await this.promiseSpawn(cmd,args,{cwd,stdioString:!0});return this.createCachedResponse(cacheKey,result.code,result.stdout,!1,clients_1.ClientResponseSource.local)}catch(error){throw this.createCachedResponse(cacheKey,error.code,error.message,!0,clients_1.ClientResponseSource.local)}}}exports.PromiseSpawnClient=PromiseSpawnClient},9398:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createProcessClient=void 0;const promise_spawn_1=__importDefault(__webpack_require__(2593)),promiseSpawnClient_1=__webpack_require__(1493);exports.createProcessClient=function(cachingOpts,logger){return new promiseSpawnClient_1.PromiseSpawnClient(promise_spawn_1.default,cachingOpts,logger)}},9444:function(__unused_webpack_module,exports,__webpack_require__){var __createBinding=this&&this.__createBinding||(Object.create?function(o,m,k,k2){void 0===k2&&(k2=k);var desc=Object.getOwnPropertyDescriptor(m,k);desc&&!("get"in desc?!m.__esModule:desc.writable||desc.configurable)||(desc={enumerable:!0,get:function(){return m[k]}}),Object.defineProperty(o,k2,desc)}:function(o,m,k,k2){void 0===k2&&(k2=k),o[k2]=m[k]}),__exportStar=this&&this.__exportStar||function(m,exports){for(var p in m)"default"===p||Object.prototype.hasOwnProperty.call(exports,p)||__createBinding(exports,m,p)};Object.defineProperty(exports,"__esModule",{value:!0}),__exportStar(__webpack_require__(4356),exports),__exportStar(__webpack_require__(2190),exports),__exportStar(__webpack_require__(4381),exports),__exportStar(__webpack_require__(3950),exports),__exportStar(__webpack_require__(517),exports),__exportStar(__webpack_require__(2185),exports),__exportStar(__webpack_require__(4234),exports),__exportStar(__webpack_require__(3751),exports),__exportStar(__webpack_require__(5736),exports),__exportStar(__webpack_require__(6044),exports),__exportStar(__webpack_require__(7830),exports),__exportStar(__webpack_require__(5146),exports)},4356:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DotNetCli=void 0;const clients_1=__webpack_require__(6502),utils_1=__webpack_require__(7130);exports.DotNetCli=class{constructor(config,client,logger){this.config=config,this.processClient=client,this.logger=logger}config;processClient;logger;async fetchSources(cwd){try{const result=await this.processClient.request("dotnet",["nuget","list","source","--format","short"],cwd),{data}=result;if(data.indexOf("error")>-1)return Promise.reject(result);if(0===data.length||-1===data.indexOf("E"))return[];const splitChar=data.indexOf(utils_1.CrLf)>0?utils_1.CrLf:utils_1.Lf;let lines=data.split(splitChar);""===lines[lines.length-1]&&lines.pop();const sources=function(lines){return lines.map((function(line){const enabled="E"===line.substring(0,1),machineWide="M"===line.substring(1,2),offset=machineWide?3:2,url=line.substring(offset);return{enabled,machineWide,url,protocol:clients_1.UrlHelpers.getProtocolFromUrl(url)}}))}(lines).filter((s=>s.enabled)),combinedSources=[...this.config.nuget.sources.map((function(url){const protocol=clients_1.UrlHelpers.getProtocolFromUrl(url);return{enabled:!0,machineWide:protocol===clients_1.UrlHelpers.RegistryProtocols.file,url,protocol}})),...sources];return this.logger.debug("package sources found: %s",combinedSources.map((x=>x.url))),combinedSources}catch(error){return this.logger.error("failed to get package sources: %s",error),this.logger.info("using fallback source: %s",this.config.fallbackNugetSource),[{enabled:!0,machineWide:!1,protocol:clients_1.UrlHelpers.RegistryProtocols.https,url:this.config.fallbackNugetSource}]}}}},2190:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NuGetPackageClient=void 0;const clients_1=__webpack_require__(6502),packages_1=__webpack_require__(7074),suggestions_1=__webpack_require__(804),dotnetUtils_1=__webpack_require__(5736);exports.NuGetPackageClient=class{constructor(config,client,logger){this.config=config,this.jsonClient=client,this.logger=logger}config;jsonClient;logger;async fetchPackage(request){const urls=request.clientData.serviceUrls,autoCompleteUrl=urls[request.attempt];try{return await this.createRemotePackageDocument(autoCompleteUrl,request)}catch(error){const errorResponse=error;if(this.logger.debug("Caught exception from %s: %O",packages_1.PackageClientSourceType.Registry,errorResponse),request.attempt++,404===errorResponse.status&&request.attempt<urls.length)return this.fetchPackage(request);const suggestion=suggestions_1.SuggestionFactory.createFromHttpStatus(errorResponse.status);return null!=suggestion?packages_1.ClientResponseFactory.create(packages_1.PackageClientSourceType.Registry,errorResponse,[suggestion]):Promise.reject(errorResponse)}}async createRemotePackageDocument(url,request){const requestedPackage=request.dependency.package,packageUrl=clients_1.UrlHelpers.ensureEndSlash(url)+`${requestedPackage.name.toLowerCase()}/index.json`,httpResponse=await this.jsonClient.request(clients_1.HttpClientRequestMethods.get,packageUrl,{},{}),{data}=httpResponse,source=packages_1.PackageClientSourceType.Registry,packageInfo=data,responseStatus={source:httpResponse.source,status:httpResponse.status},dotnetSpec=(0,dotnetUtils_1.parseVersionSpec)(requestedPackage.version);if(dotnetSpec.spec&&dotnetSpec.spec.hasFourSegments)return packages_1.ClientResponseFactory.create(packages_1.PackageClientSourceType.Registry,httpResponse,[]);const rawVersions=packages_1.VersionUtils.filterSemverVersions(packageInfo.versions),{releases,prereleases}=packages_1.VersionUtils.splitReleasesFromArray(rawVersions,this.config.prereleaseTagFilter);if(null===dotnetSpec.type)return packages_1.ClientResponseFactory.createNoMatch(source,packages_1.PackageVersionType.Version,packages_1.ClientResponseFactory.createResponseStatus(httpResponse.source,404),releases.length>0?releases[releases.length-1]:null);const versionRange=dotnetSpec.resolvedVersion,resolved={name:requestedPackage.name,version:versionRange},suggestions=(0,suggestions_1.createSuggestions)(versionRange,releases,prereleases);return{source,responseStatus,type:dotnetSpec.type,resolved,suggestions}}}},4381:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NuGetResourceClient=void 0;const clients_1=__webpack_require__(6502);exports.NuGetResourceClient=class{logger;jsonClient;constructor(client,logger){this.jsonClient=client,this.logger=logger}async fetchResource(source){const query={},headers={};this.logger.debug("Requesting PackageBaseAddressService from %s",source.url);try{const response=await this.jsonClient.request(clients_1.HttpClientRequestMethods.get,source.url,query,headers),foundPackageBaseAddressServices=response.data.resources.filter((res=>res["@type"].indexOf("PackageBaseAddress")>-1))[0]["@id"];return this.logger.debug("Resolved PackageBaseAddressService endpoint: %O",foundPackageBaseAddressServices),foundPackageBaseAddressServices}catch(error){const responseError=error;return this.logger.error("Could not resolve nuget service index. %O",responseError),""}}}},3950:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},6384:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DotNetContributions=void 0,function(DotNetContributions){DotNetContributions.Caching="dotnet.caching",DotNetContributions.Http="dotnet.http",DotNetContributions.Nuget="dotnet.nuget",DotNetContributions.DependencyProperties="dotnet.dependencyProperties",DotNetContributions.FilePatterns="dotnet.files",DotNetContributions.OnSaveChangesTask="dotnet.onSaveChanges",DotNetContributions.PrereleaseTagFilter="dotnet.prereleaseTagFilter"}(exports.DotNetContributions||(exports.DotNetContributions={}))},8617:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NugetContributions=void 0,function(NugetContributions){NugetContributions.Sources="sources"}(exports.NugetContributions||(exports.NugetContributions={}))},2185:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},517:(__unused_webpack_module,exports)=>{Object.defineProperty(exports,"__esModule",{value:!0})},4234:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DotNetConfig=void 0;const abstractProviderConfig_1=__webpack_require__(5141),eDotNetContributions_1=__webpack_require__(6384);class DotNetConfig extends abstractProviderConfig_1.AbstractProviderConfig{constructor(config,caching,http,nugetOpts){super("dotnet",config,caching,http),this.nuget=nugetOpts}nuget;get fileMatcher(){return{language:"xml",scheme:"file",pattern:this.filePatterns}}get filePatterns(){return this.config.get(eDotNetContributions_1.DotNetContributions.FilePatterns)}get dependencyProperties(){return this.config.get(eDotNetContributions_1.DotNetContributions.DependencyProperties)}get fallbackNugetSource(){return"https://api.nuget.org/v3/index.json"}get onSaveChangesTask(){return this.config.get(eDotNetContributions_1.DotNetContributions.OnSaveChangesTask)}get prereleaseTagFilter(){return this.config.get(eDotNetContributions_1.DotNetContributions.PrereleaseTagFilter)}}exports.DotNetConfig=DotNetConfig},5146:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.configureContainer=void 0;const serviceUtils_1=__webpack_require__(7013);exports.configureContainer=async function(serviceProvider,services){return(0,serviceUtils_1.addCachingOptions)(services),(0,serviceUtils_1.addNugetOptions)(services),(0,serviceUtils_1.addHttpOptions)(services),(0,serviceUtils_1.addDotNetConfig)(services),(0,serviceUtils_1.addProcessClient)(services),(0,serviceUtils_1.addCliClient)(services),(0,serviceUtils_1.addJsonClient)(services),(0,serviceUtils_1.addNuGetPackageClient)(services),(0,serviceUtils_1.addNuGetResourceClient)(services),(0,serviceUtils_1.addSuggestionProvider)(services),await services.buildChild("dotnet",serviceProvider)}},3751:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.DotNetSuggestionProvider=void 0;const clients_1=__webpack_require__(6502),packages_1=__webpack_require__(7074),providers_1=__webpack_require__(6424),suggestions_1=__webpack_require__(804),dotnetXmlParserFactory_1=__webpack_require__(6044);class DotNetSuggestionProvider extends providers_1.SuggestionProvider{constructor(dotnetCli,nugetClient,nugetResClient,logger){super(nugetClient,logger),this.config=nugetClient.config,this.dotnetClient=dotnetCli,this.nugetResClient=nugetResClient,this.suggestionReplaceFn=suggestions_1.defaultReplaceFn}config;dotnetClient;nugetResClient;suggestionReplaceFn;clearCache(){this.dotnetClient.processClient.clearCache(),this.client.jsonClient.clearCache()}parseDependencies(packagePath,packageText){return(0,dotnetXmlParserFactory_1.createDependenciesFromXml)(packageText,this.config.dependencyProperties).filter((x=>x.hasType("version"))).map((desc=>{const versionType=desc.getType("version");return new packages_1.PackageDependency((0,packages_1.createPackageResource)(desc.name,versionType.version,packagePath),desc.nameRange,versionType.versionRange)}))}async preFetchSuggestions(projectPath,packagePath){this.config.nuget.defrost();const promised=(await this.dotnetClient.fetchSources(packagePath)).filter((s=>s.protocol===clients_1.UrlHelpers.RegistryProtocols.https||s.protocol===clients_1.UrlHelpers.RegistryProtocols.http)).map((remoteSource=>this.nugetResClient.fetchResource(remoteSource))),serviceUrls=(await Promise.all(promised)).filter((url=>url.length>0));return 0===serviceUrls.length?(this.logger.error("Could not resolve any nuget service urls"),null):{serviceUrls}}}exports.DotNetSuggestionProvider=DotNetSuggestionProvider},5736:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildVersionSpec=exports.parseVersionSpec=exports.expandShortVersion=void 0;const packages_1=__webpack_require__(7074),semver_1=__importDefault(__webpack_require__(912));function expandShortVersion(value){if(!value||-1!==value.indexOf("[")||-1!==value.indexOf("(")||-1!==value.indexOf(",")||-1!==value.indexOf(")")||-1!==value.indexOf("]")||-1!==value.indexOf("*"))return value;let dotCount=0;for(let i=0;i<value.length;i++){const c=value[i];if("."===c)dotCount++;else if(isNaN(parseInt(c)))return value}let fmtValue="";if(0===dotCount)fmtValue=value+".0.0";else{if(1!==dotCount)return value;fmtValue=value+".0"}return fmtValue}function buildVersionSpec(value){let formattedValue=expandShortVersion(value.trim());if(!formattedValue)return null;if(semver_1.default.parse(formattedValue,{includePrerelease:!0}))return{version:formattedValue,isMinInclusive:!0,isMaxInclusive:!0,hasFourSegments:!1};try{const parsedNodeRange=semver_1.default.validRange(formattedValue,{includePrerelease:!0});if(parsedNodeRange)return{version:parsedNodeRange,isMinInclusive:!0,isMaxInclusive:!0,hasFourSegments:!1}}catch{}if(formattedValue.length<3)return null;const versionSpec={},first=formattedValue[0];if("["===first)versionSpec.isMinInclusive=!0;else{if("("!==first)return packages_1.VersionUtils.isFourSegmentedVersion(formattedValue)?{hasFourSegments:!0}:null;versionSpec.isMinInclusive=!1}const last=formattedValue[formattedValue.length-1];"]"===last?versionSpec.isMaxInclusive=!0:")"===last&&(versionSpec.isMaxInclusive=!1),formattedValue=formattedValue.substr(1,formattedValue.length-2);const parts=formattedValue.split(",");if(parts.length>2)return null;if(parts.every((x=>!x)))return null;const minVersion=parts[0],maxVersion=2==parts.length?parts[1]:parts[0];if(minVersion){const parsedVersion=buildVersionSpec(minVersion);if(!parsedVersion)return null;versionSpec.minVersionSpec=parsedVersion,versionSpec.hasFourSegments=parsedVersion.hasFourSegments}if(maxVersion){const parsedVersion=buildVersionSpec(maxVersion);if(!parsedVersion)return null;versionSpec.maxVersionSpec=parsedVersion,versionSpec.hasFourSegments=parsedVersion.hasFourSegments}return versionSpec}exports.expandShortVersion=expandShortVersion,exports.parseVersionSpec=function(rawVersion){const spec=buildVersionSpec(rawVersion);let version,isValidVersion=!1,isValidRange=!1;if(spec&&!spec.hasFourSegments){const{valid,validRange}=semver_1.default;version=function(versionSpec){if(versionSpec.version&&versionSpec.isMinInclusive&&versionSpec.isMaxInclusive)return versionSpec.version;if(versionSpec.minVersionSpec&&versionSpec.maxVersionSpec&&versionSpec.minVersionSpec.version===versionSpec.maxVersionSpec.version&&versionSpec.isMinInclusive&&versionSpec.isMaxInclusive)return versionSpec.minVersionSpec.version;let rangeBuilder="";versionSpec.minVersionSpec&&(rangeBuilder+=">",versionSpec.isMinInclusive&&(rangeBuilder+="="),rangeBuilder+=versionSpec.minVersionSpec.version);versionSpec.maxVersionSpec&&(rangeBuilder+=rangeBuilder.length>0?" ":"",rangeBuilder+="<",versionSpec.isMaxInclusive&&(rangeBuilder+="="),rangeBuilder+=versionSpec.maxVersionSpec.version);return rangeBuilder}(spec),isValidVersion=valid(version,packages_1.VersionUtils.loosePrereleases),isValidRange=!isValidVersion&&null!==validRange(version,packages_1.VersionUtils.loosePrereleases)}return{type:isValidVersion?packages_1.PackageVersionType.Version:isValidRange?packages_1.PackageVersionType.Range:null,rawVersion,resolvedVersion:spec?version:"",spec}},exports.buildVersionSpec=buildVersionSpec},6044:function(__unused_webpack_module,exports,__webpack_require__){var __importDefault=this&&this.__importDefault||function(mod){return mod&&mod.__esModule?mod:{default:mod}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.createDependenciesFromXml=void 0;const packages_1=__webpack_require__(7074),xmldoc_1=__importDefault(__webpack_require__(1960));exports.createDependenciesFromXml=function(xml,includePropertyNames){let document=null;try{document=new xmldoc_1.default.XmlDocument(xml)}catch{document=null}return document?function(topLevelNodes,xml,includePropertyNames){const collector=[];function parseVersionNode(itemGroupNode){if(0==includePropertyNames.includes(itemGroupNode.name))return;const dependencyLens=function(node,xml){const nameRange={start:node.startTagPosition,end:node.startTagPosition},versionRange=function(node,attributeName,xml){const lineText=xml.substring(node.startTagPosition,node.position);let start=lineText.toLowerCase().indexOf(attributeName);if(-1===start)return null;start+=attributeName.length;const end=lineText.indexOf('"',start);return{start:node.startTagPosition+start,end:node.startTagPosition+end}}(node,' version="',xml);if(null===versionRange)return null;const name=node.attr.Include||node.attr.Update||node.attr.Name,versionDesc={type:"version",version:node.attr.Version,versionRange},packageDesc=new packages_1.PackageDescriptor(name,nameRange);return packageDesc.addType(versionDesc),packageDesc}(itemGroupNode,xml);dependencyLens&&collector.push(dependencyLens)}return topLevelNodes.eachChild((function(node){"ItemGroup"===node.name&&node.children.length>0?node.eachChild(parseVersionNode):"Sdk"===node.name&&parseVersionNode(node)})),collector}(document,xml,includePropertyNames):[]}},7830:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.NugetOptions=void 0;const configuration_1=__webpack_require__(605),eNugetContributions_1=__webpack_require__(8617);class NugetOptions extends configuration_1.Options{constructor(config,section){super(config,section)}get sources(){return this.get(eNugetContributions_1.NugetContributions.Sources)}}exports.NugetOptions=NugetOptions},7013:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.addSuggestionProvider=exports.addNuGetResourceClient=exports.addNuGetPackageClient=exports.addJsonClient=exports.addCliClient=exports.addProcessClient=exports.addDotNetConfig=exports.addNugetOptions=exports.addHttpOptions=exports.addCachingOptions=void 0;const clients_1=__webpack_require__(6502),utils_1=__webpack_require__(7130),http_1=__webpack_require__(8128),process_1=__webpack_require__(7422),dotnetCli_1=__webpack_require__(4356),nugetPackageClient_1=__webpack_require__(2190),nugetResourceClient_1=__webpack_require__(4381),eDotNetContributions_1=__webpack_require__(6384),dotnetConfig_1=__webpack_require__(4234),dotnetSuggestionProvider_1=__webpack_require__(3751),nugetOptions_1=__webpack_require__(7830);exports.addCachingOptions=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetCachingOpts,(container=>new clients_1.CachingOptions(container.appConfig,eDotNetContributions_1.DotNetContributions.Caching,"caching")))},exports.addHttpOptions=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetHttpOpts,(container=>new clients_1.HttpOptions(container.appConfig,eDotNetContributions_1.DotNetContributions.Http,"http")))},exports.addNugetOptions=function(services){services.addSingleton((0,utils_1.nameOf)().nugetOpts,(container=>new nugetOptions_1.NugetOptions(container.appConfig,eDotNetContributions_1.DotNetContributions.Nuget)))},exports.addDotNetConfig=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetConfig,(container=>new dotnetConfig_1.DotNetConfig(container.appConfig,container.dotnetCachingOpts,container.dotnetHttpOpts,container.nugetOpts)))},exports.addProcessClient=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetProcess,(container=>(0,process_1.createProcessClient)(container.dotnetCachingOpts,container.logger.child({namespace:"dotnet process"}))))},exports.addCliClient=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetCli,(container=>new dotnetCli_1.DotNetCli(container.dotnetConfig,container.dotnetProcess,container.logger.child({namespace:"dotnet cli"}))))},exports.addJsonClient=function(services){services.addSingleton((0,utils_1.nameOf)().dotnetJsonClient,(container=>(0,http_1.createJsonClient)({caching:container.dotnetCachingOpts,http:container.dotnetHttpOpts},container.logger.child({namespace:"dotnet request"}))))},exports.addNuGetPackageClient=function(services){services.addSingleton((0,utils_1.nameOf)().nugetClient,(container=>new nugetPackageClient_1.NuGetPackageClient(container.dotnetConfig,container.dotnetJsonClient,container.logger.child({namespace:"dotnet client"}))))},exports.addNuGetResourceClient=function(services){services.addSingleton((0,utils_1.nameOf)().nugetResClient,(container=>new nugetResourceClient_1.NuGetResourceClient(container.dotnetJsonClient,container.logger.child({namespace:"dotnet resource service"}))))},exports.addSuggestionProvider=function(services){services.addScoped((0,utils_1.nameOf)().suggestionProvider,(container=>new dotnetSuggestionProvider_1.DotNetSuggestionProvider(container.dotnetCli,container.nugetClient,container.nugetResClient,container.logger.child({namespace:"dotnet provider"}))))}}};
//# sourceMappingURL=444.bundle.js.map