import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";



class AnswerController {

    async execute(request: Request, response: Response){
        const { value } = request.params;
        const { u } = request.query;
        console.log(value);
        console.log(u);

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        console.log(surveyUser);
        console.log(String(u));

        if(!surveyUser){
            throw new AppError("Survey User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController }