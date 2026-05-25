import { useEffect, useState } from "react";

function Preview() {
    const [data, setData] = useState<any>(null);

    const API_KEY =
        "069cc8af7e3ccdb4628eff5c5033cd955203613850ce67136eed9a9e40b91402";

    const ENDPOINT = "https://serpapi.com/search";

    const params = {
        engine: "google_play",
        q: "clash of clans",
        hl: "en",
        gl: "us",
    };

    useEffect(() => {
    const queryString = new URLSearchParams({
        ...params,
        api_key: API_KEY,
    }).toString();

    const serpUrl = `${ENDPOINT}?${queryString}`;

    fetch(
        "https://corsproxy.io/?" +
            encodeURIComponent(serpUrl)
    )
        .then(async (res) => {
            const text = await res.text();

            try {
                const json = JSON.parse(text);

                console.log(
                    "API RESULT:",
                    json
                );

                setData(json);
            } catch {
                console.log(
                    "NOT JSON:",
                    text
                );

                setData("error");
            }
        })
        .catch((err) => {
            console.error(
                "FETCH FAILED:",
                err
            );

            setData("error");
        });
}, []);

    if (data === null) {
        return <h1>Loading...</h1>;
    }

    if (data === "error") {
        return <h1>Failed to fetch data</h1>;
    }

    if (
    typeof data === "object" &&
    !data.app_highlight
) {
    return <h1>No app found</h1>;
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
    ];

    return (
        <div className="container">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search game..."
                    className="search-input"
                />

                <button className="search-button">
                    Search
                </button>
            </div>

            <div className="card">
                <div className="top-section">
                    <div className="info">
                        <h1 className="title">
                            {app.title}
                        </h1>

                        <p className="author">
                            by {app.author}
                        </p>

                        <p className="description">
                            {app.description}
                        </p>

                        <div className="stats">
                            <div>
                                <h2 className="green">
                                    {app.rating}
                                </h2>

                                <p>Rating</p>
                            </div>

                            <div>
                                <h2 className="yellow">
                                    {app.downloads}
                                </h2>

                                <p>Downloads</p>
                            </div>

                            <div>
                                <h2 className="pink">
                                    {
                                        app
                                            .content_rating
                                            ?.text
                                    }
                                </h2>

                                <p>Age Rating</p>
                            </div>
                        </div>

                        <button className="install-button">
                            Install
                        </button>
                    </div>

                    <iframe
                        width="520"
                        height="300"
                        src={app.video?.replace(
                            "watch?v=",
                            "embed/"
                        )}
                        allowFullScreen
                        className="video"
                    />
                </div>

                <h2 className="section-title">
                    Preview
                </h2>

                <div className="image-row">
                    {app.images?.map(
                        (
                            img: string,
                            index: number
                        ) => (
                            <img
                                key={index}
                                src={img}
                                width="320"
                                className="preview-image"
                            />
                        )
                    )}
                </div>

                <h2 className="section-title">
                    More Games
                </h2>

                <div className="games-row">
                    {moreGames.map(
                        (game, index) => (
                            <div
                                key={index}
                                className="game-card"
                            >
                                <img
                                    src={
                                        game.thumbnail
                                    }
                                    width="100"
                                    className="game-image"
                                />

                                <h2>
                                    {game.title}
                                </h2>

                                <p>
                                    {game.author}
                                </p>

                                <p>
                                    ⭐ {game.rating}
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

export default Preview;