import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.navigate(['/usuario/login'], { relativeTo: this.route });
  }

  ngOnInit(): void {
  }

}
