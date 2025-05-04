import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid or missing JSON body' }, { status: 400 })
  }

  const { name, rank, roles, picks, bans, winrate } = body

  if (!name || !rank || !roles) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const { data: existing, error: checkError } = await supabase
    .from('meta_heroes')
    .select('id')
    .eq('name', name)
    .eq('rank', rank)
    .maybeSingle()

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 })
  }

  if (existing) {
    const { error: updateError } = await supabase
      .from('meta_heroes')
      .update({ roles, picks, bans, winrate })
      .eq('id', existing.id)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Updated successfully' })
  } else {
    const { error: insertError } = await supabase
      .from('meta_heroes')
      .insert([{ name, rank, roles, picks, bans, winrate }])

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    return NextResponse.json({ message: 'Inserted successfully' })
  }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const rank = searchParams.get("rank")
  
    if (!rank) {
      return NextResponse.json({ error: "Missing rank parameter" }, { status: 400 })
    }
  
    const { data, error } = await supabase
      .from("meta_heroes")
      .select("*")
      .eq("rank", rank)
  
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
  
    return NextResponse.json(data)
  }
  