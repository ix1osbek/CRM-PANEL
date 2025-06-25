import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class HttpTracker implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const methodType = request.method
    const path = request.originalUrl
    const deviceInfo = request.get('user-agent') ?? ''
    const clientIp = request.ip
    const logText = `[${methodType}] ${path} - ${deviceInfo} ${clientIp}`
    console.log(logText)
    next()
  }
}
