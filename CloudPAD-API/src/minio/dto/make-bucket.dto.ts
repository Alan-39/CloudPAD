import { IsNotEmpty, IsString } from "class-validator";

export class MakebucketDto {
  @IsNotEmpty()
  @IsString()
  bucketName: string;
}
