// components/ClientProtected.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const protectedRoutes = ["/profile", "/home", "/dashboard"];

interface ClientProtectedProps {
	children: ReactNode;
}

export default function ClientProtected({ children }: ClientProtectedProps) {
	const router = useRouter();
	const pathname = usePathname();
	const { isAuthenticated } = useAuth();

	useEffect(() => {
		const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));
		if (isProtectedRoute && !isAuthenticated) {
			router.push("/login");
		}
	}, [isAuthenticated, pathname, router]);

	return <>{children}</>;
}
