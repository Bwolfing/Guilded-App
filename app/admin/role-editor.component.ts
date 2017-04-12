import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import "rxjs/add/operator/switchMap"

import { AuthService } from "../core/auth.service";

import { IApplicationRole } from "./models/IApplicationRole";
import { IPermission } from "./models/IPermission";

@Component({
    selector: "role-editor",
    template: require("./templates/role-editor.component.html"),
})
export class RoleEditorComponent implements OnInit
{
    isLoading: boolean = true;
    currentRole: IApplicationRole = { id: null, name: null, permissions: new Array<IPermission>(), };

    constructor(
        private authHttp: AuthService,
        private route: ActivatedRoute,
        private router: Router
    )
    {
    }

    public ngOnInit()
    {
        this.isLoading = true;
        this.route.params
            .switchMap((params: Params) => this.authHttp.get(`/admin/roles/${params['id']}`))
            .map(res => res.json())
            .subscribe((result: IApplicationRole) => {
                debugger;
                this.currentRole = result;
            });
    }
}