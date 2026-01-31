const mockCreate = jest.fn();

jest.mock('openai', () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => ({
            chat: {
                completions: {
                    create: mockCreate,
                },
            },
        })),
    };
});

import { LLMService } from '../llmService';

describe('LLMService', () => {
    beforeEach(() => {
        mockCreate.mockReset();
    });

    it('should enhance bullet point', async () => {
        // Setup default success response
        mockCreate.mockResolvedValue({
            choices: [{ message: { content: 'Enhanced bullet point content' } }]
        });

        const bullet = 'Managed team';
        const context = { position: 'Manager', company: 'ABC Corp' };

        const enhanced = await LLMService.enhanceBulletPoint(bullet, context);

        expect(enhanced).toBe('Enhanced bullet point content');
        expect(mockCreate).toHaveBeenCalledTimes(1);
    });

    it('should suggest skills', async () => {
        // Setup specific response for this test
        mockCreate.mockResolvedValue({
            choices: [{ message: { content: 'React, TypeScript, Node.js' } }]
        });

        const skills = await LLMService.suggestSkills('Developer', []);

        // The service splits by comma and trims
        expect(skills).toEqual(['React', 'TypeScript', 'Node.js']);
        expect(mockCreate).toHaveBeenCalledTimes(1);
    });
});
