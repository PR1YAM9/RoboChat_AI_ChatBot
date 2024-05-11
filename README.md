
# Robo Chat

Robo Chat is a simple React-based chat application that allows users to create and manage multiple chat sessions. It features a responsive design with a sidebar for managing chats and a chat area for viewing and interacting with messages.

Frontend Technology used: ReactJS, CSS, and Axios

Website Link: https://chat-app-topaz-rho.vercel.app/




## Explanation of API usage

Input is taken from the user by useState hook and sent to the AI model using the AI,
 
```javascript
const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://api-v2.longshot.ai/custom/api/generate/instruct',
        { text: input },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer '
          }
        }
      );

      const generatedContent = response.data?.copies?.[0]?.content;
      const newMessages = [...messages, { text: input, type: 'user' }, { text: generatedContent, type: 'ai' }];
      setMessages(newMessages);
      localStorage.setItem(`chat-${chatId}`, JSON.stringify(newMessages));
    } catch (error) {
      console.error('Error calling API:', error);
    }
    setInput('');
  };
```
The post method is used to send the user input, it can only be sent if the Authorization is approved we need a token(API key) for that which is generated from the Longshot ai website.

Response from the AI is then saved and added to the Array of responses from the AI, and the input is saved in the messages array which is the user input array, Both will be displayed.

The chat is then saved locally to the corresponding chat-id, to save we use JSON format.

Input is set back to null after the response is received and displayed.

## Documentation of Multiple chat instances

Users can dynamically create new chat instances by entering a name and clicking the "Create New Chat" button.
The newly created chat is added to the list of existing chats in the sidebar.

The sidebar displays a list of available chat instances, allowing users to easily navigate between different chats.
Each chat item in the sidebar is clickable, enabling users to switch to the selected chat.

Users have the ability to delete individual chat instances by clicking the "Delete" button associated with each chat in the sidebar.
Deleting a chat removes it from both the sidebar and local storage.

Chat instances and their respective messages are persisted across page reloads through the use of local storage.
The localStorage API is employed to store and retrieve information related to chat instances.

Each chat instance is assigned a unique identifier (id) to distinguish it from others.
The chatIds state keeps track of all active chat instances.
