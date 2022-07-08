import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  constructor(private dataService: DataService) { }

  exams:any[] = [];
  registrations:any[] = [];
  students:any[] = [];
  subjects:any[] = [];

  subjectsForStudent:any[] = [];
  selectedRegistration:any;

  ngOnInit(): void {
    this.loadData();

    this.dataService.dataReload.subscribe((event) => {
      this.loadData();
    });

  }

  editMode = false;
  regId = '';
  examId = '';
  subjectCode = '';
  rollNumber = '';
  marks = '';

  loadData(){
    this.loadExams();
    this.loadRegistrations();
    this.loadSubjects();
    this.loadStudents();
  }

  loadExams(){
    this.dataService.getExams().subscribe((exams)=>{
      this.exams = exams;
    });
  }

  loadRegistrations() {
    this.dataService.getRegistrations().subscribe((registrations)=>{
        this.registrations = registrations;
    });
  }

  loadStudents() {
    this.dataService.getStudents().subscribe((students)=>{
        this.students = students;
    });
  }

  loadSubjects() {
    this.dataService.getSubjects().subscribe((subjects)=>{
        this.subjects = subjects;
    });
  }

  public addExam(): void {
    if (this.subjectCode!= '' && this.rollNumber!='' && this.marks.trim()!='') {
      let registration = this.registrations.filter(r => r.rollNumber == this.rollNumber).filter(r => r.subjectCode == this.subjectCode);
      if(registration && registration.length>0){
          this.dataService
          .addExam({
            examId: -1,
            registrationId: registration[0].registrationId,
            marks : this.marks.trim()
          })
          .subscribe((data) => {
            this.loadData();
            this.closeModal();
            this.subjectCode = '';
            this.rollNumber = '';
            this.marks = '';
          });
      }
    }
  }

  closeModal() {
    this.editMode = false;
    $('#examModal').modal('hide');
  }

  openModal() {
    $('#examModal').modal('show');
  }

  deleteExam(examId: string) {
    let examDeleted = this.exams.find((s) => s.examId == examId);
    if (examDeleted) {
      this.dataService.deleteExam(examDeleted).subscribe((r) => {
        this.loadExams();
      });
    }
  }

  editExamDialog(examId: string) {
    let examToEdit = this.exams.find((s) => s.examId == examId);
    if (examToEdit) {
      this.examId = examToEdit.examId;
      this.regId = examToEdit.registration.registrationId;
      this.rollNumber = examToEdit.student.rollNumber;
      this.studentSelected(this.rollNumber);
      this.subjectCode = examToEdit.subject.code;
      this.marks = examToEdit.marks;
      this.editMode = true;
      this.openModal();
    }
  }

  updateExam(examId: string) {
    if (examId != '') {
      let examToEdit = this.exams.find((s) => s.examId == examId);
      if (examToEdit) {
        examToEdit.registrationId = this.regId;
        examToEdit.marks = this.marks;
        this.dataService.updateExam(examToEdit).subscribe((r) => {
          this.closeModal();
          this.loadExams();
        });
      }
    }
  }

  addExamDialog() {
    this.rollNumber = '';
    this.subjectCode = '';
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

  confirmDelete(examId: string) {
    let examToDelete = this.exams.find((s) => s.examId == examId);
    if (examToDelete) {
      this.confirmObj.confirmMessage =
        'Are you sure want to delete exam : <b>' + examToDelete.examId + ' </b> for student <b>'+examToDelete.student.name+'</b>?';
      this.confirmObj.cancel = () => {
        $('#confirmExamModal').modal('hide');
      };
      this.confirmObj.confirm = () => {
        this.deleteExam(examToDelete.examId);
        $('#confirmExamModal').modal('hide');
      };
      $('#confirmExamModal').modal('show');
    }
  }

  studentSelected(event:any){
    console.log("event = ",event);
    if(event!='Select student'){
      //get registration for this student
      let studentRegistrations = this.registrations.filter(r => r.rollNumber == event);
      let studentSubjectCodeArray:any = [];
      studentRegistrations.forEach(s => studentSubjectCodeArray.push(s.subjectCode));
      this.subjectsForStudent = this.subjects.filter(s => studentSubjectCodeArray.includes(s.code));
    }
  }

}
