import { Component, OnInit } from "@angular/core";

import { AuthService } from "../core/auth.service";

@Component({
    selector: "role-manager",
    template: require("./templates/roles.component.html"),
})
export class RolesComponent implements OnInit
{
    privileges: RolePrivileges[] = [];

    constructor(private authHttp: AuthService)
    {
    }

    public ngOnInit()
    {
        this.authHttp.get("/manager/privileges")
            .map(res => res.json())
            .subscribe(
                result => this.privileges = result as RolePrivileges[],
                err => console.error(err)
            );
    }
}

interface RolePrivileges
{
    id: number;
    name: string;
}