import { fetchProfile } from "@/lib/data";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { getAuthOptions } from "../../../lib/auth";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/ProfileHeader";
import UserAvatar from "@/components/UserAvatar";
import ProfileAvatar from "@/components/ProfileAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { MoreHorizontal, Settings } from "lucide-react";
import Link from "next/link";
import FollowButton from "@/components/FollowButton";
import ProfileTabs from "@/components/ProfileTabs";

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
  const session = await getAuthOptions();
  const isCurrrentUser = session?.user.id === profile?.id;
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
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
              className="w-20 h-20 md:w-32 md:h-32 cursor-pointer"
            />
          </ProfileAvatar>
          <div className="md:px-10 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 items-center gap-3">
              <p className="font-semibold text-xl">{profile.username}</p>
              {isCurrrentUser ? (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <Settings />
                  </Button>
                  <Link
                    href={`/dashboard/edit-profile`}
                    className={buttonVariants({
                      className: "!font-bold",
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    Edit Profile
                  </Link>
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    View archive
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    className="md:order-last"
                  >
                    <MoreHorizontal />
                  </Button>
                  <FollowButton
                    isfollowing={isFollowing}
                    profileId={profile.id}
                  />
                  <Button
                    variant={"secondary"}
                    className="font-bold"
                    size={"sm"}
                  >
                    Message
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-x-7">
              <p className="font-medium">
                <strong>{profile.posts.length} posts</strong>
              </p>

              <Link
                href={`/dashboard/${profile.username}/followers`}
                className="font-medium"
              >
                <strong>{profile.followedBy.length}</strong> followers
              </Link>

              <Link
                href={`/dashboard/${profile.username}/following`}
                className="font-medium"
              >
                <strong>{profile.following.length}</strong> following
              </Link>
            </div>

            <div className="text-sm">
              <div className="font-bold">{profile.name}</div>
              <p>{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <ProfileTabs profile={profile} isCurrentUser={isCurrrentUser}/>
      {children}
      </div>
    </div>
  );
}

export default ProfileLayout;
