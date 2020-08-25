const initialData = {
    tasks: {
        'task-1': { id: 'task-1', content: "Take out the garbage" },
        'task-2': { id: 'task-2', content: "Watch my favorite show" },
        'task-3': { id: 'task-3', content: "Charge my phone" },
        'task-4': { id: 'task-4', content: "Cook dinner" },
        'task-5': { id: 'task-5', content: "Eat dinner" },
    },
    columns: {
        'colum-1': {
            id: 'colum-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
        },
    },
    columOrder: ['colum-1'],
};

export default initialData;