import {Component, Input, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'brick-spacer',
  template: `<div class="spacer" [ngStyle]="{ 'height.px': size, 'width.px': size }"></div>`,
  styles: [':host { flex-grow: 1 }']
})
export class SpacerComponent {
  @Input() size = 40;
}
