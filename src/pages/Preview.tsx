

import { useEffect, useState } from "react";
function Preview() {
    const [data, setData] = useState<any>(null);
    const API_KEY = "243e64e5ee4e5c98c4a185de5fa8381613bc5cdb789982867797bac237b319ed" 
    const ENDPOINT = "https://serpapi.com/search"
    const params = {
        engine: "google_play_games", 
        q: "clash of clans",
        hl: "en",
        gl: "us"
    }

 useEffect(() => {
    const queryString = new URLSearchParams({
        ...params,
        api_key: API_KEY,
    }).toString();

    const serpUrl = `${ENDPOINT}?${queryString}`;

    console.log("REQUEST URL:", serpUrl);

    fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
        .then((res) => {
            console.log("STATUS:", res.status);
            return res.text(); // IMPORTANT DEBUG STEP
        })
        .then((text) => {
            console.log("RAW RESPONSE:", text);
            const json = JSON.parse(text);
            setData(json);
        })
        .catch((err) => {
            console.error("FETCH FAILED:", err);
        });
}, []);

    if (!data) {
        return <h1>Loading...</h1>
    }

    const app = data.app_highlight;
    const moreGames = [
    {
        title: "Clash Royale",
        author: "Supercell",
        rating: 4.5,
        thumbnail:
            "https://play-lh.googleusercontent.com/gnSC6s8-6Tjc4uhvDW7nfrSJxpbhllzYhgX8y374N1LYvWBStn2YhozS9XXaz1T_Pi2q=s64",
    },

    {
        title: "Boom Beach",
        author: "Supercell",
        rating: 4.5,
        thumbnail:
            "https://play-lh.googleusercontent.com/y_Dr51TrM3NfJO-bFECbGVXsjfFYo-6YjiJfIQwyNBX6VdBW8H8eSEZzpCXcGKKByyw=s64",
    },

    {
        title: "Brawl Stars",
        author: "Supercell",
        rating: 4.2,
        thumbnail:
            "https://play-lh.googleusercontent.com/IFACylsXgbKgfNXcLbFrzlNhkB6_5LH3IGNA-frTpTPNolzQxL8mI2B_4jnXe5lTCnQYZYIv9zNTQGWn_8QwLA=s64",
    },
]

      return (
        <div
        style={{
            minHeight: "100vh",
            background:
                "linear-gradient(to bottom right, #0f172a, #111827)",
            padding: "40px",
            fontFamily: "Arial",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
        }}
     >

          <div
        style={{
            marginBottom: "25px",
            display: "flex",
            gap: "15px",
            width: "1200px",
        }}
    >
        <input
            type="text"
            placeholder="Search game..."
            style={{
                flex: 1,
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                fontSize: "18px",
                backgroundColor: "#1e293b",
                color: "white",
            }}
        />

        <button
            style={{
                padding: "15px 25px",
                backgroundColor: "#38bdf8",
                color: "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "bold",
                cursor: "pointer",
            }}
        >
            Search
        </button>
    </div>

        <div
            style={{
                width: "1200px",
                backgroundColor: "#1e293b",
                borderRadius: "25px",
                padding: "30px",
                boxShadow:
                    "0 8px 25px rgba(0,0,0,0.5)",
                border: "2px solid #334155",
            }}
        >
            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    alignItems: "center",
                    marginBottom: "30px",
                }}
            >
                <div style={{ flex: 1 }}>
                    <h1
                        style={{
                            fontSize: "42px",
                            marginBottom: "10px",
                            color: "#38bdf8",
                        }}
                    >
                        {app.title}
                    </h1>

                    <p
                        style={{
                            fontSize: "20px",
                            color: "#94a3b8",
                            marginBottom: "20px",
                        }}
                    >
                        by {app.author}
                    </p>

                    <p
                        style={{
                            lineHeight: "1.8",
                            fontSize: "18px",
                            marginBottom: "25px",
                        }}
                    >
                        {app.description}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "40px",
                            marginBottom: "30px",
                        }}
                    >
                        <div>
                            <h2
                                style={{
                                    color: "#4ade80",
                                }}
                            >
                                {app.rating}
                            </h2>

                            <p>Rating</p>
                        </div>

                        <div>
                            <h2
                                style={{
                                    color: "#facc15",
                                }}
                            >
                                {app.downloads}
                            </h2>

                            <p>Downloads</p>
                        </div>

                        <div>
                            <h2
                                style={{
                                    color: "#fb7185",
                                }}
                            >
                                {app.content_rating.text}
                            </h2>

                            <p>Age Rating</p>
                        </div>
                    </div>

                    <button
                        style={{
                            backgroundColor: "#22c55e",
                            color: "white",
                            border: "none",
                            padding: "15px 35px",
                            borderRadius: "15px",
                            fontSize: "18px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        Install
                    </button>
                </div>

                <div>
                    <iframe
                        width="520"
                        height="300"
                        src={app.video}
                        allowFullScreen
                        style={{
                            borderRadius: "20px",
                            border: "none",
                        }}
                    />
                </div>
            </div>

            
     
            <h2
                style={{
                    marginBottom: "20px",
                    color: "#c084fc",
                    fontSize: "30px",
                }}
            >
                Preview
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    overflowX: "scroll",
                }}
            >
                {app.images.map(
                    (img: string, index: number) => (
                        <img
                            key={index}
                            src={img}
                            width="320"
                            loading="lazy"
                            onError={(e) => {
                                e.currentTarget.style.display =
                                    "none";
                            }}
                            style={{
                                borderRadius: "20px",
                                boxShadow:
                                    "0 4px 15px rgba(0,0,0,0.4)",
                            }}
                        />
                    )
                )}
            </div>

            <div
             style={{
        display: "flex",
        gap: "20px",
        overflowX: "scroll",
    }}
            >
        {moreGames.map((game, index) => (
            <div key={index}>
                <h2>{game.title}</h2>

                <img
                    src={game.thumbnail}
                    width="100"
                />

                <p>{game.author}</p>

                <p>{game.rating}</p>
            </div>
        ))}
    </div>

        </div>
    </div>
    
    )
}
export default Preview