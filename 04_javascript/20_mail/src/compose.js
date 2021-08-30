import MessageStore from './message_store';

const Compose = {
  render() {
    const container = document.createElement('div');
    container.className = 'new-message';
    container.innerHTML = this.renderForm();
    container.addEventListener('change', this.handleInputChange);
    container.addEventListener('submit', this.handleSubmit);
    return container;
  },

  renderForm() {
    const messageDraft = MessageStore.getMessageDraft();

    return `
      <p class="new-message-header">New Message</p>
      <form class="compose-form">
        <input type="text" name="to" value="${messageDraft.to}" placeholder="Recipient">
        <input type="text" name="subject" value="${messageDraft.subject}" placeholder="Subject">
        <textarea name="body" rows=20>${messageDraft.body}</textarea>
        <button class="btn btn-primary submit-message" type="submit">Send</button>
      </form>
    `;
  },

  handleInputChange(event) {
    const input = event.target;
    MessageStore.updateDraftField(input.name, input.value);
  },

  handleSubmit(event) {
    event.preventDefault();
    MessageStore.sendDraft();
    window.location.hash = 'inbox';
  },
};

export default Compose;
