import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      // Captura los datos del cuerpo de la solicitud
      const data = req.body;

      // Aquí podrías realizar otras operaciones como registro o inicio de sesión

      // Responde con los datos enviados
      res.status(200).json({ data });
      break;

    case "GET":
      // Lógica para obtener información relacionada con la autenticación (por ejemplo, verificar un token)
      res.status(200).json({ message: "Auth info retrieved" });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
