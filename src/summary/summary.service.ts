import { Injectable } from '@nestjs/common';
import { data, ReportType } from '../data';
import SummaryDto from './dtos/summary.dto';
import { ISummary } from './interfaces/ISummary';

@Injectable()
export class SummaryService implements ISummary {
  getSummary(): SummaryDto {
    const totalIncome = this.getTotalIncome();
    const totalExpense = this.getTotalExpense();
    const netIncome = this.getNetIncome();

    const summaryDto: SummaryDto = {
      totalIncome,
      totalExpense,
      netIncome,
    };
    return summaryDto;
  }
  private getNetIncome(): number {
    return this.getTotalIncome() - this.getTotalExpense();
  }
  private getTotalIncome(): number {
    const totalIncome = data.report
      .filter((report) => report.type === ReportType.INCOME)
      .reduce((sum, obj) => sum + obj.amount, 0);
    return totalIncome;
  }

  private getTotalExpense(): number {
    const totalExpense = data.report
      .filter((report) => report.type === ReportType.EXPENSE)
      .reduce((sum, obj) => sum + obj.amount, 0);
    return totalExpense;
  }
}
