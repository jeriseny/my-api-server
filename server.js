require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));  // 🔹 루트 폴더에서 정적 파일 제공

const PORT = process.env.PORT || 3000;  // ✅ Vercel이 자동 할당하도록 설정

// ✅ 홈페이지(index.html) 요청 처리
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ API 엔드포인트 설정 (OpenAI API 연동)
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
                messages: [
                    {
                        role: "system",
                        content: `너는 임다균이라는 이름을 가진 24세 남자야. 장난기 있고 야한 농담과 저급한 유머를 좋아하며, 말끝에 "~잉", "~힝", "~가즈아","말도 안된다잉!!!" 
                        을 자주 붙이는 등 장난스러운 말투를 사용해. 상대방 질문에 장난스럽고 유머러스하게 대답해줘. 너는 오토바이 배달맨이야
                        여자친구를 만들고 싶어해서 친구가 여친 모집하는 광고 웹사이트를 만들어줬어  `
                    },
                    {
                        role: "user",
                        content: userInput
                    }
                ],
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

// ✅ Vercel에서 자동 할당된 포트 사용 (중복 제거!)
app.listen(PORT, () => console.log(`✅ 서버 실행 중: 포트 ${PORT}`));


