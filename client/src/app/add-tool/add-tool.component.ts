import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ToolFormComponent } from "../tool-form/tool-form.component";
import { Tool } from "../tool";
import { ToolService } from "../tool.service";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-add-tool",
    standalone: true,
    imports: [ToolFormComponent, MatCardModule],
    templateUrl: "./add-tool.component.html",
    styleUrls: ["./add-tool.component.css"],
})
export class AddToolComponent {
    constructor(private toolService: ToolService, private router: Router) {}

    addTool(tool: Tool) {
        this.toolService.createTool(tool).subscribe({
            next: () => {
                this.router.navigate(["/"]);
            },
            error: (error) => {
                alert("Failed to create employee");
                console.error(error);
            },
        });
        this.toolService.getTools();
    }
}
