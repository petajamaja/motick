import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent {

  hoursToday: number;
  
  @Input()
  dayNumber: number;
  
  @Output() hoursAdded = new EventEmitter();

  saveHours(){
    this.hoursAdded.emit(this.hoursToday);
  }

  constructor() { }
}
