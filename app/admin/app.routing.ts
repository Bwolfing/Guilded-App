import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";

import { RolesComponent } from "./roles.component";
import { RoleEditorComponent } from "./role-editor.component";

const ROUTES: Route[] = [
    {
        path: "admin",
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
                children: [
                    {
                        path: "",
                        component: RolesComponent,
                        data: {
                            meta: {
                                title: "Role Management - Selama Ashal'anore!",
                            },
                        },
                    },
                    {
                        path: "edit/:id",
                        component: RoleEditorComponent,
                        data: {
                            meta: {
                                title: "Role Editor - Selama Ashal'anore!",
                            },
                        }
                    },
                ]
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