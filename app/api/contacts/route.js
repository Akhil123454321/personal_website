export async function GET(request) {
  const contactMediums = [
    {
      medium: "github",
      username: "Akhil123454321",
      link: "https://github.com/Akhil123454321",
    },
    {
      medium: "email",
      username: "akhilkasturiwork@proton.me",
      link: "mailto:akhilkasturiwork@proton.me",
    },
    {
      medium: "instagram",
      username: "akhilsk123",
      link: "https://www.instagram.com/akhilsk123/",
    },
    {
      medium: "linkedin",
      username: "akhil-sagaran-kasturi",
      link: "https://www.linkedin.com/in/akhil-sagaran-kasturi/",
    },
  ];

  return Response.json(contactMediums, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
