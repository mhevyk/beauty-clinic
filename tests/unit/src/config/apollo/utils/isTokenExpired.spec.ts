import isTokenExpired from "@config/apollo/utils/isTokenExpired";
import { addMinutes } from "date-fns";

const mockCurrentDate = new Date("2024-01-01T10:00:00Z");

// Expired date: 2024-01-01T10:30:00Z (in the future)
const validToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTA1MDAwLCJleHAiOjE3MDQxMDUwMDB9.cVeYoWJ3o1yJdvIaB8tdCAkIAzu5JBdMgkGz6VgNzj0";

// Expired date: 2024-01-01T09:30:00Z (in the past)
const expiredToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTAxNDAwLCJleHAiOjE3MDQxMDE0MDB9.gTjT3TngJyUV0msPIe6PqcqULXd_VWXkaalnDPtuCk4";

// Expired date: 2024-01-01T10:00:00Z (same as current timestamp)
const immediateToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMSIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNzA0MTAzMjAwLCJleHAiOjE3MDQxMDMyMDB9.9LrdTgC8EFnARyr7jfj52yaI_EOXC-dRtRUrMvfZBK8";

const tokenWithoutExp =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJ1c2VybmFtZSI6InRlc3RfMyIsInJvbGUiOiJVU0VSIiwiaWF0IjoxNjA5MjI5NzAwfQ.qb-GC7kxfK3ZTk9o31kM4P2GMPg1j5jTz8qkAqJzal4";

describe("isTokenExpired()", () => {
  beforeEach(() => {
    jest.spyOn(Date, "now").mockImplementation(() => mockCurrentDate.getTime());
  });

  it("should return false if jwt token is valid and not expired", () => {
    expect(isTokenExpired(validToken)).toBeFalsy();
  });

  it("should return false if passed value is not a valid jwt token", () => {
    expect(isTokenExpired("123")).toBeFalsy();
  });

  it("should return false if jwt token does not have 'exp' field", () => {
    expect(isTokenExpired(tokenWithoutExp)).toBeFalsy();
  });

  it("should return true if jwt token is expired", () => {
    const expiredTimestamp = addMinutes(mockCurrentDate, 15).getTime();
    jest.spyOn(Date, "now").mockImplementation(() => expiredTimestamp);

    expect(isTokenExpired(expiredToken)).toBeTruthy();
  });

  it("should return true if expired date is strict equal to current timestamp", () => {
    expect(isTokenExpired(immediateToken)).toBeTruthy();
  });
});
