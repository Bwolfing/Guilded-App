import { NgModule } from "@angular/core";
import { MaterialModule } from "@angular/material";
import { UniversalModule } from "angular2-universal";
import { NgSemanticModule } from "ng-semantic"

import { RoutingModule } from "./app.routing";

import { CounterComponent } from "./counter.component";
import { GuildActivityComponent } from "./guild-activity.component";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        UniversalModule,
        MaterialModule.forRoot(),
        NgSemanticModule,
        RoutingModule,
    ],
    declarations: [
        CounterComponent,
        GuildActivityComponent,
        HomeComponent,
    ],
    exports: [
        MaterialModule,
    ],
})
export class HomeAppModule
{
}