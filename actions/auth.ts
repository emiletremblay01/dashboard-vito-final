"use server";
import { cookies } from "next/headers";
export const auth = async () => {
  const cookieValue = cookies().get("nip")?.value;

  if (!cookieValue) {
    return false;
  }
  const nip = process.env.VITO_DASHBOARD_NIP;
  if (!nip) {
    return false;
  }

  return cookieValue == nip;
};
