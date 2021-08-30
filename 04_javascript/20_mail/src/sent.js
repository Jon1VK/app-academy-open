import MessageStore from './message_store';

const Sent = {
  render() {
    const container = document.createElement('ul');
    container.className = 'messages';

    MessageStore.getSentMessages().forEach((message) => {
      container.appendChild(this.renderMessage(message));
    });

    return container;
  },

  renderMessage({ to, body, subject }) {
    const container = document.createElement('li');
    container.className = 'message';
    container.innerHTML = `
      <span class="to">To: ${to}</span>
      <span class="subject">${subject}</span>
      <span class="body">${body}</span>
    `;
    return container;
  },
};

export default Sent;
