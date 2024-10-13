import { Routes } from "@angular/router";
import { ToolsListComponent } from "./tools-list/tools-list.component";
import { AddToolComponent } from "./add-tool/add-tool.component";
import { EditToolComponent } from "./edit-tool/edit-tool.component";

export const routes: Routes = [
    { path: "", component: ToolsListComponent, title: "Tool List" },
    { path: "new", component: AddToolComponent, title: "New Tool" },
    { path: "edit/:id", component: EditToolComponent, title: "Edit Tool" },
];
