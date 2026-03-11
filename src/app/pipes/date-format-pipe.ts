import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
})

export class DateFormatPipe implements PipeTransform {
  
  // transform date to specified format
  transform(value: string | Date, format = 'dd/MM/yyyy'): string {
    if (!value) return '';

    const date: Date = typeof value === 'string' ? new Date(value) : value;

    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();

    if (format === 'dd/MM/yyyy') return `${day}/${month}/${year}`;
    if (format === 'MM/dd/yyyy') return `${month}/${day}/${year}`;
    if (format === 'yyyy-MM-dd') return `${year}-${month}-${day}`;

    return date.toDateString();
  }
}