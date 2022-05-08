import { Router } from "express";

import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";

const feedbackRoutes = Router()


feedbackRoutes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body;   
    
    try{
        const prismaFeedbackRepository = new PrismaFeedbacksRepository()
        const nodemailerMailAdapter = new NodemailerMailAdapter()

        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbackRepository, 
            nodemailerMailAdapter
            );

        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot
        })

        return res.status(201).send()
    }catch (error){
        console.log(error);
        
        return res.status(500).send()
    }
})

export { feedbackRoutes }