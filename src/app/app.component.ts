import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PlaceholderService } from './placeholder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  columns: any [] = [
    { columnDef: 'id', header: 'Id'},
    { columnDef: 'userId', header: 'User Id'},
    { columnDef: 'title', header: 'Title'},
    { columnDef: 'completed', header: 'Completed'}
  ];
  displayedColumns: string[] = this.columns.map(c => c.columnDef);
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatSort, {static: true})sort: MatSort;
  dataSub: Subscription;
  originalFilter: (data: any, filter: string) => boolean;
  constructor(private placeHolderService: PlaceholderService) {

  }
  ngOnInit(): void {
    this.dataSub = this.placeHolderService.get().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.originalFilter = this.dataSource.filterPredicate;
    });
  }
  ngOnDestroy(): void {
    this.dataSub.unsubscribe();
  }

  buttonToggle(event: MatButtonToggleChange): any {
    switch (event.value) {
      case 'id':
        this.dataSource.filterPredicate = this.filterById;
        break;
      case 'userId':
        this.dataSource.filterPredicate = this.filterByUserId;
        break;
      case 'all':
        this.dataSource.filterPredicate = this.originalFilter;
        break;
    }
  }

  private filterById(data: any, filter: string): boolean {
    return !filter || data.id === +filter;
  }

  private filterByUserId(data: any, filter: string): boolean {
    return !filter || data.userId === +filter;
  }

  applyFilter(value: string): void {
    this.dataSource.filter = value;
  }
}
