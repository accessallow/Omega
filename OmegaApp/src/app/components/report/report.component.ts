import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private dataService: DataService) { }

  report:any=undefined;
  students:any[] = [];
  selectedStudent:any;
  subjectMap:any[] = [];
  registrationMap:any[] = [];

  ngOnInit(): void {
    this.loadData();
    this.dataService.dataReload.subscribe(r => {
      if(r == "STUDENTS"){
        this.loadData();
        this.studentSelected(this.selectedStudent.rollNumber);
      }
    });
  }

  loadData(){
      this.dataService.getStudents().subscribe( students => this.students = students);
  }

  studentSelected(event : any) : void {
      let selectedStudentRollNumber = event;
        if(selectedStudentRollNumber!='Select student'){
          this.selectedStudent = this.students.filter(s => s.rollNumber == selectedStudentRollNumber)[0];
          this.dataService.getReportData(selectedStudentRollNumber).subscribe((report)=>{
            this.report = report;
            this.report.subjects.forEach((sub:any) => {
              this.subjectMap[sub.code] = sub.name;
            });
            this.report.registration.forEach((r:any) => {
              this.registrationMap[r.registrationId] = r.subjectCode;
            });
            this.report.exams.forEach((e:any) => {
              let regId = e.registrationId;
              let subName = this.subjectMap[this.registrationMap[e.registrationId]];
              e.subjectName = subName;
            });
        });
      }
  }

}
