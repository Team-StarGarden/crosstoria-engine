import { IsNumber, IsOptional, IsString } from 'class-validator';
import { EnvironmentVariables } from './environment-variables';

// tempCode
export class Config {
  @IsNumber()
  public readonly port: number;

  @IsOptional()
  @IsString()
  public readonly host?: string;

  constructor(customConfig?: Record<string, string>) {
    const env = new EnvironmentVariables(customConfig);
    this.port = parseInt(env.PORT);
    this.host = env.HOST;
  }
}

export const config = new Config();
