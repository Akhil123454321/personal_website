// app/api/send-email/route.js

import { Resend } from 'resend';

export async function POST(req) {
  try {
    console.log(`Sending email to ${process.env.RECEIVER_EMAIL3}`);
    const { message } = await req.json();

    if (!message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "Message is required" }), {
        status: 400,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL3,
      subject: 'New Terminal Message',
      text: message,
    });

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
    });
  } catch (err) {
    console.error("Resend email error:", err);
    return new Response(JSON.stringify({ error: "Email send failed" }), {
      status: 500,
    });
  }
}