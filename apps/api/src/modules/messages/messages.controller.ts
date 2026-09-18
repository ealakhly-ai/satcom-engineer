import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from '@prisma/client';

@Controller('messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('conversations')
  async getConversations(@CurrentUser() user: User) {
    return this.messagesService.getUserConversations(user.id);
  }

  @Post('conversations/with/:targetUserId')
  async startConversation(@CurrentUser() user: User, @Param('targetUserId') targetUserId: string) {
    return this.messagesService.getOrCreateConversation(user.id, targetUserId);
  }

  @Post('conversations/:conversationId')
  async sendMessage(
    @CurrentUser() user: User,
    @Param('conversationId') conversationId: string,
    @Body() body: { content: string; fileUrls?: string[] },
  ) {
    return this.messagesService.sendMessage(user.id, conversationId, body.content, body.fileUrls);
  }
}