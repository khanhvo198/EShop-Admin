import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardModule} from "primeng/card";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {CategoryFormComponent} from "../../../shared/ui/category-form/category-form.component";

@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [CommonModule, CardModule, ToolbarModule, ButtonModule, CategoryFormComponent],
  template: `
    <div class="p-4">
      <p-card header="Categories" subheader="List of all categories">
        <p-toolbar>
          <div class="p-toolbar-group-start"></div>
          <div class="p-toolbar-group-end">
            <p-button label="Create" icon="pi pi-plus" class="mr-2" styleClass="p-button-primary"></p-button>
            <p-button label="Cancel" icon="pi pi-arrow-circle-left" class="mr-2" styleClass="p-button-secondary"></p-button>
          </div>
        </p-toolbar>
        <app-category-form></app-category-form>
      </p-card>
    </div>
  `,
  styleUrls: ['./new-category.component.scss']
})
export default class NewCategoryComponent {

}
