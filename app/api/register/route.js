import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, batchFrom, batchTo } = await request.json();

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ success: false, message: 'Name is required' }, { status: 400 });
    }
    if (!batchFrom || !batchTo) {
      return NextResponse.json({ success: false, message: 'Batch years are required' }, { status: 400 });
    }
    if (parseInt(batchTo) < parseInt(batchFrom)) {
      return NextResponse.json({ success: false, message: 'Batch To must be after Batch From' }, { status: 400 });
    }

    const sheetId = process.env.GOOGLE_SHEET_ID;
    const serviceKey = process.env.GOOGLE_SERVICE_KEY;

    if (!sheetId || !serviceKey) {
      console.error('Missing GOOGLE_SHEET_ID or GOOGLE_SERVICE_KEY environment variables');
      return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
    }

    const credentials = JSON.parse(serviceKey);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:D',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[timestamp, name.trim(), batchFrom, batchTo]],
      },
    });

    return NextResponse.json({ success: true, message: 'Registration successful' });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ success: false, message: 'Failed to register. Please try again.' }, { status: 500 });
  }
}
