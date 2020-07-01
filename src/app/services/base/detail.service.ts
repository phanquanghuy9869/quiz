import { BaseHttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { CollectionViewer } from '@angular/cdk/collections';

export abstract class DetailService extends BaseHttpService {
    abstract getUrl: string;
    abstract addUrl: string;
    abstract updateUrl: string;
    abstract deleteUrl: string;

    constructor(protected httpClient: HttpClient) {
        super(httpClient);
    }

    get(id: any) {
        return this.httpGet(`${this.getUrl}/${id}`)
    }

    add(model: any) {
        return this.httpPost(this.addUrl, model);
    }

    update(id: any, model: any) {
        return this.httpPut(`${this.updateUrl}/${id}`, model);
    }

    delete(id: any){
        return this.httpDelete(this.deleteUrl);
    }
}
