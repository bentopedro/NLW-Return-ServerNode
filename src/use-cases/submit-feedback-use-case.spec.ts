import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        const feedback = new SubmitFeedbackUseCase(
            { create: async () => {}},
            { sendMail: async () => {}}
        )

        await expect(feedback.execute({
            type: 'BUG',
            comment: 'A new comment',
            screenshot: 'photo.png'
        })).resolves.not.toThrow();
    })
})