import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
declare var $: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  constructor(private dataService: DataService) {}

  students: any[] = [];
  editMode = false;
  studentName = '';
  studentRollNumber = '';

  ngOnInit(): void {
    this.loadStudents();
    // this.dataService.dataReload.subscribe(()=>{
    //   this.loadStudents();
    // });
  }

  triggerReload(){
    this.dataService.dataReload.next("STUDENTS");
  }

  loadStudents() {
    this.dataService.getStudents().subscribe((students) => {
      this.students = students;
    });
  }

  public addStudent(): void {
    if (this.studentName.trim() != '') {
      this.dataService
        .addStudent({
          name: this.studentName.trim(),
          rollNumber: -1,
        })
        .subscribe((data) => {
          this.loadStudents();
          this.closeModal();
          this.studentName = '';
          this.triggerReload();
        });
    }
  }

  closeModal() {
    this.editMode = false;
    $('#studentModal').modal('hide');
  }

  openModal() {
    $('#studentModal').modal('show');
  }

  deleteStudent(rollNumber: string) {
    let studentDeleted = this.students.find((s) => s.rollNumber == rollNumber);
    if (studentDeleted) {
      this.dataService.deleteStudent(studentDeleted).subscribe((r) => {
        this.loadStudents();
        this.triggerReload();
      });
    }
  }

  editStudentDialog(rollNumber: string) {
    let studentToEdit = this.students.find((s) => s.rollNumber == rollNumber);
    if (studentToEdit) {
      this.studentName = studentToEdit.name;
      this.studentRollNumber = studentToEdit.rollNumber;
      this.editMode = true;
      this.openModal();
    }
  }

  updateStudent(rollNumber: string) {
    if (rollNumber != '') {
      let studentToEdit = this.students.find((s) => s.rollNumber == rollNumber);
      if (studentToEdit) {
        studentToEdit.name = this.studentName;
        this.dataService.updateStudent(studentToEdit).subscribe((r) => {
          this.closeModal();
          this.loadStudents();
        });
      }
    }
  }

  addStudentDialog() {
    this.studentName = '';
    this.editMode = false;
    this.openModal();
  }

  //Confirm
  confirmObj = {
    confirmHeader: 'Confirm Operation',
    confirmMessage: 'Are you sure want to delete?',
    cancel: () => {
      alert('Yes');
    },
    confirm: () => {
      alert('No');
    },
  };

  confirmDelete(rollNumber: string) {
    let studentToDelete = this.students.find((s) => s.rollNumber == rollNumber);
    if (studentToDelete) {
      this.confirmObj.confirmMessage =
        'Are you sure want to delete <b>' + studentToDelete.name + '</b>?';
      this.confirmObj.cancel = () => {
        $('#confirmModal').modal('hide');
      };
      this.confirmObj.confirm = () => {
        this.deleteStudent(studentToDelete.rollNumber);
        $('#confirmModal').modal('hide');
      };
      $('#confirmModal').modal('show');
    }
  }
}
