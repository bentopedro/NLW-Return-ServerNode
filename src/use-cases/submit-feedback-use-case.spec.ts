import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

// spies ou espiões
const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const feedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy},
    { sendMail: sendMailSpy}
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        await expect(feedback.execute({
            type: 'BUG',
            comment: 'A new comment',
            screenshot: 'data:image/png;base64,ksdansklnjkfgx'
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();

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