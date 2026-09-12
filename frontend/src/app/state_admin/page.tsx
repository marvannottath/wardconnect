import { redirect } from 'next/navigation';

export default function StateAdminRedirectPage() {
  redirect('/admin-dashboard');
}
