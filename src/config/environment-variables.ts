import {IsNumberString, IsOptional, IsString, validateSync} from 'class-validator';
import {existsSync, readFileSync} from 'fs';
import {resolve} from 'path';
import {parse} from 'dotenv';

export class EnvironmentVariables {
  @IsNumberString()
  public readonly PORT: string = '80';

  @IsOptional()
  @IsString()
  public readonly HOST?: string;

  constructor(customConfig?: object) {
    const dotEnvFile = resolve(process.cwd(), '.env');
    Object.assign(this, {
      ...process.env,
      ...existsSync(dotEnvFile) && parse(readFileSync(dotEnvFile)),
      ...customConfig,
    });

    const validationErrors = validateSync(this);
    if (validationErrors.length > 0) {
      throw validationErrors[0];
    }
  }
}
