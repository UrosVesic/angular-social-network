import { ReportStatus } from '../report/report-status';
import { ReportType } from '../report/report-type';

export interface ReportedPostModel {
  id: number;
  title: string;
  content: string;
  username: string;
  topicname: string;
  duration: string;
  reportCount: number;
  reportStatus: ReportStatus;
}
