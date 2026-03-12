import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { AnyObject, ObjectSchema } from 'yup'; // Ensure AnyObject is imported

@Injectable()
export class YupValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<AnyObject>) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') {
        return value; // We only want to validate the body here
    }

    try {
      // abortEarly: false will return all validation errors instead of just the first one
      const parsedValue = await this.schema.validate(value, { abortEarly: false, stripUnknown: true });
      return parsedValue;
    } catch (err: any) {
      throw new BadRequestException({
          message: 'Validation failed',
          errors: err.errors,
      });
    }
  }
}
