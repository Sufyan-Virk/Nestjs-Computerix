import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class StripPropertiesPipe implements PipeTransform {
  // A simple pipe demonstrating data transformation 
  // by stripping properties like the password from incoming payload
  transform(value: any, metadata: ArgumentMetadata) {
     if (metadata.type !== 'body') {
        return value; 
    }

    if (typeof value === 'object' && value !== null) {
       // Deep copy to avoid mutating original Reference directly 
       const transformed = { ...value };
       
       if ('password' in transformed) {
          // Mutating response by deleting the specified property
          delete transformed.password;
       }
       return transformed;
    }

    return value;
  }
}
