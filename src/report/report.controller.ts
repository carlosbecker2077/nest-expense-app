import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Body,
} from '@nestjs/common';
import { ReportType } from '../data';
import { ReportService } from './report.service';
import {
  CreateReportDto,
  ReportResponseDto,
  UpdateReportDto,
} from './dtos/report.dto';
@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getReports(@Param('type') type: string): ReportResponseDto[] {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type') type: string,
    @Param('id') id: string,
  ): ReportResponseDto {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body() body: CreateReportDto,
    @Param('type') type: ReportType,
  ): ReportResponseDto {
    return this.reportService.createReport(body, type);
  }

  @Put(':id')
  updateReport(
    @Body() body: UpdateReportDto,
    @Param('type') type: ReportType,
    @Param('id') id: string,
  ): ReportResponseDto {
    return this.reportService.updateReport(body, type, id);
  }
  @Delete(':id')
  deleteReport(@Param('id') id: string): ReportResponseDto[] {
    return this.reportService.deleteReport(id);
  }
}
