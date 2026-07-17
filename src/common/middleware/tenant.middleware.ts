import {
  Injectable,
  NestMiddleware,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TenantsMiddleware implements NestMiddleware {
  constructor() {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Check that tenantId exists in the headers of the request
    const tenantId = req.headers['x-tenant-id']?.toString();

    if (!tenantId) {
      throw new BadRequestException('X-TENANT-ID not provided');
    }

    console.log(tenantId);

    // Set the tenantId on the request object for later access
    req['tenantId'] = tenantId;

    next();
  }
}