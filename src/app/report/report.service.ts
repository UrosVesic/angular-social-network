import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReportPayload } from './report-payload';
import { ReportStatus } from './report-status';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  reportPost(repoprtPayload: ReportPayload): Observable<any> {
    return this.http.post<ReportPayload>(
      'http://localhost:8080/api/report',
      repoprtPayload
    );
  }

  changeReportStatus(
    postId: number,
    reportStatus: ReportStatus
  ): Observable<any> {
    return this.http.patch<ReportPayload>(
      'http://localhost:8080/api/report/change-status/' + postId,
      reportStatus
    );
  }
}
