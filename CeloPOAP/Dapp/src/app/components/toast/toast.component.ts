import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, Renderer2 } from '@angular/core';

import { ToastComponent, ToasterService } from '@coreui/angular';


@Component({
  selector: 'app-toast-sample',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  providers: [{ provide: ToastComponent, useExisting: forwardRef(() => AppToastComponent) }]
})
// @ts-ignore
export class AppToastComponent extends ToastComponent {

  // @ts-ignore
  @Input() closeButton = true;
  // @ts-ignore
  @Input() title: any = '';

  // @ts-ignore
  @Input() body: any = ''; 

  constructor(
    public override hostElement: ElementRef,
    public override renderer: Renderer2,
    public override toasterService: ToasterService,
    public override changeDetectorRef: ChangeDetectorRef
  ) {
    super(hostElement, renderer, toasterService, changeDetectorRef);
  }
}