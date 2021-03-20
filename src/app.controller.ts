import { Controller, Post } from '@nestjs/common';

@Controller()
export class AppController {

  @Post('/login')
  public login() {

    return ({ token: 'tokenValue'});
  }
}
