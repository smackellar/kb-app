import { KbAppPage } from './app.po';

describe('kb-app App', () => {
  let page: KbAppPage;

  beforeEach(() => {
    page = new KbAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
