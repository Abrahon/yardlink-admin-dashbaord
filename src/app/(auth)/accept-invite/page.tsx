import { AcceptInvite } from "@/components/auth/accept-invite/AcceptInvite";

interface AcceptInvitePageProps {
  searchParams?: { token?: string };
}

export default function AcceptInvitePage({ searchParams }: AcceptInvitePageProps) {
  const token = searchParams?.token ?? "";
  return <AcceptInvite token={token} />;
}
