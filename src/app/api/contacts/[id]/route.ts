import Contact from '@/types/Contact';
import { knex } from 'knex';
import { NextRequest, NextResponse } from 'next/server';
import validateContactSchema from '../validate-contact-schema';
const config = require('../../../../../knexfile').development;

const getIdFromPath = (path: string) => {
  const parts = path.split('/');
  return parseInt(parts[parts.length - 1]);
};

export async function GET(request: NextRequest) {
  const db = knex(config);
  const contact = await db<Contact>('contacts')
    .where({ id: getIdFromPath(request.nextUrl.pathname) })
    .first();

  if (!contact) {
    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function DELETE(request: NextRequest) {
  const db = knex(config);
  const response = await db<Contact>('contacts')
    .where({ id: getIdFromPath(request.nextUrl.pathname) })
    .del();

  if (response === 0) {
    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}

export async function PUT(request: NextRequest) {
  const db = knex(config);
  const body = await request.json();
  const validated = validateContactSchema(body);
  if (!validated.ok) {
    return NextResponse.json(validated.errors, { status: 400 });
  }

  const contact = await db('contacts')
    .where({ id: getIdFromPath(request.nextUrl.pathname) })
    .update(body);

  if (contact === 0) {
    return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
  }

  return NextResponse.json(contact);
}
