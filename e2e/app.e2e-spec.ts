import { Md5SchedulerPage } from './app.po';

describe('md5-scheduler App', function() {
  let page: Md5SchedulerPage;

  beforeEach(() => {
    page = new Md5SchedulerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
