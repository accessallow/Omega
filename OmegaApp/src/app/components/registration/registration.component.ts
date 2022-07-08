import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private dataService: DataService) { }

  registrations:any[] = [];
  students:any[] = [];
  subjects:any[] = [];

  ngOnInit(): void {
    this.loadData();

    this.dataService.dataReload.subscribe((event) => {
        if(event == "SUBJECTS" || event == "STUDENTS"){
          this.loadData();
        }
    });
  }

  triggerReload(){
    this.dataService.dataReload.next("REG");
  }

  loadData(){
    this.loadRegistrations();
    this.loadSubjects();
    this.loadStudents();
  }

  editMode = false;
  regId = '';
  subjectCode = '';
  rollNumber = '';

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

  public addRegistration(): void {
    if (this.subjectCode!= '' && this.subjectCode!='') {
      this.dataService
        .addRegistration({
          rollNumber: this.rollNumber,
          subjectCode: this.subjectCode,
        })
        .subscribe((data) => {
          this.loadRegistrations();
          this.closeModal();
          this.subjectCode = '';
          this.subjectCode = '';
          this.triggerReload();
        });
    }
  }

  closeModal() {
    this.editMode = false;
    $('#regModal').modal('hide');
  }

  openModal() {
    $('#regModal').modal('show');
  }

  deleteRegistration(registrationId: string) {
    let regDeleted = this.registrations.find((s) => s.registrationId == registrationId);
    if (regDeleted) {
      this.dataService.deleteRegistration(regDeleted).subscribe((r) => {
        this.loadRegistrations();
        this.triggerReload();
      });
    }
  }

  editRegistrationDialog(registrationId: string) {
    let regToEdit = this.registrations.find((s) => s.registrationId == registrationId);
    if (regToEdit) {
      this.regId = regToEdit.registrationId;
      this.rollNumber = regToEdit.rollNumber;
      this.subjectCode = regToEdit.subjectCode;
      this.editMode = true;
      this.openModal();
    }
  }

  updateRegistration(regId: string) {
    if (regId != '') {
      let regToEdit = this.registrations.find((s) => s.registrationId == regId);
      if (regToEdit) {
        regToEdit.rollNumber = this.rollNumber;
        regToEdit.subjectCode = this.subjectCode;
        this.dataService.updateRegistration(regToEdit).subscribe((r) => {
          this.closeModal();
          this.loadRegistrations();
        });
      }
    }
  }

  addRegistrationDialog() {
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

  confirmDelete(regId: string) {
    let regToDelete = this.registrations.find((s) => s.registrationId == regId);
    if (regToDelete) {
      this.confirmObj.confirmMessage =
        'Are you sure want to delete registration : <b>' + regToDelete.registrationId + '</b>?';
      this.confirmObj.cancel = () => {
        $('#confirmRegModal').modal('hide');
      };
      this.confirmObj.confirm = () => {
        this.deleteRegistration(regToDelete.registrationId);
        $('#confirmRegModal').modal('hide');
      };
      $('#confirmRegModal').modal('show');
    }
  }

}
