import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { RolesComponent } from "./roles.component";

const ROUTES: Route[] = [
    {
        path: "manager",
        data: {
            meta: {
                description: "Justice for our people!",
            },
        },
        children: [
            {
                path: "",
                redirectTo: "roles",
                pathMatch: "full",
            },
            {
                path: "roles",
                component: RolesComponent,
                data: {
                    meta: {
                        title: "Role Management - Selama Ashal'anore!",
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