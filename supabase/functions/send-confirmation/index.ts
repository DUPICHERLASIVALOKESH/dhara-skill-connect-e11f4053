
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();
    
    console.log("Received request to send email to:", email);

    // Send confirmation email to the user
    const emailResponse = await resend.emails.send({
      from: "Dhara Consultants <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting Dhara Consultants",
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We have received your message:</p>
        <blockquote style="background: #f9f9f9; padding: 15px; border-left: 5px solid #ccc;">
          ${message}
        </blockquote>
        <p>Our team will review your message and get back to you as soon as possible.</p>
        <p>Best regards,<br>The Dhara Consultants Team</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
