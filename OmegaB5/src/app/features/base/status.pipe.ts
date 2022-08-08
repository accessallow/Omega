import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    if(!value) return '';
    let badgeClass = '';

    switch(value){
      case 'PLANNED': badgeClass='secondary'; break;
      case 'ONGOING': badgeClass='primary'; break;
      case 'COMPLETED': badgeClass='success'; break;
      default: badgeClass = 'secondary';
    }

    return '<span class="badge bg-'+badgeClass+'">'+value+'</span>';
  }

}
