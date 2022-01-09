import { Component, HostBinding } from '@angular/core';
import { ScreenService, AppInfoService } from './shared/services';
import { StoreFacadeService } from './Store/store-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') get getClass() {
    return Object.keys(this.screen.sizes)
      .filter((cl) => this.screen.sizes[cl])
      .join(' ');
  }

  constructor(
    private screen: ScreenService,
    public appInfo: AppInfoService,
    private storeFacadeService: StoreFacadeService
  ) {
    this.storeFacadeService.getData();
  }
}
