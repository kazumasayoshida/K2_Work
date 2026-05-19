import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

async function appendToSheet(entry: Record<string, string | null>) {
  const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
  if (!scriptUrl) return;

  await fetch(scriptUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
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
