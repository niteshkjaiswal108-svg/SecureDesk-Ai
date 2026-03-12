import request from "supertest";

jest.mock('@/db/db.ts', () => ({
    db: {},
  }));


import { app } from "@/app.ts";
import * as userRepo from "@/modules/user/user.repositories.ts";

jest.mock('@/middlewares/auth0.ts', () => ({
    isAuthenticated: (req: any, res: any, next: any) => {
      const authHeader = req.headers?.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      req.auth = {
        payload: {
          sub: 'auth0|123',
          email: 'test@gmail.com',
          name: 'Test User',
        },
      };
      next();
    },
  }));

jest.mock("@/modules/user/user.repositories.ts");

describe("GET /users/me", () => {
    it("should return 401 if no auth", async () => {
        const res = await request(app).get("/api/v1/users/me");
        expect(res.status).toBe(401);
    });

    it("should return user data", async () => {
        (userRepo.getOrCreateUserByAuth0Id as jest.Mock).mockResolvedValue({
            id: "1",
            auth0_id: "auth0|123",
            email: "test@gmail.com",
            name: "Test User",
            preferences: {},
            created_at: new Date(),
            updated_at: new Date()
        })
        const res = await request(app)
        .get("/api/v1/users/me")
        .set("Authorization", "Bearer fake_token");

        expect(res.status).toBe(200);
        expect(res.body.email).toBe("test@gmail.com");
    })
})