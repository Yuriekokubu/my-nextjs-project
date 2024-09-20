import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
	const ProtectedRoute = (props: any) => {
		const { isAuthenticated } = useAuth();
		const router = useRouter();

		useEffect(() => {
			if (!isAuthenticated) {
				router.push("/login");
			}
		}, [isAuthenticated, router]);

		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};

	return ProtectedRoute;
};

export default withAuth;
