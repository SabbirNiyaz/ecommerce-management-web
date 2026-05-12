"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Profile {
    id: number;
    profileImage: string;
    bio: string;
    address: string;
    phone: string;
    isActive: boolean;
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
}

function getInitials(name: string) {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
}

export default function ProfilePage() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        // Get token from localStorage
        const token = localStorage.getItem("token")

        if (!token) {
            setError("No token found");
            setLoading(false);
            return;
        }

        console.log("Token: ", token)

        axios
            .get<Profile>(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => setProfile(res.data))
            .catch(() => setError("Failed to load profile."))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen dark:bg-gray-950">
                <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-sm dark:bg-gray-950">
                {error ?? "Profile not found."}
            </div>
        );
    }

    const { user, bio, address, phone, isActive, profileImage } = profile;

    return (
        <div className="flex justify-center items-start pt-8 w-5/6 mx-auto">
            <div className="w-full bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden dark:bg-gray-900 dark:border-gray-800">

                {/* Cover banner */}
                <div className="h-38 bg-gradient-to-r from-blue-50 to-indigo-100 relative dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute -bottom-10 left-8">
                        {profileImage && !profileImage.includes("example.com") ? (
                            <img
                                src={profileImage? profileImage : "No Image"}
                                alt={user.name}
                                className="w-20 h-20 rounded-full border-4 border-white object-cover shadow-sm dark:border-gray-900"
                            />
                        ) : (
                            <div className="w-20 h-20 rounded-full border-4 border-white bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-semibold shadow-sm dark:border-gray-900 dark:bg-blue-950 dark:text-blue-400">
                                {getInitials(user.name)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Body */}
                <div className="pt-14 px-8 pb-8">

                    {/* Top row: name + status */}
                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{user.name}</h1>
                            <p className="text-sm text-gray-500 mt-0.5 dark:text-gray-400">{user.email}</p>
                        </div>
                        <span
                            className={`text-xs font-medium px-3 py-1.5 rounded-full ${isActive
                                ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900"
                                : "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900"
                                }`}
                        >
                            {isActive ? "● Active" : "○ Inactive"}
                        </span>
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-full capitalize font-medium dark:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-900">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            {user.role}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs bg-amber-50 text-amber-700 border border-amber-100 px-3 py-1.5 rounded-full font-medium dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                            {bio}
                        </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-100 my-8 dark:border-gray-800" />

                    {/* Info grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 dark:bg-gray-800">
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium dark:text-gray-500">Address</p>
                            <p className="text-sm text-gray-700 font-medium dark:text-gray-300">{address}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 dark:bg-gray-800">
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium dark:text-gray-500">Phone</p>
                            <p className="text-sm text-gray-700 font-medium dark:text-gray-300">{phone}</p>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1 dark:bg-gray-800">
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium dark:text-gray-500">User ID</p>
                            <p className="text-sm text-gray-700 font-medium dark:text-gray-300">#{user.id}</p>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8">
                        <Link href={`/dashboard/profile/${profile.id}`}>
                            <button
                                className="px-8 py-2 border border-orange-200 text-yellow-500 rounded text-xs 
                            hover:bg-yellow-400 hover:text-white transition cursor-pointer dark:border-orange-900 dark:text-yellow-400 dark:hover:bg-yellow-600"
                            >Edit
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}