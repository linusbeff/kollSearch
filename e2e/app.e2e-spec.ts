import { KollSearchPage } from './app.po';

describe('koll-search App', () => {
  let page: KollSearchPage;

  beforeEach(() => {
    page = new KollSearchPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
