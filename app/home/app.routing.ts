import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { CounterComponent } from "./counter.component";
import { HomeComponent } from "./home.component";

const ROUTES: Route[] = [
    {
        path: "",
        data: {
            meta: {
                description: "Justice for our people!",
            },
        },
        children: [
            {
                path: "",
                redirectTo: "home",
                pathMatch: "full",
            },
            {
                path: "home",
                component: HomeComponent,
                data: {
                    meta: {
                        title: "Selama Ashal'anore!",
                    },
                },
            },
            {
                path: "counter",
                component: CounterComponent,
                data: {
                    meta: {
                        title: "Counter - Selama Ashal'anore!",
                    }
                },
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(ROUTES),
    ],
    exports: [
        RouterModule,
    ],
})
export class RoutingModule
{
}