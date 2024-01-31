import { Metadata } from "next";
import React from "react";
import { auth } from "../../../../../auth";
import { fetchProfile } from "@/lib/data";
import { notFound } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";

export const metadata: Metadata = {
  title:"Edit Profile",
  description:"Edit Profile"
}


const EditProfile = async() => {
  const session = await auth()
  const profile = await fetchProfile(session.user.username)

  if(!profile){
    notFound()
  }

  return <div className="px-12">
    <h1 className="text-2xl font-medium">Edit Profile</h1>

    <ProfileForm profile={profile}/>
  </div>;
};

export default EditProfile;
