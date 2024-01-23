import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  @Input('logo') logo: string = '';
  @Input('shortLogo') shortLogo: string = '';

  public resizeInfo(): string {
    return innerWidth < 375 ? this.shortLogo : this.logo;
  }

  ngOnInit(): void {
    this.resizeInfo();
    window.onresize = () => { this.resizeInfo(); };
  }


  public goHome(): void {
    this.router.navigate([""]);
  }
}
