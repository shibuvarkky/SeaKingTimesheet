// src/app/homepage/homepage.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TimesheetService } from '../services/timesheet.service';
import { TimesheetEntry } from '../models/timesheet-entry.model'; // Import the interface

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  entries: TimesheetEntry[] = []; // Use the interface here
  selectedDate: Date = new Date();

  private timesheetService = inject(TimesheetService);
  private router = inject(Router);

  ngOnInit() {
    this.fetchEntries();
  }

  // Fetch entries for the selected date
  fetchEntries() {
    this.timesheetService.getEntries().subscribe((data: TimesheetEntry[]) => {
      this.entries = data.filter((entry: TimesheetEntry) => {
        const entryDate = new Date(entry.date);
        return entryDate.toDateString() === this.selectedDate.toDateString();
      });
    });
  }

  // Navigate to the previous date
  goToPrevious() {
    this.selectedDate.setDate(this.selectedDate.getDate() - 1);
    this.fetchEntries();
  }

  // Navigate to the next date
  goToNext() {
    this.selectedDate.setDate(this.selectedDate.getDate() + 1);
    this.fetchEntries();
  }

  // Edit entry by navigating to edit page with entry ID
  editEntry(id: number) {
    this.router.navigate(['/edit-entry', id]);
  }

  // Delete an entry and refresh the list
  deleteEntry(id: number) {
    if (confirm('Are you sure you want to delete this entry?')) {
      this.timesheetService.deleteEntry(id).subscribe(() => {
        this.entries = this.entries.filter((entry: TimesheetEntry) => entry.id !== id);
      });
    }
  }
}
