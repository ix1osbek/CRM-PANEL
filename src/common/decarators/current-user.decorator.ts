import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetAuthUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const http = context.switchToHttp()
    const req = http.getRequest()
    return req.user
  },
)
