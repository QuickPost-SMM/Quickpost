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
    return (
        <div 
            className="cursor-pointer rounded border p-4 hover:bg-gray-50"
            onClick={onClick}
        >
            <h4 className="font-medium">{task.title}</h4>
            {task.description && (
                <p className="mt-2 text-sm text-gray-600">{task.description}</p>
            )}
        </div>
    );
}
