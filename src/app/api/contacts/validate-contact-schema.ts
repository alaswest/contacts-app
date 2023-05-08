import Ajv, { ErrorObject } from 'ajv';

export default function validateContactSchema(data: any): {
  ok: Boolean;
  errors?:
    | ErrorObject<string, Record<string, any>, unknown>[]
    | null
    | undefined;
} {
  const ajv = new Ajv();

  const schema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      email: { type: 'string' },
      phone: { type: 'string' },
      avatar: { type: 'string' },
      birthday: { type: 'string' },
    },
    required: ['name', 'email', 'phone', 'avatar', 'birthday'],
    additionalProperties: false,
  };

  const valid = ajv.validate(schema, data);
  return !valid ? { ok: valid, errors: ajv.errors } : { ok: valid };
}
