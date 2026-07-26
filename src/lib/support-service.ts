export interface SupportMessage {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "read" | "replied";
}

export async function sendSupportMessage(
  data: Omit<SupportMessage, "createdAt" | "status">
): Promise<boolean> {
  try {
    const res = await fetch("/api/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok;
  } catch (error) {
    console.error("Error submitting support ticket:", error);
    return false;
  }
}
