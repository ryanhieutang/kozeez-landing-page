import { NextResponse } from 'next/server';
import ical from 'node-ical';

function getDateRange(start, end) {
  const dates = [];
  const current = new Date(start);
  const checkout = new Date(end); // end is checkout day

  checkout.setDate(checkout.getDate() - 1); // make it exclusive

  while (current <= checkout) {
    dates.push(new Date(current).toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'Missing URL' }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const data = await res.text();
    const parsed = ical.parseICS(data);

    const unavailableDates = Object.values(parsed)
      .filter(event => event.type === 'VEVENT')
      .flatMap(event => getDateRange(event.start, event.end));

    console.log("Unavailable Dates:", unavailableDates);

    return NextResponse.json(unavailableDates);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
