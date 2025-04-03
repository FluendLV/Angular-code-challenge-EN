import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private vehicleTypeSubject = new BehaviorSubject<string>('auto');
  private licensePlateSubject = new BehaviorSubject<string>('');
  isValid: boolean = false;
  
  vehicleImage$ = this.vehicleTypeSubject.asObservable().pipe(
    map(vehicleType => `assets/${vehicleType}.jpg`)
  );

  vehicleType$ = this.vehicleTypeSubject.asObservable();
  licensePlate$ = this.licensePlateSubject.asObservable();

  setVehicleType(vehicleType: string) {
    this.vehicleTypeSubject.next(vehicleType);
  }

  setLicensePlate(plate: string) {
    this.licensePlateSubject.next(plate);
  }

  formatLicensePlate(plate: string): string {
    let rawPlate = plate.toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!rawPlate) return '';

    let formattedPlate = rawPlate;
    this.isValid = false;

    // Plate formats validation and formatting with regex, sorry I had not enough time to understand that library works.
    if (/^[A-Z]{2}\d{2}[A-Z]{2}$/.test(rawPlate)) {
      formattedPlate = `${rawPlate.slice(0, 2)}-${rawPlate.slice(2, 4)}-${rawPlate.slice(4)}`;
      this.isValid = true;
    } else if (/^\d{2}[A-Z]{4}$/.test(rawPlate)) {
      formattedPlate = `${rawPlate.slice(0, 2)}-${rawPlate.slice(2, 4)}-${rawPlate.slice(4)}`;
      this.isValid = true;
    } else if (/^[A-Z]{4}\d{2}$/.test(rawPlate)) {
      formattedPlate = `${rawPlate.slice(0, 2)}-${rawPlate.slice(2, 4)}-${rawPlate.slice(4)}`;
      this.isValid = true;
    }

    return formattedPlate;
  }

  isValidPlate(): boolean {
    return this.isValid;
  }
}
