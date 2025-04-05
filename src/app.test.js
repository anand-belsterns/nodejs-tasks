// Jest test case starts here
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const server = require('./path/to/your/server'); // Adjust the path according to your file structure

jest.mock('fs');

const DATA_FILE = path.join(__dirname, 'tasks.json');

describe('Tasks API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /tasks', () => {
        it('should return an array of tasks', async () => {
            const mockTasks = [{ id: 1, title: 'Test Task', completed: false, isActive: true }];
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify(mockTasks));

            const response = await request(server).get('/tasks');
            expect(response.status).toBe(200);
            expect(response.body).toEqual(mockTasks);
        });
    });

    describe('POST /tasks', () => {
        it('should create a new task', async () => {
            const newTask = { title: 'New Task' };
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify([]));
            fs.writeFileSync.mockImplementation(() => {});

            const response = await request(server).post('/tasks').send(newTask);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('id');
            expect(response.body.title).toBe(newTask.title);
        });
    });

    describe('PUT /tasks/:id', () => {
        it('should update an existing task', async () => {
            const existingTasks = [{ id: 1, title: 'Old Task', completed: false, isActive: true }];
            const updatedTask = { title: 'Updated Task' };

            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify(existingTasks));
            fs.writeFileSync.mockImplementation(() => {});

            const response = await request(server).put('/tasks/1').send(updatedTask);
            expect(response.status).toBe(200);
            expect(response.body.title).toBe(updatedTask.title);
        });

        it('should return 404 if the task is not found', async () => {
            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify([])); // No tasks present

            const response = await request(server).put('/tasks/999').send({ title: 'Non-existent Task' });
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Task not found' });
        });
    });

    describe('DELETE /tasks/:id', () => {
        it('should delete an existing task', async () => {
            const existingTasks = [{ id: 1, title: 'Task to delete', completed: false, isActive: true }];

            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify(existingTasks));
            fs.writeFileSync.mockImplementation(() => {});

            const response = await request(server).delete('/tasks/1');
            expect(response.status).toBe(204);
        });

        it('should return 404 if the task is not found', async () => {
            const existingTasks = [{ id: 1, title: 'Task to delete', completed: false, isActive: true }];

            fs.existsSync.mockReturnValue(true);
            fs.readFileSync.mockReturnValue(JSON.stringify(existingTasks));
            fs.writeFileSync.mockImplementation(() => {});

            const response = await request(server).delete('/tasks/999');
            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Task not found' });
        });
    });
});

// Jest test case ends here