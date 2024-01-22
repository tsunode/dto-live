import type { Request, Response } from "express";
import { TestCreateRequestDTO } from "src/dtos/test-create-dto/test-create-request.dto";
import { TestCreateResponseDTO } from "src/dtos/test-create-dto/test-create-response.dto";
import { TestUseCase } from "src/use-cases/test.use-case";

export const test = (request: Request, response: Response) => {
    const parsedRequest = new TestCreateRequestDTO({...request.body})
    // request.body

    // service, useCase...
    new TestUseCase().execute(parsedRequest)


    return response.json(new TestCreateResponseDTO(parsedRequest.getAll()).getAll())
}