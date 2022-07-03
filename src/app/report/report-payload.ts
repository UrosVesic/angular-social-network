import { ReportType } from './report-type';

export interface ReportPayload {
  postId: number;
  username: string;
  reportType: ReportType;
}
