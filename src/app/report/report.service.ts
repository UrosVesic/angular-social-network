import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ReportPayload } from './report-payload';
import { ReportStatus } from './report-status';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) {}

  reportPost(repoprtPayload: ReportPayload): Observable<any> {
    return this.http.post<ReportPayload>(
      this.baseUrl + 'api/report',
      repoprtPayload
    );
  }

  changeReportStatus(
    postId: number,
    reportStatus: ReportStatus
  ): Observable<any> {
    return this.http.patch<ReportPayload>(
      this.baseUrl + 'api/report/change-status/' + postId,
      reportStatus
    );
  }
}
