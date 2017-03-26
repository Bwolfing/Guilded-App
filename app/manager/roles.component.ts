import { Component, OnInit } from "@angular/core";

import { AuthService } from "../core/auth.service";

import { IApplicationRole } from "./models/IApplicationRole";

@Component({
    selector: "role-manager",
    template: require("./templates/roles.component.html"),
    styles: [
        require("./templates/roles.component.scss"),
    ],
})
export class RolesComponent implements OnInit
{
    roles: IApplicationRole[] = [];

    constructor(private authHttp: AuthService)
    {
    }

    public ngOnInit()
    {
        this.authHttp.get("/admin/roles")
            .map(res => res.json())
            .subscribe(
                result => this.roles = result as IApplicationRole[],
                err => console.error(err)
            );
    }
}