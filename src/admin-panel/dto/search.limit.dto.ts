import { Type } from 'class-transformer';
import { Max, IsOptional, Min, IsInt } from 'class-validator';
import { defaultSearchResultLimit } from 'src/consts ';

export class SearchLimitDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(defaultSearchResultLimit)
  limit?: number;
}
