import { Button } from '@/components/ui/button';
import NavBar from '@/layouts/NavBar';
import { Head } from '@inertiajs/react';
import { Kanban, LayoutGrid, PlusCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import GalleryView from '@/components/GalleryView';
import KanbanBoard from '@/components/KanbanBoard';
import axios from 'axios';
import CreateIdeaModal from '@/components/CreateIdeaModal ';

// Define the idea type
interface Idea {
    id: string;
    title: string;
    description?: string;
    status: 'unassigned' | 'todo' | 'doing' | 'done';
}

interface CreatePostProps {
    accounts: Array<{
        id: number;
        platform: string;
        username: string;
        connected: boolean;
    }>;
}

type Content = {
    id: string;
    title: string;
    description: string;
    status: string;
};

export default function CreateContent() {
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);

    const [activeView, setActiveView] = useState<'board' | 'gallery'>('board');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    // Initial ideas state

    const fetchContents = async () => {
        try {
            const response = await axios.get('/contents');
            console.log(response);
            setContents(response.data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to load tasks:', err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContents();
    }, []);

    const handleModalClose = () => {
        setIsCreateModalOpen(false);
        fetchContents(); // Refresh data when modal closes
    };

    if (loading) {
        return 'loading.....';
    }

    return (
        <NavBar title="Create Content">
            <Head title="Create Content" />
            <div className="mb-6 flex items-center justify-between text-black">
                <div>
                    <h1 className="text-2xl font-bold">Ideas</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-1 text-white">
                        <Sparkles className="h-4 w-4" />
                        Generate Ideas
                    </Button>
                    <div className="ml-6 flex items-center gap-2">
                        <div className="flex rounded-md border">
                            <Button
                                variant={activeView === 'board' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveView('board')}
                                className={activeView === 'board' ? 'bg-primary text-primary-foreground' : ''}
                            >
                                <Kanban className="mr-2 h-4 w-4" />
                                Board
                            </Button>

                            <Button
                                variant={activeView === 'gallery' ? 'default' : 'ghost'}
                                size="sm"
                                onClick={() => setActiveView('gallery')}
                                className={activeView === 'gallery' ? 'bg-primary text-primary-foreground' : ''}
                            >
                                <LayoutGrid className="mr-2 h-4 w-4" />
                                Gallery
                            </Button>
                        </div>
                        <Button size="sm" onClick={() => setIsCreateModalOpen(true)}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Idea
                        </Button>
                    </div>
                </div>
            </div>

            {activeView === 'board' ? (
                <KanbanBoard contents={contents} onNewIdea={() => setIsCreateModalOpen(true)} />
            ) : (
                <GalleryView contents={contents} onNewIdea={() => setIsCreateModalOpen(true)} />
            )}

            <CreateIdeaModal open={isCreateModalOpen} onClose={handleModalClose} />
        </NavBar>
    );
}
