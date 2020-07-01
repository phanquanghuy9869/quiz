import { BaseHttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export abstract class BaseGridService extends BaseHttpService {
    abstract getPagingUrl: string;

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    async getPaging(params: string) {
        return await this.httpGet(`${this.getPagingUrl}/?${params}`);
    }
}

export class BaseDataSource<TService extends BaseGridService> extends DataSource<any>{
    data = new BehaviorSubject<any[]>([]);
   
    constructor(protected dataService: TService) {
        super(); 
    }

    connect(collectionViewer: CollectionViewer): Observable<any[] | readonly any[]> {
        return this.data.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.data.complete();
    }

    async getPaging(params: string) {
        try {
            const response = await this.dataService.getPaging(params);
            this.data.next(response.data);
            return response;
        } catch (error) {
            console.log(error);
        }
    }
}