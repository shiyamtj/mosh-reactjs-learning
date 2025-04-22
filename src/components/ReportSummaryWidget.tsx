import { ArrowForwardIcon } from '@chakra-ui/icons'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
  Text,
  Badge,
  Tag,
  HStack,
} from '@chakra-ui/react'
import { TestSummary } from '../Constants'

interface ReportSummaryWidgetProps {
  summary: TestSummary
}

const ReportSummaryWidget = ({ summary }: ReportSummaryWidgetProps) => {
  return (
    <>
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow='hidden'
        variant='outline'
      >
        <Table variant='simple' size='sm'>
          <Tbody>
            <Tr>
              <Th>
                <Badge variant='solid' colorScheme='green'>
                  Pass
                </Badge>
              </Th>
              <Td isNumeric>{summary.passed}</Td>
            </Tr>
            <Tr>
              <Th>
                <Badge variant='outline' colorScheme='red'>
                  Fail
                </Badge>
              </Th>
              <Td isNumeric>{summary.failed}</Td>
            </Tr>
            <Tr>
              <Th>
                <Badge variant='outline' colorScheme='yellow'>
                  Skip
                </Badge>
              </Th>
              <Td isNumeric>{summary.skipped}</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>Total</Th>
              <Td isNumeric>{summary.totalTests}</Td>
            </Tr>
          </Tfoot>
        </Table>

        <Stack>
          <CardBody>
            <Heading size='xs'>
              <HStack justifyContent={'space-between'}>
                <Text fontSize='s' fontWeight='bold' fontStyle='capitalize'>
                  Pass Rate
                  <Badge ml='1' fontSize='1em' colorScheme='green'>
                    {summary.passRate}
                  </Badge>
                </Text>
                <Text fontSize='s' fontWeight='bold' fontStyle='capitalize'>
                  {' '}
                  <Tag variant='subtle' colorScheme='yellow'>
                    {summary.brand}
                  </Tag>{' '}
                  <Tag variant='subtle' colorScheme='yellow'>
                    {summary.product}
                  </Tag>{' '}
                  <Tag variant='subtle' colorScheme='yellow'>
                    {summary.environment}
                  </Tag>
                </Text>
              </HStack>
            </Heading>

            <Text></Text>
            <Text fontSize='sm'>
              {summary.environment} {summary.fileName}
            </Text>
            <Text fontStyle='italic' fontSize='sm'>
              {summary.reportPostFix}
            </Text>
          </CardBody>

          <CardFooter>
            <Button size='xs' rightIcon={<ArrowForwardIcon />}>
              View Report{' '}
            </Button>
          </CardFooter>
        </Stack>
      </Card>
    </>
  )
}
export default ReportSummaryWidget
