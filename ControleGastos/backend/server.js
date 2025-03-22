const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const auth = new google.auth.GoogleAuth({
  keyFile: "./credentials.json", // Caminho para o arquivo de credenciais
  scopes: "https://www.googleapis.com/auth/spreadsheets",
});

app.post("/send-to-sheets", async (req, res) => {
  try {
    const sheets = google.sheets({ version: "v4", auth });
    const { spreadsheetId, range, values } = req.body;

    console.log("Dados recebidos:", { spreadsheetId, range, values });

    const resource = {
      values,
    };

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "resumo!A:M", // Atualizado para incluir até a coluna M
      valueInputOption: "RAW",
      requestBody: resource,
    });

    console.log("Resposta do Google Sheets:", response.data);

    res.status(200).json({ message: "Dados enviados com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar dados:", error);
    res.status(500).json({ error: "Erro ao enviar dados" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});