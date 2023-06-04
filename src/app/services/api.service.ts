import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {}

  get<T = any>(path: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach((key) => {
        if (Array.isArray(params[key])) {
          params[key].forEach((item: any) => {
            httpParams = httpParams.append(key, item);
          });
        } else if (params[key]) {
          httpParams = httpParams.append(key, params[key]);
        }
      });
    }

    return this.http
      .get<T>(`${environment['API_BASE_URL']}${path}`, {
        params: httpParams,
      })
      .pipe(catchError((err) => throwError(() => new Error(err))));
  }
}
