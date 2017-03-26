import { Component, OnInit } from "@angular/core";

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

    constructor(private authHttp: AuthService)
    {
    }

    public ngOnInit()
    {
        this.isLoading = true;
        this.authHttp.get("/admin/roles/1")
            .map(res => res.json())
            .finally(() => this.isLoading = false)
            .subscribe(
                result => {
                    if (result !== null)
                    {
                        this.currentRole = result as IApplicationRole
                    }
                },
                err => console.error(err)
            );
    }
}