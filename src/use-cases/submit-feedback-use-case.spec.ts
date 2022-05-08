import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

const feedback = new SubmitFeedbackUseCase(
    { create: async () => {}},
    { sendMail: async () => {}}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(feedback.execute({
            type: 'BUG',
            comment: 'A new comment',
            screenshot: 'data:image/png;base64,ksdansklnjkfgx'
        })).resolves.not.toThrow();
    });

    it('should not be able to submit a feedback without type', async () => {        
        await expect(feedback.execute({
            type: '',
            comment: 'A new comment',
            screenshot: 'data:image/png;base64,ksdansklnjkfgx'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {        
        await expect(feedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,ksdansklnjkfgx'
        })).rejects.toThrow();
    });

    it('should not be able to submit a feedback with invalid screenshot format', async () => {        
        await expect(feedback.execute({
            type: 'BUG',
            comment: 'A new comment',
            screenshot: 'photo.png'
        })).rejects.toThrow();
    });
})