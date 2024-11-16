// src/pages/api/auth/token.ts
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { createHash } from "crypto";

// Simulación de usuarios con contraseñas hasheadas en una base de datos
const users = [
  {
    user_id: 1,
    email: "silsilva.89@gmail.com",
    password: getSHA256ofString("1234"),
  }, // Hash de la contraseña "1234"
];

async function authToken(email: string, passwordHasheado: string) {
  // Aquí se simula la búsqueda de un usuario
  return users.find(
    (user) => user.email === email && user.password === passwordHasheado
  );
}

// Función para hashear la contraseña utilizando SHA-256
function getSHA256ofString(str: string): string {
  if (typeof str !== "string") {
    throw new TypeError("Expected a string");
  }
  return createHash("sha256").update(str).digest("hex");
}

// Secret para firmar el JWT (almacénalo en una variable de entorno en producción)
const SECRET = process.env.SECRET; // Cambia esto a algo más seguro en producción

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Método aceptado: POST
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Verificar que tanto email como password son cadenas
    if (typeof email !== "string" || typeof password !== "string") {
      return res
        .status(400)
        .json({ error: "Email y contraseña deben ser cadenas" });
    }

    // Hashear la contraseña
    const passwordHasheado = getSHA256ofString(password);

    // Autenticar al usuario
    const auth = await authToken(email, passwordHasheado);

    if (auth) {
      // Si el usuario es autenticado, generar el token
      const token = jwt.sign({ id: auth.user_id }, SECRET);
      res.status(200).json({ token });
    } else {
      // Si la autenticación falla
      res.status(400).json({ error: "contraseña o email incorrecto" });
    }
  } else {
    // Respuesta para métodos no permitidos
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
