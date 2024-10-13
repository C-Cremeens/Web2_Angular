import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Tool } from "./tool";

@Injectable({
    providedIn: "root",
})
export class ToolService {
    private url = "http://localhost:5200";
    tools$ = signal<Tool[]>([]);
    tool$ = signal<Tool>({} as Tool);

    constructor(private httpClient: HttpClient) {}

    private refreshTools() {
        this.httpClient.get<Tool[]>(`${this.url}/tools`).subscribe((tools) => {
            this.tools$.set(tools);
        });
    }

    getTools() {
        this.refreshTools();
        return this.tools$();
    }

    getTool(id: string) {
        this.httpClient.get<Tool>(`${this.url}/tools/${id}`).subscribe({
            next: (tool) => this.tool$.set(tool),
            error: (err) => console.error(err),
        });
    }

    createTool(tool: Tool) {
        return this.httpClient.post(`${this.url}/tools`, tool, {
            responseType: "text",
        });
    }

    updateTool(id: string, tool: Tool) {
        return this.httpClient.put(`${this.url}/tools/${id}`, tool, {
            responseType: "text",
        });
    }

    deleteTool(id: string) {
        return this.httpClient.delete(`${this.url}/tools/${id}`, {
            responseType: "text",
        });
    }
}
