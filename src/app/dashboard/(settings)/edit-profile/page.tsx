import { Metadata } from "next";
import React from "react";
import { getAuthOptions } from "../../../../lib/auth";
import { fetchProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Edit Profile",
};

const EditProfile = async () => {
  const session = await getAuthOptions();
  const username = session?.user.username as string;

  const profile = await fetchProfile(username);

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit Profile</h1>

      {profile !== null?(
        <ProfileForm profile={profile} />
      ):(
        <p>Loading...</p>
      )}
    </div>
  );
};

export default EditProfile;
