import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsOptional,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';
import { ReportType } from '../../data';
export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class UpdateReportDto {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  amount?: number;
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  source?: string;
}

export class ReportResponseDto {
  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
  id: string;
  source: string;
  amount: number;
  @Exclude()
  created_at: Date;
  @Exclude()
  updated_at: Date;

  type: ReportType;

  @Expose({ name: 'createAt' })
  transformCreatedAt() {
    return this.created_at;
  }
}
