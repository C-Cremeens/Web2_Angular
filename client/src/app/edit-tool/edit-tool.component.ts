import { Component, OnInit, WritableSignal } from "@angular/core";
import { Tool } from "../tool";
import { ToolService } from "../tool.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ToolFormComponent } from "../tool-form/tool-form.component";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-edit-tool",
    standalone: true,
    imports: [ToolFormComponent, MatCardModule],
    templateUrl: "./edit-tool.component.html",
    styleUrls: ["./edit-tool.component.css"],
})
export class EditToolComponent implements OnInit {
    tool = {} as WritableSignal<Tool>;
    constructor(
        private toolService: ToolService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        const id = this.route.snapshot.paramMap.get("id");
        if (!id) {
            alert("No id provided");
        }

        this.tool = this.toolService.tool$;
        this.toolService.getTool(id!);
    }

    editTool(tool: Tool) {
        this.toolService.updateTool(this.tool()._id || "", tool).subscribe({
            next: () => {
                this.router.navigate(["/"]);
            },
            error: (error) => {
                alert("Failed to update employee");
                console.error(error);
            },
        });
    }
}
