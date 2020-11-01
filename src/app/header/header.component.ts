import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() recipesBtnEvent = new EventEmitter();
  @Output() shoppingListBtnEvent = new EventEmitter();

  collapsed: boolean;


  constructor() { }

  ngOnInit(): void {
    this.collapsed = true;
  }
}
