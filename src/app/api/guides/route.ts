// app/api/guides/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data, error } = await supabase.from('guides').select('*');
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, video_url, tags } = body;

    if (!title || !video_url || !Array.isArray(tags)) {
      return NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
    }

    const { error: insertError } = await supabase.from('guides').insert([
      {
        title,
        video_url,
        tags,
      },
    ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Гайд успешно добавлен' });
  } catch (err) {
    return NextResponse.json({ error: 'Ошибка обработки запроса' }, { status: 500 });
  }
}