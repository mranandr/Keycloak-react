import { Injectable } from "@nestjs/common";

@Injectable()
export class ActivityLogService {
  log(userId: string, action: string, details?: any) {
    console.log(`[ACTIVITY] User: ${userId}, Action: ${action}`);
    // save to DB using Mongoose model
  }
}