import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ToolsListComponent } from "./tools-list/tools-list.component";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterOutlet, ToolsListComponent, MatToolbarModule],
    template: `
        <mat-toolbar>
            <span>Garage Tool Management</span>
        </mat-toolbar>

        <main>
            <router-outlet />
        </main>
    `,
    styles: [
        `
            main {
                display: flex;
                justify-content: center;
                padding: 2rem 4rem;
            }
        `,
    ],
})
export class AppComponent {
    title = "client";
}
