import MessageStore from './message_store';

const Inbox = {
  render() {
    const container = document.createElement('ul');
    container.className = 'messages';

    MessageStore.getInboxMessages().forEach((message) => {
      container.appendChild(this.renderMessage(message));
    });

    return container;
  },

  renderMessage({ from, body, subject }) {
    const container = document.createElement('li');
    container.className = 'message';
    container.innerHTML = `
      <span class="from">${from}</span>
      <span class="subject">${subject}</span>
      <span class="body">${body}</span>
    `;
    return container;
  },
};

export default Inbox;
