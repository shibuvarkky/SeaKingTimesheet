// src/app/edit-entry/edit-entry.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { TimesheetService } from '../services/timesheet.service';

@Component({
  selector: 'app-edit-entry',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './edit-entry.component.html',
  styleUrls: ['./edit-entry.component.css']
})
export class EditEntryComponent implements OnInit {
  entry: any = {};
  timesheetService = inject(TimesheetService); // Using inject() for service
  route = inject(ActivatedRoute); // Using inject() for route
  router = inject(Router); // Using inject() for navigation

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.timesheetService.getEntry(id).subscribe((data) => {
      this.entry = data;
    });
  }

  saveEntry() {
    this.timesheetService.updateEntry(this.entry.id, this.entry).subscribe(() => {
      alert('Entry updated successfully');
      this.router.navigate(['/home']);
    });
  }
}
