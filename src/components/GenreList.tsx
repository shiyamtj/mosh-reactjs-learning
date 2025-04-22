import {
  HStack,
  List,
  ListItem,
  Image,
  Text,
  Spinner,
  Button,
  Heading,
} from '@chakra-ui/react'
import useGenres, { Genre } from '../hooks/useGenre'
import getCroppedImageUrl from '../services/image-url'

interface GenreListProps {
  onSelectGenre: (genre: Genre) => void
  selectedGenre: Genre | null
}

const GenreList = ({ onSelectGenre, selectedGenre }: GenreListProps) => {
  const { data, isLoading, error } = useGenres()

  if (error) return null
  if (isLoading) return <Spinner />

  return (
    <>
      <Heading fontSize='2xl' marginBottom={3}>
        Genres
      </Heading>
      <List>
        {data.map((genre) => (
          <ListItem key={genre.id} paddingY='5px'>
            <HStack>
              <Image
                boxSize='32px'
                borderRadius={8}
                objectFit='cover'
                src={getCroppedImageUrl(genre.image_background)}
              />
              <Button
                textAlign='left'
                whiteSpace='normal'
                fontWeight={genre.id === selectedGenre?.id ? 'bold' : 'normal'}
                fontSize='lg'
                variant='link'
                onClick={() => {
                  onSelectGenre(genre)
                }}
              >
                {genre.name}
              </Button>
            </HStack>
          </ListItem>
        ))}
      </List>
    </>
  )
}
export default GenreList
