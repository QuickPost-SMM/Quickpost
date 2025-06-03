import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import { MoreHorizontal , Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

type TaskProps = {
    task: {
        id: string;
        title: string;
        description: string;
    };
};

export function TaskCard({ task, onClick }) {
    const [expanded, setExpanded] = useState(false);
    return (
        <div 
            className="cursor-pointer rounded border p-4 hover:bg-gray-50"
            onClick={onClick}
        >
            <h4 className="font-medium">{task.title}</h4>
            {task.description && (
                <div onClick={(e) => e.stopPropagation()}>
                    <p className={`mt-2 text-sm text-gray-600 ${expanded ? '' : 'line-clamp-4'}`}>
                        {task.description}
                    </p>
                    <button 
                        className="text-xs text-blue-500 mt-1"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'Show less' : 'Show more'}
                    </button>
                </div>
            )}
        </div>
    );
}
