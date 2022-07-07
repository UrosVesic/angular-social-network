import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  enteredValue: string = '';
  @Output()
  searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  onSearchTextChanged() {
    this.searchTextChanged.emit(this.enteredValue);
  }
}
