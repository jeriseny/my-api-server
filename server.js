require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ 정적 파일(css, js) 제공 경로 수정 (루트에서 제공!)
app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

// ✅ 홈페이지(index.html) 요청 처리
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ OpenAI API 연결
app.post("/api/ask", async (req, res) => {
    const userInput = req.body.userInput;
    
    if (!userInput) {
        return res.status(400).json({ error: "질문을 입력해주세요!" });
    }

    try {
        const response = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: userInput }],
                temperature: 1.1,
                max_tokens: 200
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
        console.error("OpenAI API 요청 실패:", error);
        res.status(500).json({ error: "API 요청 실패!" });
    }
});

// ✅ Vercel에서 자동 할당된 포트 사용
app.listen(PORT, () => console.log(`✅ 서버 실행 중: 포트 ${PORT}`));



