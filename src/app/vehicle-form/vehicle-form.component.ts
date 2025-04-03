import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../data/vehicle.service';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent {
  @Output() vehicleTypeChange = new EventEmitter<string>();

  vehicleForm: FormGroup;
  vehicleSubtypes: { [key: string]: string[] } = {
    auto: ['Hatchback', 'Sedan', 'Station', 'Cabriolet', 'Coupé', 'MPV', 'Terreinauto'],
    motor: ['All-road', 'Naked', 'Enduro', 'Race', 'Toermotor', 'Chopper', 'Zijspan'],
    scooter: []
  };

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      vehicleType: ['auto', Validators.required],
      vehicleSubtype: [''],
      licensePlate: ['', [Validators.required]]
    });
  }

  updateVehicleType() {
    const vehicleType = this.vehicleForm.get('vehicleType')?.value;
    this.vehicleService.setVehicleType(vehicleType);
    this.vehicleTypeChange.emit(vehicleType);
  }

  formatLicensePlate() {
    const plate = this.vehicleForm.get('licensePlate')?.value;
    const formattedPlate = this.vehicleService.formatLicensePlate(plate);
    this.vehicleForm.get('licensePlate')?.setValue(formattedPlate);
    this.vehicleService.setLicensePlate(formattedPlate);
  }

  validateLicensePlate(plate: string) {
    const licensePlateControl = this.vehicleForm.get('licensePlate');
    const isValid = this.vehicleService.isValidPlate();

    if (!isValid) {
      licensePlateControl?.setErrors({ invalidPlate: true });
    } else {
      licensePlateControl?.setErrors(null);
    }
  }
}