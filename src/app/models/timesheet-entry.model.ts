// src/app/models/timesheet-entry.model.ts
export interface TimesheetEntry {
    id: number;
    jobNumber: string;
    jobTitle: string;
    date: string; // Use `string` if dates are stored as strings
    startTime: string;
    endTime: string;
    hours: number;
    overtimeHours?: number;
    doubleTimeHours?: number;
    expenses: number;
    checked: boolean;
  }
  