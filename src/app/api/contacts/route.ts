import Contact from '@/types/Contact';
import { NextResponse } from 'next/server';

import { knex } from 'knex';
import validateContactSchema from './validate-contact-schema';
const config = require('../../../../knexfile').development;

export async function GET() {
  const db = knex(config);
  const contacts = await db<Contact>('contacts').orderBy('name');
  return NextResponse.json(contacts);
}

export async function POST(request: Request) {
  const db = knex(config);
  const body = await request.json();
  const validated = validateContactSchema(body);
  if (!validated.ok) {
    return NextResponse.json(validated.errors, { status: 400 });
  }

  const contact = await db('contacts').insert(body);
  return NextResponse.json(contact, { status: 201 });
}
