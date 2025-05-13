import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

type Contents = {
    id: string;
    title: string;
    description: string;
    status: string; // Make sure this exists in your Task type
};

interface GalleryViewProps {
    contents: Contents[];
    onNewIdea: () => void;
}

export default function GalleryView({ contents, onNewIdea }: GalleryViewProps) {
    return (
        <div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {contents.map((idea) => (
                    <Card key={idea.id} className="flex h-[200px] items-start border-0 bg-gray-300 text-black">
                        <CardContent className="flex h-full flex-col p-4">
                            <div className="flex flex-col items-start gap-2">
                                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs">{idea.status}</span>
                                <h1 className="text-left font-medium">{idea.title}</h1>
                                <p className="text-muted-foreground text-left text-sm">{idea.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                <Card className="flex h-[200px] items-center justify-center border-0 bg-gray-300 text-black">
                    <Button variant="ghost" onClick={onNewIdea}>
                        <PlusCircle className="mr-2 h-5 w-5" />
                        New Idea
                    </Button>
                </Card>
            </div>
        </div>
    );
}
