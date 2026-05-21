const express = require("express");
const admin = require("firebase-admin");
const path = require("path");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log("Proyecto conectado: ", admin.app().options.credential.projectId);

const db = admin.firestore();
const app = express();
const COLECCION = "Tarea1";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/Tarea1", async (req, res) => {
  try {
    const snapshot = await db.collection(COLECCION).get();
    const tareas = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data() 
    }));
    res.json(tareas);
  } catch (error) {
    console.error("Error al obtener tareas:", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.get("/Tarea1/:id", async (req, res) => {
  const doc = await db.collection(COLECCION).doc(req.params.id).get();
  if (!doc.exists) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json({ id: doc.id, ...doc.data() });
});

app.listen(4000, () => {
  console.log("Servidor escuchando en http://localhost:4000");
});