import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CustomValidators } from "ng2-validation";

import { AuthService, SignInModel } from "../core/auth.service";
import { ProgressBarService } from "../core/progress-bar.service";

@Component({
    selector: "account-sign-in",
    template: require("./templates/sign-in.html"),
    styles: [
        require("./templates/sign-in.scss"),
    ],
})
export class SignInComponent implements OnInit
{
    signInForm: FormGroup;
    signInModel: SignInModel = new SignInModel();
    isLoading: boolean = false;
    formErrors: SignInErrors = new SignInErrors();

    public get isFormErrorFree()
    {
        return this.signInForm.valid && this.formErrors.hasNoErrors;
    }

    constructor(private authService: AuthService,
        private router: Router,
        private progressBar: ProgressBarService,
        private formBuilder: FormBuilder)
    {
    }

    public ngOnInit()
    {
        this.buildForm();
        this.signInForm.valueChanges.subscribe(data => this.onFormValueChanges(data));
        this.onFormValueChanges();
    }
    private buildForm()
    {
        this.signInForm = this.formBuilder.group({
            Email: [
                this.signInModel.Email, [
                    Validators.required,
                    CustomValidators.email,
                ]
            ],
            Password: [
                this.signInModel.Password,
                Validators.required,
            ],
            RememberMe: [this.signInModel.RememberMe],
        });
    }
    private onFormValueChanges(data?: any)
    {
        if (!this.signInForm)
        {
            return;
        }
        const form = this.signInForm;

        for (const field in this.formErrors)
        {
            if (field !== "Email" && field !== "Password")
            {
                continue;
            }
            this.formErrors[field] = [];
            const control = form.get(field);
            if (control && control.dirty && !control.valid)
            {
                const messages = SignInErrors.ErrorMessages[field];
                for (const key in control.errors)
                {
                    this.formErrors[field].push(messages[key]);
                }
            }
        }
    }

    public logIn(): void
    {
        if (!this.isLoading)
        {
            this.isLoading = true;
            this.progressBar.start();
            this.formErrors.clearErrors();
            this.authService.logIn(this.signInModel)
                .finally(() => 
                {
                    this.isLoading = false;
                    this.progressBar.complete();
                })
                .subscribe(
                    result => this.router.navigate(["/home"]),
                    errors => this.parseErrors(errors.json()),
                );
        }
    }
    private parseErrors(errors: any): void
    {
        this.formErrors.Model = errors[""] || [];
        this.formErrors.Email = errors.Email || [];
        this.formErrors.Password = errors.Password || [];
        if (this.formErrors.hasNoErrors)
        {
            this.formErrors.Model = ["An error occurred. Please try again"];
        }
    }
}

class SignInErrors
{
    static ErrorMessages: Object = {
        Email: {
            required: "Email is required",
            email: "Must be a valid email address format"
        },
        Password: {
            required: "Password is required",
        },
    };

    Model: string[] = [];
    Email: string[] = [];
    Password: string[] = [];

    public get hasNoErrors()
    {
        return !this.Model.length && !this.Email.length && !this.Password.length;
    }
    
    public clearErrors(): void
    {
        this.Model = [];
        this.Email = [];
        this.Password = [];
    }
}