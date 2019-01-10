import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WebinarService } from '../webinar.service'
import { Webinar } from '../webinar';

@Component({
  selector: 'app-webinar-details',
  templateUrl: './webinar-details.component.html',
  styleUrls: ['./webinar-details.component.css']
})
export class WebinarDetailsComponent implements OnInit {
  webinar: Webinar;
  id: number;

  constructor(private webinarService: WebinarService, private route: ActivatedRoute) {
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.webinarService.getSingleWebinar(this.id)
      .subscribe(webinar => this.webinar = webinar);
  }

}
