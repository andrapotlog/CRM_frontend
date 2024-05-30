import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priorityTransform'
})
export class PriorityTransformPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'CRITICAL':
        return 'Critical';
      case 'HIGH':
        return 'High';
      case 'MEDIUM':
        return 'Medium';
      case 'LOW':
        return 'Low';
      default:
        return value;
    }
  }

}
