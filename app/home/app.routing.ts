import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

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