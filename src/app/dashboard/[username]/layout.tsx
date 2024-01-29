import { fetchProfile } from "@/lib/data";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { auth } from "../../../../auth";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import UserAvatar from "@/components/UserAvatar";
import ProfileAvatar from "@/components/ProfileAvatar";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

export async function ProfileLayout({ children, params: { username } }: Props) {
  const profile = await fetchProfile(username);
  const session = await auth();
  const isCurrrentUser = session?.user.id === profile?.id;
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session.user.id
  );

  if (!profile) {
    notFound();
  }

  return (
    <div>
      <ProfileHeader username={profile.username} />
      <div className="max-w-4xl mx-auto">
        <div className="flex gap-x-5 md:gap-x-10 px-4">
          <ProfileAvatar user={profile}>
            <UserAvatar
              user={profile}
              className="w-20 h-20 md:w-36 md:h-36 cursor-pointer"
            />
          </ProfileAvatar>
        </div>
      </div>
      {children}
    </div>
  );
}

export default ProfileLayout;
