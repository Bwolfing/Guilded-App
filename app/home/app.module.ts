import { NgModule } from "@angular/core";
import { UniversalModule } from "angular2-universal";
import { NgSemanticModule } from "ng-semantic"

import { RoutingModule } from "./app.routing";

import { GuildActivityComponent } from "./guild-activity.component";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        UniversalModule,
        NgSemanticModule,
        RoutingModule,
    ],
    declarations: [
        GuildActivityComponent,
        HomeComponent,
    ],
})
export class HomeAppModule
{
}