import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const { name, email, restaurant, message } = await request.json();

    console.log('✅ Form Data received:', { name, email, restaurant });
    console.log('✅ API Key exists:', !!process.env.NEXT_PUBLIC_RESEND_API_KEY);
    console.log('✅ API Key value:', process.env.NEXT_PUBLIC_RESEND_API_KEY?.substring(0, 10) + '...');

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Name, Email und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
    console.log('✅ Resend instance created');

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ozaersan@gmail.com',
      replyTo: email,
      subject: `🍽️ Neue TabScan Demo-Anfrage von ${name}`,
      html: `<h2>Test</h2><p>${message}</p>`
    });

    console.log('✅ Email Result:', result);

    if (result.error) {
      return Response.json(
        { error: result.error?.message || 'Resend Error' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: 'Email erfolgreich versendet!',
      id: result.data?.id
    });
  } catch (error: any) {
    console.error('❌ Full Error:', error);
    console.error('❌ Error Message:', error?.message);
    return Response.json(
      { error: error?.message || 'Fehler beim Versenden der Email' },
      { status: 500 }
    );
  }
}