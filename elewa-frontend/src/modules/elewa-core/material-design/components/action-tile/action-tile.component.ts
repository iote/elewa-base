import { Component, OnInit, OnDestroy, Inject, Input, Output, EventEmitter } from '@angular/core';


/**
 * An Action Tile is a custom component used to display rich media about a certain object  
 */
@Component({
  selector: 'ele-action-tile',
  templateUrl: './action-tile.component.html', 
  styleUrls: ['./action-tile.component.scss']
})
export class ActionTileComponent implements OnInit { 
  // Override block with better typing
  @Input() label: string;

  @Input() iconUrl: string;
  @Input() icon: string; // Use for when using font awesome
  @Input() text: string;

  @Input() slug: string;
  @Input() color: string;
  @Input() type = 'normal'; // Used as a css class. E.g. short

  @Output() click = new EventEmitter();

  ngOnInit() {
    
  }
  
  doAction() {
    this.click.emit();
  }

  getClasses() {
                  // Type of tile is always added as class
    let classes = this.type;

    if(this.slug != null) {
       classes += ' ' + this.slug + '-background';
    }
    
    return classes;
  }
}
