import { UserProfile } from "@/components/user-profile";

interface UserProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { userId } = await params;

  console.log(userId);

  return <UserProfile id={userId} />;
}