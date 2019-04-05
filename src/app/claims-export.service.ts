import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Requester} from '../models/Requester';
import {environment} from '../environments/environment';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import * as fileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})

export class ClaimsExportService {

  constructor(private http: HttpClient) { }

  private static performDownload(data, dataType) {
    const blob = new Blob([data], { type: dataType});
    fileSaver.saveAs(blob, 'claimskg_result.' + ClaimsExportService.convertDataTypeToExtension(dataType));
  }

  private static convertDataTypeToExtension(dataType) {
    if (dataType === 'text/csv') {return 'csv'; }
    if (dataType === 'text/turtle') {return 'ttl'; }
  }

  getDownloadClaimsExport(request: Requester, fields, format): Observable<any> {
    let params = new HttpParams().set('Format', format);
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Accept', format),
      responseType: format as 'json',
    };
    params = params.set('query', request.toSPARQLExport(fields));
    return this.http.post<any>(environment.endpoint,  params, options).pipe(map(data => ClaimsExportService.performDownload(data, format)));
  }
}
