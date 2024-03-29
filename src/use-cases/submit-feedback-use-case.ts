import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbackRepository } from "../repositories/Feedbacks-repository";

interface SubmitFeedbackUseCaseRequest{
    type: string,
    comment: string,
    screenshot?: string
}

export class SubmitFeedbackUseCase{
    constructor(
        private feedbackRepository: FeedbackRepository,
        private nodemailerMailAdapter: MailAdapter
    ){}

    async execute(request: SubmitFeedbackUseCaseRequest){
        const {type, comment, screenshot} = request;

        if(!type){
            throw new Error('Type is required.');        
        }     

        if(!comment){
            throw new Error('Comment is required.');        
        }        

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type,
            comment, 
            screenshot,
        })

        await this.nodemailerMailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size:16px; color:#111">`,
                `<p> Tipo de feedback ${type}</p>`,
                `<p> Comentário ${comment}</p>`,
                screenshot ? `<img src=${screenshot} />` : '',
                `</div>`
            ].join('')
        })
    }
}