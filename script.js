const BACKEND_URL = "my-api-server-chi.vercel.app"; 
document.addEventListener("DOMContentLoaded", function () {
    let bgMusic = document.getElementById("bg-music");
    let musicToggle = document.getElementById("music-toggle");
    function toggleMusic() {
        if (bgMusic.paused) {
            bgMusic.muted = false; // 🔥 음소거 해제
            bgMusic.play().catch(error => console.log("오디오 재생 오류:", error));
            musicToggle.innerText = "🔊 음악 끄기";
        } else {
            bgMusic.pause();
            musicToggle.innerText = "🎵 음악 켜기";
        }
    }

    // 🔥 사용자가 버튼을 누르면 자동재생
    musicToggle.addEventListener("click", toggleMusic);
});


function calculateCompatibility() {
    let score = 0;
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q3 = document.querySelector('input[name="q3"]:checked');

    if (q1 && q2 && q3) {
        if (q1.value === "1") score += 30; 
        if (q2.value === "2") score += 30;
        if (q3.value === "1") score += 40; 

        document.getElementById("compatibility-result").innerText = `당신과 임다균의 궁합은 💘 ${score}% 💘 입니다!`;
    } else {
        document.getElementById("compatibility-result").innerText = "모든 문항을 선택해주세요!";
    }
}


function showFortune() {
const fortunes = [
    "💖 오늘 당신의 매력이 폭발할 예정! 모텔방을 잡아보세요!",
    "🔥 사랑의 기운이 넘칩니다! Sex하기 좋은 날이에요!",
    "💌 마음이 가는 대로 행동하면 감방 간다!",
    "🌙 혼자가 더 좋은 날! 내면을 돌아보는 시간을(자위타임) 가져보세요.",
    "✨ 예상치 못한 사람에게서 응가를 받을 수 있어요!"
];
const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
document.getElementById("fortune-text").innerText = randomFortune;
}


function chooseOption(choice) {
let resultText = "";
if (choice === 1) {
    resultText = "💖 다균이가 감동해서 기분이 풀렸어요! 행복한 섹스 지속~";
} else if (choice === 2) {
    resultText = "😡 다균이 삐쳤어요. 집에 가버렸습니다.";
} else {
    resultText = "🧐 다균이 '아무것도 아냐'라고 했지만, 속으로 더 발기했어요.";
}
document.getElementById("simulation-result").innerText = resultText;
}



function calculateYasPower() {
    let score = 0;
    
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q3 = document.querySelector('input[name="q3"]:checked');

    if (q1 && q2 && q3) {
        score = (Number(q1.value) || 0) + (Number(q2.value) || 0) + (Number(q3.value) || 0);

        console.log("총 점수:", score); // 🔥 디버깅용 점수 확인

        let resultText = "";
        if (score >= 50) {
            resultText = "🔥 야스력 MAX! 다균이 널 사랑할 수밖에 없음!";
        } else if (score >= 30) {
            resultText = "😏 야스력 적당함. 다균이 고민 좀 해볼 듯!";
        } else {
            resultText = "😐 순수한 사람! 다균이가 가르쳐 줄게!";
        }

        document.getElementById("yas-result").innerText = resultText;
    } else {
        document.getElementById("yas-result").innerText = "모든 문항을 선택해주세요!";
    }
}



async function askDakyun() {
    const userInput = document.getElementById('user-input').value;
    const chatOutput = document.getElementById('chat-output');

    if (!userInput) {
        chatOutput.innerHTML = "<p>질문을 입력해줘잉~ 😝</p>";
        return;
    }

    chatOutput.innerHTML = "<p>다균이가 열심히 고민 중... 🤔</p>";

    try {
        const response = await fetch(`${BACKEND_URL}/api/ask`, {  // 🔹 OpenAI가 아니라 백엔드 호출!
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userInput })  // 🔹 프론트엔드는 백엔드에 메시지만 보냄
        });

        const data = await response.json();
        
        if (data.message) {
            chatOutput.innerHTML = `<p>${data.message}</p>`;
        } else {
            chatOutput.innerHTML = "<p>챗봇이 맛이 갔어잉... 다시 물어봐줘~ 😅</p>";
        }
    } catch (error) {
        console.error('에러 발생:', error);
        chatOutput.innerHTML = "<p>뭔가 문제가 생겼어잉... 잠시 후 다시 시도해줘! 😱</p>";
    }
}
