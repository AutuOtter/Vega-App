import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import { ActivatedRoute, Router } from '../../../node_modules/@angular/router';
import { Observable } from '../../../node_modules/rxjs/Observable';
import 'rxjs/add/Observable/forkJoin';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  makes;
  models;
  features;
  vehicle: any = {
    features: [],
    contact: {}
  };

  // Ideally have no more than 3 services, 5 is max.
  // Creates a lot of dependecies that are hard to unit test.
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService) { 

      route.params.subscribe(p => {
        this.vehicle.id = +p['id'];
      });
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];

    if (this.vehicle.id)
      sources.push(this.vehicleService.getVehicle(this.vehicle.id));

    Observable.forkJoin(sources).subscribe(data => {
      this.makes = data[0];
      this.makes = data[1];

      if (this.vehicle.id)
        this.vehicle = data[2];

    }, err => {
      if (err.status == 404)
        this.router.navigate(['/home'])
    });
  }

  onMakeChange() {
    var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
      else {
        var index = this.vehicle.features.indexOf(featureId);
        this.vehicle.features.splice(index, 1);
      }
  }

  submit() {
   this.vehicleService.create(this.vehicle)
    .subscribe(
      x => console.log(x),
      // There should be a toasty toast here
    );
  }
}
