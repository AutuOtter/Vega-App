import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes;
  models;
  features;
  vehicle: any = {};

  // Ideally have no more than 3 services, 5 is max.
  // Creates a lot of dependecies that are hard to unit test.
  constructor(
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
    .subscribe(makes => this.makes = makes);

      this.vehicleService.getFeatures()
      .subscribe(features => this.features = features)
  }

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }
}
