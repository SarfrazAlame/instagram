import ProfileForm from "@/components/ProfileForm";
import { getAuthOptions } from "@/lib/auth";
import { fetchProfile } from "@/lib/data";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit profile",
  description: "Edit profile",
};

async function EditProfile() {
  const session = await getAuthOptions();
  const profile = await fetchProfile(session?.user.username!);

  if (!profile) {
    notFound();
  }

  return (
    <div className="px-12">
      <h1 className="text-2xl font-medium">Edit profile</h1>
      {/* @ts-ignore */}
      <ProfileForm profile={profile} />
    </div>
  );
}

export default EditProfile;
