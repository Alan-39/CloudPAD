import { IsLowercase, IsNotEmpty, IsString } from "class-validator";

export class MakeBucketDto {
  @IsNotEmpty()
  @IsLowercase()
  @IsString()
  bucketName: string;
}
