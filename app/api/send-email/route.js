import { Resend } from 'resend';

export async function POST(req) {
  try {
    const { name, from, message } = await req.json();

    if (!message || !from || !name) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL, // your own email or an allowed recipient in Resend
      subject: `Terminal Message from ${name}`,
      text: `From: ${name} <${from}>\n\n${message}`,
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
import { Resend } from 'resend';

export async function POST(req) {
  try {
    const { name, from, message } = await req.json();

    if (!name || !from || !message || message.trim() === "") {
      return new Response(JSON.stringify({ error: "Name, email, and message are required" }), {
        status: 400,
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const data = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.RECEIVER_EMAIL,
      subject: `New Terminal Message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${from}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
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