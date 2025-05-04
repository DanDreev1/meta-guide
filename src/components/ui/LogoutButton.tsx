import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { LogOut } from 'lucide-react'; // красивая иконка выхода

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Ошибка выхода:', error.message);
    } else {
      router.push('/'); // после выхода кидаем на главную
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
    >
      <LogOut size={18} />
      Выйти
    </button>
  );
}