import { Injectable } from '@nestjs/common';
import { createId } from '@paralleldrive/cuid2';
import { ReportType, data } from '../data';
import { ICreateBody, IUpdateBody } from './interfaces/IBody';
import { ReportResponseDto } from './dtos/report.dto';

@Injectable()
export class ReportService {
  getReports(type: ReportType): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report
      .filter((report) => report.type === reportType)
      .map((report) => new ReportResponseDto(report));
  }

  getReportById(type: ReportType, id: string): ReportResponseDto {
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);
    return new ReportResponseDto(report);
  }

  createReport(body: ICreateBody, type: ReportType): ReportResponseDto {
    const newReport = {
      id: createId(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type,
    };
    data.report.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    body: IUpdateBody,
    type: ReportType,
    id: string,
  ): ReportResponseDto {
    const hasId = data.report.find((report) => report.id === id);
    if (!hasId) {
      throw new Error('Target report not found');
    }
    const reportIndex = data.report.findIndex((hasId) => hasId.id === id);
    const updatedReport = {
      id: hasId.id,
      source: body.source || hasId.source,
      amount: body.amount || hasId.amount,
      created_at: hasId.created_at,
      updated_at: new Date(),
      type: type,
    };
    data.report[reportIndex] = updatedReport;
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id: string): ReportResponseDto[] {
    const hasId = data.report.find((report) => report.id === id);
    if (!hasId) {
      throw new Error('Target report not found');
    }
    const reportIndex = data.report.findIndex((hasId) => hasId.id === id);
    return data.report
      .splice(reportIndex, 1)
      .map((report) => new ReportResponseDto(report));
  }
}
