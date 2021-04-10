export class Constant {
  constructor() {
    throw new Error('');
  }

  static get title() {
    return 'デュラララチャット(偽)';
  }

  static get description() {
    return 'デュラララチャットの偽サイトです';
  }

  static get url() {
    return 'https://chatkari.pages.dev';
  }

  static get firebase_databases() {
    return {
      broadcast: 'broadcast',
      rooms: 'rooms',
      users: 'users',
      talks: 'talks',
      images: 'images',
    };
  }

  static get endPoint() {
    return process.env.NODE_ENV === 'production'
      ? 'https://chat183717.us-south.cf.appdomain.cloud'
      : 'http://localhost:8080';
  }

  static get icon_number() {
    return 23;
  }

  static get place() {
    return {
      root: 'root',
      lounge: 'lounge',
      room: 'room',
    };
  }

  static get icons() {
    return [
      'girl',
      'moza',
      'tanaka',
      'kanra',
      'usa',
      'gg',
      'orange',
      'zaika',
      'setton',
      'zawa',
      'neko',
      'purple',
      'kai',
      'bakyura',
      'neko2',
      'numakuro',
      'bm',
      'bear',
      'rab',
      'nyan',
      'muff',
      'muff_nyan',
      'twin',
    ];
  }
}
