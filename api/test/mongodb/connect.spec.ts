import { left, right } from "fp-ts/lib/Either"
import mongo, { MongoClient } from "mongodb"
import { ServiceError } from "../../src/common/actions"
import { connect } from "../../src/mongo/connect"

jest.mock("mongodb", () => ({
  MongoClient: {
    connect: jest.fn(),
  },
}))
const mockedMongo = mongo as jest.Mocked<any>

describe("mongodb", () => {
  describe("connect", () => {
    it("returns a MongoClient on success", async () => {
      const mongoClient = { some: "mongo-client" }
      mockedMongo.MongoClient.connect.mockImplementation(() => Promise.resolve(mongoClient))

      const someUrl = "some-url"
      const client = await connect(someUrl)()

      expect(mockedMongo.MongoClient.connect.mock.calls[0][0]).toBe(someUrl)
      expect(client).toEqual(right(mongoClient))
    })

    it("returns a left with an error if connect fails", async () => {
      const error = new ServiceError("Some error message")
      mockedMongo.MongoClient.connect.mockImplementation(() => Promise.reject(error))

      const client = await connect("someUrl")()

      expect(client).toEqual(left(error))
    })
  })
})
