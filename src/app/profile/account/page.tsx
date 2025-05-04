// app/profile/account/page.tsx
import { redirect } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabaseServer'
import AccountSettings from '@/components/profile/AccountSettings';

export default async function AccountPage() {
  const supabase = await createServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/profile');
  }

  return <AccountSettings user={session.user} />;
}
