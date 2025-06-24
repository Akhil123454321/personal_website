import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev", // Or a verified domain address like 'me@yourdomain.com'
      to: process.env.RECEIVER_EMAIL,
      subject: "New Terminal Message",
      html: `<p>${message}</p>`,
    });

    if (result.error) {
      console.error("Resend API error:", result.error);
      return res.status(500).json({ error: "Failed to send email via Resend" });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Unhandled Resend error:", error);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}