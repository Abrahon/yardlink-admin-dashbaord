import { AcceptInvite } from "@/components/auth/accept-invite/AcceptInvite";

interface AcceptInvitePageProps {
  searchParams?: Promise<{ token?: string }>;
}

export default async function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  const params = await searchParams;
  const token = params?.token ?? "";
  return <AcceptInvite token={token} />;
}
