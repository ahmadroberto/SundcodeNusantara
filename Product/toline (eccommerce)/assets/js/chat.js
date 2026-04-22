/**
 * TOLINE E-COMMERCE - Chat Widget
 * Floating chat popup with quick actions
 */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    initChatWidget();
  });

  function initChatWidget() {
    const chatWidget = document.querySelector('.chat-widget');
    const toggleBtn = document.querySelector('[data-chat-toggle]');
    const closeBtn = document.querySelector('[data-chat-close]');
    const sendBtn = document.querySelector('[data-chat-send]');
    const input = document.querySelector('.chat-input input');
    const messagesContainer = document.querySelector('.chat-messages');
    const quickActions = document.querySelectorAll('.chat-quick-action');

    if (!chatWidget || !toggleBtn) return;

    // Toggle chat
    toggleBtn.addEventListener('click', function() {
      chatWidget.classList.toggle('active');
      
      // Add welcome message on first open
      if (chatWidget.classList.contains('active') && !messagesContainer.querySelector('.chat-message')) {
        setTimeout(() => {
          addBotMessage('Hi there! 👋 How can we help you today?');
        }, 300);
      }
    });

    // Close button
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        chatWidget.classList.remove('active');
      });
    }

    // Send message
    if (sendBtn && input) {
      sendBtn.addEventListener('click', () => sendMessage(input, messagesContainer));
      
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage(input, messagesContainer);
        }
      });
    }

    // Quick actions
    quickActions.forEach(action => {
      action.addEventListener('click', function() {
        const message = this.textContent;
        addUserMessage(message);
        
        // Simulate response
        setTimeout(() => {
          generateAutoResponse(message, messagesContainer);
        }, 1000);
      });
    });

    // Close on outside click
    document.addEventListener('click', function(e) {
      if (chatWidget.classList.contains('active') && 
          !chatWidget.contains(e.target) && 
          e.target !== toggleBtn) {
        chatWidget.classList.remove('active');
      }
    });
  }

  function sendMessage(input, messagesContainer) {
    const message = input.value.trim();
    if (!message) return;

    addUserMessage(message, messagesContainer);
    input.value = '';

    // Simulate bot response
    setTimeout(() => {
      generateAutoResponse(message, messagesContainer);
    }, 1000);
  }

  function addUserMessage(message, container) {
    if (!container) {
      container = document.querySelector('.chat-messages');
    }
    if (!container) return;

    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message user';
    messageEl.textContent = message;
    container.appendChild(messageEl);
    
    scrollToBottom(container);
  }

  function addBotMessage(message, container) {
    if (!container) {
      container = document.querySelector('.chat-messages');
    }
    if (!container) return;

    const messageEl = document.createElement('div');
    messageEl.className = 'chat-message bot';
    messageEl.textContent = message;
    container.appendChild(messageEl);
    
    scrollToBottom(container);
  }

  function generateAutoResponse(message, container) {
    if (!container) {
      container = document.querySelector('.chat-messages');
    }

    const lowerMessage = message.toLowerCase();
    let response = '';

    // Simple keyword-based responses
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      response = 'We offer free shipping for orders above Rp 500.000. Standard delivery takes 2-5 business days. Would you like to know more?';
    } else if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      response = 'We have a 30-day return policy. Items must be in original condition with tags attached. Want me to guide you through the return process?';
    } else if (lowerMessage.includes('size') || lowerMessage.includes('fit')) {
      response = 'Check our size guide on each product page. If you\'re between sizes, we recommend sizing up for a comfortable fit!';
    } else if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
      response = 'We accept Bank Transfer, E-Wallet (GoPay, OVO, Dana), and Cash on Delivery (COD). All payments are secure and encrypted.';
    } else if (lowerMessage.includes('discount') || lowerMessage.includes('promo') || lowerMessage.includes('coupon')) {
      response = 'Check our homepage for current promotions! You can also subscribe to our newsletter for exclusive deals. 💰';
    } else if (lowerMessage.includes('track') || lowerMessage.includes('order status')) {
      response = 'You can track your order in your Dashboard > Orders section. You\'ll also receive tracking updates via email.';
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = 'Hello! 😊 Great to have you here. How can I assist you today?';
    } else if (lowerMessage.includes('thank')) {
      response = 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerMessage.includes('whatsapp') || lowerMessage.includes('contact')) {
      response = 'You can also reach us on WhatsApp at +62 812-3456-7890. We\'re available Monday-Saturday, 9 AM - 6 PM WIB.';
    } else {
      response = 'Thanks for your message! For detailed assistance, you can also contact us via WhatsApp at +62 812-3456-7890. Is there anything else I can help with?';
    }

    addBotMessage(response, container);
  }

  function scrollToBottom(container) {
    if (container) {
      setTimeout(() => {
        container.scrollTop = container.scrollHeight;
      }, 100);
    }
  }

  // WhatsApp redirect function
  window.openWhatsApp = function() {
    const phoneNumber = '6281234567890';
    const message = encodeURIComponent('Hello, I need help with...');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

})();
