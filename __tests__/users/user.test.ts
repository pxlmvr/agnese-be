import { Request, Response } from 'express'
import * as user from '../../src/handlers/user'

// TODO: use a local db for testing purpose
describe('user handler', () => {
  afterEach(() => {
    // TODO: cleanup db
  })

  it('should create a new user', async () => {
    const requestMock = {
      body: {
        username: 'test',
        password: 'test',
      },
    }

    const responseMock = {
      json({ token }: { token: string }) {
        expect(token).toBeTruthy()
      },
    }

    await user.createNewUser(
      requestMock as Request,
      responseMock as Response,
      () => {}
    )
  })
})
