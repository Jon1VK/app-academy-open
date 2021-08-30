import Inbox from './inbox';
import Router from './router';
import Sent from './sent';

const ROUTES = {
  inbox: Inbox,
  sent: Sent,
};

const contentNode = document.querySelector('.content');
const router = new Router(contentNode, ROUTES);
router.start();
window.location.hash = '#inbox';

const sidebarNav = document.querySelector('.sidebar-nav');
sidebarNav.addEventListener('click', handleSidebarNavClick);

function handleSidebarNavClick(event) {
  const listItem = event.target.closest('li');

  if (listItem && event.currentTarget.contains(listItem)) {
    event.stopPropagation();
    window.location.hash = listItem.innerText.toLowerCase();
  }
}
