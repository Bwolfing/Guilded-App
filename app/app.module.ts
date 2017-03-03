import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { UniversalModule } from "angular2-universal";
import { MetaModule, MetaService } from "@nglibs/meta";
import { NgSemanticModule } from "ng-semantic";

import { AuthModule } from "./core/auth.module";

import { HomeAppModule } from "./home/app.module";
import { ForumsAppModule } from "./forums/app.module";
import { AccountModule } from "./account/app.module";

import { AppComponent } from "./app.component"

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
        NgSemanticModule,
        AuthModule,
        HomeAppModule,
        ForumsAppModule,
        AccountModule,
    ]
})
export class AppModule {
}
