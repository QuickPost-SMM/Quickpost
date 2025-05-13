export default function Content() {
    return (
        <div
            onClick={() => {
                window.location.href = '/api/oauth/youtube/redirect';
            }}
        >
            Connect YouTube
        </div>
    );
}
