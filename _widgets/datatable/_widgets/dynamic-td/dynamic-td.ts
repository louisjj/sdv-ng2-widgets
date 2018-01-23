import {
  Component, OnInit, OnDestroy, Input, ComponentFactoryResolver,
  ViewContainerRef, ViewChild
} from '@angular/core';


@Component({
  selector: 'dynamic-td',
  template: '<div #placeholder></div>'
})
export class DynamicTdComponent implements OnInit, OnDestroy {

  @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;

  public dynamicTd: any = null;
  @Input() public data: any = null;
  @Input() public classComponent: any = null;

  constructor(
    private _factoryResolver: ComponentFactoryResolver,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    let factory = this._factoryResolver.resolveComponentFactory(this.classComponent);
    this.dynamicTd = this.viewContainerRef.createComponent(factory);
    this.sendDataToDynamicTd();
  }

  ngOnDestroy() {
    if (this.dynamicTd) {
      this.dynamicTd.destroy();
    }
  }

  /**
   * Envoie des données à l'enfant.
   */
  private sendDataToDynamicTd() {
    if (this.dynamicTd) {
      this.dynamicTd.instance.data = this.data;
    }
  }
}
