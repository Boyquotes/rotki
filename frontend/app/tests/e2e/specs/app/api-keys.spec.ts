import { ApiKeysPage } from '../../pages/api-keys-page';
import { RotkiApp } from '../../pages/rotki-app';
import { createUser } from '../../utils/user';

describe('API keys', () => {
  let username: string;
  let app: RotkiApp;
  let page: ApiKeysPage;

  before(() => {
    username = createUser();
    app = new RotkiApp();
    page = new ApiKeysPage();
    app.fasterLogin(username);
  });

  it('add exchange key', () => {
    const apiKey = Cypress.env('BITTREX_API_KEY');
    const apiSecret = Cypress.env('BITTREX_API_SECRET');
    page.visit('api-keys-exchanges');
    page.addExchange(apiKey, apiSecret, 'bittrex', 'BitRex');
    page.exchangeIsAdded('Bittrex', 'BitRex');
  });
});
