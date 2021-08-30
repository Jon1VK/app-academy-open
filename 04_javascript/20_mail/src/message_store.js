function Message({ from = '', to = '', subject = '', body = '' } = {}) {
  this.from = from;
  this.to = to;
  this.subject = subject;
  this.body = body;
}

const messages = {
  sent: [
    new Message({
      to: 'friend@mail.com',
      subject: 'Check this out',
      body: "It's so cool",
    }),
    new Message({
      to: 'person@mail.com',
      subject: 'zzz',
      body: 'so booring',
    }),
  ],
  inbox: [
    new Message({
      from: 'grandma@mail.com',
      subject: 'Fwd: Fwd: Fwd: Check this out',
      body: 'Stay at home mom discovers cure for leg cramps. Doctors hate her',
    }),
    new Message({
      from: 'person@mail.com',
      subject: 'Questionnaire',
      body: 'Take this free quiz win $1000 dollars',
    }),
  ],
};

let messageDraft = new Message();

const MessageStore = {
  getInboxMessages() {
    return messages.inbox;
  },

  getSentMessages() {
    return messages.sent;
  },

  getMessageDraft() {
    return messageDraft;
  },

  updateDraftField(field, value) {
    messageDraft[field] = value;
  },

  sendDraft() {
    messages.sent.push(messageDraft);
    messageDraft = new Message();
  },
};

export default MessageStore;
