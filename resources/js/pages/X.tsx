import TwitterPostForm from "@/components/TwitterPostForm";

export default function X() {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Post to Twitter</h2>
            <TwitterPostForm />
        </div>
    );
}