import { Injectable } from '@nestjs/common';
@Injectable()
export class AuditService { private logs: any[] = []; logAction(userId: string, action: string, details: any) { this.logs.push({ timestamp: new Date(), userId, action, details }); } getLogs() { return this.logs; } }