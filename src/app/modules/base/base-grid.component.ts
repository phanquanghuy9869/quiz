import { OnInit, ViewChild } from '@angular/core';
import { BaseGridService, BaseDataSource } from 'src/app/services/base/grid.service';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs/operators';

export abstract class BaseGridComponent<TService extends BaseGridService, TDataSource extends BaseDataSource<TService>> 
implements OnInit {
    abstract displayedColumns = [];
    dataSource: TDataSource;
    filter = { start: 1, length: 0 };
    countTotal = 0;
    public pageSizeOptions = [5, 10, 15, 20];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    constructor(protected _service: TService, private sourceConstructor: new (service: TService) => TDataSource) {
    }

    ngOnInit(): void {
        this.dataSource = new this.sourceConstructor(this._service);      
    }

     // huypq , bổ sung load dữ liệu từ
     ngAfterViewInit(): void {
        this.paginator.page
            .pipe(
                tap(() => this.getPaging()),
            )
            .subscribe();

        this.filter.length = this.paginator.pageSize;
        if (this.filter != null) {
            this.requestData(this.getFilterParams());
        } else {
            this.getPaging();
        }
    }

    abstract getFilterParams(): string;
    resetPaging() {
        this.filter.start = 1;
        this.filter.length = this.paginator.pageSize;
        this.paginator.pageIndex = 0;
    }

    getPaging() {
        const filterParams = this.getFilterParams();
        this.requestData(filterParams);
    }

    async requestData(filterParams) {
        const response = await this.dataSource.getPaging(filterParams);
        this.countTotal = response.count;
    }

    onFormSubmit(event) {
        // tslint:disable-next-line:triple-equals
        if (event.keyCode == 13) {
            this.resetPaging();
            this.getPaging();
        }
    }
}
