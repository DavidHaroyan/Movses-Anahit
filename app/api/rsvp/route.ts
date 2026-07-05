import { NextRequest, NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

interface Participant {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  maritalStatus: 'Unmarried' | 'Married';
}

export async function POST(req: NextRequest) {
  let participants: Participant[] = [];
  try {
    const body = await req.json();
    participants = body.participants || [];

    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID;

    if (!clientEmail || !privateKey || !spreadsheetId) {
      if (process.env.NODE_ENV === 'development') {
        const brideCodesConfig = participants.filter((p: Participant) => p.gender === 'Female' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 100);
        const groomCodesConfig = participants.filter((p: Participant) => p.gender === 'Male' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 200);
        return NextResponse.json({ success: true, brideCodes: brideCodesConfig, groomCodes: groomCodesConfig });
      }
      return NextResponse.json({ error: 'Server missing config for Sheets API' }, { status: 500 });
    }

    const auth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    let tokenStr;
    let retries = 5;
    while (retries > 0) {
      try {
        const token = await auth.getAccessToken();
        tokenStr = token.token;
        break;
      } catch (err: any) {
        retries--;
        if (retries === 0) {
          if (process.env.NODE_ENV === 'development') {
            const brideCodesConfig = participants.filter((p: Participant) => p.gender === 'Female' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 100);
            const groomCodesConfig = participants.filter((p: Participant) => p.gender === 'Male' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 200);
            return NextResponse.json({ success: true, brideCodes: brideCodesConfig, groomCodes: groomCodesConfig });
          }
          throw new Error(`Failed to get access token: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 2000));
      }
    }

    const brideCodesAppends = [];
    const groomCodesAppends = [];
    
    // helper to fetch with retry
    const fetchWithRetry = async (url: string, options: any, maxRetries = 3) => {
      let lastErr;
      for (let i = 0; i < maxRetries; i++) {
        try {
          const res = await fetch(url, options);
          return res;
        } catch (err: any) {
          lastErr = err;
          await new Promise(r => setTimeout(r, 1000));
        }
      }
      throw lastErr;
    };

    // helper to get max code
    const getMaxCode = async (sheetName: string) => {
      const u = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:A`;
      const res = await fetchWithRetry(u, { headers: { Authorization: `Bearer ${tokenStr}` } });
      if (!res.ok) return 0;
      const data = await res.json();
      const vals = data.values || [];
      let max = 0;
      for (let i = 1; i < vals.length; i++) {
        const v = parseInt(vals[i][0], 10);
        if (!isNaN(v) && v > max) max = v;
      }
      return max;
    };

    let nextBrideCode = await getMaxCode('BrideCodes') + 1;
    let nextGroomCode = await getMaxCode('GroomCodes') + 1;

    const brideGenerated: number[] = [];
    const groomGenerated: number[] = [];
    const allAppends = [];

    const timestamp = new Date().toISOString();

    for (const p of participants) {
      allAppends.push([p.fullName, p.gender, p.maritalStatus, timestamp]);
      if (p.gender === 'Female' && p.maritalStatus === 'Unmarried') {
        const code = nextBrideCode++;
        brideGenerated.push(code);
        brideCodesAppends.push([code, p.fullName, p.gender, p.maritalStatus, timestamp]);
      } else if (p.gender === 'Male' && p.maritalStatus === 'Unmarried') {
        const code = nextGroomCode++;
        groomGenerated.push(code);
        groomCodesAppends.push([code, p.fullName, p.gender, p.maritalStatus, timestamp]);
      }
    }

    const appendToSheet = async (sheetName: string, rows: any[]) => {
      if (rows.length === 0) return;
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${sheetName}!A:E:append?valueInputOption=USER_ENTERED`;
      await fetchWithRetry(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenStr}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: rows
        })
      });
    };

    await appendToSheet('RSVPs', allAppends);
    await appendToSheet('BrideCodes', brideCodesAppends);
    await appendToSheet('GroomCodes', groomCodesAppends);

    return NextResponse.json({ success: true, brideCodes: brideGenerated, groomCodes: groomGenerated });
  } catch (err: any) {
    console.error('RSVP Error:', err);
    if (process.env.NODE_ENV === 'development') {
      const brideCodesConfig = participants.filter((p: Participant) => p.gender === 'Female' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 100);
      const groomCodesConfig = participants.filter((p: Participant) => p.gender === 'Male' && p.maritalStatus === 'Unmarried').map((_: any, i: number) => i + 200);
      return NextResponse.json({ success: true, brideCodes: brideCodesConfig, groomCodes: groomCodesConfig });
    }
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
