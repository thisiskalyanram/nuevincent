import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      company,
      email,
      phone,
      projectType,
      budgetRange,
      timeline,
      description,
      location,
      inspirationLink,
      enquiryId,
    } = body;

    // Server-side validation
    if (!fullName || !email || !phone || !projectType || !description) {
      return NextResponse.json(
        { error: "Missing mandatory enquiry fields" },
        { status: 400 }
      );
    }

    // Prepare structured notification payload
    const notificationPayload = {
      subject: `[NUEVINCENT] New Project Enquiry: ${projectType} - ${fullName}`,
      timestamp: new Date().toISOString(),
      enquiryId: enquiryId || "N/A",
      client: {
        fullName,
        company: company || "Not specified",
        email,
        phone,
        location: location || "Hyderabad, India",
      },
      project: {
        type: projectType,
        budget: budgetRange || "Flexible",
        timeline: timeline || "Flexible",
        description,
        inspirationLink: inspirationLink || "None provided",
      },
    };

    console.log("=== [NUEVINCENT ADMIN NOTIFICATION] ===");
    console.log(JSON.stringify(notificationPayload, null, 2));

    // Optional: If RESEND_API_KEY or SMTP is provided, send real email
    const resendApiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || "contact@nuevincent.com";

    if (resendApiKey) {
      try {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "NUEVINCENT Desk <notifications@nuevincent.com>",
            to: [adminEmail],
            subject: notificationPayload.subject,
            html: `
              <h2>New Project Enquiry Received</h2>
              <p><strong>Client:</strong> ${fullName} (${company || "N/A"})</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Project Type:</strong> ${projectType}</p>
              <p><strong>Budget:</strong> ${budgetRange}</p>
              <p><strong>Timeline:</strong> ${timeline}</p>
              <p><strong>Description:</strong><br/>${description}</p>
              <p><strong>Reference:</strong> ${inspirationLink || "N/A"}</p>
              <hr/>
              <p><a href="https://nuevincent.com/admin/enquiries">Open in Admin CRM</a></p>
            `,
          }),
        });
      } catch (emailErr) {
        console.warn("Failed to dispatch external email:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Enquiry registered and admin notified",
      enquiryId,
    });
  } catch (error: any) {
    console.error("API Enquiry handler error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process enquiry" },
      { status: 500 }
    );
  }
}
