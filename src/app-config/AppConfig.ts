import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient, HttpBackend } from "@angular/common/http";

@Injectable()
export class AppConfig {
    public static settings: IAppConfig;
    private httpClient: HttpClient;

    // https://stackoverflow.com/questions/46469349/how-to-make-an-angular-module-to-ignore-http-interceptor-added-in-a-core-module/49013534#49013534
    // ko inject httpClient vì sẽ trigger AuthInterceptor => ko load đc resource
    constructor(handler: HttpBackend) {
        this.httpClient = new HttpClient(handler);
    }

    load() {
        const jsonFile = `assets/configs/config.${environment.name}.json`;
        return new Promise<void>((resolve, reject) => {
            this.httpClient.get(jsonFile).toPromise().then((response: IAppConfig) => {
                AppConfig.settings = <IAppConfig>response;
                resolve();
            }).catch((response: any) => {
                reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
            });
        });
    }
}

export interface IAppConfig {
    apiUrl: string;

    question: {
        getQuestionUrl: string;
        getQuestionPagingUrl: string;
        createQuestionUrl: string;
        updateQuestionUrl: string;
        deleteQuestionUrl: string;
    }
}
