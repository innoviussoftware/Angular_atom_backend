import { Component, OnInit } from '@angular/core';

import { WebinarService } from "../webinar.service";
import { Webinar } from "../webinar";

declare var $: any;

@Component({
  selector: 'app-webinars',
  templateUrl: './webinars.component.html',
  styleUrls: ['./webinars.component.css']
})
export class WebinarsComponent implements OnInit {
  webinars = [];
  constructor(private webinarService: WebinarService) { }

  ngOnInit() {
    this.getWebinars()
  }

  getWebinars(): void {
    this.webinarService.getWebinars()
      .subscribe(webinars => this.webinars = webinars);
  }

  delete(webinar: Webinar): void {
    if (confirm('Are you sure you want to delete this webinar ?')) {
      this.webinars = this.webinars.filter(w => w !== webinar);
      this.webinarService.deleteWebinar(webinar).subscribe();
    }
  }
}
