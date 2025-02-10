import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Radio,
  RadioGroup,
  Switch,
  Text,
  Textarea,
  Tooltip,
  Alert,
  AlertIcon,
  useColorModeValue,
} from '@chakra-ui/react'
import { 
  HiOutlineFaceSmile,
  HiOutlineChatBubbleBottomCenter,
  HiOutlineDocumentText,
  HiOutlineSquares2X2,
  HiOutlineBookOpen,
  HiOutlineViewColumns,
  HiOutlineBars3,
  HiOutlineAcademicCap,
  HiOutlineInformationCircle
} from 'react-icons/hi2'
import React, { useState } from 'react'

// Add these constants at the top of the file, after the imports
const TONE_TEMPLATES = {
  high: {
    prefix: "You are an enthusiastic and energetic communicator who excels at conveying information with passion and excitement.",
    style: "Express ideas with dynamic language, strategic use of emphasis, and engaging tone. Use positive reinforcement and encouraging language."
  },
  medium: {
    prefix: "You are a balanced and approachable communicator who maintains a warm, professional tone.",
    style: "Balance professionalism with warmth, using clear and engaging language while maintaining composure."
  },
  low: {
    prefix: "You are a precise and methodical communicator who values clarity and objectivity.",
    style: "Maintain a measured, analytical tone. Prioritize accuracy and clarity over emotional engagement."
  }
};

const SPECIFICITY_TEMPLATES = {
  high: {
    instruction: "Break down complex topics into detailed, well-structured explanations.",
    format: "Use a hierarchical structure with main points and sub-points. Include specific examples, data points, or case studies where relevant.",
    evaluation: "Ensure each point is thoroughly explained with supporting details and practical applications."
  },
  medium: {
    instruction: "Provide clear, focused explanations that balance detail with accessibility.",
    format: "Present information in digestible sections with clear topic sentences and supporting details.",
    evaluation: "Verify that explanations are neither too sparse nor overly detailed."
  },
  low: {
    instruction: "Deliver concise, direct responses that capture essential information.",
    format: "Use bullet points or short paragraphs. Prioritize key takeaways.",
    evaluation: "Confirm that all essential information is included without unnecessary elaboration."
  }
};

function App() {
  const [initialPrompt, setInitialPrompt] = useState('')
  const [enhancedPrompt, setEnhancedPrompt] = useState('')
  const [tone, setTone] = useState('neutral')
  const [specificity, setSpecificity] = useState('balanced')
  const [rolePlaying, setRolePlaying] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const bgColor = useColorModeValue('#F9F9F9', '#1F1F1F')
  const primaryAccentColor = useColorModeValue('#208AEC', '#00CFFD')
  const secondaryAccentColor = useColorModeValue('#28C76F', '#FF3CAC')
  const textColor = useColorModeValue('#2E2E2E', '#F5F5F5')
  const secondaryTextColor = useColorModeValue('#6B6B6B', '#B3B3B3')

  const enhancePrompt = () => {
    // Get templates based on settings
    let toneTemplate;
    switch (tone) {
      case 'enthusiastic':
        toneTemplate = TONE_TEMPLATES.high;
        break;
      case 'balanced':
        toneTemplate = TONE_TEMPLATES.medium;
        break;
      case 'reserved':
        toneTemplate = TONE_TEMPLATES.low;
        break;
      default:
        toneTemplate = TONE_TEMPLATES.medium;
    }

    let specificityTemplate;
    switch (specificity) {
      case 'detailed':
        specificityTemplate = SPECIFICITY_TEMPLATES.high;
        break;
      case 'balanced':
        specificityTemplate = SPECIFICITY_TEMPLATES.medium;
        break;
      case 'concise':
        specificityTemplate = SPECIFICITY_TEMPLATES.low;
        break;
      default:
        specificityTemplate = SPECIFICITY_TEMPLATES.medium;
    }

    // Build the enhanced prompt using CRISPE framework and other optimization techniques
    let improvedPrompt = `[Task Context]\n`;
    improvedPrompt += `You are an AI assistant tasked with providing a helpful, well-structured response.\n\n`;

    // Capacity and Role (C & R from CRISPE)
    improvedPrompt += `[Capacity and Role]\n`;
    improvedPrompt += `${toneTemplate?.prefix || ''}\n`;
    if (rolePlaying) {
      improvedPrompt += `You are a subject matter expert with extensive knowledge and practical experience in this field. `;
      improvedPrompt += `Your expertise allows you to provide authoritative insights and nuanced explanations.\n`;
    }

    // Insight and Specific Instructions (I & S from CRISPE)
    improvedPrompt += `\n[Communication Parameters]\n`;
    improvedPrompt += `Style: ${toneTemplate?.style || ''}\n`;
    improvedPrompt += `Format: ${specificityTemplate?.format || ''}\n`;
    improvedPrompt += `Approach: ${specificityTemplate?.instruction || ''}\n`;

    // Purpose (P from CRISPE)
    improvedPrompt += `\n[Primary Query]\n`;
    improvedPrompt += `${initialPrompt}\n`;

    // Evaluation (E from CRISPE)
    improvedPrompt += `\n[Response Requirements]\n`;
    improvedPrompt += `1. Quality Standards:\n`;
    improvedPrompt += `   - Ensure factual accuracy and logical coherence\n`;
    improvedPrompt += `   - Maintain specified tone and style consistently\n`;
    improvedPrompt += `   - Follow format guidelines precisely\n`;
    
    improvedPrompt += `2. Content Structure:\n`;
    improvedPrompt += `   - Begin with a clear thesis or main point\n`;
    improvedPrompt += `   - Support claims with evidence or reasoning\n`;
    improvedPrompt += `   - Conclude with actionable insights or key takeaways\n`;

    // Additional Optimization Techniques
    improvedPrompt += `\n[Output Format]\n`;
    improvedPrompt += `Structure your response as follows:\n`;
    improvedPrompt += `1. Brief overview/summary\n`;
    improvedPrompt += `2. Main explanation/analysis\n`;
    improvedPrompt += `3. Supporting details/examples\n`;
    improvedPrompt += `4. Conclusion/practical implications\n`;

    improvedPrompt += `\n[Quality Control]\n`;
    improvedPrompt += `Before providing your response, verify that it:\n`;
    improvedPrompt += `- Directly addresses the primary query\n`;
    improvedPrompt += `- Maintains consistent tone and expertise level\n`;
    improvedPrompt += `- Follows the specified format and structure\n`;
    improvedPrompt += `- Provides appropriate level of detail\n`;
    
    setEnhancedPrompt(improvedPrompt)
    setShowSuccess(true)
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <Box bg={bgColor} color={textColor} minHeight="100vh" padding={5}>
      <Flex
        direction="column"
        align="center"
        maxW="800px"
        mx="auto"
        padding={8}
        bg={useColorModeValue('white', '#2D2D2D')}
        borderRadius="xl"
        boxShadow="xl"
      >
        <Heading mb={3} color={primaryAccentColor} fontSize="3xl">
          ✨ Enhance Your LLM Prompts
        </Heading>
        
        {/* Context Section */}
        <Text mb={6} color={secondaryTextColor} textAlign="center" maxW="600px">
          Transform your prompts with customized tone and specificity settings. 
          This tool helps you create more effective prompts for better AI responses.
        </Text>

        {/* Success Alert */}
        {showSuccess && (
          <Alert status="success" mb={4} borderRadius="md">
            <AlertIcon />
            Prompt enhanced successfully!
          </Alert>
        )}

        {/* Prompt Input Section */}
        <Text mb={2} alignSelf="start" fontWeight="medium">
          Initial Prompt:
        </Text>
        <Textarea
          placeholder="Enter your initial prompt here..."
          value={initialPrompt}
          onChange={(e) => setInitialPrompt(e.target.value)}
          mb={6}
          w="100%"
          minH="120px"
          p={4}
          borderRadius="md"
          _focus={{
            borderColor: primaryAccentColor,
            boxShadow: `0 0 0 1px ${primaryAccentColor}`,
          }}
        />

        {/* Enhancement Panel */}
        <Box 
          w="100%" 
          mb={6} 
          p={6} 
          borderRadius="lg" 
          bg={useColorModeValue('gray.50', '#1A1A1A')}
        >
          <Text mb={4} fontWeight="semibold" color={primaryAccentColor}>
            Customization Options
          </Text>
          
          <Flex direction="column" gap={6}>
            <Box>
              <Text mb={3} fontWeight="medium">
                <Icon as={HiOutlineChatBubbleBottomCenter} mr={2} color={primaryAccentColor} />
                Tone:
              </Text>
              <RadioGroup value={tone} onChange={setTone} colorScheme="blue">
                <Flex direction="column" gap={2}>
                  <Radio value="enthusiastic">
                    <Flex align="center">
                      <Icon as={HiOutlineFaceSmile} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Enthusiastic</Text>
                      <Tooltip 
                        label="Energetic and engaging communication style"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>

                  <Radio value="balanced">
                    <Flex align="center">
                      <Icon as={HiOutlineChatBubbleBottomCenter} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Balanced</Text>
                      <Tooltip 
                        label="Professional and approachable tone"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>

                  <Radio value="reserved">
                    <Flex align="center">
                      <Icon as={HiOutlineDocumentText} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Reserved</Text>
                      <Tooltip 
                        label="Precise and analytical approach"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>
                </Flex>
              </RadioGroup>
            </Box>

            <Box>
              <Text mb={3} fontWeight="medium">
                <Icon as={HiOutlineSquares2X2} mr={2} color={primaryAccentColor} />
                Specificity:
              </Text>
              <RadioGroup value={specificity} onChange={setSpecificity} colorScheme="blue">
                <Flex direction="column" gap={2}>
                  <Radio value="detailed">
                    <Flex align="center">
                      <Icon as={HiOutlineBookOpen} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Detailed</Text>
                      <Tooltip 
                        label="Comprehensive explanations with examples"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>

                  <Radio value="balanced">
                    <Flex align="center">
                      <Icon as={HiOutlineViewColumns} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Balanced</Text>
                      <Tooltip 
                        label="Clear explanations with moderate detail"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>

                  <Radio value="concise">
                    <Flex align="center">
                      <Icon as={HiOutlineBars3} mr={2} color={secondaryAccentColor} />
                      <Text fontWeight="medium">Concise</Text>
                      <Tooltip 
                        label="Brief and focused responses"
                        placement="right"
                        hasArrow
                      >
                        <Box display="inline-block">
                          <Icon 
                            as={HiOutlineInformationCircle} 
                            ml={2} 
                            color={secondaryTextColor} 
                            w={4} 
                            h={4}
                            opacity={0.7}
                            _hover={{ opacity: 1 }}
                            cursor="help"
                          />
                        </Box>
                      </Tooltip>
                    </Flex>
                  </Radio>
                </Flex>
              </RadioGroup>
            </Box>

            <Flex align="center" mt={2}>
                <Flex align="center">
                  <Icon as={HiOutlineAcademicCap} mr={2} color={primaryAccentColor} />
                  <Text mr={4} fontWeight="medium">Expert Mode</Text>
                  <Tooltip 
                    label="Enable to get responses from an expert perspective with domain-specific knowledge"
                    placement="right"
                    hasArrow
                  >
                    <Box display="inline-block">
                      <Icon 
                        as={HiOutlineInformationCircle} 
                        mr={2} 
                        color={secondaryTextColor} 
                        w={4} 
                        h={4}
                        opacity={0.7}
                        _hover={{ opacity: 1 }}
                        cursor="help"
                      />
                    </Box>
                  </Tooltip>
                  <Switch
                    id="role-playing"
                    colorScheme="blue"
                    onChange={(e) => setRolePlaying(e.target.checked)}
                    size="lg"
                  />
                </Flex>
            </Flex>
          </Flex>
        </Box>

        {/* Enhance Button */}
        <Button
          bg={primaryAccentColor}
          color="white"
          onClick={enhancePrompt}
          mb={6}
          size="lg"
          width="200px"
          _hover={{ 
            bg: useColorModeValue('#3A7AFE', '#9B51E0'),
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          }}
          _active={{
            transform: 'translateY(0)',
          }}
          transition="all 0.2s"
        >
          Enhance Prompt
        </Button>

        {/* Enhanced Output Section */}
        <Box w="100%">
          <Text mb={2} alignSelf="start" fontWeight="medium">
            Enhanced Prompt:
          </Text>
          <Textarea
            value={enhancedPrompt}
            isReadOnly
            placeholder="Your enhanced prompt will appear here..."
            minH="120px"
            p={4}
            borderRadius="md"
            bg={useColorModeValue('gray.50', '#1A1A1A')}
            _hover={{ borderColor: secondaryAccentColor }}
          />
        </Box>
      </Flex>
    </Box>
  )
}

export default App
