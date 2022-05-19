import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationRequestQuery {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public offset?: number = 0;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public limit?: number = 100;
}
