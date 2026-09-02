"use server";

import { COMPANY, PRIMARY_PHONE } from "../data/company";

export type QuoteLeadResponse = {
  success: boolean;
  message?: string;
  error?: string;
  fallbackPhone?: string;
};

export async function sendQuoteLead(formData: FormData): Promise<QuoteLeadResponse> {
  const name = (formData.get("name") as string || "").trim();
  const email = (formData.get("email") as string || "").trim();
  const phone = (formData.get("phone") as string || "").trim();
  const service = (formData.get("service") as string || "").trim();
  const details = (formData.get("details") as string || "").trim();
  const source = (formData.get("source") as string || "website").trim();
  const honeypot = (formData.get("website_hp") as string || "").trim();

  // Spam detection via hidden honeypot
  if (honeypot) {
    // Silently return success to mislead spambots without processing
    return { success: true, message: "Request received." };
  }

  // Validation
  if (!name) {
    return { success: false, error: "Please provide your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, error: "Please provide a valid email address." };
  }
  if (!service) {
    return { success: false, error: "Please select a service category." };
  }

  const destinationEmail = process.env.LEAD_TO_EMAIL || COMPANY.email;
  const resendApiKey = process.env.RESEND_API_KEY;
  const timestamp = new Date().toLocaleString("en-CA", { timeZone: "America/Toronto" });

  const emailHtml = `
    <h2>New Quote Request — SS Carpentry & Renovations</h2>
    <p><strong>Submitted:</strong> ${timestamp} (Eastern Time)</p>
    <p><strong>Source Page:</strong> ${source}</p>
    <hr />
    <p><strong>Client Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Phone:</strong> ${phone ? `<a href="tel:${phone}">${phone}</a>` : "Not provided"}</p>
    <p><strong>Service Requested:</strong> ${service}</p>
    <p><strong>Project Details:</strong></p>
    <blockquote style="background:#f4f4f4;padding:12px;border-left:4px solid #e3af2b;">
      ${details ? details.replace(/\n/g, "<br/>") : "No specific details provided."}
    </blockquote>
  `;

  const autoReplyHtml = `
    <h2>Thank You for Contacting SS Carpentry & Renovations</h2>
    <p>Hi ${name},</p>
    <p>We have received your quote inquiry for <strong>${service}</strong>.</p>
    <p><strong>Our Commitment:</strong> We review all project requests carefully and reply within <strong>one business day</strong> to discuss your scope and arrange a free on-site consultation.</p>
    <p>If your project is urgent or you have immediate questions, you can reach us directly at <a href="tel:${PRIMARY_PHONE.href}">${PRIMARY_PHONE.display}</a>.</p>
    <br/>
    <p>Best regards,<br/><strong>SS Carpentry and Renovations</strong><br/>Ottawa, Ontario</p>
  `;

  if (resendApiKey) {
    try {
      // 1. Send notification to the business owner
      const ownerEmailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "SS Carpentry Quotes <onboarding@resend.dev>",
          to: destinationEmail,
          reply_to: email,
          subject: `New Quote Request — ${name} (${service})`,
          html: emailHtml,
        }),
      });

      if (!ownerEmailRes.ok) {
        const errData = await ownerEmailRes.json().catch(() => ({}));
        console.error("Resend API error sending lead to owner:", errData);
      }

      // 2. Send confirmation auto-reply to the customer
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "SS Carpentry and Renovations <onboarding@resend.dev>",
          to: email,
          subject: "We received your quote request — SS Carpentry & Renovations",
          html: autoReplyHtml,
        }),
      }).catch((err) => console.error("Auto-reply delivery error:", err));

      return {
        success: true,
        message: "Your quote request has been sent! We will reply within one business day.",
      };
    } catch (err) {
      console.error("Server Action email dispatch failure:", err);
      return {
        success: false,
        error:
          "We could not send your request due to a network issue. Please call or email us directly at " +
          PRIMARY_PHONE.display,
        fallbackPhone: PRIMARY_PHONE.display,
      };
    }
  } else {
    // In dev / before API key is configured by owner:
    console.log("----------------------------------------");
    console.log(`[DEV/DEMO QUOTE LEAD RECEIVED - ${timestamp}]`);
    console.log(`To: ${destinationEmail}`);
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Phone: ${phone}`);
    console.log(`Service: ${service}`);
    console.log(`Details: ${details}`);
    console.log(`Source: ${source}`);
    console.log("----------------------------------------");

    return {
      success: true,
      message: "Your quote request has been recorded. We will reply within one business day.",
    };
  }
}
