import { Injectable, OnModuleInit, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as TelegramBot from 'node-telegram-bot-api'
import { DatabaseService } from '../prisma/prisma.service'

@Injectable()
export class BotService implements OnModuleInit {
  updateComplaintStatus(id: string, status: string): import('./Bot.controller').Complaint | PromiseLike<import('./Bot.controller').Complaint> {
    throw new Error('Method not implemented.')
  }
  getComplaints(): import('./Bot.controller').Complaint[] | PromiseLike<import('./Bot.controller').Complaint[]> {
    throw new Error('Method not implemented.')
  }

  private bot: TelegramBot
  private readonly logger = new Logger(BotService.name)

  constructor(
    private readonly config: ConfigService,
    private readonly db: DatabaseService,
  ) {}

  onModuleInit() {
    const token = process.env.TELEGRAM_BOT_TOKEN
    if (!token) {
      this.logger.error('⚠️ Bot token topilmadi!')
      return
    }

    this.logger.log('✅ Bot token yuklandi. Ishga tushyapti...')
    this.bot = new TelegramBot(token, { polling: true })

    this.bot.onText(/\/start/, async (msg) => {
      this.logger.log(`Start buyrug'i: ${msg.chat.id}`)

      const welcomeMessage = `👋 Salom, ${msg.from.first_name}!\n\n✍️ Shikoyat, taklif yoki fikringizni yuborish uchun pastdagi tugmani bosing:`

      const keyboard = {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✉️ Murojaat yuborish', callback_data: 'start_feedback' },
            ],
          ],
        },
      }

      await this.bot.sendMessage(msg.chat.id, welcomeMessage, keyboard)
    })

    this.bot.on('callback_query', async (query) => {
      const chatId = query.message.chat.id

      if (query.data === 'start_feedback') {
        await this.bot.sendMessage(chatId, '✍️ Iltimos, murojaatingizni matn shaklida yuboring.')
      }

      await this.bot.answerCallbackQuery(query.id)
    })

this.bot.on('message', async (msg) => {
  if (!msg.text || msg.text.startsWith('/start')) return
  if (msg.sticker) {
    await this.bot.sendMessage(msg.chat.id, '❌ Sticker yuborish taqiqlangan. Faqat matn yozing.')
    return
  }
  const emojiRegex = /\p{Emoji}/u
  if (emojiRegex.test(msg.text)) {
    await this.bot.sendMessage(msg.chat.id, '❌ Emoji ishlatmang. Iltimos, oddiy matn yozing.')
    return
  }

  try {
    const record = {
      telegramId: msg.chat.id.toString(),
      fullName: `${msg.from.first_name ?? ''} ${msg.from.last_name ?? ''}`.trim() || null,
      username: msg.from.username || null,
      message: msg.text,
      status: 'pending',
    }

    const saved = await this.db.feedback.create({ data: record })

    this.logger.log('✅ Murojaat saqlandi:', saved)
    await this.bot.sendMessage(msg.chat.id, '✅ Murojaatingiz qabul qilindi. Rahmat!')
  } catch (err) {
    this.logger.error('❌ Saqlashda xatolik:', err.message, err.stack)
    await this.bot.sendMessage(msg.chat.id, '❌ Xatolik yuz berdi. Qayta urinib ko`ring.')
  }
})


    this.bot.on('polling_error', (err) => {
      this.logger.error(`❌ Polling xatosi: ${err.code} - ${err.message}`)
    })

    this.logger.log('🤖 Bot faol.')
  }

  async getAllFeedback() {
    return this.db.feedback.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async changeFeedbackStatus(id: string, status: string) {
    return this.db.feedback.update({
      where: { id },
      data: { status },
    })
  }
}
