import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";

export const runtime = "nodejs";

async function appendToSheet(entry: Record<string, string>) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!spreadsheetId || !credentialsJson) return;

  const credentials = JSON.parse(credentialsJson);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const row = [
    new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
    entry.last_name + " " + entry.first_name,
    entry.last_name_kana + " " + entry.first_name_kana,
    entry.phone,
    entry.email,
    entry.child_age,
    entry.preferred_date,
    entry.heard_from,
    entry.motivation ?? "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "申込一覧!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [row] },
  });
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();

  const entry = {
    last_name: body.lastName,
    first_name: body.firstName,
    last_name_kana: body.lastNameKana,
    first_name_kana: body.firstNameKana,
    phone: body.phone,
    email: body.email,
    child_age: body.childAge,
    preferred_date: body.preferredDate,
    heard_from: body.heardFrom,
    motivation: body.motivation ?? null,
  };

  const { error } = await supabase.from("seminar_entries").insert(entry);
  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "DB保存に失敗しました" }, { status: 500 });
  }

  try {
    await appendToSheet(entry);
  } catch (e) {
    console.error("Google Sheets append error:", e);
    // Sheets失敗はDB保存済みなので200で返す
  }

  return NextResponse.json({ success: true });
}
