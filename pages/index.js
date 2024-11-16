// require("dotenv/config");
// const cors = require("cors");
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const path = require("path");
// const crypto = require("crypto");
// const { sequelize } = require("./models/db");
// const {
//   checkUser,
//   newUser,
//   getToken,
//   getUser,
//   newAuth,
//   authToken,
//   updatePassword,
// } = require("./controllers/auth-controller");

// const {
//   deleteComercio,
//   getComercio,
//   getUserComercio,
//   modifyComercio,
//   reportComercio,
//   searchComercioAround,
// } = require("./controllers/comercio-controller");
// const { msg } = require("./lib/sendgrid");
// import next from "next";

// const app = express();
// const port = process.env.PORT || 3000;
// app.use(cors());
// app.use(
//   express.json({
//     limit: "50mb",
//   })
// );

// function getSHA256ofString(text) {
//   return crypto.createHash("sha256").update(text).digest("hex");
// }
// /* CUANDO HAGO UN CAMBIO TENGO QUE ACTIVAR ESTO */
// // sequelize.sync({ force: true }).then((res) => {
// //   console.log(res);
// // });
// const SECRET = process.env.SECRET;
// const frontEndPath = path.resolve(__dirname, "../dist");
// const dev = process.env.NODE_ENV !== "production";

// const nextApp = next({ dev });

// function authMiddleware(req, res, next) {
//   const token = req.headers.authorization.split(" ")[1];
//   try {
//     const data = jwt.verify(token, SECRET);
//     req._user = data;
//     next();
//   } catch {
//     res.status(401).json({ error: "middleware" });
//   }
// }

// app.post("/auth", async (req, res) => {
//   const { email, password, name } = req.body;
//   const newUsers = await newUser(name, email);
//   const userId = await newUsers.user.get("id");
//   const passwordHasheado = getSHA256ofString(password);
//   const auth = await newAuth(userId, email, passwordHasheado);
//   res.json(newUsers);
// });

// app.post("/auth/token", async (req, res) => {
//   const { email, password } = req.body;
//   const passwordHasheado = getSHA256ofString(password);
//   const auth = await authToken(email, passwordHasheado);
//   if (auth) {
//     const token = jwt.sign({ id: auth.get("user_id") }, SECRET);
//     res.status(200).json({ token });
//   } else {
//     res.status(400).json({ error: "contraseña o email incorrecto" });
//   }
// });

// app.post("/check", async (req, res) => {
//   const { email } = req.body;
//   const userExist = await checkUser(email);
//   res.json({
//     user: userExist,
//   });
// });

// app.get("/me", authMiddleware, async (req, res) => {
//   const userId = req._user.id;
//   const userProfile = await getUser(userId);
//   res.json(userProfile);
// });

// app.put("/me", authMiddleware, async (req, res) => {
//   const { password } = req.body;
//   const passwordHasheado = getSHA256ofString(password);
//   const update = await updatePassword(req._user.id, passwordHasheado);
//   res.json(update);
// });

// app.post("/comercio", authMiddleware, async (req, res) => {
//   const { comercio, lat, lng, zone, rubro } = req.body;
//   const userId = req._user.id;
//   const comercios = await reportComercio(userId, {
//     zone,
//     comercio,
//     lat,
//     lng,
//     rubro,
//   });
//   res.json(comercios);
// });

// app.put("/comercio/:id", authMiddleware, async (req, res) => {
//   const comercio = await modifyComercio(req.body, req.params.id);
//   res.json({ comercio });
// });

// app.get("/me/comercio", authMiddleware, async (req, res) => {
//   const userId = req._user.id;
//   const comercio = await getUserComercio(userId);
//   res.json({ comercio });
// });

// app.get("/comercio/:id", authMiddleware, async (req, res) => {
//   const comercio = await getComercio(req.params.id).catch((err) => {
//     res.status(400).json({
//       message: err,
//     });
//   });
//   res.json(comercio);
// });

// app.delete("/comercio/:id", authMiddleware, async (req, res) => {
//   const comercio = await deleteComercio(req.params.id);
//   res.json(comercio);
// });

// app.get("/comercio-around", async (req, res) => {
//   const { lat, lng } = req.query;
//   const lostComercio = await searchComercioAround(lat, lng);
//   res.json({ lostComercio });
// });

// app.post("/report", async (req, res) => {
//   const { menssage } = req.body;
//   const reporte = await msg(menssage);
//   res.json({ reporte });
// });

// app.use(express.static(path.resolve(__dirname, "../dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../dist/index.html"));
// });

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });