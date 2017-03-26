import { NgModule } from "@angular/core";
import { Http } from "@angular/http";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { ConfigModule, ConfigLoader, ConfigHttpLoader } from "@nglibs/config";
import { MetaModule, MetaService } from "@nglibs/meta";
import { NgSemanticModule } from "ng-semantic";

import { AuthModule } from "./core/auth.module";

import { HomeAppModule } from "./home/app.module";
import { ForumsAppModule } from "./forums/app.module";
import { AccountAppModule } from "./account/app.module";
import { AdminModule } from "./admin/app.module";

import { AppComponent } from "./app.component"

function configFactory(http: Http): ConfigLoader
{
    return new ConfigHttpLoader(http, "/public/config.json");
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    declarations: [
        AppComponent,
    ],
    providers: [
        MetaService,
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([]),
        MetaModule.forRoot(),
        ConfigModule.forRoot({
            provide: ConfigLoader,
            useFactory: configFactory,
            deps: [
                Http,
            ],
        }),
        NgSemanticModule,
        AuthModule,
        HomeAppModule,
        ForumsAppModule,
        AccountAppModule,
        AdminModule,
    ]
})
export class AppModule {
}
