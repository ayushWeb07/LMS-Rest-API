'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">lms-rest-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search">
    <input type="text" placeholder="Type to search">
    <button type="button"
        class="search-input-clear"
        aria-label="Clear search"
        data-search-input-clear>&times;</button>
</div>
` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                                <li class="link">
                                    <a href="overview.html" data-type="chapter-link">
                                        <span class="icon ion-ios-keypad"></span>Overview
                                    </a>
                                </li>

                            <li class="link">
                                <a href="index.html" data-type="chapter-link">
                                    <span class="icon ion-ios-paper"></span>
                                        README
                                </a>
                            </li>
                                <li class="link">
                                    <a href="architecture.html" data-type="chapter-link">
                                        <span class="icon ion-ios-git-branch"></span>Architecture
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>

                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' : 'data-bs-target="#xs-controllers-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' :
                                            'id="xs-controllers-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' : 'data-bs-target="#xs-injectables-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' :
                                        'id="xs-injectables-links-module-AppModule-965d08c07021ea71dda61102a55408ab0a5fe1825a7ffb53c00ac5a3e6fa94d14bb986d2c8ed5a077e4d06f00c2533f1bcf9fad818a307aef1da5177d15f6fa3"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' :
                                            'id="xs-controllers-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' :
                                        'id="xs-injectables-links-module-AuthModule-85cfef4fa0ac79daabd8a5244100536351a93386db14dd48b2cada21811221f05a1460b5d2270efe7a375de5bfda9ff2b1b4def6256ee8c0e5e789dd03b8ec93"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' :
                                            'id="xs-controllers-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' :
                                        'id="xs-injectables-links-module-PostsModule-30d76f2dbe87d5229398901be0032b692bb770f971d961378b7e75c966a30fef0a336a938e7ae7f3c782818ec76aeca12b9a23ef85d1f13c4303ca3d64dd5644"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' :
                                            'id="xs-controllers-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' :
                                        'id="xs-injectables-links-module-UsersModule-1483b0ddb1c318f9cbcebc17e0a473e748b4ba7e93666d8c91988a0b066ab465dbb2045dc20023719161b061e771398ac086d70127e06e4566d629065e7ac5d7"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindAllDto.html" data-type="entity-link" >FindAllDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/FindOneDto.html" data-type="entity-link" >FindOneDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/DatabaseConfig.html" data-type="entity-link" >DatabaseConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ServerConfig.html" data-type="entity-link" >ServerConfig</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});
