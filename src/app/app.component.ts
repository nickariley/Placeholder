import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { PlaceholderService } from './placeholder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
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
    throw new Error('Method not implemented.');
  }
}
