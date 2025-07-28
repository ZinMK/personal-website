# VAPI Voice Agent Setup Guide

## Overview

This guide will help you set up VAPI (Voice AI Platform) to add a voice agent to your portfolio website that can speak about your projects and represent you.

## Step 1: Sign Up for VAPI

1. **Visit VAPI**: Go to [vapi.ai](https://vapi.ai)
2. **Create Account**: Sign up for a free account
3. **Verify Email**: Complete email verification
4. **Access Dashboard**: Navigate to your VAPI dashboard

## Step 2: Get Your Public API Key & Assistant ID

1. **Navigate to API Keys**: In your VAPI dashboard, go to "API Keys" section
2. **Copy Public Key**: Copy your Public API Key (not the secret key)
3. **Navigate to Assistants**: In the dashboard, go to "Assistants"
4. **Create or Select Assistant**: Create a new assistant or use an existing one
5. **Copy Assistant ID**: Copy the Assistant ID from the assistant's page

## Step 3: Configure Environment Variables

1. **Create .env file**: In your project root, create a `.env` file (if it doesn't exist)
2. **Add API Key & Assistant ID**: Add the following lines to your `.env` file:
   ```
   VITE_VAPI_PUBLIC_KEY=your_vapi_public_key_here
   VITE_VAPI_ASSISTANT_ID=your_vapi_assistant_id_here
   ```
3. **Replace with your key & ID**: Replace with your actual credentials

## Step 4: Test the Voice Agent

1. **Start Development Server**: Run `npm run dev`
2. **Open Voice Agent**: Click the "Voice Assistant" icon on your desktop
3. **Start Voice Chat**: Click "Start Voice Chat" button
4. **Test Interaction**: Start speaking and ask about projects

## Step 5: Customize Your Assistant

### In VAPI Dashboard:

- **System Prompt**: Update the assistant's personality and knowledge
- **Voice Settings**: Choose from various voice providers and styles
- **Model**: Select different language models (e.g., GPT-4, GPT-3.5)
- **Tools**: Add custom tools to connect to external APIs

### In the Code:

- You can dynamically pass information to your assistant, but for this project, most configuration is done in the VAPI dashboard.

## Troubleshooting

### Common Issues

1. **"Please set up your VAPI Public Key/Assistant ID"**

   - Ensure your `.env` file exists
   - Check that the credentials are correct
   - Restart your development server

2. **Voice not working**

   - Check browser microphone permissions
   - Ensure HTTPS is enabled (required for microphone access)
   - Try a different browser

3. **API Key/Assistant ID not working**
   - Verify the credentials are correct
   - Check your VAPI account status
   - Ensure you have sufficient credits

### Browser Compatibility

- **Chrome**: Full support
- **Firefox**: Full support
- **Safari**: Limited support
- **Edge**: Full support

## Security Considerations

1. **Public Key**: The `VITE_VAPI_PUBLIC_KEY` is safe to use on the client-side
2. **Secret Key**: Never expose your VAPI Secret Key in your frontend code
3. **Rate Limiting**: Be aware of VAPI's rate limits
4. **Cost Management**: Monitor your VAPI usage to control costs

## Cost Information

- **Free Tier**: Limited calls per month
- **Paid Plans**: Pay-per-call or monthly subscriptions
- **Voice Providers**: Different costs for different voice providers
- **Model Costs**: GPT-4 costs more than GPT-3.5-turbo

## Next Steps

1. **Customize Assistant**: Fine-tune your assistant in the VAPI dashboard
2. **Add More Features**: Implement more complex interactions
3. **Monitor Usage**: Track API usage and costs

## Support

- **VAPI Documentation**: [docs.vapi.ai](https://docs.vapi.ai)
- **VAPI Community**: Join their Discord or community forums
- **GitHub Issues**: Report bugs or request features

## Example Usage

Once set up, users can ask your voice agent:

- "Tell me about ClassFinder.ai"
- "What technologies do you use?"
- "Describe your Eureka app"
- "What are your biggest challenges?"
- "Tell me about your skills"

The agent will respond with detailed, conversational information about your projects and experience!
