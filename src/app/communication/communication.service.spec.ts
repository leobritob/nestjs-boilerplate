import { HttpService } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { CommunicationService } from './communication.service'

describe('CommunicationService', () => {
  let communicationService: CommunicationService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommunicationService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile()

    communicationService = module.get<CommunicationService>(CommunicationService)
  })

  it('should be defined', () => {
    expect(communicationService).toBeDefined()
  })

  describe('sendEmail', () => {
    it('should send an email successfully', async () => {
      //TODO: Write a test here
    })
  })
})
