import type { TestCreateRequestDTO } from "../dtos/test-create-dto/test-create-request.dto";

export class TestUseCase {
    execute(data: TestCreateRequestDTO) {
        console.log('aqui', data.get('onlyTest'))
    }
}