import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footer-container fixed-bottom" [ngStyle]="{background: 'url(./assets/images/bg_footer.png)'}">
    <div class="copyright">
      Copyright @ 2020 Melon gaming all price are exclusive of tax. <b>Term of Service and EULA</b>
    </div>
  </div>
  `,
  styles: [`.footer-container {padding: 5px;}  .copyright{color: white; text-align: center}`]
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

}
