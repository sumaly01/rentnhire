import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PropertyService } from "../services/property-services";
import { MouseEvent } from "@agm/core";

@Component({
  selector: "app-view-property",
  templateUrl: "./view-property.component.html",
  styleUrls: ["./view-property.component.scss"],
})
export class ViewPropertyComponent implements OnInit {
  propertyId: string;
  property;
  Url = "http://localhost:4040/";
  images;
  lat: number;
  lng: number;

  constructor(
    private propertyService: PropertyService,
    public activeRouter: ActivatedRoute
  ) {
    this.propertyId = this.activeRouter.snapshot.params["id"];
    this.property = {};
    // this.lat = 51.673858;
    // this.lng = 7.815982;
  }

  ngOnInit() {
    this.propertyService
      .getPropertyById(this.propertyId)
      .subscribe((response: any) => {
        this.property = response.data;
        this.images = this.property.images;

        if (this.property.waterSupply) {
          this.property.waterSupply = "Available";
        } else {
          this.property.waterSupply = "Not Available";
        }

        if (this.property.parking) {
          this.property.parking = "Available";
        } else {
          this.property.parking = "Not Available";
        }
        console.log(response.data);
      });
  }
}
