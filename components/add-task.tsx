"use client";

import React, { useState, KeyboardEvent } from 'react'

import { Button } from './ui/button';
import { Input } from './ui/input';
import { PlusIcon } from '@radix-ui/react-icons';
import { createTask, CreateTaskSchema } from '@/actions/create-task';
import { getFormatDate } from '@/lib/utils';

type Props = {
    isImportant: boolean;
    isMyDay: boolean;
}

export default function AddTask({isImportant, isMyDay}: Props) {
    const [isAdding, setIsAdding] = useState(false)
    const [title, setTitle] = useState('')

    async function handleKeyDown(e: KeyboardEvent) {
        if (e.key === 'Enter') {

            const data: CreateTaskSchema = {
                title,
                isImportant: isImportant,
            }
            if (isMyDay) {
                data.addedToMyDayOn = getFormatDate();
            }

            await createTask(data);
            setTitle('');
            setIsAdding(false);
        }
    }

    const handleBlur = () => {
        setIsAdding(false);
        setTitle('');
    }

    return (
        <div className='mt-10'>
            {isAdding ? (
                <Input 
                    type="text" 
                    name='title'
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={() => handleBlur()}
                />
            ) : (
                <Button variant={'outline'}
                    onClick={() => setIsAdding(true)}>
                    <PlusIcon className='mr-2'/> Add Task
                </Button>
            )}
        </div>
    )
}