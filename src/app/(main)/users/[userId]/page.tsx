import { UserProfile } from "@/components/user-profile";

interface UserProfilePageProps {
  params: Promise<{
    userId: string;
  }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  console.log(params);
  // const { userId } = await params;
  return <UserProfile />;
}
