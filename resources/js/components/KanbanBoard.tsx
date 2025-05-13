import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Edit3, PlusCircle, Trash2 } from 'lucide-react';
import TaskCard from './TaskCard';
import toast from 'react-hot-toast';

type Contents = {
    id: string;
    title: string;
    description: string;
    status: string; // Make sure this exists in your Task type
};

type Column = {
    id: string;
    title: string;
    tasks: Contents[];
};

interface KanbanBoardProps {
    contents: Contents[];
    onNewIdea: () => void;
}

export default function KanbanBoard({ contents, onNewIdea }: KanbanBoardProps) {
    // Define static columns that will always appear
    const staticColumns = [
        { id: 'unassigned', title: 'Unassigned' },
        { id: 'to-do', title: 'Todo' },
        { id: 'doing', title: 'In Progress' },
        { id: 'done', title: 'Done' },
    ];

    const columns = staticColumns.map((column) => ({
        ...column,
        tasks: contents.filter((task) => task.status === column.id),
    }));

    const handleEditTask = (content : Contents[]) => {
        
    };

    const handleDeleteTask = async ( taskId: string) => {
        if (window.confirm('Are you sure you want to delete this content?')) {
            try {
                await axios.delete(`/contents/${taskId}`);

                console.log('deleted');
                toast.success('Content deleted successfully');
                window.location.reload(); 
            } catch (error) {
                console.error('Delete error:', error);
                toast.error(error.response?.data?.message || 'Failed to delete content');
            }
        }
    };

    return (
        <div className="grid grid-cols-1 gap-4 text-black md:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
                <div key={column.id} className="ml-1 flex flex-col bg-white p-2.5">
                    <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold">{column.title}</h3>
                            <span className="text-muted-foreground text-sm">{column.tasks.length}</span>
                        </div>
                    </div>

                    <div className="flex-1 space-y-4">
                        {column.tasks.map((task) => (
                            <div key={task.id} className="relative">
                                <TaskCard task={task} />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    {/* <Button variant="ghost" size="icon" onClick={() => handleEditTask(column)}>
                                        <Edit3 className="h-4 w-4" />
                                    </Button> */}
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTask( task.id )}>
                                        <Trash2 className="h-4 w-4 text-red-500" />
                                    </Button>
                                </div>
                            </div>
                        ))}

                        <Button variant="ghost" className="w-full justify-start bg-white" onClick={onNewIdea}>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Idea
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
