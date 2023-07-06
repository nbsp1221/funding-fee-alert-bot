interface TelegramOptions {
  accessKey: string;
}

export class Telegram {
  private accessKey: string;

  constructor(options: TelegramOptions) {
    const {
      accessKey,
    } = options;

    this.accessKey = accessKey;
  }

  public async sendMessage(chatId: string, text: string) {
    const response = await fetch(`https://api.telegram.org/bot${this.accessKey}/sendMessage?chat_id=${chatId}&text=${text.replace(/\n/g, '%0A')}&parse_mode=markdown&disable_web_page_preview=true`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    return await response.json();
  }
}
