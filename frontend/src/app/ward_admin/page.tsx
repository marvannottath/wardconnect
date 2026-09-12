import { redirect } from 'next/navigation';

export default function WardAdminRedirectPage() {
  redirect('/admin-dashboard');
}
