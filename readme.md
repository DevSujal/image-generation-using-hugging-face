# Stable Diffusion Image Generation CLI

This Node.js application generates images based on user prompts using the Stable Diffusion API from Hugging Face. It takes a prompt as input from the command line, generates an image, saves it, and then deletes it automatically after 60 seconds.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [License](#license)

## Features
- Command-line prompt for user input
- API integration with Hugging Face's Stable Diffusion model
- Saves generated images locally with automatic cleanup after 60 seconds

## Prerequisites
- Node.js (v18 or higher recommended)
- Hugging Face API key with access to the Stable Diffusion model

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the project root and add your Hugging Face API key:
```plaintext
API_KEY=your_huggingface_api_key
```

## Usage

1. Run the application with the following command:
```bash
node index.js
```

2. Enter a prompt to generate an image (e.g., "a serene beach at sunset")
3. The application will fetch the generated image and save it locally
4. The image will be deleted after 60 seconds

### Example output:
```arduino
@DevSujal ➜ /workspaces/codespaces-blank $ node index.js
Enter the description of the image : a cat in a spacesuit
You entered: a cat in a spacesuit
Generating image for prompt: a cat in a spacesuit
Image successfully saved as generated-image-<timestamp>.png
Deleting the image after 60s, please don't turn off the server!
Generation completed: generated-image-<timestamp>.png
```

## Environment Variables

The project requires the following environment variable:
- `API_KEY`: Hugging Face API Key for authentication

## Project Structure

```bash
.
├── index.js       # Main application file
├── .env           # Environment file containing the API key
└── README.md      # Documentation
```

## License

This project is open-source and available for personal and educational purposes.