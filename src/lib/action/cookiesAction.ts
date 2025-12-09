"use server";
// Lib
import { getCsrfToken } from "next-auth/react";
import { cookies } from "next/headers";

/**
 * getCsrfTkn()
 * @returns 
 */
export async function getCsrfTkn() {
  const csrfToken = await getCsrfToken();
  return csrfToken;
}

/**
 * ccCookies()
 * 
 * @param name 
 * @param value 
 * @param op 
 * @returns 
 */
export async function ccCookies(name: string, value?: string | null, op: string | null = "get") {
  const cookieStore = await cookies();
  if (op === "set" && value) {
    cookieStore.set(name, value, { httpOnly: true, maxAge: 2592000 });
  } else {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value || null;
  }
}
