import { Controller, Get } from '@nestjs/common';
import { ISummary } from './interfaces/ISummary';

@Controller('summary')
export class SummaryController {
  constructor(private readonly summaryService: ISummary) {}

  @Get()
  getSummary() {
    return this.summaryService.getSummary();
  }
}
