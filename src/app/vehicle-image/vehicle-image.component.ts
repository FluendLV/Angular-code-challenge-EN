// vehicle-image.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleService } from '../data/vehicle.service';

@Component({
  selector: 'app-vehicle-image',
  templateUrl: './vehicle-image.component.html',
  styleUrls: ['./vehicle-image.component.css']
})
export class VehicleImageComponent implements OnInit {
  @Input() vehicleType: string = 'auto';
  vehicleImage$: Observable<string>;

  constructor(private vehicleService: VehicleService) {
    this.vehicleImage$ = this.vehicleService.vehicleImage$;
  }

  ngOnInit(): void {
    this.vehicleService.setVehicleType(this.vehicleType);
  }
}
