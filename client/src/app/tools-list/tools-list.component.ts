import { Component, OnInit, WritableSignal } from "@angular/core";
import { Tool } from "../tool";
import { ToolService } from "../tool.service";
import { RouterModule } from "@angular/router";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: "app-tools-list",
    standalone: true,
    imports: [RouterModule, MatTableModule, MatButtonModule, MatCardModule],
    templateUrl: "./tools-list.component.html",
    styleUrls: ["./tools-list.component.css"],
})
export class ToolsListComponent implements OnInit {
    // tools$ = signal<Tool[]>([]);
    tools$ = {} as WritableSignal<Tool[]>;
    displayedColumns: string[] = [
        "col-name",
        "col-description",
        "col-count",
        "col-actions",
    ];

    constructor(private toolService: ToolService) {}

    ngOnInit(): void {
        this.fetchTools();
    }

    deleteTool(id: string): void {
        this.toolService.deleteTool(id).subscribe(() => {
            this.fetchTools();
        });
    }

    fetchTools(): void {
        this.toolService.getTools();
        this.tools$ = this.toolService.tools$;
    }
}
