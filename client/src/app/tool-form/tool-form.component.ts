import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import {
    FormBuilder,
    Validators,
    ReactiveFormsModule,
    FormGroup,
} from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatRadioModule } from "@angular/material/radio";
import { MatButtonModule } from "@angular/material/button";
import { Tool } from "../tool";

@Component({
    selector: "app-tool-form",
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatButtonModule,
    ],
    templateUrl: "./tool-form.component.html",
    styleUrls: ["./tool-form.component.css"],
})
export class ToolFormComponent implements OnInit {
    @Input()
    initialState?: Tool;

    @Output()
    formValuesChanged = new EventEmitter<Tool>();

    @Output()
    formSubmitted = new EventEmitter<Tool>();

    toolForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.toolForm = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3)]],
            description: ["", [Validators.required, Validators.minLength(5)]],
            quantity: [1, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnInit() {
        if (this.initialState) {
            this.toolForm.setValue({
                name: this.initialState.name || "",
                description: this.initialState.description || "",
                quantity: this.initialState.count || 1,
            });
        }

        // Emit form values when they change
        this.toolForm.valueChanges.subscribe((value) => {
            this.formValuesChanged.emit(value as Tool);
        });
    }

    ngOnChanges() {
        if (this.initialState) {
            this.toolForm.setValue({
                name: this.initialState.name || "",
                description: this.initialState.description || "",
                quantity: this.initialState.count || 1,
            });
        }
    }

    get name() {
        return this.toolForm.get("name")!;
    }

    get description() {
        return this.toolForm.get("description")!;
    }

    get quantity() {
        return this.toolForm.get("quantity")!;
    }

    submitForm() {
        if (this.toolForm.valid) {
            this.formSubmitted.emit(this.toolForm.value as Tool);
        }
    }
}
