import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild('agGrid', { static: false }) agGrid!: AgGridAngular;
  title = 'first-angular-grid';

  columnDefs = [
    {
      headerName: 'User Id',
      field: 'userId',
      rowGroup: true,
    },
    {
      headerName: 'Id',
      field: 'id',
      sortable: true,
      filter: true,
    },
    { headerName: 'Title', field: 'title', sortable: true, filter: true },
    { headerName: 'Message', field: 'body', sortable: true, filter: true },
  ];

  autoGroupColumnDef = {
    headerName: 'Group',
    field: 'usedId',
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
      suppressCount: true,
    },
  };

  rowData: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.rowData = this.http.get<any[]>(
      'https://jsonplaceholder.typicode.com/posts'
    );
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedDataStringPresentation = selectedData
      .map((node) => node.title)
      .join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }
}
