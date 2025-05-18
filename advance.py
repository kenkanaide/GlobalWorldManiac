import openai

# Initialize the OpenAI client with your secret API key
client = openai.OpenAI(api_key="maaz@1607")

def gpt_chat():
    print("ChatGPT-like Bot (type 'exit' to quit)")

    while True:
        user_input = input("You: ")
        if user_input.lower() == "exit":
            break

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_input}
            ]
        )

        reply = response.choices[0].message.content
        print("AI:", reply)

gpt_chat()


