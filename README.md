# AI Prompt Enhancer

A React-based tool that helps improve prompts for Large Language Models (LLMs) by adding structure and context based on your preferred tone and specificity requirements. Right now it's just a project that I created for fun and I hope it can help people prompt better.

## Features

- **Customizable Tone**: Choose between enthusiastic, balanced, or reserved communication styles
- **Adjustable Specificity**: Set the level of detail from concise to comprehensive
- **Expert Mode**: Enable domain-specific expertise in responses
- **Structured Output**: Automatically formats prompts using the CRISPE framework
  - Context
  - Role
  - Insight
  - Specific Instructions
  - Purpose
  - Evaluation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

``` bash
git clone https://github.com/BlackMagicKau/prompt-enhancer.git
cd prompt-enhancer
```

2. Install dependencies:

``` bash
npm install
```

3. Start the development server:

``` bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Usage

1. Enter your initial prompt in the input field
2. Customize the output by selecting:
   - Tone (Enthusiastic, Balanced, or Reserved)
   - Specificity (Detailed, Balanced, or Concise)
   - Expert Mode (if domain expertise is needed)
3. Click "Enhance Prompt" to generate a structured, enhanced version
4. Copy the enhanced prompt for use with your preferred LLM

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.