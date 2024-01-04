import axios from "axios";
import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import useApiDebouncedRequest from "../../src/services/useApiDebouncedRequest";

const dataReturn = { message: "some data" };
const testUrlTwoChar = "/test-url/aa";
const testUrlThreeChar = "/test-url/aaa";

it("should return data, update loading and return error null when all is fine", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(testUrlTwoChar).reply(200, dataReturn);

  const { result } = renderHook(() =>
    useApiDebouncedRequest({ url: testUrlTwoChar })
  );

  // Wait for espera a que se cumpla la condición que se le pasa como argumento
  // si le pasas true, como esto ya se cumple, no espera nada
  // si le pasas false, espera hasta que se cumpla la condición
  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toEqual(dataReturn);
  expect(result.current.loading).toBe(false);
  expect(result.current.error).toBeNull();
});

it("should return error when urls is not provided", async () => {
  const { result } = renderHook(() => useApiDebouncedRequest({ url: "" }));

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toBeNull();
  expect(result.current.error).not.toBeNull();
});

it("should return error when axios call fails", async () => {
  const mock = new MockAdapter(axios);

  mock.onGet(testUrlTwoChar).networkError();

  const { result } = renderHook(() =>
    useApiDebouncedRequest({ url: testUrlTwoChar })
  );

  await waitFor(() => {
    expect(result.current.loading).toBe(false);
  });

  expect(result.current.data).toBeNull();
  expect(result.current.error).not.toBeNull();
});
