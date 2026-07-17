export class CreateTenantDto {
  readonly companyName: string;
  readonly tenantId: string;
}

export class UpdateTenantDto {
  readonly companyName?: string;
  readonly tenantId?: string;
}