import { isNullOrUndefined } from "./is-null-or-undefined";
import { faker } from "@faker-js/faker";

describe("Application", () => {
  describe("Helpers", () => {
    describe("isNullOrUndefined", () => {
      it("Should return true if input is null", () => {
        const data = null;
        const expected = true;
        const result = isNullOrUndefined(data);

        expect(result).toStrictEqual(expected);
      });

      it("Should return true if input is undefined", () => {
        const data = undefined;
        const expected = true;
        const result = isNullOrUndefined(data);

        expect(result).toStrictEqual(expected);
      });

      it("Should return false if input has value", () => {
        const data = faker.lorem.word();
        const expected = false;
        const result = isNullOrUndefined(data);

        expect(result).toStrictEqual(expected);
      });
    });
  });
});
