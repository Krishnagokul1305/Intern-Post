import { CommonModule } from '@angular/common';
import { Component, Input,  TemplateRef } from '@angular/core';
import { ManageuploadsComponent } from '../../admin/manageuploads/manageuploads.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,ManageuploadsComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
@Input() data:any
@Input() rowTemplate!:TemplateRef<any>

}
