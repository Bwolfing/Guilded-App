import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";

import { AuthService, RegisterUserModel } from "../core/auth.service";

@Component({
    selector: "account-register",
    template: require("./templates/register.html"),
    styles: [
        require("./templates/register.scss"),
    ],
})
export class RegisterComponent implements OnInit
{
    registerForm: FormGroup;
    user: RegisterUserModel = new RegisterUserModel();
    formErrors: RegisterErrors = new RegisterErrors();
    isLoading: boolean = false;

    public get isFormErrorFree(): boolean
    {
        return this.registerForm.valid && this.formErrors.hasNoErrors;
    }

    constructor(private authService: AuthService,
        private router: Router,
        private formBuilder: FormBuilder)
    {
    }

    public ngOnInit()
    {
        this.buildForm();
        this.registerForm.valueChanges.subscribe(data => this.onFormValueChanges(data));
        this.onFormValueChanges();
    }
    private buildForm()
    {
        this.registerForm = this.formBuilder.group({
            Username: [
                this.user.Username, [
                    Validators.required,
                    Validators.minLength(5),
                ],
            ],
            Email: [
                this.user.Email, [
                    Validators.required,
                    CustomValidators.email
                ],
            ],
            Password: [
                this.user.Password, [
                    Validators.required,
                    Validators.minLength(6),
                ]
            ],
        });
        this.registerForm.addControl("ConfirmPassword", new FormControl(
            "",
            [
                Validators.required,
                Validators.minLength(6),
                CustomValidators.equalTo(this.registerForm.controls.Password)
            ]
        ));
    }
    private onFormValueChanges(data?: any)
    {
        if (!this.registerForm)
        {
            return;
        }

        const form = this.registerForm;
        for (const field in this.formErrors)
        {
            if (["Username", "Email", "Password", "ConfirmPassword"].indexOf(field) < 0)
            {
                continue;
            }

            this.formErrors[field] = [];
            const control = form.get(field);
            if (control && control.dirty && !control.valid)
            {
                const messages = RegisterErrors.ErrorMessages[field];
                for (const key in control.errors)
                {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    public register(): void
    {
        if (!this.isLoading)
        {
            this.isLoading = true;
            this.formErrors.clearErrors();
            this.authService.register(this.user)
                .finally(() =>
                {
                    this.isLoading = false;
                })
                .subscribe(
                    result => this.router.navigate(["/home"]),
                    errors => this.parseErrors(errors.json())
                );
        }
    }

    private parseErrors(errors: any)
    {
        this.formErrors.Model = errors[""] || [];
        this.formErrors.Username = errors["Username"] || [];
        this.formErrors.Email = errors["Email"] || [];
        this.formErrors.Password = errors["Password"] || [];
        this.formErrors.ConfirmPassword = errors["ConfirmPassword"] || [];
        if (this.formErrors.hasNoErrors)
        {
            this.formErrors.Model = ["An error occurred. Please try again"];
        }
    }
}

class RegisterErrors
{
    static ErrorMessages: Object = {
        Username: {
            required: "Username is required",
            minlength: "Username must contain at least 5 characters",
        },
        Email: {
            required: "Email is required",
            email: "Must be a valid email address format"
        },
        Password: {
            required: "Password is required",
            minlength: "Password must contain at least 6 characters",
        },
        ConfirmPassword: {
            required: "Confirm password is required",
            minlength: "Confirm password must contain at least 6 characters",
            equalTo: "Does not match password",
        },
    }

    Model: string[] = [];
    Username: string[] = [];
    Email: string[] = [];
    Password: string[] = [];
    ConfirmPassword: string[] = [];

    public get hasNoErrors(): boolean
    {
        return !this.Model.length && !this.Username.length &&
            !this.Email.length && !this.Password.length &&
            !this.ConfirmPassword.length;
    }

    public clearErrors(): void
    {
        this.Model = [];
        this.Username = [];
        this.Email = [];
        this.Password = [];
        this.ConfirmPassword = [];
    }
}