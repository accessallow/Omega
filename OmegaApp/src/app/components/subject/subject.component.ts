import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
declare var $: any;

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private dataService: DataService) { }

  subjects:any[] = [];
  editMode = false;
  subjectName = '';
  subjectCode = '';

  ngOnInit(): void {
    this.dataService.getSubjects().subscribe((subjects)=>{
        this.subjects = subjects;
    });
  }

  triggerReload(){
    this.dataService.dataReload.next("SUBJECTS");
  }

  loadSubjects() {
    this.dataService.getSubjects().subscribe((subjects)=>{
      this.subjects = subjects;
    });
  }

  public addSubject(): void {
    if (this.subjectName.trim() != '') {
      this.dataService
        .addSubject({
          name: this.subjectName.trim(),
          code: -1,
        })
        .subscribe((data) => {
          this.loadSubjects();
          this.closeModal();
          this.subjectName = '';
          this.triggerReload();
        });
    }
  }

  closeModal() {
    this.editMode = false;
    $('#subjectModal').modal('hide');
  }

  openModal() {
    $('#subjectModal').modal('show');
  }

  deleteSubject(subjectCode: string) {
    let subjectDeleted = this.subjects.find((s) => s.code == subjectCode);
    if (subjectDeleted) {
      this.dataService.deleteSubject(subjectDeleted).subscribe((r) => {
        this.loadSubjects();
        this.triggerReload();
      });
    }
  }

  editSubjectDialog(subjectCode: string) {
    let subjectToEdit = this.subjects.find((s) => s.code == subjectCode);
    if (subjectToEdit) {
      this.subjectName = subjectToEdit.name;
      this.subjectCode = subjectToEdit.code;
      this.editMode = true;
      this.openModal();
    }
  }

  updateSubject(subjectCode: string) {
    if (subjectCode != '') {
      let subjectToEdit = this.subjects.find((s) => s.code == subjectCode);
      if (subjectToEdit) {
        subjectToEdit.name = this.subjectName;
        this.dataService.updateSubject(subjectToEdit).subscribe((r) => {
          this.closeModal();
          this.loadSubjects();
        });
      }
    }
  }

  addSubjectDialog() {
    this.subjectName = '';
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

  confirmDelete(subjectCode: string) {
    let subjectToDelete = this.subjects.find((s) => s.code == subjectCode);
    if (subjectToDelete) {
      this.confirmObj.confirmMessage =
        'Are you sure want to delete subject : <b>' + subjectToDelete.name + '</b>?';
      this.confirmObj.cancel = () => {
        $('#confirmSubjectModal').modal('hide');
      };
      this.confirmObj.confirm = () => {
        this.deleteSubject(subjectToDelete.code);
        $('#confirmSubjectModal').modal('hide');
      };
      $('#confirmSubjectModal').modal('show');
    }
  }
}
