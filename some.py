# Simple chatbot using if-else logic

def chatbot():
    print("Hello! I'm ChatBot. Type 'exit' to end.")
    
    while True:
        user_input = input("You: ").lower()
        
        if user_input == 'exit':
            print("ChatBot: Goodbye!")
            break
        elif "hello" in user_input or "hi" in user_input:
            print("ChatBot: Hi there! How can I help you?")
        elif "your name" in user_input:
            print("ChatBot: I'm just a simple Python chatbot.")
        elif "help" in user_input:
            print("ChatBot: I'm here to chat with you! Try saying hello.")
        else:
            print("ChatBot: Sorry, I don't understand that yet.")

chatbot()
