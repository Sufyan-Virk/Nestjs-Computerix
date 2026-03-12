import * as yup from 'yup';

export class CreateUserDto {
  name: string;
  age: number;
}

export const createUserSchema = yup.object({
  name: yup.string().required(),
  age: yup.number().required().positive().integer(),
});
