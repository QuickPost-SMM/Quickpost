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

export default function TaskCard({ task }: TaskProps) {

    return (
        <Card className="border-0 bg-blue-100 text-black">
            <CardContent className="p-4">
                <div className="flex items-start justify-between">
                    <h4 className="mb-2 font-medium">{task.title}</h4>
                </div>
                <p className="text-muted-foreground text-sm">{task.description}</p>
            </CardContent>
        </Card>
    );
}
