import { HttpClient, HttpHeaders } from '@angular/common/http';

export class BaseHttpService {

    constructor(protected httpClient: HttpClient) { }

    httpPost<TModel>(url: string, model: TModel): Promise<any> {
        return this.httpClient.post(url, model, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            })
        }).toPromise();
    }

    httpGet(url: string): Promise<any> {
        return this.httpClient.get(url).toPromise();
    }

    httpPut(url: string, model: any): Promise<any> {
        return this.httpClient.put(url,model,{
            headers: new HttpHeaders({
                'Content-Type': 'application/json; charset=utf-8'
            })
        }).toPromise();
    }

    httpDelete(url: string): Promise<any> {
        return this.httpClient.delete(url).toPromise();
    }
}
