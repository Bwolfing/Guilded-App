import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
    isLoading: boolean = false;
    currentRole: IApplicationRole = { 
        id: null,
        name: null,
        concurrencyStamp: null,
        permissions: new Array<IPermission>(),
    };
    roleEditorForm: FormGroup;

    constructor(
        private authHttp: AuthService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder
    )
    {
    }

    public ngOnInit()
    {
        this.buildForm();
        this.isLoading = true;
        this.route.params
            .switchMap((params: Params) => this.authHttp.get(`/admin/roles/${params['id']}`))
            .map(res => res.json())
            .subscribe((result: IApplicationRole) => {
                this.currentRole = result;
                this.updateForm();
                this.isLoading = false;
            });
    }
    private buildForm()
    {
        this.roleEditorForm = this.formBuilder.group({
            id: [
                this.currentRole.id
            ],
            name: [
                this.currentRole.name,
                [
                    Validators.required,
                    Validators.minLength(5)
                ]
            ],
            concurrencyStamp: [
                this.currentRole.concurrencyStamp
            ],
        });
    }
    private updateForm()
    {
        this.roleEditorForm.controls.id.setValue(this.currentRole.id);
        this.roleEditorForm.controls.concurrencyStamp.setValue(this.currentRole.concurrencyStamp);
        this.roleEditorForm.controls.name.setValue(this.currentRole.name);
    }
}