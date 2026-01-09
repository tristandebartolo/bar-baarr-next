// src/lib/auth/adminCheck.ts
// Auth
import {auth} from "@/auth/auth";
import {decrypt} from "@/auth/session";
import {redirect} from "next/navigation";

export async function requireAdmin() {

	const session = await auth();
	if (!session?.user || !session?.user?.email) {
		redirect("/fr/club");
	}

	const {roles, email} = session?.user;

	console.log('session', session)

	if (!roles) {
		redirect("/fr/club");
	}

	// if (id && id === '1') {
	const d = await decrypt(email)
	// 	return session.user;
	// }

	// if (roles) {
	// 	if (!roles.includes('supervisor')) {
	// 		redirect("/fr/club");
	// 	}
	// }

	// Suppose que ton user a un champ role dans la session (NextAuth)
	// const isAdmin = session.user.id === "Admin" || session.user.isAdmin === true;


	return session.user;
}
