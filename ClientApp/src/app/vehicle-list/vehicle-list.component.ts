import { VehicleService } from './../services/vehicle.service';
import { Vehicle } from './../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles;
  makes;
  filter: any = {};

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.populateMakes();
    this.populateVehicles();
  }

  private populateMakes() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.filter)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  onFilterChange() {
    this.filter.modelId = 2;
    this.populateVehicles();
  }

  resetFilter() {
    this.filter = {};
    this.onFilterChange();
  }
}
